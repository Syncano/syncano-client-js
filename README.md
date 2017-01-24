[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)   [![CircleCI](https://circleci.com/gh/Syncano/syncano-client-js.svg?style=shield&circle-token=2efee697e0cee80591aec86e022a9dbe0b3b25b8)](https://circleci.com/gh/Syncano/syncano-client-js)   [![codecov](https://codecov.io/gh/Syncano/syncano-client-js/branch/master/graph/badge.svg)](https://codecov.io/gh/Syncano/syncano-client-js)
# Syncano Client Library

This library enables you to interact with the Syncano Sockets via Javascript.

## Getting started

**Installing from NPM**

    npm install syncano --save

**Usage**

The library supports the CommonJS syntax:

```js
var Syncano = require('syncano-client');
```
    
You can also use it with ES6 modules:

```js
import Syncano from 'syncano-client';
```

**Creating a connection**

To create a connection, simply initialize the Syncano object with instance name:

```js
const s = new Syncano('MY_INSTANCE_NAME')
```

## Constructor

### `Syncano(instanceName, options?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| **`instanceName`** | String | Syncano instance name. You can create one using [Syncano CLI](https://github.com/Syncano/syncano-node-cli). |
| **`options`** | Object | Optional connection config. |
| **`options.token`** | String | Allows you to initialize authorized connection. |
| **`options.loginMethod`** |  Function | Define custom login method |


## Methods

### `s(endpoint, data?, options?)`

Alias of `s.post` method.

### `s.login(username, password)`

Before you can send authorized requests, you need to login user with username and password. This method will automatically save user token for future requests.

```js
s.login('john.doe', 'secret')
  .then(user => console.log(`Hello ${user.first_name}`))
  .catch(err => console.log('Invalid username or password.'))
```

### `s.logout()`

Remove user token for future requests.

### `s.setToken(token)`

Used to restore client session with token.

| Parameter | Type | Description |
|-----------|------|-------------|
| **`token`** | String | User token used to authorize requests.  |

To remove token, call setToken without parameter:

```js
s.setToken()
```

### `s.get(endpoint, data?, options?)`

Send `GET` request to Syncano socket. 

| Parameter | Type | Description |
|-----------|------|-------------|
| **`endpoint`** | String | Name of socket and endpoint joined with '/':  |
| **`data`** | Object | Optional object send with request. |
| **`options`** | Object | Optional request configuration. |


```js
// countries - socket name
// list - endpoint name
s.get('countries/list')

// Pass additional data to request
s.get('countries/list', { order_by: 'name' })

// Configure request
s.get('countries/list', {}, {
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'default'
})
```

For more options, view official [fetch documentation](https://fetch.spec.whatwg.org/)

### `s.post(endpoint, data?, options?)`

Send `POST` request to Syncano Socket. View `s.get` method for more info.

### `s.delete(endpoint, data?, options?)`

Send `DELETE` request to Syncano Socket. View `s.get` method for more info.

### `s.put(endpoint, data?, options?)`

Send `PUT` request to Syncano Socket. View `s.get` method for more info.

### `s.patch(endpoint, data?, options?)`

Send `PATCH` request to Syncano Socket. View `s.get` method for more info.
