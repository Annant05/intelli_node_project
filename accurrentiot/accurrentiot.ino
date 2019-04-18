#include <ACS712.h>

//#include "ACS712.h"

#include <SoftwareSerial.h>

SoftwareSerial ArduinoUno(7,8);

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
const long interval = 1000;           // interval at which to blink (milliseconds)

float MAIN_READING = 0;
float readingFor5Sec = 0;

unsigned long last_time =0;
unsigned long current_time =0;
 int countLoop = 0;

void setup() {
  Serial.begin(115200);

  // set comm baud rate.
  Serial.println("Setting SoftSerial baud = 115200");
  ArduinoUno.begin(115200);
  Serial.println("Setting SoftSerial baud done");

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
//  Serial.println();
  Serial.println(String("I = ") + I + String("   Watt = ") + watt );


 unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    char MAIN_DATA[11] ="N0.00,0.00";


     //calc watt/hour using this formula every second and add this to reading5Sec
    readingFor5Sec += watt *((currentMillis - previousMillis) /(3600000.0));

    // count for 5 loops to send this data.
    if(countLoop == 5){

    // add to main reading after 5 seconds.
    MAIN_READING += readingFor5Sec;

    // log reading5sec + MAIN_READING
    Serial.println(String("-> readingIn 5 Seconds = ") +  readingFor5Sec );
    Serial.println(String(":> MAIN_READING = ") + MAIN_READING  );

    // create temp readign5sec string
    char tempR5s[5];
    dtostrf(readingFor5Sec , 4, 2, tempR5s);

    for(int i = 1 ; i < 5 ; i++)MAIN_DATA[i] = tempR5s[i-1];
    MAIN_DATA[5] = ',';

    // Send and log reading above or equal 1.0 unit
    if(MAIN_READING >= 1.0){
    Serial.println(String(">>> reading above 1 Unit = ") + MAIN_READING  );
    Serial.println();

    //set mode Y for MAIN_READING
    MAIN_DATA[0] = 'Y';
    }

    // add MAIN_DATA to the MAIN_DATA
    if(MAIN_DATA[0] == 'Y'){
    char tempMs[5];
    dtostrf(MAIN_READING , 4, 2, tempMs);
    for(int i = 6; i < 10 ; i++)MAIN_DATA[i] = tempMs[i-6];
    MAIN_READING = 0;
    }

    // display main data
    Serial.print(" MAIN_DATA TO SEND : ");
    for(int i=0; i <=10 ;i++)Serial.print(MAIN_DATA[i]);



    ArduinoUno.write(MAIN_DATA);

    // reset to record for next 5 seconds
    countLoop = 0;
    readingFor5Sec = 0;
    }


      // reset everything
      previousMillis = currentMillis;
      countLoop++;

  }   Serial.println();


    delay(1000);
}