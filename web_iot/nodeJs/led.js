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
    res.redirect('/led.html');
});
app.use(express.static(__dirname + '/../static/'));

app.get('/led_on', (req, res)=>{
    if(port.isOpen){
        port_r.once('line', (data)=>{
            console.log(data);
            res.send(data);
        });
        port.write('1');
    }
});
app.get('/led_off', (req, res)=>{
    if(port.isOpen){
        port_r.once('line', (data)=>{
            console.log(data);
            res.send(data);
        });
        port.write('0')
    }
});

app.get('/operate/:cmd', (req, res)=>{
    if(req.params.cmd === 'led'){
        console.log(req.url, req.params.cmd, req.query.val)
        if(port.isOpen){
            port_r.once('line', (data)=>{
                console.log(data);
                res.json({"code": false, "message":data })
            });
            if(req.query.val === 'on') port.write('1');
            else if(req.query.val === 'off') port.write('0');
            else res.json({code : false,  message : 'Unknown Command' })
        }
    
    }
});

app.listen(8080, ()=>{
    console.log("server on 8080.");
});
