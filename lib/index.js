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
    parameters = extend(parameters, this.options);
    var getURL = API_URL + '?' + querystring.stringify(parameters);

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

  request.get({
    url: BOOKS_URL + '&v=' + this.options.translation,
    headers: {
      'User-Agent': 'GetBible-Node'
    }
  }, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else {
      jsonFromJsonP(body, function (parseErr, json) {
        callback(parseErr, json);
      });
    }
  });
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
// PARAMETERS
//
// There are just two parameters available, both are self-explanatory, passage and version.
//
// Yet you can also use v, ver, lang and translation in place of version and p, text, scrip and scripture in place of passage.
//
// You can call a book, chapter or a single verse, or even a string of verses. When the Version is omitted the KJV is provided by default.
//
// The following are all valid:
//
// http://getbible.net/json?passage=Jn3:16
// http://getbible.net/json?p=James
// http://getbible.net/json?text=ps119
// http://getbible.net/json?scrip=Acts 3:17-4;2:1
// http://getbible.net/json?scripture=Psa 119:4-16;23:1-6&v=amp
// http://getbible.net/json?passage=Acts 15:1-5, 10, 15&version=aov
