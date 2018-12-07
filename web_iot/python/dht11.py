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
    return flask.redirect("/static/dht11.html")

@app.route("/monitor")
def monitor():
    port.write("m".encode())
    msg = port.readline().decode()
    ret = msg.split(",")
    ret = {"humi": ret[0], "temp":ret[1] }
    print(ret)
    return json.dumps(ret)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)