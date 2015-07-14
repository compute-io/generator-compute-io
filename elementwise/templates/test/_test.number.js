/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	<%= functionName %> = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number <%= functionName %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= functionName %> ).to.be.a( 'function' );
	});
<% if ( noInputs === 'One' ) { %>
	it( 'should evaluate the function', function test() {
		assert.closeTo( <%= functionName %>( 0 ), 0, 1e-4 );
	});
<% } else if ( noInputs === 'Two' ) { %>
	it( 'should evaluate the function', function test() {
		assert.closeTo( <%= functionName %>( 0, 0 ), 0, 1e-4 );
	});
<% } %>
});
