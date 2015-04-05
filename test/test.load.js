/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //
describe('compute-io generator', function tests() {

	it( 'can be imported' , function test() {
		var app = require( '../app' );
		expect( app ).to.exist;
	});
});
