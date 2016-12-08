'use strict';
var ds = require("../lib/MockDataSource.js");


exports.addSystem = function(args, res, next) {
  /**
   * parameters expected in the args:
  * system (System)
  **/
    var examples = {};
  examples['application/json'] = {
  "createBy" : "aeiou",
  "voidBy" : "aeiou",
  "void" : true,
  "flows" : [ {
    "components" : [ {
      "createBy" : "aeiou",
      "voidBy" : "aeiou",
      "void" : true,
      "flows" : [ "" ],
      "createTime" : "2000-01-23T04:56:07.000+0000",
      "voidTime" : "2000-01-23T04:56:07.000+0000",
      "name" : "aeiou",
      "id" : "aeiou"
    } ],
    "createBy" : "aeiou",
    "voidBy" : "aeiou",
    "void" : true,
    "createTime" : "2000-01-23T04:56:07.000+0000",
    "voidTime" : "2000-01-23T04:56:07.000+0000",
    "name" : "aeiou",
    "links" : [ {
      "established" : "2000-01-23T04:56:07.000+0000",
      "void" : true,
      "endFlow" : "",
      "endSys" : "",
      "voidTime" : "2000-01-23T04:56:07.000+0000",
      "startSys" : {
        "system" : "aeiou"
      },
      "id" : "aeiou",
      "startFlow" : {
        "flow" : "aeiou"
      }
    } ],
    "id" : "aeiou"
  } ],
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "voidTime" : "2000-01-23T04:56:07.000+0000",
  "name" : "aeiou",
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

exports.getSystem = function(args, res, next) {
  /**
   * parameters expected in the args:
  * systemId (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "createBy" : "aeiou",
  "voidBy" : "aeiou",
  "void" : true,
  "flows" : [ {
    "components" : [ {
      "createBy" : "aeiou",
      "voidBy" : "aeiou",
      "void" : true,
      "flows" : [ "" ],
      "createTime" : "2000-01-23T04:56:07.000+0000",
      "voidTime" : "2000-01-23T04:56:07.000+0000",
      "name" : "aeiou",
      "id" : "aeiou"
    } ],
    "createBy" : "aeiou",
    "voidBy" : "aeiou",
    "void" : true,
    "createTime" : "2000-01-23T04:56:07.000+0000",
    "voidTime" : "2000-01-23T04:56:07.000+0000",
    "name" : "aeiou",
    "links" : [ {
      "established" : "2000-01-23T04:56:07.000+0000",
      "void" : true,
      "endFlow" : "",
      "endSys" : "",
      "voidTime" : "2000-01-23T04:56:07.000+0000",
      "startSys" : {
        "system" : "aeiou"
      },
      "id" : "aeiou",
      "startFlow" : {
        "flow" : "aeiou"
      }
    } ],
    "id" : "aeiou"
  } ],
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "voidTime" : "2000-01-23T04:56:07.000+0000",
  "name" : "aeiou",
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

exports.getSystems = function(args, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(ds.getSystems() || {}, null, 2));
}

exports.updateSystem = function(args, res, next) {
  /**
   * parameters expected in the args:
  * systemId (String)
  * body (System)
  **/
    var examples = {};
  examples['application/json'] = {
  "createBy" : "aeiou",
  "voidBy" : "aeiou",
  "void" : true,
  "flows" : [ {
    "components" : [ {
      "createBy" : "aeiou",
      "voidBy" : "aeiou",
      "void" : true,
      "flows" : [ "" ],
      "createTime" : "2000-01-23T04:56:07.000+0000",
      "voidTime" : "2000-01-23T04:56:07.000+0000",
      "name" : "aeiou",
      "id" : "aeiou"
    } ],
    "createBy" : "aeiou",
    "voidBy" : "aeiou",
    "void" : true,
    "createTime" : "2000-01-23T04:56:07.000+0000",
    "voidTime" : "2000-01-23T04:56:07.000+0000",
    "name" : "aeiou",
    "links" : [ {
      "established" : "2000-01-23T04:56:07.000+0000",
      "void" : true,
      "endFlow" : "",
      "endSys" : "",
      "voidTime" : "2000-01-23T04:56:07.000+0000",
      "startSys" : {
        "system" : "aeiou"
      },
      "id" : "aeiou",
      "startFlow" : {
        "flow" : "aeiou"
      }
    } ],
    "id" : "aeiou"
  } ],
  "createTime" : "2000-01-23T04:56:07.000+0000",
  "voidTime" : "2000-01-23T04:56:07.000+0000",
  "name" : "aeiou",
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

