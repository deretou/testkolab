/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
$(function(){
		 
//--------------------------------------------------------------------------------------------------------                                       
                    var tz = jstz.determine(); // Determines the time zone of the browser client
                    var timezone = tz.name(); //'Asia/Kolhata' for Indian Time.
                    // console.log(timezone);
                      jQuery.ajax({
                                        async: false,
                                        cache: false,
                                        url: http_base+"/index.php/user/timezoneoffsettest",
                                        type: "POST",
                                        dataType:'json', 
                                        data:{tz: timezone},
                                        success:function(resp) {                                   	                                                                                                                    
                                               if(resp.status==='Success'){
                                              // console.log(resp); 
                                                var date = new Date(resp.timestamp*1000);
                                                // hours part from the timestamp
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
                                               
                                                //console.log(hours,minutes,seconds,suffix);
                                                $('#hours').text(hours);
                                                $('#min').text(minutes);
                                                $('#mm').text(suffix);
                                                $.every(1000, function() { 
                                                 
                                                  seconds=seconds + 1;
                                                  if(seconds==60){
                                                   minutes=minutes+1; 
                                                   seconds=0;
                                                   //console.log(hours,minutes,suffix); 
                                                    $('#hours').text(hours);
                                                    $('#min').text(minutes);
                                                    $('#mm').text(suffix);
                                                   }
                                                  
                                                  if(minutes==60){
                                                    hours = hours + 1;  
                                                    minutes=0;
                                                 //  console.log(hours,minutes,suffix); 
                                                   $('#hours').text(hours);
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
                                                  // console.log(hours,minutes,suffix);
                                                   $('#hours').text(hours);
                                                   $('#min').text(minutes);
                                                   $('#mm').text(suffix);
                                                   } 
                                                
                                                
                                                });  
                                                  
                                               }else{
                                               //console.log(resp);
                                               }
                                            }
                                        }); 

//------------------------------------------------------------------------------------  
    
	});


