'use strict';

// FUNCTIONS //

var <%= functionName.toUpperCase() %> = require( './number.js' );


// <%= functionName.toUpperCase() %> FUNCTION //

/**
* FUNCTION: <%= functionName %>( out, arr, accessor )
*	<%= description %> for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function <%= functionName %>( y, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = <%= functionName.toUpperCase() %>( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION <%= functionName %>()


// EXPORTS //

module.exports = <%= functionName %>;
