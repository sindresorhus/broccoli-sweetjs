# [broccoli](https://github.com/joliss/broccoli)-sweetjs [![Build Status](https://travis-ci.org/sindresorhus/broccoli-sweetjs.svg?branch=master)](https://travis-ci.org/sindresorhus/broccoli-sweetjs)

> Transpile [Sweet.js](https://github.com/mozilla/sweet.js) macros

*Issues with the output should be reported on the Sweet.js [issue tracker](https://github.com/mozilla/sweet.js/issues).*


## Install

```bash
$ npm install --save broccoli-sweetjs
```


## Usage

```js
var sweetjs = require('broccoli-sweetjs');
tree = sweetjs(tree, options);
```


## API

### sweetjs(tree, options)

#### options

##### modules

Type: `Array`  
Default: `[]`

A list of macros you want to use.

Use the same syntax as you would in `require()`:

- npm module: `'module-name'`
- local file: `'./file-name'`

##### sourceMap

Type: `Boolean`
Default: `false`

Whether you want to output a [source map] for easier debugging.

[source map]: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/

##### readableNames

Type: `Boolean`
Default: `false`

Whether you want to clean up variables that were renamed from hygiene (foo$100 becomes foo where ever possible).
Only supports ES5 code.

## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
