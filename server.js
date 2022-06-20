const mongoose = require('mongoose');
const conn = require('./config/connectionDB')
const Msg = require('./models/scema');

const io = require('socket.io')(8000,{
    cors: {
        origin: '*',
    }
});


const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log('New User', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        const chatMessage = new Msg({msg: message});
        chatMessage.save().then(() => {
            console.log('Saved');
        }).catch((err) => {
            console.log(err);
        })
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]; 
    });


})
