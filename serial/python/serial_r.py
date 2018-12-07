# pip install pyserial
import serial

dev_name = "/dev/tty.usbmodem14201"
speed = 9600
port = serial.Serial(dev_name, speed)

def readline():
    line = ''
    while True:
        ch = port.read().decode()
        line +=ch
        if ch =='\n' or ch == '\r' or ch == '':
            if len(line) > 0 :
                return line
    
try:
    if port.isOpen() :
        print('Serial is ready.')
        while True:
            print("recv:" + port.readline().decode()) 
finally:
    port.close()