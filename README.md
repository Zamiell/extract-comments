# extract-comments [![NPM version](https://badge.fury.io/js/extract-comments.svg)](http://badge.fury.io/js/extract-comments)

> Extract code comments from string or from a glob of files.

**Heads up!** As of v0.7.0 this no longer has a `.fromFile()` method to read from the file system. See [extracting from files](#extracting-from-files).

Can be used with [code-context](https://github.com/jonschlinkert/code-context) to match comments up with related code.

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i extract-comments --save
```

## Usage

```js
var extract = require('extract-comments');

// pass a string of javascript, CSS, LESS etc
extract(string);
```

**Example**

```js
var str = '/**\n * this is\n *\n * a comment\n*/\nvar foo = "bar";\n';
extract(str);
```

Results in:

```js
// key is the starting line number
{ '1':
   { begin: 1,
     end: 5,
     // line number of the code after the comment
     codeStart: 7 } }
     content: 'this is\n\na comment\n',
     // sames as content, but split into blocks at double newlines
     blocks: [
       'this is',
       'a comment\n'
     ],
     // first line of code after the comment
     after: 'var foo = "bar";',
```

_(The reason the key is the starting line number is that it's easy to use this format with templates)_

**Customize output**

```js
// use code-context to parse the first line of code following
// the comment
var context = require('code-context');

// pass a function to modify the returned object
// and avoid looping more than once
var comments = extract(str, function(comment) {
  comment.context = context(comment.after);
  return comment;
});
```

Results in:

```js
{ begin: 1,
  content: 'this is\n\na comment\n',
  after: 'var foo = "bar";',
  end: 5,
  codeStart: 7,
  blocks: [ 'this is', 'a comment\n' ],
  context:
   [ { begin: 1,
       type: 'declaration',
       name: 'foo',
       value: '"bar"',
       string: 'foo',
       original: 'var foo = "bar";' } ] }
```

## Extracting from files

Prior to v0.7.0, there was a method to extract code comments from files. Here is the equivalent code to accomplish the same thing:

```js
var fs = require('fs');
var extract = require('extract-comments');
var mapFiles = require('map-files');

function extractComments(patterns, opts) {
  opts = opts || {};
  opts.name = opts.rename || function(fp) {
    return fp;
  };
  opts.read = opts.read || function(fp, options) {
    var code = fs.readFileSync(fp, 'utf8');
    return extract(code, options);
  };
  return mapFiles(patterns, opts);
}
```

## Related

* [code-context](https://www.npmjs.com/package/code-context): Parse a string of javascript to determine the context for functions, variables and comments based… [more](https://www.npmjs.com/package/code-context) | [homepage](https://github.com/jonschlinkert/code-context)
* [esprima-extract-comments](https://www.npmjs.com/package/esprima-extract-comments): Extract code comments from string or from a glob of files using esprima. | [homepage](https://github.com/jonschlinkert/esprima-extract-comments)
* [parse-comments](https://www.npmjs.com/package/parse-comments): Parse code comments from JavaScript or any language that uses the same format. | [homepage](https://github.com/jonschlinkert/parse-comments)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/extract-comments/issues/new).

## Run tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2014-2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 02, 2015._