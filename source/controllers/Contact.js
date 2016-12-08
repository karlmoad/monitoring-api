'use strict';

var url = require('url');


var Contact = require('./ContactService');


module.exports.addContact = function addContact (req, res, next) {
  Contact.addContact(req.swagger.params, res, next);
};

module.exports.getContactById = function getContactById (req, res, next) {
  Contact.getContactById(req.swagger.params, res, next);
};

module.exports.getReferenceContacts = function getReferenceContacts (req, res, next) {
  Contact.getReferenceContacts(req.swagger.params, res, next);
};

module.exports.updateContact = function updateContact (req, res, next) {
  Contact.updateContact(req.swagger.params, res, next);
};
