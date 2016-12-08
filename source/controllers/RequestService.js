'use strict';

exports.closeRequest = function(args, res, next) {
  /**
   * parameters expected in the args:
  * requestId (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.getRequest = function(args, res, next) {
  /**
   * parameters expected in the args:
  * requestId (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "createBy" : "aeiou",
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "values" : [ {
    "dataType" : "aeiou",
    "value" : "aeiou",
    "key" : "aeiou"
  } ],
  "id" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getRequests = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "createBy" : "aeiou",
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "values" : [ {
    "dataType" : "aeiou",
    "value" : "aeiou",
    "key" : "aeiou"
  } ],
  "id" : "aeiou"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.processRequest = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (Request)
  **/
    var examples = {};
  examples['application/json'] = {
  "createBy" : "aeiou",
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "values" : [ {
    "dataType" : "aeiou",
    "value" : "aeiou",
    "key" : "aeiou"
  } ],
  "id" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

