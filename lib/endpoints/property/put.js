'use strict';

const _ = require('lodash');
const {
    propertyLiteralFromJson,
    propertyToJson
} = require('../../formatters');
const {promisifiedMiddleware} = require('../../utils');


module.exports = promisifiedMiddleware(async (req, res) => {
    const {
        models: {Property},
        params: {id},
        airbnb
    } = req;
    const normalizedId = parseInt(id, 10);
    const body = _.omit(req.body, 'airbnbId');


    const previousInstance = await Property.findById(normalizedId);

    const newInstanceData = propertyLiteralFromJson(body);


    try {
        const isValidId = airbnb.isValidId(normalizedId);
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
    const newInstance = await previousInstance.update(newInstanceData);

    res
        .status(200)
        .json(propertyToJson(newInstance));
});