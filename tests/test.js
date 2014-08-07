'use strict';
var fs       = require('fs');
var broccoli = require('broccoli');
var sweetjs = require ('./../index.js');
var assert = require('assert');

var builder;

describe('broccoli-sweetjs', function(){

	afterEach(function() {
		if (builder) {
			builder.cleanup();
		}
	});

	describe('with defaults', function(){
		it('expands macros defined in tree', function(){
			var sourcePath = 'tests/fixtures/simple';
			var tree = sweetjs(sourcePath);

			builder = new broccoli.Builder(tree);
			return builder.build().then(function(results) {
				var dir = results.directory;
				assert(/var x\$\d{3} = \$y/.test(fs.readFileSync(dir + '/fixture.js', 'utf8')));
			});
		});
	});

});
