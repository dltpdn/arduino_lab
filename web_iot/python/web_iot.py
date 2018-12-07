# pip install pyserial flask

import serial
import flask
import json
import flask_socketio as io
import threading

app = flask.Flask(__name__, static_folder="../static")
socketio = io.SocketIO(app, async_mode='threading')
isLive = True

dev_name = "/dev/tty.usbmodem14201"
speed = 9600
port = serial.Serial(dev_name, speed)
print("Serial device ready :", port.isOpen())

state = {'L': 0, 'T': 0, 'H':0}

@app.route("/")
def index():
    return flask.redirect("/static/index.html")

@app.route('/operate/<cmd>')
def led(cmd):
    val = flask.request.values['val']   
    if cmd == "led":
        val = flask.request.values['val']   
        print('/operate/', cmd, val) 
        if val == 'on':
            print(port.write("l1.".encode()))
        elif val == 'off':
            print(port.write("l0.".encode()))
        port.flush()
        ret = {"code": False, "message":"OK" }
    else :
        ret = {"code": True, "message":"Unknown Command" }
    print(ret)
    return json.dumps(ret)


@app.route("/monitor")
def monitor():
    print(state)
    return json.dumps(state)

@socketio.on('connect')
def connect():
    socketio.send({'data': 'welcome'})
    
def onChange():
    while isLive:
        val = port.readline().decode()
        if val.startswith("!"):
            val = eval(val[1])
            socketio.send( {'data': val })
            print('btn pressed "%s"'%val, type(val))
        else:
            ret = val.split(",")
            state['H'] = ret[0]
            state['T'] = ret[1]
            state['L'] = ret[2]

if __name__ == '__main__':
    try:
        t1 = threading.Thread(target=onChange)
        t1.start()
        socketio.run(app, host='0.0.0.0', port=8080)
    finally:    
        port.close()
        isLive = False