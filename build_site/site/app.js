var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 8081

server.listen(port, function(){
    console.log('Server listening at port %d', port);
    console.log('Control C (^C) to stop');
});

app.use(express.static(__dirname + '/site'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

process.on('SIGINIT', function(){
    console.log("Stopping Server, disconnecting clients")
    server.close();
    process.exit();
});
