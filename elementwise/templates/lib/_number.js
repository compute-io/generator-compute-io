'use strict';

// <%= functionName.toUpperCase() %> //

<% if ( noInputs === 'One' ) { %>
/*
* FUNCTION: <%= functionName %>( x )
*	<%= description %> of a numeric value.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
<% } else if ( noInputs === 'Two' ) { %>
	/**
	* FUNCTION: <%= functionName %>( x, y )
	*	<%= description %> of two numeric values.
	*
	* @param {Number} x - input value
	* @param {Number} y - second input value
	* @returns {Number} function value
	*/
<% } %>
function <%= functionName %>( x <% if ( noInputs === 'Two' ) { %>, y <% } %> ) {

} // end FUNCTION <%= functionName %>()


// EXPORTS //

module.exports = <%= functionName %>;
