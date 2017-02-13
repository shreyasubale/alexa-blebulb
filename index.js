'use strict';
var smartLight = require("mansaa-smartshine") 
const FauxMo = require('fauxmojs');
var os = require('os');
var ifaces = os.networkInterfaces();
var rainbowLedInstance = null;

smartLight.discover(function(rainbowLed){
    console.log('found ' + rainbowLed.uuid);
    rainbowLedInstance = rainbowLed;
    rainbowLed.on('disconnect', function() {
      console.log('disconnected!');
      process.exit(0);
    });

    rainbowLed.connectAndSetup(function(err){
      if(err){
        console.log(err);
      }else{
        console.log("bt ready")

        var fauxMo = new FauxMo({
        ipAddress: '192.168.1.123',
        devices: [
          {
            name: 'living room light',
            port: 11000,
            handler: (action) => {
              if(action === "on"){
                console.log("switching on");
                rainbowLed.turnOn(function(){
                  // rainbowLed.disconnect();
                })
              }
              if(action === "off"){
                console.log("switching off");
                rainbowLed.turnOff(function(){
                  // rainbowLed.disconnect();
                })
              }



            }
          }]
        });
     
        console.log('started..');

        
      }

    })
})

