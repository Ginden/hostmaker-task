'use strict';


const bodyParser = require('body-parser');
const parseJson = bodyParser.json();
const routes = require('./endpoints');


module.exports = function(app) {
    app.get('/health', routes.health);
    app.get('/property/:id', routes.property.get);
    app.post('/property', parseJson, routes.property.post);
    app.put('/property/:id', parseJson, routes.property.put);
    app.delete('/property/:id', routes.property.del);
};