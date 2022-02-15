const ErrorMessages = require('../utils/error-messages');

module.exports = function(bearerToken) {
    if (bearerToken.startsWith("Bearer ")){
        try {
            return bearerToken.split(" ")[1];
        } catch (error) {
            throw new Error(ErrorMessages.TOKEN_EXTRACT_ERROR);
        }   
    }
    else {
        throw new Error(ErrorMessages.NOT_BEARER_TOKEN);
    }
}