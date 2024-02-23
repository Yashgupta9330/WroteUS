const express = require('express');
const { createServer } = require('node:http');
const {Server} = require('socket.io');
const cors = require('cors');
const app = express();
const server = createServer(app);
const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3000' : 'http://localhost:3000'
app.use(cors({origin: URL}))

const io = new Server(server, {
    cors: URL
})

io.on("connection", (socket)=>{
    console.log("Server connected");

    socket.on('beginPath', (args) => {
        socket.broadcast.emit('beginPath', args)
    })

    socket.on('drawPath', (args) => {
        socket.broadcast.emit('drawPath', args)
    })

    socket.on('changeConfig', (args) => {
        socket.broadcast.emit('changeConfig', args)
    })
})
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});