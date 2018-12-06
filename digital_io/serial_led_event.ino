#define PIN_LED 13

char val = 0;

void setup(){
 	Serial.begin(9600); 
	pinMode(PIN_LED, OUTPUT);
}

void loop(){
	if(val == '1'){ 
		digitalWrite(PIN_LED, HIGH);
	}
	if(val == '0'){   
		digitalWrite(PIN_LED, LOW);   
	}
}

void serialEvent(){
	val = Serial.read();
}