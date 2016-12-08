'use strict';

var url = require('url');


var Incident = require('./IncidentService');


module.exports.addIncident = function addIncident (req, res, next) {
  Incident.addIncident(req.swagger.params, res, next);
};

module.exports.getIncident = function getIncident (req, res, next) {
  Incident.getIncident(req.swagger.params, res, next);
};

module.exports.getIncidents = function getIncidents (req, res, next) {
  Incident.getIncidents(req.swagger.params, res, next);
};

module.exports.updateIncident = function updateIncident (req, res, next) {
  Incident.updateIncident(req.swagger.params, res, next);
};
