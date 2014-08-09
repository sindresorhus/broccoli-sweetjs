'use strict';
var Filter = require('broccoli-filter');
var sweetjs = require('sweet.js');
var objectAssign = require('object-assign');
var moduleCache = [];

function SweetjsFilter(inputTree, options) {
	if (!(this instanceof SweetjsFilter)) {
		return new SweetjsFilter(inputTree, options);
	}

	this.inputTree = inputTree;
	this.options = objectAssign({}, options || {});

	if (this.options.modules) {
		this.options.modules = this.options.modules.map(function (mod) {
			if (moduleCache[mod]) {
				return moduleCache[mod];
			}

			moduleCache[mod] = sweetjs.loadNodeModule(process.cwd(), mod);

			return moduleCache[mod];
		});
	}
}

SweetjsFilter.prototype = Object.create(Filter.prototype);
SweetjsFilter.prototype.constructor = SweetjsFilter;

SweetjsFilter.prototype.extensions = ['js', 'sjs'];
SweetjsFilter.prototype.targetExtension = 'js';

SweetjsFilter.prototype.processString = function (str) {
	return sweetjs.compile(str, this.options).code;
};

module.exports = SweetjsFilter;
