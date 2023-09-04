const rootPrefix = '..';
const apiErrorConfig = require(rootPrefix + '/config/apiErrorConfig');

class ErrorResponse {

    constructor(apiIdentification, message, errorIdentifier, params) {
        const oThis = this;
        oThis.apiIdentification = apiIdentification;
        oThis.message = message;
        oThis.errorIdentifier = errorIdentifier;
        oThis.params = params;
    }

    perform() {
        const oThis = this;

        const errorConfig = apiErrorConfig[oThis.apiIdentification];

        console.log('***Error Message: ', oThis.message);

        const response = {
            status_code: errorConfig.httpCode,
            error_identifier: oThis.errorIdentifier,
            code: errorConfig.code,
            message: errorConfig.message,
            params: oThis.params
        }

        console.log('***Response: ', response);

        return response;
    }
}

module.exports = ErrorResponse;