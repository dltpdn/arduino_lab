# pip install pyserial
import serial, threading

dev_name = "/dev/tty.usbmodem14201"
speed = 9600
port = serial.Serial(dev_name, speed)

class ReadThread(threading.Thread):
    flag = True
    def run(self):
        while self.flag:
            #line = self.readline()
            line = port.readline()
            if len(line) > 0 :
                print("recv:" +line.decode())
        print("read thread died.")
    
    def readline(self):
        line = ''
        while True:
            ch = port.read().decode()
            line +=ch
            if ch =='\r' or ch=='\n' or ch == '':
                return line
    
try:
    if port.isOpen() :
        t = ReadThread()
        t.start()
        print('serial is ready.')
        while True:
            line = input("On:1, Off:0>")
            if line == 'exit':
                t.flag = False
                break
            print(line)
            port.write( line.encode())
        print('bye')
finally:
    port.close()