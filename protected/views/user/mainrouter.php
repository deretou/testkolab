<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$this->layout = "//layouts/kolabnxMainLayout";
?>
         
         <div id="main_social_bkd" class="bkd_main_content_helper">
        <?php $this->renderPartial('//user/social', array('id'=>null)); ?>
         </div>
        
        <div id="main_feedback_bkd" class="bkd_main_content_helper">
        <?php $this->renderPartial('//user/feedback', array('id'=>null)); ?>
         </div>
        
         <div id="main_help_bkd" class="bkd_main_content_helper">
        <?php $this->renderPartial('//user/help', array('id'=>null)); ?>
         </div>
        <div id="main_locker_bkd" class="bkd_main_content_helper">
        <?php 
         $currentUser= new UserManager();
         $currentUser->personalBinderCorrection();
         $this->renderPartial('//user/locker',array('model'=>$currentUser->getBindersList())); ?>
         </div>