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
        prepareUpload: prepareUpload,
        userProfileCreate:userProfileCreate,
        registrationManager:registrationManager,
        importUserInfoFrom:importUserInfoFrom,
        menuLink:menuLink,
        userInviteFriends:userInviteFriends
    };
 
                  
   


    
function userInviteFriends(){
   var friendsToInvite1= $('.email_check:checked').next('.email_name').children('span');
   var content={};   
   var index=1;
   if(friendsToInvite1.length>0){
    //console.log(friendsToInvite) ;
      
      $(friendsToInvite1).each(function() {
        // console.log($(this).text()); 
          content['email'+index]=$(this).text();
          index++;
        });
	}
	
	if($('#gn_list input[type=email]').length>0){
    //console.log(friendsToInvite2) ;
      
      $.each($('#gn_list input[type=email]'),function(idn,valu) {
       // console.log($(valu).val()); 
		var email2=$(valu).val();
		
		 if($(valu).val().trim()!='' && filter.test(email2)){
			 content['email'+index]=$(valu).val();
          index++; 
		 }
         
        });
	}
	
	
	
	
    content['number']=parseInt(index)-1;
	if(content['number']>0){	
         jQuery.ajax({                                     
                                        cache: false,
                                        url: http_base+"/userauthentification/inviteFriends",
                                        type: "POST",
                                        dataType:'json', 
                                        data:content,
                                        success:function(resp) {                                   	                                                                                                                    
                                        // next();
                                        //console.log(resp);
                                         if(resp.status==='Success'){
                                         gmailfriendslist=null;                        
                                         yahoofriendslist=null;         
                                         microsoftfriendslist=null;
                                          next();										 
                                           }else{
                                          gmailfriendslist=null;                        
                                          yahoofriendslist=null;         
                                          microsoftfriendslist=null;
                                          location.href=http_base;     
                                           }
										  setTimeout(function() {
                                           loading(0);                                     
                                            }, 700);   
										   
                                            }
                                        });
     //console.log(content); 
	}else{
    //console.log('Solitaire') ;  
    cleanFriendToInvitationQueue();	
    }     
  
} 

function cleanFriendToInvitationQueue(){
  /// $.getJSON(http_base+'/userauthentification/friendstoinvitecleaner',function(result){
jQuery.ajax({                                     
	cache: false,
	url: http_base+"/userauthentification/friendstoinvitecleaner",
	type: "POST",
	dataType:'json', 	
	success:function(result) {  
	   
   if(result.status==='Success'){
     gmailfriendslist=null;                        
     yahoofriendslist=null;         
     microsoftfriendslist=null;
 
    }
	}     
  });
  
       next();
	   setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
}


