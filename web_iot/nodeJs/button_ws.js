//npm install express serialport socket.io
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const SerialPort = require("serialport");
const readline = require('readline');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

var dev_name = "/dev/tty.usbmodem14201"
var speed = 9600;
let port_r;
var port = new SerialPort(dev_name, {baudRate:speed}, (err)=>{
    if(err) console.log("serial port open err", err);
    else{
        console.log("serial port is ready.")
        port_r = readline.createInterface(port);
        port_r.on('line', (data)=>{
            console.log(data);
            io.emit('message', {data:data});
        });
    }
});

io.on('connect', (socket)=>{
    console.log("ws connect.");
    socket.emit('message', {'data': 'welcome'});

});
app.get('/', (req, res)=>{
    res.redirect('/button_ws.html');
});
app.use(express.static(__dirname + '/../static/'));

server.listen(8080, ()=>{
    console.log("server on 8080.");
});
