<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$this->layout = "//layouts/emptyLayout";
function curl_file_get_contents($url)

{

       $curl = curl_init();

       $userAgent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)';

       curl_setopt($curl,CURLOPT_URL,$url);  //The URL to fetch. This can also be set when initializing      a session with curl_init().

       curl_setopt($curl,CURLOPT_RETURNTRANSFER,TRUE);//TRUE to return the transfer as a string of the return value of curl_exec() instead of outputting it out directly.

       curl_setopt($curl,CURLOPT_CONNECTTIMEOUT,5);   //The number of seconds to wait while trying to connect.

       curl_setopt($curl, CURLOPT_USERAGENT, $userAgent);  //The contents of the "User-Agent: " header to be used in a HTTP request.

       curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);  //To follow any "Location: " header that the server sends as part of the HTTP header.

      curl_setopt($curl, CURLOPT_AUTOREFERER, TRUE);  //To automatically set the Referer: field in requests where it follows a Location: redirect.

      curl_setopt($curl, CURLOPT_TIMEOUT, 10);  //The maximum number of seconds to allow cURL functions to execute.

      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);  //To stop cURL from verifying the peer's certificate.

      $contents = curl_exec($curl);

      curl_close($curl);

      return $contents;

}

//Google API PHP Library includes
Yii::import('ext.Google.src.Google.*');
Yii::import('ext.Google.src.Google.Auth.*');
Yii::import('ext.Google.src.Google.Service.*');
Yii::import('ext.Google.src.Google.Http.*');
Yii::import('ext.Google.src.Google.IO.*');
Yii::import('ext.Google.src.Google.Logger.*');
require_once 'Config.php';
require_once 'autoload.php';
require_once Yii::app()->basePath . '/extensions/Google/src/Google/Auth/Abstract.php';
require_once Yii::app()->basePath . '/extensions/Google/src/Google/IO/Abstract.php';
require_once Yii::app()->basePath . '/extensions/Google/src/Google/Logger/Abstract.php';
require_once 'Service.php';
require_once 'Resource.php';

require_once 'Model.php';
require_once 'Collection.php';
require_once 'Client.php';
require_once 'Oauth2.php';
require_once 'OAuth2.php';
require_once 'CacheParser.php';
require_once 'Utils.php';
require_once 'Curl.php';
require_once 'Request.php';
require_once 'Null.php';

// Fill CLIENT ID, CLIENT SECRET ID, REDIRECT URI from Google Developer Console
 $client_id = '995355442884-dt86s3bn75uq2j9clc3rm5o6ig1op7fb.apps.googleusercontent.com';
 $client_secret = 'z1XLrMPiFkxjc4-8e4IutB0R';
 $redirect_uri = Yii::app()->getBaseUrl(true).'/userauthentification/contactsGmail';
 $max_results = 10000;

 
//Create Client Request to access Google API
$client = new Google_Client();
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope("https://www.googleapis.com/auth/contacts.readonly");

//Send Client Request
$objOAuthService = new Google_Service_Oauth2($client);



//Authenticate code from Google OAuth Flow
//Add Access Token to Session
if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  Yii::app()->session['access_token'] = $client->getAccessToken();
  header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

//Set Access Token to make Request
if (isset(Yii::app()->session['access_token']) && Yii::app()->session['access_token']) {
  $client->setAccessToken(Yii::app()->session['access_token']);
}

