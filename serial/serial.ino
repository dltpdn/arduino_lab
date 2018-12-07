int cnt = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Serial is ready.");
}

void loop() {
  Serial.print(cnt++);
  Serial.println("Hello world");
  delay(1000);
}