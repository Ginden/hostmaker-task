'use strict';
const Promise = require('bluebird');

function promisifiedMiddleware(fn) {
    return (req, res, next) => {
        Promise.resolve([req, res])
            .spread(fn)
            .asCallback(next);
    }
}


module.exports.promisifiedMiddleware = promisifiedMiddleware;