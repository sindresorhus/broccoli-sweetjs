'use strict';
var Filter = require('broccoli-filter');
var objectAssign = require('object-assign');
var requireUncached = require('require-uncached');
var moduleCache = [];

function SweetjsFilter(inputTree, options) {
	if (!(this instanceof SweetjsFilter)) {
		return new SweetjsFilter(inputTree, options);
	}

	Filter.call(this, inputTree);

	this.sweetjs = requireUncached('sweet.js');
	this.inputTree = inputTree;
	this.options = objectAssign({}, options || {});

	if (this.options.modules) {
		this.options.modules = this.options.modules.map(function (mod) {
			if (moduleCache[mod]) {
				return moduleCache[mod];
			}

			moduleCache[mod] = this.sweetjs.loadNodeModule(process.cwd(), mod);

			return moduleCache[mod];
		}, this);
	}

	if (this.options.readtables) {
		this.options.readtables.forEach(function (readtable) {
			this.sweetjs.setReadtable(readtable);
		}, this);
	}
}

SweetjsFilter.prototype = Object.create(Filter.prototype);
SweetjsFilter.prototype.constructor = SweetjsFilter;

SweetjsFilter.prototype.extensions = ['js', 'sjs'];
SweetjsFilter.prototype.targetExtension = 'js';

SweetjsFilter.prototype.processString = function (str) {
	return this.sweetjs.compile(str, this.options).code;
};

module.exports = SweetjsFilter;
