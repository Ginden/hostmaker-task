'use strict';

const {
    propertyFromJson,
    propertyToJson
} = require('../../formatters');
const {promisifiedMiddleware} = require('../../utils');


module.exports = promisifiedMiddleware(async (req, res) => {
    const {
        models: {Property},
        airbnb
    } = req;

    const instance = propertyFromJson(Property, req.body);
    try {
        const isValidId = airbnb.isValidId(instance.id);
        if (!isValidId) {
            res.status(404).json({
                error: 'Invalid Airbnb ID!'
            });
            return;
        }
    } catch (err) {
        // Airbnb failed - we assume ID as valid
        // eslint-disable-next-line no-console
        console.warn(err);
    }
    await instance.save();

    res
        .status(200)
        .json(propertyToJson(instance));
});