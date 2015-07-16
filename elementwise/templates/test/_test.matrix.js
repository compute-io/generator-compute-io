/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	<%= functionName %> = require( './../lib/matrix.js' ),

	// Function to apply element-wise:
	<%= functionName.toUpperCase() %> = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix <%= functionName %>', function tests() {
<% if ( noInputs === 'One' ) { %>
	var out,
		mat,
		d1,
		d2,
		i;

	d1 = new Int16Array( 25 );
	d2 = new Int16Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i / 5;
		d2[ i ] = <%= functionName.toUpperCase() %>( i / 5 );
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'int16' );
		out = matrix( d2, [5,5], 'int16' );
	});

	it( 'should export a function', function test() {
		expect( <%= functionName %> ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			<%= functionName %>( matrix( [10,10] ), mat );
		}
	});

	it( 'should evaluate the function for each matrix element', function test() {
		var actual;

		actual = matrix( [5,5], 'int16' );
		actual = <%= functionName %>( actual, mat );

		assert.isTrue( deepCloseTo( actual.data, out.data, 1e-7 ) );

	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( <%= functionName %>( out, mat ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( <%= functionName %>( out, mat ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( <%= functionName %>( out, mat ).data, expected );
	});

<% } else if ( noInputs === 'Two' ) { %>
	var out1, out2,
		mat,
		d1,
		d2,
		d3,
		i;

	d1 = new Float64Array( 25 );
	d2 = new Float64Array( 25 );
	d3 = new Float64Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i;
		d2[ i ] = <%= functionName.toUpperCase() %>( i, i );
		d3[ i ] = <%= functionName.toUpperCase() %>( i, 2 );
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		out1 = matrix( d2, [5,5], 'float64' );
		out2 = matrix( d3, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( <%= functionName %> ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			<%= functionName %>( matrix( [10,10] ), mat, 1 );
		}
	});

	it( 'should throw an error if provided a y matrix which is not of equal dimensionality as the x matrix', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			<%= functionName %>( matrix( [5,5] ), mat, matrix( [10,10] ) );
		}
	});

	it( 'should throw an error if provided an array as the y argument', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			<%= functionName %>( matrix( [5,5] ), mat, [1,2,3,4,5] );
		}
	});

	it( 'should evaluate the <%= functionName %> function for a matrix and a scalar', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = <%= functionName %>( actual, mat, 2 );

		assert.isTrue( deepCloseTo( actual.data, out2.data, 1e-7 ) );
	});

	it( 'should evaluate the <%= functionName %> function for a matrix and a matrix', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = <%= functionName %>( actual, mat, mat );

		assert.isTrue( deepCloseTo( actual.data, out1.data, 1e-7 ) );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( <%= functionName %>( out, mat, 1 ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( <%= functionName %>( out, mat, 1 ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( <%= functionName %>( out, mat, 1 ).data, expected );
	});
<% } %>

});
