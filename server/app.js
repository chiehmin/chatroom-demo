
/**
 * Module dependencies.
 */

var express = require('express');
var http    = require('http');
var path    = require('path');
var io      = require('socket.io');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, '../client')));
});

var server = http.createServer(app)

io = io.listen(server);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});



io.sockets.on('connection', function (socket) {
    
    socket.on('message', function (data) {



        socket.broadcast.emit('message', data);
    })

    socket.on('online', function (data) {

        socket.who = data

        socket.broadcast.emit('online', data);
    })

    socket.on('disconnect', function () {


        if (socket.who)
            socket.broadcast.emit('offline', socket.who);
    })


});