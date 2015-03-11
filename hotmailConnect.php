<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//***************************************MSN START********************************
$client_id = '0000000040106888';
$client_secret = 'KVbXCMoVXGLblQvnnpocjeBuFwg8iMPH';
$redirect_uri = 'http://nxefront.trafficmanager.net/hotmailContacts.php';
$urls_ = 'https://login.live.com/oauth20_authorize.srf?client_id='.$client_id.'&scope=wl.signin%20wl.basic%20wl.emails%20wl.contacts_emails&response_type=code&redirect_uri='.$redirect_uri;
$msn_link =  '<a href="'.$urls_.'" >MSN Contacts</a>';
echo $msn_link;
//***************************************MSN ENDS********************************


?>
