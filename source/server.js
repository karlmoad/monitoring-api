var app = require('connect')();
var cors = require('cors');
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var uuid = require("node-uuid");
var broadcaster = require("./lib/Broadcaster.js");
var dataSource = require("./lib/MockDataSource.js");

dataSource.initDataSource();

//ports
var socketPort = process.env.SOCKETPORT || 24790;
var swaggerPort = process.env.RESTPORT || 24890;

//servers
var socketServer = http.createServer(app);
socketServer.listen(socketPort);
var swaggerServer = http.createServer(app);
swaggerServer.listen(swaggerPort);

// session vars --------
var numCurrentUsers = 0;
var numMonitors = 0;
var userSessions={};
var monitors={};
//----------------------

//Swagger middleware implementation

// swaggerRouter configuration
var options = {
    swaggerUi: '/swagger.json',
    controllers: './controllers',
    useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

app.use(cors());

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
});

// Start the server
swaggerServer.listen(swaggerPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', swaggerPort, swaggerPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', swaggerPort);
});

//Web Sockets Implementation
var io = require('socket.io')(socketServer);
console.log("Socket.io endpoints listening on port: %d", socketPort);

var cl = io.of("/clients");

cl.on('connection', function (socket) {
    socket.on('newSession', function(user){
        socket.user = user;
        numCurrentUsers++;
        var sessionId = uuid.v4();
        var loginTime = (new Date).getTime();
        userSessions[sessionId] = {user:socket.user, sessionId: sessionId, login_time: loginTime};
        console.log("User:%s logged in, session:%s, Number of current users:%d", userSessions[sessionId].user, sessionId, numCurrentUsers);
        socket.emit('authenticated', userSessions[sessionId]);
    });


    socket.on('disconnect', function(sessionId){
        if(userSessions[sessionId]){
            console.log("User %s, logging out, session:%s", userSessions[sessionId].user, sessionId);
            delete userSessions[sessionId];
            --numCurrentUsers;
            console.log("Number of current users:%d", numCurrentUsers);
        }
    });
});


//boradcaster object
broadcaster.setCallback(function(message){
    console.log("callback received message");
    cl.emit('alert', message);
});

var mons = io.of("/monitors");
mons.on('connection', function (msocket) {
    msocket.on('newSession', function(monitorName){
        monitorId = uuid.v4();
        msocket.monitor = monitorName;
        msocket.iden = monitorId;
        monitors[monitorId] = {name:monitorName, id:monitorId,  time: (new Date()).getTime()};
        numMonitors++;
        console.log("Monitor $s session created, number fo active monitors %d", monitorName, numMonitors)
        msocket.emit('session_established', monitors[monitorId]);
    });

    msocket.on('evaluate', function(data){
        //temp testing only
        cl.emit('alert', data);
    });

    msocket.on('system_conf_change', function(monitorInfo){
        //temp testing only
        console.log("Monitor %s|%s has signaled a system change", monitorInfo.name, monitorInfo.id);
        cl.emit('system_change');
    });

    msocket.on('disconnect', function(monitorInfo){
        var monitorId = monitorInfo.id;
        if(monitors[monitorId]){
            --numMonitors;
            console.log("Monitor disconnected name:%s, ID:%s, Current active monitors:%d", monitors[monitorId].name, monitorId, numMonitors);
            delete  monitors[monitorId];
        }
    });
});

process.on('SIGINIT', function(){
    console.log("Stopping Server, disconnecting clients")
    server.close();
    process.exit();
});