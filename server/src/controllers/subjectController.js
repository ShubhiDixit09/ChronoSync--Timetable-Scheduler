const Subject = require('../models/Subject');
const crudControllerFactory = require('./crudControllerFactory');

module.exports = crudControllerFactory(Subject);
