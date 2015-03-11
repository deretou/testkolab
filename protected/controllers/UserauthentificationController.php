<?php

class UserauthentificationController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';
       

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('create','resetpasswordmanager','resetpassword','resetpwdvalidation',
                                                  'invitationValidation','invitationNextStep','needtoresetpass',
                                                   'registration','userProfilePictureManager','uploadImageManager','login','sendEmail',
                                                   'emailValidation','twitterconnect','twittercallback','twitterredirect',
                                                   'authenticate','setProfileImage','accessCodeVerification','kolabTerms','inviteFriends',
                                                   'facebookconnect','connectGmail','contactsGmail','connectMicrosoft','contactsMicrosoft',
                                                   'connectYahoo','friendstoinvitecleaner','codevalidation'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}
        
           /**
	 * 
	 *
	 */
	public function actionNeedtoresetpass()
	{
		   if(isset($_POST['token']))
                {                       
                    
                        $criteria = new EMongoCriteria;
                        if($_POST['token']=='email'){
                         $criteria->email =$_POST['email'];      
                        }else{
                         $criteria->username =$_POST['username'];     
                        } 
                         $userModel = User::model()->find($criteria);                                                
                        if($userModel){
                            $to = $userModel->email;
                            //define the subject of the email
                            $model=PasswordChangeLinkPending::model()->findByPk($to);
                             $subject = 'Password reset link'; 
                            $url=Yii::app()->getBaseUrl(true)."/userauthentification/resetpwdvalidation?token=".hash('gost',$to); 
                            //define the message to be sent. Each line should be separated with \n
                             $contentmails= new MailsContent();
                             $message =  $contentmails->resetPassLink($url);

                            $headers  = 'MIME-Version: 1.0' . "\r\n";
                            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
                            $headers .= "From: kolab <contact@mail.kolabalison.com>\r\nReply-To: noreply@mail.kolabalison.com";
                            //send the email
                            if ($model) {  
                                Yii::app()->session['useremail']=$to;
                                $mail_sent = @mail( $to, $subject, $message, $headers );
                                echo(json_encode(array("status"=>"Success")));  
                            }else{
                               $model=new PasswordChangeLinkPending;
                               $model->email=$to;
                               $model->token=hash('gost',$to);

                            if($model->save()){
                              $mail_sent = @mail( $to, $subject, $message, $headers );
                            //if the message is sent successfully print "Mail sent". Otherwise print "Mail failed"                  
                            if ($mail_sent) {
                              Yii::app()->session['useremail']=$to;  
                               echo(json_encode(array("status"=>"Success"))); 
                            }else{
                               echo(json_encode(array("status"=>"Failed")));   
                            }  
                            }else{
                              echo(json_encode(array("status"=>"Failed")));      
                            }                            
                            }                                                                                    
                                                                                              
                        }else{   
                         echo(json_encode(array("status"=>"Failed")));   
                            }
                                                		                        
                }
	}
        
         /**
	 * 
	 * 
	 * 
	 */
	public function actionCodevalidation()
	{
                  if(isset(Yii::app()->session['useremail'])){
                  $c = new EMongoCriteria;
                  $c->email('==', Yii::app()->session['useremail']);
                  $subscriber = User::model()->find($c);                  
                   if($subscriber){
                  $code = new EMongoCriteria;
                  $code->status='unused';
                  $code->keyCode=$_POST['code'];
                  $accessCode = KeyAccessCode::model()->find($code);   
                  if ($accessCode) {
                        $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                        $dateCre=$date->format('Y-m-d H:i:s'); 
                        $subscriber->accessCodeVerified='yes';
                        $accessCode->usedBy=$subscriber->userID;
                        $accessCode->status='used';
                        $accessCode->usingDate=$dateCre;
                        if($subscriber->update() && $accessCode->update()){
                         $modelLogin=new LoginForm;		          
                        $modelLogin->username=Yii::app()->session['useremail'];
                        $modelLogin->password=Yii::app()->session['useremail_p']; 
                        $modelLogin->rememberMe=true;                       
			// validate user input and redirect to the previous page if valid
			 if($modelLogin->validate() && $modelLogin->login()){ 
                              Yii::app()->session['useremail']=$subscriber->email;
                              //-------------------Security--------------------------------
                              $safaty= new UserManager();
                              $safeToken= $safaty->generate_token(23);
                              $idrand=rand(1,10000000000000); 
                              $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                              $dateCre=$date->format('Y-m-d H:i:s');                                             
                              $crc64 =hash('crc32', $dateCre);
                              $crc6 =hash('crc32', $safeToken);
                              $usetokid=(String)($idrand + hexdec($crc64)  + hexdec($crc6) + $subscriber->userID);
                              Yii::app()->session['userid']= $usetokid;
                              Yii::app()->session[$usetokid.'_user']= $subscriber->userID;
                             //-------------------Security------------------------------------
                              Yii::app()->session['username']=$subscriber->firstname.' '.$subscriber->lastname;  
                              unset(Yii::app()->session['useremail_p']);
                              echo(json_encode(array("status"=>"Success","profilcomplet"=>$subscriber->profilComplet,"accessCodeVerified"=>$subscriber->accessCodeVerified)));                             
                           }else{
                               unset(Yii::app()->session['useremail_p']);
                               echo(json_encode(array("status"=>"Failed4")));     
                                }    
                        }else{
                               unset(Yii::app()->session['useremail_p']);
                               echo(json_encode(array("status"=>"Failed8")));     
                                }    
                                                                                                      
                       
                    }else{
                        unset(Yii::app()->session['useremail_p']);
                        echo(json_encode(array("status"=>"Failled3")));   
                    } 
                      
                     
                        
                      
                   }else{
                      unset(Yii::app()->session['useremail_p']);
                       echo(json_encode(array("status"=>"Failled1")));        
                   }
                  }else{
                      unset(Yii::app()->session['useremail_p']);
                      echo(json_encode(array("status"=>"Failed2")));     
                  }
                 
                  
	}
        
        
        /**
	 * 
	 * 
	 * 
	 */
	public function actionFriendstoinvitecleaner()
	{
                  if(isset(Yii::app()->session['useremail'])){
                  $c = new EMongoCriteria;
                  $c->email('==', Yii::app()->session['useremail']);
                  $subscriber = User::model()->find($c); 
                  $subscriber->profilComplet=4;
                   if($subscriber->update()){
                    $userModelB = FriendsToInvite::model()->deleteByPk($subscriber->userID);   
                     if(isset(Yii::app()->session['gmailfriendslist'])){
                        unset(Yii::app()->session['gmailfriendslist']);
                      }
                    
                      if(isset(Yii::app()->session['yahoofriendslist'])){
                          unset(Yii::app()->session['yahoofriendslist']);
                      }
                     
                      if(isset(Yii::app()->session['microsoftfriendslist'])){
                          unset(Yii::app()->session['microsoftfriendslist']);
                      }
                      
                     
                         echo(json_encode(array("status"=>"Success")));   
                      
                   }else{
                    echo(json_encode(array("status"=>"Failled")));        
                   }
                  }else{
                     echo(json_encode(array("status"=>"Failed")));     
                  }
                 
                  
	} 
        
        
        /**
	 * 
	 * 
	 */
	public function actionInviteFriends()
	{                
                  $success=true;
                  $failledEmail=array();
                  $number=(int)$_POST['number'];
                  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                     $c = new EMongoCriteria;
                     $c->email('==', Yii::app()->session['useremail']);
                    $subscriber = User::model()->find($c);
                    if(!$subscriber){
                      echo(json_encode(array("status"=>"Failed1")));   
                    }else{
                    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                     $fullName=$subscriber->firstname.' '.$subscriber->lastname;
                     for ($i = 1; $i <= $number; $i++) {                     
                     $value= $_POST['email'.$i];
                     $token= hash('gost',Yii::app()->session['useremail']).hash('gost',$value);
                    $to = $value;
                    $model=PendingFriends::model()->findByPk($token);   
                    $bourage=array("2ray","4day","2fo","2re");
                    shuffle($bourage);
                    $rand_keys = array_rand($bourage, 4);                    
                    $subject = $fullName.' invites you on Kolab'; 
                    $url=Yii::app()->getBaseUrl(true)."/userauthentification/invitationValidation?token=".hash('gost',Yii::app()->session['useremail']).$bourage[$rand_keys[1]].hash('gost',$value); 
                    //define the message to be sent. Each line should be separated with \n                                   
                    $contentmails= new MailsContent();
                    $message =  $contentmails->inviteFriendLink($url,$fullName);
                    //define the headers we want passed. Note that they are separated with \r\n                 
                    $headers  = 'MIME-Version: 1.0' . "\r\n";
                    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
                    $headers .= "From: $fullName <contact@mail.kolabalison.com>\r\nReply-To: noreply@mail.kolabalison.com";
                    if (!$model) {                         
                       // echo(json_encode(array("status"=>"Success")));  
                   
                   $model=new PendingFriends;
                   $model->userID=$subscriber->userID;
                   $model->pendingID=$token;
                   $model->friendEmail=$to;
                  
                    if($model->save()){
                     $mail_sent = @mail( $to, $subject, $message, $headers );
                    //if the message is sent successfully print "Mail sent". Otherwise print "Mail failed" 
                       //$sender= new UserManager;
                       //$mail_sent =  $sender->sendInvitation((String)$to);
                    if(!$mail_sent) {
                     $success=false;
                     $failledEmail[]=$to;
                    } 
                    }                       
                    }else{
                      $mail_sent = @mail( $to, $subject, $message, $headers );
                    //if the message is sent successfully print "Mail sent". Otherwise print "Mail failed" 
                       //$sender= new UserManager;
                       //$mail_sent =  $sender->sendInvitation((String)$to);
                    if(!$mail_sent) {
                     $success=false;
                     $failledEmail[]=$to;
                    } 
                    }
                    }
              
                    
                  
                
                   $subscriber->profilComplet=4;
                   if($subscriber->update()){
                    $userModelB = FriendsToInvite::model()->deleteByPk($subscriber->userID);   
                     if(isset(Yii::app()->session['gmailfriendslist'])){
                        unset(Yii::app()->session['gmailfriendslist']);
                      }
                    
                      if(isset(Yii::app()->session['yahoofriendslist'])){
                          unset(Yii::app()->session['yahoofriendslist']);
                      }
                     
                      if(isset(Yii::app()->session['microsoftfriendslist'])){
                          unset(Yii::app()->session['microsoftfriendslist']);
                      }
                      
                     if($success || count($failledEmail)<$number){
                         echo(json_encode(array("status"=>"Success")));   
                      }else if(count($failledEmail)==$number){
                         echo(json_encode(array("status"=>"Failled2")));    
                      }  
                   }else{
                    echo(json_encode(array("status"=>"Failled3")));        
                   }
		   
                
                    
                    
                  //  $sender= new UserManager;
                   // $sender->sendInvitation((String)$to);
                   
                 
                  
                   
                    }    
               
	}    
       /**
	 * 
	 * 
	 * 
	 */
	public function actionConnectMicrosoft()
	{
		
                  $this->render('connectMicrosoft');
	} 
        /** 
	 * 
	 * 
	 */
	public function actionContactsMicrosoft()
	{
                        
            function curl_file_get_contents($url) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            $data = curl_exec($ch);
            curl_close($ch);
            return $data;
            }
            $client_id = '0000000044135827';
            $client_secret = 'VjsAdhDyZHL0LfhL0bhc9ysNmc-6N9b7';
            $redirect_uri = Yii::app()->getBaseUrl(true).'/userauthentification/contactsMicrosoft';
            $auth_code = $_GET["code"];
            $fields=array(
            'code'=>  urlencode($auth_code),
            'client_id'=>  urlencode($client_id),
            'client_secret'=>  urlencode($client_secret),
            'redirect_uri'=>  urlencode($redirect_uri),
            'grant_type'=>  urlencode('authorization_code')
            );
            $post = '';
            foreach($fields as $key=>$value) { $post .= $key.'='.$value.'&'; }
            $post = rtrim($post,'&');
            $curl = curl_init();
            curl_setopt($curl,CURLOPT_URL,'https://login.live.com/oauth20_token.srf');
            curl_setopt($curl,CURLOPT_POST,5);
            curl_setopt($curl,CURLOPT_POSTFIELDS,$post);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER,TRUE);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER,0);
            $result = curl_exec($curl);
            curl_close($curl);
            $response =  json_decode($result);
            $accesstoken = $response->access_token;
            $url = 'https://apis.live.net/v5.0/me/contacts?access_token='.$accesstoken.'&limit=100';
            $xmlresponse =  curl_file_get_contents($url);
            $xml = json_decode($xmlresponse, true);
            $friendsList = array();
            foreach($xml['data'] as $emails)
            {
            // echo $emails['name'];
            $email_ids = implode(",",array_unique($emails['emails'])); //will get more email primary,sec etc with comma separate

            $friendsList[]=array("name"=>$emails['name'],"email"=>rtrim($email_ids,","));
            }
