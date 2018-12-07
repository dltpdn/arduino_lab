#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 11     //Data 핀
#define DHTTYPE DHT11   // DHT 11 


DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600); 
  dht.begin();
}

void loop() {
  if(Serial.available()){
    char c = Serial.read();
    if(c == 'm'){
      float h = dht.readHumidity(); // 습도
      float t = dht.readTemperature(); // 섭씨온도
      Serial.print(h);
      Serial.print(",");
      Serial.println(t);
    }
  }

}