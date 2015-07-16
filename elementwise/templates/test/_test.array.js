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
	<%= functionName %> = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array <%= functionName %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= functionName %> ).to.be.a( 'function' );
	});
<% if ( noInputs === 'One' ) { %>
	it( 'should evaluate the function for an array', function test() {
		var data, actual, expected, i;

		data = [
			1e-306,
			-1e-306,
			1e-299,
			-1e-299,
			0.8,
			-0.8,
			1,
			-1,
			10,
			-10,
			2,
			-2,
			3,
			-3
		];
		actual = new Array( data.length );

		actual = <%= functionName %>( actual, data );

		expected = [

		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( <%= functionName %>( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});
<% } else if ( noInputs === 'Two' ) { %>
	it( 'should evaluate the function when y is a scalar', function test() {
			var data, actual, expected;

			data = [
				1,
				2,
				3,
				4,
				5
			];
			actual = new Array( data.length );

			actual = <%= functionName %>( actual, data, 2 );

			expected = [
				1,
				4,
				9,
				16,
				25
			];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

			// Typed arrays...
			data = new Int32Array( data );
			actual = new Int32Array( data.length );

			actual = <%= functionName %>( actual, data, 2 );
			expected = new Int32Array( expected );

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
		});

		it( 'should evaluate the function when y is an array', function test() {
			var data, actual, expected, y;

			data = [
				0,
				1,
				2,
				3,
				4
			];

		 	y = [
				0,
				1,
				2,
				3,
				4
			];
			actual = new Array( data.length );

			actual = <%= functionName %>( actual, data, y );

			expected = [

			];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

			// Typed arrays...
			data = new Int32Array( data );
			actual = new Int32Array( data.length );

			actual = <%= functionName %>( actual, data, y );
			expected = new Int32Array( expected );

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
		});

		it( 'should return an empty array if provided an empty array', function test() {
			assert.deepEqual( <%= functionName %>( [], [], 1 ), [] );
			assert.deepEqual( <%= functionName %>( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
		});

		it( 'should handle non-numeric values by setting the element to NaN', function test() {
			var data, actual, expected, y;

			data = [ true, null, [], {} ];
			actual = new Array( data.length );
			actual = <%= functionName %>( actual, data, 1 );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			actual = new Array( data.length );
			y = [ 1, 2, 3, 4 ];
			actual = <%= functionName %>( actual, data, y );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, 2, 3 ];
			y = null;
			actual = new Array( data.length );
			actual = <%= functionName %>( actual, data, y );
			expected = [ NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, null, 3 ];
			y = new Int32Array( [1,2,3] );
			actual = new Array( data.length );
			actual = <%= functionName %>( actual, data, y );
			expected = [ 1, NaN, 27 ];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		});

		it( 'should throw an error if provided a y array which is not of equal length to the input x array', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				<%= functionName %>( [], [1,2], [1,2,3] );
			}
			expect( foo2 ).to.throw( Error );
			function foo2() {
				<%= functionName %>( [], [1,2], new Int32Array( [1,2,3] ) );
			}
		});

		it( 'should throw an error if provided a matrix as y argument', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				<%= functionName %>( [], [1,2,3,4], matrix( new Int32Array( [1,2,3,4] ), [2,2] ) );
			}
		});

<% } %>
});
