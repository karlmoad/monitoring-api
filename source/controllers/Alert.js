'use strict';

var url = require('url');
var Alert = require('./AlertService');


module.exports.addAlert = function addAlert (req, res, next) {
  Alert.addAlert(req.swagger.params, res, next);
};

module.exports.getAlerts = function getAlerts (req, res, next) {
  Alert.getAlerts(req.swagger.params, res, next);
};
