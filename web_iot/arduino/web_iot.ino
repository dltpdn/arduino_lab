#include <DHT.h>
#include <DHT_U.h>


#define PIN_LED  13
#define PIN_BTN 12
#define DHTPIN 11     //Data 핀
#define DHTTYPE DHT11   // DHT 11 
#define SIZE_CMD  2

DHT dht(DHTPIN, DHTTYPE);

char cmd[SIZE_CMD];
int old_btn = -1;
char btn = 0;
int cmd_idx = 0;
void setup(){
    Serial.begin(9600);
    dht.begin();
    pinMode(PIN_LED, OUTPUT);
    pinMode(PIN_BTN, INPUT_PULLUP);
}

void loop(){
  int btn = digitalRead(PIN_BTN);
  int led = digitalRead(PIN_LED);
  float h = dht.readHumidity(); // 습도
  float t = dht.readTemperature(); // 섭씨온도
  Serial.print(h);
  Serial.print(",");
  Serial.print(t);
  Serial.print(",");
  Serial.println(led);

  if(btn != old_btn){
    old_btn = btn;
    Serial.print("!");
    Serial.println(btn);
  }
  delay(50);
}

void serialEvent(){
    char temp = Serial.read();
    if(temp == '.'){
      cmd_idx = 0;
      switch(cmd[0]){
        case 'l':
          if(cmd[1] == '1'){
              digitalWrite(PIN_LED, HIGH);
          }else if(cmd[1] == '0'){
              digitalWrite(PIN_LED, LOW);
          }
          break;
      }
    }else{
      if(cmd_idx < SIZE_CMD){
        cmd[cmd_idx++] = temp;
      }
    }
}
