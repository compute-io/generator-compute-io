'use strict';

// ref: https://github.com/substack/node-deep-equal/blob/master/index.js
// ref: https://github.com/Jam3/array-almost-equal/blob/master/index.js
// ref: https://github.com/scijs/almost-equal/blob/master/almost_equal.js

// MODULES //


// FUNCTIONS //

/**
* FUNCTION: closeTo( x, y, eps )
*	Validates if two input values `x` and `y` are equal within an acceptable tolerance.
*
* @private
* @param {Number} x - input value
* @param {Number} y - input value
* @returns {Boolean} boolean indicating whether the inputs are equal to within an acceptable tolerance
*/
function closeTo( x, y, eps ) {
	var delta = x - y;
	if ( delta < 0 ) {
		delta = -delta;
	}
	return ( delta <= eps );
} // end FUNCTION closeTo()


// DEEP CLOSE TO //

/**
* FUNCTION: deepCloseTo( x, y, eps[, options] )
*	Validates if two input values `x` and `y` are equal to within an acceptable tolerance using a recursive algorithm. For objects, properties having numeric values are considered acceptably equal if the values differ by less than an allowable tolerance (epsilon).
*
* @param {*} x - input value
* @param {*} y - input value
* @param {Number} eps - epsilon
* @param {Object} [options] - function options
* @param {Boolean} [options.strict=true] - boolean indicating whether to require strict equality for non-numeric values
* @returns {Boolean} boolean indicating whether the inputs are recursively equal to within an acceptable tolerance
*/
function deepCloseTo( x, y, eps, options ) {
	/* jshint eqeqeq:true */
	var type = typeof x,
		opts,
		keys,
		bool,
		key,
		len,
		i;

	if ( arguments.length > 3 ) {
		opts = options;
	} else {
		opts = {};
	}
	// All identical values are equivalent...
	if ( x === y ) {
		return true;
	}
	// If both values are numbers, compare them...
	else if ( type === 'number' && typeof y === 'number' ) {
		// Handle case where both values are NaN...
		if ( x !== x && y !== y ) {
			return true;
		}
		return closeTo( x, y, eps );
	}
	// Handle dates...
	else if ( x instanceof Date && y instanceof Date ) {
		return closeTo( x.getTime(), y.getTime(), eps );
	}
	// Handle case where both values are non-objects and failed equality...
	else if ( type !== 'object' && typeof y !== 'object' ) {
		/* jshint eqeqeq:false */
		return ( opts.strict === false ) ? x == y : false;
	}
	/* jshint eqeqeq:true */


	keys = Object.keys( x );
	len = keys.length;
	if ( Object.keys( y ).length !== len ) {
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		bool = deepCloseTo( x[ key ], y[ key ], eps );
		if ( bool === false ) {
			return false;
		}
	}
	return true;
} // end FUNCTION deepCloseTo()


// EXPORTS //

module.exports = deepCloseTo;
