'use strict';
const Promise = require('bluebird');
const startTime = Date.now();
const pkg = require('../../package');
let healthCheckCount = 0;

module.exports = (req, res, next) => {
    Promise.resolve()
        .then(() => {
            res.json({
                pid: process.pid,
                uptime: `${((Date.now() - startTime) / 1000).toFixed(1)}s`,
                package: {
                    name: pkg.name,
                    version: pkg.version
                },
                count: ++healthCheckCount,
                env: process.env,
                models: `${req.models}`,
                features: process.features,
                versions: process.versions,
                memoryUsage: process.memoryUsage()
            })
        })
        .asCallback(next);

};