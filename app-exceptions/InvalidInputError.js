const HttpClientError = require("../app-exceptions/HttpClientError");

class InvalidInputError extends HttpClientError {
    constructor(message) {
        super(message);
        this.name = 'InvalidInputError';
    }
}

module.exports = InvalidInputError;
