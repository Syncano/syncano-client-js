import { required, checkStatus, parseJSON } from './helpers'

function SyncanoClient(instanceName = required('instanceName'), token) {
  this.baseUrl = 'https://api.syncano.rocks/v2/instances/'
  this.instanceName = instanceName
  this.token = token

  this.url = endpoint => `${this.baseUrl}${this.instanceName}/sockets/${endpoint}/`
  this.headers = headers => Object.assign({
    'Content-Type': 'application/json',
    'X-API-KEY': this.token
  }, headers)
}

SyncanoClient.prototype.setToken = function (token) {
  this.token = token
}

SyncanoClient.prototype.get = function (endpoint, body = {}, options = {}) {
  return fetch(this.url(endpoint), {
    method: 'GET',
    headers: this.headers(options.headers),
    body,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

SyncanoClient.prototype.post = function (endpoint, body = {}, options = {}) {
  return fetch(this.url(endpoint), {
    method: 'POST',
    headers: this.headers(options.headers),
    body,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

SyncanoClient.prototype.delete = function (endpoint, body = {}, options = {}) {
  return fetch(this.url(endpoint), {
    method: 'DELETE',
    headers: this.headers(options.headers),
    body,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

SyncanoClient.prototype.put = function (endpoint, body = {}, options = {}) {
  return fetch(this.url(endpoint), {
    method: 'PUT',
    headers: this.headers(options.headers),
    body,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
}

SyncanoClient.prototype.patch = function (endpoint, body = {}, options = {}) {
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
