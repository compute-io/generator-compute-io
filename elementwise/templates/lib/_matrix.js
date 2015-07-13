'use strict';

// FUNCTIONS //

var <%= functionName.toUpperCase() %> = require( './number.js' );


// <%= functionName.toUpperCase() %> FUNCTION //

/**
* FUNCTION: <%= functionName %>( out, matrix )
*	<%= description %> for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function <%= functionName %>( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( '<%= functionName %>()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = <%= functionName.toUpperCase() %>( x.data[ i ] );
	}
	return y;
} // end FUNCTION <%= functionName %>()


// EXPORTS //

module.exports = <%= functionName %>;
