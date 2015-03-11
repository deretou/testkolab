<?php 
 //copy('https://si0.twimg.com/profile_images/521057006/b.jpg',Yii::app()->basePath.'/data/'.'fode.jpg');
if (Yii::app()->user->isGuest || !isset(Yii::app()->session['userid'])){
  header("Location: ".Yii::app()->getBaseUrl(true));  
}

$model=User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']); 
if ($model) {

$userName=ucfirst($model->firstname).' '.ucfirst($model->lastname);
$userCity=$model->city;
 $traductor=new NXETraductor("en"); 
 $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
 $dateCre=$date->format('Y-m-d H:i:s');
 $userInfo=new stdClass();
$urlPhotoProfile=Yii::app()->getBaseUrl(true).'/kolabNXFront/img/page/default_94.jpg';
 if(isset($model->photoProfile) && !is_null($model->photoProfile)){
 $urlPhotoProfile=$model->photoProfile; 
 }
 $userInfo->urlPhotoProfile=$urlPhotoProfile;
 $userInfo->userName=ucfirst($model->firstname).' '.ucfirst($model->lastname);
 // $currentUser= new UserManager();
 
 
                   

 $safaty= new UserManager();
   $safeToken= $safaty->generate_token(23);
 
 //-----------------------------------------------
 
              /// print_r(gmmktime('2015-03-02 17:10:24'));
 if(Yii::app()->getController()->getAction()->controller->action->id==='main'){
           $c = new EMongoCriteria;
           $c->userID('==', Yii::app()->session[Yii::app()->session['userid'].'_user']);
           $userbinders = Binders::model()->findAll($c);
           if(count($userbinders)==0){
               header("Refresh:0");
           }
     } 
     
   
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Loading</title>

<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/plugins.css" />
<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/k.main_style.css" />
<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/k.specific_qg.css" />

<link rel="icon" type="image/x-icon" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/favicon.ico" />
<script type="text/javascript" > 

        var http_base='<?php echo Yii::app()->getBaseUrl(true); ?>';        
        var controleur='<?php echo Yii::app()->getController()->getAction()->controller->id; ?>';
        var controleurView='<?php echo Yii::app()->getController()->getAction()->controller->action->id; ?>';
         if(controleurView==='main'){  
         var binders=parseInt(<?php echo count($userbinders); ?>);//Supprime le de k.specific_qg
          }
	var user_fullname="<?php echo $userName; ?>"; //USED FOR DEMO PURPOSES AS FRONT-END HAVE NO BACK-END
        var user_picture="<?php echo $urlPhotoProfile; ?>"; //USED FOR DEMO PURPOSES AS FRONT-END HAVE NO BACK-END
        var user_id="<?php echo Yii::app()->session['userid']; ?>"; //USED FOR DEMO PURPOSES AS FRONT-END HAVE NO BACK-END 
        var user_city="<?php echo $userCity; ?>"; //USED FOR DEMO PURPOSES AS FRONT-END HAVE NO BACK-END 
        var social = {}; 
        var special_post = {}; 
        var whatShappening=0;
        </script>

<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-2.1.1.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-ui.custom.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/plugins.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>

<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/magic/TweenMax.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/magic/jquery.gsap.min.js"></script>

<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/k.main_engine.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/k.specific_qg.js"></script>
<script data-main="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/qg_nxeHelper" src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/require.js"></script>
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
          
           }, 2500);  
    });   
        </script>
<style>/* ALWAYS SPECIFY BINDER COLORS, use .b_IDOFBINDER_[...] */
/* Magie noir de Yii   */
    .bt_yiiajax_main{
            opacity:0;
            height: 0px;
            width: 0px;
           
        }
        
    .bt_yiiajax_bs{
            opacity:0;
            width:0px;
	    height:0px;
            /*cursor:pointer;*/
        }
        
    .bt_yiiajax_bs2{
        opacity:0;
        width:0px;
        height:0px;
        /*cursor:pointer;*/
    }   
