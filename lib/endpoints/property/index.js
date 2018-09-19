'use strict';

const post = require('./post');
const put = require('./put');
const del = require('./delete');
const get = require('./get');

module.exports = {
    get,
    del,
    post,
    put
};