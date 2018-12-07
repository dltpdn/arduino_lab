# pip install pyserial
import serial

dev_name = "/dev/tty.usbmodem14201"
speed = 9600
port = serial.Serial(dev_name, baudrate=speed)
try:
    if port.isOpen():
        print('Serial writer is ready.')
    
    while True:
        line = input("Off:0, On:1 >")
        print(line)
        port.write(line.encode())
finally:
    port.close()