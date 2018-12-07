// npm install serialport
const SerialPort = require("serialport");
const readline = require('readline');

var dev_name = "/dev/tty.usbmodem14201"
var speed = 9600;

var port = new SerialPort(dev_name, {baudRate:speed}, (err)=>{
    if(err){
        console.log("fail to open", err);
    }else{
        console.log("serial open successfully.");
        var line = readline.createInterface(port);
        line.on('line', (data)=>{
            console.log(data);
        });
    }
});

