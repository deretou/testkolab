/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app, {log: false ,transports:['xhr-polling','polling', 'websocket', 'flashsocket']});
app.listen(80);

function handler(req, res) {
//Console.log('Welcome');
res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*.kolabalison.com',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
});
}

//---------------------------------------------------------------
var NodeHelper= require('./nodeHelper.js');  
//----------------------------------------------------------------
var mongoose = require('mongoose');
var options = {
  db: { native_parser: true, recordQueryStats:true, logger:{error:function(message, object) {         
}, log:function(message, object) {
}, debug:function(message, object) {
 
}} }
 
};
mongoose.connect('mongodb://kolabdb:yM32elq5fN9Q95q3whk5qnZW5B1VOcP0J7.QjY1EDso-@ds064897-a0.mongolab.com:64897,ds064897-a1.mongolab.com:64896/kolabdb');
var Schema = mongoose.Schema;
var socketBalancedSchema = new Schema({usernotifications: {} },{capped:{size : 542880, max : 10000, autoIndexId: true}});
var SocketBalanced = mongoose.model('notificationsevents', socketBalancedSchema); 
var stream = SocketBalanced.find().tailable().stream();
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
var kolabMainLayout=io.of('/kolabMain').on('connection', function (socket) {
              
          
           socket.on('newuser',function(userID){
               socket.idwould=userID;  
              // console.log(socket.idwould);
               if(io.of('/kolabMain').sockets[socket.userid]){
                 delete io.of('/kolabMain').sockets[socket.userid];
                 delete  socket.userid;
               }
               socket.emit('validationidentity');
               
           });
          
          socket.on('setMyIdentity',function(userID){            
              if(socket.idwould!=null && socket.idwould==userID.id){
              // console.log(userID);  
               socket.userid=userID.tok;
               socket.email=userID.id;
               socket.usersessionid=userID.usersessionid;
               socket.contacts=userID.contacts;
               io.of('/kolabMain').sockets[socket.userid] = socket;
              // io.of('/kolabMain').contacts[socket.userid] =userID.contacts;
              // console.log(io.of('/kolabMain').sockets[socket.userid]); 
                 var doc={};            
                 doc['server']=serverPrivateIP;
                 doc['user']=socket.userid;
                 doc['notifType']='useronline';
                 doc['socketposition']='mainlayout';
                 doc['text']=''; 
                 doc['touser']='';  
             // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
              var thisSocketBalanced = new SocketBalanced();            
              thisSocketBalanced.usernotifications=doc;
               thisSocketBalanced.save(function (err) {
                    if (err){ console.log('err2: ',err);}
                });  
               
               socket.emit('validation',true);
              }else{
                socket.emit('validation',false);  
              }                                                        
           });
                    
           socket.on('squareinvitationnotif',function(objects){
               
               for (var k in objects){
                    // console.log(objects[k]);
                     var docnotif={};            
                     docnotif['server']=serverPrivateIP;
                     docnotif['user']=socket.userid;
                     docnotif['notifType']='squareinvitation';
                     docnotif['socketposition']='mainlayout';
                     docnotif['text']=objects[k].squareid;
                     docnotif['touser']=objects[k].touser;  
                 // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
                     var thisSocketBalanced = new SocketBalanced();            
                     thisSocketBalanced.usernotifications=docnotif;
                     thisSocketBalanced.save(function (err) {
                        if (err){ console.log('err2: ',err);}
                    });  
                      }
           });
           
           
           socket.on('useronlineacknotif',function(touser){                           
                     var docnotif={};            
                     docnotif['server']=serverPrivateIP;
                     docnotif['user']=socket.userid;
                     docnotif['notifType']='useronlineack';
                     docnotif['socketposition']='mainlayout';                    
                     docnotif['touser']=touser;  
                 // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
                     var thisSocketBalanced = new SocketBalanced();            
                     thisSocketBalanced.usernotifications=docnotif;
                     thisSocketBalanced.save(function (err) {
                        if (err){ console.log('err2: ',err);}
                    });  
                     
           });
           
           

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
	// remove the username from global usernames list		
            //delete  userSocketID[socket.userid]; 
             var doc={};            
                 doc['server']=serverPrivateIP;
                 doc['user']=socket.userid;
                 doc['notifType']='useroffline';
                 doc['socketposition']='mainlayout';
                 doc['text']=''; 
                 doc['touser']='';  
             // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
              var thisSocketBalanced = new SocketBalanced();            
              thisSocketBalanced.usernotifications=doc;
               thisSocketBalanced.save(function (err) {
                    if (err){ console.log('err2: ',err);}
                });
             //********************************************   
              var notifhelper= new NodeHelper();
                  notifhelper.deleteUserOnLine(socket.userid);
                  notifhelper.updateUserOffLineSession(socket.usersessionid);
             delete io.of('/kolabMain').sockets[socket.userid]; 
          //   delete io.of('/kolabMain').contacts[socket.userid];
	});
});
//----------------------------------------------------------------
stream.on('data', function (docu) {
                  // do something with the mongoose document
                  var notif=docu.usernotifications;
                  var notifhelper= new NodeHelper();
                  //console.log(notif);
                  if(notif.socketposition=='mainlayout'){
                    if( io.of('/kolabMain').sockets.length>0){
                    // io.of('/kolabMain').sockets[notif.user].emit('onlinenotif','you');  
                    notifhelper.manageOnlineNotificationsEvent(notif,io.of('/kolabMain').sockets); 
                    }  
                  
                  }else if(notif.socketposition=='chatlayout'){
                  
                    if( io.of('/kolabChat').sockets.length>0){
                    // io.of('/kolabMain').sockets[notif.user].emit('onlinenotif','you');  
                    notifhelper.manageChatEvent(notif,io.of('/kolabChat').sockets);
                    //console.log(notif);
                    }  
             
                  }
                  else if(notif.socketposition=='kzonechatlayout' && notif.server!=serverPrivateIP){
                  
                    if( io.of('/kolabKzone').sockets.length>0){
                    // io.of('/kolabMain').sockets[notif.user].emit('onlinenotif','you');  
                    notifhelper.manageKzoneChatEvent(notif,io.of('/kolabKzone').sockets,kolabKzoneLayout);
                    //console.log(notif);
                    }  
             
                  }
                }).on('error', function (err) {
                  // handle the error
                  console.log('error1', err);
                }).on('close', function () {
                  // the stream is closed
                });
