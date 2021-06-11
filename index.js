const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages.js')
const botname = 'Chatcord Bot'
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {

    socket.emit('message', formatMessage(botname,'Welcome to ChatChord'))

    //broadcast to everyone without the 
    socket.broadcast.emit('message', formatMessage(botname, 'A user has connected'))

    socket.on('disconnect', () => {
        //emit to everyone
        io.emit('message', formatMessage(botname,'A user has left the chat'));
    })

    socket.on('chatmessage', (msg)=>{
        console.log(msg)
        io.emit('message', formatMessage('user',msg))
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})