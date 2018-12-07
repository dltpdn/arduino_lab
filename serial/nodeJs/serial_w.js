// npm install serialport
const SerialPort = require("serialport");
const readline = require('readline');

var dev_name = "/dev/tty.usbmodem14201"
var speed = 9600;

var iface = readline.createInterface(process.stdin, process.stdout);
iface.setPrompt("Led On:1, Led Off:0 >");

var port = new SerialPort(dev_name, {baudRate:speed}, (err)=>{
    if(err){
        console.log("fail to open", err);
    }else{
        console.log("serial open successfully.");
        iface.prompt();
        iface.on('line', (line)=>{
            if(line == 'exit'){
                iface.close();
            }
            console.log(line);
            port.write(line, (err, res)=>{
                if(err) console.log(err);
            });
            iface.prompt()
        });
        iface.on('close', ()=>{
            process.exit();
        });
    }
});

