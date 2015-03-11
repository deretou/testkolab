<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$this->layout = "//layouts/emptyLayout";
$client_id = '0000000044135827';
$client_secret = 'VjsAdhDyZHL0LfhL0bhc9ysNmc-6N9b7';
$redirect_uri = Yii::app()->getBaseUrl(true).'/userauthentification/contactsMicrosoft';
$urls_ = 'https://login.live.com/oauth20_authorize.srf?client_id='.$client_id.'&scope=wl.signin%20wl.basic%20wl.emails%20wl.contacts_emails&response_type=code&redirect_uri='.$redirect_uri;
//$msn_link =  '<a href="'.$urls_.'" >MSN Contacts</a>';
?>

<script type="text/javascript">
   location.href="<?php echo $urls_ ?>";     
</script> 
