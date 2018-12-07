//npm install express serialport
const express = require('express');
const SerialPort = require("serialport");
const readline = require('readline');

let app = express();

var dev_name = "/dev/tty.usbmodem14201"
var speed = 9600;
let port_r;
var port = new SerialPort(dev_name, {baudRate:speed}, (err)=>{
    if(err) console.log("serial port open err", err);
    else port_r = readline.createInterface(port);
});


app.get('/', (req, res)=>{
    res.redirect('/dht11.html');
});
app.use(express.static(__dirname + '/../static/'));

app.get("/monitor", (req, res)=>{
    if(port.isOpen){
        port_r.once('line', (data)=>{
            console.log(data);
            ret = data.split(",")
            res.json({humi: ret[0], temp:ret[1]});
        });
        port.write('m');
    }
});

app.listen(8080, ()=>{
    console.log("server on 8080.");
});
