'use strict';

const express = require('express');
const defaultErrorHandler = require('./default-error-handler');

const registerRoutes = require('./register-routes');

const { getConfig, AirbnbChecker } = require('./services');
const models = require('../models');

module.exports = async function(port, configFactory = getConfig) {
    const app = express();
    const config = await configFactory();
    app.use(inject('airbnb', new AirbnbChecker));
    app.use(inject('models', models));
    await registerRoutes(app, config);
    app.use(defaultErrorHandler);
    app.listen(port, (err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            setImmediate(() => {
                throw err;
            });
        }
        // eslint-disable-next-line no-console
        console.log(`Listening on http://localhost:${port}/`)
    });
};


function inject(path, value) {
    return (req, res, next) => {
        req[path] = value;
        setImmediate(next);
    };
}