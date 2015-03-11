<?php

// include required files form Facebook SDK

require_once( 'Facebook/HttpClients/FacebookHttpable.php' );
require_once( 'Facebook/HttpClients/FacebookCurl.php' );
require_once( 'Facebook/HttpClients/FacebookCurlHttpClient.php' );

require_once( 'Facebook/Entities/AccessToken.php' );
require_once( 'Facebook/Entities/SignedRequest.php' );

require_once( 'Facebook/FacebookSession.php' );
require_once( 'Facebook/FacebookRedirectLoginHelper.php' );
require_once( 'Facebook/FacebookRequest.php' );
require_once( 'Facebook/FacebookResponse.php' );
require_once( 'Facebook/FacebookSDKException.php' );
require_once( 'Facebook/FacebookRequestException.php' );
require_once( 'Facebook/FacebookOtherException.php' );
require_once( 'Facebook/FacebookAuthorizationException.php' );
require_once( 'Facebook/GraphObject.php' );
require_once( 'Facebook/GraphSessionInfo.php' );

use Facebook\HttpClients\FacebookHttpable;
use Facebook\HttpClients\FacebookCurl;
use Facebook\HttpClients\FacebookCurlHttpClient;

use Facebook\Entities\AccessToken;
use Facebook\Entities\SignedRequest;

use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookOtherException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
use Facebook\GraphSessionInfo;

// start session


// init app with app id and secret
FacebookSession::setDefaultApplication( '1514190868853704','715ed9e6a5a872e957ed8d64eb38452f' );

// login helper with redirect_uri
$helper = new FacebookRedirectLoginHelper( Yii::app()->getBaseUrl(true).'/index.php/userauthentification/facebookconnect');

// see if a existing session exists
if ( isset( Yii::app()->session['fb_token'] ) ) {
  // create new session from saved access_token
  $session = new FacebookSession( Yii::app()->session['fb_token'] );
  
  // validate the access_token to make sure it's still valid
  try {
    if ( !$session->validate() ) {
      $session = null;
    }
  } catch ( Exception $e ) {
    // catch any exceptions
    $session = null;
  }
}  

if ( !isset( $session ) || $session === null ) {
  // no session exists
  
  try {
    $session = $helper->getSessionFromRedirect();
  } catch( FacebookRequestException $ex ) {
    // When Facebook returns an error
    // handle this better in production code
    print_r( $ex );
  } catch( Exception $ex ) {
    // When validation fails or other local issues
    // handle this better in production code
    print_r( $ex );
  }
  
}

// see if we have a session
if ( isset( $session ) ) {
  
  // save the session
  Yii::app()->session['fb_token'] = $session->getToken();
  // create a session using saved token or the new one we generated at login
  $session = new FacebookSession( $session->getToken() );
  
  // graph api request for user data
  $request = new FacebookRequest( $session, 'GET', '/me' );
  $response = $request->execute();
  // get response
  $graphObject = $response->getGraphObject()->asArray();
  $importModel=UserInfoImported::model()->findByPk(Yii::app()->session['useremail']);
         if($importModel){
         $importModel->delete(); 
         }
         $importModel= new UserInfoImported;
         $importModel->email=Yii::app()->session['useremail'];
         $importModel->photoProfile="https://graph.facebook.com/".$graphObject['id']."/picture?type=large";         
         $importModel->firstname=$graphObject['first_name'];
         $importModel->lastname=$graphObject['last_name'];
         $importModel->from='facebook';
         $importModel->userID=$graphObject['id'];
         if(isset($graphObject['username'])){
          $importModel->username=$graphObject['username'];    
         }
        
         if($importModel->save()){       
           header("Location: ".Yii::app()->request->baseUrl."/userauthentification/registration"); 
         }
  
} else {
  // show login url
  ?>
   <!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>kolab [preview beta]</title>

<link href='http://fonts.googleapis.com/css?family=Exo:400,500|Cabin:400,500,600,700' rel='stylesheet' type='text/css' />


<link rel="icon" type="image/x-icon" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/favicon.ico" />
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-2.1.1.min.js"></script>

</head>

<body>   

 <?php  
  //echo '<a href="' . $helper->getLoginUrl( array( 'email', 'user_friends' ) ) . '" id="facelogin" >Login</a>';
  echo '<script type="text/javascript" > location.href=\''.$helper->getLoginUrl( array( 'email', 'user_friends' ) ).'\'</script>';
?>

</body>
</html> 
   <?php  
}