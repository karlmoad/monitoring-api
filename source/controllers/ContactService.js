'use strict';

exports.addContact = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (Contact)
  **/
    var examples = {};
  examples['application/json'] = {
  "firstName" : "aeiou",
  "lastName" : "aeiou",
  "prefix" : "aeiou",
  "methods" : [ {
    "entry" : "aeiou",
    "createBy" : "aeiou",
    "voidBy" : "aeiou",
    "void" : true,
    "form" : "aeiou",
    "createTime" : "2000-01-23T04:56:07.000+0000",
    "voidTime" : "2000-01-23T04:56:07.000+0000",
    "id" : "aeiou",
    "precedence" : 123
  } ],
  "additional" : [ "aeiou" ],
  "middleName" : "aeiou",
  "id" : "aeiou",
  "suffix" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getContactById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "firstName" : "aeiou",
  "lastName" : "aeiou",
  "prefix" : "aeiou",
  "methods" : [ {
    "entry" : "aeiou",
    "createBy" : "aeiou",
    "voidBy" : "aeiou",
    "void" : true,
    "form" : "aeiou",
    "createTime" : "2000-01-23T04:56:07.000+0000",
    "voidTime" : "2000-01-23T04:56:07.000+0000",
    "id" : "aeiou",
    "precedence" : 123
  } ],
  "additional" : [ "aeiou" ],
  "middleName" : "aeiou",
  "id" : "aeiou",
  "suffix" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getReferenceContacts = function(args, res, next) {
  /**
   * parameters expected in the args:
  * referenceId (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "firstName" : "aeiou",
  "lastName" : "aeiou",
  "prefix" : "aeiou",
  "methods" : [ {
    "entry" : "aeiou",
    "createBy" : "aeiou",
    "voidBy" : "aeiou",
    "void" : true,
    "form" : "aeiou",
    "createTime" : "2000-01-23T04:56:07.000+0000",
    "voidTime" : "2000-01-23T04:56:07.000+0000",
    "id" : "aeiou",
    "precedence" : 123
  } ],
  "additional" : [ "aeiou" ],
  "middleName" : "aeiou",
  "id" : "aeiou",
  "suffix" : "aeiou"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.updateContact = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * body (Contact)
  **/
    var examples = {};
  examples['application/json'] = {
  "firstName" : "aeiou",
  "lastName" : "aeiou",
  "prefix" : "aeiou",
  "methods" : [ {
    "entry" : "aeiou",
    "createBy" : "aeiou",
    "voidBy" : "aeiou",
    "void" : true,
    "form" : "aeiou",
    "createTime" : "2000-01-23T04:56:07.000+0000",
    "voidTime" : "2000-01-23T04:56:07.000+0000",
    "id" : "aeiou",
    "precedence" : 123
  } ],
  "additional" : [ "aeiou" ],
  "middleName" : "aeiou",
  "id" : "aeiou",
  "suffix" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

