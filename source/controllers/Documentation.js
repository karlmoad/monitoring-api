'use strict';

var url = require('url');


var Documentation = require('./DocumentationService');


module.exports.addDocument = function addDocument (req, res, next) {
  Documentation.addDocument(req.swagger.params, res, next);
};

module.exports.getDocumentById = function getDocumentById (req, res, next) {
  Documentation.getDocumentById(req.swagger.params, res, next);
};

module.exports.getDocumentByReference = function getDocumentByReference (req, res, next) {
  Documentation.getDocumentByReference(req.swagger.params, res, next);
};

module.exports.updateDocument = function updateDocument (req, res, next) {
  Documentation.updateDocument(req.swagger.params, res, next);
};
