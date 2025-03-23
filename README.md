# arduino-web-LCD-controller

![alt text](https://us-east-1.tixte.net/uploads/tortaxx.no-friends.xyz/m8lve631y51.png "image")

# required software
- [NodeJS](https://nodejs.org/)
- [Arduino IDE](https://www.arduino.cc/en/software/)
- recommanded [Visual Studio Code](https://code.visualstudio.com/download)

# required equipment
- LCD 1602 Module (with pin header)
- breadboard
- arduino uno 
- potentiometer

# Installation
1. first, clone this repository :
`git clone https://github.com/tortaxx4k/arduino-web-LCD-controller`
2. Open script.ino and upload it on your arduino card
3. Open app.js and open the terminal; execute this command :
`npm install`
4. In app.js, replaces `path: 'COM5',` by your port
5. Lauch start.bat

# wiring
![alt text](https://us-east-1.tixte.net/uploads/tortaxx.no-friends.xyz/image.png "wiring")

# API
- For api requests, the URL is https://localhost/api/send-text
- method : `POST`
- argument : `MESSAGE` 

# need help ?
contact me [on discord](https://discord.com/users/1242236093491843154)