/* Magie noir de Yii Fin  */
	<?php 
        if(Yii::app()->getController()->getAction()->controller->action->id==='main'){          
           if(count($userbinders)>0){
            foreach($userbinders as $bind) {              
                ?> 
    .b_<?php if(strtolower($bind->name)!='personal'){echo substr(strtolower($bind->name),0,3).$bind->binderID;}else{echo 'klb';} ?>_bkg{background-color:#<?php echo $bind->color; ?>}.b_<?php if(strtolower($bind->name)!='personal'){echo substr(strtolower($bind->name),0,3).$bind->binderID;}else{echo 'klb';} ?>_txt{color:#<?php echo $bind->color; ?>}.b_<?php if(strtolower($bind->name)!='personal'){echo substr(strtolower($bind->name),0,3).$bind->binderID;}else{echo 'klb';} ?>_brd{border-color:#<?php echo $bind->color; ?>}.give_<?php if(strtolower($bind->name)!='personal'){echo substr(strtolower($bind->name),0,3).$bind->binderID;}else{echo 'klb';} ?> .get{background-color:#<?php echo $bind->color; ?>}
            <?php                
            }
           }   
        }

        
        ?>

</style>

</head>

<body>

<div id="load"></div>

<!-- TO LOAD AS LONG AS THE WELCOME NOTIFICATION IS VISIBLE -->

<div class="struc_backstore" id="struc_backstore_2">
    <div class="bs_parts bs_header">
        <p class="bs_title" id="title_bs2">Design</p>
        <div class="bs_subzone">
            <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Binder</p>
        </div>
    </div>
    
    <div class="bs_parts bs_content bs2_content">
    
        <div class="view nano" id="view_bs2">
            <div class="nano-content"> <!-- DO NOT USE INCLUDE FILES FOR BS2, USE AS CONTENT REFERENCE ONLY -->
                
                <?php //include 'inc/bs2_locker_color'; ?>
                <?php $this->renderPartial('//user/inc/_bs2_locker_color')?>
                <!--
                <p class="bs_title" id="title_bs2">Color</p>
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Binder</p>
                -->
                
                <?php //include 'inc/bs2_locker_style.php'; ?>
                <?php $this->renderPartial('//user/inc/_bs2_locker_style')?>
                <!--
                <p class="bs_title" id="title_bs2">Design</p>
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Binder</p>
                -->
                
                <?php //include 'inc/bs2_basics_selectbinder.php'; ?>
                <!--
                <p class="bs_title" id="title_bs2">ACTION</p> (Add or Edit)
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Square</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Done"></div>
                -->
                
                <?php //include 'inc/bs2_basics_confirm.php' ?>
                <!--
                <p class="bs_title" id="title_bs2">ACTION</p> (Delete, Quit, Kick)
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">NAME</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Confirm"></div>
                -->
                
                <!--?php include 'inc/bs2_basics_newmess.php'; ?-->
                <?php $this->renderPartial('//user/inc/_bs2_basics_newmess')?>
                
                <?php $this->renderPartial('//user/inc/_bs2_basics_selectbinder')?>
                 <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/getBinderList'), 
                               array('update' => '#backend_helper_selectbinder'), 
                               array('class' => 'bt_yiiajax_bs2','type' => 'hidden'));
                        ?>
                <!--
                <p class="bs_title" id="title_bs2">ACTION</p> (New or Reply)
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Message</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Send"></div>
                -->
                
                <?php //include 'inc/bs2_basics_nreminder.php'; ?>
                <!--
                <p class="bs_title" id="title_bs2">Add</p>
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_bs2">Toolbox</p>
                
                <div onClick="action_done('bs2');" class="t02 action_bt a_done a_tp" tip="Done"></div>
                -->
            
                <div class="view_end"></div>
            </div>
        </div>
        
    </div>
    
    <div class="bs_parts bs_footer">
    
        <div class="action" id="action_bs2">
            <div onClick="action_back('bs2')" class="t02 action_bt a_back"></div>
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
<?php $this->renderPartial('//user/inc/_bs_basics_user', array('userInfo'=>$userInfo)); ?>  

