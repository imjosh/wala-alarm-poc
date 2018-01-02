# wala-alarm-poc

**Walabot alarm clock proof-of-concept:**

Wake-up alarm based on Walabot, Amazon Alexa, and IFTTT to control IoT / "smart" devices. This project is a proof-of-concept that
triggers off standard Alexa alarms using the IFTTT Alexa integration ("Your alarm goes off").

A future project will include Alexa Skill integration but that requirement increases the infrastructure complexity by an order of magnitude or two.

__This project is a work in progress__

**What's working:** (_Currently tested on Windows only_)

* Node / Express webserver
  * Handle incoming alarm webhook
  * Send webhooks to IFTTT
  * Actions configuration

* ngrok support
  * Auto-create ngrok tunnel
  * Authtoken support (free or paid accounts)
  * Custom subdomain support (paid accounts only)

**Todo:**

* Testing on Linux / Raspberry Pi
* Walabot device interface
* Walabot control logic - trigger wake-up device(s) if you are still in bed after the alarm goes off

