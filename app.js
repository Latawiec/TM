const express   = require('express');
const fs        = require('fs');
const path      = require('path');

let app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './index.html'));
})

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', (client)=>{
    console.log(`Client ${client.id} connected!`);
    client.on('drawn', (data)=>{
        client.broadcast.emit('update', data);
    })
})

server.listen(3000);

