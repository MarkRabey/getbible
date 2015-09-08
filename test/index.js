'use strict';

var assert = require('assert');
var GetBible = require('../lib');

describe('getbible', function () {

  var api;
  describe('Invoking API', function () {
    it('should return an instance of GetBible, and the translation should be "aov"', function () {
      api = new GetBible({translation: 'aov'});
      assert.equal(api.getTranslation(), 'aov');
    });

    it('should return an instance of GetBible, and the translation should be "kjv"', function () {
      api = new GetBible();
      assert.equal(api.getTranslation(), 'kjv');
    });
  });

  describe('GET test', function () {
    describe('Empty parameters test', function () {
      it('should return an empty object when passed an epmty parameters object.', function () {
        api.get({}, function (err, body) {
          assert.equal(err, null);
          assert.equal(Object.keys(body).length, 0);
        });
      });
    }); // Empty parameters test

  }); // GET test

  describe('getBooks()', function () {
    it('should return an array of available books', function () {
      api.getBooks(function (err, body) {
        assert.equal(err, null);
        assert.equal(Object.prototype.toString.call(body), '[object Array]');
      });
    });
  });

  describe('getPassage()', function () {
    it('should return the book of John', function () {
      api.getPassage('John', function (err, body) {
        assert.equal(err, null);
        assert.equal(body.book_name, 'John');
        assert.equal(body.chapter_nr, null);
      });
    });

    it('should return John, Chapter 3', function () {
      api.getPassage('John 3', function (err, body) {
        assert.equal(err, null);
        assert.equal(body.book_name, 'John');
        assert.equal(body.chapter_nr, 3);
      });
    });

  });

});
