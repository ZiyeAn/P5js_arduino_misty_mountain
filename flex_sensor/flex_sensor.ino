const int sensorPin = A1;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(sensorPin, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
 int pinVal = analogRead(sensorPin);
 int mappedVal = map(pinVal,0,1023,0,255);
 Serial. println(mappedVal);  
}
