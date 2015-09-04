'use strict';

var assert = require('assert');
var GetBible = require('../lib');

describe('getbible-node', function () {

  var api = new GetBible();
  console.log(api);

  it('should have unit test!', function () {
    assert(true, 'we expected this package author to add actual unit tests.');
  });
});
