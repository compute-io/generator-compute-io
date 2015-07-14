'use strict';

// FUNCTIONS //

var <%= functionName.toUpperCase() %> = require( './number.js' );


// <%= functionName.toUpperCase() %> FUNCTION //
<% if ( noInputs === 'One' ) { %>
/**
* FUNCTION: <%= functionName %>( out, arr )
*	<%= description %> for each typed-array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function <%= functionName %>( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = <%= functionName.toUpperCase() %>( x[ i ] );
	}
	return y;
} // end FUNCTION <%= functionName %>()
<% } else if ( noInputs === 'Two' ) { %>
/**
* FUNCTION: <%= functionName %>( out, arr, y )
*	<%= description %> for each typed-array element.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} y - either an array of equal length or a scalar
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function  <%= functionName %>( out, arr, y ) {
	var len = arr.length,
		i;

	if ( isMatrixLike( y ) ) {
			throw new Error( '<%= functionName %>()::invalid input argument. `y` has to be an array or scalar.' );
	} else if ( isTypedArrayLike( y ) ) {
		if ( len !== y.length ) {
			throw new Error( ' <%= functionName %>()::invalid input arguments. Inputs arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
				out[ i ] = <%= functionName.toUpperCase() %>( arr[ i ], y[ i ] );
		}
	} else if ( isArrayLike( y ) ) {
		if ( len !== y.length ) {
			throw new Error( ' <%= functionName %>()::invalid input arguments. Inputs arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof y[ i ] === 'number' ) {
				out[ i ] = <%= functionName.toUpperCase() %>( arr[ i ], y[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else {
		if (  typeof y === 'number' ) {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = <%= functionName.toUpperCase() %>( arr[ i ], y );
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION  <%= functionName %>()
<% } %>

// EXPORTS //

module.exports = <%= functionName %>;
