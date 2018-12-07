# pip install pyserial flask

import serial
import flask
import json

app = flask.Flask(__name__, static_folder="../static")
dev_name = "/dev/tty.usbmodem14201"
speed = 9600
port = serial.Serial(dev_name, speed)
print("Serial device ready :", port.isOpen())

@app.route("/")
def index():
    return flask.redirect("/static/led.html")

@app.route("/led_on")
def ledOn():
    port.write("1".encode())
    ret = port.readline()
    return ret

@app.route("/led_off")
def ledOff():
    port.write("0".encode())
    ret = port.readline()
    return ret

@app.route('/operate/<cmd>')
def led(cmd):
    val = flask.request.values['val']   
    if cmd == "led":
        val = flask.request.values['val']   
        print('/operate/', cmd, val) 
        if val == 'on':
            port.write("1".encode())
        elif val == 'off':
            port.write("0".encode())
        msg = port.readline().decode()
        ret = {"code": False, "message":msg }
    else :
        ret = {"code": False, "message":"Unknown Command" }
    print(ret)
    return json.dumps(ret)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)