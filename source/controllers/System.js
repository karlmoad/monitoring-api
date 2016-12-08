'use strict';

var url = require('url');


var System = require('./SystemService');


module.exports.addSystem = function addSystem (req, res, next) {
  System.addSystem(req.swagger.params, res, next);
};

module.exports.getSystem = function getSystem (req, res, next) {
  System.getSystem(req.swagger.params, res, next);
};

module.exports.getSystems = function getSystems (req, res, next) {
  System.getSystems(req.swagger.params, res, next);
};

module.exports.updateSystem = function updateSystem (req, res, next) {
  System.updateSystem(req.swagger.params, res, next);
};
