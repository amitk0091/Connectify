const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
    // Log the error details
    logger.error(err.stack);

    // Set default error details
    let statusCode = 500;
    let message = 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
    } else if (err.message === 'Authentication error') {
        statusCode = 401;
        message = 'Authentication error';
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    // Send error response
    res.status(statusCode).json({ message });
};

module.exports = errorHandler;
