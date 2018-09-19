'use strict';


const defaultErrorMessage = 'Something went wrong';

module.exports = defaultErrorHandler;

function defaultErrorHandler(err, req, res, next) {
    if (res.headersSent) {
        console.log('Who handled this error?');
        return next(err)
    }
    const isProduction = process.NODE_ENV === 'production';
    const statusCode = err.statusCode || 500;
    // eslint-disable-next-line
    console.error(err);
    const message = (statusCode >= 500 && isProduction) ? defaultErrorMessage : err.message;
    const errObj = {error: message};
    if (!isProduction) {
        Object.assign(errObj, err.details);
    }
    res.status(statusCode).json(errObj);
    return null;
}