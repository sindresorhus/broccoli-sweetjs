'use strict';
var fs = require('fs');
var broccoli = require('broccoli');
var sweetjs = require ('./../index.js');
var expect = require('chai').expect;

var builder;

describe('broccoli-sweetjs', function(){

	afterEach(function() {
		if (builder) {
			builder.cleanup();
		}
	});

	describe('with defaults', function(){
		it('expands macros defined in tree', function(){
			var tree = sweetjs('tests/fixtures/defaults');

			builder = new broccoli.Builder(tree);
			return builder.build().then(function(results) {
				var file = fs.readFileSync(results.directory + '/fixture.js', 'utf8');
				expect(file).to.match(/var x\$\d{3} = \$y/);
			});
		});
	});

	describe('with modules', function(){
		it('expands macros defined in loaded node module', function(){
			var tree = sweetjs('tests/fixtures/modules', {
				modules: ['es6-macros']
			});

			builder = new broccoli.Builder(tree);
			return builder.build().then(function(results) {
				var file = fs.readFileSync(results.directory + '/class.js', 'utf8');
				expect(file).to.match(/Person\$\d+\.prototype\.say/);
			});
		});
	});

});
