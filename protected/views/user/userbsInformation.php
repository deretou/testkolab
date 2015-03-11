<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (isset($id) && !is_null($id)) {
   $model=User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']); 
   $modelSupp1=UserSocial::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']); 
    if($id=='picture'){
     $this->renderPartial('//user/inc/_bs_basics_user_picture');   
    }
    
    if($id=='status'){
     $this->renderPartial('//user/inc/_bs_basics_user_status');  //<!-- REMOVE THE BACKSTORE ACTION CHECKMARK/DONE BUTTON WITH USER STATUS -->
    }
    
    if($id=='balance'){
     $this->renderPartial('//user/inc/_bs_basics_user_balance');  //<!-- REMOVE THE BACKSTORE ACTION CHECKMARK/DONE BUTTON WITH USER STATUS -->
    }
    
    if($id=='profile'){
     $this->renderPartial('//user/inc/_bs_basics_user_profile', array('userInfo'=>$model,'userSocial'=>$modelSupp1)); 
    }
    
    if($id=='email'){
    $this->renderPartial('//user/inc/_bs_basics_user_email', array('userInfo'=>Yii::app()->session['useremail'])); 
    }
    
    if($id=='password'){
    $this->renderPartial('//user/inc/_bs_basics_user_password'); 
    }
    
    if($id=='security'){
    $this->renderPartial('//user/inc/_bs_basics_user_security');
    }
    
    if($id=='privacy'){
    $this->renderPartial('//user/inc/_bs_basics_user_privacy'); 
    }
    
    if($id=='customize'){
     $this->renderPartial('//user/inc/_bs_basics_user_customize'); 
    }
    
    if($id=='language'){
      $this->renderPartial('//user/inc/_bs_basics_user_language'); 
    }
    

   // echo '<script type="text/javascript" >console.log(\'pret\');  setTimeout(function(){$(document).trigger(\'displayuserbackstoreselectionb\',\''.$id.'\') },200); </script>';
}  else {
    echo ' Nada';
}

