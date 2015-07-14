'use strict';

// <%= functionName.toUpperCase() %> //

/**
* FUNCTION: <%= functionName %>( x )
*	<%= description %> of a numeric value.
*
* @param {Number} x - input value
<% if ( noInputs === 'Two' ) { %>* @param {Number} y - second input value <% } %>
* @returns {Number} function value
*/
function <%= functionName %>( x <% if ( noInputs === 'Two' ) { %>, y <% } %> ) {

} // end FUNCTION <%= functionName %>()


// EXPORTS //

module.exports = <%= functionName %>;
