/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	<%= functionName %> = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset <%= functionName %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= functionName %> ).to.be.a( 'function' );
	});
<% if ( noInputs === 'One' ) { %>
	it( 'should compute the <%= functionName %> function and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		data = <%= functionName %>( data, 'x' );

		expected = [
			{'x':},
			{'x':},
			{'x':},
			{'x':},
			{'x':},
			{'x':},
			{'x':}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );


		// Custom separator...
		data = [
			{'x':[9,-3]},
			{'x':[9,-2]},
			{'x':[9,-1]},
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		actual = <%= functionName %>( data, 'x/1', '/' );
		expected = [
			{'x':[9,]},
			{'x':[9,]},
			{'x':[9,]},
			{'x':[9,]},
			{'x':[9,]},
			{'x':[9,]},
			{'x':[9,]}
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( <%= functionName %>( [], 'x' ), [] );
		assert.deepEqual( <%= functionName %>( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = <%= functionName %>( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});
<% } else if ( noInputs === 'Two' ) { %>
	it( 'should evaluate the <%= functionName %> function when y is a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		actual = <%= functionName %>( data, 2, 'x' );

		expected = [
			{'x':0},
			{'x':1},
			{'x':4},
			{'x':9}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = <%= functionName %>( data, 2, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,4]},
			{'x':[9,9]}
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the <%= functionName %> function when y is an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = <%= functionName %>( data, y, 'x' );

		expected = [
			{'x':1},
			{'x':1},
			{'x':4},
			{'x':27}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = <%= functionName %>( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,1]},
			{'x':[9,1]},
			{'x':[9,4]},
			{'x':[9,27]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		var arr = [];
		assert.deepEqual( <%= functionName %>( arr, 1, 'x' ), [] );
		assert.deepEqual( <%= functionName %>( arr, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// raising to a non-numeric value
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = <%= functionName %>( data, null, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// raising to a scalar
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = <%= functionName %>( data, 1, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,3]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = [ 0, 1, 2, 3];
		actual = <%= functionName %>( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,27]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = new Int32Array( [0,1,2,3] );
		actual = <%= functionName %>( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,27]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});

	it( 'should throw an error if provided a matrix as y argument', function test() {
		var data, y;

		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];
		y = matrix( new Int32Array( [1,2,3,4] ), [2,2] );

		expect( foo ).to.throw( Error );
		function foo() {
			 <%= functionName %>(data, y, 'x.1' );
		}
	});

<% } %>
});
