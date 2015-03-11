/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = require('http').createServer(function(req, res) {
//Console.log('Welcome');
  // Website you wish to allow to connect
    
});

app.listen(2424);
var io = require('socket.io').listen(app, { log: false});

var mongoose = require('mongoose');
var options = {
  db: { native_parser: true, recordQueryStats:true, logger:{error:function(message, object) {
 console.log('1');           
}, log:function(message, object) {
  console.log('2');   
}, debug:function(message, object) {
  console.log('3'); 
}} }
 
};
mongoose.connect('mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX');
var Schema = mongoose.Schema;
var socketBalancedSchema = new Schema({userdoc: {} },{capped:{size : 5242880, max : 1000000, autoIndexId: true}});
var SocketBalanced = mongoose.model('socketbalanced', socketBalancedSchema); 

/*
io.configure('development', function(){
  io.set('transports', ['websocket']);
});
io.set('origins','kolabnx.cloudapp.net:*');
io.set('transports', [
    'websocket'
    , 'flashsocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
]);*/
//mongoose.get('logger');
var stream = SocketBalanced.find().tailable().stream();

/*var mongo = require('mongoskin');
var db = mongo.db("mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX", {native_parser:true, recordQueryStats:true, logger:{error:function(message, object) {
 console.log('1');           
}, log:function(message, object) {
  console.log('2');   
}, debug:function(message, object) {
  console.log('3'); 
}}});*/
 //console.log('4'); 

//io.set('store', client);


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
var kolabMainLayout=io.of('/kolabPlatform').on('connection', function (socket) {     
       
               
       //  channel.on('document', console.log); 
           socket.on('newuser',function(userID){
             var doc={};
             console.log(userID);
             doc['server']=serverPrivateIP;
             doc['message']=userID;
             // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
           var thisSocketBalanced = new SocketBalanced();            
            thisSocketBalanced.userdoc=doc;
               thisSocketBalanced.save(function (err) {
                    if (err){ console.log('err2: ',err);}
                });  
                
                

          });

                    
   

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
	// remove the username from global usernames list		
          
	});
});

stream.on('data', function (docu) {
                  // do something with the mongoose document
                  console.log(docu);
                }).on('error', function (err) {
                  // handle the error
                  console.log('error1', err);
                }).on('close', function () {
                  // the stream is closed
                });
 