'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line import/no-unassigned-import


require('isomorphic-fetch');

var _helpers = require('./helpers');

function SyncanoClient() {
  var instanceName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.required)('instanceName');
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var host = options.host || 'syncano.space';

  client.instanceName = instanceName;
  client.baseUrl = 'https://' + instanceName + '.' + host + '/';
  client.loginMethod = options.loginMethod;
  client.setTokenCallback = options.setTokenCallback;
  client.token = options.token;

  var defaults = {
    'Content-Type': 'application/json'
  };

  client.headers = function (headers) {
    return Object.assign(defaults, headers);
  };

  return client;
}

function client() {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.required)('endpoint');
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return fetch(this.url(endpoint), _extends({
    method: 'POST',
    headers: this.headers(options.headers),
    body: this.parseBody(body)
  }, options)).then(_helpers.checkStatus).then(_helpers.parseJSON);
}

client.post = client;

client.login = function (username, password) {
  var _this = this;

  var login = this.loginMethod ? this.loginMethod : function (username, password) {
    var authUrl = '' + _this.baseUrl + _this.instanceName + '/user/auth/';
    var body = JSON.stringify({ username: username, password: password });
    var options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    };

    return fetch(authUrl, options).then(function (user) {
      _this.setToken(user.token);

      return user;
    });
  };

  return login(username, password);
};

client.url = function (endpoint) {
  return '' + this.baseUrl + endpoint + '/';
};

client.parseBody = function (body) {
  if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') {
    var data = _extends({}, body);

    if (client.token) {
      data = _extends({}, data, {
        _user_key: client.token // eslint-disable-line camelcase
      });
    }

    return JSON.stringify(data);
  }

  return body;
};

client.logout = function () {
  this.token = undefined;
};

client.setToken = function (token) {
  this.token = token;

  if (typeof client.setTokenCallback === 'function') {
    client.setTokenCallback(token);
  }
};

client.get = function () {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.required)('endpoint');
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return this.post(endpoint, _extends({}, body, { _method: 'GET' }), options);
};

client.delete = function () {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.required)('endpoint');
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return this.post(endpoint, _extends({}, body, { _method: 'DELETE' }), options);
};

client.put = function () {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.required)('endpoint');
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return this.post(endpoint, _extends({}, body, { _method: 'PUT' }), options);
};

client.patch = function () {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.required)('endpoint');
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return this.post(endpoint, _extends({}, body, { _method: 'PATCH' }), options);
};

client.subscribe = function () {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.required)('endpoint');
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _helpers.required)('callback');

  var abort = false;
  var url = this.url(endpoint);
  var options = {
    method: 'GET',
    headers: this.headers()
  };

  (function loop() {
    fetch(url, options).then(function (response) {
      if (abort) {
        return;
      }

      if (response.status !== 200) {
        return loop();
      }

      loop();

      response.json().then(callback);
    }).catch(function (err) {
      if (/Failed to fetch/.test(err)) {
        loop();
      }
    });
  })();

  return {
    stop: function stop() {
      abort = true;
    }
  };
};

exports.default = SyncanoClient;