/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var MembersToInviteInSquare={};
var bkd_helper_safe=0;
notif_info=0;
notif_action=0;

 if(controleur==='user' && controleurView==='main'){
   require(['mainHelperLocker'], function(mainLockerHelper) {
    var userbackstoreselectionB=null;
    var socialreveal=0;
    var helpreveal=0;
    var feedbackreveal=0;
    var  bt_social_hasBeenClicked=0;
    var  bkd_coverWidthCorrector=0;
    // jQuery loaded by foo module so free to use it 
   $('.backend_helper_bs2').hide(); 
  
   
    $('#backend_helper_bcolor').on('click', function(e) {       
        // $('#backend_helper_color').hide();        
         if(backstore_status_2==""){           
          $('.backend_helper_bs2').hide(); 
          $('#title_bs2').text('Color');
          $('#bs_bs2').text('Binder');
          $('#backend_helper_color').show(); 
           setTimeout(function(){
           backstore_control_2('bcolor');
          },
         100);   
         }else if(backstore_status_2=="bcolor"){
          backstore_control_2('bcolor');           
           setTimeout(function(){
           $('#backend_helper_color').hide(); 
          },
         50);
        
         }else{              
                   backstore_control_2('bcolor');
                   setTimeout(function(){
                     $('.backend_helper_bs2').hide();
                   //   $('#backend_helper_color').show(); 
                    // backstore_control_2('bcolor');
                    setTimeout(function(){
                    // backstore_control_2('bcolor');
                     $('#title_bs2').text('Color');
                     $('#bs_bs2').text('Binder');
                     $('#backend_helper_color').show();                    
                   },
                    90);
                 },
                 400);
         }                     
        e.preventDefault();
    });   
    $('#backend_helper_bcolor2').on('click', function(e) {       
        // $('#backend_helper_color').hide(); 
        
         if(backstore_status_2==""){       
           $('.backend_helper_bs2').hide();
           $('#title_bs2').text('Color');
           $('#bs_bs2').text('Binder');
           $('#backend_helper_color').show(); 
           setTimeout(function(){
           backstore_control_2('bcolor');
          },
         100);   
         }else if(backstore_status_2=="bcolor"){
          backstore_control_2('bcolor');           
           setTimeout(function(){
           $('#backend_helper_color').hide(); 
          },
         50);
        
         }else{              
                   backstore_control_2('bcolor');
                   setTimeout(function(){
                    $('.backend_helper_bs2').hide();
                   //   $('#backend_helper_color').show(); 
                    // backstore_control_2('bcolor');
                    setTimeout(function(){
                    // backstore_control_2('bcolor');
                     $('#title_bs2').text('Color');
                     $('#bs_bs2').text('Binder');
                     $('#backend_helper_color').show();                    
                   },
                    90);
                 },
                 400);
         }                     
        e.preventDefault();
    });
    
    $(document).bind('binderselect', function(e) {       
        // $('#backend_helper_color').hide(); 
        
         if(backstore_status_2==""){       
           $('.backend_helper_bs2').hide();  
           $('#title_bs2').text('Edit');
           $('#bs_bs2').text('Square');
           $('#action_bs2 div.a_done').remove();   
           if($('#action_bs2 div.a_done').length==0){
              $('#action_bs2').append('<div onclick="$(document).trigger(\'binderselectdone\');" class="t02 action_bt a_done a_tp" tip="Done"></div>');    
           }        
           $('#backend_helper_selectbinder').show(); 
          
             loading(1); 
            mainLockerHelper.binderToSelect();   
             tooltip_refresh();
         }else if(backstore_status_2=="selectbinder"){
            backstore_control_2('selectbinder');           
           setTimeout(function(){
           $('#title_bs2').text('');
           $('#bs_bs2').text('');
           $('#action_bs2 div.a_done').remove();    
           $('#backend_helper_selectbinder').hide(); 
          },
         50);
        
         }/*else{  onClick="action_done(\'bs2\');"            
                   backstore_control_2('selectbinder');
                   setTimeout(function(){
                    $('.backend_helper_bs2').hide();
                   //   $('#backend_helper_color').show(); 
                    // backstore_control_2('bcolor');
                    setTimeout(function(){
                    // backstore_control_2('bcolor');                    
                     $('#backend_helper_selectbinder').show();                    
                   },
                    90);
                 },
                 400);
         }   */                  
        e.preventDefault();
    });
    
    
  $(document).bind('binderselectdone', function(e) {       
        // $('#backend_helper_color').hide(); 
       var binderSelected=$('#backend_helper_selectbinder div.selectbinder_activem');
       if(binderSelected.length==1){     
         var userSelectedBinder=($(binderSelected[0]).attr('id')).split('_');
         //console.log(userSelectedBinder);
         //console.log($(binderSelected[0]).attr('tip'));
         //console.log($(binderSelected[0]).attr('colour'));
        // console.log($(binderSelected[0]).attr('design'));
         $('.view_line_binder').next('.selectbinder').remove();
              var binder='<div id="'+$(binderSelected[0]).attr('id')+'" onclick="$(document).trigger(\'binderselect\');"  class="t02 selectbinder" style="background-color:#'+$(binderSelected[0]).attr('colour')+';">'+
                                        '<p class="t02 selectbinder_name">'+$(binderSelected[0]).attr('tip')+'</p>';
                                    if($(binderSelected[0]).attr('tip')!=='Personal'){
                                     binder+= '<div class="t01 selectbinder_style" style="background-image:url('+http_base+'/kolabNXFront/img/bstyle/'+$(binderSelected[0]).attr('design')+'.png);"></div></div>';    
                                    }else{
                                    binder+= '<div class="t01 selectbinder_style"></div></div>';        
                                    }
                                      
                               
       $('.view_line_binder').after(binder);  
        tooltip_refresh();
       }
      action_done('bs2');
                        
     e.preventDefault();
    });  
    
    $('#backend_helper_bstyle').on('click', function(e) {       
    
      //$('#backend_helper_style').hide();
       if(backstore_status_2==""){
       $('.backend_helper_bs2').hide();
       $('#title_bs2').text('Design');
       $('#bs_bs2').text('Binder');
       $('#backend_helper_style').show();
       setTimeout(function(){
         backstore_control_2('bstyle');
       },
       100);   
       }else if(backstore_status_2=="bstyle"){            
             backstore_control_2('bstyle');
             setTimeout(function(){
               $('#backend_helper_style').hide(); 
             },
              50); 
           
          
       }else{
          backstore_control_2('bstyle');
          setTimeout(function(){
           $('.backend_helper_bs2').hide(); 
             setTimeout(function(){
                    // backstore_control_2('bcolor');
                     $('#title_bs2').text('Design');
                     $('#bs_bs2').text('Binder');
                     $('#backend_helper_style').show();                   
                   },
                    50);
           },
           400);     
       }
      
     
        e.preventDefault();
    });
    
    $('#backend_helper_bstyle2').on('click', function(e) {       
    
      //$('#backend_helper_style').hide();
       if(backstore_status_2==""){
       $('.backend_helper_bs2').hide();
       $('#title_bs2').text('Design');
       $('#bs_bs2').text('Binder');
       $('#backend_helper_style').show();
       setTimeout(function(){
         backstore_control_2('bstyle');
       },
       100);   
       }else if(backstore_status_2=="bstyle"){            
             backstore_control_2('bstyle');
             setTimeout(function(){
               $('#backend_helper_style').hide(); 
             },
              50); 
           
          
       }else{
          backstore_control_2('bstyle');
          setTimeout(function(){
            $('.backend_helper_bs2').hide();
             setTimeout(function(){
                    // backstore_control_2('bcolor');
                     $('#title_bs2').text('Design');
                     $('#bs_bs2').text('Binder');
                     $('#backend_helper_style').show();                   
                   },
                    50);
           },
           400);     
       }
      
     
        e.preventDefault();
    });
    
   $('#user_logout').on('click', function(e) {       
       mainLockerHelper.logout();
        e.preventDefault();
    });
    
 $('#action_nbinder_1 div.a_back').on('click', function(e) {       
         bkd_helper_safe=0;
        action_back('nbinder');
        binder_designer();
        $('.b_sel').removeClass('view_binder_active');
        $('.style_selectd').removeClass('view_binder_active').removeClass('style_selecto');
        e.preventDefault();
    }); 

 $('#action_nsquare_1 div.a_back').on('click', function(e) {       
      bkd_helper_safe=0;
      $('#sq_square_name').val('');
      $('#sq_desc').val('');
      $('#sq_due_date').val('');
      $('#sq_due_hour').val('');
      $("#sq_due_hour").selectmenu("refresh", true);
      $('#sq_due_min').val('');
      $("#sq_due_min").selectmenu("refresh", true);
      $('#sq_due_period').val('');
      $("#sq_due_period").selectmenu("refresh", true);
        e.preventDefault();
    });        
    
    
$('#action_nbinder_1 div.a_done').on('click', function(e) {       
         if(bkd_helper_safe==0){
           bkd_helper_safe=1;
           loading(1); 
         mainLockerHelper.createBinder();
            }
      
      //  action_manage('done');
        e.preventDefault();
    }); 
    
$('#action_nsquare_1 div.a_done').on('click', function(e) {              
        if(bkd_helper_safe==0){
           bkd_helper_safe=1; 
             loading(1); 
           mainLockerHelper.createSquare();
          }
      //  action_manage('done');
        e.preventDefault();
    }); 
    
 $('#nav_menu_m_manage').on('click', function(e) {              
          bkd_helper_safe=0;
       if($('.cover_locker').is(":visible")){
       mainLockerHelper.manageSquare();
          $('#sq_square_name').val('');
          $('#sq_desc').val('');
          $('#sq_due_date').val('');
          $('#sq_due_hour').val('');
          $("#sq_due_hour").selectmenu("refresh", true);
          $('#sq_due_min').val('');
          $("#sq_due_min").selectmenu("refresh", true);
          $('#sq_due_period').val('');
          $("#sq_due_period").selectmenu("refresh", true);
      }else{
       mainLockerHelper.manageBinder();    
      }  
     
        e.preventDefault();
    }); 
    
$('#notif_manage').on('click', function(e) {              
        bkd_helper_safe=0;
       if($('.cover_locker').is(":visible")){
        mainLockerHelper.manageSquare(); 
          $('#sq_square_name').val('');
          $('#sq_desc').val('');
          $('#sq_due_date').val('');
          $('#sq_due_hour').val('');
          $("#sq_due_hour").selectmenu("refresh", true);
          $('#sq_due_min').val('');
          $("#sq_due_min").selectmenu("refresh", true);
          $('#sq_due_period').val('');
          $("#sq_due_period").selectmenu("refresh", true);
       }else{
        mainLockerHelper.manageBinder();    
       }  
        e.preventDefault();
    });  
   
$('#nav_menu_m_add').on('click', function(e) {              
      bkd_helper_safe=0;
    if($('.cover_locker').is(":visible")){
         // console.log('j\'edite');
         //if(binderToEdit==='0'){
         
      $('#sq_square_name').val('');
      $('#sq_desc').val('');
      $('#sq_due_date').val('');
      $('#sq_due_hour').val('');
      $("#sq_due_hour").selectmenu("refresh", true);
      $('#sq_due_min').val('');
      $("#sq_due_min").selectmenu("refresh", true);
      $('#sq_due_period').val('');
      $("#sq_due_period").selectmenu("refresh", true);
                   
    }else if($('.cover_social').is(":visible")){
        
    }else{
         
         var color='282828';
        // nav_control('manage');
         backstore_2_color(color);
	 $('#bs_nbinder').transition({borderRightColor:'#'+color},300);
	 $('#bs_nbinder .bs_header').transition({backgroundColor:'#'+color},300);
	 $('#bs_nbinder .bs_footer').transition({backgroundColor:'#'+color},300);
         $('.b_sel').removeClass('view_binder_active');
         $('.style_selectd').removeClass('view_binder_active').removeClass('style_selecto');
         // }         
          }
        e.preventDefault();
 });
    
 $('.bt_top').on('click', function(e) {       
     var id =$(this).attr('id');
     if(backstore_status=='notif'){
              // console.log('Ferme notification');
               $(document).trigger('notificationbackclosed');
            }
    
    if(backstore_status!='notif' && id=='notif'){
      //  $('#view_notif_1 div.content div.view_box').empty();
     // updateNotificationsBS();
    }
      //  action_manage('done');
        e.preventDefault();
    }); 
    
    
  $('.bt_bottom').on('click', function(e) {       
        var id =$(this).attr('id');  
      if(backstore_status=='notif'){
              // console.log('Ferme notification');
               $(document).trigger('notificationbackclosed');
            }
    
    if(backstore_status!='notif' && id=='notif'){
      //  $('#view_notif_1 div.content div.view_box').empty();
     // updateNotificationsBS();
    }
      //  action_manage('done');
        e.preventDefault();
    });
    
    
  $('.bt.menu').on('click', function(e) {       
        var id =$(this).attr('id');  
      if(backstore_status=='notif'){
               //console.log('Ferme notification');
               $(document).trigger('notificationbackclosed');
            }
    
    if(backstore_status!='notif' && id=='notif'){
      //  $('#view_notif_1 div.content div.view_box').empty();
     // updateNotificationsBS();
    }
      //  action_manage('done');
        e.preventDefault();
    });    
  
$('#action_ebinder_1 div.a_done').on('click', function(e) {       
    mainLockerHelper.saveBinderEdition();
    e.preventDefault();
}); 
    
 $('#action_ebinder_1 div.a_delete').on('click', function(e) {       
       if(bkd_helper_safe==0){
           bkd_helper_safe=1;
           mainLockerHelper.deleteBinder();
          }
    e.preventDefault();
});  

$('#action_mess_1 div.a_add').on('click', function(e) {       
   if(backstore_status_2==""){           
          $('.backend_helper_bs2').hide(); 
          $('#title_bs2').text('New');
          $('#bs_bs2').text('Message');
          $('#action_bs2 div.a_done').remove();    
          if($('#action_bs2 div.a_done').length==0){
             $('#action_bs2').append('<div onClick="$(document).trigger(\'sendnewmessage\');" class="t02 action_bt a_done a_tp" tip="Send"></div>');    
          }
         tooltip_refresh();  
          $('#backend_helper_message').show(); 
           setTimeout(function(){
           backstore_control_2('newmess');
          },
         100);   
         }else if(backstore_status_2=="newmess"){
           backstore_control_2('newmess');           
           setTimeout(function(){
            $('#title_bs2').text('');
            $('#bs_bs2').text('');
            $('#action_bs2 div.a_done').remove(); 
            $('#backend_helper_message').hide(); 
          },
         50);
        
         }
   $('#mess_view_peoplesearch').val('');
   $('#mess_view_peoplesearch_tab').empty();
   $('#mess_view_peoplesearch_tab').stop(true,true).transition({height:0},320,'easeOutExpo');  
   $('#mess_view_peoples_select').empty();
     bkd_helper_safe=0;
    e.preventDefault();
}); 

$('#action_mess_2 div.a_add').on('click', function(e) {       
   if(backstore_status_2==""){           
          $('.backend_helper_bs2').hide(); 
          $('#title_bs2').text('New');
          $('#bs_bs2').text('Message');
          $('#action_bs2 div.a_done').remove();    
          if($('#action_bs2 div.a_done').length==0){
             $('#action_bs2').append('<div onClick="$(document).trigger(\'sendnewmessage\');" class="t02 action_bt a_done a_tp" tip="Send"></div>');    
          }
         tooltip_refresh();  
          $('#backend_helper_message').show(); 
           setTimeout(function(){
           backstore_control_2('newmess');
          },
         100);   
         }else if(backstore_status_2=="newmess"){
           backstore_control_2('newmess');           
           setTimeout(function(){
            $('#title_bs2').text('');
            $('#bs_bs2').text('');
            $('#action_bs2 div.a_done').remove(); 
            $('#backend_helper_message').hide(); 
          },
         50);
        
         }
    $('#mess_view_peoplesearch').val('');
    $('#mess_view_peoplesearch_tab').empty();
    $('#mess_view_peoplesearch_tab').stop(true,true).transition({height:0},320,'easeOutExpo'); 
    $('#mess_view_peoples_select').empty();
      bkd_helper_safe=0;
    e.preventDefault();
}); 

$('#action_mess_3 div.a_add').on('click', function(e) {       
   if(backstore_status_2==""){           
          $('.backend_helper_bs2').hide(); 
          $('#title_bs2').text('New');
          $('#bs_bs2').text('Message');
          $('#action_bs2 div.a_done').remove();    
          if($('#action_bs2 div.a_done').length==0){
             $('#action_bs2').append('<div onClick="$(document).trigger(\'sendnewmessage\');" class="t02 action_bt a_done a_tp" tip="Send"></div>');    
          }
         tooltip_refresh();  
          $('#backend_helper_message').show(); 
           setTimeout(function(){
           backstore_control_2('newmess');
          },
         100);   
         }else if(backstore_status_2=="newmess"){
           backstore_control_2('newmess');           
           setTimeout(function(){
            $('#title_bs2').text('');
            $('#bs_bs2').text('');
            $('#action_bs2 div.a_done').remove(); 
            $('#backend_helper_message').hide(); 
          },
         50);
        
         }
    $('#mess_view_peoplesearch').val('');
    $('#mess_view_peoplesearch_tab').empty();
    $('#mess_view_peoplesearch_tab').stop(true,true).transition({height:0},320,'easeOutExpo'); 
    $('#mess_view_peoples_select').empty();
      bkd_helper_safe=0;
    e.preventDefault();
});


$('#action_esquare_1 div.a_done').on('click', function(e) {       
   mainLockerHelper.saveSquareEdition();
   
    e.preventDefault();
});
    
 $('#action_esquare_1 div.a_delete').on('click', function(e) {       
     if(bkd_helper_safe==0){
       bkd_helper_safe=1;
       mainLockerHelper.deleteSquare();
      }
    e.preventDefault();
}); 
$('#bt_locker').on('click', function(e) {       
      // console.log(' je suis la 2');
  
   // $('.bkd_main_content_helper').hide();  
   // $('.bkd_main_content_helper1').hide();  
   
      loading(1);
     $('.bkd_main_content_helper').hide();
      if(current!='locker'){
        locker_reveal();  
       update_current('locker');
      }else{
        locker_control();   
      }
    
   // current="social";
    //$('.bt_yiiajax_main').eq(0).click();
     $('.bkd_nav_hlp').hide(); //
     $('.bkd_nav_hlp_locker').show(); //
     $('.nav_list').hide(); //
   
            
     // $('.bt_yiiajax_main').eq(1).click();
    
      setTimeout(function() {
                   $('#main_locker_bkd').show();                                                                                                                 
                
                    loading(0);                  
                     }, 800);

    e.preventDefault();
}); 

$('#bt_kolab').on('click', function(e) {   
$('#bt_locker').click();
e.preventDefault();
});

$('#bt_notif').on('click', function(e) {   
tooltip_refresh(); 
e.preventDefault();
});


$('#bt_social').on('click', function(e) {       
       //console.log(' je suis la 2');
  
   // $('.bkd_main_content_helper').hide();  
   // $('.bkd_main_content_helper1').hide();  
      loading(1);
     // console.log(current);
      if(current!='social'){
         binder_restore();
         social_reveal();
      }
    update_current('social');
   // current="social";
    //$('.bt_yiiajax_main').eq(0).click();
    $('.bkd_nav_hlp').hide(); //
    
     //$('.nav_list').hide(); //
     $('.bkd_main_content_helper').hide();      
     // $('.bt_yiiajax_main').eq(1).click();
     setTimeout(function() {
                    
                 $('#main_social_bkd').show(); 
                   // social_control();
                   
                   if(socialreveal==0){
                       social_reveal(); 
                       socialreveal=1;
                   }else{
                      social_control();  
                   }
                  bt_social_hasBeenClicked=1;
                  bkd_coverWidthCorrector=$('.cover_social').width();
                 // console.log(bkd_coverWidthCorrector);
                   // social_control();
                    loading(0);                  
                     }, 400);

       e.preventDefault();
}); 



 
 $('#bt_help').on('click', function(e) {       
  
    loading(1);
    $('.bkd_main_content_helper').hide();
 
     update_current('help');
    // current="help";
   // $('.bkd_main_content_helper').hide();  
   // $('.bkd_main_content_helper1').hide();  
 
     $('.bkd_nav_hlp').hide(); //
       $('.bkd_nav_hlp_help').show(); //
     $('.nav_list').hide(); //
     // $('.bt_yiiajax_main').eq(3).click();
       setTimeout(function() {
                $('#main_help_bkd').show(); 
                  // console.log('bizarre');
                   //special_status="help";
                 if(helpreveal==0){
                    special_reveal(); 
                    helpreveal=1;
                  }else{
                     help_control();
                  }
                 
                  // help_control();
                   $('.special_content').height('844px');
                    loading(0);                  
                     }, 400);

    e.preventDefault();
});




$('#bt_feedback').on('click', function(e) {       
  
    loading(1);
    
     update_current('feedback');
     //current="feedback";
   // $('.bkd_main_content_helper').hide();  
   // $('.bkd_main_content_helper1').hide();  
 
     $('.bkd_nav_hlp').hide(); //
     $('.bkd_nav_hlp_feedback').show(); //
     $('.nav_list').hide(); //
     $('.bkd_main_content_helper').hide();
   
      //$('.bt_yiiajax_main').eq(2).click();
             setTimeout(function() {
                    $('#main_feedback_bkd').show(); 
                  // console.log('bizarre');
                   //special_status="help";
                    if(feedbackreveal==0){ 
                    special_reveal();
                    feedbackreveal=1;
                    }else{
                    feedback_control();    
                    }
                   //feedback_control();
                    $('.special_content').height('844px');
                    loading(0);                  
                     }, 700);
    

    e.preventDefault();
}); 


    
$(document).bind('notifcontactaction', function (e, source) {
    // console.log($(source).text(),$(source).parent().attr('id'));
    mainLockerHelper.kolabInvitationFinalDecision($(source).parent().attr('id'), $(source).text());
    e.preventDefault();
});

$(document).bind('notifsquareaction', function (e, source) {
     console.log($(source).text(),$(source).parent().attr('id'));
    //mainLockerHelper.kolabInvitationFinalDecision($(source).parent().attr('id'), $(source).text());
    if($(source).text()=='Accept'){
     if(backstore_status_2==""){       
           $('.backend_helper_bs2').hide();  
           $('#title_bs2').text('Add');
           $('#bs_bs2').text('Square');
           $('#action_bs2 div.a_done').remove();   
           if($('#action_bs2 div.a_done').length==0){
              $('#action_bs2').append('<div onclick="$(document).trigger(\'addsquaretobinderselecteddone\',\''+$(source).parent().attr('id')+'\');" class="t02 action_bt a_done a_tp" tip="Done"></div>');    
           }        
           $('#backend_helper_selectbinder').show(); 
          
            selectbinder();
             loading(1); 
             backstore_control_2('selectbinder');
               tooltip_refresh(); 
             setTimeout(function(){
                 loading(0);                 
                  },500);
           // mainLockerHelper.binderToSelectForSquare();          
         }else if(backstore_status_2=="selectbinder"){
            backstore_control_2('selectbinder');           
           setTimeout(function(){
           $('#title_bs2').text('');
           $('#bs_bs2').text('');
           $('#action_bs2 div.a_done').remove();    
           $('#backend_helper_selectbinder').hide(); 
          },
         50);
        
         }    
    } 
   
    e.preventDefault();
});

$(document).bind('addsquaretobinderselecteddone', function (e,source) {
     var notif =source.split('_');
     if($('#backend_helper_selectbinder div.selectbinder_frame div.selectbinder_activem').length>0){
     var binderSelected=($($('#backend_helper_selectbinder div.selectbinder_frame div.selectbinder_activem')[0]).attr('id')).split('_');
     //console.log(source);
    //backstore_control('ebinder');
     //backstore_control('ebinder'); 
    // binder_designer();
     //console.log(notif[0],binderSelected[1]);
     if(binderSelected.length==2){
             loading(1);
             mainLockerHelper.addSquareToBinder(binderSelected[1],notif[0]);
     }
    
     }else{
         field('backend_helper_selectbinder');
     }
    e.preventDefault();
});
    
$(document).bind('editbinder', function (e, source) {
   //console.log($(source).parent().attr('id'));
    //backstore_control('ebinder');
     //backstore_control('ebinder'); 
    // binder_designer();
    if($(source).parent().attr('id').trim()!=='b_klb_frame'){
        loading(1);
         bkd_helper_safe=0;
        mainLockerHelper.editBinder(source);    
    }
   
    e.preventDefault();
}); 

$(document).bind('showbindersquaresist', function (e, source) {
   //  console.log($(source).attr('id'));
     var temp=$(source).attr('id');
     var tempid=temp.split('_');
     //console.log($(source).attr('id'));
       //console.log(tempid[1]);
      binder_select(tempid[1]);
   // console.log(window.console.propertyIsEnumerable());
  /*  console.log($('.struc_binder_on').height());
   if($('.struc_binder_on').height()==0){
     console.log('je suis la hein');
     $.after(700, function() {  
      $('.struc_binder_on').height($('#struc_left').height());
      });    
   }*/
    
    $.after(350, function() {  
    // console.log($('.struc_binder_on').height());
     //  if($('.struc_binder_on').height()==0){
       //console.log('je suis la hein');     
        $('.struc_binder_on').height($('#struc_content').height()); 
         if(bt_social_hasBeenClicked==1){          
          // console.log('je suis la hein');
            $('.cover_locker').width(bkd_coverWidthCorrector - $('#struc_binder').width());
            bkd_coverWidthCorrector=0;
            bt_social_hasBeenClicked=0;
         } 
        //}
      }); 
   
    //showSquareList(this);
    e.preventDefault();
}); 

$(document).bind('notificationbackclosed', function (e) {
     mainLockerHelper.userNotificationManagerBackClosing();
    //showSquareList(this);
    e.preventDefault();
}); 

$(document).bind('displayuserbackstoreselectionb', function (e,source) {
     $('#user_bs_info').ready(function(){
          console.log(source);
           //console.log($('#user_bs_info').html());
           $('#action_user_1B .a_done').show();
           if(source=='status'){
              $('#action_user_1B .a_done').hide();   
           }
           
           if(source=='balance'){
              $('#action_user_1B .a_done').hide();   
           }
          backstore_selectionB();
           
            if(source=='profile'){
              user_loadmap(user_city);
           }
            loading(0);
            
            //-----------------------------------------
           
            //--------------------------------------------
       });
    e.preventDefault();
}); 

$(document).bind('userbackstoreselectionb', function (e,source) {
      // console.log(source);
     //if(source!==userbackstoreselectionB){
      // userbackstoreselectionB= source; 
      
        loading(1);
        
         $('#action_user_1B .a_done').show();
           if(source=='status'){
              $('#action_user_1B .a_done').hide();   
           }
           
           if(source=='balance'){
              $('#action_user_1B .a_done').hide();   
           }
            $('.bkd_helper_user_bs_b').hide();
            $('#user_bs_info_'+source).show();
            mainLockerHelper.jayCorrector();
            backstore_selectionB();
            userbackstoreselectionB=source;
            if(source=='profile'){
              user_loadmap(user_city);
           }
            setTimeout(function() {
                    loading(0);                  
                     }, 700);
       /*$('#user_bs_info').load(function(){
            console.log('Position 2');
           console.log($('#user_bs_info').html());
       });*/
      //}
     //backstore_selectionB();
     //
     //if source===profile [user_loadmap('Montreal, QC, Canada');]
     //if source===password [user_pass();]
    //showSquareList(this);
    e.preventDefault();
});
$('#action_user_1B div.a_done').on('click', function(e) {       
   //mainLockerHelper.saveSquareEdition();
   if(backstore_level=='B' && userbackstoreselectionB!=null){
    // action_done();   
     console.log(userbackstoreselectionB);
   }
   
    e.preventDefault();
});


/*$("#struc_binder").on( "sortupdate", function( event, ui ) {                       
                        mainLockerHelper.binderUIChange($( "#struc_binder" ).sortable( "toArray" ),1);
                        // console.log($( "#struc_binder" ).sortable( "toArray" ));
                        event.preventDefault();
                    } );*/
       
$(document).bind('sortableupdate', function (e) {
     // console.log($( "#struc_binder" ).sortable( "toArray" ));
       mainLockerHelper.binderUIChange($( "#struc_binder" ).sortable( "toArray" ),1);
                        // console.log($( "#struc_binder" ).sortable( "toArray" ));
    //showSquareList(this);
    e.preventDefault();
});        
                    
$(document).bind('chatevent', function (ev,e,source) {                      
          mainLockerHelper.chatEventSender(e,source);
          ev.preventDefault();
        
   });  
   
 $('#search_input').on('keyup', function(e) {       
         loading(1);
         mainLockerHelper.getSearchResult(e);
        e.preventDefault();
        }); 

$('#sq_peoplesearch').on('keyup', function(e) {       
       mainLockerHelper.getSquarePeopleToInvite(e);
        e.preventDefault();
        });
/*        
$('#sq_peoplesearch2').on('keyup', function(e) {       
       mainLockerHelper.getSquarePeopleToInvite2(e);
        e.preventDefault();
        });  */       

$('#mess_view_peoplesearch').on('keyup', function(e) {       
      // console.log('je suis la');
        mainLockerHelper.getMessagePeopleToInvite(e);
        e.preventDefault();
        });        
        
       
$(document).bind('openkzone', function (ev,source) {                      
          var temp=$(source).attr('id'); 
          var tempid=temp.split('_');
         window.open(http_base+'/kzone/view?id='+tempid[1]);
          ev.preventDefault();
        
   });         

$(document).bind('editsquare', function (ev,source) {                               
          // console.log(backstore_status); 
         
           if(backstore_status=='esquare'){
              action_back('esquare');
                   setTimeout(function(){
                       // $(document).trigger('editsquare',source);      
                               // backstore_binder_color(resp.binderColor);  
                        loading(1);       
                        mainLockerHelper.editSquare(source);        
                       },700);
           }else{
              loading(1);
              mainLockerHelper.editSquare(source);    
           }                              
           ev.preventDefault();
        
   }); 
    
    
$(document).bind('sqaddusertoinvite', function (e, source) {
    
   // console.log(typeof source);
    if($('.cover_locker').is(":visible")){ 
    var temp=$(source).attr('id');  
      // console.log(temp);
    var email=$('#'+temp).data('email');
    //  console.log(email);
   
    var tovinvite='<div onclick="$(document).trigger(\'sqdeleteusertoinvite\',this)" id="'+temp+'" emailid="'+email+'" class="view_img_select tm tipsafe" tip="'+$('#'+temp).data('name')+'" style="background-image:url('+  $('#'+temp).data('pic')+')">'+
               '<div class="t02 icons view_img_selectd"></div></div>';   
     $('#sq_bkdhelper_peoplesearch_selected').append(tovinvite);
     $('#'+temp+'_inv').data('email2',email);
     tooltip_refresh();  
    }
        
    $('#sq_peoplesearch').val('');
    $('#sq_bkdhelper_peoplesearch_tab').empty();
    $('#sq_bkdhelper_peoplesearch_tab').stop(true,true).transition({height:0},320,'easeOutExpo');
    e.preventDefault();
}); 

$(document).bind('sqdeleteusertoinvite', function (e, source) {
    
   // console.log(typeof source);
    if($('.cover_locker').is(":visible")){ 
    var temp=$(source).attr('id');    
    $('#sq_bkdhelper_peoplesearch_selected #'+temp).remove();   
      
    }            
    e.preventDefault();
}); 
/*
$(document).bind('sqaddusertoinvite2', function (e, source) {
    
   // console.log(typeof source);
    if($('.cover_locker').is(":visible")){ 
    var temp=$(source).attr('id');  
    //console.log(typeof temp);
   
    var tovinvite='<div class="view_img_select tm tipsafe" tip="'+$('#'+temp).data('name')+'" style="background-image:url('+  $('#'+temp).data('pic')+')">'+
               '<div class="t02 icons view_img_selectd"></div></div>';   
     $('#sq_bkdhelper_peoplesearch_selected2').append(tovinvite);
     tooltip_refresh();  
    }
        
    $('#sq_peoplesearch2').val('');
    $('#sq_bkdhelper_peoplesearch_tab2').empty();
    $('#sq_bkdhelper_peoplesearch_tab2').stop(true,true).transition({height:0},320,'easeOutExpo');
    e.preventDefault();
}); */
       
  $(document).bind('messaddusertoinvite', function (e, source) {
    
   // console.log(typeof source);
    bkd_helper_safe=0;
    var temp=$(source).attr('id');  
    //console.log(typeof temp);
     var invitationTemp=$('#mess_view_peoples_select div.view_img_select');
     var invited= new Array();
      if(invitationTemp.length>0){          
      $.each(invitationTemp,function(index,memb){        
        var membtemp=$(memb).css('background-image')
        var temptroken1=membtemp.split('url(');
        var temptroken2=temptroken1[1].split(')');        
        invited.push(temptroken2[0]);
      }); 
     
    }
   
    if(jQuery.inArray($('#'+temp).data('pic'),invited)<0){
    var tovinvite='<div class="view_img_select tm tipsafe" tip="'+$('#'+temp).data('name')+'" style="background-image:url('+  $('#'+temp).data('pic')+')">'+
               '<div class="t02 icons view_img_selectd"></div></div>';   
     $('#mess_view_peoples_select').append(tovinvite);
     tooltip_refresh();  
  
        
    $('#mess_view_peoplesearch').val('');
    $('#mess_view_peoplesearch_tab').empty();
    $('#mess_view_peoplesearch_tab').stop(true,true).transition({height:0},320,'easeOutExpo');  
    }
   
    
    e.preventDefault();
}); 


$(document).bind('sendnewmessage', function (e) {
    
  
    var content={};
    var invitationTemp=$('#mess_view_peoples_select div.view_img_select');
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
      //console.log(content);
       loading(1);
        if(bkd_helper_safe==0){
           bkd_helper_safe=1;
         mainLockerHelper.sendMessage(content); 
        }
    }else{
       field('mess_view_peoplesearch'); 
    }
    
    e.preventDefault();
}); 
    
    
    
    
                    
}); 
		 
 }
 
   
      

 
