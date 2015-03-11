<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$this->layout = "//layouts/resetpassLayout";
?>

	<div id="container" class="t06">
    	
        <div class="pagesp" id="logo"></div>
        
        <div id="0" class="view">
        
            <p class="main_title">Reset password</p>
            <p class="main_description">Make sure you'll remember that one!</p>
            
            <div class="block pushnextbottom">
                <p class="title">New password</p>
                <input class="field" id="pass1" type="password" />
            </div>
            
            <div class="block">
                <p class="title">New Password (again)</p>
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
            
            <div class="t02 button" id="passresetmanage">
                <p class="button_title">Done</p>
            </div>
        
        </div>
        
        <div id="space"></div>
    
    </div>
  

