'use strict';

var request = require('request');
var querystring = require('querystring');
var extend = require('extend');
var API_URL = 'https://getbible.net/json';
var BOOKS_URL = 'https://getbible.net/index.php?option=com_getbible&task=bible.books&format=json';


var defaultOptions = {
  translation: 'kjv'
};

var GetBible = function (options) {
  if (!options) {
    options = defaultOptions;
  }

  this.options = options;
};

module.exports = GetBible;

GetBible.prototype.get = function (parameters, callback) {
  if (Object.keys(parameters).length !== 0) {
    var getURL;

    if (parameters.books) {
      getURL = BOOKS_URL + '&v=' + this.options.translation;
    } else {
      parameters = extend(parameters, this.options);
      getURL = API_URL + '?' + querystring.stringify(parameters);
    }


    request.get({
      url: getURL,
      strictSSL: false,
      json: true,
      headers: {
        'User-Agent': 'GetBible-Node'
      }
    }, function (err, response, body) {
      if (err) {
        callback(err);
      } else {
        if (body === 'NULL') {
          body = ({});
        }

        jsonFromJsonP(body, function (parseErr, json) {
          callback(parseErr, json);
        });
      }

    });
  } else {
    callback(null, {});
  }
};

GetBible.prototype.getBooks = function (callback) {
  // does not use the get() helper method at this time.
  this.get({
    books: true
  }, callback);
};

GetBible.prototype.getPassage = function (passageString, callback) {
  this.get({
    passage: passageString
  }, callback);
};

GetBible.prototype.getTranslation = function () {
  return this.options.translation;
};

function jsonFromJsonP(body, callback) {
  var jsonpData = body;
  var json;

  var startPos = regexIndexOf(jsonpData, /\((\[|\{)/);
  var endPos = regexIndexOf(jsonpData, /(\}|\])\)/);
  var jsonString = jsonpData.substring(startPos + 1, endPos + 1);
  json = JSON.parse(jsonString);
  callback(null, json);
}

function regexIndexOf(string, regex, startpos) {
  var indexOf = string.substring(startpos || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}
