<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$this->layout = "//layouts/loginLayout";
?>

	<div class="block" id="bl_login">
    
    <div id="emergency" class="dnone">
    	<p id="emergency_message"></p>
    </div>
        
    	<div id="panel">
            <div id="login">
                <div class="pagesp" id="login_logo"></div>
                
                <div id="login_code_view" class="dnone">
                    <p class="login_title">Beta access code</p>
                    <input class="field mousetrap" id="code" type="text" />
                    <div id="login_code" class="t03 front_button button_anim"><!-- REMOVE ONCLICK, CHECK LOGIN_GO() FOR TRANSITION ANIMATION WHEN LOGING. MUST BE SERVER SIDE JAVASCRIPT CALL -->
                         <p class="but_title cr_name">Activate your account</p>
                    </div>
                </div>
                
                <div id="login_reset_view" class="dnone">
                    
                    <div id="reset">
                        <p id="reset_title_1" class="login_title">by Username</p>
                        <input class="field fsmall mousetrap" id="reset_user" type="text" />
                        <div  id="reset_user_button" class="t02 go">
                            <p class="but_title go_name" id="reset_user_go">Reset</p>                  
                        </div>
                        <p id="reset_title_2" class="login_title">by Email</p>
                        <input class="field fsmall mousetrap" id="reset_email" type="text" />
                        <div  id="reset_email_button" class="t02 go">
                            <p class="but_title go_name" id="reset_email_go">Reset</p>                  
                        </div>
                    </div>

                    <div onClick="login_reset()" id="login_back" class="t03 front_button button_anim">
                         <p class="but_title cr_name" id="reset_text_1">Back to login</p>
                         <p class="but_title cr_name dnone" id="reset_text_2">Reset email sent</p>
                    </div>
            
                </div>
                
    			<div id="login_main_view">
                
                	<div id="login_view" class="dnone">
                
                        <p class="login_title">Username or Email</p>
                        <input class="field mousetrap" id="user" type="text" />
                        <p class="login_title">Password</p>
                        <input class="field fsmall mousetrap" id="pass" type="password" />
                        <div  id="go" class="t02 go"><!-- REMOVE ONCLICK, CHECK LOGIN_GO() FOR TRANSITION ANIMATION WHEN LOGING. MUST BE SERVER SIDE JAVASCRIPT CALL -->
                            <p class="but_title go_name" id="go_name">Sign In</p>                  
                        </div>
                        
                        <div class="front_button more dnone" id="try">
                            <p onClick="begink()" id="tryagain" class="but_title cr_name">Try again in 10 minutes</p>
                        </div>
                        
                        <div onClick="login_check()" id="check_sub" class="login_sub">
                            <div id="check" class="pagesp check check_sub"></div>
                            <p id="check_title" class="login_title_sub">Keep me logged in</p>
                        </div>
                        <div onClick="login_reset()" id="pass_sub" class="login_sub">
                            <div class="pagesp pass_sub"></div>
                            <p class="login_title_sub">Forgot my password</p>
                        </div>
                        
                    </div>

                    <div id="login_new" class="t03 front_button button_anim dnone">
                    
                         <p onClick="loginnew_click()" id="first" class="but_title cr_name">Create an account</p>
                         <p id="second" class="but_title cr_name dnone">Confirmation email sent</p>
                         <p id="third" class="but_title cr_name dnone">Confirmation email resent</p>
                         <p id="forth" class="but_title cr_name dnone">Already have an account</p>
                         
                         <input class="field mousetrap" id="email" placeholder="Enter your email address" type="text" />
                         <input class="field" id="data" placeholder="Enter here" style="margin-top:300px;" type="text" />
                         <div  id="create" class="t02"><!-- REMOVE ONCLICK, USE LOGINNEW_GO() IF EMAIL SENT, LOGINNEW_EXISTS() IF USER ALREADY IN DATABASE AND LOGINNEW_RESEND() IF CONFIRMATION IS PENDING. MUST BE SERVER SIDE JAVASCRIPT CALL -->
                            <p class="but_title" id="create_name">Go</p>
                         </div>
                    </div>
            	</div>
                
                <div id="get_view" class="dnone">
                	<p id="get1" class="login_title">As of now, kolab requires the Google Chrome browser on a computer to function properly.</p>
                    <p class="login_title">Chrome is a really fast, beautiful and simple internet browser for Windows, Mac and Linux; it will even transfer everything for you! You can get it for free from Google.</p>
                    <a target="_blank" href="http://google.com/chrome"><div id="chrome" class="t03 front_button button_anim">
                    	<p class="but_title cr_name">Get Google Chrome</p>
                    </div></a>
                </div>
    
            </div>
            
            <div class="front_button more dnone" id="more">
                 <p onClick="begink()" class="but_title cr_name">Learn more</p>
            </div>
            
        </div>
    
    	<div id="mainimg" class="splash"></div>
        
    </div>

    <div class="block" id="bl_info">
    
    	<style>
			video#bkgv {
				position:absolute; right:0; bottom:0;
				min-width:100%; min-height:100%;
				width:auto; height:auto; z-index:0;
				background-size:cover; opacity:0.15;
				background-color:#A5A5A5;
			}
		</style>
    
    	<video autoplay loop id="bkgv">
        	<source src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/img/page/1280.webm" type="video/webm">
            <source src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/img/page/1280.mp4" type="video/mp4">
        </video>

		<!--<div class="front_button backtop">
        	<p onClick="topk()" class="but_title cr_name backtop_text">Back to top</p>
        </div>-->

		<div id="slogan">
            <h1>Collaborate</h1>
            <h1>Communicate</h1>
            <h1>Perform.</h1>
            
            <p class="login_exp date">Preview beta available in January 2015.</p>
            
            <p class="login_exp">kolab is a social collaboration platform for students, artists and professionals. Easily work in teams in our real-time editor, video chat with your teammates, stay up-to-date at all time and be organized with our Binders and Squares.</p>
            
            <p class="login_exp">We are still actively developing kolab, but we are slowly opening the platform for users to try. You can <a class="create_exp" onClick="createacc()">create your account</a> right now to be on the waiting list. Invite your team so you can all get in together and kick your work's ass!</p>
            
            <p class="login_exp"><a class="create_exp" onClick="topk()">Back to top</a></p>
        </div>    
        
        <div class="bottom">kolab © 2014 [preview beta] &nbsp;&nbsp;|&nbsp;&nbsp; Made in <div class="pagesp can"></div></div>
        
        <div id="social">
            <a target="_blank" href="http://facebook.com/gomagenta">
                <div class="t02 pagesp login_soc login_fb"></div>
            </a>
            <a target="_blank" href="http://twitter.com/gomagenta">
                <div class="t02 pagesp login_soc login_tw"></div>
            </a>
            <a target="_blank" href="http://youtube.com/kolabvideo">
                <div class="t02 pagesp login_soc login_yt"></div>
            </a>
            <a target="_blank" href="http://vimeo.com/kolabvideo">
                <div class="t02 pagesp login_soc login_vm"></div>
            </a>
        </div>

    </div>
