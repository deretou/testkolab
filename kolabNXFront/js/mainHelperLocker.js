/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["http://kolabrealtime.trafficmanager.net/socket.io/socket.io.js",http_base+"/kolabNXFront/js/jQuery-Chrono/lib/jquery.chrono.min.js","//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js"],function(iomain) {

    // Some set up 
    // code here
    var layoutSocket;
    var chatSocket;
    chat_position=""; //ID OF CURRENT ACTIVE CHAT USER (FIRST OF THE ARRAY)
    chat_active=0; //NUMBER OF ACTIVE CONVERSATIONS

     chat_array=[];
    var nothingView='<p class="content_text box_nohover">All clear chief</p>';
  //  var basicInfos={};
   /*  if(typeof iomain !== 'undefined'){
      console.log('node est la 1');
          
     }else {
       console.log('node est absente');
         //network();
     }*/
    
         layoutSocket= iomain.connect('http://kolabrealtime.trafficmanager.net/kolabMain');  
         layoutSocket.heartbeatTimeout = 5000;
         chatSocket= iomain.connect('http://kolabrealtime.trafficmanager.net/kolabChat');
         chatSocket.heartbeatTimeout = 5000;
     //window.oncontextmenu = function () { return false; } 
     //document.onkeydown = function (e) {if (window.event.keyCode == 123 || e.button==2)	return false; } 
  
         if(typeof iomain !== 'undefined'){
          // console.log('node est la 1');
          $(document).trigger('dothat',1);
         }else {
          console.log('node est absente');
           // network();
          }
          
       
          
           $.after(1000, function() {  
		 
                    //-----------------------------------
                  $.every(2, function() {  
                    if(layoutSocket.connected){
                        
                    }else{
                      console.log('node est absente');  
                      }
                       });
                       
                       });
                    //----------------------------------------
  
 $(function(){
		 //  monitorEvents(window, ["resize", "scroll"]);                            
//--------------------------------------------------------------------------------------------------------                                       
                    setUserSession(); 
                    setUserZone();
                    //$('#yt0').css({opacity:0});
                    //$('#yt0').height($('#yt0').parent().height());
                    //$('#yt0').width($('#yt0').parent().width());
                     $('.bkd_helper_user_bs_b').hide(); //Backsctore level B for user BS
                     $('.bkd_main_content_helper').hide(); //
                     $('.bkd_nav_hlp').hide(); //
                     $('.bkd_nav_hlp_locker').show(); //
                     $('.nav_list').hide(); //
                     $('.bt_yiiajax_bs').click(); //Hum magical
                    // $('.bt_yiiajax_main').click();
                     $('.bt_yiiajax_main').click();
                     $('.bt_yiiajax_bs2').click(); //Hum magical
                     $('#main_locker_bkd').show();
                     //
                     //jayCorrector();
//------------------------------------------------------------------------------------  
              /*    if(controleur==='user' && controleurView==='locker' && controleurViewAction==='main'){
                    $( ".bindersList" ).sortable({ handle: ".binderTitle",placeholder: "sortable-placeholder" });
                    $( ".bindersList" ).on( "sortupdate", function( event, ui ) {                       
                        binderUIChange($( ".bindersList" ).sortable( "toArray" ));
                    } );
                    $( ".bindersList" ).disableSelection();
                 
                  }*/
                  
                         getUserNotifications();     
                  
                          layoutSocket.on('validationidentity',function(){
                                      whoIAm();               
                                });
                          layoutSocket.on('validation',function(msg){
                                     nodeSecurity(msg);               
                               });
                          layoutSocket.on('onlinenotif',function(msg){
                                   // console.log('online notif'); 
                                   
                                    displayOnlineNotif(msg);
                                });
                                
                          layoutSocket.on('offlinenotif',function(msg){
                                   // console.log('online notif'); 
                                   
                                    displayOfflineNotif(msg);
                                });        
                                
                         layoutSocket.on('squareinvitationnotif',function(msg){
                                      console.log('squareinvitationnotif');    
                                       console.log(msg);           
                                }); 
                                
                         chatSocket.on('chatevent',function(msg){                                 
                                  // console.log(msg);   
                                receivedMsgDisplay(msg);
                            }); 
                            
                          chatSocket.on('ricochetmsg',function(msg){                                 
                                 // console.log(msg);   
                               // chatMsgManager(msg);
                               localMsgDisplay(msg);
                            });   
  
	});   
    
    // Return module with methods
    return {
        logout: logout,
        createBinder:createBinder,
        manageBinder:manageBinder,
        binderUIChange:binderUIChange,
        editBinder:editBinder,
        kolabInvitationFinalDecision:kolabInvitationFinalDecision,
        userNotificationManagerBackClosing:userNotificationManagerBackClosing,
        chatEventSender:chatEventSender,
        saveBinderEdition:saveBinderEdition,
        deleteBinder:deleteBinder,
        saveSquareEdition:saveSquareEdition,
        deleteSquare:deleteSquare,
        getSearchResult:getSearchResult,
        getSquarePeopleToInvite:getSquarePeopleToInvite,
        //getSquarePeopleToInvite2:getSquarePeopleToInvite2,
        manageSquare:manageSquare,
        createSquare:createSquare,
        binderToSelect:binderToSelect,
        editSquare:editSquare,
        getMessagePeopleToInvite:getMessagePeopleToInvite,
        jayCorrector:jayCorrector,
        sendMessage:sendMessage,
        binderToSelectForSquare:binderToSelectForSquare,
        addSquareToBinder:addSquareToBinder
    };
 
function addSquareToBinder(binderid, notifid){
    // console.log(binderid, notifid);
      jQuery.ajax({
           // async: false,
           // cache: false,
            url: http_base+"/user/addsquaretobinder",
            type: "POST",
            dataType:'json', 
            data:{binderID:binderid,notifID:notifid},
            success:function(resp) {                                   	                                                                                                                    
                   if(resp.status==='Success'){                                                      
                   
                    
                      //console.log(resp); 
                    square_placer(resp.square,resp.binderid);
                    notif_action=notif_action-1;
                    notif_update();
                    squareInvitationNotifDisplayCleaner(notifid);
                    setTimeout(function() {
                    loading(0);
                    action_done('bs2');
                     }, 700);
                             
                   }else{
                      console.log(resp);   
                   }
                   
                }
            }); 
} 

function square_placer(squareinfo,binderid){							
	var theDate = new Date(squareinfo.datecreation  * 1000); 
        var options = { year: "2-digit",month: "2-digit",day: "2-digit"};       
        var dateString = theDate.toLocaleDateString("en-GB",options);	
        $('#b_'+binderid+'_c1 .content_strip').eq(0).prepend('<div onclick="$(document).trigger(\'openkzone\',this);" id="'+squareinfo.id+'" class="t025 sq get"><p class="sq_name">'
            +squareinfo.name+'</p><p class="sq_date">'+dateString+'</p><div class="sq_update"></div><div class="t02 sq_streak"></div></div>');
    
        var newSqNumber= $('#b_'+binderid +' .binder_number').text();
          $('#b_'+binderid +' .binder_number').html('');
          $('#b_'+binderid +' .binder_number').html('<p class="binder_total">'+(parseInt(newSqNumber) + 1)+'</p>');
	
	
}
    
 function jayCorrector(){
      $('.list_item').mouseup(function(e){
			if(e.which==1){
				var target = $(this).parent().attr("id");
				var clicked = $(this).attr('value');
				
				if($('#'+target).attr('active')==clicked){}
				else{
					$('#'+target+' .list_item').removeClass('list_active').attr('style','');
					$(this).addClass('list_active');
					if($(this).attr('color')){$('#'+target+' .list_active').css({backgroundColor:($(this).attr('color'))});}
					$('#'+target).attr('active',clicked);
				}
			}
		});
		
		$('.onoff_item').mouseup(function(e){
			if(e.which==1){
				//console.log(this);
				if($(this).attr('active')==1){
					$(this).attr('active',0).removeClass('onoff_active');
				}
				else{
					$(this).attr('active',1).addClass('onoff_active');
				}
			}
		});
 }   
function sendMessage(mess){
   
   var send =true;
   mess['subject']=$('#mess_view_subject').val();   
   mess['message']=$('#mess_view_message').val(); 
   
   
    if(mess['subject'].trim()===''){
       send=false;  
       field('mess_view_subject');      
       }
       
    if(mess['message'].trim()===''){
       send=false;  
       field('mess_view_message');      
       }    
              
   if(send){
   // console.log(mess); 
    jQuery.ajax({
           // async: false,
           // cache: false,
            url: http_base+"/user/newMessage",
            type: "POST",
            dataType:'json', 
            data:mess,
            success:function(resp) {                                   	                                                                                                                    
                   if(resp.status==='Success'){                                                      
                   
                    
                   //  console.log(resp); 
                    setTimeout(function() {
                    loading(0);
                    action_done('bs2');
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
 
 
 
function setUserZone(){
   var tz = jstz.determine(); // Determines the time zone of the browser client
   var timezone = tz.name(); //'Asia/Kolhata' for Indian Time.
   
     $.ajax({
        url: http_base+'/user/setchrono',
        type: 'POST',
        data: {tz:timezone},
       /* async: false,
        cache: false,*/       
        dataType:'json',
        success: function (resp) {   
           if(resp.status==='Success'){
               setInterval( function() {
		var newDate = new Date(resp.timestamp*1000);
		newDate.setDate(newDate.getDate());
		$('#time_date').html(newDate.getDate() + '/' + parseInt(newDate.getMonth()+1));
			var hours = new Date().getHours();
			var minutes = new Date().getMinutes();
			var ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12;
                        hours = hours<10 ? '0'+hours : hours;
			minutes = minutes < 10 ? '0'+minutes : minutes;
			
			$("#min").html(minutes);
			$("#hours").html(hours);
			$("#mm").html(ampm);
	
		}, 1000);
                /* var date = new Date(resp.timestamp*1000);
                                                // hours part from the timestamp
                                         //  console.log('date server '+ date);
                var hours = date.getHours();                                            
                var suffix='';
                if(hours>12){
                 suffix='PM'; 
                 hours=hours - 12;
                }else{
                 suffix='AM';     
                }                                               
                // minutes part from the timestamp
                var minutes = date.getMinutes();
                // seconds part from the timestamp
                var seconds = date.getSeconds();

               // console.log(hours,minutes,seconds,suffix);
               var temphour=hours;
                 if(hours < 10){
                   temphour='0'+hours;  
                 }                 
                $('#hours').text(temphour+'');
                $('#min').text(minutes);
                $('#mm').text(suffix);
             console.log(temphour);
                $.every(1000, function() { 

                  seconds=seconds + 1;
                  if(seconds==60){
                   minutes=minutes+1; 
                   seconds=0;
                  //console.log(hours,minutes,suffix); 
                 temphour=hours;
                 if(hours < 10){
                   temphour='0'+hours;  
                 }                 
                    $('#hours').text(temphour);
                    $('#min').text(minutes);
                    $('#mm').text(suffix);
                   }

                  if(minutes==60){
                    hours = hours + 1;  
                    minutes=0;
                 //  console.log(hours,minutes,suffix); 
                     temphour=hours;
                     if(hours < 10){
                     temphour='0'+hours;  
                      }                 
                   $('#hours').text(temphour);
                   $('#min').text(minutes);
                   $('#mm').text(suffix);
                  }

                  if(hours>=12){                                                  
                   hours=hours - 12;
                   if(suffix=='PM'){
                     suffix='AM';  
                   }else{
                    suffix='PM';     
                   }
                   //console.log(hours,minutes,suffix);
                 temphour=hours;
                 if(hours < 10){
                   temphour='0'+hours;  
                 }                 
                $('#hours').text(temphour);
                   $('#min').text(minutes);
                   $('#mm').text(suffix);
                   } 


                }); */
            }else{

                }
            }
        
  }); 
 
}
function displayOfflineNotif(userinfo){
      
     //console.log(userinfo);
     if($('#'+userinfo.userID+'_ls').length>0){      
          var chatrt = {id:userinfo.userID, name:userinfo.firstname+' '+userinfo.lastname, picture:userinfo.pictureURL, status:'offline'};
           chat_router(chatrt); 
        /*  if($('#'+userinfo.userID+'_view').length>0){
              $('#'+userinfo.userID+'_view').remove();
          }*/
          
           } 
  } 
  

 function displayOnlineNotif(userinfo){
      
     //console.log(userinfo);
     if($('#'+userinfo.userID+'_ls').length==0){
         // chatBoxSetting(userinfo);
        // console.log(userinfo);
          // console.log(chat_array.length);
          var chatrt = {id:userinfo.userID, name:userinfo.firstname+' '+userinfo.lastname, picture:userinfo.pictureURL, status:'online'};
           chat_router(chatrt); 
          layoutSocket.emit('useronlineacknotif',userinfo.userID);  
     } 
  } 
 
  

function whoIAm(){
    jQuery.ajax({
                                       
                                       /* async: false,
                                        cache: false,*/
                                        url: http_base+'/user/getMyIdentity',
                                        type: "POST",
                                        dataType:'json',                                       
                                        success:function(result){
                                       if(result.status==='Success'){
                                               // console.log(result);
                                               layoutSocket.emit('setMyIdentity',result);
                                               chatSocket.emit('newuser',result.tok,result.tokn);
                                        }else{
                                              logout();  

                                            // console.log('loggout who');
                                            }
                                        }  
  }); 
}



function nodeSecurity(msg){
   if(!msg){
  logout(); 
   } 
}

function setUserSession(){
$.getJSON(http_base+'/user/setUserSession',function(result){
       // console.log('2'); 
        if(result.status!='Success'){
           logout();    
        }else{
          getBasicInfos();    
        }
      });   
}     

    
function logout(){
     location.href=http_base+'/site/logout'; 
}

function getBasicInfos(){
           //console.log('1'); 
       $.getJSON(http_base+'/user/getbasicinfos',function(result){
           // console.log('2'); 
            if(result.status==='Success'){                       
             layoutSocket.emit('newuser',result.id); 
             //console.log(result); 
            }else{
               location.href=http_base+'/site/logout';   
            }
          }); 
          
         }



function manageBinder(){
     
       if($('.m_manage').hasClass('m_active')){
         // console.log('j\'edite');
         //if(binderToEdit==='0'){
           $('.binder').attr("onclick","$(document).trigger(\'editbinder\',this);"); 
        var color='282828';
       
         backstore_2_color(color);
	 $('#bs_nbinder').transition({borderRightColor:'#'+color},300);
	 $('#bs_nbinder .bs_header').transition({backgroundColor:'#'+color},300);
	 $('#bs_nbinder .bs_footer').transition({backgroundColor:'#'+color},300);
         $('.b_sel').removeClass('view_binder_active');
         $('.style_selectd').removeClass('view_binder_active').removeClass('style_selecto');
         // }         
        }else{
        // console.log('Fin edition');
         if(backstore_status!=="" ){
             backstore_control('ebinder');             
         }      
       
        $('.binder').attr("onclick","$(document).trigger(\'showbindersquaresist\',this);");
         $( "#bs_ebinder" ).data( "ebinder",null);
        }
     //editBinder(this);     
}


function editBinder(object){
       jQuery.ajax({
           // async: false,
            //cache: false,
            url: http_base+"/user/getBinderInfo",
            type: "POST",
            dataType:'json', 
            data:{binderID:$(object).parent().attr('id')},
            success:function(resp) {                                   	                                                                                                                    
                   if(resp.status==='Success'){
                     var tempname=resp.name;
                     $('#bn_binder_name2').val(tempname.replace(/^[a-z]/, function(m){return m.toUpperCase()}));   
                    $('#bn_desc2').val(resp.description);
                    //console.log(resp);
                    $( "#bs_ebinder" ).data( "ebinder",$(object).parent().attr('id'));
                    $( "#bs_ebinder" ).data( "currentname",tempname.replace(/^[a-z]/, function(m){return m.toUpperCase()}));
                     setTimeout(function(){
                     backstore_control('ebinder');
                     //backstore_binder_color(resp.color);
                     if(resp.style){
                    // backstore_binder_style(resp.style);
                     binder_designer(resp.name,resp.color,resp.style); 
                      $("#b_"+ resp.color).click();
                      //$("#b_"+ resp.style).click();
                      //console.log(resp.style);
                      backstore_binder_style(resp.style);
                     }else{
                      binder_designer(resp.name,resp.color);  
                      $("#b_"+ resp.color).click();
                     }
                    loading(0);
                     },70);
                   }else{
                   console.log(resp); 
                   }
                }
            });   
}


function saveBinderEdition(){
    
    if(typeof $( "#bs_ebinder" ).data( "ebinder")!=='undefined' && typeof $( "#bs_ebinder" ).data( "ebinder")!=='object'){
        
   
    var send=true;
    var content={};
    content['name']=$('#bn_binder_name2').val();   
    content['description']=$('#bn_desc2').val();  
    content['style']=$('#b_designer').attr('bstyle');
    content['color']=$('#b_designer').attr('bcolor');   
    content['binderID']= $( "#bs_ebinder" ).data( "ebinder");
   
      if(content['name'].trim()==='' || ( $( "#bs_ebinder" ).data( "currentname")!=content['name'].trim() && !binberNameIscorrectLevel_1(content['name']))){
         send=false;  
         field('bn_binder_name2');      
       }
       
       
       
       if(content['description'].trim()===''){
       send=false;  
       field('bn_desc2');
      
       } 
    
   if(content['color']==='' || isUsedColor2(content['color'],$( "#bs_ebinder" ).data( "ebinder"))){
      send=false;  
      field('color_zone_limit_bkd2');
    } 
    
     if(isUsedStyle2($( "#bs_ebinder" ).data( "ebinder"))){
      send=false;  
     // $('#addBinderColor').stop().effect("pulsate",{times:1},500); 
       field('style_zone_limit_bkd2');
     } 
   
    if(!isUsedColor2(content['color'],$( "#bs_ebinder" ).data( "ebinder")) && send){            
      jQuery.ajax({
            async: false,
            cache: false,
            url: http_base+"/user/updateBinder",
            type: "POST",
            dataType:'json', 
            data:content,
            success:function(resp) {                                   	                                                                                                                    
                   if(resp.status==='Success'){
                   var tempid=$( "#bs_ebinder" ).data( "ebinder").split('_frame');        
                    $( "."+tempid[0]+"_bkg").css("background-color","#"+content['color']);
                    $( "."+tempid[0]+"_txt").css("color","#"+content['color']);
                    $( "."+tempid[0]+"_brd").css("border-color","#"+content['color']);
                    $( "#"+tempid[0]+' div.binder_style').css("background-image","url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/"+content['style']+".png)");
                    $( "#"+tempid[0]+' div.binder_side p.binder_name').text(content['name'].trim());
                   }
                   action_done();
                   binder_designer();
                }
            }); 
       
     // console.log(content);
      
      
        
       
    }   
  
   }  
}


function deleteBinder(){    
  if(typeof $( "#bs_ebinder" ).data( "ebinder")!=='undefined' && typeof $( "#bs_ebinder" ).data( "ebinder")!=='object'){
   jQuery.ajax({
            async: false,
            cache: false,
            url: http_base+"/user/deleteBinder",
            type: "POST",
            dataType:'json', 
            data:{binderID:$( "#bs_ebinder" ).data( "ebinder")},
            success:function(resp) {                                   	                                                                                                                    
                   if(resp.status==='Success'){                                                      
                    setTimeout(function() {
                 // $('#'+idb).remove();
                // binder_manage(1); 
                //console.log(resp.id);
                   delete_binder(resp.id);
                  binderUIChange($( "#struc_binder" ).sortable( "toArray"),2);     
                  }, 700);
                    
                             
                   }
                   action_back('ebinder');
                   binder_designer();
                }
            }); 
    
      
        }
}

function manageSquare(){
    if($('.m_manage').hasClass('m_active')){
         // console.log('j\'edite');
         //if(binderToEdit==='0'){
           $('.sq').attr("onclick","$(document).trigger(\'editsquare\',this);"); 
       
         // }         
        }else{
        // console.log('Fin edition');
         if(backstore_status!=="" ){
             backstore_control('esquare');             
         }      
       
        $('.sq').attr("onclick","$(document).trigger(\'openkzone\',this);");
         $( "#bs_equare" ).data( "equare",null);
        }
     //editBinder(this);  
}
function kolabInvitationDecision(token, decision){
    var content={};
    content['idnotif']=token;
    content['decision']=decision;
    jQuery.ajax({
                                        async: false,
                                        cache: false,
                                        url: http_base+"/user/createContact",
                                        type: "POST",
                                        dataType:'json', 
                                        data:content,
                                        success:function(resp) {                                   	                                                                                                                    
                                               if(resp.status==='Success'){
                                                console.log(resp);
                                               }else{
                                                console.log(resp);
                                               }
                                            }
                                        });   
}

function createBinder(){
    var send=true;
    var content={};
    content['name']=$('#bn_binder_name').val();   
    content['description']=$('#bn_desc').val();
  
    content['style']=$('#b_designer').attr('bstyle');
    content['color']=$('#b_designer').attr('bcolor');
  
    
    if(content['name'].trim()==='' || !binberNameIscorrectLevel_1(content['name'])){
      send=false;  
      field('bn_binder_name');      
    }
    
    if(content['description'].trim()===''){
      send=false;  
      field('bn_desc');
      
    } 
    
   if(content['color']==='' || isUsedColor(content['color'])){
      send=false;  
     // $('#addBinderColor').stop().effect("pulsate",{times:1},500); 
     field('color_zone_limit_bkd');
    } 
    
    
    if(isUsedStyle()){
      send=false;  
     // $('#addBinderColor').stop().effect("pulsate",{times:1},500); 
     field('style_zone_limit_bkd');
    } 


    if(!isUsedColor(content['color']) && send && !isUsedStyle()){            
         
          jQuery.ajax({
            //async: false,
            //cache: false,
            url: http_base+"/user/createBinder",
            type: "POST",
            dataType:'json', 
            data:content,
            success:function(resp) {                                   	                                                                                                                    
                   if(resp.status==='Success'){                            
                     action_done();
                     var res = content['name'].trim().substring(0, 3)+resp.binderID;          
                     binder_designer_done(res);
                      // console.log(content); 
                     $('#bn_binder_name').val('');   
                     $('#bn_desc').val('');
                     $('.b_sel').removeClass('view_binder_active');
                     $('.style_selectd').removeClass('view_binder_active').removeClass('style_selecto');                    
                    binder_manage(1); 
                    binderUIChange($( "#struc_binder" ).sortable( "toArray"),0);
                       setTimeout(function(){
                                                       loading(0); 
                                                      },
                                                     700);  
                   }else if(resp.status==='Failed' && resp.action==='refresh'){
                     location.reload();
                   }else{
                     //console.log(resp);  
                   }
                }
            }); 
        
    }
   
   
}

function isUsedColor(color){
    var colorUsed=new Array('FFFFFF','666666');
      $.each($('.binder'),function(key,val){
       colorUsed.push(rgb2hex($(val).css('background-color')));
    });
    if(jQuery.inArray(color, colorUsed)>=0){
        return true;
    }else{
       return false; 
    }
}

function isUsedColor2(color,id){
    var colorUsed=new Array('FFFFFF','666666');
    $.each($('.binder'),function(key,val){
       if($(val).parent().attr("id")!=id){
           colorUsed.push(rgb2hex($(val).css('background-color')));
       } 
       
    });
    if(jQuery.inArray(color, colorUsed)>=0){
        return true;
    }else{
       return false; 
    }
}

function isUsedStyle2(id){
     var designUsed=new Array();  
        $.each($('.binder div.binder_style'),function(key,val){
             if($(val).css('background-image')!='none'){
              if($(val).parent().parent().attr("id")!=id){ 
               var temp =$(val).css('background-image');
               var tempsplit=temp.split('/');
               var templast= tempsplit[tempsplit.length - 1];
               var nomsplit =templast.split('.');
               designUsed.push(nomsplit[0]);
             }
              }   

            });
      if(id){
          
      }else{
          
      }      
      if(jQuery.inArray($('#b_designer').attr('bstyle'), designUsed)>=0){
        return true;
        }else{
       return false; 
        }
}

function isUsedStyle(){
     var designUsed=new Array();  
        $.each($('.binder div.binder_style'),function(key,val){
             if($(val).css('background-image')!='none'){
              var temp =$(val).css('background-image');
               var tempsplit=temp.split('/');
               var templast= tempsplit[tempsplit.length - 1];
               var nomsplit =templast.split('.');

                 designUsed.push(nomsplit[0]);
              }   

            });
      if(jQuery.inArray($('#b_designer').attr('bstyle'), designUsed)>=0){
        return true;
        }else{
       return false; 
        }
}

//Function to convert hex format to a rgb color
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 var str=''+hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
 return str.toLocaleUpperCase();
}

function hex(x) {
    var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }
 
function binderUIChange(newList,from){
        var content={};
         content['binderlist']=newList.join();
       if(from==1){
          content['bindersortPreference']='usercustumizedsort';  
        }else{
          content['bindersortPreference']='notchange';   
        }
       jQuery.ajax({
                           /* async: false,
                            cache: false,*/
                            url: http_base+"/user/binderListChange",
                            type: "POST",
                            dataType:'json', 
                            data: content,
                            success:function(resp) {                                   	                                                                                                                    
                                if(from==0){
                                 binder_manage(0);     
                                }
                               
                                if(resp.status==='Failed' && resp.action==='refresh'){
                                            location.reload();
                                                ///  console.log(resp);
                                 }else if(resp.status==='Failed' && resp.action==='refresh2'){
                                           // location.href=http_base+'/site/logout';
                                           console.log(resp);
                                  }
                                }
                            });
  }
  


function getUserNotifications(){
    $.getJSON(http_base+'/user/getNotifications',function(result){
      $('#view_notif_1 div.nano-content div.view_box').empty();      
      //$('#view_notif_1 div.content p.view_title:first').hide();  
      //$('#view_notif_1 div.content p.view_title:last').hide();
      $('#view_notif_2 div.nano-content div.view_box').empty();
     // $('#view_notif_2 div.content p.view_title:first').hide();  
      //$('#view_notif_2 div.content p.view_title:last').hide();
    
         $('#view_notif_1 div.nano-content p.view_title:first').after(nothingView);
         $('#view_notif_1 div.nano-content p.view_title:last').after(nothingView);
         $('#view_notif_2 div.nano-content p.view_title:first').after(nothingView);
         $('#view_notif_2 div.nano-content p.view_title').eq(1).after(nothingView);
         $('#view_notif_2 div.nano-content p.view_title:last').after(nothingView);
        if(Object.keys(result).length>0){
        
        if(result.unreadnotif.length>0){        
           $.each(result.unreadnotif, function(i, field){      
              displayUnreadNotif(field);
               switch(field.notifType){
			case "kolabinvitationaccepted": 
			//$('#view_notif_1 div.content p.view_title:first').show(); 
                         $('#view_notif_1 div.nano-content p.view_title:first').next('.box_nohover').remove();
                         $('#view_notif_1 div.nano-content p.view_title:last').prevAll('.box_nohover').remove();
                        var notif = {};
                            //notif = {id:'', type:'', person:'', picture:'', color:'', info:'', run:''}
                            notif['id']=field.notifID;
                            notif['type']='contacta';
                            notif['person']=field.from;
                            notif['picture']=field.fromPicture;
                            //notif['id']=field.notifID;
                            //notif['id']=field.notifID;
                            notif_create(notif);	
			break;
                        case "kolabinvitation":
                            // $('#view_notif_2 div.content p.view_title:first').show();
                            $('#view_notif_2 div.nano-content p.view_title:first').next('.box_nohover').remove();
                            $('#view_notif_2 div.nano-content p.view_title').eq(1).prevAll('.box_nohover').remove();
                            var notif = {};
                            //notif = {id:'', type:'', person:'', picture:'', color:'', info:'', run:''}
                            notif['id']=field.notifID;
                            notif['type']='contact';
                            notif['person']=field.from;
                            notif['picture']=field.fromPicture;
                            //notif['id']=field.notifID;
                            //notif['id']=field.notifID;
                            notif_create(notif);

			//console.log(field);	
			break;
			case "squareinvitation":
			//$('#view_notif_2 div.content p.view_title:last').show();
                        $('#view_notif_2 div.nano-content p.view_title').eq(1).next('.box_nohover').remove();
                      //  console.log(field);
                         var notif = {};
                            //notif = {id:'', type:'', person:'', picture:'', color:'', info:'', run:''}
                            notif['id']=field.notifID;
                            notif['type']='newsq';
                            notif['person']=field.from;
                            notif['picture']=field.fromPicture;
                            //notif['info']=field.notifText;
                            //notif['id']=field.notifID;
                            //notif['id']=field.notifID;
                            notif_create(notif);
			break;
                        case "masterinvitation":
			//$('#view_notif_2 div.content p.view_title:last').show();
                        $('#view_notif_2 div.nano-content p.view_title:last').nextAll('.box_nohover').remove();
                        console.log(field);		
			break;
                        default:
                        break;
		} 
     
           }); 
        }
        
        
        if(result.readednnotif.length>0){
      //  $('#view_notif_1 div.content p.view_title:last').show();
      $('#view_notif_1 div.nano-content p.view_title:last').nextAll('.box_nohover').remove();
       if(result.readednnotif.length<=25){
        $('#view_notif_1 div.nano-content div.view_block_more').hide();   
       }
        displayReadedNotif(result.readednnotif); 
        }else{
         // $('#view_notif_1 div.content p.view_title:last').hide(); 
        $('#view_notif_1 div.nano-content p.view_title:last').nextAll('.box_nohover').show(); 
        }
  
    }
        
  });
}

function getUserNotificationsBackClosing(){
    $.getJSON(http_base+'/user/getNotifications',function(result){
         $('#view_notif_1 div.nano-content div.view_box').empty();            
         $('#view_notif_2 div.nano-content div.view_box').empty();    
      $('#view_notif_1 div.nano-content p.view_title').eq(0).nextAll('.box_nohover').remove();
         $('#view_notif_1 div.nano-content p.view_title:first').after(nothingView);
         $('#view_notif_1 div.nano-content p.view_title:last').after(nothingView);
         $('#view_notif_2 div.nano-content p.view_title:first').after(nothingView);
         $('#view_notif_2 div.nano-content p.view_title:last').after(nothingView);
        if(Object.keys(result).length>0){
        
        if(result.unreadnotif.length>0){        
           $.each(result.unreadnotif, function(i, field){      
              displayUnreadNotif(field);           
           }); 
        }
        
        
        if(result.readednnotif.length>0){     
      $('#view_notif_1 div.nano-content p.view_title:last').nextAll('.box_nohover').remove();
        displayReadedNotif(result.readednnotif); 
        }else{       
        $('#view_notif_1 div.nano-content p.view_title:last').nextAll('.box_nohover').show(); 
        }
  
    }
        
  });
}

function displayUnreadNotif(field){   
    switch(field.notifType){
			case "kolabinvitationaccepted": 
			   var timeAgo=field.creationDate;
                                //console.log(timeAgo);
                                var tempo='';
                                if(timeAgo.days!=0){
                                 tempo=timeAgo.days+' days ';   
                                }else if(timeAgo.h!=0){
                                  tempo=timeAgo.h+' hours ';    
                                }else if(timeAgo.i!=0){
                                  tempo=timeAgo.i+' minutes ';    
                                }
                                
                                 var kolabinvitationaccepted='<div class="view_box"><div class="view_block">'+
                                          '<div class="t02 view_img view_notif n_contacta"></div>'+
                                          '<p class="t01 view_text view_text_1">Contact request accepted</p>'+
                                          '<p class="t01 view_text view_text_2">from '+field.from+' '+tempo+ 'ago</p></div></div>';
                                 
                               if(field.notifID){
                                $('#view_notif_1 div.nano-content p.view_title:first').after(kolabinvitationaccepted);	    
                               }
			break;
                        case "kolabinvitation": 			       
                               
                                var timeAgo=field.creationDate;
                                //console.log(timeAgo);
                                var tempo='';
                                if(timeAgo.days!=0){
                                 tempo=timeAgo.days+' days ';   
                                }else if(timeAgo.h!=0){
                                  tempo=timeAgo.h+' hours ';    
                                }else if(timeAgo.i!=0){
                                  tempo=timeAgo.i+' minutes ';    
                                }
                                
                              
                                  var kolabinvitation='<div class="view_box"><div class="view_block"><div class="t02 view_img" style="background-image:url('+field.fromPicture+')"></div>'+
                                  '<p class="t01 view_text view_text_1">Contact Request</p><p class="t01 view_text view_text_2">from '+field.from+' '+tempo+ ' ago</p></div>' +
                                  '<div class="view_action" id="'+field.notifID+'_bkd"><div class="view_action_half" onclick="$(document).trigger(\'notifcontactaction\',this);">Accept</div><div class="view_action_half" onclick="$(document).trigger(\'notifcontactaction\',this);">Decline</div></div></div>';		
                               if(field.notifID){
                                $('#view_notif_2 div.nano-content p.view_title:first').after(kolabinvitation);	    
                               }
                                 
			break;
			case "squareinvitation":
			  $('#view_notif_2 div.nano-content p.view_title').eq(2).prev('.box_nohover').remove();
                         var timeAgo=field.creationDate;
                                //console.log(timeAgo);
                                var tempo='';
                                if(timeAgo.days!=0){
                                 tempo=timeAgo.days+' days ';   
                                }else if(timeAgo.h!=0){
                                  tempo=timeAgo.h+' hours ';    
                                }else if(timeAgo.i!=0){
                                  tempo=timeAgo.i+' minutes ';    
                                }
                                
                              
                                  var squareinvitation='<div class="view_box"><div class="view_block"><div class="t02 view_img" style="background-image:url('+field.fromPicture+')"></div>'+
                                  '<p class="t01 view_text view_text_1">'+field.notifText+'</p><p class="t01 view_text view_text_2">from '+field.from+' '+tempo+ ' ago</p></div>' +
                                  '<div class="view_action" id="'+field.notifID+'_bkd"><div class="view_action_half" onclick="$(document).trigger(\'notifsquareaction\',this);">Accept</div><div class="view_action_half" onclick="$(document).trigger(\'notifsquareaction\',this);">Decline</div></div></div>';		
                               if(field.notifID){
                                $('#view_notif_2 div.nano-content p.view_title').eq(1).after(squareinvitation);	    
                               }
                        
			break;
                        case "squareupdate": 
		        
			break;
                        case "ressiurceadded": 
				
			break;
                        case "noteshared": 
				
			break;
                        case "kolabevent": 
				
			break;
                        default:
                        break;
		}                
}

function displayReadedNotif(result){
    $.each(result, function(i, field){    
       //console.log(field.creationDate);
        switch(field.notifType){
			case "kolabinvitationaccepted": 
			//var kolabinvitationaccepted='<div class="view_box"><div class="t02 view_img view_notif n_contacta" style="background-color:#FF0063"></div><p class="t01 view_text view_text_1">Contact request accepted</p><p class="t01 view_text view_text_2">from '+field.from+' 2 hours ago</p></div>';
                       // $('#view_notif_1 div.nano-content p.view_title:first').after(kolabinvitationaccepted);
                             var timeAgo=field.creationDate;
                                //console.log(timeAgo);
                                var tempo='';
                                if(timeAgo.days!=0){
                                 tempo=timeAgo.days+' days ';   
                                }else if(timeAgo.h!=0){
                                  tempo=timeAgo.h+' hours ';    
                                }else if(timeAgo.i!=0){
                                  tempo=timeAgo.i+' minutes ';    
                                }
                             var kolabinvitation='<div class="view_box"><div class="view_block">'+
                                '<div class="t02 view_img view_notif n_contacta"></div>'+
                                '<p class="t01 view_text view_text_1">Contact request accepted</p>'+
                                '<p class="t01 view_text view_text_2">from '+field.from+' '+tempo+ 'ago</p></div></div>';
                            $('#view_notif_1 div.nano-content p.view_title:last').after(kolabinvitation);
			break;
                        case "kolabinvitation": 
			     var timeAgo=field.creationDate;
                                //console.log(timeAgo);
                                var tempo='';
                                if(timeAgo.days!=0){
                                 tempo=timeAgo.days+' days ';   
                                }else if(timeAgo.h!=0){
                                  tempo=timeAgo.h+' hours ';    
                                }else if(timeAgo.i!=0){
                                  tempo=timeAgo.i+' minutes ';    
                                }
                             var kolabinvitation='<div class="view_box"><div class="view_block">'+
                                '<div class="t02 view_img view_notif n_contact"></div>'+
                                '<p class="t01 view_text view_text_1">Contact Request</p>'+
                                '<p class="t01 view_text view_text_2">from '+field.from+' '+tempo+ 'ago</p></div></div>';
                            $('#view_notif_1 div.nano-content p.view_title:last').after(kolabinvitation);
			break;
			case "squareinvitation":
			//var squareinvitation='<div class="view_box"><div class="t02 view_img view_notif n_newsq" style="background-color:#00BFFF"></div><p class="t01 view_text view_text_1">Square invitation</p><p class="t01 view_text view_text_2">from '+field.from+' 6 minutes ago</p></div>';		
                       // $('#view_notif_1 div.content p.view_title:first').after(squareinvitation);
                       
                       var timeAgo=field.creationDate;
                                //console.log(timeAgo);
                                var tempo='';
                                if(timeAgo.days!=0){
                                 tempo=timeAgo.days+' days ';   
                                }else if(timeAgo.h!=0){
                                  tempo=timeAgo.h+' hours ';    
                                }else if(timeAgo.i!=0){
                                  tempo=timeAgo.i+' minutes ';    
                                }
                             var squareinvitation='<div class="view_box"><div class="view_block">'+
                                '<div class="t02 view_img view_notif n_newsq"></div>'+
                                '<p class="t01 view_text view_text_1">'+field.notifText+'</p>'+
                                '<p class="t01 view_text view_text_2">from '+field.from+' '+tempo+ 'ago</p></div></div>';
                            $('#view_notif_1 div.nano-content p.view_title:last').after(squareinvitation);
			break;
                        case "squareupdate": 
		        
			break;
                        case "ressiurceadded": 
				
			break;
                        case "noteshared": 
				
			break;
                        case "kolabevent": 
				
			break;
                        default:
                        break;
		}
     
           });  
}

function userNotificationManagerBackClosing(){                            
            $.getJSON(http_base+'/user/notifBackClosingManager',function(result){
           // console.log('2'); 
            if(result.status==='Success'){                       
            getUserNotificationsBackClosing();
             tooltip_refresh(); 
            // console.log(result);              
            }else if(result.status==='Failed' && result.action==='refresh'){
               location.href=http_base+'/site/logout';   
            }
          });                      
}


function trackBackStore(id){
  //  console.log(backstore_status);
    if(backstore_status=='notif'){
      console.log('Ferme notification');
    }
    
    if(backstore_status!='notif' && id=='notif'){
      //  $('#view_notif_1 div.content div.view_box').empty();
     // updateNotificationsBS();
    }
}


function binberNameIscorrectLevel_1(name){
   var response=true;
   $.each($('.binder_side p.binder_name'),function(key,val){
       if($(val).text().toLowerCase()==name.toLowerCase().trim()){
          response=false; 
       }     
    });
    
    return  response;
}

function kolabInvitationFinalDecision(id, decision){ 
     jQuery.ajax({
                           /* async: false,
                            cache: false,*/
                            url: http_base+"/user/kolabInvitationNotifDecision",
                            type: "POST",
                            dataType:'json', 
                            data: {binderid:id,decision:decision},
                            success:function(resp) {                                   	                                                                                                                    
                               
                                if(resp.status==='Failed'){
                                            //location.reload();
                                              console.log(resp);
                                 }else{
                                  notif_action=notif_action-1;
                                  notif_update();
                                  kolabInvitationNotifDisplayCleaner(id);
                                   }
                                }
                            });
}

function kolabInvitationNotifDisplayCleaner(param){  
         $("#"+param).parent().remove();
        var inCounter= $('#view_notif_2 div.nano-content p.view_title:first').prevAll('.view_box');
         if(inCounter.length==0){
             $('#view_notif_2 div.nano-content p.view_title:first').after(nothingView); 
         }
         
}


function squareInvitationNotifDisplayCleaner(param){
          $("#"+param+"_bkd").parent().remove();
          var inCounter= $('#view_notif_2 div.nano-content p.view_title').eq(1).next('.view_box');       
         if(inCounter.length==0){
             $('#view_notif_2 div.nano-content p.view_title:first').eq(1).after(nothingView); 
         }
         
}

function chatEventSender(e,source){
  //  var d1 = new Date();
  //  var d2 = new Date(Date.UTC( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() ));
 //   var timestan=Math.floor(d2.getTime()/ 1000);
    var to=$(source).attr('id');  
    var token=to.split("_");   
    var msg={};
        msg['to']=token[0];
       // msg['timestan']=timestan.toString(); 
        msg['notSafeParam']=window.devtools.open;
       if (e.which === 13) {
         
            e.preventDefault();
//console.log(' je  suis keypress 2 '+jid);
            var body = $(source).val();
           
            if(body.trim()!=''){
             msg['body']=body; 
           chatSocket.emit('chatmessagesend', msg);  
        
             //-----------------------------------------------------------------         
         
           
             
       
            $(source).val('');
           // $('#fb'+idface+'_c').data('composing', false);
                
            }
           
        } else {        
          msg['body']='composing'; 
        }
       
          
      
      
           //kfba('fb2'+idface);
         $(source).focus();
}

function receivedMsgDisplay(msg){
       jQuery.ajax({
                            async: false,
                            cache: false,
                            url: http_base+"/site/smileyParser",
                            type: "POST",
                            dataType:'json', 
                            data: {body:msg.body},
                            success:function(resp) {                                   	                                                                                                                    
                            // body=resp.body;
                            // console.log(body);  
                            var msgcontent=replaceURLWithHTMLLinks(resp.body);
                            chat_mess({target:msg.from, person:msg.from, name:msg.fromname, message:msgcontent, time:msg.timestan, pre:0});
                          /*var divC = $('.chat_block_padding').get(0);
                               divC.scrollTop = divC.scrollHeight;*/
                                }
                            });      
    
}

function localMsgDisplay(msg){                                     
             
       jQuery.ajax({
                            async: false,
                            cache: false,
                            url: http_base+"/site/smileyParser",
                            type: "POST",
                            dataType:'json', 
                            data: {body:msg.body},
                            success:function(resp) {                                   	                                                                                                                    
                            // body=resp.body;
                            // console.log(body);
                           
                              var msgcontent=replaceURLWithHTMLLinks(resp.body);
                         chat_mess({target:msg.to, person:'You', name:'You', message:msgcontent, time:msg.timestan, pre:0});
                          /*var divC = $('.chat_block_padding').get(0);
                               divC.scrollTop = divC.scrollHeight;*/
                                }
                            });   
    
}

function chatMsgManager(msg){
  if(!window.devtools.open){
   jQuery.ajax({
                            async: false,
                            cache: false,
                            url: http_base+"/user/chatmsgmanager",
                            type: "POST",
                            dataType:'json', 
                            data: msg,
                            success:function(resp) {                                   	                                                                                                                    
                              if(resp.status==='Success'){
                                localMsgDisplay(msg);
                               }
                                }
                            });      
  }
  
  
function replaceURLWithHTMLLinks(text) {
         var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
         return text.replace(exp,"<a href='$1' target='_blank'>$1</a>");                 
    }  
   
    
    
}


function getSearchResult(event){
    var valu=$('#search_input').val();
    if ( event.which == 16 ) {
   // event.preventDefault();
      return false;
      }else{
    if(valu=='' || valu==' '){   
      $('#search_result div.nano-content div.search_box').remove();
    }else if(valu.length>1){         
    
       //console.log(valu);
            jQuery.ajax({
                                       /* async: false,
                                        cache: false,*/
                                        url: http_base+"/user/searchGeneral",
                                        type: "POST",
                                        dataType:'json', 
                                        data:{token:valu},
                                        success:function(resp) {                                   	                                                                                                                    
                                               if(resp.status==='Success'){
                                           $('#search_result div.nano-content div.search_box').remove();
                                              console.log(resp.members);
                                                var counter= 0;
                                                var contentToDisplay='';
                                                $.each(resp.members,function(index,memb){
                                                   counter++; 
                                                   if(counter==1){
                                                  contentToDisplay+= '<div id="'+memb.id+'" class="view_box search_box search_first" onClick="search_control();">'+
                                                          '<div class="t02 view_img" style="background-image:url('+memb.photoProfile+')"></div>'
                                                                      + '<p class="t01 view_text view_text_1 view_text_1ss">'+memb.fullname+'</p></div>';   
                                                   }else{
                                                   contentToDisplay+= '<div id="'+memb.id+'" class="view_box search_box" >'+
                                                          '<div class="t02 view_img" style="background-image:url('+memb.photoProfile+')"></div>'
                                                                      + '<p class="t01 view_text view_text_1 view_text_1ss">'+memb.fullname+'</p></div>';        
                                                   }                                                  
                                                   if($('#'+memb.id).length==0){
                                                   $('#search_result div.nano-content p.view_search_title').first().after(contentToDisplay);
                                                    $('#'+memb.id).data('email',memb.email); 
                                                   }          
                                                 
                                                });                                                   
                                               }else{
                                               //console.log(resp);
                                                 $('#search_result div.nano-content div.search_box').remove();
                                               }
                                              
                                            }
                                        }); 
     }
    }
    
   setTimeout(function() {
                            loading(0);                  
                                                   }, 700);  
}

function getSquarePeopleToInvite(event){
    var valu=$('#sq_peoplesearch').val();
  
    if ( event.which == 16 ) {
   // event.preventDefault();
      return false;
      }else{
    
    if(valu.trim()==''){   
       $('#sq_bkdhelper_peoplesearch_tab').empty();
       $('#sq_bkdhelper_peoplesearch_tab').stop(true,true).transition({height:0},320,'easeOutExpo'); 
    }else if(valu.length==1){       
       $('#sq_bkdhelper_peoplesearch_tab').stop(true,true).transition({height:154},320,'easeOutExpo');      
      }else if(valu.length>1){         
    loading(1);
       //console.log(valu);
            jQuery.ajax({
                                        /*async: false,
                                        cache: false,*/
                                        url: http_base+"/user/searchGeneral",
                                        type: "POST",
                                        dataType:'json', 
                                        data:{token:valu},
                                        success:function(resp) {                                   	                                                                                                                    
                                               if(resp.status==='Success'){
                                            $('#sq_bkdhelper_peoplesearch_tab').empty();
                                             if(Object.keys(resp.members).length>0){
                                           //  console.log(resp.members);
                                              var counter= 0;
                                                var contentToDisplay='';
                                                $.each(resp.members,function(index,memb){
                                                   counter++; 
                                                   if(counter<3){
                                                  contentToDisplay+= '<div id="'+memb.id+'" class="view_block peoplesearch_option" onclick="$(document).trigger(\'sqaddusertoinvite\',this)">';   
                                                    contentToDisplay+='<div class="t02 view_img" style="background-image:url('+memb.photoProfile+')"></div>'
                                                                      + '<p class="t01 view_text view_text_1 view_text_1s">'+memb.fullname+'</p></div>';
                                                  
                                                 
                                                              
                                                   $('#sq_bkdhelper_peoplesearch_tab').append(contentToDisplay);
                                                   $('#'+memb.id).data('email',memb.email); 
                                                   $('#'+memb.id).data('name',memb.fullname); 
                                                   $('#'+memb.id).data('pic',memb.photoProfile); 
                                                    } 
                                                     
                                                });  
                                             }else{
                                               //console.log(resp);
                                                 $('#sq_bkdhelper_peoplesearch_tab').empty();
                                               }
                                            
                                               }else{
                                               //console.log(resp);
                                                 $('#sq_bkdhelper_peoplesearch_tab').empty();
                                               }
                                              
                                                  setTimeout(function(){
                                                       loading(0); 
                                                      },
                                                     400);  
                                            }
                                        }); 
     }
    }
    
  
}

function getMessagePeopleToInvite(event){
    var valu=$('#mess_view_peoplesearch').val();
  
    if ( event.which == 16 ) {
   // event.preventDefault();
      return false;
      }else{
    
    if(valu.trim()==''){   
       //$('#sq_bkdhelper_peoplesearch_tab2').empty();
       $('#mess_view_peoplesearch_tab').stop(true,true).transition({height:0},320,'easeOutExpo'); 
    }else if(valu.length==1){       
       $('#mess_view_peoplesearch_tab').stop(true,true).transition({height:154},320,'easeOutExpo');   
     //  console.log('je suis la');
      }else if(valu.length>1){         
    loading(1);
       //console.log(valu);
            jQuery.ajax({
                                       // async: false,
                                       // cache: false,
                                        url: http_base+"/user/searchGeneral",
                                        type: "POST",
                                        dataType:'json', 
                                        data:{token:valu},
                                        success:function(resp) {                                   	                                                                                                                    
                                               if(resp.status==='Success'){
                                            $('#mess_view_peoplesearch_tab').empty();
                                             if(Object.keys(resp.members).length>0){
                                           //  console.log(resp.members);
                                              var counter= 0;
                                                var contentToDisplay='';
                                                $.each(resp.members,function(index,memb){
                                                   counter++; 
                                                   if(counter<3){
                                                  contentToDisplay+= '<div id="'+memb.id+'" class="view_block peoplesearch_option" onclick="$(document).trigger(\'messaddusertoinvite\',this)">';   
                                                    contentToDisplay+='<div class="t02 view_img" style="background-image:url('+memb.photoProfile+')"></div>'
                                                                      + '<p class="t01 view_text view_text_1 view_text_1s">'+memb.fullname+'</p></div>';
                                                  
                                                 
                                                              
                                                   $('#mess_view_peoplesearch_tab').append(contentToDisplay);
                                                   $('#'+memb.id).data('email',memb.email); 
                                                   $('#'+memb.id).data('name',memb.fullname); 
                                                   $('#'+memb.id).data('pic',memb.photoProfile); 
                                                    } 
                                                     
                                                });  
                                             }else{
                                               //console.log(resp);
                                                 $('#mess_view_peoplesearch_tab').empty();
                                               }
                                            
                                               }else{
                                               //console.log(resp);
                                                 $('#mess_view_peoplesearch_tab').empty();
                                               }
                                              
                                                  setTimeout(function(){
                                                       loading(0); 
                                                      },
                                                     400);  
                                            }
                                        }); 
     }
    }
    
  
}


function getSquarePeopleToInvite2(event){
    var valu=$('#sq_peoplesearch2').val();
  
    if ( event.which == 16 ) {
   // event.preventDefault();
      return false;
      }else{
    
    if(valu.trim()==''){   
       $('#sq_bkdhelper_peoplesearch_tab2').empty();
       $('#sq_bkdhelper_peoplesearch_tab2').stop(true,true).transition({height:0},320,'easeOutExpo'); 
    }else if(valu.length==1){       
       $('#sq_bkdhelper_peoplesearch_tab2').stop(true,true).transition({height:154},320,'easeOutExpo');   
     //  console.log('je suis la');
      }else if(valu.length>1){         
    loading(1);
       //console.log(valu);
            jQuery.ajax({
                                        async: false,
                                        cache: false,
                                        url: http_base+"/user/searchGeneral",
                                        type: "POST",
                                        dataType:'json', 
                                        data:{token:valu},
                                        success:function(resp) {                                   	                                                                                                                    
                                               if(resp.status==='Success'){
                                            $('#sq_bkdhelper_peoplesearch_tab2').empty();
                                             if(Object.keys(resp.members).length>0){
                                           //  console.log(resp.members);
                                              var counter= 0;
                                                var contentToDisplay='';
                                                $.each(resp.members,function(index,memb){
                                                   counter++; 
                                                   if(counter<3){
                                                  contentToDisplay+= '<div id="'+memb.id+'" class="view_block peoplesearch_option" onclick="$(document).trigger(\'sqaddusertoinvite2\',this)">';   
                                                    contentToDisplay+='<div class="t02 view_img" style="background-image:url('+memb.photoProfile+')"></div>'
                                                                      + '<p class="t01 view_text view_text_1 view_text_1s">'+memb.fullname+'</p></div>';
                                                  
                                                 
                                                              
                                                   $('#sq_bkdhelper_peoplesearch_tab2').append(contentToDisplay);
                                                   $('#'+memb.id).data('email',memb.email); 
                                                   $('#'+memb.id).data('name',memb.fullname); 
                                                   $('#'+memb.id).data('pic',memb.photoProfile); 
                                                    } 
                                                     
                                                });  
                                             }else{
                                               //console.log(resp);
                                                 $('#sq_bkdhelper_peoplesearch_tab2').empty();
                                               }
                                            
                                               }else{
                                               //console.log(resp);
                                                 $('#sq_bkdhelper_peoplesearch_tab2').empty();
                                               }
                                              
                                                  setTimeout(function(){
                                                       loading(0); 
                                                      },
                                                     400);  
                                            }
                                        }); 
     }
    }
    
  
}

function createSquare(){
     
    var send=true;
    var content={};   
    var binders=$('.cover_locker').next('#content');
    var bindeTemp= $(binders).children('.nano-content').children('.content_view:visible');
    var bindeTemp2=$(bindeTemp).attr('id');
    var binderid=bindeTemp2.split('_'); 
       
       if(binderid.length===3){
         content['binderid']=  binderid[1];  
       }else{
         send=false;   
          
       }
       
    var invitationTemp=$('#sq_bkdhelper_peoplesearch_selected  div.view_img_select');
    if(invitationTemp.length>0){
      var i=0;
      content['userinvitecounter']=invitationTemp.length;
      $.each(invitationTemp,function(index,memb){
        i++; 
        var membtemp=$(memb).attr('emailid');   
        //console.log(membtemp);
        content['email'+ i]=membtemp;
      
      });     
    }
    
    content['name']=$('#sq_square_name').val();
    content['description']=$('#sq_desc').val();
    content['deadline']=$('#sq_due_date').val();
    content['hoursdead']=$('#sq_due_hour').val();
    content['mindead']=$('#sq_due_min').val();
    content['perioddead']=$('#sq_due_period').val();
  
    
    if(content['name'].trim()===''){
     field('sq_square_name');
     send=false;           
    } 
    
   if(content['description'].trim()===''){
       field('sq_desc');
       send=false;       
    }
    
   if(content['deadline'].trim()!==''){     
    
    if( content['hoursdead'].trim()===''){
       field('sq_due_hour-button');
       send=false;       
     } 
     
     if( content['mindead'].trim()===''){
       field('sq_due_min-button');
       send=false;       
     } 
     
     if( content['perioddead'].trim()===''){
       field('sq_due_period-button');
       send=false;       
     } 
          
    }
  // console.log(content);
    // send=false;    
    if(send){             
     
       jQuery.ajax({
            /*async: false,
            cache: false,*/
            url: http_base+"/user/createSquare",
            type: "POST",
            dataType:'json', 
            data:content,
            success:function(resp) {                                   	                                                                                                                    
                   if(resp.status==='Success'){                  
                   //console.log(resp);
                   if($('.give_'+content['binderid']+':first p.content_text').length>0){
                   $('.give_'+content['binderid']+':first p.content_text').remove();    
                   }
                  action_done();
                  square_done('sq_'+resp.squareID); 
                //  $('#sq_square_name').val('');
                   var newSqNumber= $('#b_'+content['binderid'] +' .binder_number').text();
                    $('#b_'+content['binderid'] +' .binder_number').html('');
                   $('#b_'+content['binderid'] +' .binder_number').html('<p class="binder_total">'+(parseInt(newSqNumber) + 1)+'</p>');
                 setTimeout(function(){
                    // backstore_control_2('bcolor');
                      $('.sq').attr("onclick","$(document).trigger(\'openkzone\',this);"); 
                      setTimeout(function(){
                    // backstore_control_2('bcolor');
                      loading(0);                   
                         },
                       500);  
                   },
                    877); 
                        
  
                   }else{
                      console.log(resp);
                      
                         setTimeout(function(){
                        // backstore_control_2('bcolor');
                          loading(0); 
                              action_done();
                         },
                       500); 
                   }
                   
                  
                }
            }); 
        
        
    }
 
   
}


function editSquare(object){
   
   // backstore_control('editBinder'+binderToEdit);   
   var sqId=$(object).attr('id'); 
   var idTemp= sqId.split('_');
   //console.log(idTemp[1]);
   var tz = jstz.determine(); // Determines the time zone of the browser client
   var timezone = tz.name(); //'Asia/Kolhata' for Indian Time.
              
               //$( "#bs_esquare" ).data( "currentname",tempname.replace(/^[a-z]/, function(m){return m.toUpperCase()}));
                    
    //---------------------------------------------
          $('#sq_square_name2').val('');
          $('#sq_desc2').val('');
          $('#sq_due_date2').val('');
          $('#sq_due_hour2').val('');       
          $('#sq_due_min2').val('');        
          $('#sq_due_period2').val('');
         // $('#sq_peoplesearch2').val('');
         // $('#sq_bkdhelper_peoplesearch_tab2').stop(true,true).transition({height:0},320,'easeOutExpo');
          $('#sq_square_name2').prop('readonly',false); //for member  
          $('#sq_desc2').prop('readonly',false);
         // $('#sq_peoplesearch2').prop('readonly',false);                              
          $('#sq_due_date2').prop('readonly',false);
          $("#sq_due_date2").datepicker( "option",  { disabled: false } );
          $('#sq_due_hour2').prop('disabled',false);$("#sq_due_hour2").selectmenu("refresh", true);  //for member
          $('#sq_due_min2').prop('disabled',false);$("#sq_due_min2").selectmenu("refresh", true);
          $('#sq_due_period2').prop('disabled',false);$("#sq_due_period2").selectmenu("refresh", true);
    //---------------------------------------------                  
                                   
                        jQuery.ajax({
                            /*async: false,
                            cache: false,*/
                            url: http_base+"/user/getSquareInfo",
                            type: "POST",
                            dataType:'json', 
                            data: {id:idTemp[1],tz:timezone},
                            success:function(resp) {                                                                                                                                                                                    
                             //console.log(resp);
                               if(resp.status==='Success'){
                                $( "#bs_esquare" ).data( "esquare",idTemp[1]);
                                // console.log(resp.squareinfo);
                               
                                $('#sq_square_name2').val(resp.squareinfo.name);                                                           
                                $('#sq_desc2').val(resp.squareinfo.description);
                                if($('.selectbinder_name').length==0){
                                  var binder='<div id="bselect_'+resp.squareinfo.binderID+'" onclick="$(document).trigger(\'binderselect\');"  class="t02 selectbinder" style="background-color:#'+resp.squareinfo.binderColor+';">'+
                                        '<p class="t02 selectbinder_name">'+resp.squareinfo.binderName+'</p>';
                                    if(resp.squareinfo.binderName!=='Personal'){
                                     binder+= '<div class="t01 selectbinder_style" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/'+resp.squareinfo.binderStyle+'.png);"></div></div>';    
                                    }else{
                                    binder+= '<div class="t01 selectbinder_style"></div></div>';        
                                    }
                                      
                               
                                $('.view_line_binder').after(binder);   
                                }
                                if(typeof resp.squareinfo.deadlinedate!='undefined'){
                                  var deadtemp=resp.squareinfo.deadlinedate; 
                                 /* var deadline=deadtemp.split('-');
                                   $('#sq_due_date2').val(deadline[2]+'/'+deadline[1]+'/'+deadline[0]);
                                   var hourT=resp.squareinfo.deadlinehour;
                                   var hourline=hourT.split(':');
                                   $('#sq_due_hour2').val(hourline[0]);*/
                                   var theDate = new Date(deadtemp  * 1000); 
                                  // var options = { year: "2-digit",month: "2-digit",day: "2-digit"};
                                   var options2 = {  hour: "2-digit", minute: "2-digit"};
                                   var dateString = theDate.toLocaleDateString("en-GB");
                                   var dateString2 =  theDate.toLocaleTimeString("en-US",options2);
                                   //console.log(dateString);
                                  
                                   $('#sq_due_date2').val(dateString);
                                   var hourline=dateString2.split(':');
                                   $('#sq_due_hour2').val(hourline[0]);
                                   $("#sq_due_hour2").selectmenu("refresh", true);
                                   var hourline2=hourline[1].split(' ');
                                    //console.log(hourline2);
                                   $('#sq_due_min2').val(hourline2[0]);
                                   $("#sq_due_min2").selectmenu("refresh", true);
                                   $('#sq_due_period2').val(hourline2[1]);
                                   $("#sq_due_period2").selectmenu("refresh", true);
                                }
                                
                                if(resp.squareinfo.userRole!='SquareMaster'){
                                    $('#sq_square_name2').prop('readonly',true); //for member  
                                    $('#sq_desc2').prop('readonly',true);
                                   // $('#sq_peoplesearch2').prop('readonly',true);                              
                                    $('#sq_due_date2').prop('readonly',true);
                                    $("#sq_due_date2").datepicker( "option",  { disabled: true } );
                                    $('#sq_due_hour2').prop('disabled',true);$("#sq_due_hour2").selectmenu("refresh", true);  //for member
                                    $('#sq_due_min2').prop('disabled',true);$("#sq_due_min2").selectmenu("refresh", true);
                                    $('#sq_due_period2').prop('disabled',true);$("#sq_due_period2").selectmenu("refresh", true);
                                }
                                
                                $( "#bs_esquare" ).data( "currentrole",resp.squareinfo.userRole);
                                setTimeout(function(){
                                backstore_control('esquare');
                               // backstore_binder_color(resp.binderColor);                                   
                                 },30);
                               }else{
                                 console.log(resp);    
                               }
                                }
                        });
                        
        setTimeout(function(){
         loading(0); 
        },500);                         
   
}

function saveSquareEdition(){
   
    var bindeTemps=$('.view_line_binder').next('.selectbinder');
    var bindeTemp2s=$(bindeTemps).attr('id');
    var binderids=bindeTemp2s.split('_'); 
    var selectedBinderId=binderids[1];
    var bindeTemp=$('#content div.content_view:visible')[0];
    var bindeTemp2=$(bindeTemp).attr('id');
    var binderid=bindeTemp2.split('_'); 
    var currentBinderID=binderid[1];
    var userRole=$( "#bs_esquare" ).data( "currentrole");
    var currentSquareId=$( "#bs_esquare" ).data( "esquare");
    var content={};
    var send=true;
    content['squareid']=currentSquareId;
    content['binderid']=currentBinderID;
    if(selectedBinderId!=currentBinderID){
      content['newbinderid']=selectedBinderId;  
    }
    
    
  /*   var invitationTemp=$('#sq_bkdhelper_peoplesearch_selected2  div.view_img_select');
    if(invitationTemp.length>0){
      var i=0;
      content['userinvitecounter']=invitationTemp.length;
      $.each(invitationTemp,function(index,memb){
        i++; 
        var membtemp=$(memb).css('background-image')
        var temptroken1=membtemp.split('url(');
        var temptroken2=temptroken1[1].split(')');
        content['email'+ i]=temptroken2[0];
     
      });     
    }*/
    
    content['name']=$('#sq_square_name2').val();
    content['description']=$('#sq_desc2').val();
    content['deadline']=$('#sq_due_date2').val();
    content['hoursdead']=$('#sq_due_hour2').val();
    content['mindead']=$('#sq_due_min2').val();
    content['perioddead']=$('#sq_due_period2').val();
    
    if(content['name'].trim()===''){
     field('sq_square_name2');
     send=false;           
    } 
    
   if(content['description'].trim()===''){
       field('sq_desc2');
       send=false;       
    }
    
   if(content['deadline'].trim()!==''){     
    
    if( content['hoursdead'].trim()===''){
       field('sq_due_hour-button2');
       send=false;       
     } 
     
     if( content['mindead'].trim()===''){
       field('sq_due_min-button2');
       send=false;       
     } 
     
     if( content['perioddead'].trim()===''){
       field('sq_due_period-button2');
       send=false;       
     } 
          
    }
    
    if(send){
//     console.log(content);   
   jQuery.ajax({
           /* async: false,
            cache: false,*/
            url: http_base+"/user/updateSquare",
            type: "POST",
            dataType:'json', 
            data:content,
            success:function(resp) {                                   	                                                                                                                    
                 /*  if(resp.status==='Success'){                                           
                   //  action_done();              
                   }
                   
                    action_done();  */
               console.log(resp);
                action_done();  
               
                }
            });  
    }
       
    
    //action_done();
   //square_done(); 
}

function deleteSquare(){    
    var bindeTemp=$('#content div.content_view:visible')[0];
    var bindeTemp2=$(bindeTemp).attr('id');
    var binderid=bindeTemp2.split('_'); 
    var currentBinderID=binderid[1];
    var userRole=$( "#bs_esquare" ).data( "currentrole");
    var currentSquareId=$( "#bs_esquare" ).data( "esquare");
     if(userRole=='SquareMaster'){
        console.log(currentBinderID, userRole, currentSquareId); 
       var content={}; 
             content['binderID']=currentBinderID.substr(3);             
             content['squareID']=currentSquareId.substr(3);
             jQuery.ajax({
                    async: false,
                    cache: false,
                    url: http_base+"/user/deleteSquare",
                    type: "POST",
                    dataType:'json', 
                    data:content,
                    success:function(resp) {                                   	                                                                                                                    
                         
                        
                        if(resp.status==='Success'){                                           
                           action_done();
                           delete_square(currentSquareId+'_'+currentBinderID.substr(3));
                           }

                           
                      

                        }
            });  
     }  
   
   // action_done();
 //square_done();   
}

function  binderToSelect(){
      // $.getJSON(http_base+'/user/getBinderList',function(result){
           // console.log('2'); 
         var bindeTemp=$('.view_line_binder').next('.selectbinder');
         var bindeTemp2=$(bindeTemp).attr('id');
         //var binderid=bindeTemp2.split('_');    
         /*var List = $('#backend_helper_selectbinder div.selectbinder_frame div.selectbinder_map');
         if(Object.keys(List).length>0){
           $.each(List,function(key,val){
              var val_binderID=$(val).attr('id');
                    console.log(bindeTemp2); 
                     console.log(val_binderID); 
                   if(val_binderID==bindeTemp2){
                     console.log(val_binderID +' choisi'); 
                   $('#'+val_binderID).addClass('selectbinder_activem');   
                   }
                  
                });         
         }*/
           selectbinder();
         //  console.log(bindeTemp2);
          setTimeout(function(){          
               backstore_control_2('selectbinder');                             
               $('#backend_helper_selectbinder #'+bindeTemp2).addClass('selectbinder_activem');   
              },
             20);
             
          
         /*jQuery.ajax({
           /* async: false,
            cache: false,
            url: http_base+'/user/getBinderList',
            type: "POST",
            dataType:'json',           
            success:function(result) {  
           
            var bindeTemp=$('.view_line_binder').next('.selectbinder');
            var bindeTemp2=$(bindeTemp).attr('id');
            var binderid=bindeTemp2.split('_'); 
            //console.log(binderid[1]) ; 
            $('#backend_helper_selectbinder div.selectbinder_frame').remove();
            if(result.status==='Success'){                                
            if(Object.keys(result.binders).length>0){
                $.each(result.binders,function(key,val){
                var binder='<div class="selectbinder_frame">'+
                         '<div id="bselect_'+val.binderID+'" onClick="selectbinder(\''+val.binderID+'\')" class="t02 tipsafe selectbinder_map tp" tip="'+val.name+'" style="background-color:#'+val.color+';">';
                         if(val.style==null){
                           binder+='<div class="t015 selectbinder_stylem"></div>';    
                         }else{
                           binder+='<div class="t015 selectbinder_stylem" style="background-image:url('+http_base+'/kolabNXFront/img/bstyle/'+val.style+'.png);"></div>';    
                         }
                         binder+='</div></div>';
                  $('#backend_helper_selectbinder').append(binder);        
                   //console.log(val); 
                   if(val.binderID==binderid[1]){
                    $('#bselect_'+val.binderID).addClass('selectbinder_activem');   
                   }
                   $('#bselect_'+val.binderID).data('id',val.binderID);
                   $('#bselect_'+val.binderID).data('name',val.name);
                   $('#bselect_'+val.binderID).data('color',val.color);
                   $('#bselect_'+val.binderID).data('style',val.style);
                });      
             }
               tooltip_refresh();     
              setTimeout(function(){          
               backstore_control_2('selectbinder');
              },
             20);    
             
            }else if(result.status==='Failed' && result.action==='refresh'){
               location.href=http_base+'/site/logout';   
            }
              }
          }); 
    */
    tooltip_refresh(); 
   // selectbinder();
    
     
  setTimeout(function(){
         loading(0); 
        },500);    
}


function  binderToSelectForSquare(){
      // $.getJSON(http_base+'/user/getBinderList',function(result){
           // console.log('2'); 
           jQuery.ajax({
           /* async: false,
            cache: false,*/
            url: http_base+'/user/getBinderList',
            type: "POST",
            dataType:'json',           
            success:function(result) {           
            //console.log(binderid[1]) ; 
            $('#backend_helper_selectbinder div.selectbinder_frame').remove();
            if(result.status==='Success'){                                
            if(Object.keys(result.binders).length>0){
                $.each(result.binders,function(key,val){
                var binder='<div class="selectbinder_frame">'+
                         '<div id="bselect_'+val.binderID+'" onClick="selectbinder(\''+val.binderID+'\')" class="t02 tipsafe selectbinder_map tp" tip="'+val.name+'" style="background-color:#'+val.color+';">';
                         if(val.style==null){
                           binder+='<div class="t015 selectbinder_stylem"></div>';    
                         }else{
                           binder+='<div class="t015 selectbinder_stylem" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/'+val.style+'.png);"></div>';    
                         }
                         binder+='</div></div>';
                  $('#backend_helper_selectbinder').append(binder);        
                   //console.log(val); 
                  
                   $('#bselect_'+val.binderID).data('id',val.binderID);
                   $('#bselect_'+val.binderID).data('name',val.name);
                   $('#bselect_'+val.binderID).data('color',val.color);
                   $('#bselect_'+val.binderID).data('style',val.style);
                });      
             }
               tooltip_refresh();     
              setTimeout(function(){          
               backstore_control_2('selectbinder');
                setTimeout(function(){
                 loading(0); 
                  },500);    
              },
             20);    
             
            }else if(result.status==='Failed' && result.action==='refresh'){
               location.href=http_base+'/site/logout';   
            }
              }
          }); 
    
    selectbinder();
    
     
 
}
    

});