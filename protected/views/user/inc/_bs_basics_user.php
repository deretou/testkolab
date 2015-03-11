<div class="struc_backstore bs_gray" id="bs_user"><!-- USER -->
    	
        <div class="bs_parts bs_header bs_parts_gray">
        	<p class="bs_title"><?php echo $userInfo->userName; ?></p>
            <div class="bs_subzone">
            	<p class="t02 bs_subtitle bs_subtitle_active" id="bs_user_1" 
                	onClick="backstore_selection('1')">You</p>
                <p class="t02 bs_subtitle bs_subtitle_not" id="bs_user_2" 
                	onClick="backstore_selection('2')">About</p>
            </div>
        </div>
        
        <div class="bs_parts bs_content">
        
        	<div class="view nano" id="view_user_1"><!-- VIEW------------------------------ -->
                <div class="nano-content">
            		<p class="view_title">Activity</p>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','picture');">
                            <div class="t02 view_img" style="background-image:url(<?php echo $userInfo->urlPhotoProfile; ?>)"></div>
                            <p class="t01 view_text view_text_1">Picture</p>
                            <p class="t01 view_text view_text_2">Change your profile picture in kolab</p>
                             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=picture'), 
                               array('update' => '#user_bs_info_picture'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','status');">
                            <div class="t02 view_img view_bsnav b_chat s_online"></div>
                            <p class="t01 view_text view_text_1">Status</p>
                            <p class="t01 view_text view_text_2">Change your availability status</p>
                             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=status'), 
                               array('update' => '#user_bs_info_status'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="user_shout();">
                            <div class="t02 view_img view_bsnav b_status" style="background-color:#FF0063"></div>
                            <p class="t01 view_text view_text_1">Shout</p>
                            <p class="t01 view_text view_text_2">Say a little something</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','balance');">
                            <div class="t02 view_img view_img_sq"><p class="view_img_2l">35</p></div>
                            <p class="t01 view_text view_text_1">Balance</p>
                            <p class="t01 view_text view_text_2">Currently used active Squares</p>
                            <?php  echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=balance'), 
                               array('update' => '#user_bs_info_balance'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <p class="view_title">Account</p>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','profile');">
                            <div class="t02 view_img view_bsnav b_info"></div>
                            <p class="t01 view_text view_text_1">Profile</p>
                            <p class="t01 view_text view_text_2">Change your profile information</p>
                             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=profile'), 
                               array('update' => '#user_bs_info_profile'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','email');">
                            <div class="t02 view_img view_bsnav b_email"></div>
                            <p class="t01 view_text view_text_1">Email</p>
                            <p class="t01 view_text view_text_2">Change your email and settings</p>
                             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=email'), 
                               array('update' => '#user_bs_info_email'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','password');">
                            <div class="t02 view_img view_bsnav b_password"></div>
                            <p class="t01 view_text view_text_1">Password</p>
                            <p class="t01 view_text view_text_2">Change your kolab connexion password</p>
                             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=password'), 
                               array('update' => '#user_bs_info_password'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','security');">
                            <div class="t02 view_img view_bsnav b_security"></div>
                            <p class="t01 view_text view_text_1">Security</p>
                            <p class="t01 view_text view_text_2">Change your security settings</p>
                             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=security'), 
                               array('update' => '#user_bs_info_security'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','privacy');">
                            <div class="t02 view_img view_bsnav b_user"></div>
                            <p class="t01 view_text view_text_1">Privacy</p>
                            <p class="t01 view_text view_text_2">Change your privacy settings</p>
                            <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=privacy'), 
                               array('update' => '#user_bs_info_privacy'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','customize');">
                            <div class="t02 view_img view_bsnav b_theme"></div>
                            <p class="t01 view_text view_text_1">Customize</p>
                            <p class="t01 view_text view_text_2">Change the appearance of kolab</p>
                            <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=customize'), 
                               array('update' => '#user_bs_info_customize'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="$(document).trigger('userbackstoreselectionb','language');">
                            <div class="t02 view_img"><p class="view_img_2l">EN</p></div>
                            <p class="t01 view_text view_text_1">Language</p>
                            <p class="t01 view_text view_text_2">Change the main language of kolab</p>
                             <?php echo CHtml::ajaxButton (null,
                              CController::createUrl(Yii::app()->request->baseUrl.'/user/userbsInformation?id=language'), 
                               array('update' => '#user_bs_info_language'), 
                               array('class' => 'bt_yiiajax_bs','type' => 'hidden'));
                             ?>
                        </div>
                    </div>
                    <!--<div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_help"></div>
                            <p class="t01 view_text view_text_1">Help & Support</p>
                            <p class="t01 view_text view_text_2">Don't worry, we'll help you!</p>
                        </div>
                    </div>-->
                    <div class="view_box" id="user_logout">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_signout" style="background-color:#C00;"></div>
                            <p class="t01 view_text view_text_1">Disconnect</p>
                            <p class="t01 view_text view_text_2">Sign out of kolab</p>
                        </div>
                    </div>
                    <div class="view_end"></div>
                </div>
            </div>
            
            <div class="view nano" id="view_user_1B"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                
                    <?php // $this->renderPartial('//user/inc/_bs_basics_user_picture'); ?>
                    <?php //$this->renderPartial('//user/inc/_bs_basics_user_status'); ?> <!-- REMOVE THE BACKSTORE ACTION CHECKMARK/DONE BUTTON WITH USER STATUS -->
		    <?php //$this->renderPartial('//user/inc/_bs_basics_user_balance'); ?> <!-- REMOVE THE BACKSTORE ACTION CHECKMARK/DONE BUTTON WITH USER STATUS -->
                    <?php //$this->renderPartial('//user/inc/_bs_basics_user_profile'); ?>
                    <?php //$this->renderPartial('//user/inc/_bs_basics_user_email'); ?>
                    <?php //$this->renderPartial('//user/inc/_bs_basics_user_password'); ?>
                    <?php //$this->renderPartial('//user/inc/_bs_basics_user_security'); ?>
                    <?php //$this->renderPartial('//user/inc/_bs_basics_user_privacy'); ?>
                    <?php //$this->renderPartial('//user/inc/_bs_basics_user_customize'); ?>
                    <?php //$this->renderPartial('//user/inc/_bs_basics_user_language'); ?>
                    <div id="user_bs_info_picture" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                       <div id="user_bs_info_status" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                       <div id="user_bs_info_balance" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                      <div id="user_bs_info_profile" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                       <div id="user_bs_info_email" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                       <div id="user_bs_info_password" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                       <div id="user_bs_info_security" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                       <div id="user_bs_info_privacy" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                       <div id="user_bs_info_customize" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                       <div id="user_bs_info_language" class="bkd_helper_user_bs_b">
                      <?php $this->renderPartial('//user/userbsInformation', array('id'=>null)); ?>
                       </div>
                    
                    
                    
                    
                    <div class="view_end"></div>
                </div>
            </div>
            
            <div class="view nano" id="view_user_2"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    <p class="view_title">k(pre-Alison)</p>
                    
                    <p class="view_line">0.0.9.0</p>
                    
                    	<span class="view_bigspace"></span>
                        
                    <p class="view_title">The Project</p>
                    
                    <p class="view_line">kolab is a social collaboration platform for students, artists and professionals. Easily work in teams in our real-time editor, video chat with your teamates, stay up-to-date at all time and keep track of reviews.</p>
                    
                    <p class="view_line">You are on the kolab(Alison) beta. The platform will be heavily updated since it is still in development. Always check for announcements, messages and social networks for important information. Remember, your feedback is shaping up this project!</p>
                    
                    <p class="view_title">Information</p>
                    <div class="view_box">
                        <div class="view_block" onClick="backstore_control('news')">
                            <div class="t02 view_img view_bsnav b_kolab" style="background-color:#FF0063;"></div>
                            <p class="t01 view_text view_text_1">Latest News</p>
                            <p class="t01 view_text view_text_2">Get platform updates and news</p>
                        </div>
                    </div>
                    	
                        
                    <p class="view_title">The Team</p>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/jay_team.jpg)"></div>
                            <p class="t01 view_text view_text_1">Jay Machalani</p>
                            <p class="t01 view_text view_text_2">CEO, UX/UI Architect</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/fode_team.jpg)"></div>
                            <p class="t01 view_text view_text_1">Fodé Touré</p>
                            <p class="t01 view_text view_text_2">Lead Engineer</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/brandon_team.jpg)"></div>
                            <p class="t01 view_text view_text_1">Brandon Wong</p>
                            <p class="t01 view_text view_text_2">Software Engineer</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/john_team.jpg)"></div>
                            <p class="t01 view_text view_text_1">Gabriel "John" Santerre</p>
                            <p class="t01 view_text view_text_2">Software Engineer</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/nadine_team.jpg)"></div>
                            <p class="t01 view_text view_text_1">Nadine Atallah</p>
                            <p class="t01 view_text view_text_2">Administration</p>
                        </div>
                    </div>
                    <p class="view_title">Reach us</p>
                    <a href="http://facebook.com/kolab" target="_blank">
                        <div class="view_box">
                            <div class="view_block">
                                <div class="t02 view_img view_bsnav b_facebook"></div>
                                <p class="t01 view_text view_text_1 view_text_1s">Facebook</p>
                            </div>
                        </div>
                    </a>
                    <a href="http://twitter.com/thekolabbird" target="_blank">
                        <div class="view_box">
                            <div class="view_block">
                                <div class="t02 view_img view_bsnav b_twitter"></div>
                                <p class="t01 view_text view_text_1 view_text_1s">Twitter</p>
                            </div>
                        </div>
                    </a>
                    <a href="http://reddit.com/r/kolabonreddit" target="_blank">
                        <div class="view_box">
                            <div class="view_block">
                                <div class="t02 view_img view_bsnav b_reddit"></div>
                                <p class="t01 view_text view_text_1 view_text_1s">Reddit</p>
                            </div>
                        </div>
                    </a>
                    <div class="view_end"></div>
                </div>
            </div>
        
        </div>        
        
        <!--<div class="view nano" id="view_user_2"><!-- VIEW------------------------------
                <div class="nano-content">
                    <p class="view_title">Navigation</p>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_kolab"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">General</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_desk"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Desk</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_locker"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Locker</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_kalendar"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Kalendar</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_notes"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Notes</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_grades"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Grades</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_user"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Social</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_search"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Search</p>
                        </div>
                    </div>
                    <p class="view_title">Communications</p>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_messages"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Messages</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_notifs"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Notifications</p>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_chat"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Chat</p>
                        </div>
                    </div>
                    
                    <div class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img view_bsnav b_time"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Time & Zones</p>
                        </div>
                    </div>
                    <div class="view_end"></div>
                </div>
            </div>
        
        </div>-->
        
        <div class="bs_parts bs_footer bs_parts_gray">
        
        	<div class="action" id="action_user_1">
            	<div onClick="action_back('user')" class="t02 action_bt a_back"></div>
            	<!--<div class="t02 action_bt a_kolab a_tp" tip="About"></div>-->
            </div>
            <div class="action" id="action_user_1B">
            	<div onClick="action_back('user')" class="t02 action_bt a_back"></div>
            	<div  class="t02 action_bt a_done a_tp" tip="Done"></div>
            </div>
            <div class="action" id="action_user_2">
            	<div onClick="action_back('user')" class="t02 action_bt a_back"></div>
            </div>
        
        </div>
    </div>