'use strict';
var fs = require('fs');
var broccoli = require('broccoli');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var sweetjs = require ('./../');

var expect = chai.expect;
var builder;

chai.use(sinonChai);

describe('broccoli-sweetjs', function () {
	this.timeout(20000);

	afterEach(function () {
		if (builder) {
			builder.cleanup();
		}
	});

	describe('with defaults', function () {
		it('expands macros defined in tree', function () {
			var tree = sweetjs('test/fixture/defaults');

			builder = new broccoli.Builder(tree);
			return builder.build().then(function (results) {
				var file = fs.readFileSync(results.directory + '/fixture.js', 'utf8');
				expect(file).to.match(/var x\$\d{3} = \$y/);
			});
		});
	});

	describe('with modules', function () {
		it('expands macros defined in loaded node module', function () {
			var tree = sweetjs('test/fixture/modules', {
				modules: ['es6-macros']
			});

			builder = new broccoli.Builder(tree);
			return builder.build().then(function (results) {
				var file = fs.readFileSync(results.directory + '/class.js', 'utf8');
				expect(file).to.match(/Person\$\d+\.prototype\.say/);
			});
		});
	});

	describe('with readtables', function () {
		it('expands macros defined in loaded readtable module', function () {
			var tree = sweetjs('test/fixture/readtable', {
				readtables: ['jsx-reader']
			});

			builder = new broccoli.Builder(tree);
			return builder.build().then(function (results) {
				var file = fs.readFileSync(results.directory + '/jsx.js', 'utf8');
				expect(file).to.match(/var div\$\d+ = React\.DOM\.div/);
			});
		});

		it('has separate readtable extensions for multiple instances', function () {
			var spy = sinon.spy();
			var treeA = pickFiles('.' , {
				srcDir: 'test/fixture/readtable',
				files: ['jsx.js'],
				destDir: '/'
			});

			var treeB = pickFiles('.' , {
				srcDir: 'test/fixture/readtable',
				files: ['jsx2.js'],
				destDir: '/'
			});

			treeA = sweetjs(treeA, {
				readtables: ['jsx-reader']
			});

			treeB = sweetjs(treeB, {});

			builder = new broccoli.Builder(mergeTrees([treeA, treeB]));
			return builder.build().then(function () {}, spy).finally(function () {
				expect(spy).to.have.been.called;
			});
		});
	});
});
