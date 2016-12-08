'use strict';

var url = require('url');


var Request = require('./RequestService');


module.exports.closeRequest = function closeRequest (req, res, next) {
  Request.closeRequest(req.swagger.params, res, next);
};

module.exports.getRequest = function getRequest (req, res, next) {
  Request.getRequest(req.swagger.params, res, next);
};

module.exports.getRequests = function getRequests (req, res, next) {
  Request.getRequests(req.swagger.params, res, next);
};

module.exports.processRequest = function processRequest (req, res, next) {
  Request.processRequest(req.swagger.params, res, next);
};
