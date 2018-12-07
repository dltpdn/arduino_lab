import flask
import flask_socketio as io
import serial
import threading

dev_name = "/dev/tty.usbmodem14201"
speed = 9600
port = serial.Serial(dev_name, speed)
print("Serial device ready :", port.isOpen())

app = flask.Flask(__name__, static_folder="../static")
socketio = io.SocketIO(app, async_mode='threading')
isLive = True

@app.route('/')
def main():
    return flask.redirect('/static/button_ws.html')

@socketio.on('connect')
def connect():
    socketio.send({'data': 'welcome'})
    
def onChange():
    while isLive:
        val = port.readline().decode()
        val = eval(val)
        socketio.send( {'data': val })
        print('btn pressed "%s"'%val, type(val))


if __name__ == '__main__':
    try:
        t1 = threading.Thread(target=onChange)
        t1.start()
        socketio.run(app, host='0.0.0.0', port=8080)
    finally:    
        port.close()
        isLive = False