<?php $this->renderPartial('//user/inc/_bs_locker_nbinder'); ?> 
<?php $this->renderPartial('//user/inc/_bs_locker_ebinder'); ?>  
<?php $this->renderPartial('//user/inc/_bs_locker_nsquare'); ?>
<?php $this->renderPartial('//user/inc/_bs_locker_esquare'); ?> 

<?php $this->renderPartial('//user/inc/_bs_feedback_npost'); ?> 

   
    
<?php $this->renderPartial('//user/inc/_chat_list'); ?>


<div id="shout">
	<div id="shout_wrapper">
    	<div id="shout_zone" contenteditable="false" initial="1"></div>
    </div>
    <div id="shout_done" onClick="user_shout_close(1);" class="t02 action_bt a_done"></div>
    <div id="shout_close" onClick="user_shout_close();" class="t02 action_bt a_delete"></div>
</div> <!-- MAKE SURE USERS CANT USE THE ENTER BUTTON OR ENTER IS DONE ACTION -->

<div id="safety"></div>
<div id="background" class=""></div>

<div id="splash_refresh" class="splash"></div>
<div id="splash_network" class="splash"></div>
<div id="splash_restricted" class="splash"></div>
    
<div id="struc_wrapper"><!-- MAIN WRAPPER -->

	<div class="trans struc_sides" id="struc_left"><!-- LEFT SIDE -->
    
        <div class="nav" id="nav_main"><!-- MAIN MENU TOP/LEFT -->
        	
            <div id="wait"></div>
            <div class="t03 bt bt_top bt_kolab tp" id="bt_kolab" tip="Desk" ></div>
            <div class="t03 bt bt_top bt_locker tp" id="bt_locker" tip="Locker"  ></div>             
            <!--<div class="t03 bt bt_top bt_kalendar tp" id="bt_kalendar" tip="Kalendar"></div>-->
            <!--<div class="t03 bt bt_top bt_notes tp" id="bt_notes" tip="Notes"></div>-->
            <!--<div class="t03 bt bt_top bt_grades tp" id="bt_grades" tip="Grades"></div>-->
            <div class="t03 bt bt_top tp bt_social" id="bt_social" tip="Social" ></div>
             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/social?id=updatesocial'), 
                               array('update' => '#main_social_bkd'), 
                               array('class' => 'bt_yiiajax_main','type' => 'hidden'));
                        ?>
            <div class="t03 bt bt_top tp bt_feedback" id="bt_feedback" tip="Feedback" ></div>
             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/feedback?id=updatehelp'), 
                               array('update' => '#main_feedback_bkd'), 
                               array('class' => 'bt_yiiajax_main','type' => 'hidden'));
                        ?>
            <div class="t03 bt bt_top tp bt_help" id="bt_help" tip="Help & Support" ></div>
             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/help?id=updatehelp'), 
                               array('update' => '#main_help_bkd'), 
                               array('class' => 'bt_yiiajax_main','type' => 'hidden'));
                        ?>
            <div onClick="search_control()" class="t03 bt bt_top tp bt_search search_default" id="bt_search" tip="Search"></div>
            
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
            	<div class="t03 bt bt_bottom tp" id="bt_user" style="background-image:url(<?php echo $urlPhotoProfile; ?>)" 
                	onClick="backstore_control('user')" tip="<?php echo $userName; ?>"></div>
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
            	
                <!--div class="bt_cluster chat chat_7" id="TESTIDchl">
                    <div class="bt_status bt_status_right s_offline"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDchl')" 
                        style="background-image:url(test/chloe.jpg)" tip="Chloé King"></div>
                </div>
                <div class="bt_cluster chat chat_6" id="TESTIDjos">
                    <div class="bt_status bt_status_right s_busy"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDjos')" 
                        style="background-image:url(test/josi.jpg)" tip="Josianne Grondin"></div>
                </div>
                <div class="bt_cluster chat chat_5" id="TESTIDcat">
                    <div class="bt_status bt_status_right s_online"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDcat')"
                        style="background-image:url(test/cath.jpg)" tip="Catherine Francoeur"></div>
                </div>
                <div class="bt_cluster chat chat_4" id="TESTIDkev">
                    <div class="bt_status bt_status_right s_offline"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDkev')" 
                        style="background-image:url(test/kev.jpg)" tip="Kevin Bérard"></div>
                </div>
                <div class="bt_cluster chat chat_3" id="TESTIDchr">
                    <div class="bt_status bt_status_right s_away"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDchr')" 
                        style="background-image:url(test/chris.jpg)" tip="Christophe Scott"></div>
                </div>
                <div class="bt_cluster chat chat_2" id="TESTIDfad">
                    <div class="bt_status bt_status_right s_online"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDfad')" 
                        style="background-image:url(test/fadi.jpg)" tip="Fadi Atallah"></div>
                </div>
                <div class="bt_cluster chat chat_1" id="TESTIDjoe">
                    <div class="bt_status bt_status_right s_busy"></div>
                    <div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control('TESTIDjoe')" 
                        style="background-image:url(test/josee.jpg)" tip="Josephine Machalani"></div>
                </div-->
                
            </div>
            <div onClick="chat_list()" class="t03 bt bt_bottom chat_icon tp" id="bt_chat_main" tip="Chat"></div>
            
        </div>
        
    </div>
    
	<div class="trans search" id="search">
    	<input class="chat_input mousetrap" id="search_input" />
    </div>
    
    <div class="trans search" id="search_box">
    	<div id="search_recent" class="search_content nano">
        	<div class="nano-content">
            
                <p class="view_title view_search_title">Recent</p>
                <!--div id="search_recent1" class="view_box search_box">
                    <div class="t02 view_img" style="background-image:url(test/micheal.jpg)"></div>
                    <p class="t01 view_text view_text_1 view_text_1ss">Micheal Archambault</p>
                </div>
                <div onClick="person_select('TESTIDcat');" id="search_recent2" class="view_box search_box">
                    <div class="t02 view_img" style="background-image:url(test/cath.jpg)"></div>
                    <p class="t01 view_text view_text_1 view_text_1ss">Catherine Francoeur</p>
                </div>
                <div id="search_recent3" class="view_box search_box">
                    <div class="t02 view_img view_notif n_newsq" style="background-color:#D93E3E"></div>
                    <p class="t01 view_text view_text_1 view_text_1ss">Essay on Newton</p>
                </div>
                <div id="search_recent4" class="view_box search_box">
                    <div class="t02 view_img view_notif n_newsq" style="background-color:#C926FF"></div>
                    <p class="t01 view_text view_text_1 view_text_1ss">Socrates texts analysis</p>
                </div>
                <div onClick="person_select('TESTIDcar');" id="search_recent5" class="view_box search_box">
                    <div class="t02 view_img" style="background-image:url(test/carl.jpg)"></div>
                    <p class="t01 view_text view_text_1 view_text_1ss">Carl Caron</p>
                </div-->
                
                
                <p class="view_search_end"></p>

        	</div>
        </div>    
        
        <div id="search_result" class="search_content nano">
            <div class="nano-content">
            
                <p class="view_title view_search_title">People</p>
                    <!--div onClick="person_select('TESTIDcar');" id="search_result1" class="view_box search_box search_first" onClick="search_control();">
                        <div class="t02 view_img" style="background-image:url(test/carl.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1ss">Carl Caron</p>
                    </div>
                    <div onClick="person_select('TESTIDcat');" id="search_result2" class="view_box search_box">
                        <div class="t02 view_img" style="background-image:url(test/cath.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1ss">Catherine Francoeur</p>
                    </div>
                    <div id="search_result2" class="view_box search_box">
                        <div class="t02 view_img" style="background-image:url(test/chris.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1ss">Christophe Scott</p>
                    </div-->
                
                <p class="view_title view_search_title">Squares</p>
                
                    <!--div id="search_result3" class="view_box search_box">
                        <div class="t02 view_img view_notif n_newsq" style="background-color:#D93E3E"></div>
                        <p class="t01 view_text view_text_1 view_text_1ss">Capitals of the World</p>
                    </div-->
                
                <span class="view_bigspace"></span><!-- TO ADD IF THERE IS PEOPLE OR SQUARES ON TOP -->
                
                <p class="view_title view_search_title">More</p>
                    <!--div id="search_result4" class="view_box search_box">
                        <div class="t02 view_img" style="background-image:url(test/c3po.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_ss">C-3PO de Robot</p>
                        <p class="t01 view_text view_text_2 view_text_ss">Teacher / Tatoine, Galactic Republic</p>
                    </div>
                    <div id="search_result5" class="view_box search_box">
                        <div class="t02 view_img" style="background-image:url(test/captain.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_ss">Captain America</p>
                        <p class="t01 view_text view_text_2 view_text_ss">Professional / Manhattan, USA</p>
                    </div>
                    <div id="search_result6" class="view_box search_box">
                        <div class="t02 view_img" style="background-image:url(test/cat.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_ss">Catwoman Miaw</p>
                        <p class="t01 view_text view_text_2 view_text_ss">Gotham, USA</p>
                    </div>
                    <div id="search_result7" class="view_box search_box">
                        <div class="t02 view_img" style="background-image:url(test/clark.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_ss">Clark Kent</p>
                        <p class="t01 view_text view_text_2 view_text_ss">Student / Minneapolis, USA</p>
                    </div-->
                
                <div class="t03 bt view_search_more"></div>
                
                
                <p class="view_search_end"></p>

            </div>	
        </div>
    </div>
    
    <div class="trans nav" id="nav_menu"><!-- ADAPTABLE MENU ZONE/USE -->
    
    	<?php $this->renderPartial('//user/inc/_locker_nav') ?>
        <?php $this->renderPartial('//user/inc/_social_nav') ?>
        <?php $this->renderPartial('//user/inc/_feedback_nav') ?>
        <?php $this->renderPartial('//user/inc/_help_nav') ?>
    
    </div>
    
    <?php $this->renderPartial('//user/inc/_locker_nav_list') ?>
    <?php //$this->renderPartial('//user/inc/_social_nav_list') ?>
    <?php $this->renderPartial('//user/inc/_feedback_nav_list') ?>
    <?php $this->renderPartial('//user/inc/_help_nav_list') ?>

	<div class="trans" id="struc_content_manage"></div>

    <div class="trans struc_content_main nano" id="struc_content">
    <div class="nano-content">
        
        <!-- ALL CONTENT STARTS HERE -->
         
        <?php  echo $content;  ?>  
      
        <?php //include '//user/inc/_locker' ?> 
        <?php //include '//user/inc/_social' ?>  
        <?php //include '//user/inc/_feedback' ?> 
        
        <?php //include '//user/inc/_help' ?>  
        
        <!-- ALL CONTENT ENDS HERE -->
        
    </div>
	</div>

	<?php $this->renderPartial('//user/inc/_chat'); ?>
    
</div>

<div id="side_safety"></div>
<div id="bottom_clearance"></div><!-- EXCEPT KZONE -->

<div id="struc_bsdead"></div>

</body>
</html>



<?php



            }else{
         header("Location: ".Yii::app()->getBaseUrl(true));     
            }

 
 
 //-----------------------------------------------
 
                  //print_r($conatct->contacts->contact);

