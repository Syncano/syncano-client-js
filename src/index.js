import querystring from 'querystring'
import 'isomorphic-fetch' // eslint-disable-line import/no-unassigned-import
import { required, checkStatus, parseJSON } from './helpers'

function SyncanoClient(instanceName = required('instanceName'), options = {}) {
  this.instanceName = instanceName
  this.baseUrl = options.baseUrl || 'https://api.syncano.rocks/v2/instances/'
  this.loginMethod = options.loginMethod || loginMethod
  this.token = options.token

  this.headers = headers => Object.assign({
    'Content-Type': 'application/json',
    'X-API-KEY': this.token
  }, headers)
}

function loginMethod(username, password) {
  const authUrl = `${this.baseUrl}${this.instanceName}/user/auth/`
  const body = JSON.stringify({ username, password })
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    body
  }

  return fetch(authUrl, options)
    .then(user => {
      this.setToken(user.token)

      return user
    })
}

SyncanoClient.prototype.login = function (username, password) {
  return this.loginMethod(username, password)
}

SyncanoClient.prototype.url = function (endpoint, query) {
  const url = `${this.baseUrl}${this.instanceName}/sockets/${endpoint}/`

  query = querystring.stringify(query)

  return query ? `${url}${query}` : url
}

SyncanoClient.prototype.logout = function () {
  this.token = undefined
}

SyncanoClient.prototype.setToken = function (token) {
  this.token = token
}

SyncanoClient.prototype.get = function (endpoint = required('endpoint'), body = {}, options = {}) {
  return fetch(this.url(endpoint, body), {
    method: 'GET',
    headers: this.headers(options.headers),
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

SyncanoClient.prototype.post = function (endpoint = required('endpoint'), body = {}, options = {}) {
  return fetch(this.url(endpoint), {
    method: 'POST',
    headers: this.headers(options.headers),
    body,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

SyncanoClient.prototype.delete = function (endpoint = required('endpoint'), body = {}, options = {}) {
  return fetch(this.url(endpoint), {
    method: 'DELETE',
    headers: this.headers(options.headers),
    body,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

SyncanoClient.prototype.put = function (endpoint = required('endpoint'), body = {}, options = {}) {
  return fetch(this.url(endpoint), {
    method: 'PUT',
    headers: this.headers(options.headers),
    body,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

SyncanoClient.prototype.patch = function (endpoint = required('endpoint'), body = {}, options = {}) {
  return fetch(this.url(endpoint), {
    method: 'PATCH',
    headers: this.headers(options.headers),
    body,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

export default SyncanoClient
