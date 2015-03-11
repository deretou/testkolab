/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongo = require('mongoskin');


function NodeHelper() {  
  
};

NodeHelper.prototype.getUserInfos = function(userID) {  
     var db = mongo.db("mongodb://kolabdb:yM32elq5fN9Q95q3whk5qnZW5B1VOcP0J7.QjY1EDso-@ds064897-a0.mongolab.com:64897,ds064897-a1.mongolab.com:64896/kolabdb", {native_parser:true});
         db.bind('users');
        // var usersavailable=null;               
        // console.log(userID);
          db.users.findOne({userID: userID}, function(err, updated_user) {
           if (err) { throw err; }  
         //  console.log(updated_user);
          // usersavailable=updated_user.userID;
             });
       
     // console.log(usersavailable); 
};

NodeHelper.prototype.manageOnlineNotificationsEvent=function(notif, sockets){
   /* var db = mongo.db("mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX", {native_parser:true});
        db.bind('contacts');*/   
     switch(notif.notifType){
			case "useronline": 
				sendOnLineNotif(notif, sockets);
			break;
                        case "useronlineack": 
				sendOnLineACKNotif(notif, sockets);
			break;
                        case "useroffline": 
				sendOffLineNotif(notif, sockets);
			break;
			case "squareinvitation":
				sendSquareInvitationNotif(notif, sockets);
			break;
                        case "squareinvitationaccepted":
				sendSquareInvitationAcceptedNotif(notif, sockets);
			break;
                        case "kolabinvitation":
				sendKolabInvitationNotif(notif, sockets);
			break;
                        case "kolabinvitationaccepted":
				sendKolabInvitationAcceptedNotif(notif, sockets);
			break;
                        default:
                        break;
		}   
    
};

NodeHelper.prototype.deleteUserOnLine=function(id){
 var db = mongo.db("mongodb://kolabdb:yM32elq5fN9Q95q3whk5qnZW5B1VOcP0J7.QjY1EDso-@ds064897-a0.mongolab.com:64897,ds064897-a1.mongolab.com:64896/kolabdb", {native_parser:true});
     db.bind('usersonline');
    // console.log(id);
     db.usersonline.remove({userID:id}, function(err) {
                if(err) {
                    return console.log('user '+ id +' remove error:', err);
                }
                db.close();
            });
                            
               
             
};

NodeHelper.prototype.updateUserOffLineSession=function(id){
 var db = mongo.db("mongodb://kolabdb:yM32elq5fN9Q95q3whk5qnZW5B1VOcP0J7.QjY1EDso-@ds064897-a0.mongolab.com:64897,ds064897-a1.mongolab.com:64896/kolabdb", {native_parser:true});
      var d = new Date();
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      var curr_hour = d.getHours();
      var curr_min = d.getMinutes();
      var curr_sec = d.getSeconds();
      var curr_sessionEndDate=curr_year+'-'+curr_month+'-'+curr_date+' '+curr_hour+':'+curr_min+':'+curr_sec;    
      db.bind('userssessions');     
      db.userssessions.update({sessionID:id}, {$set:{sessionEndDate:curr_sessionEndDate}}, function(err, result) {
               if(err) {
                  return console.log('remove error:', err);
                }
                db.close();
               });                                                        
};

NodeHelper.prototype.getUserContact = function(userID) {  
     var db = mongo.db("mongodb://kolabdb:yM32elq5fN9Q95q3whk5qnZW5B1VOcP0J7.QjY1EDso-@ds064897-a0.mongolab.com:64897,ds064897-a1.mongolab.com:64896/kolabdb", {native_parser:true});
         db.bind('contacts');
         var usersavailable=null;               
        // console.log(userID);
          db.contacts.findOne({userID: userID}, function(err, user) {
           if (err) { throw err; }  
         //  console.log(updated_user);
           usersavailable=updated_user.userID;
             });
       
     //console.log(usersavailable); 
};


NodeHelper.prototype.manageChatEvent=function(notif, sockets){
        var exploderTemp= notif.touser;
        var exploder= exploderTemp.split("_kolabChat_");
        if(sockets[exploder[0]]){                                                    
              //console.log(exploder);
             // console.log(notif);
              sockets[exploder[0]].emit('chatevent', {from:notif.user,fromname:notif.notifType,body:notif.text,timestan:exploder[1]});                                    
       }
    
};

NodeHelper.prototype.manageKzoneChatEvent=function(notif, sockets, mainSocket){
   /* var db = mongo.db("mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX", {native_parser:true});
        db.bind('contacts');*/   
     switch(notif.notifType){
			case "userjoin": 
				sendJoinNotif(notif, sockets);
			break;                       
                        default:
                        break;
		}       
};


module.exports = NodeHelper;  

//----------------------------------------------------------------------------------------
function sendJoinNotif(notif, sockets, mainSocket){
mainSocket.broadcast.to(notif.touser).emit('newuser',{usercolor:notif.user,username:notif.text,userpic:notif.touser});     
} 


function sendOnLineNotif(notif, sockets){
       for (var k in sockets){
        if (typeof sockets[k] !== 'function') {
        if(k>1){          
          var contats=sockets[k].contacts; 
          var me=sockets[k].userid;
          if(contats.length>0){
              for (var c in contats){
               if(contats[c].userID==notif.user){
               sockets[k].emit('onlinenotif', contats[c]);        
               }   
              }   
          }
                
        }
         
    }
} 
}

function sendOffLineNotif(notif, sockets){
       for (var k in sockets){
        if (typeof sockets[k] !== 'function') {
        if(k>1){          
          var contats=sockets[k].contacts; 
          var me=sockets[k].userid;
          if(contats.length>0){
              for (var c in contats){
               if(contats[c].userID==notif.user){
               sockets[k].emit('offlinenotif', contats[c]);        
               }   
              }   
          }
                
        }
         
    }
} 
}


function sendOnLineACKNotif(notif, sockets){
       if(sockets[notif.touser]){
         var contats=sockets[notif.touser].contacts;          
          if(contats.length>0){
              for (var c in contats){
               if(contats[c].userID==notif.user){
               sockets[notif.touser].emit('onlinenotif', contats[c]);        
               }   
              }   
          }   
       }  
}


function sendSquareInvitationNotif(notif, sockets){
    if(sockets[notif.touser]){
      var sqInvite={}; 
      sqInvite['fromUser']=notif.user;
      sqInvite['squareID']=notif.text;
      sockets[notif.touser].emit('squareinvitationnotif',sqInvite);   
    }
}