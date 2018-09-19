'use strict';
const {promisifiedMiddleware} = require('../../utils');
const {propertyToJson} = require('../../formatters');

module.exports = promisifiedMiddleware(async (req, res) => {
    const {
        models: {Property},
        params: {id}
    } = req;

    const normalizedId = parseInt(id, 10);

    if (!normalizedId) {
        throw new Error(`"${id}" is not a valid ID`);
    }

    const property = await Property.findById(normalizedId);

    if(!property) {
        res.status(404).json({
            error: 'Property not found!',
            id: normalizedId
        });
        return;
    }

    const normalizedProperty = propertyToJson(property);

    res.status(200).json(normalizedProperty);

});