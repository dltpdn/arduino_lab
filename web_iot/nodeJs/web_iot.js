//npm install express serialport socket.io
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const SerialPort = require("serialport");
const readline = require('readline');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

let dev_name = "/dev/tty.usbmodem14201"
let speed = 9600;
let state = {'L': 0, 'T': 0, 'H':0}
let port_r;
let port = new SerialPort(dev_name, {baudRate:speed}, (err)=>{
    if(err) console.log("serial port open err", err);
    else{
        console.log("serial port is ready.")
        port_r = readline.createInterface(port);
        port_r.on('line', (data)=>{
            if(data.startsWith("!")){
                io.emit('message', {data:data.substr(1)});
                console.log('btn pressed "%s"',data)
            }else{
                let ret = data.split(",")
                state.H = ret[0]
                state.T = ret[1]
                state.L = ret[2]
            }
        });
    }
});

io.on('connect', (socket)=>{
    console.log("ws connect.");
    socket.emit('message', {'data': 'welcome'});

});
app.get('/', (req, res)=>{
    res.redirect('/web_iot.html');
});
app.use(express.static(__dirname + '/../static/'));

app.get('/operate/:cmd', (req, res)=>{
    if(req.params.cmd === 'led'){
        console.log(req.url, req.params.cmd, req.query.val)
        if(port.isOpen){
            if(req.query.val === 'on') port.write('l1.');
            else if(req.query.val === 'off') port.write('l0.');
            res.json({code : false,  message : 'OK' })
        }else{
            res.json({code : false,  message : 'Unknown Command.' });
        }

    }
});

app.get("/monitor", (req, res)=>{
    console.log('/monitor', state);
    res.json(state);
})

server.listen(8080, ()=>{
    console.log("server on 8080.");
});
