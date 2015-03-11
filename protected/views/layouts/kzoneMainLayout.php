<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
if (Yii::app()->user->isGuest || !isset(Yii::app()->session['userid'])){
  header("Location: ".Yii::app()->getBaseUrl(true));  
}

$model=User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']); 
$userName=$model->firstname.' '.$model->lastname;
$userInfo=new stdClass();
$urlPhotoProfile=Yii::app()->getBaseUrl(true).'/kolabNXFront/img/page/default_94.jpg';
 if(isset($model->photoProfile) && !is_null($model->photoProfile)){
 $urlPhotoProfile=$model->photoProfile; 
 }
 $userInfo->urlPhotoProfile=$urlPhotoProfile;
 $userInfo->userName=$model->firstname.' '.$model->lastname;
 // $currentUser= new UserManager();
 //-----------------------------------------------------------------------------------------------
  $squareid=substr($_GET['id'],3);
  $quare=  Squares::model()->findByPk($squareid);              
   if($quare){
   $hashcode=Yii::app()->session[$_GET['id'].'_userid'];    
   
   
 //------------------------------------------------------------------------------------------------
    $smileys=SmileysParser::instance()->loadSmileys('default');
    //print_r($smileys);
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Loading</title>

<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/plugins.css" />
<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/k.main_style.css" />
<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/k.specific_kz.css" />

<link rel="icon" type="image/x-icon" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/kz_favicon.ico" />
<script type="text/javascript" >      
        var http_base='<?php echo Yii::app()->getBaseUrl(true); ?>';          
        var controleur='<?php echo Yii::app()->getController()->getAction()->controller->id; ?>';
        var controleurView='<?php echo Yii::app()->getController()->getAction()->controller->action->id; ?>';  
        var sqname='<?php echo Yii::app()->session[$_GET['id'].'_squarename']; ?>';
        var squareid='<?php echo $_GET['id']; ?>';
        var kzcolor='#<?php echo Yii::app()->session[$_GET['id'].'_squarecolor']; ?>';
        var userself=parseInt(<?php echo Yii::app()->session[$_GET['id'].'_squarecurrentuserpos']; ?>);
        var Smileys=<?php echo json_encode($smileys); ?>; 
        var whatShappening=0;
        </script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-2.1.1.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-ui.custom.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/plugins.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>

<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/magic/TweenMax.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/magic/jquery.gsap.min.js"></script>

<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/k.main_engine.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/k.specific_kz.js"></script>
<script data-main="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/kz_nxeHelper" src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/require.js"></script>
<style>
	<?php 
          $isMember=false;
          if(isset($quare->squareMembers) && !is_null($quare->squareMembers) && count($quare->squareMembers)>0){
            $members= $quare->squareMembers; 
              foreach ($quare->squareMembers as $keyM => $member) {
                  echo '.kz_user'.$member->userColor.'_img{background-image:url('.$member->photoProfile.')}'. "\n"; 
                  if($member->userID==Yii::app()->session[Yii::app()->session['userid'].'_user']){
                    $isMember=true;
                  echo '.kz_userself_img{background-image:url('.$member->photoProfile.')}'. "\n"; 
                    }  
              }   
          }
	
          if(!$isMember){
           header("Location: ".Yii::app()->getBaseUrl(true));      
          }
         ?>	
	
</style>
<script type="text/javascript" > 
$(document).bind('dothat', function (e, source) {
      //  console.log(source);
        whatShappening=source;
    e.preventDefault();
}); 
    $(document).ready(function(){
         setTimeout(function() {
          //console.log(whatShappening);
           if(whatShappening==0){
             location.reload(true);   
           }
          
           }, 4000);  
    });   
        </script>
</head>

<body>

<div id="load"></div>


	<div class="struc_backstore" id="struc_backstore_2">
    	<div class="bs_parts bs_header">
            <p class="bs_title" id="title_bs2">Promote</p>
            <div class="bs_subzone">
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Member</p>
            </div>
        </div>
        
        <div class="bs_parts bs_content bs2_content">
        
        	<div class="view nano" id="view_bs2">
                <div class="nano-content"> <!-- DO NOT USE INCLUDE FILES FOR BS2, USE AS CONTENT REFERENCE ONLY -->
				
                <?php //$this->renderPartial('//user/inc/_bs2_kzone_invite') ?>
                <!--
                <p class="bs_title" id="title_bs2">Add</p>
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Member</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Done"></div>
                -->

				<?php //$this->renderPartial('//user/inc/_bs2_kzone_file') ?>
                 <?php $this->renderPartial('//user/inc/_bs2_kzone_file'); ?>
                <!--
                <p class="bs_title" id="title_bs2">Promote</p>
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Member</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Confirm"></div>
                -->

                <?php //$this->renderPartial('//user/inc/_bs2_kzone_task') ?>
                <!--
                <p class="bs_title" id="title_bs2">Add</p>
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Organization</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Done"></div>
                -->
                
				<?php //$this->renderPartial('//user/inc/_bs2_kzone_link') ?>
                 <?php $this->renderPartial('//user/inc/_bs2_kzone_link'); ?>
                <!--
                <p class="bs_title" id="title_bs2">Add</p>
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Resource</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Done"></div>
                -->
				
                <?php $this->renderPartial('//user/inc/_bs2_kzone_promote'); ?>
                <!--
                <p class="bs_title" id="title_bs2">Add</p>
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Resource</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Done"></div>
                -->
                
                <?php //$this->renderPartial('//user/inc/_bs2_basics_selectbinder'); ?>
                <!--
                <p class="bs_title" id="title_bs2">ACTION</p> (Add or Edit)
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Square</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Done"></div>
                -->
                
                <?php //$this->renderPartial('//user/inc/_bs2_basics_confirm') ?>
                <!--
                <p class="bs_title" id="title_bs2">ACTION</p> (Delete, Quit, Kick)
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">NAME</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Confirm"></div>
                -->
                
                <?php //$this->renderPartial('//user/inc/_bs2_basics_newmess'); ?>
                <!--
                <p class="bs_title" id="title_bs2">ACTION</p> (New or Reply)
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Message</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Send"></div>
                -->
            
                    
                
                	<div class="view_end"></div>
                </div>
        	</div>
            
        </div>
        
        <div class="bs_parts bs_footer">
        
        	<div class="action" id="action_bs2">
            	<div onClick="action_back('bs2')" class="t02 action_bt a_back"></div>
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Confirm"></div>
            </div>
        
        </div>
    
    </div>
    
    
<?php $this->renderPartial('//user/inc/_bs_support_notifsize'); ?>  
<?php $this->renderPartial('//user/inc/_bs_support_refresh'); ?>  
<?php $this->renderPartial('//user/inc/_bs_support_network'); ?>      
<?php $this->renderPartial('//user/inc/_bs_support_restricted'); ?>    
<?php $this->renderPartial('//user/inc/_bs_support_error'); ?>
<?php $this->renderPartial('//user/inc/_bs_support_na'); ?>  

<?php $this->renderPartial('//user/inc/_bs_basics_welcome'); ?>  
<?php $this->renderPartial('//user/inc/_bs_basics_news'); ?>  
<?php $this->renderPartial('//user/inc/_bs_basics_toolbox'); ?>  

<?php $this->renderPartial('//user/inc/_bs_basics_mess'); ?>  
<?php $this->renderPartial('//user/inc/_bs_basics_notif'); ?>  
<?php $this->renderPartial('//user/inc/_bs_basics_user', array('userInfo'=>$userInfo))?>

<?php $this->renderPartial('//user/inc/_bs_kzone_more'); ?>  
<?php $this->renderPartial('//user/inc/_bs_kzone_square'); ?>  
<?php $this->renderPartial('//user/inc/_bs_kzone_members'); ?>  
<?php $this->renderPartial('//user/inc/_bs_kzone_organization'); ?>  
<?php $this->renderPartial('//user/inc/_bs_kzone_resources'); ?>  
<?php $this->renderPartial('//user/inc/_bs_kzone_history'); ?>  
<?php $this->renderPartial('//user/inc/_bs_kzone_export'); ?> 
<?php $this->renderPartial('//user/inc/_bs_kzone_options'); ?>  
 
<?php $this->renderPartial('//user/inc/_chat_list_kz'); ?> 

    
<div id="safety"></div>
<div id="background" class=""></div>

<div id="splash_refresh" class="splash"></div>
<div id="splash_network" class="splash"></div>
<div id="splash_restricted" class="splash"></div>

<div id="struc_wrapper"><!-- MAIN WRAPPER -->

	<div id="cp">
    	<div id="cp_frame">
            <div class="playerapp_click"></div>
        	<div id="cp_main">
                
                <div id="cp_audio_all">
                    
                </div>
                
            </div>
        </div>
        
        <div id="cp_size_1" onclick="cp_update(1)" class="t02 icons chat_icons cp_size nodrag"></div>
        <div id="cp_size_2" onclick="cp_update(2)" class="t02 icons chat_icons cp_size nodrag"></div>
        <div id="cp_size_3" onclick="cp_update(3)" class="t02 icons chat_icons cp_size nodrag"></div>
        <div id="cp_size_4" onclick="cp_update(4)" class="t02 icons chat_icons cp_size nodrag"></div>
        
        <div id="cp_volume" onclick="cp_mute()" class="t02 icons chat_icons chat_close cp_volume nodrag"></div>
        
    </div>

	<div class="trans struc_sides" id="struc_left"><!-- LEFT SIDE -->
    
        <div class="nav" id="nav_main"><!-- MAIN MENU TOP/LEFT -->
        	
            <div id="wait" class="t02"></div>
            <div class="bt bt_top kz_color_bkg bt_square" id="bt_square" onClick="backstore_control('square')"></div>
            <div class="bt bt_top bt_kzone tp bt_members" id="bt_members" tip="Members" onClick="backstore_control('members')"></div>
            <div class="bt bt_top bt_kzone tp bt_organization" id="bt_organization" tip="Organization" onClick="backstore_control('organization')"></div>
            <div class="bt bt_top bt_kzone tp bt_resources" id="bt_resources" tip="Resources" onClick="backstore_control('resources')"></div>
            <div class="bt bt_top bt_kzone tp bt_history" id="bt_history" tip="History" onClick="backstore_control('history')"></div>
            <div class="bt bt_top bt_kzone tp bt_export" id="bt_export" tip="Export" onClick="backstore_control('export')"></div>
            <div class="bt bt_top bt_kzone tp bt_options" id="bt_options" tip="Options" onClick="backstore_control('options')"></div>
            
        </div>

        <div class="nav" id="nav_user"><!-- NOTIFICATION AND USER AREA BOTTOM/LEFT -->
        	
            <div class="t03 bt bt_bottom bt_bottom_frame tp" id="bt_mess" onClick="backstore_control('mess')" tip="Messages">
            	<p class="notif_text" id="notif_text_mess"></p>
            	<div class="bt bt_bottom bt_bottom_notif" id="bt_notif_mess"></div>
            </div>
            <div class="t03 bt bt_bottom bt_bottom_frame tp" id="bt_notif" onClick="backstore_control('notif')" tip="Notifications">
            	<p class="notif_text" id="notif_text_notif"></p>
            	<div class="bt bt_bottom bt_bottom_notif" id="bt_notif_notif"></div>
            </div>
            <div class="bt_cluster">
            	<div class="t03 bt bt_bottom tp" id="bt_user" style="background-image:url(<?php echo $urlPhotoProfile; ?>)" onClick="backstore_control('user')" tip="<?php echo $userName; ?>"></div>
                <div class="bt_status bt_status_left s_online"></div>
            </div>
            
        </div>
        
        <div id="struc_notif"><!-- NOTIFICATIONS -->
        
            <div onclick="backstore_control('notifsize')" id="notif_size" class="notif notif_alert" style="display: block;">
            	<div class="t02 view_img view_notif n_size" style="background-color:#444"></div>
                <p class="t01 view_text view_text_1 view_text_notif">Feeling cramped!</p>
                <p class="t01 view_text view_text_2">Increase your browser size or zoom out.</p>
            </div>
        
            <div onClick="nav_control('manage')" id="notif_manage" class="notif notif_alert">
            	<div class="t02 view_img view_notif n_manage" style="background-color:#444"></div>
                <p class="t01 view_text view_text_1 view_text_notif notif_single">Manage</p>
            </div>
    
    	</div>
        
    </div>
    
    <div class="struc_sides" id="struc_right"><!-- RIGHT SIDE -->
    
        <div class="nav nav_right" id="nav_time" onClick="backstore_control('toolbox');$('#toolbox_note').focus();"><!-- TIME AND EMERGENCY TOP/RIGHT -->
        
        	<div class="t02 nav_time" id="time_date"></div>
            <div class="t02 nav_time" id="time_time">
            	<span id="hours"></span>:<span id="min"></span> <span id="mm"></span>
            </div>
            <div class="t02 icons nav_time" id="time_remind"></div>
        
        </div>
        
        <div class="nav nav_right" id="nav_chat"><!-- CHAT BOTTOM/RIGHT -->
        	<div id="chat_wrapper">
            	
                <div onClick="chat_list()" class="t03 bt m_more_h" id="chat_more"></div>
            	
                <div class="bt_cluster chat chat_8" id="TESTIDchl">
                    <div class="bt_status bt_status_right s_offline"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDchl')" 
                        style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chloe.jpg)" tip="Chloé King"></div>
                </div>
                <div class="bt_cluster chat chat_7" id="TESTIDjos">
                    <div class="bt_status bt_status_right s_busy"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDjos')" 
                        style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josi.jpg)" tip="Josianne Grondin"></div>
                </div>
                <div class="bt_cluster chat chat_6" id="TESTIDcat">
                    <div class="bt_status bt_status_right s_online"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDcat')"
                        style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/cath.jpg)" tip="Catherine Francoeur"></div>
                </div>
                <div class="bt_cluster chat chat_5" id="TESTIDkev">
                    <div class="bt_status bt_status_right s_offline"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDkev')" 
                        style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/kev.jpg)" tip="Kevin Bérard"></div>
                </div>
                <div class="bt_cluster chat chat_4" id="TESTIDchr">
                    <div class="bt_status bt_status_right s_away"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDchr')" 
                        style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chris.jpg)" tip="Christophe Scott"></div>
                </div>
                <div class="bt_cluster chat chat_3" id="TESTIDfad">
                    <div class="bt_status bt_status_right s_online"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDfad')" 
                        style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/fadi.jpg)" tip="Fadi Atallah"></div>
                </div>
                <div class="bt_cluster chat chat_2" id="TESTIDjoe">
                    <div class="bt_status bt_status_right s_busy"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDjoe')" 
                        style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josee.jpg)" tip="Josephine Machalani"></div>
                </div>
                <div class="bt_cluster chat chat_1" id="kzchat">
                    <div class="bt_status bt_status_right s_dark"></div>
                    <div class="t03 bt bt_bottom chat_icon kz_color_bkg tp" onClick="chat_control('kzchat')" 
                        tip="Square Chat"></div>
                </div>
                
            </div>
            <div onClick="chat_list()" class="t03 bt bt_bottom chat_icon tp" id="bt_chat_main" tip="Chat"></div>
            
        </div>
        
    </div>


    <div class="trans struc_content_kzone" id="struc_content">
        
     	<div id="ebar">
        
        	<div id="ebar_undo" class="t015 km ebr ebari ebari_undo" tip="Undo"></div>
            <div id="ebar_redo" class="t015 km ebr ebari ebari_redo" tip="Redo"></div>
            
            <div onClick="ebr_drop('style');" current="paragraph" id="ebar_style" class="t015 ebr2 dropsafe ebar_box ebar_style kz_color_brd">
            	<p class="ebar_title ebar_title_style">Paragraph</p>
            </div>
            <div onClick="ebr_drop('font');" current="cabin" id="ebar_font" class="t015 ebr2 dropsafe ebar_box ebar_font kz_color_brd">
            	<p class="ebar_title ebar_title_font">Cabin</p>
            </div>
            <div onClick="ebr_drop('size');" current="12" id="ebar_size" class="t015 ebr2 dropsafe ebar_box ebar_size kz_color_brd">
            	<p class="ebar_title ebar_title_size">12</p>
            </div>
            
            <div id="ebar_bold" class="t015 km ebr ebari ebari_bold" tip="Bold"></div>
            <div id="ebar_italic" class="t015 km ebr ebari ebari_italic" tip="Italic"></div>
            <div id="ebar_underline" class="t015 km ebr ebari ebari_underline" tip="Underline"></div>
            
            <div id="ebar_highlight" current="h_yellow" class="t015 ebr2 ebari_hi ebari_highlight h_yellow"></div>
            <div onClick="ebr_drop('highlight');" id="ebar_highlights" class="t015 ebr2 dropsafe ebari_hi ebari_highlights h_yellow"></div>
            
            <div id="ebar_left" class="t015 km ebr ebari ebari_r1 ebari_left" tip="Align Left"></div>
            <div id="ebar_center" class="t015 km ebr ebari ebari_r1 ebari_center" tip="Center"></div>
            <div id="ebar_right" class="t015 km ebr ebari ebari_r1 ebari_right" tip="Align Right"></div>
            <div id="ebar_justify" class="t015 km ebr ebari ebari_r1 ebari_justify" tip="Justify"></div>
            
            
            	<div class="ebar_spacer1"></div>
                
            <div onClick="notif_create({type:'na'});" id="ebar_image" class="t015 km ebr ebari ebari_r2 ebari_image" tip="Image"></div>
            <div onClick="notif_create({type:'na'});" id="ebar_video" class="t015 km ebr ebari ebari_r2 ebari_video" tip="Video"></div>
            <div onClick="notif_create({type:'na'});" id="ebar_link" class="t015 km ebr ebari ebari_r2 ebari_link" tip="Link"></div>
            
            	<div class="ebar_spacer2"></div>
            
            <div id="ebar_untab" class="t015 km ebr ebari ebari_r1 ebari_untab" tip="Decrease Indent"></div>
            <div id="ebar_tab" class="t015 km ebr ebari ebari_r1 ebari_tab" tip="Increase Indent"></div>
            <div onClick="ebr_drop('linesp');" id="ebar_linesp" current="115" class="t015 km ebr ebari dropsafe ebari_r1 ebari_linesp" tip="Line Spacing"></div>
            <div onClick="notif_create({type:'na'});" id="ebar_spell" class="t015 km ebr ebari ebari_r1 ebari_spell" tip="Spellcheck"></div>
        	
        	<div onClick="backstore_control('more');" id="ebar_more" class="t02 bt m_more_v kz_color_bkg"></div>
        </div>
        
        <div id="ebr_style" class="ebr_drop ebr_style">
        	<div class="t015 ebr_dropl ebr_nrm paragraph ss_paragraph lockactive" onClick="ebr_title('style','paragraph')">Paragraph</div>
        	<div class="t015 ebr_dropl ebr_nrm title ss_title" onClick="ebr_title('style','title')">Title</div>
        	<div class="t015 ebr_dropl ebr_nrm subtitle ss_subtitle" onClick="ebr_title('style','subtitle')">Subtitle</div>
        	<div class="t015 ebr_dropl ebr_nrm heading1 ss_heading1" onClick="ebr_title('style','heading1')">Heading 1</div>
        	<div class="t015 ebr_dropl ebr_nrm heading2 ss_heading2" onClick="ebr_title('style','heading2')">Heading 2</div>
        	<div class="t015 ebr_dropl ebr_nrm heading3 ss_heading3" onClick="ebr_title('style','heading3')">Heading 3</div>
        	<div class="t015 ebr_dropl ebr_nrm note ss_note" onClick="ebr_title('style','note')">Note</div>
        </div>
        <div id="ebr_font" class="ebr_drop ebr_font">
        	<div class="t015 ebr_dropl ebr_nrm arial ss_arial" onClick="ebr_title('font','arial')">Arial</div>
        	<div class="t015 ebr_dropl ebr_nrm arialb ss_arialb" onClick="ebr_title('font','arialb')">Arial Black</div>
        	<div class="t015 ebr_dropl ebr_nrm cabin ss_cabin lockactive" onClick="ebr_title('font','cabin')">Cabin</div>
            <div class="t015 ebr_dropl ebr_nrm century ss_century" onClick="ebr_title('font','century')">Century</div>
            <div class="t015 ebr_dropl ebr_nrm couriern ss_couriern" onClick="ebr_title('font','couriern')">Courier New</div>
        	<div class="t015 ebr_dropl ebr_nrm georgia ss_georgia" onClick="ebr_title('font','georgia')">Georgia</div>
        	<div class="t015 ebr_dropl ebr_nrm helvetica ss_helvetica" onClick="ebr_title('font','helvetica')">Helvetica</div>
        	<div class="t015 ebr_dropl ebr_nrm impact ss_impact" onClick="ebr_title('font','impact')">Impact</div>
        	<div class="t015 ebr_dropl ebr_nrm lucida ss_lucida" onClick="ebr_title('font','lucida')">Lucida</div>
            <div class="t015 ebr_dropl ebr_nrm sketch ss_sketch" onClick="ebr_title('font','sketch')">Sketch</div>
        	<div class="t015 ebr_dropl ebr_nrm tahoma ss_tahoma" onClick="ebr_title('font','tahoma')">Tahoma</div>
        	<div class="t015 ebr_dropl ebr_nrm timesnr ss_timesnr" onClick="ebr_title('font','timesnr')">Times New R.</div>
        	<div class="t015 ebr_dropl ebr_nrm trebuchetms ss_trebuchetms" onClick="ebr_title('font','trebuchetms')">Trebuchet MS</div>
        	<div class="t015 ebr_dropl ebr_nrm verdana ss_verdana" onClick="ebr_title('font','verdana')">Verdana</div>
        </div>
        <div id="ebr_size" class="ebr_drop ebr_size">
        	<div class="t015 ebr_dropl ebr_nrm ss_8" onClick="ebr_title('size','8')">8</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_9" onClick="ebr_title('size','9')">9</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_10" onClick="ebr_title('size','10')">10</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_11" onClick="ebr_title('size','11')">11</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_12 lockactive" onClick="ebr_title('size','12')">12</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_14" onClick="ebr_title('size','14')">14</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_16" onClick="ebr_title('size','16')">16</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_18" onClick="ebr_title('size','18')">18</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_20" onClick="ebr_title('size','20')">20</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_22" onClick="ebr_title('size','22')">22</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_24" onClick="ebr_title('size','24')">24</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_26" onClick="ebr_title('size','26')">26</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_28" onClick="ebr_title('size','28')">28</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_36" onClick="ebr_title('size','36')">36</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_48" onClick="ebr_title('size','48')">48</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_72" onClick="ebr_title('size','72')">72</div>
        </div>
        <div id="ebr_highlight" class="ebr_drop ebr_highlight">
        	<div class="t015 ebr_dropl ebr_drop_hi h_yellow" onClick="ebr_title('highlight','h_yellow')"></div>
        	<div class="t015 ebr_dropl ebr_drop_hi h_orange" onClick="ebr_title('highlight','h_orange')"></div>
        	<div class="t015 ebr_dropl ebr_drop_hi h_green" onClick="ebr_title('highlight','h_green')"></div>
        	<div class="t015 ebr_dropl ebr_drop_hi h_blue" onClick="ebr_title('highlight','h_blue')"></div>
        	<div class="t015 ebr_dropl ebr_drop_hi h_purple" onClick="ebr_title('highlight','h_purple')"></div>
        	<div class="t015 ebr_dropl ebr_drop_hi h_pink" onClick="ebr_title('highlight','h_pink')"></div>
        	<div class="t015 ebr_dropl ebr_drop_hi h_gray" onClick="ebr_title('highlight','h_gray')"></div>
        	<div class="t015 ebr_dropl ebr_drop_hi h_white" onClick="ebr_title('highlight','h_white')"></div>
        </div>
        <div id="ebr_linesp" class="ebr_drop ebr_linesp">
        	<div class="t015 ebr_dropl ebr_nrm ss_1" onClick="ebr_title('linesp','1')">1</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_115 lockactive" onClick="ebr_title('linesp','115')">1.15</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_15" onClick="ebr_title('linesp','15')">1.5</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_2" onClick="ebr_title('linesp','2')">2</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_25" onClick="ebr_title('linesp','25')">2.5</div>
        	<div class="t015 ebr_dropl ebr_nrm ss_3" onClick="ebr_title('linesp','3')">3</div>
        </div>
        
        <div id="listing" class="nano">
        <div class="nano-content">
        
        	<div class="list list_first" k-page-index="1">
            	<div id="userself_lt" class="list_block kz_user2_brd kz_userself_brd kz_user2_img"></div>
                <div id="user1_lt" class="list_block kz_user1_brd kz_user1_img"></div>
                <div id="user3_lt" class="list_block kz_user3_brd kz_user3_img"></div>
            </div>
            
            	<div class="t015 list_mid"></div>
            
            <div class="list" k-page-index="2">
            	<div id="user5_lt" class="list_block kz_user5_brd kz_user5_img"></div>
            </div>
            
            	<div class="t015 list_mid"></div>
            
            <div class="list" k-page-index="3">
            </div>
            
            	<div class="t015 list_mid"></div>
            
            <div class="list" k-page-index="4">
            	<div id="user4_lt" class="list_block kz_user4_brd kz_user4_img"></div>
            </div>
            
            	<div class="t015 list_mid"></div>
            
            <div class="list" k-page-index="5">
            </div>
            
            <div class="list list_new">
            	<div class="t015 list_new_button"></div>
            </div>
        
        </div>
        </div>
        
        <div id="pages" class="nano">
        <div class="nano-content">
        
        	<div class="page page_letter_v" k-page-index="1" contenteditable="true">
            	<p class="demo_txt title" style="margin-bottom:17px;" spellcheck="false">Hello</p>
                <p class="demo_txt subtitle" style="margin-bottom:20px;" spellcheck="false">to the kolab KZone</p>
                <p class="demo_txt paragraph" style="line-height:175%;" spellcheck="false">This is the kolab KZone; the kollaboration environment of the platform. Every Square has it's own KZone where you can collaborate, communicate and perform on your project. This is not the real kolab Editor, only a little demonstration of the look and feel.</p>
            </div>
            <div class="page_safe safe_letter_v"></div>
            
            <div class="page page_letter_v" k-page-index="2">
            </div>
            <div class="page_safe safe_letter_v"></div>
            
            <div class="page page_letter_v" k-page-index="3">
            </div>
            <div class="page_safe safe_letter_v"></div>
            
            <div class="page page_letter_v" k-page-index="4">
            </div>
            <div class="page_safe safe_letter_v"></div>
            
            <div class="page page_letter_v" k-page-index="5">
            </div>
            <div class="page_safe safe_letter_v"></div>
        
        </div>
        </div>
    
        <div id="editor_info" class="kz_color_brd">
        	<div id="editor_number">237 words</div>
        
        </div>
        
    </div>
    
    <?php $this->renderPartial('//user/inc/_chat_kz'); ?>
    
</div>


<div id="side_safety"></div>

<div id="struc_bsdead"></div>

</body>
</html>

<?php
     }else{
     header("Location: ".Yii::app()->getBaseUrl(true));       
     }
