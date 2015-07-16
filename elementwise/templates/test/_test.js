/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	<%= functionName %> = require( './../lib' ),

	// Function to apply element-wise:
	<%= functionName.toUpperCase() %> = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-<%= functionName %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= functionName %> ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				<%= functionName %>( [1,2,3],  <% if ( noInputs === 'Two' ) { %> 1, <% } %> {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				<%= functionName %>( [1,2,3], <% if ( noInputs === 'Two' ) { %> 1, <% } %> {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				<%= functionName %>( new Int8Array([1,2,3]), <% if ( noInputs === 'Two' ) { %> 1, <% } %> {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				<%= functionName %>( matrix( [2,2] ), <% if ( noInputs === 'Two' ) { %> 1, <% } %> {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( <%= functionName %>( values[ i ]<% if ( noInputs === 'Two' ) { %>, 1 <% } %> ) ) );
		}
	});

<% if ( noInputs === 'One' ) { %>

	it( 'should compute the function when provided a number', function test() {
		assert.strictEqual( <%= functionName %>( 0 ), 0 );
		assert.isTrue( isnan( <%= functionName %>( NaN ) ) );
	});

	it( 'should evaluate the function when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];
		expected = [

		];

		actual = <%= functionName %>( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate...
		actual = <%= functionName %>( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the function when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Int8Array( [ -3, -2, -1, 0, 1, 2, 3 ] );

		expected = new Float64Array([

		]);

		actual = <%= functionName %>( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = <%= functionName %>( data, {
			'copy': false
		});
		expected = new Int8Array( [ 0, 0, 0, 0, 0, 0, 0 ] );
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the function element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];
		expected = new Int8Array( [ 0, 0, 0, 0, 0, 0, 0 ] );

		actual = <%= functionName %>( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should evaluate the function element-wise using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			[0,-3],
			[1,-2],
			[2,-1],
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = [

		];

		actual = <%= functionName %>( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = <%= functionName %>( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the function element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[0,]},
			{'x':[1,]},
			{'x':[2,]},
			{'x':[3,]},
			{'x':[4,]},
			{'x':[5,]},
			{'x':[6,]}
		];

		actual = <%= functionName %>( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}

		// Specify a path with a custom separator...
		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = <%= functionName %>( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}
	});

	it( 'should evaluate the function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = <%= functionName.toUpperCase() %>( i / 5 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = <%= functionName %>( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = <%= functionName %>( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the function element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = <%= functionName.toUpperCase() %>( i / 5 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = <%= functionName %>( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( <%= functionName %>( [] ), [] );
		assert.deepEqual( <%= functionName %>( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( <%= functionName %>( new Int8Array() ), new Float64Array() );
	});

<% } else if ( noInputs === 'Two' ) { %>

	it( 'should throw an error if provided only one argument', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
				 <%= functionName %>( [1,2,3] );
		}
	});

	it( 'should throw an error if provided a number as the first argument and an not applicable option', function test() {
		var values = [
			{'accessor': function getValue( d ) { return d; } },
			{'copy': false},
			{'path': 'x'},
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				<%= functionName %>( 1, [1,2,3], value );
			};
		}
	});

	it( 'should return NaN if the first argument is a number and the second argument is neither numberic, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( <%= functionName %>( 1, values[ i ] ) ) );
		}
	});

	it( 'should evaluate the  <%= functionName %> function for two numbers', function test() {
		assert.strictEqual( <%= functionName %>( 2, 4 ), 16 );
		assert.strictEqual( <%= functionName %>( 3, 3 ), 27 );
	});

	it( 'should evaluate the  <%= functionName %> function for a scalar and an array', function test() {
		var data, actual, expected;
		data = [ 1, 2 ];
		actual = <%= functionName %>( 2, data );
		expected = [ 2, 4 ];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the  <%= functionName %> function for a scalar and a matrix', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = <%= functionName %>( 2, data );
		expected = matrix( new Float64Array( [2,4,8,16] ), [2,2] );

		assert.deepEqual( actual.data, expected.data );
	});


	it( 'should evaluate the <%= functionName %> function for a scalar and an array and cast result to a different dtype', function test() {
		var data, actual, expected;
		data = [ 1, 2 ];
		actual = <%= functionName %>( 10, data, {
			'dtype':'int32'
		});
		expected = new Int32Array( [10,100] );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});


	it( 'should evaluate the <%= functionName %> function for a scalar and a matrix and cast to a different dtype', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = <%= functionName %>( 2, data, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array( [2,4,8,16] ), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );
		assert.deepEqual( actual.data, expected.data );
	});

	it( 'should evaluate the <%= functionName %> function for a matrix and a scalar and cast to a different dtype', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [1,2,3,4] ), [2,2] );
		actual = <%= functionName %>( data, 2, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array( [2,4,8,16] ), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );
		assert.deepEqual( actual.data, expected.data );
	});

	it( 'should evaluate the <%= functionName %> function for a plain array and a scalar', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = [
			0,
			1,
			8,
			27
		];

		actual = <%= functionName %>( data, 3 );
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate...
		actual = <%= functionName %>( data, 3, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

	});

	it( 'should evaluate the <%= functionName %> function for a plain array and another array', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = [
			1,
			1,
			4,
			27
		];

		actual = <%= functionName %>( data, data );
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate...
		actual = <%= functionName %>( data, data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

	});

	it( 'should evaluate the <%= functionName %> function for a typed array and a scalar', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 0, 1, 2, 3 ] );

		expected = new Float64Array( [
			0,
			1,
			8,
			27
		]);

		actual = <%= functionName %>( data, 3 );
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate:
		actual = <%= functionName %>( data, 3, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		expected = new Int8Array( [ 0, 1, 8, 27 ] );

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});

	it( 'should evaluate the <%= functionName %> function for a typed array and another typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 0, 1, 2, 3 ] );

		expected = new Float64Array( [
			1,
			1,
			4,
			27
		]);

		actual = <%= functionName %>( data, data );
		assert.notEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate:

		actual = <%= functionName %>( data, data, {
			'copy': false
		});
		expected = new Int8Array( [ 1, 1, 4, 27 ] );
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});

	it( 'should evaluate the <%= functionName %> function for a typed array and a scalar and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = new Int8Array( [ 0, 1, 16, 81 ] );

		actual = <%= functionName %>( data, 4, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the <%= functionName %> function for an object array and a scalar using an accessor', function test() {
		var data, actual, expected;

		data = [
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = [
			1,
			1,
			1,
			1
		];

		actual = <%= functionName %>( data, 0, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate:
		actual = <%= functionName %>( data, 0, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		function getValue( d ) {
			return d[ 1 ];
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

		actual = <%= functionName %>( data, y, {
			'accessor': getValue
		});

		expected = [
			1,
			1,
			4,
			27
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

	it( 'should evaluate the <%= functionName %> function for an array and a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,8]},
			{'x':[6,27]}
		];

		actual = <%= functionName %>( data, 3, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Specify a path with a custom separator...
		data = [
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = <%= functionName %>( data, 3, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the <%= functionName %> function for an array with another array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = <%= functionName %>( data, y, {
			path: 'x'
		});

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

		data = <%= functionName %>( data, y, {
			'path': 'x/1',
			'sep': '/'
		});
		expected = [
			{'x':[9,1]},
			{'x':[9,1]},
			{'x':[9,4]},
			{'x':[9,27]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ), 'custom separator' );
	});

	it( 'should evaluate the <%= functionName %> function for a matrix and a scalar', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int32Array( 100 );
		d2 = new Int32Array( 100 );
		d3 = new Int32Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = <%= functionName.toUpperCase() %>( i, i );
			d3[ i ] = <%= functionName.toUpperCase() %>( i, 2 );
		}

		// Raise matrix elements to a scalar power
		mat = matrix( d1, [10,10], 'int32' );
		out = <%= functionName %>( mat, 2, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d3 );

		mat = matrix( d1, [10,10], 'int32' );
		out = <%= functionName %>( mat, mat, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d2 );

		out = <%= functionName %>( mat, 2, {
			'copy': false
		});

		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should evaluate the <%= functionName %> function for a matrix and a scalar and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 100 );
		d2 = new Uint16Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = <%= functionName.toUpperCase() %>( i, 2 );
		}
		mat = matrix( d1, [10,10], 'int16' );
		out = <%= functionName %>( mat, 2, {
			'dtype': 'uint16'
		});

		assert.strictEqual( out.dtype, 'uint16' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( <%= functionName %>( [], 1 ), [] );
		assert.deepEqual( <%= functionName %>( matrix( [0,0] ), 1 ).data, matrix( [0,0] ).data );
		assert.deepEqual( <%= functionName %>( new Int8Array(), 1 ), new Float64Array() );
	});
<% } %>

});
