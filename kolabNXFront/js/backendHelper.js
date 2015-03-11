/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 var userEmailtypedNumber=1;
 if(controleur==='site' && controleurView==='index'){
   require(['mainHelperLanding'], function(mainHelper) {

    // jQuery loaded by foo module so free to use it 
    $('#go').on('click', function(e) {       
       mainHelper.authentication();
        e.preventDefault();
    });
    
    $('#create').on('click', function(e) {       
       mainHelper.subscribe();
        e.preventDefault();
    });
    
     $('#login_code').on('click', function(e) {       
       mainHelper.codeValidator();
        e.preventDefault();
      });
      
       $('#reset_user_go').on('click', function(e) {       
          mainHelper.needToResetPass('user');
        e.preventDefault();
      });
      
       $('#reset_email_go').on('click', function(e) {       
           mainHelper.needToResetPass('email');
        e.preventDefault();
      });
      
              
       /* $(window).load(function() {
        /** this is come when complete page is fully loaded, including all frames, objects and images **/
         /*
            var tz = jstz.determine(); // Determines the time zone of the browser client
            var timezone = tz.name(); //'Asia/Kolhata' for Indian Time.
             //  console.log('timezone '+timezone); 
              mainHelper.setUserZone(timezone);  
        });*/

});       
 }
 
  if(controleur==='userauthentification' && (controleurView==='registration')){

   require(['mainHelperRegis'], function(helperRegis) {
    var regisP1Send1=false;
    var regisP1Send2=false;
    var regisP2Send=false;
    // jQuery loaded by foo module so free to use it 
    $(document).ready(function(){
          $('#upload').on('change', helperRegis.prepareUpload);
          
           var input = document.getElementById('location');
                        var options = {
                           types: ['(cities)']
                         };

                    autocomplete = new google.maps.places.Autocomplete(input, options);
                                            
            if(gmailfriendslist=='click'){        
                email('gm');
            }            
               
             if(yahoofriendslist=='click'){            
                  email('ya');
             }
         
             if(microsoftfriendslist=='click'){            
               email('ms');   
              }            
    });
    
       $('#microsoft').on('click', function(e) {     
       helperRegis.menuLink(this);
        e.preventDefault();
       });
    
      $('#yahoo').on('click', function(e) {     
       helperRegis.menuLink(this);
        e.preventDefault();
     });
     
      $('#google').on('click', function(e) {     
       helperRegis.menuLink(this);
        e.preventDefault();
     });
    
      $('#twitter').on('click', function(e) {     
       helperRegis.importUserInfoFrom(this);
        e.preventDefault();
     });
     
     $('#facebook').on('click', function(e) {     
       helperRegis.importUserInfoFrom(this);
        e.preventDefault();
     });
    
    
      $('#regisP1').on('click', function(e) {     
         loading(1); 
         if(regisP1Send1 && regisP1Send2){
            helperRegis.registrationManager();   
         }else{
           if(!regisP1Send1){
             $("#user").blur();  
           }
           
           if(!regisP1Send2){
             $("#pass1").blur();  
           }
           setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
                                         
            setTimeout(function() {
                                      if(position===1 && regisP1Send1 && regisP1Send2){
                                      $('#regisP1').click();    
                                      }
                                      
                                         }, 1000);
                                                             
          }
          
	 
        e.preventDefault();
      });
    
     $('#regisP2').on('click', function(e) {     
         loading(1);
		 helperRegis.userProfileCreate();
        e.preventDefault();
     });
     
     
     $('#regisP3').on('click', function(e) {     
        loading(1);
        helperRegis.userInviteFriends();
        e.preventDefault();
     });
	 
	 
        $('#emailPlus').on('click', function(e) {     
	 //if(userEmailtypedNumber<25){
		userEmailtypedNumber++;
		var field2=' <p class="title">Email '+userEmailtypedNumber+'</p><input class="field" type="email" />';
			$('#gn_list hr').before(field2);
	/* }else{
	 field('gn_list');	
	 }*/
	
	e.preventDefault();
     });
    
   $("#user").blur(function(){
       var username=$('#user').val();
       regisP1Send1=false;   
            if (username.trim()==='') {                                   
                field('user');            
            }else{                                 
                loading(1);
                  jQuery.ajax({                          
                           /* async: false,
                            cache: false,*/
                            url: http_base+"/user/usernameChecker",
                            type: "POST",
                            dataType:'json', 
                            data: {username:username},
                            success:function(resp) {                                   	                                                                                                                    
                            var checker=resp.status;
                            if(checker){
                               taken();   
                               regisP1Send1=false;   
                            }else{
                             regisP1Send1=true;   
                            }
                            // console.log(body);
                             setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
                                }
                            });
                           
        }
    });    
    
   $("#pass1").blur(function(){
       var password=$('#pass1').val();
         regisP1Send2=false; 
            if (password.trim()==='') {                                   
                field('pass1');            
            }else{
                //$("#user").blur();
                loading(1);
                 jQuery.ajax({        
                            /*async: false,            
                            cache: false,*/                                             
                            url: http_base+"/user/commonPassword",
                            type: "POST",
                            dataType:'json', 
                            data: {password:password},
                            success:function(resp) {                                   	                                                                                                                    
                            var checker=resp.status;
                            // console.log(body);
                            if(checker){
                               regisP1Send2=false; 
                               pass10000();  
                               
                            }else{
                            regisP1Send2=true;       
                            }
                             setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
                                }
                            });
                           
                            
          }
     
                      
        }); 



 });
  }
 
 
   if(controleur==='userauthentification' && controleurView==='resetpassword'){
       require(['resetHelper'], function(resetHelp) {

            // jQuery loaded by foo module so free to use it 
            $('#passresetmanage').on('click', function(e) {       
               resetHelp.resetpasswordmanager();
                e.preventDefault();
            });

            

        });       
   }
      

 
