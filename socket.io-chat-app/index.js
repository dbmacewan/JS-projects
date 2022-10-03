const express = require('express');
const app = express();
const http = require('http');
const { nextTick } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var userMap = new Map();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    userMap.set(socket.id, '');

    socket.on('register user', (msg) => {
        console.log('register user: ' + msg);
        userMap.set(socket.id, msg);
        socket.broadcast.emit('login message', userMap.get(socket.id) + ' connected');
        updateUsersOnline();
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('user typing', (msg) => {
        socket.broadcast.emit('user typing', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
        socket.broadcast.emit('logout message', userMap.get(socket.id) + ' disconnected');
        userMap.delete(socket.id);
        updateUsersOnline();
    });

    socket.onAny((event, args) => {
        console.log(event, args);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

function updateUsersOnline() {
    let text = "Currently online: ";
    userMap.forEach((value) => {
        if (value != ''){
            text += value + ", ";
        }
    });
    text = text.substring(0, text.length - 2) + '.';
    io.emit('online users', text);
}
