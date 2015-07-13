'use strict';

// FUNCTIONS //

var <%= functionName.toUpperCase() %> = require( './number.js' );


// <%= functionName.toUpperCase() %> FUNCTION //

/**
* FUNCTION: <%= functionName %>( out, arr )
*	<%= description %> for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function <%= functionName %>( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = <%= functionName.toUpperCase() %>( x[ i ] );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION <%= functionName %>()


// EXPORTS //

module.exports = <%= functionName %>;
