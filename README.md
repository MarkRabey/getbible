# getbible [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Node.js wrapper for the getbible.net API


## Install

```sh
$ npm install --save getbible
```


## Usage
```js
/* Include the library in your application */
var GetBible = require('getbible');

/* create an instance of the GetBible API */
var bibleAPI = new GetBible();

/* Retrieve an array of available books */
var books = bibleAPI.getBooks();

/* Retrieve all text for a single book */
var bookOfJohn = bibleAPI.getPassage('John');

/* Retrieve a specific chapter within a book */
var johnChapter3 = bibleAPI.getPassage('John3');

/* Retrieve more complex strings of chapters and verses */
var acts = bibleAPI.getPassage('Acts 3:17-4;2:1');
//returns Acts, Chapter 3, Verses 4-17, and Chapter 2, Verse 1.
```

## License

MIT © [Mark Rabey](http://markrabey.com)


[npm-image]: https://badge.fury.io/js/getbible.svg
[npm-url]: https://npmjs.org/package/getbible
[travis-image]: https://travis-ci.org/MarkRabey/getbible.svg?branch=master
[travis-url]: https://travis-ci.org/MarkRabey/getbible
[daviddm-image]: https://david-dm.org/MarkRabey/getbible.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/MarkRabey/getbible
