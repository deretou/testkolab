<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$this->layout = "//layouts/loginLayout";
//print_r($model);

if($model){
?>
       <div id="login">
        
        <div id="login_left">
               <p class="login_title"> Email</p>
                <input class="field" id="email2" type="text" value="<?php echo $model->email;?>" readonly />
                <p class="login_title">Password</p>
                <input class="field" id="pass" type="password" />
                 <p class="login_title">Username</p>
                <input class="field" id="user" type="text" />
                 <p class="login_title">Firstname</p>
                <input class="field" id="firstname" type="text" />
            
          </div>
            
            <div id="login_right">
            
                <p class="login_title">Lastname</p>
                <input class="field" id="lastname" type="text" />
                 <p class="login_title">Country</p>
                <input class="field" id="city" type="text" />                 
                <div id="go">
                    <p onClick="invitationNextStepManager();" class="but_title" id="go_name">Send</p>
                </div>
               
                
         
            </div>
        
        </div>


<?php 
}else{
  header("Location: ".Yii::app()->getBaseUrl(true));    
}
?>