//Get User Data from Google Plus
//If New, Insert to Database
if ($client->getAccessToken()) {
  
 

  $res=json_decode($client->getAccessToken(),true); 
//print_r($res);   // this is just for debugging 
   $token=$res['access_token']; 
  //print_r($res);
   
   $url = 'https://www.google.com/m8/feeds/contacts/default/full?max-results='.$max_results.'&oauth_token='.$token;

$xmlresponse = curl_file_get_contents($url);

if((strlen(stristr($xmlresponse,'Authorization required'))>0) && (strlen(stristr($xmlresponse,'Error '))>0)) //At times you get Authorization error from Google.

{

      echo "<h2>OOPS !! Something went wrong. Please try reloading the page.</h2>";

      exit();

}





$doc = new DOMDocument;
$doc->recover = true;
$doc->loadXML($xmlresponse);

$xpath = new DOMXPath($doc);
$xpath->registerNamespace('gd', 'http://schemas.google.com/g/2005');

$emails = $xpath->query('//gd:email');
 $friendsList=array();
foreach ( $emails as $email )
{
 // echo $email->getAttribute('address')."   ";

  // To get the title.
  // This could also be done using XPath.
  // You can also use ->nodeValue instead of ->textContent.
 // echo $email->parentNode->getElementsByTagName('title')->item(0)->textContent."<br>";
   $friendsList[]=array('email'=>$email->getAttribute('address'),'name'=>$email->parentNode->getElementsByTagName('title')->item(0)->textContent);
}

function comparer2($a, $b) {
                  return strcasecmp($a['name'], $b['name']);
                }
                uasort($friendsList, 'comparer2');
                $friendWithName=array();
                $friendWithoutName=array();
                foreach ($friendsList as $valuefr) {
                   /// print_r($valuefr); echo "<br />==============================================<br />"; 
                    if($valuefr['name']==''){  
                        $valuefr['name']=$valuefr['email'];
                        $friendWithoutName[]=$valuefr;          
                         }  else {    
                         $friendWithName[]=$valuefr;                 
                          }
                }
                uasort($friendWithoutName, 'comparer2');
                $friendsList2=  array_merge($friendWithName, $friendWithoutName);
                
               $criteria = new EMongoCriteria;
                $criteria->email =Yii::app()->session['useremail'];
                if (isset(Yii::app()->session['useremail'])) {
                    
                
                $user = User::model()->find($criteria); 
                if ($user) {                                   
		$userModelB = FriendsToInvite::model()->findByPk($user->userID);
                if(!$userModelB){
                 $userModelB = new FriendsToInvite();
                 $userModelB->userID=$user->userID;
                }
                  $nxegmailfriendsorted=array();
                 foreach ($friendsList2 as $value) {
                     $name= $value['name'];
                     $lettre=strtoupper($name[0]);
                    // $nxegmailfriendsorted[$lettre][]=$value;
                   switch ($lettre) {
                        case 'A':
                        $nxegmailfriendsorted['A'][]=$value;
                            break;
                        case 'B':
                        $nxegmailfriendsorted['B'][]=$value;
                            break;
                        case 'C':
                        $nxegmailfriendsorted['C'][]=$value;
                            break;
                        case 'D':
                        $nxegmailfriendsorted['D'][]=$value;
                            break;
                        case 'E':
                        $nxegmailfriendsorted['E'][]=$value;
                            break;
                        case 'F':
                        $nxegmailfriendsorted['F'][]=$value;
                            break;
                        case 'G':
                        $nxegmailfriendsorted['G'][]=$value;
                            break;
                        case 'H':
                        $nxegmailfriendsorted['H'][]=$value;
                            break;
                        case 'I':
                        $nxegmailfriendsorted['I'][]=$value;
                            break;
                        case 'J':
                        $nxegmailfriendsorted['J'][]=$value;
                            break;
                        case 'K':
                        $nxegmailfriendsorted['K'][]=$value;
                            break;
                        case 'L':
                        $nxegmailfriendsorted['L'][]=$value;
                            break;
                        case 'M':
                        $nxegmailfriendsorted['M'][]=$value;
                            break;
                        case 'N':
                        $nxegmailfriendsorted['N'][]=$value;
                            break;
                        case 'O':
                        $nxegmailfriendsorted['O'][]=$value;
                            break;
                        case 'P':
                        $nxegmailfriendsorted['P'][]=$value;
                            break;
                        case 'Q':
                        $nxegmailfriendsorted['Q'][]=$value;
                            break;
                        case 'R':
                        $nxegmailfriendsorted['R'][]=$value;
                            break;
                        case 'S':
                        $nxegmailfriendsorted['S'][]=$value;
                            break;
                        case 'T':
                        $nxegmailfriendsorted['T'][]=$value;
                            break;
                        case 'U':
                        $nxegmailfriendsorted['U'][]=$value;
                            break;
                        case 'V':
                        $nxegmailfriendsorted['V'][]=$value;
                            break;
                        case 'W':
                        $nxegmailfriendsorted['W'][]=$value;
                            break;
                        case 'X':
                        $nxegmailfriendsorted['X'][]=$value;
                            break;
                        case 'Y':
                        $nxegmailfriendsorted['Y'][]=$value;
                            break;
                        case 'Z':
                        $nxegmailfriendsorted['Z'][]=$value;
                            break;
                        default:
                           $nxegmailfriendsorted['OTHERS'][]=$value; 
                            break;
                    } 
                 }
                 $userModelB->gmailFriendsList= $nxegmailfriendsorted;
                if($userModelB->save()){
                    Yii::app()->session['gmailfriendslist']='click';
                    header("Location: ".Yii::app()->getBaseUrl(true)."/userauthentification/registration");  
                }
                
                }
                
                }else{
                 header("Location: ".Yii::app()->getBaseUrl(true));      
                }
} else {
  $authUrl = $client->createAuthUrl();
}

 
 
