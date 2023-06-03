
const io = require('socket.io')(80,{
    cors:{
        origin:"*"
    }})

const users = {};


io.on('connection', (Socket) => {
    Socket.on('new-user-joined', name => {
        console.log("new user", name)
            users[Socket.id] = name;
            Socket.broadcast.emit('user-joined', name);
        })
    Socket.on('send', message =>{
        Socket.broadcast.emit('receive', {message: message, name: users[Socket.id]})
    });
    Socket.on('disconeect', message =>{
        Socket.broadcast.emit('left', users[Socket.id])
        delete users[socket.id]
    });
})

