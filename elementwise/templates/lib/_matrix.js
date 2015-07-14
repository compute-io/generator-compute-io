'use strict';
<% if ( noInputs !== 'One' ) { %>
// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' ),
	isArrayLike = require( 'validate.io-array-like' );

<% } %>
// FUNCTIONS //

var <%= functionName.toUpperCase() %> = require( './number.js' );


// <%= functionName.toUpperCase() %> FUNCTION //
<% if ( noInputs === 'One' ) { %>
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
<% } else if ( noInputs === 'Two' ) { %>
/**
* FUNCTION: <%= functionName %>( out, x, y )
*	<%= description %> for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} x - input matrix
* @param {Matrix|Number} y - either a matrix of equal dimensions or a scalar
* @returns {Matrix} output matrix
*/
function <%= functionName %>( out, x, y ) {
	var len = x.length,
		i, j,
		M, N;

	if ( out.length !== len ) {
		throw new Error( '<%= functionName %>()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	if ( isMatrixLike( y ) ) {
		M = x.shape[0];
		N = x.shape[1];
		if ( M !== x.shape[0] || N !== y.shape[1] ) {
			throw new Error( '<%= functionName %>()::invalid input arguments. Both matrices must have the same number of rows and columns.' );
		}
		for ( i = 0; i < M; i++ ) {
			for ( j = 0; j < N; j++ ) {
				out.set( i, j, <%= functionName.toUpperCase() %>( x.get( i, j ), y.get( i, j ) ) );
			}
		}
	} else if ( isArrayLike ( y ) ) {
		throw new Error( '<%= functionName %>()::invalid input arguments. When provided a matrix, the other input has to be either a matrix of the same dimensionality or a scalar value.' );
	} else {
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = <%= functionName.toUpperCase() %>( x.data[ i ], y );
		}
	}
	return out;
} // end FUNCTION <%= functionName %>()
<% } %>

// EXPORTS //

module.exports = <%= functionName %>;
