#define PIN_BTN 12

int old = -1;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_BTN, INPUT_PULLUP);
}

void loop() {
  int val = digitalRead(PIN_BTN);
  if(val != old){
    old = val;
    Serial.println(val);
  }
  delay(50);
}