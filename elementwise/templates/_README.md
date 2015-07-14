<%= title %>
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> <%= description %>.


## Installation

``` bash
$ npm install <%= name %>
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var <%= functionName %> = require( '<%= name %>' );
```

#### <%= functionName %>( x[, options] )

Evaluates the [error function](http://en.wikipedia.org/wiki/Error_function) (element-wise). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). 

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = <%= functionName %>( -1 );
// returns -0.8427

out = <%= functionName %>( [ -10, -1, 0, 1, 10 ] );
// returns [ -1, -0.8427, 0, 0.8427, 1 ]

data = [ 0, 1, 2 ];
out = <%= functionName %>( data );
// returns [ 0, ~0.8427007, ~0.9953222 ]

data = new Int8Array( data );
out = <%= functionName %>( data );
// returns Float64Array( [ 0, ~0.8427007, ~0.9953222 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = <%= functionName %>( mat );
/*
	[  0    ~0.52
	  ~0.84 ~0.97
	  ~1    ~1    ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', -10],
	['boop', -1],
	['bip', 0],
	['bap', 1],
	['baz', 10]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = <%= functionName %>( data, {
	'accessor': getValue
});
// returns [ -1, -0.8427, 0, 0.8427, 1 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,-10]},
	{'x':[1,-1]},
	{'x':[2,0]},
	{'x':[3,1]},
	{'x':[4,10]}
];

var out = <%= functionName %>( data, 'x|1', '|' );
/*
	[
		{'x':[0,-1]},
		{'x':[1,-0.8427]},
		{'x':[2,0]},
		{'x':[3,0.8427]},
		{'x':[4,1]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [0, 1, 2] );

out = <%= functionName %>( data, {
	'dtype': 'int32'
});
// returns Int32Array( [0,0,0] )

// Works for plain arrays, as well...
out = <%= functionName %>( [0, 1, 2], {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,0,0] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ -10, -1, 0, 1, 10 ];

var out = <%= functionName %>( data, {
	'copy': false
});
// returns [ -1, -0.8427, 0, 0.8427, 1 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = <%= functionName %>( mat, {
	'copy': false
});
/*
	[  0    ~0.52
	  ~0.84 ~0.97
	  ~1    ~1    ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = <%= functionName %>( null );
	// returns NaN

	out = <%= functionName %>( true );
	// returns NaN

	out = <%= functionName %>( {'a':'b'} );
	// returns NaN

	out = <%= functionName %>( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = <%= functionName %>( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = <%= functionName %>( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = <%= functionName %>( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	<%= functionName %> = require( '<%= name %>' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}
out = <%= functionName %>( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = <%= functionName %>( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = <%= functionName %>( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
tmp = <%= functionName %>( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = <%= functionName %>( mat );


// Matrices (custom output data type)...
out = <%= functionName %>( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; <%= year %>. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/<%= name %>.svg
[npm-url]: https://npmjs.org/package/<%= name %>

[travis-image]: http://img.shields.io/travis/compute-io/<%= repo %>/master.svg
[travis-url]: https://travis-ci.org/compute-io/<%= repo %>

[coveralls-image]: https://img.shields.io/coveralls/compute-io/<%= repo %>/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/<%= repo %>?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/<%= repo %>.svg
[dependencies-url]: https://david-dm.org/compute-io/<%= repo %>

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/<%= repo %>.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/<%= repo %>

[github-issues-image]: http://img.shields.io/github/issues/compute-io/<%= repo %>.svg
[github-issues-url]: https://github.com/compute-io/<%= repo %>/issues
