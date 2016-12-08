'use strict';

var url = require('url');


var Contacts = require('./ContactsService');


module.exports.addReferenceContact = function addReferenceContact (req, res, next) {
  Contacts.addReferenceContact(req.swagger.params, res, next);
};
