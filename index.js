'use strict';
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var sweetjs = require('sweet.js');
var walkSync = require('walk-sync');
var CachingWriter = require('broccoli-caching-writer');

function SweetjsFilter(inputTree, options) {
	if (!(this instanceof SweetjsFilter)) {
		return new SweetjsFilter(inputTree, options);
	}

	this.inputTree = inputTree;
	this.options = options || {};
}

SweetjsFilter.prototype = Object.create(CachingWriter.prototype);
SweetjsFilter.prototype.constructor = SweetjsFilter;

SweetjsFilter.prototype.updateCache = function(srcDir, destDir) {
	var options = this.options;
	walkSync(srcDir).forEach(function(relativePath) {
		if (relativePath.slice(-1) === '/') {
			mkdirp.sync(path.join(destDir, relativePath));
		} else {
			var srcCode = fs.readFileSync(path.join(srcDir, relativePath), {encoding: 'utf-8'});
			var fileOptions = options;
			fileOptions['filename'] = relativePath;
			var result = sweetjs.compile(srcCode, fileOptions);
			var destRelativePath = relativePath.replace('.sjs', '.js');
			if (options.sourceMap) {
				var mapRelativePath = destRelativePath + '.map';
				fs.writeFileSync(path.join(destDir, destRelativePath), result.code + '\n//# sourceMappingURL=' + mapRelativePath);
				fs.writeFileSync(path.join(destDir, mapRelativePath), result.sourceMap);
			} else {
				fs.writeFileSync(path.join(destDir, destRelativePath), result.code);
			}
		}
	});
}

module.exports = SweetjsFilter;
