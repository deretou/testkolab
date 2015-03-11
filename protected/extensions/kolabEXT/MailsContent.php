<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MailsContent
 *
 * @author NXE0002
 */
class MailsContent {
    //put your code here
     /*
  * Function : constructor
  */   
    public function __construct()
	{  
	}
        
        public function inviteFriendLink($link,$friendname) {
           $content='<!doctype html><html><head><meta charset="utf-8"><style>body{color:#333;font-size:15px;font-family:Tahoma,Verdana,Segoe,sans-serif}a:link{color:#333}a:visited{color:#333}a:hover{opacity:0.8}a:active{color:#333}.link1 a:link{color:#FFF;text-decoration:none}.link1 a:visited{color:#FFF}.link1 a:hover{opacity:1}.link1 a:active{color:#FFF}#frame{margin:20px}.logo{width:83px;height:25px;margin-top:16px;margin-bottom:6px}.link1{cursor:pointer;font-weight:700;background:#FF0063;padding:20px;padding-left:36px;padding-right:36px;color:#FFF;width:145px;text-align:center;margin-top:34px;margin-bottom:34px}.link1:hover{opacity:0.8}.link2{font-size:12px}.end{color:#AAA;font-size:12px}.end2{font-size:11px;margin-top:-2px;}.sig{width:26px;height:26px;margin-top:6px}</style>
                    </head><body><div id="frame">

                    <img class="logo" alt="kolab" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/logo.gif" />
                    <p>Good news chief: '.$friendname.' invite you on kolab!</p>
                    <p>Your presence is important for your friend\'s social, collaborative and educative community</p>
                    <p>Your email is verified so you can now create your kolab [preview beta] account. Just click on the button or copy the link below to complete your account.</p>
                    <p class="link1">'; 
          $content.='<a href="'.$link.'">Create my account</a></p>'; 
          $content.='<p class="link2"><a href="'.$link.'">'.$link.'</a></p>';  
          $content.='<p class="end">This is a confirmation email for the creation of a kolab account. If you did not do this, just ignore this email, no account has been created yet.</p>
                    <p class="end end2">kolab at <a href="http://gomagenta.com">gomagenta.com</a>. Collaborate, Communicate, Perform. Made in Canada.</p>
                    <a href="gomagenta.com"><img class="sig" alt="logo" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/sig.gif" /></a>

                    </div></body></html>'; 
      
          return $content ;
        } 
        
        
        public function accountCreationLink($link) {
           $content='<!doctype html><html><head><meta charset="utf-8"><style>body{color:#333;font-size:15px;font-family:Tahoma,Verdana,Segoe,sans-serif}a:link{color:#333}a:visited{color:#333}a:hover{opacity:0.8}a:active{color:#333}.link1 a:link{color:#FFF;text-decoration:none}.link1 a:visited{color:#FFF}.link1 a:hover{opacity:1}.link1 a:active{color:#FFF}#frame{margin:20px}.logo{width:83px;height:25px;margin-top:16px;margin-bottom:6px}.link1{cursor:pointer;font-weight:700;background:#FF0063;padding:20px;padding-left:36px;padding-right:36px;color:#FFF;width:145px;text-align:center;margin-top:34px;margin-bottom:34px}.link1:hover{opacity:0.8}.link2{font-size:12px}.end{color:#AAA;font-size:12px}.end2{font-size:11px;margin-top:-2px;}.sig{width:26px;height:26px;margin-top:6px}</style>
                    </head><body><div id="frame">

                    <img class="logo" alt="kolab" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/logo.gif" />
                    <p>Good news chief!</p>
                    <p>Your email is verified and ready.</p>
                    <p>You can now create your kolab [preview beta] account. Just click on the button or copy the link below to complete your account.</p>
                    <p class="link1">'; 
          $content.='<a href="'.$link.'">Create my account</a></p>'; 
          $content.='<p class="link2"><a href="'.$link.'">'.$link.'</a></p>';  
          $content.='<p class="end">This is a confirmation email for the creation of a kolab account. If you did not do this, just ignore this email, no account has been created yet.</p>
                    <p class="end end2">kolab at <a href="http://gomagenta.com">gomagenta.com</a>. Collaborate, Communicate, Perform. Made in Canada.</p>
                    <a href="gomagenta.com"><img class="sig" alt="logo" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/sig.gif" /></a>

                    </div></body></html>'; 
      
          return $content ;
        }   
        
        
        public function resetPassLink($link) {
            $content='<!doctype html><html><head><meta charset="utf-8"><style>body{color:#333;font-size:15px;font-family:Tahoma,Verdana,Segoe,sans-serif}a:link{color:#333}a:visited{color:#333}a:hover{opacity:0.8}a:active{color:#333}.link1 a:link{color:#FFF;text-decoration:none}.link1 a:visited{color:#FFF}.link1 a:hover{opacity:1}.link1 a:active{color:#FFF}#frame{margin:20px}.logo{width:83px;height:25px;margin-top:16px;margin-bottom:6px}.link1{cursor:pointer;font-weight:700;background:#FF0063;padding:20px;padding-left:36px;padding-right:36px;color:#FFF;width:145px;text-align:center;margin-top:34px;margin-bottom:34px}.link1:hover{opacity:0.8}.link2{font-size:12px}.end{color:#AAA;font-size:12px}.end2{font-size:11px;margin-top:-2px;}.sig{width:26px;height:26px;margin-top:6px}</style>
                        </head><body><div id="frame">

                        <img class="logo" alt="kolab" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/logo.gif" />
                        <p>Reset your password</p>
                        <p>You\'re all set to reset your password!</p>
                        <p>Just click on the button or copy the link below to reset your kolab account password.</p>';
            
              $content.='<p class="link1"><a href="'.$link.'">Reset my password</a></p>';
              $content.='<p class="link2"><a href="'.$link.'">'.$link.'</a></p>';
              $content.='<p class="end">This is a password reset email for the kolab account associated with this email address. If you did not do this, just ignore this email, no password will be reset.</p>
                        <p class="end end2">kolab at <a href="http://gomagenta.com">gomagenta.com</a>. Collaborate, Communicate, Perform. Made in Canada.</p>
                        <a href="gomagenta.com"><img class="sig" alt="logo" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/sig.gif" /></a>

                        </div></body></html>';
                                    
            return $content;
            
        }  
        
