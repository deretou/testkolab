<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 //header("Location: ".Yii::app()->request->baseUrl."/index.php/userauthentification/login"); 
$this->layout = "//layouts/emptyLayout";
/*
$url = "https://accounts.google.com/o/oauth2/auth";
 
$params = array(
    "response_type" => "code",
    "client_id" => "995355442884-dt86s3bn75uq2j9clc3rm5o6ig1op7fb.apps.googleusercontent.com",
    "redirect_uri" => Yii::app()->getBaseUrl(true).'/userauthentification/contactsGmail',
    "scope" => "https://www.googleapis.com/auth/contacts.readonly"
    );
 
$request_to = $url . '?' . http_build_query($params);
 
header("Location: " . $request_to);*/

//Google API PHP Library includes
Yii::import('ext.Google.src.Google.*');
Yii::import('ext.Google.src.Google.Auth.*');
Yii::import('ext.Google.src.Google.Service.*');

require_once 'Config.php';
require_once 'autoload.php';
require_once 'Abstract.php';
require_once 'Service.php';
require_once 'Resource.php';

require_once 'Model.php';
require_once 'Collection.php';
require_once 'Client.php';
require_once 'Oauth2.php';
require_once 'OAuth2.php';

// Fill CLIENT ID, CLIENT SECRET ID, REDIRECT URI from Google Developer Console
 $client_id = '995355442884-dt86s3bn75uq2j9clc3rm5o6ig1op7fb.apps.googleusercontent.com';
 $client_secret = 'z1XLrMPiFkxjc4-8e4IutB0R';
 $redirect_uri = Yii::app()->getBaseUrl(true).'/userauthentification/contactsGmail';
 
//Create Client Request to access Google API
$client = new Google_Client();
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope("https://www.googleapis.com/auth/contacts.readonly");

?>
 <script type="text/javascript">
   location.href="<?php echo $client->createAuthUrl(); ?>";     
</script> 
 
 