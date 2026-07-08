const Room = require('../models/Room');
const crudControllerFactory = require('./crudControllerFactory');

module.exports = crudControllerFactory(Room);
