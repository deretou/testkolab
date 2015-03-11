/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = require('http').createServer(handler);
var io = require('socket.io').listen(app/*, {transports:['xhr-polling','polling', 'websocket', 'flashsocket']}*/);

app.listen(2525);

function handler(req, res) {
//Console.log('Welcome');
/*res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*.kolabalison.com',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
});*/
}

//----------------------------------------------------------------
var os=require('os');
var ifaces=os.networkInterfaces();
var serverPrivateIP;
for (var dev in ifaces) { 
  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4' && dev==='eth0') {
     // console.log(dev,details);
      serverPrivateIP=details.address;
    }
  });
}
setTimeout(function(){
   console.log(serverPrivateIP);
   },
1000);
//-------------------------------------------------------------------

var kolabKzoneLayout=io.of('/kolabTest').on('connection', function (member) {
        var address = member.handshake.address;
                console.log('------------ Client Information ---------------------');
               // console.log(member.handshake);               
                console.log('-----------------------------------------------------');
                console.log("New connection from " + address.address + ":" + address.port);
                console.log('-----------------------------------------------------');      
          
       member.on('testeditor', function(test){
	console.log(test);
        
	});  
                    
   

	// when the user disconnects.. perform this
	member.on('disconnect', function(){
	
        
	});
});