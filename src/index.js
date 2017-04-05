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

// Used by the client.subscribe method to start polling from the correct id
client.setLastId = function (endpoint, data) {
  const url = this.url(`${endpoint}/history`, data)
  // eslint-disable-next-line camelcase
  if (data.last_id) {
    return
  }

  return fetch(url)
    .then(response => response.data.objects[0].id)
}

client.subscribe = function (endpoint = required('endpoint'), data, callback) {
  let abort = false
  const hasData = typeof data === 'object' && data !== null
  const options = {
    method: 'GET',
    timeout: 1000 * 60 * 5, // 5 minutes
    headers: this.headers()
  }

  let url = this.url(endpoint, data)
  const cb = hasData ? callback : data

  function loop() {
    if (abort) {
      return
    }

    fetch(url, options)
      .then(response => {
        cb(response.data)
        // eslint-disable-next-line camelcase
        data.last_id = response.data.id
        url = client.url(endpoint, data)
        loop()
      })
      .catch(err => {
        const isNetworkError = /(Network Error)|(timeout)/.test(err)
        const isNotAborted = abort === false

        if (isNetworkError && isNotAborted) {
          loop()
        }
      })
  }

  this.setLastId(endpoint, data)
    .then(response => {
      // eslint-disable-next-line camelcase
      data.last_id = response
      url = client.url(endpoint, data)
      loop()
    })

  return {
    stop: () => {
      abort = true
    }
  }
}

client.subscribe.once = function (endpoint = required('endpoint'), data, callback) {
  const listener = client.subscribe(endpoint, data, response => {
    listener.abort()
    callback(response)
  })
}

function required(param) {
  throw new Error(`${param} parameter is required by SyncanoClient`)
}

export default SyncanoClient
