'use strict';

const {promisifiedMiddleware} = require('../../utils');

module.exports = promisifiedMiddleware(async (req, res) => {
    const {
        models: {Property},
        params: {id}
    } = req;

    const normalizedId = parseInt(id, 10);


    const result = await Property.destroy({
        where: {
            id: normalizedId
        }
    });

    res.status(200).json({
        message: `Deleted property ${normalizedId}`,
        propertiesDeleted: result
    });
});