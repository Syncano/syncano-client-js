import querystring from 'querystring'
import 'isomorphic-fetch' // eslint-disable-line import/no-unassigned-import
import { required, checkStatus, parseJSON } from './helpers'

function SyncanoClient(instanceName = required('instanceName'), token) {
  this.baseUrl = 'https://api.syncano.rocks/v2/instances/'
  this.instanceName = instanceName
  this.token = token

  this.headers = headers => Object.assign({
    'Content-Type': 'application/json',
    'X-API-KEY': this.token
  }, headers)
}

SyncanoClient.prototype.url = function (endpoint, query) {
  const url = `${this.baseUrl}${this.instanceName}/sockets/${endpoint}/`

  query = querystring.stringify(query)

  return query ? `${url}${query}` : url
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