//--------------------------------------------------------------------

kolabKzoneLayout=io.of('/kolabKzone').on('connection', function (member) {
              
          var roomToJoin=null;
           member.on('newuser',function(userInfo){
              member.userid=userInfo.tok;
              member.square=userInfo.toksqid;
              member.usercolor=userInfo.id;
              member.username=userInfo.tokn;
              member.userpic=userInfo.tokpic;
              member.join(userInfo.toksqid);
              roomToJoin=userInfo.toksqid;
              io.of('/kolabKzone').sockets[member.userid+'-'+member.square] = member;
              var docChat={}; 
               // var timestan= Date.now();               
                 docChat['server']=serverPrivateIP;
                 docChat['user']= member.usercolor;
                 docChat['notifType']='userjoin';
                 docChat['socketposition']='kzonechatlayout';
                 docChat['text']=member.username;
                 docChat['touser']=member.square;  
             // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
              var thisSocketBalanced = new SocketBalanced();            
              thisSocketBalanced.usernotifications=docChat;
               thisSocketBalanced.save(function (err) {
                    if (err){ console.log('err2: ',err);}
                }); 
              // console.log(userInfo);
               member.broadcast.to(member.square).emit('newuser',userInfo);                 
               
           });

           member.on('kzonechatmessagesend',function(msgs){
               
                var docChat={}; 
               // var timestan= Date.now(); 
               var d1 = new Date();
               var d2 = new Date(Date.UTC( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() ));
               var timestan=Math.floor(d2.getTime()/ 1000);
                 docChat['server']=serverPrivateIP;
                 docChat['user']= member.usercolor;
                 docChat['notifType']=member.username;
                 docChat['socketposition']='kzonechatlayout';
                 docChat['text']=msgs.body; 
                 docChat['touser']=member.square;  
             // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
              var thisSocketBalanced = new SocketBalanced();            
              thisSocketBalanced.usernotifications=docChat;
               thisSocketBalanced.save(function (err) {
                    if (err){ console.log('err2: ',err);}
                }); 
                msgs['timestan']=timestan.toString();
                msgs['userid']= member.usercolor;
                msgs['username']=member.username;
                member.emit('kzonericochetmsg',msgs);
                //  console.log(msgs['username'],member.square,msgs['body']);
                member.broadcast.to(member.square).emit('newkzonemsg',msgs);
             
               //kolabKzoneLayout.broadcast.to(member.square).emit('newkzonemsg',msgs);
             });
            
   

	// when the user disconnects.. perform this
	member.on('disconnect', function(){
	// remove the username from global usernames list		
            //delete  userSocketID[socket.userid]; 
              member.leave(member.square);
              delete io.of('/kolabKzone').sockets[member.userid+'-'+member.square];
	});
});

//--------------------------------------------------------------------

kolabChatLayout=io.of('/kolabChat').on('connection', function (chat) {
              
          
           chat.on('newuser',function(userID,userName){
              chat.userid=userID;
              chat.username=userName;
              console.log(userID,userName);
              io.of('/kolabChat').sockets[chat.userid] = chat;
           });
           
            chat.on('chatmessagesend',function(msgs){
               if(!msgs['notSafeParam']){
                var docChat={}; 
               // var timestan= Date.now(); 
               var d1 = new Date();
               var d2 = new Date(Date.UTC( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() ));
               var timestan=Math.floor(d2.getTime()/ 1000);
                 docChat['server']=serverPrivateIP;
                 docChat['user']=chat.userid;
                 docChat['notifType']=chat.username;
                 docChat['socketposition']='chatlayout';
                 docChat['text']=msgs.body; 
                 docChat['touser']=msgs.to+'_kolabChat_'+ timestan;  
             // io.sockets.emit('loadbalancing',doc); { usersocket: socket, userdoc: doc }  
              var thisSocketBalanced = new SocketBalanced();            
              thisSocketBalanced.usernotifications=docChat;
               thisSocketBalanced.save(function (err) {
                    if (err){ console.log('err2: ',err);}
                }); 
                msgs['timestan']=timestan.toString();
                chat.emit('ricochetmsg',msgs);  
               
                } 
                
               
             });

                    
   

	// when the user disconnects.. perform this
	chat.on('disconnect', function(){
	// remove the username from global usernames list		
            //delete  userSocketID[socket.userid]; 
           delete io.of('/kolabChat').sockets[chat.userid];
	});
});

