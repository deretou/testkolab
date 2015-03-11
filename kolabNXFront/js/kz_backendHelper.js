/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var bkd_helper_safe=0;
var uploadFile=null;
notif_info=0;
notif_action=0;

 if(controleur==='kzone' && controleurView==='view'){
     require(['mainHelperKzone'], function(mainKzoneHelper) {
   var kzoneChatTracker=0;
  
    
   $('.backend_helper_bs2').hide(); 
  
   $('#bs_resources_2').on('click', function(e) { 
      if(backstore_status_2=="file"){
        $('#action_resources_2 div.a_add').click();
      } 
      e.preventDefault();  
   });
   
   
    $('#action_resources_1 div.a_add').on('click', function(e) {       
        // $('#backend_helper_color').hide();
         uploadFile=null;
          bkd_helper_safe=0;
         if(backstore_status_2==""){           
          $('.backend_helper_bs2').hide(); 
          $('#title_bs2').text('Add');
          $('#bs_bs2').text('Resource');
           $('#action_bs2 div.a_done').remove();   
           if($('#action_bs2 div.a_done').length==0){
              $('#action_bs2').append('<div onclick="$(document).trigger(\'addresourcefile\');" class="t02 action_bt a_done a_tp" tip="Done"></div>');    
           } 
            tooltip_refresh();  
          $('#backend_helper_kzone_file').show(); 
           setTimeout(function(){         
           backstore_control_2('file');
          },
         100);   
         }else if(backstore_status_2=="file"){
            backstore_control_2('file');          
           setTimeout(function(){
           $('#backend_helper_kzone_file').hide(); 
          },
         50);
        
         }else{              
                   backstore_control_2('file');
                   setTimeout(function(){
                     $('.backend_helper_bs2').hide();
                   //   $('#backend_helper_color').show(); 
                    // backstore_control_2('bcolor');
                    setTimeout(function(){
                    // backstore_control_2('bcolor');
                    // $('#title_bs2').text('Color');
                     //$('#bs_bs2').text('Binder');
                     $('#backend_helper_kzone_file').show();                    
                   },
                    90);
                 },
                 400);
         }                 
        e.preventDefault();
    });
    
    
    $('#bs_resources_1').on('click', function(e) { 
      if(backstore_status_2=="link"){
        $('#action_resources_1 div.a_add').click();
      } 
      e.preventDefault();  
   });
   
   
    
   $('#action_resources_2 div.a_add').on('click', function(e) {       
        // $('#backend_helper_color').hide();   
        //onClick="backstore_control_2('link')"
          bkd_helper_safe=0;
         if(backstore_status_2==""){           
          $('.backend_helper_bs2').hide(); 
          $('#title_bs2').text('Add');
          $('#bs_bs2').text('Resource');
           $('#action_bs2 div.a_done').remove();   
           if($('#action_bs2 div.a_done').length==0){
              $('#action_bs2').append('<div onclick="$(document).trigger(\'addresourcelink\');" class="t02 action_bt a_done a_tp" tip="Done"></div>');    
           } 
            tooltip_refresh();  
          $('#backend_helper_kzone_link').show(); 
           setTimeout(function(){         
           backstore_control_2('link');
          },
         100);   
         }else if(backstore_status_2=="link"){
            backstore_control_2('link');          
           setTimeout(function(){
           $('#backend_helper_kzone_link').hide(); 
          },
         50);
        
         }else{              
                   backstore_control_2('link');
                   setTimeout(function(){
                     $('.backend_helper_bs2').hide();
                   //   $('#backend_helper_color').show(); 
                    // backstore_control_2('bcolor');
                    setTimeout(function(){
                    // backstore_control_2('bcolor');
                     //$('#title_bs2').text('Color');
                    // $('#bs_bs2').text('Binder');
                     $('#backend_helper_kzone_link').show();                    
                   },
                    90);
                 },
                 400);
         }                 
        e.preventDefault();
    });
    
     $('#myfile').on('change', function(event){
           var temfile= event.target.files;
           uploadFile=mainKzoneHelper.prepareUpload(temfile); 
           event.preventDefault();
            return false;
     });
     
     
     $(document).bind('addresourcefile', function (e) {
   //  console.log($(source).attr('id'));
     if(bkd_helper_safe==0){
        bkd_helper_safe=1;
       if( uploadFile!=null){
          //console.log(uploadFile); 
          loading(1);
         mainKzoneHelper.uploadResourceManager(uploadFile); 
        }else{
           console.log('uploadFile is empty');   
        }
       
        }
       e.preventDefault();
       });
       
       $(document).bind('resbackstoreopen', function (e,source) {
        var id= $(source).attr('id');
      
        $('#view_resources_1B div.view_hero').remove();
        $('#view_resources_1B p.view_line').remove();
        $('#view_resources_1B img.view_hero').remove();
        $("#view_resources_1B p.view_title:contains(Added by)").after('<p class="view_line kz_view_name kz_user'+$('#'+id).data('ownercolor')+'_bkg">'+$('#'+id).data('ownername')+'</p>');
        $("#view_resources_1B p.view_title:contains(Resource ID)").after('<p class="view_line">'+id+'</p>');
        $("#view_resources_1B p.view_title:contains(Name)").after('<p class="view_line">'+$('#'+id).data('name')+'</p>');
        $("#view_resources_1B p.view_title:contains(Description)").after('<p class="view_line">'+$('#'+id).data('desc')+'</p>');
        $("#view_resources_1B p.view_title:contains(Date added)").after('<p class="view_line">'+$('#'+id).data('datecreation')+'</p>');
        if($('#'+id).data('ext')=='img'){
           $("#view_resources_1B p.view_title:contains(Name)").before('<img src="'+$('#'+id).data('path')+'" alt="'+$('#'+id).data('name')+'" class="view_hero kz_resources_img kz_user'+$('#'+id).data('ownercolor')+'_brd" />');   
           $("#view_resources_1B p.view_title:contains(Additional info)").after('<p class="view_line">'+$('#'+id).data('size')+'</p><p class="view_line">'+$('#'+id).data('width')+'px width</p><p class="view_line">'+$('#'+id).data('height')+'px height</p> <p class="view_line">'+$('#'+id).data('originename')+'</p>'); 
        }else{
           $("#view_resources_1B p.view_title:contains(Name)").before('<div class="view_hero kz_user'+$('#'+id).data('ownercolor')+'_brd"></div>'); 
           $("#view_resources_1B p.view_title:contains(Additional info)").after('<p class="view_line">'+$('#'+id).data('size')+'</p><p class="view_line">'+$('#'+id).data('originename')+'</p>'); 
        }
         backstore_selectionB();
        e.preventDefault();
       }); 
       
       $('#kzchat_input').on('keyup', function(e) {       
             e.preventDefault();
            if(kzoneChatTracker==0){
                kzoneChatTracker=1;
                 var temp=$(this).text();
              $(this).text('');
              $(this).height(20); 
              $(this).focus();
              $(this).text('');
              $(this).text(temp);
            }else{
              $(this).height(20);     
            }
            
            
           if (e.which === 13) {
           
           var testBody=$(this).text();
           if(testBody.trim()!=''){
               mainKzoneHelper.kzoneChatevent(testBody); 
                 $(this).text('');
           }
               
          /* jQuery.ajax({
                           /* async: false,
                            cache: false,
                            url: http_base+"/site/smileyParser",
                            type: "POST",
                            dataType:'json', 
                            data: {body:$(this).text()},
                            success:function(resp) {                                   	                                                                                                                    
                                var body2=resp.body;                              
                                var numberEmo=body2.split(/<\/?span[^>]*>/g);
                                 console.log(numberEmo.length);
                                kz_chat_mess({person:userself,name:'You',message:body2,smb:0,time:Date.now(),pre:0});
                                $('#kzchat_input').text('');
                                $('#kzchat_input').height(20); 
                                
                                }
                            });  */ 
          
        
           
         
         
           }
        
      
        }); 
       
      
    

     });
 }

