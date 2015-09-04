'use strict';

var request = require('request');
var querystring = require('querystring');
var API_URL = 'https://getbible.net/json';

var GetBible = function () {

};

module.exports = GetBible;

GetBible.prototype.get = function (parameters, callback) {
  var getURL = API_URL + '/?' + querystring.stringify(parameters); // Construct URL with parameters

  request.get({
    url: getURL,
    strictSSL: true,
    json: true
  }, function (error, response, body) {
    if (!error && !!body.status && body.status !== 'OK') {
      error = new Error(body.description || body.error_message);
    }
    callback(error, body || {});
  });
};
