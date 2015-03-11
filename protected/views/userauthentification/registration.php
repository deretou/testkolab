<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$this->layout = "//layouts/kolabUserCreationLayout";
//print_r($model);

if($model){
   //  print_r($extradata);
    //echo '<br/>--------------------------------------------------------------------------------<br/>';
           
    ?>
<div id="wait" class="t02 wait_on"></div>

<div id="up"></div>   
<div id="map" class="t03"></div>

	<div id="all">

	<div id="container" class="t06">
    	
        <div class="pagesp" id="logo"></div>
        
        <div id="0" class="view">
        
        	<p class="main_title">Welcome</p>
            <p class="main_description">Great to have you on board chief! You'll kick some ass in no time.</p>
            
            <p class="main_description">There's two quick steps to create your account, it shouldn't take more than a few minutes to complete. The third step is optional and let's you connect your email to invite a few friends, teammates or just someone you want to work with.</p>
            
            <p class="main_description" style="color:#333;">If you want to accelerate the process, you can connect your <span style="color:#00ACED;">Twitter</span> or <span style="color:#395088;">Facebook</span> to fill in some fields and get that ready for future social integration.</p>
            
            <div class="space"></div>
            
            <div onClick="next()" class="t02 button">
                <p class="button_title">Next</p>
            </div>
            
            <div class="endspace"></div>
        
        </div>
        
        <div id="1" class="view">
        
            <p class="main_title">Step 1</p>
            <p class="main_description">Let's start by getting the basics for your new kolab account.</p>
            
            <div id="twitter" class="t02 iconblock" style="width:186px">
                <div class="t02 pagesp iconbutton" id="tw_button"></div>
                <p class="t02 icontitle">Create with Twitter</p>
            </div>
            <div id="facebook" class="t02 iconblock" style="width:206px">
                <div class="t02 pagesp iconbutton" id="fb_button"></div>
                <p class="t02 icontitle">Create with Facebook</p>
            </div>
            
            <div class="block pushnextbottom">
                <p class="title">First name</p>
                <input class="field" <?php if(isset($extradata) && isset($extradata->firstname)){echo 'value="'.$extradata->firstname.'"'; }?> id="firstn" type="text" />
            </div>
            
            <div class="block">
                <p class="title">Last name</p>
                <input class="field" <?php if(isset($extradata) && isset($extradata->lastname)){echo 'value="'.$extradata->lastname.'"'; }?> id="lastn" type="text" />
            </div>
            
            <div class="space"></div>
            
            <div class="block pushnextbottom">
                <p class="title">Username</p>
                <input class="field" <?php if(isset($extradata) && isset($extradata->username)){echo 'value="'.strtolower($extradata->username).'"'; }?> id="user" type="text" />
            </div>
            <script>
							$("#user").bind("keyup paste", function(){
                                                           if($(this).val().length>=2){
                                                                var str =$(this).val();
                                                               $(this).val(str.toLowerCase());     
                                                            }
                                                          });
						</script>
                
            <div class="block">
                <p class="title">Email</p>
                <input class="field" value="<?php echo $model->email;?>" id="email" type="email" readonly />
            </div>
            
            <div id="username" class="warning">
                <p class="warning_title">Invalid username</p>
                <p class="warning_description">Your username must be between 4 and 20 alphanumeric characters. No space, period or special characters.</p>
            </div>
            
            <div id="taken" class="warning alert">
                <p class="warning_title">Username taken</p>
                <p class="warning_description">Please choose another username.</p>
            </div>
            
            <div class="block pushnextbottom">
                <p class="title">Password</p>
                <input class="field" id="pass1" type="password" />
            </div>
            
            <div class="block">
                <p class="title">Password (again)</p>
                <input class="field" id="pass2" type="password" />
            </div>
            
            <div id="passmatch" class="warning">
                <p class="warning_title">Passwords do not match.</p>
                <p class="warning_description">Good thing we ask it twice! Be sure of the password you're writing!</p>
            </div>
            
            <div id="pass10000" class="warning">
                <p class="warning_title">Please choose another password.</p>
                <p class="warning_description">All right, here's the deal. The password you chose is in the 10,000 most used passwords in the world. That's a super simple list that all hackers know and can use so you do not want to use any of them!</p>
                <p class="warning_description">Make sure that you don't use something personal or about you.</p>
            </div>
            
             <div id="passsecurity" class="warning">
                <p class="warning_title">Your password is not secure enough.</p>
                <p class="warning_description">Your password must be a minimum of 8 characters including at least one capital letter and one number.</p>
                
                <p class="warning_description">Make sure that you don't use something personal or about you.</p>
            </div>
            
            <br />
            
            <div id="terms" class="block">
                <p class="title"><input id="termsbox" type="checkbox"> I have read and agree to the <a target="_blank" href="<?php echo Yii::app()->getBaseUrl(true);?>/userauthentification/kolabTerms">kolab Terms of service</a>.</p>
            </div>
            
            <br />
            
            <div id= "regisP1" class="t02 button">
                <p class="button_title">Next</p>
            </div>
            
            <div class="endspace"></div>
            
        </div>
        
        <div id="2" class="view">
        
        	<p class="main_title">Step 2</p>
            <p class="main_description">All right! Let's build your profile now.</p>

            <div class="block">
                <p class="title">Profile picture</p>
                
                <div id="picture" class="image-editor">
                    <input id="upload" type="file" class="cropit-image-input">
                    <div id="preview" class="cropit-image-preview"></div>
                    <input id="slider" type="range" class="cropit-image-zoom-input">
                    <p id="instructions">First upload your picture with the button above. Then, use the slider to scale your image and drag your picture in the left frame to adjust.</p>
                </div>                     
                                  
			</div>
            
            <div class="block">
            	<p class="title">I am a</p>
                <select id="usertype" name="type" class="field drop">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="artist">Artist</option>
                    <option value="professional">Professional</option>
                    <option value="home">Other</option>
                </select>
            </div>
            
            <div class="block">
                <p class="title">Write a little something about you (<span id="number"></span>)</p>
                <textarea class="field area" id="about"></textarea>
			</div>        
                
            <div class="block">
                <p class="title">City</p>
                <input class="field" id="location" type="text" placeholder=""/>
            </div>

            
            <div id= "regisP2" class="t02 button">
                <p class="button_title">Next</p>
            </div>
            
            <div class="endspace"></div>
        
        </div>
        
        <div id="3" class="view">
        
        	<p class="main_title">Step 3</p>
            <p class="main_description">This is optional, but you can invite some people to kolab.</p>
            
            <div  id="microsoft" class="t02 iconblock">
                <div class="t02 emailsp iconbutton" id="ms_button"></div>
                <p class="t02 icontitle">Invite from Microsoft (Hotmail, Live, Outlook.com)</p>
            </div>
            
            <div id="ms_list" class="email_list">
             <?php 
             if(isset($friendslist) && isset($friendslist['microsoft']) && count($friendslist['microsoft'])>0){
                 foreach ($friendslist['microsoft'] as $keym => $valuem) {
                     if(count($valuem)>0){
                      echo '<div class="email_letter">'. $keym.'</div>';   
                      foreach ($valuem as $valm) {
                         $mVal='<div class="email"><input class="email_check" type="checkbox" />';
                         if($valm['name']!=$valm['email']){
                          $mVal.='<p class="email_name">'.$valm['name'].' <span class="email_mail">'.$valm['email'].'</span></p></div>';      
                         }else{
                         $mVal.='<p class="email_name">  <span class="email_mail">'.$valm['email'].'</span></p></div>';       
                         }
                          
                          echo $mVal;
                      }
                      echo '<br />';
                     }
                     
                 }
             }
              ?>
            	<!--div class="email_letter">A</div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Albert Shum <span class="email_mail">alshum@microsoft.com</span></p>
                </div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Amélie Condor <span class="email_mail">acthis@hotmail.com</span></p>
                </div>
                
                <br />
            
            	<div class="email_letter">C</div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Camille Tremblay <span class="email_mail">camcam@live.com</span></p>
                </div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Charlie Hubert <span class="email_mail">charliehubert@hotmail.com</span></p>
                </div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Chloé King <span class="email_mail">chloe12@hotmail.com</span></p>
                </div>
                
                <br />
            
            	<div class="email_letter">D</div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Daniel Labarre <span class="email_mail">dan.labarre@live.com</span></p>
                </div>
                
                <br />
            
            	<div class="email_letter">R</div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Raphael Lemieux <span class="email_mail">raph_l@live.com</span></p>
                </div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Rael LeFou <span class="email_mail">lecrosseur@hotmail.com</span></p>
                </div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Robert Bobette <span class="email_mail">thebob@outlook.com</span></p>
                </div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Russell Torn <span class="email_mail">russty@outlook.com</span></p>
                </div>
                
                <br />
            
            	<div class="email_letter">T</div>
                
                <div class="email">
                    <input class="email_check" type="checkbox" />
                    <p class="email_name">Tamara Concorde <span class="email_mail">concorde800@hotmail.com</span></p>
                </div>
                
                <br /-->
            
            </div>
            
            <div  id="yahoo" class="t02 iconblock">
                <div class="t02 emailsp iconbutton" id="ya_button"></div>
                <p class="t02 icontitle">Invite from Yahoo! Mail</p>
            </div>
            
            <div id="ya_list" class="email_list">
               <?php 
             if(isset($friendslist) && isset($friendslist['yahoo']) && count($friendslist['yahoo'])>0){
                 foreach ($friendslist['yahoo'] as $keyy => $valuey) {
                     if(count($valuey)>0){
                      echo '<div class="email_letter">'. $keyy.'</div>';   
                      foreach ($valuey as $valy) {
                         $yVal='<div class="email"><input class="email_check" type="checkbox" />';
                         if($valy['name']!=$valy['email']){
                          $yVal.='<p class="email_name">'.$valy['name'].' <span class="email_mail">'.$valy['email'].'</span></p></div>';      
                         }else{
                           $yVal.='<p class="email_name">  <span class="email_mail">'.$valy['email'].'</span></p></div>';     
                         }
                          
                          echo $yVal;
                      }
                      echo '<br />';
                     }
                     
                 }
             }
              ?>
            </div>
            
            <div id="google" class="t02 iconblock">
                <div class="t02 emailsp iconbutton" id="gm_button"></div>
                <p class="t02 icontitle">Invite from Gmail</p>
            </div>
            
            <div id="gm_list" class="email_list">
             <?php 
             if(isset($friendslist) && isset($friendslist['gmail']) && count($friendslist['gmail'])>0){
                 foreach ($friendslist['gmail'] as $keyg => $valueg) {
                     if(count($valueg)>0){
                      echo '<div class="email_letter">'. $keyg.'</div>';   
                      foreach ($valueg as $valg) {
                         $gVal='<div class="email"><input class="email_check" type="checkbox" />';
                         if ($valg['name']!=$valg['email']) {
                          $gVal.='<p class="email_name">'.$valg['name'].' <span class="email_mail">'.$valg['email'].'</span></p></div>';      
                         }else{
                          $gVal.='<p class="email_name">  <span class="email_mail">'.$valg['email'].'</span></p></div>';    
                         }
                          
                          echo $gVal;
                      }
                      echo '<br />';
                     }
                     
                 }
             }
              ?>
            </div>
            
            <div onClick="email('gn')" id="generic" class="t02 iconblock">
                <div class="t02 emailsp iconbutton" id="gn_button"></div>
                <p class="t02 icontitle">Invite manually</p>
            </div>
            
            <div id="gn_list" class="email_list">
            <p class="title">Email 1</p>
            <input class="field" type="email" />
			<hr size="2px"/>
			<div id="emailPlus" style=" clear: both; float:right; cursor: pointer" ><img src="http://az735234.vo.msecnd.net/kolabnxfront/img/main/testPlus.png"></div>
            <!--p class="title">Email 2</p>
            <input class="field" type="email" />
            <p class="title">Email 3</p>
            <input class="field" type="email" />
            <p class="title">Email 4</p>
            <input class="field" type="email" />
            <p class="title">Email 5</p>
            <input class="field" type="email" />
            <p class="title">Email 6</p>
            <input class="field" type="email" />
            <p class="title">Email 7</p>
            <input class="field" type="email" />
            <p class="title">Email 8</p>
            <input class="field" type="email" />
            <p class="title">Email 9</p>
            <input class="field" type="email" />
            <p class="title">Email 10</p>
            <input class="field" type="email" />
            <p class="title">Email 11</p>
            <input class="field" type="email" />
            <p class="title">Email 12</p>
            <input class="field" type="email" />
            <p class="title">Email 13</p>
            <input class="field" type="email" />
            <p class="title">Email 14</p>
            <input class="field" type="email" />
            <p class="title">Email 15</p>
            <input class="field" type="email" />
            <p class="title">Email 16</p>
            <input class="field" type="email" />
            <p class="title">Email 17</p>
            <input class="field" type="email" />
            <p class="title">Email 18</p>
            <input class="field" type="email" />
            <p class="title">Email 19</p>
            <input class="field" type="email" />
            <p class="title">Email 20</p>
            <input class="field" type="email" />
            <p class="title">Email 21</p>
            <input class="field" type="email" />
            <p class="title">Email 22</p>
            <input class="field" type="email" />
            <p class="title">Email 23</p>
            <input class="field" type="email" />
            <p class="title">Email 24</p>
            <input class="field" type="email" />
            <p class="title">Email 25</p>
            <input class="field" type="email" /-->
            
            </div>

			<br />

            
            <div id= "regisP3" class="t02 button">
                <p class="button_title">Next</p>
            </div>
            
            <div class="endspace"></div>
        
        </div>
        
        <div id="4" class="view">
        
        	<p class="main_title">All done</p>
            <p class="main_description">Your account has been created!</p>
            
            <p class="main_description">You're ready to kick some serious ass now, just be sure that your team is also on kolab for your next teamwork. When you'll get in, you will have a quick video to explain the basics of the platform and how to get around. Remember chief; Collaborate, Communicate, Perform.</p>
            
            <p class="main_description" style="color:#333;">In case you didn't know, at this stage you will need an access code to get in kolab. You can check our announcements, your email or with other friends that have an account with kolab for a code. Codes are always given in a batch so nobody's getting in alone!</p>
            
            <div class="space"></div>
            
            <a href="<?php echo Yii::app()->getBaseUrl(true); ?>">
            <div class="t02 button">
                <p class="button_title">Back to login</p>
            </div>
            </a>
            
            <div class="endspace"></div>
        
        </div>
        
        <div class="space"></div>
        
    </div>
    
    </div>

<?php 
}else{
  header("Location: ".Yii::app()->getBaseUrl(true)); 
}
?>