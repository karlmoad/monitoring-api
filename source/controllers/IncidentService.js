'use strict';

exports.addIncident = function(args, res, next) {
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

exports.getIncident = function(args, res, next) {
  /**
   * parameters expected in the args:
  * incidentId (String)
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

exports.getIncidents = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
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
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.updateIncident = function(args, res, next) {
  /**
   * parameters expected in the args:
  * incidentId (String)
  * body (Incident)
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

