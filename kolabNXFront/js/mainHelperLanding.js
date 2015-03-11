/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(function() {

    // Some set up 
    // code here
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    // Return module with methods
    return {
        authentication: authentication,
        subscribe:subscribe,
        codeValidator:codeValidator,
        needToResetPass:needToResetPass//,
        //setUserZone:setUserZone
    };


/*function setUserZone(idzone){
  jQuery.ajax({
                                        async: false,
                                        cache: false,
                                        url: http_base+"/user/timezoneoffsettest",
                                        type: "POST",
                                        dataType:'json', 
                                        data:{tz: idzone},
                                        success:function(resp) {                                   	                                                                                                                    
                                               if(resp.status==='Success'){

                                                  
                                               }else{
                                               //console.log(resp);
                                               }
                                            }
                                        });    
}*/
  
function needToResetPass(token){
   var content={};
   var send =true;
   content['token']=token;
   if(token=='user'){
     content['username']= $('#reset_user').val(); 
      if(content['username'].trim()==''){
       field('reset_user');
       send=false;  
       }
   }else{
      content['email']= $('#reset_email').val();
      if(content['email'].trim()==''){
       field('reset_email');
       send=false;  
       }
   }
    loading(1); 
      if(send){
        //console.log(content);
        jQuery.ajax({
                        
                           // cache: false,
                            url: http_base+"/userauthentification/needtoresetpass",
                            type: "POST",
                            dataType:'json', 
                            data: content,
                            success:function(resp) {                                   	                                                                                                                                               
                          
                                if(resp.status==='Success'){                                                                 
                                 // location.href=http_base+'/userauthentification/resetpassword';  
                                  loginreset_go();
                                }else{                                                                                              
                                       if(token=='user'){
                                        field('reset_user');   
                                       }else{
                                        field('reset_email');   
                                       }
                                       
                                        setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
                                }
                                }
                            });   
    }else{
         setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
    }
 } 
 
function codeValidator(){
   var content={};
   var send =true;
    content['code'] = $('#code').val();
    if(content['code']=='' || content['code']==' '){
      field('code');
      send=false;  
    }
     loading(1);  
      if(send){
        jQuery.ajax({
                          
                           // cache: false,
                            url: http_base+"/userauthentification/codevalidation",
                            type: "POST",
                            dataType:'json', 
                            data: content,
                            success:function(resp) {                                   	                                                                                                                                               
                               //console.log(resp);
                                if(resp.status==='Success'){                                 
                                  $('#code').val('');
                                    location.href=http_base+'/user/locker?action=main';  
                                }else{
                                  $('#code').val('');
                                    //location.href=http_base; 
                                    field('code');
                                   
                                     setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
                                
                                 }
                                }
                            });   
    }else{
          setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
    }
    
}
    
function subscribe(){
    var email = $('#email').val();
    var send =true;
    if (!filter.test(email)) {
                                     field('email');
                                      send=false;
                                }
   loading(1);                             
    if(send){
        jQuery.ajax({
                          
                           // cache: false,
                            url: http_base+"/userauthentification/sendEmail",
                            type: "POST",
                            dataType:'json', 
                            data: {destEmail:email},
                            success:function(resp) {                                   	                                                                                                                                               
                               //console.log(resp);
                                if(resp.status==='Success'){                                 
                                 if(resp.p==1){                                   
                                   loginnew_resend();
                                   }else if(resp.p==2){
                                   loginnew_go();       
                                   }
                                  $('#email').val('');
                                }else{
                                   if(resp.p==4){
                                   loginnew_exists();    
                                   }else if(resp.p==5){
                                  console.log(resp);   
                                   }else{
                                    field('email');   
                                   } 
                                    
                                }
                                
                                  setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
                                }
                            });   
    }else{
     setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);     
    }
    
   
 
}    

function authentication(){
   var content={};
   var send =true;
    content['email'] = $('#user').val();
    content['password'] = $('#pass').val();
    if (filter.test(content['email'])) {
        content['authentype']='email';                           
    }else if(!filter.test(content['email']) && content['email']!==''){
        content['authentype']='username'; 
    }else{    
      field('user');
      send=false;    
    }
                                
                             
    if (content['password'].trim()==='') {
                                    field('pass');
                                    send=false;
                                }       
      loading(1);                              
    if(send){
       // console.log(content);
       jQuery.ajax({
                                       
                                       /* async: false,
                                        cache: false,*/
                                        url: http_base+"/userauthentification/authenticate",
                                        type: "POST",
                                        dataType:'json', 
                                        data:content,
                                        success:function(resp) { 
                                           // console.log(resp);
                                             //console.log(resp.profilcomplet>=3);
                                          if(resp.status==='Success' && resp.profilcomplet>=3 && resp.accessCodeVerified==='yes'){
                                             location.href=http_base+'/user/locker?action=main';                                              
                                               }else if(resp.status==='Failed3'){
                                                
                                                login_code();
                                                 setTimeout(function() {
                                                    loading(0);                                     
                                                  }, 700); 
                                                
                                               }else if(resp.status==='Failed'){                                                
                                                 field('user');                                                 
                                                 field('pass');
                                                 console.log(resp);
                                                  setTimeout(function() {
                                                  loading(0);                                     
                                                   }, 700); 
                                               }else{
                                              location.href=http_base+'/userauthentification/registration'; 
                                              //console.log(resp.profilcomplet<3);
                                               }
                                            }
                                        });  
    }else{
         setTimeout(function() {
                                        loading(0);                                     
                                         }, 700); 
    }
      
}


});