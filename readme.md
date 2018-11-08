# Deprecated

The Sweet.js project is no longer maintained.

---

# [broccoli](https://github.com/joliss/broccoli)-sweetjs [![Build Status](https://travis-ci.org/sindresorhus/broccoli-sweetjs.svg?branch=master)](https://travis-ci.org/sindresorhus/broccoli-sweetjs)

> Transpile [Sweet.js](https://github.com/mozilla/sweet.js) macros

*Issues with the output should be reported on the Sweet.js [issue tracker](https://github.com/mozilla/sweet.js/issues).*


## Install

```
$ npm install --save-dev broccoli-sweetjs
```


## Usage

```js
var sweetjs = require('broccoli-sweetjs');
tree = sweetjs(tree, options);
```


## API

### sweetjs(tree, [options])

#### options

##### modules

Type: `array`<br>
Default: `[]`

A list of macros you want to use.

Use the same syntax as you would in `require()`:

- npm module: `'module-name'`
- local file: `'./file-name'`

##### readtables

Type: `array`<br>
Default: `[]`

A list of readtable extensions you want to use.

Use the same syntax as you would in `require()`:

- npm module: `'module-name'`
- local file: `'./file-name'`


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
