'use strict';

exports.addDocument = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (Incident)
  **/
    var examples = {};
  examples['application/json'] = {
  "alerts" : [ {
    "component" : "aeiou",
    "system" : "aeiou",
    "level" : {
      "id" : 123,
      "value" : "aeiou"
    },
    "createTime" : "2000-01-23T04:56:07.000+0000",
    "id" : "aeiou",
    "message" : "aeiou",
    "priority" : 123,
    "flow" : "aeiou"
  } ],
  "closedBy" : "aeiou",
  "system" : {
    "system" : "aeiou"
  },
  "openedBy" : "aeiou",
  "related" : [ "" ],
  "flows" : [ {
    "flow" : "aeiou"
  } ],
  "closed" : "2000-01-23T04:56:07.000+0000",
  "opened" : "2000-01-23T04:56:07.000+0000",
  "id" : "aeiou",
  "actions" : [ {
    "established" : 123456789,
    "id" : "aeiou",
    "message" : "aeiou",
    "user" : "aeiou"
  } ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getDocumentById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "createBy" : "aeiou",
  "voidBy" : "aeiou",
  "system" : "aeiou",
  "void" : true,
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "voidTime" : "2000-01-23T04:56:07.000+0000",
  "subject" : "aeiou",
  "action" : "aeiou",
  "id" : "aeiou",
  "text" : "aeiou",
  "incident" : "aeiou",
  "flow" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getDocumentByReference = function(args, res, next) {
  /**
   * parameters expected in the args:
  * referenceId (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "createBy" : "aeiou",
  "voidBy" : "aeiou",
  "system" : "aeiou",
  "void" : true,
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "voidTime" : "2000-01-23T04:56:07.000+0000",
  "subject" : "aeiou",
  "action" : "aeiou",
  "id" : "aeiou",
  "text" : "aeiou",
  "incident" : "aeiou",
  "flow" : "aeiou"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.updateDocument = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * body (Documentation)
  **/
    var examples = {};
  examples['application/json'] = {
  "createBy" : "aeiou",
  "voidBy" : "aeiou",
  "system" : "aeiou",
  "void" : true,
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "voidTime" : "2000-01-23T04:56:07.000+0000",
  "subject" : "aeiou",
  "action" : "aeiou",
  "id" : "aeiou",
  "text" : "aeiou",
  "incident" : "aeiou",
  "flow" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

