/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	<%= functionName %> = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor <%= functionName %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= functionName %> ).to.be.a( 'function' );
	});
<% if ( noInputs === 'One' ) { %>
	it( 'should evaluate the  <%= functionName %> function using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];
		actual = new Array( data.length );

		actual = <%= functionName %>( actual, data, getValue );

		expected = [

		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d ) {
			return d.x;
		}

		data = [
			[1,1e-306],
			[2,-1e-306],
			[3,1e-299],
			[4,-1e-299],
			[5,0.8],
			[6,-0.8],
			[7,1],
			[8,-1],
			[9,10],
			[10,-10],
			[11,2],
			[12,-2],
			[13,3],
			[14,-3]
		];

		expected = [

		];

		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, getValue2 );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue2( d ) {
			return d[ 1 ];
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( <%= functionName %>( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});
<% } else if ( noInputs === 'Two' ) {  %>
	it( 'should evaluate the <%= functionName %> function using an accessor when y is a scalar', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, 2, getValue );

		expected = [

		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should evaluate the <%= functionName %> function using an accessor when y is an array', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			0,
			1,
			2,
			3
		];

		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, y, getValue );

		expected = [

		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i ) {
			return d.x;
		}

	});

	it( 'should evaluate the <%= functionName %> function for two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			{'y':0},
			{'y':1},
			{'y':2},
			{'y':3}
		];

		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, y, getValue );

		expected = [

		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( <%= functionName %>( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// numeric value
		data = [
			{'x':1},
			{'x':null},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, 1, getValue );

		expected = [ 1, NaN, 3 ];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// single non-numeric value
		y = false;
		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, y, getValue );
		expected = [ NaN, NaN, NaN ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// numeric array
		y = [ 1, 2, 3 ];
		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, y, getValue );
		expected = [ 1, NaN, 27 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i ) {
			return d.x;
		}

		// typed array
		y = new Int32Array( [1,2,3] );
		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, y, getValue );
		expected = [ 1, NaN, 27 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// object array
		y = [
			{'y':1},
			{'y':2},
			{'y':3}
		];
		actual = new Array( data.length );
		actual = <%= functionName %>( actual, data, y, getValue2 );
		expected = [ 1, NaN, 27 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should throw an error if provided a y array which is not of equal length to the x array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			<%= functionName %>( [], [1,2], [1,2,3], getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if provided a typed array as y which is not of equal length to the x array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			<%= functionName %>( [], [1,2], new Int32Array( [1,2,3] ), getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

<% } %>
});
