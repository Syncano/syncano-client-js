"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.required = required;
exports.checkStatus = checkStatus;
exports.parseJSON = parseJSON;
function required(param) {
  throw new Error(param + " parameter is required by SyncanoClient");
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  var error = new Error(response.statusText);

  error.response = response;

  throw error;
}

function parseJSON(response) {
  return response.json();
}