const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();

app.use(cors()); 
var roomid='';
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
        credentials:true
    }
});

io.on("connection", (socket) => {
    console.log("server connected");
    roomid=socket.id;
    socket.on("beginPath", ({ x, y}) => {
      console.log("beginPath - room:", roomid);
      io.to(roomid).emit("beginPath", { x, y });
    });
  
    socket.on("drawLine", ({ x, y}) => {
       console.log("drawLine - room:", roomid);
      io.to(roomid).emit("drawLine", { x, y });
    });
  
      socket.on('changeConfig', (arg) => {
        io.to(roomid).emit('changeConfig',arg)
      });

      socket.on('changeactiveitem', (arg) => {
        io.to(roomid).emit('changeactiveitem', arg)
      });

      socket.on('changeactionitem', (arg) => {
        io.to(roomid).emit('changeactionitem', arg)
      });

      socket.on('joinroom', ({ room }) => {
        console.log('User joined room:', room);
        roomid=room;
        socket.join(room);
        io.to(room).emit('userJoined', { userId: socket.id });
      })
});

app.get('/', (req, res) => {
    res.send('hello world')
});
httpServer.listen(4000, () => {
    console.log("server is running at port 4000");
});
