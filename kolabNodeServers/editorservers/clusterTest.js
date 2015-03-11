/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster) {
  // we create a HTTP server, but we do not use listen
  // that way, we have a socket.io server that doesn't accept connections
  var server = require('http').createServer();
  var io = require('socket.io').listen(server);
  //----------------------------------------------------------------
var mongoose = require('mongoose');
var options = {
  db: { native_parser: true, recordQueryStats:true, logger:{error:function(message, object) {         
}, log:function(message, object) {
}, debug:function(message, object) {
 
}} }
 
};
mongoose.connect('mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX');
var Schema = mongoose.Schema;
var socketBalancedSchema = new Schema({usernotifications: {} },{capped:{size : 5242880, max : 10000000, autoIndexId: true}});
var SocketBalanced = mongoose.model('clusterevents', socketBalancedSchema); 
var stream = SocketBalanced.find().tailable().stream();
//----------------------------------------------------------------
  
  
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
   console.log('Maters ip '+ serverPrivateIP);
   },
1000);
 
  

  for (var i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  }); 
   
}

if (cluster.isWorker) {
 
  var http = require('http');
  var server = http.createServer(handler);
  var io = require('socket.io').listen(server, {transports:['xhr-polling','polling', 'websocket', 'flashsocket']});
  

  //----------------------------------------------------------------
var mongoose = require('mongoose');
var options = {
  db: { native_parser: true, recordQueryStats:true, logger:{error:function(message, object) {         
}, log:function(message, object) {
}, debug:function(message, object) {
 
}} }
 
};
mongoose.connect('mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX');
var Schema = mongoose.Schema;
var socketBalancedSchema = new Schema({usernotifications: {} },{capped:{size : 5242880, max : 10000000, autoIndexId: true}});
var SocketBalanced = mongoose.model('clusterevents', socketBalancedSchema); 
var stream = SocketBalanced.find().tailable().stream();
//----------------------------------------------------------------
 function handler(req, res) {
//Console.log('Welcome');
res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
});
}
  io.sockets.on('connection', function(socket) {
  console.log('connected to worker: ' + cluster.worker.id);
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
   console.log('worker ip '+ serverPrivateIP);
   },
1000);
         
                 var doc={};            
                 doc['server']=serverPrivateIP;
                 doc['worker']= cluster.worker.id;
                 
             // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
              var thisSocketBalanced = new SocketBalanced();            
              thisSocketBalanced.usernotifications=doc;
               thisSocketBalanced.save(function (err) {
                    if (err){ console.log('err2: ',err);}
                }); 
  });

  server.listen(8087);
  
   //----------------------------------------------------------------
stream.on('data', function (docu) {
                  // do something with the mongoose document
                  var notif=docu.usernotifications;
                 
                  console.log(notif);
                 
                }).on('error', function (err) {
                  // handle the error
                  console.log('error1', err);
                }).on('close', function () {
                  // the stream is closed
                });
//--------------------------------------------------------------------
}


