#include <LiquidCrystal.h>

LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    String message = Serial.readStringUntil('\n'); 
    lcd.clear();
    if (message.length() <= 16) {
      lcd.setCursor(0, 0);
      lcd.print(message); 
    } 
    else {
      lcd.setCursor(0, 0);
      lcd.print(message.substring(0, 16)); 
      lcd.setCursor(0, 1);
      lcd.print(message.substring(16));   
    }
  }
}