//---------------------------------------------
                   function comparer4($a, $b) {
                     return strcasecmp($a['name'], $b['name']);
                    }
                uasort($friendsList, 'comparer4');
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
                uasort($friendWithoutName, 'comparer4');
                $friendsList2=  array_merge($friendWithName, $friendWithoutName);
                   //---------------------------------------------      
             
                  
                 $criteria = new EMongoCriteria;
                $criteria->email =Yii::app()->session['useremail'];  
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
                 $userModelB->liveFriendsList= $nxegmailfriendsorted;
                if($userModelB->save()){
                    Yii::app()->session['microsoftfriendslist']='click';
                    $this->redirect(array('registration'));
                } 
                
                 }
                
            //==================================================================================
            /*$this->render('contactsMicrosoft',array(
                        'conta'=> $friendsList2
                   ));*/
	} 
         /**
	 * 
	 * 
	 * 
	 */
	public function actionConnectYahoo()
	{
		Yii::import('ext.YahooAPI.*');
                  require("Yahoo.inc");  
  
                  // Your Consumer Key (API Key) goes here.  
                  define('CONSUMER_KEY', "dj0yJmk9c0VBV2JDb1VPNWo0JmQ9WVdrOU56UnZVR2hYTXpRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hZQ--");  

                  // Your Consumer Secret goes here.  
                  define('CONSUMER_SECRET', "15488cf816334c0daa8b95dbafcf037242c63902");  

                  // Your application ID goes here.  
                  define('APPID', "74oPhW34");  

                  $session = YahooSession::requireSession(CONSUMER_KEY,CONSUMER_SECRET,APPID);  
                  $user = $session->getSessionedUser(); 
                  $conatct=$user->getContacts(0);   
                  $friendsList=array();
                  foreach($conatct->contacts->contact as $id){
                      $name='';
                      $email='';
                       foreach($id->fields as $subid){

                               if( $subid->type == 'email' ){
                               $email=$subid->value;               
                               }
                               if($subid->type == 'name'){
                                 $name= $subid->value->familyName.' '.$subid->value->givenName;    
                               }               
                       }
                       if($email!=''){
                           $friendsList[]=array("name"=>$name,"email"=>$email);   
                       }

                   }
                   //---------------------------------------------
                   function comparer3($a, $b) {
                     return strcasecmp($a['name'], $b['name']);
                    }
                uasort($friendsList, 'comparer3');
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
                uasort($friendWithoutName, 'comparer3');
                $friendsList2=  array_merge($friendWithName, $friendWithoutName);
                   //---------------------------------------------
                  
                 $criteria = new EMongoCriteria;
                $criteria->email =Yii::app()->session['useremail'];  
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
                 $userModelB->yahooFriendsList= $nxegmailfriendsorted;
                if($userModelB->save()){
                    Yii::app()->session['yahoofriendslist']='click';
                    $this->redirect(array('registration'));
                } 
                
                 }
                
                //=======================================================================================
                  /*$this->render('connectYahoo',array(
                        'conta'=> $friendsList2
                   ));*/
	}  
     
      /**
	 * 
	 * 
	 * 
	 */
	public function actionConnectGmail()
	{
		
           /* Yii::import('ext.GmailAPI.*');
            $consumer_key='beta.wekolab.com';
            $consumer_secret='-EWUSmH8YiDJ_1-HFOqDOZ8e';
            $callback=Yii::app()->getBaseUrl(true).'/userauthentification/contactsGmail';
            $emails_count='100000'; // max-results 
            $oauth =new GmailOath($consumer_key, $consumer_secret, null, null, $callback);
            $getcontact=new GmailGetContacts();
            $access_token=$getcontact->get_request_token($oauth, false, true, true);
            Yii::app()->session['oauth_token']=$access_token['oauth_token'];
            Yii::app()->session['oauth_token_secret']=$access_token['oauth_token_secret'];
		*/
		$this->render('connectGmail'/*,array(
			'oauth'=>$oauth,
		)*/);
	}
         /**
	 * 
	 * 
	 * 
	 */
	public function actionContactsGmail()
	{
		

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
                /*Yii::import('ext.GmailAPI.*');
                $consumer_key='beta.wekolab.com';
                $consumer_secret='-EWUSmH8YiDJ_1-HFOqDOZ8e';
                $callback=Yii::app()->getBaseUrl(true).'/userauthentification/contactsGmail';
                $emails_count='10000'; // max-results 
                $oauth =new GmailOath($consumer_key, $consumer_secret, null, null, $callback);
                $getcontact_access=new GmailGetContacts();
                $request_token=$oauth->rfc3986_decode($_GET['oauth_token']);
                $request_token_secret=$oauth->rfc3986_decode(Yii::app()->session['oauth_token_secret']);
                $oauth_verifier= $oauth->rfc3986_decode($_GET['oauth_verifier']);
                $contact_access = $getcontact_access->get_access_token($oauth,$request_token, $request_token_secret,$oauth_verifier, false, true, true);
                $access_token=$oauth->rfc3986_decode($contact_access['oauth_token']);
                $access_token_secret=$oauth->rfc3986_decode($contact_access['oauth_token_secret']);
                $contacts= $getcontact_access->GetContacts($oauth, $access_token, $access_token_secret, false, true,$emails_count);
                $friendsList=array();
                foreach($contacts as $k => $a)
                {
                $final = end($contacts[$k]);
                $link=prev($contacts[$k]);
                $nom=  prev($contacts[$k]);

                $nomf='';
                 foreach ($nom as $keyn => $valuen) {
                     if($keyn!='type'){
                       $nomf=$valuen;  
                       break;
                     }
                 }

                 foreach ($final as $value) {
                     foreach ($value as $keya => $valuea) {
                       if($keya=='address'){
                           $friend=array();
                           if(filter_var($nomf, FILTER_VALIDATE_EMAIL)){
                            $nomf='';   
                           }
                        $friend['name']=  trim($nomf);
                        $friend['email']= $valuea;
                        break;
                       }  
                     }
                 }
                if($friend){
                     $friendsList[]=$friend;
                }

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
                    $this->redirect(array('registration'));
                } 
                
                 }*/
            $this->render('contactsGmail'/*,array(
			'oauth'=>$oauth,
		)*/);
            
    
                  
	} 
        
        
        function arrangeByLetter($param) {
         $nxegmailfriendsorted=array();
                 foreach ($param as $value) {
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
                        default:
                            break;
                    } 
                 }
                 
                 return $nxegmailfriendsorted;         
        }


        /**
	 * 
	 * 
	 */
	public function actionKolabTerms()
	{

                $this->render('kolabTerms'); 
                
		 
	}
        
        /**
	 * 
	 * 
	 */
	public function actionSetProfileImage()
	{
             $modelImport=UserInfoImported::model()->findByPk(Yii::app()->session['useremail']);
             if($modelImport && isset($modelImport->photoProfile)){
      
     // echo $modelImport->photoProfile;
             $upload_dir = Yii::app()->basePath.'/../tempData/userTempFile/';
             $temp_file = $upload_dir. hash('snefru', Yii::app()->session['useremail']);
             $upload_dirR = Yii::app()->basePath.'/data/userTempFile/';
             $temp_fileR = $upload_dirR. hash('snefru', Yii::app()->session['useremail']);
              if($modelImport->from=="twitter"){ 
               $ext=  explode('.', $modelImport->photoProfile);      
               copy($modelImport->photoProfile,$temp_file.'_original.'.$ext[count($ext)-1]);
               copy($modelImport->photoProfile,$temp_fileR.'_original.'.$ext[count($ext)-1]);
              $profileURL=Yii::app()->getBaseUrl(true).'/tempData/userTempFile/'.hash('snefru', Yii::app()->session['useremail']).'_original.'.$ext[count($ext)-1];   
              }elseif($modelImport->from=="facebook"){
                   //--------------------------------
                 $url = $modelImport->photoProfile;
                  $data = file_get_contents($url);        

                  $fp = fopen($temp_file."_original.jpg","wb");
                  $fp2 = fopen($temp_fileR."_original.jpg","wb");
                  if($fp){ 
                    fwrite($fp, $data);          
                  }

                  fclose($fp);
                  if($fp2){ 
                    fwrite($fp2, $data);          
                  }

                  fclose($fp2);
                 //-----------------------------------------

               $profileURL=Yii::app()->getBaseUrl(true).'/tempData/userTempFile/'.hash('snefru', Yii::app()->session['useremail']).'_original.jpg';     
              }
            echo(json_encode(array("status"=>"Success","url"=>$profileURL)));  
            }else{
            echo(json_encode(array("status"=>"Failed","url"=>'')));    
            }
                              		 
	}
         /**
	 * 
	 * 
	 */
	public function actionFacebookconnect()
	{

                $this->render('facebooktest'); 
                
		 
	}
        
        
    
        /**
	 * 
	 * 
	 */
	public function actionResetpasswordmanager()
	{
               if(isset(Yii::app()->session['useremail'])){              
               $c = new EMongoCriteria;
               $c->username('==', Yii::app()->session['useremail']);
               $authModel = Userauthentification::model()->find($c);
               if($authModel){
                 $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                 $dateCre=$date->format('Y-m-d H:i:s');  
                 $authModel->lastModification= $dateCre;
                 $authModel->password=hash('whirlpool', $_POST['password']); 
                 if($authModel->save()){                                                                          
                    $criteria2 = new EMongoCriteria;
                    $criteria2->email =Yii::app()->session['useremail'];                            
                    $userModel = User::model()->find($criteria2);
                    $modelLogin=new LoginForm;		          
                    $modelLogin->username=$userModel->email;
                    $modelLogin->password=$_POST['password']; 
                    $modelLogin->rememberMe=true;                       
                    // validate user input and redirect to the previous page if valid
                    if($modelLogin->validate() && $modelLogin->login()){ 
                    Yii::app()->session['useremail']=$userModel->email;
                    Yii::app()->session['userid']= $userModel->userID;
                    Yii::app()->session['username']=$userModel->firstname.' '.$userModel->lastname;
                    echo(json_encode(array("status"=>"Success")));                             
                    }else{
                    echo(json_encode(array("status"=>"Failed")));     
                    }                                        
                 }else{
                    echo(json_encode(array("status"=>"Failed")));     
                      }
                  }else{
                    echo(json_encode(array("status"=>"Failed")));    
                    }                 
                 }                                                       
	}
         /**
	 * 
	 * 
	 */
	public function actionResetpwdvalidation($token)
	{
              
                    $c = new EMongoCriteria;
                    $c->token('==', $token);
                    $subscriber = PasswordChangeLinkPending::model()->find($c);
                    if ($subscriber && hash('gost',$subscriber->email)==$token) {
                        Yii::app()->session['useremail']=$subscriber->email;
                       // $subscriber->delete();
                        $this->redirect(array('resetpassword'));
                    }
                
	}
        
        /**
	 * 
	 * 
	 */
	public function actionResetpassword()
	{
		 $model=PasswordChangeLinkPending::model()->findByPk(Yii::app()->session['useremail']);
            
                $this->render('resetpassword',array(
			'model'=>$model,
		));
	}  
        /**
	 * 
	 * 
	 */
	public function actionEmailValidation()
	{
                if(isset($_GET['token'])){
                    $c = new EMongoCriteria;
                    $c->token('==', $_GET['token']);
                    $subscriber = Subscribe::model()->find($c);
                    if ($subscriber && hash('gost',$subscriber->email)==$_GET['token']) {
                        Yii::app()->session['useremail']=$subscriber->email;
                       // $subscriber->delete();
                         $this->redirect(array('registration'));
                    }else{
                         header("Location: ".Yii::app()->getBaseUrl(true));    
                    }
                }
	} 
        
        /**
	 * 
	 * 
	 */
	public function actionSendEmail()
	{
                if(isset($_POST['destEmail'])){
                    //define the receiver of the email
                    $to = $_POST['destEmail'];
                    //define the subject of the email
                    
                    $c = new EMongoCriteria;
                    $c->email('==', $to);
                    $subscriber = User::model()->find($c);
                    if($subscriber){
                      echo(json_encode(array("status"=>"Failed","p"=>4)));   
                    }else{
                    $model=Subscribe::model()->findByPk($to);
                    $subject = 'Email validation link'; 
                    $url=Yii::app()->getBaseUrl(true)."/userauthentification/emailValidation?token=".hash('gost',$to); 
                    //define the message to be sent. Each line should be separated with \n
                    $contentmails= new MailsContent();
                    $message =  $contentmails->accountCreationLink($url);
                    //define the headers we want passed. Note that they are separated with \r\n
                                    
                    $headers  = 'MIME-Version: 1.0' . "\r\n";
                    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
                    $headers .= "From: kolab <contact@mail.kolabalison.com>\r\nReply-To: noreply@mail.kolabalison.com";
                    //send the email
                    if ($model) {  
                        Yii::app()->session['useremail']=$to;
                        $mail_sent = @mail( $to, $subject, $message, $headers);
                        echo(json_encode(array("status"=>"Success","url"=>$url,"p"=>1)));  
                    }else{
                   $model=new Subscribe;
                   $model->email=$to;
                   $model->token=hash('gost',$to);
                  
                    if($model->save()){
                      $mail_sent = @mail( $to, $subject, $message, $headers );
                    //if the message is sent successfully print "Mail sent". Otherwise print "Mail failed"                  
                    if ($mail_sent) {
                      Yii::app()->session['useremail']=$to;  
                    echo(json_encode(array("status"=>"Success","url"=>$url,"p"=>2))); 
                    }else{
                       echo(json_encode(array("status"=>"Failed","p"=>3)));   
                    }  
                    }                       
                    }
                    }
                }
	}  
        /**
	 * 
	 * 
	 */
	public function actionInvitationNextStep()
	{
               if(isset( Yii::app()->session['invitedBy'])){
                     $model= new stdClass();
                  $model->email=Yii::app()->session['useremail'];
                $this->render('invitationNextStep',array(
			'model'=>$model,
		)); 
                  }else{
                //header("Location: ".Yii::app()->request->baseUrl."/index.php/userauthentification/login");   
                 $this->redirect(array('login'));
                }
		 
	} 
        /**
	 * 
	 * 
	 */
	public function actionRegistration()
	{
		if(isset(Yii::app()->session['useremail'])){ 
                $modelSub=Subscribe::model()->findByPk(Yii::app()->session['useremail']);
                 $c = new EMongoCriteria;
                 $c->email('==', Yii::app()->session['useremail']);
                 $subscriber = User::model()->find($c);
                 $modelImport=UserInfoImported::model()->findByPk(Yii::app()->session['useremail']);
                 
                 if($subscriber && isset($subscriber->profilComplet) && $subscriber->profilComplet>1) {
                 $model=$subscriber;                                
                 }else{
                 $model=new stdClass();                 
                 $model->email=Yii::app()->session['useremail'];    
                 }
                 
                 if($subscriber && $subscriber->profilComplet>=3){
                   $friendsToInvite = FriendsToInvite::model()->findByPk($subscriber->userID);  
                   $friendsToInvitelist=array();
                   if($friendsToInvite){
                        if(!is_null($friendsToInvite->gmailFriendsList) && count($friendsToInvite->gmailFriendsList)>0){
                            $friendsToInvitelist['gmail']=$friendsToInvite->gmailFriendsList;     
                        }
                        
                         if(!is_null($friendsToInvite->yahooFriendsList) && count($friendsToInvite->yahooFriendsList)>0){
                              $friendsToInvitelist['yahoo']=$friendsToInvite->yahooFriendsList;      
                        }
                        
                         if(!is_null($friendsToInvite->liveFriendsList) && count($friendsToInvite->liveFriendsList)>0){
                              $friendsToInvitelist['microsoft']=$friendsToInvite->liveFriendsList;      
                        }                                 
                   }
                  $this->render('registration',array(
			'model'=>$model,
                        'extradata'=>$modelImport,
                        'friendslist'=>$friendsToInvitelist,
		       )); 
                   
                 }else if($modelImport){
                    $this->render('registration',array(
			'model'=>$model,
                        'extradata'=>$modelImport,
		       ));   
                 }else{
                  $this->render('registration',array(
			'model'=>$model
		       ));    
                 }
                 
                        
               
              
                }else{
                header("Location: ".Yii::app()->getBaseUrl(true));   
                // $this->redirect(array('/'));
                }
	}  
        /**
	 * 
	 * 
	 */
	public function actionLogin()
	{
             $traductor=new NXETraductor("en");  
		$this->render('login',array(
			'dico'=>$traductor,
		));
	}        
	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}
        
         /**
	 * 
	 *
	 */
	public function actionAuthenticate()
	{
		   if(isset($_POST['email']))
                {
                        
                        $criteria = new EMongoCriteria;
                        if($_POST['authentype']=='email'){
                         $criteria->email =$_POST['email'];      
                        }else{
                         $criteria->username =$_POST['email'];     
                        }  
                             
                        $userModel = User::model()->find($criteria);
                        
                         if($userModel && (!isset($userModel->accessCodeVerified) || is_null($userModel->accessCodeVerified))){
                               $accessCodeVerified='no';   
                              }else{
                                   $accessCodeVerified=$userModel->accessCodeVerified;
                              }
                           
                          
                        if($userModel){
                        if($accessCodeVerified=='yes' && $userModel->profilComplet>=3){
                        $modelLogin=new LoginForm;		          
                        $modelLogin->username=$userModel->email;
                        $modelLogin->password=$_POST['password']; 
                        $modelLogin->rememberMe=true;  
                          
			// validate user input and redirect to the previous page if valid
                         
			if($modelLogin->validate() && $modelLogin->login()){ 
                            
                            Yii::app()->session['useremail']=$userModel->email;
                           
                             //-------------------Security--------------------------------
                              $safaty= new UserManager();
                              $safeToken= $safaty->generate_token(23);
                              $idrand=rand(1,10000000000000); 
                              $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                              $dateCre=$date->format('Y-m-d H:i:s');                                             
                              $crc64 =hash('crc32', $dateCre);
                              $crc6 =hash('crc32', $safeToken);
                              $usetokid=(String)($idrand + hexdec($crc64)  + hexdec($crc6) + $userModel->userID);
                              Yii::app()->session['userid']= $usetokid;
                              Yii::app()->session[$usetokid.'_user']= $userModel->userID;
                             //-------------------Security------------------------------------
                              Yii::app()->session['username']=$userModel->firstname.' '.$userModel->lastname;                             
                              echo(json_encode(array("status"=>"Success","profilcomplet"=>$userModel->profilComplet,"accessCodeVerified"=>$accessCodeVerified)));                                                                                     
                                }else{
                                  echo(json_encode(array("status"=>"Failed")));     
                                }
                          
                          
                         }else if($userModel->profilComplet<3){
                               Yii::app()->session['useremail']=$userModel->email;
                               echo(json_encode(array("status"=>"Failed2")));   
                         }else if($accessCodeVerified=='no' && $userModel->profilComplet>=3){
                               Yii::app()->session['useremail']=$userModel->email;
                               Yii::app()->session['useremail_p']=$_POST['password']; 
                               echo(json_encode(array("status"=>"Failed3")));  
                         } 
                                                                                 
                        }else{   
                                echo(json_encode(array("status"=>"Failed")));   
                            }
                                                		                        
                }
	}
        /**
	 * 
	 * 
	 */
	public function actionInvitationValidation($token)
	{		
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
                $bourage=array("2ray","4day","2fo","2re");
                $key='';
                foreach ($bourage as $value) {
                    if(strpos($token, $value)!==false){
                       $key= $value;
                       break;
                    }
                }
                $tempkey=  explode($key, $token);
                $primKey=$tempkey[0].$tempkey[1];                                           
		 $model=PendingFriends::model()->findByPk($primKey);
                 if($model){
                 //print_r($model);
                  Yii::app()->session['useremail']=$model->friendEmail;
                  Yii::app()->session['invitedBy']=$model->userID;
                  $this->redirect(array('registration'));
                  
                 } else {
                    $this->redirect(array('/site/index'));
                 }
    

	}
	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Userauthentification;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
               
                
		
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Userauthentification']))
		{
			$model->attributes=$_POST['Userauthentification'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->userID));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		if(Yii::app()->request->isPostRequest)
		{
			// we only allow deletion via POST request
			$this->loadModel($id)->delete();

			// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
			if(!isset($_GET['ajax']))
				$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
		}
		else
			throw new CHttpException(400,'Invalid request. Please do not repeat this request again.');
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new EMongoDocumentDataProvider('Userauthentification');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model = new Userauthentification('search');
		$model->unsetAttributes();

		if(isset($_GET['Userauthentification']))
			$model->setAttributes($_GET['Userauthentification']);

		$this->render('admin', array(
			'model'=>$model
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id)
	{
		$model=Userauthentification::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='userauthentification-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
        
      
        
     /*
      * 
      * 
      */ 
        
      public function actionTwitterconnect()
	{
             //require_once('twitteroauth.php');
            // require_once('kolabTwitterConfig.php');
            define('CONSUMER_KEY', 'bWtLyAbGZoKboIzcElBpNpQZl');
            define('CONSUMER_SECRET', 'iRVQ9DfNtZwJeKuyHUldve8fHwkYcMse5FjPxhCW0ZgscFqScs');
            define('OAUTH_CALLBACK', Yii::app()->getBaseUrl(true).'/userauthentification/twittercallback');
            Yii::import('application.extensions.twitteroauth.TwitterOAuth'); 

            /* If access tokens are not available redirect to connect page. */
            if (empty(Yii::app()->session['access_token']) || empty(Yii::app()->session['access_token']['oauth_token']) || empty(Yii::app()->session['access_token']['oauth_token_secret'])) {
               // header('Location: ./clearsessions.php');
                $this->redirect(array('twitterredirect','target'=>'_blank'));
            }
        /* Get user access tokens out of the session. */
        $access_token = Yii::app()->session['access_token'];

        /* Create a TwitterOauth object with consumer/user tokens. */
        $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

        /* If method is set change API call made. Test is called by default. */
             $contenttwitter = $connection->get('account/verify_credentials');
            // $contentshow = $connection->get('users/show/'.$contenttwitter->id);
        /* Some example calls */
             $imageURL=  explode('_normal', $contenttwitter->profile_image_url_https);
          // copy($imageURL[0].$imageURL[1],Yii::app()->basePath.'/data/userTempFile/'.'fode.jpg');
        //$connection->get('users/show', array('screen_name' => 'abraham'));
         //$connection->post('statuses/update', array('status' => 'Test from wekolab '.date(DATE_RFC822)));
        //$connection->post('statuses/destroy', array('id' => 5437877770));
        //$connection->post('friendships/create', array('id' => 9436992));
        //$connection->post('friendships/destroy', array('id' => 9436992));
         $importModel=UserInfoImported::model()->findByPk(Yii::app()->session['useremail']);
         if($importModel){
         $importModel->delete();
         }
         $importModel= new UserInfoImported;
         $importModel->email=Yii::app()->session['useremail'];
         $importModel->photoProfile=$imageURL[0].$imageURL[1];
         $importName=  explode(' ', $contenttwitter->name);
         $importModel->firstname=$importName[0];                
         if(count($importName)>1){
           $importModel->lastname=$importName[1];    
         }               
         $importModel->from='twitter';
         $importModel->userID=$contenttwitter->id_str;
         $importModel->username=$contenttwitter->screen_name;
         if($importModel->save()){
           $this->redirect(array('registration'));    
         }
     
         
        }  
       
        
                  
      /*
      * 
      * 
      */ 
        
      public function actionTwitterredirect()
	{            
           // require_once('twitteroauth.php');
          //  require_once('kolabTwitterConfig.php');
            define('CONSUMER_KEY', 'bWtLyAbGZoKboIzcElBpNpQZl');
            define('CONSUMER_SECRET', 'iRVQ9DfNtZwJeKuyHUldve8fHwkYcMse5FjPxhCW0ZgscFqScs');
            define('OAUTH_CALLBACK', Yii::app()->getBaseUrl(true).'/userauthentification/twittercallback');
            Yii::import('application.extensions.twitteroauth.TwitterOAuth'); 

              /* Build TwitterOAuth object with client credentials. */
                $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

                /* Get temporary credentials. */
                $request_token = $connection->getRequestToken(OAUTH_CALLBACK);

                /* Save temporary credentials to session. */
                Yii::app()->session['oauth_token'] = $token = $request_token['oauth_token'];
                Yii::app()->session['oauth_token_secret'] = $request_token['oauth_token_secret'];

                /* If last connection failed don't display authorization link. */
                switch ($connection->http_code) {
                  case 200:
                    /* Build authorize URL and redirect user to Twitter. */
                    $url = $connection->getAuthorizeURL($token);
                    header('Location: ' . $url); 
                    break;
                  default:
                    /* Show notification if something went wrong. */
                    echo 'Could not connect to Twitter. Refresh the page or try again later.';
                }

        } 
       
         /*
      * 
      * 
      */ 
        
      public function actionTwittercallback()
	{            
            //require_once('twitteroauth.php');
           // require_once('kolabTwitterConfig.php');
           define('CONSUMER_KEY', 'bWtLyAbGZoKboIzcElBpNpQZl');
            define('CONSUMER_SECRET', 'iRVQ9DfNtZwJeKuyHUldve8fHwkYcMse5FjPxhCW0ZgscFqScs');
           define('OAUTH_CALLBACK', Yii::app()->getBaseUrl(true).'/userauthentification/twittercallback');
             Yii::import('application.extensions.twitteroauth.TwitterOAuth');      
            /* If the oauth_token is old redirect to the connect page. */
            if (isset($_REQUEST['oauth_token']) && Yii::app()->session['oauth_token'] !== $_REQUEST['oauth_token']) {
              Yii::app()->session['oauth_status'] = 'oldtoken';
              //header('Location: ./clearsessions.php');
               $this->redirect(array('twitterredirect'));
            }

            /* Create TwitteroAuth object with app key/secret and token key/secret from default phase */
            $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, Yii::app()->session['oauth_token'], Yii::app()->session['oauth_token_secret']);

            /* Request access tokens from twitter */
            $access_token = $connection->getAccessToken($_REQUEST['oauth_verifier']);

            /* Save the access tokens. Normally these would be saved in a database for future use. */
            Yii::app()->session['access_token'] = $access_token;

            /* Remove no longer needed request tokens */
            unset(Yii::app()->session['oauth_token']);
            unset(Yii::app()->session['oauth_token_secret']);

            /* If HTTP response is 200 continue otherwise send to connect page to retry */
            if (200 == $connection->http_code) {
              /* The user has been verified and the access tokens can be saved for future use */
              Yii::app()->session['status'] = 'verified';
             // header('Location: ./index.php');
              $this->redirect(array('twitterconnect'));
            } else {
              /* Save HTTP status for error dialog on connnect page.*/
             // header('Location: ./clearsessions.php');
               $this->redirect(array('twitterredirect'));
            }


        } 
        
        
	
      
        
        
        
 
        /**
	 * 
	 * 
	 */
	public function actionUploadImageManager()
	{
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    	/*Configuration part*/
    	extract($_POST);    	     
        $upload_dir = Yii::app()->basePath.'/data/userTempFile/';

        if ($_FILES) {
			$file = $_FILES['image_file'];
            if (! $file['error'] && $file['size'] < 350 * 1024) {
                if (is_uploaded_file($file['tmp_name'])) {

                    // unique name of the file
		    $entente=explode('/',$file['type']);
                    $temp_file = $upload_dir. hash('snefru', Yii::app()->session['useremail']);
                   
                    // upload the file in appropriate folder
                    move_uploaded_file($file['tmp_name'], $temp_file.'_original.'.$entente[1]);

                   echo(json_encode(array("status"=>"Success")));  
                   
					
                }
            }
        }
         }	
                                                             	
	}
        
        
        /**
	 * 
	 * 
	 */
	public function actionUserProfilePictureManager()
	{
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    	/*Configuration part*/
    	extract($_POST);    	     
        $upload_dir = Yii::app()->basePath.'/data/userTempFile/';

         
            $data = explode(',',$cropped);
            $data = base64_decode($data[1]);

            $im = imagecreatefromstring($data);
            if ($im !== false) {
                  header('Content-Type: image/jpeg');
                //imagepng($im);	                   
                    $temp_file = $upload_dir. hash('snefru', Yii::app()->session['useremail']);
                    $criteria = new EMongoCriteria;
                    $criteria->email =Yii::app()->session['useremail'];  
                    $userModel = User::model()->find($criteria); 
                    if($userModel){
                  // imagejpeg($im, $temp_file.'_temp.jpg');
                    //=====================================================================
                            
                          
                      
                    //======================================================================    
                    $filesnormal = glob("{$temp_file}_original.*");                    
                    if(is_array($filesnormal) && count($filesnormal)>0 && isset($filesnormal[0])){
                    $sendblob= new KolabAzureManager();   
                    $extnrom=  explode('.', $filesnormal[0]);
                    $sendblob->createBlob('usersprofile', hash('snefru', Yii::app()->session['useremail']).'_original.'.$extnrom[count($extnrom)-1]);                             
                        

                     //----------------------------------------------------
                    $desired_width = 94; //desired image result width
                    $desired_height = 94; //desired image result height   
                    //----------------------------------------------------------
                     $desired_width164 = 164; //desired image result width
                    $desired_height164= 164; //desired image result height     
                    //----------------------------------------------------
                    $desired_width614 = 614; //desired image result width
                    $desired_height614 = 614; //desired image result height
                    $img_quality = 100;
                    $true_color_img = @imagecreatetruecolor($desired_width, $desired_height);
                    $true_color_img2 = @imagecreatetruecolor( $desired_width614, $desired_height614);
                    $true_color_img3 = @imagecreatetruecolor( $desired_width164, $desired_height164);

                    imagecopyresampled($true_color_img, $im, 0, 0, 0, 0, $desired_width, $desired_height, 200, 200);
                    imagecopyresampled($true_color_img2, $im, 0, 0, 0, 0, $desired_width614, $desired_height614, 200, 200);
                    imagecopyresampled($true_color_img3, $im, 0, 0, 0, 0, $desired_width164, $desired_height164, 200, 200);
                    imagejpeg($true_color_img,$temp_file.'_v94.jpg', $img_quality);
                    imagejpeg($true_color_img2, $temp_file.'_v614.jpg', $img_quality);
                    imagejpeg($true_color_img3, $temp_file.'_v164.jpg', $img_quality);
                   
                   
                   //-----------------------------------------------------------------------
                   
                                                                       
                         $sendblob->createBlob('usersprofile', hash('snefru', Yii::app()->session['useremail']).'_v94.jpg');                      
                         $sendblob->createBlob('usersprofile', hash('snefru', Yii::app()->session['useremail']).'_v614.jpg'); 
                         $sendblob->createBlob('usersprofile', hash('snefru', Yii::app()->session['useremail']).'_v164.jpg');  
                                                                       
                        $userModel->photoProfile='https://cdnzone1.blob.core.windows.net/usersprofile/'. hash('snefru', Yii::app()->session['useremail']).'_v94';       
                     }           
                         
                        
                   // $userModel->photoProfile='https://cdnzone1.blob.core.windows.net/usersprofile/'. hash('snefru', Yii::app()->session['useremail']).'_v94.jpg';        
                        
                   //------------------------------------------------------------------------------- 
                          
                        
                        imagedestroy($im);
                        $userModel->city=$_POST['city'];
                        $userModel->about=$_POST['about'];
                        $userModel->gender=$_POST['gender'];
                        
                       $modelImport=UserInfoImported::model()->findByPk(Yii::app()->session['useremail']);
                        if($modelImport){
                       if($modelImport->from=='twitter'){
                          $userModel->twitterID=$modelImport->userID;  
                          }else{
                           $userModel->facebookID=$modelImport->userID;
                        }   
                        }
                        
                         $userModel->profilComplet=3;
                         if($userModel->save()){
                        // $modelImport=UserInfoImported::model()->deleteByPk(Yii::app()->session['useremail']);  
                            $upload_dir2 = Yii::app()->basePath.'/../tempData/userTempFile/';
                            $temp_file2 = $upload_dir2.hash('snefru', Yii::app()->session['useremail']);
                            $filesnormal2 = glob("{$temp_file2}_original.*");   
                             if(is_array($filesnormal2) && count($filesnormal2)>0 && isset($filesnormal2[0])){
                              $extnrom2=  explode('.', $filesnormal2[0]); 
                              //@chmod($temp_file2.'_original.'.$extnrom2[count($extnrom2)-1], 0777);
                              @unlink($temp_file2.'_original.'.$extnrom2[count($extnrom2)-1]);
                              }
                               if($modelImport){
                               $modelImport->delete();    
                               }
                              
                         echo(json_encode(array("status"=>"Success")));      
                         }else{                         
                           echo(json_encode(array("status"=>"Failed")));    
                         }
                            
                        }else{
                        echo(json_encode(array("status"=>"Failed")));     
                        }
                        
            }
            else {
                 imagedestroy($im);
                 echo(json_encode(array("status"=>"Failed"))); 
            }
         }	
                                                             	
	}
        
        
         
        
      
        
        
}
