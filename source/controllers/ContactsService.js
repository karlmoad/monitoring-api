'use strict';

exports.addReferenceContact = function(args, res, next) {
  /**
   * parameters expected in the args:
  * referenceId (String)
  * body (Contact)
  **/
    var examples = {};
    if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

