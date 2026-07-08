const Faculty = require('../models/Faculty');
const crudControllerFactory = require('./crudControllerFactory');

module.exports = crudControllerFactory(Faculty);
