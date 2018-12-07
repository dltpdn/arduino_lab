#define PIN_LED  13

char val = 0;
void setup(){
    Serial.begin(9600);
    pinMode(PIN_LED, OUTPUT);
}

void loop(){
    
    if(Serial.available()){
        val = Serial.read();
        if(val == '1'){
            digitalWrite(PIN_LED, HIGH);
            Serial.println("LED On");
        }else if(val == '0'){
            digitalWrite(PIN_LED, LOW);
            Serial.println("LED Off");
        }else{
          Serial.println("Unknown Command");
        }
    }
}