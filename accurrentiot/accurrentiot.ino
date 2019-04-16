#include <ACS712.h>

//#include "ACS712.h"

/*
  This example shows how to measure the power consumption
  of devices in 230V electrical system
  or any other system with alternative current
*/

// We have 30 amps version sensor connected to A1 pin of arduino
// Replace with your version if necessary
ACS712 sensor(ACS712_30A, A0);
//char watt[5];
//float Wh =0 ;

unsigned long previousMillis = 0;        // will store last time LED was updated
const long interval = 5000;           // interval at which to blink (milliseconds)

float MAIN_READING = 0;
float readingFor5Sec = 0;

unsigned long last_time =0;
unsigned long current_time =0;

void setup() {
  Serial.begin(115200);

  // This method calibrates zero point of sensor,
  // It is not necessary, but may positively affect the accuracy
  // Ensure that no current flows through the sensor at this moment
  sensor.calibrate();
}

void loop() {
  // We use 230V because it is the common standard in European countries
  // Change to your local, if necessary
  float U = 230;

  // To measure current we need to know the frequency of current
  // By default 50Hz is used, but you can specify own, if necessary
  float I = sensor.getCurrentAC();

  // To calculate the power we need voltage multiplied by current
  float watt = U * I;
  Serial.println(String("I = ") + I + String("   Watt = ") + watt );

//
//  MAIN_READING += watt;
//  Serial.println(String("readingIn 2.5 Seconds = ") + MAIN_READING );



 unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
//    Wh = Wh +  watt *(( current_time -last_time) /3600000.0) ;
//    Serial.println(String("Wh after 5 sec = ") + Wh );

    readingFor5Sec = watt *((currentMillis - previousMillis) /(3600000.0));
    MAIN_READING += readingFor5Sec;
    Serial.println(String("-> readingIn 5 Seconds = ") +  readingFor5Sec );
    Serial.println(String(":> MAIN_READING = ") + MAIN_READING  );
    Serial.println();

    readingFor5Sec = 0;
    previousMillis = currentMillis;

    if(MAIN_READING >= 1.0){
    Serial.println(String(">>> reading above 1 Unit = ") + MAIN_READING  );
    Serial.println();
    MAIN_READING = 0;
    }
  }


//  Serial.write(watt);
//  delay(10000);

    delay(2500);
}