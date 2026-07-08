const Batch = require('../models/Batch');
const crudControllerFactory = require('./crudControllerFactory');

module.exports = crudControllerFactory(Batch);
