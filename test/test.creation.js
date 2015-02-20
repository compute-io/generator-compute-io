/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var path = require( 'path' ),
	yeoman = require( 'yeoman-generator' );


// VARIABLES //

var helpers = yeoman.test;


// TESTS //

describe( 'compute-io generator', function tests() {

	// SETUP //

	beforeEach( function setup( done ) {
		helpers
			.run( path.join( __dirname, '../app' ) )
			.inDir( path.join( __dirname, 'tmp' ) )
			.withOptions({
				'skip-install': true,
				'skip-install-message': true,
				'skip-message': true
			})
			.withPrompt({
				'name': 'compute-generator-test',
				'author': 'Jane Doe',
				'email': 'jane@doe.com',
				'license_holder': 'Jane Doe &lt;jane@doe.com&gt;',
				'description': 'Compute.io generator test module.',
				'git': false
			})
			.on( 'ready', function onReady( generator ) {
				// Called before `generator.run()` is called.
			})
			.on( 'end', function onEnd() {
				done();
			});
	});


	// TESTS //

	it( 'creates expected files', function test() {
		var expected = [
			'.gitignore',
			'.gitattributes',
			'.npmignore',
			'.travis.yml',
			'.editorconfig',
			'.jshintignore',
			'.jshintrc',
			'README.md',
			'TODO.md',
			'Makefile',
			'LICENSE',
			'package.json',
			'examples/index.js',
			'test/test.js',
			'lib/index.js'
		];

		helpers.assertFile( expected );
	});
});