       public function securityMessage() {
           $content='<!doctype html><html><head><meta charset="utf-8"><style>body{color:#333;font-size:15px;font-family:Tahoma,Verdana,Segoe,sans-serif}a:link{color:#333}a:visited{color:#333}a:hover{opacity:0.8}a:active{color:#333}.link1 a:link{color:#FFF;text-decoration:none}.link1 a:visited{color:#FFF}.link1 a:hover{opacity:1}.link1 a:active{color:#FFF}#frame{margin:20px}.logo{width:83px;height:25px;margin-top:16px;margin-bottom:6px}.link1{cursor:pointer;font-weight:700;background:#FF0063;padding:20px;padding-left:36px;padding-right:36px;color:#FFF;width:145px;text-align:center;margin-top:34px;margin-bottom:34px}.link1:hover{opacity:0.8}.link2{font-size:12px}.end{color:#AAA;font-size:12px}.end2{font-size:11px;margin-top:-2px;}.sig{width:26px;height:26px;margin-top:6px}</style>
                    </head><body><div id="frame">

                    <img class="logo" alt="kolab" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/logo.gif" />
                    <p>Security alert</p>
                    <p>There have been more than 5 consecutive tries to get in your account. If that wasn\'t you, somebody is trying to get in!</p>
                    <p>Make sure that your password is something easy to remember, yet that is not possible to guess by someone who knows you. You can change your password by clicking on your bottom right avatar in kolab.</p>
                    <p>Remember, we will never ask you for a password by email.</p>
                    <p class="end">This is a security email about your kolab account. If you do not wish to receive these emails, you can change your subscription options in kolab.</p>
                    <p class="end end2">kolab at <a href="http://gomagenta.com">gomagenta.com</a>. Collaborate, Communicate, Perform. Made in Canada.</p>
                    <a href="gomagenta.com"><img class="sig" alt="logo" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/sig.gif" /></a>

                    </div></body></html>';
         
           return $content;            
       }
       
       public function welcomeMessage() {
           $link='#';
           $content='<!doctype html><html><head><meta charset="utf-8"><style>body{color:#333;font-size:15px;font-family:Tahoma,Verdana,Segoe,sans-serif}a:link{color:#333}a:visited{color:#333}a:hover{opacity:0.8}a:active{color:#333}.link1 a:link{color:#FFF;text-decoration:none}.link1 a:visited{color:#FFF}.link1 a:hover{opacity:1}.link1 a:active{color:#FFF}#frame{margin:20px}.logo{width:83px;height:25px;margin-top:16px;margin-bottom:6px}.link1{cursor:pointer;font-weight:700;background:#FF0063;padding:20px;padding-left:36px;padding-right:36px;color:#FFF;width:145px;text-align:center;margin-top:34px;margin-bottom:34px}.link1:hover{opacity:0.8}.link2{font-size:12px}.end{color:#AAA;font-size:12px}.end2{font-size:11px;margin-top:-2px;}.sig{width:26px;height:26px;margin-top:6px}</style>
                    </head><body><div id="frame">

                    <img class="logo" alt="kolab" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/logo.gif" />
                    <p>Welcome abord chief!</p>
                    <p>You\'re all good to go, all you need now is an access code.</p>
                    <p>We send access codes in batches by email so you can give one to each of your friends (or vise versa) so you to all get in together. The more friends register, the more chances of getting a batch of codes. You can also follow us on Twitter, Facebook and look for any kind of campaign we might throw!</p>
                    <p>In case you have a code or you want to be ready to hop in the platform right away when you do, you can get started below with some really quick video tutorials on how the platform works.</p>';
            
           $content.='<p class="link1"><a href="'.$link.'">Getting Started</a></p>';
           $content.='<p class="link2"><a href="'.$link.'">'.$link.'</a></p>';
           $content.='<p class="end">This is a confirmation email for the creation of a kolab account. If you did not do this, then somebody used your email to create a kolab account.</p>
                    <p class="end end2">kolab at <a href="http://gomagenta.com">gomagenta.com</a>. Collaborate, Communicate, Perform. Made in Canada.</p>
                    <a href="gomagenta.com"><img class="sig" alt="logo" src="'.Yii::app()->getBaseUrl(true).'/emailsmedia/sig.gif" /></a>

                    </div></body></html>';
           
          return  $content;
       }
}
