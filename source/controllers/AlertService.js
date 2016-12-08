'use strict';

var bc = require("../lib/Broadcaster.js");
var ds = require("../lib/MockDataSource.js");

exports.addAlert = function(args, res, next) {
  var alert = args.body.value;
  ds.addAlert(alert);
  bc.emit(alert);
  res.end(JSON.stringify(alert), null, 2);
}

exports.getAlerts = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify( ds.getAlerts() || {}, null, 2));
}

