'use strict';

var assert = require('assert');
var GetBible = require('../lib');

describe('getbible-node', function () {

  var api = new GetBible();

  describe('GET test', function () {
    describe('Empty parameters test', function () {
      it('should return an empty object when passed an epmty parameters object.', function () {
        api.get({}, function (err, body) {
          console.log(err);
          assert.equal(err, null);
          assert.equal(Object.keys(body).length, 0);
        });
      });
    }); // Empty parameters test

    describe('passage parameter test', function () {
      it('should return data from the API', function () {
        api.get({passage: 'Jn3:16'}, function (err, body) {
          assert.equal(err, null);
          assert.equal(body, body);
        });
      });

      it('should return an empty object when `passage` is passed, but left empty', function () {
        api.get({passage: ''}, function (err, body) {
          assert.equal(err, null);
          assert.equal(Object.keys(body).length, 0);
        });
      });
    }); // passage param test

  }); // GET test

});