function importUserInfoFrom(source){
    var sourceID=$(source).attr('id');
     //console.log(sourceID);
       switch(sourceID){
			case "twitter": 
			location.href=http_base+'/userauthentification/twitterconnect'; 	
			 break;
                        case "facebook": 
			location.href=http_base+'/userauthentification/facebookconnect'; 	
			 break; 
                        default:
                          break;
		} 
}
function prepareUpload(event)
{
  var files = event.target.files;
 
  //grab all form data  
 var formData = new FormData();
$.each(files, function(key, value)
	{
		//console.log(key, value);
              formData.append('image_file', value);
	});



 $.ajax({
    url: http_base+"/userauthentification/uploadImageManager",
    type: 'POST',
    data: formData,   
    cache: false,
    contentType: false,
    processData: false,
    dataType:'json',
    success: function (resp) {
     // alert(returndata);
     //console.log(resp);
     
     
     // console.log(returndata);
    }
  });
 }
 
 
 
 function userProfileCreate(){
  
    var content={};
    var createUserLock=true;     
    content['city'] = $('#location').val();
    content['gender'] = $('#usertype').val();   
    content['about'] = $('#about').val();
    
    content['cropped']=$('.image-editor').cropit('export', {
					  type: 'image/jpeg',
					  quality: .9,
					  originalSize: false
					});
	//console.log(content['cropped']);	   
    if (content['city']==='' || content['city']===' ') {
                                    field('location');
                                    createUserLock=false;
    }   
    
     if (content['about']==='' || content['about']===' ') {
                                    field('about');
                                    createUserLock=false;
    } 
    
    if(createUserLock){                        
 	$.ajax({
                
               /* async: false,
                cache: false, */ 
                url: http_base+"/userauthentification/userProfilePictureManager",
                type: 'POST',
                data: content,               
                cache: false,  
                dataType:'json',
                success: function (returndata) {
                 // alert(returndata);
                // console.log(returndata);
                 next();
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
 

 
      /* 
      * password between 6 to 20 characters which contain at least one lowercase letter, 
      * one uppercase letter, one numeric digit- 
      * See more at: http://www.w3resource.com/javascript/form/password-validation.php#sthash.XG3B4Oa0.dpuf
      * 
      * */   
  function CheckPassword(inputtxt)   
    {   
            var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;  
            if(inputtxt.match(decimal))   
            {   
         // alert('Correct, try another...')  
            return true;  
            }  
            else  
            {   
            //alert('Wrong...!')  
            return false;  
            }  
    } 
    
    
    
 
 function registrationManager(){
			//validating the form
           
	        var content={};
			var createUserLock=true;
			content['firstname'] = $('#firstn').val();
                        content['lastname'] = $('#lastn').val();
                        content['email'] = $('#email').val();
                        content['password'] = $('#pass1').val();
                        //content['city'] = $('#city').val();
                        var passwordConfirm=$('#pass2').val();
                        content['username'] = $('#user').val();
                        var tempUsername= content['username'].trim();
			// pk ? var name = document.getElementById('name');                        					
				if (content['firstname']==='' || content['firstname']===' ') {
                                   field('firstn');
                                    createUserLock=false;
                                }
                                
                                if (content['lastname']==='' || content['lastname']===' ') {
                                    field('lastn');
                                    createUserLock=false;
                                }
                                
                              /*  if (content['city']==='' || content['city']===' ') {
                                    $('#city').css({background: '#F00',color: '#fff','border-color':'#F00' });                                   
                                    $('#city').attr('placeholder','this field is required');
                                    createUserLock=false;
                                }*/
                                
                                if (content['username'].trim()==='') {                                   
                                    field('user');
                                    createUserLock=false;
                                }else if(tempUsername.split(' ').length>1 || badCharacter2()  || content['username'].length<4 || content['username'].length>20 ){
                                      username();
                                  createUserLock=false;    
                                     }
                                
                                if (content['password'].trim()==='') {
                                   field('pass1'); 
                                    createUserLock=false;
                                }else if(!CheckPassword(content['password'])){
                                    passsecurity(); 
                                    createUserLock=false;
                                }
                               
                               if (passwordConfirm==='' || passwordConfirm===' ') {
                                   field('pass2'); 
                                    createUserLock=false;
                                }else if(content['password']!==passwordConfirm){
                                     passmatch(); 
                                    createUserLock=false;  
                                }
                                
                                if(!$('#termsbox').is(':checked')){
                                    field('termsbox'); 
                                    createUserLock=false;   
                                }
                                
                            //  console.log(CheckPassword(content['password']),isCommonPswd(content['password']));
                                if(createUserLock){
                                     var offset1=new Date().getTimezoneOffset()/(-60) ;
   
                                        var d = new Date();  
                                        var str= d.toTimeString();
                                        var n=str.split("(");
                                        var str=n[0].split("T");
                                        var offset=str[1].substring(0,str[1].length-3);
                                        if(parseInt(offset)===offset1){
                                         // console.log(parseInt(offset));
                                         content['timezone']= offset1;
                                        }
                                        emailValidation(content);
                                                             
                                }else{
									setTimeout(function() {
                                        loading(0);                                     
                                         }, 700);
								}
                                
			
	          }
                  
function emailValidation(content){
     jQuery.ajax({
                                       
                                       /* async: false,
                                        cache: false,  */
                                        url: http_base+"/user/create",
                                        type: "POST",
                                        dataType:'json', 
                                        data:content,
                                        success:function(resp) {                                   	                                                                                                                    
                                               if(resp.status==='Success'){
                                               // location.href=http_base+'/userauthentification/uploadimage'; 
                                                ///  console.log(resp);
                                              
                                                setProfileImage();
                                               
                                               // setTimeout(function(){
                                                   
                                                // }, 300);
                                              //location.reload();
                                               }else{
                                                  //location.href=http_base+'';  
                                                 // console.log(resp);
                                               }
											  
                                            }
                                        }); 
}                  

  
function setProfileImage(){
           //console.log('1'); 
      // $.getJSON(http_base+'/userauthentification/setProfileImage',function(result){
           // console.log('2'); 
	jQuery.ajax({

		   /* async: false,
			cache: false,  */
			url: http_base+'/userauthentification/setProfileImage',
			type: "POST",
			dataType:'json', 			
			success:function(result) {   
            if(result.status==='Success'){
              // console.log(result.url); 
               $('.image-editor').cropit('imageSrc', result.url);               
            }
			 next();
			  setTimeout(function() {
                                                  loading(0);                                     
                                               }, 700);
			}
          }); 
         }
    
function menuLink(id){       
    var menuID=$(id).attr('id');
    switch(menuID){           
        case 'google':
            if(gmailfriendslist!='click'){
            location.href=http_base+'/userauthentification/connectGmail';     
            }else{
                email('gm');
            }            
            break;
         case 'yahoo':
             if(yahoofriendslist!='click'){
               location.href=http_base+'/userauthentification/connectYahoo'; 
              }else{
                  email('ya');
              }
            break;  
        case 'microsoft':
             if(microsoftfriendslist!='click'){
               location.href=http_base+'/userauthentification/connectMicrosoft'; 
              }else{
               email('ms');   
              }
            break;   
        default:
            break;
    }
}

function badCharacter(str) {  
  str = str.toLowerCase();
 var badChar=false;
  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="; 
  for (var i=0, l=from.length ; i<l ; i++) {
   var count = (str.match(new RegExp(from.charAt(i), 'g')) || []).length;
   if(count>0){
    badChar=true; 
    break;
   }
  }
  
  return badChar;
}

function badCharacter2(){
    var str = $('#user').val();
    var badChar=/^[a-zA-Z0-9]*$/.test(str);
     if( typeof badChar!='undefined' && badChar== false) {
     return true;
     }else{
      return false;  
     }
}



});

