'use strict';
var Filter = require('broccoli-filter');
var sweetjs = require('sweet.js');

function SweetjsFilter(inputTree, options) {
	if (!(this instanceof SweetjsFilter)) {
		return new SweetjsFilter(inputTree, options);
	}

	this.inputTree = inputTree;
	this.options = options || {};
}

SweetjsFilter.prototype = Object.create(Filter.prototype);
SweetjsFilter.prototype.constructor = SweetjsFilter;

SweetjsFilter.prototype.extensions = ['js'];
SweetjsFilter.prototype.targetExtension = 'js';

SweetjsFilter.prototype.processString = function (str) {
	return sweetjs.compile(str, this.options).code;
};

module.exports = SweetjsFilter;
