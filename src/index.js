import querystring from 'querystring'
import fetch from 'axios'

function SyncanoClient(instanceName = required('instanceName'), options = {}) {
  const host = options.host || 'syncano.space'

  client.instanceName = instanceName
  client.baseUrl = `https://${instanceName}.${host}/`
  client.loginMethod = options.loginMethod
  client.setTokenCallback = options.setTokenCallback
  client.token = options.token

  client.headers = headers => Object.assign({}, headers)

  return client
}

function client(endpoint = required('endpoint'), data = {}, options = {}) {
  const url = this.url(endpoint)
  const headers = this.headers(options.headers)
  const transformRequest = [function (data) {
    const token = client.token ? { _user_key: client.token } : {}  // eslint-disable-line camelcase

    return JSON.stringify({
      ...data,
      ...token
    })
  }]

  return fetch({
    method: 'POST',
    url,
    data,
    headers,
    transformRequest,
    ...options
  })
    .then(response => response.data)
}

client.post = client

client.login = function (username, password) {
  const login = this.loginMethod ? this.loginMethod : (username, password) => {
    const url = `${this.baseUrl}${this.instanceName}/users/auth/`
    const data = JSON.stringify({ username, password })

    return fetch({ url, data })
      .then(user => {
        this.setToken(user.token)

        return user
      })
  }

  return login(username, password)
}

client.url = function (endpoint, data) {
  if (data) {
    return `${this.baseUrl}${endpoint}/?${querystring.stringify(data)}`
  }

  return `${this.baseUrl}${endpoint}/`
}

client.logout = function () {
  this.token = undefined
}

client.setToken = function (token) {
  this.token = token

  if (typeof client.setTokenCallback === 'function') {
    client.setTokenCallback(token)
  }
}

client.get = function (endpoint = required('endpoint'), data = {}, options = {}) {
  return this.post(endpoint, { ...data, _method: 'GET' }, options)
}

client.delete = function (endpoint = required('endpoint'), data = {}, options = {}) {
  return this.post(endpoint, { ...data, _method: 'DELETE' }, options)
}

client.put = function (endpoint = required('endpoint'), data = {}, options = {}) {
  return this.post(endpoint, { ...data, _method: 'PUT' }, options)
}

client.patch = function (endpoint = required('endpoint'), data = {}, options = {}) {
  return this.post(endpoint, { ...data, _method: 'PATCH' }, options)
}

client.subscribe = function (endpoint = required('endpoint'), data, callback) {
  let abort = false
  const hasData = typeof data === 'object' && data !== null
  const url = this.url(endpoint, data)
  const options = {
    method: 'GET',
    timeout: 1000 * 60 * 5, // 5 minutes
    headers: this.headers()
  }

  const cb = hasData ? callback : data;

  (function loop() {
    fetch(url, options)
      .then(response => {
        if (abort) {
          return
        }

        loop()

        cb(response.data)
      })
      .catch(err => {
        const isNetworkError = /(Network Error)|(timeout)/.test(err)
        const isNotAborted = abort === false

        if (isNetworkError && isNotAborted) {
          loop()
        }
      })
  })()

  return {
    stop: () => {
      abort = true
    }
  }
}

function required(param) {
  throw new Error(`${param} parameter is required by SyncanoClient`)
}

export default SyncanoClient
