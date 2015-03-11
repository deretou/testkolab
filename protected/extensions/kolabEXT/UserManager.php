<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserManager
 *
 * @author DERETOU
 */
class UserManager {
    //put your code here
    
    
     /*
  * Function : constructor
  */   
    public function __construct()
	{  
	}
        
        public function getBindersList(){
                 
                    $c = new EMongoCriteria;
                    $c->userID('==', Yii::app()->session[Yii::app()->session['userid'].'_user']);
                    $binders = Binders::model()->findAll($c); 
                    if(count($binders)>0){
                       $binderList=  $binders; 
                       $modelUser=User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']);
                       if (isset($modelUser->binderList) && !is_null($modelUser->binderList) && !is_null($modelUser->bindersortPreference) && $modelUser->bindersortPreference='usercustumizedsort') {
                           function melange(&$array,$binderOrder) {
                                $val = array();
                                $keys= array();
                                foreach ($binderOrder as $valu) {
                                    foreach ($array as $cle => $valeur) {
                                        if($valeur->binderID==$valu){
                                            $keys[]=$cle;
                                        }
                                    }

                                }

                                foreach($keys as $key){ 
                                    $val[] = $array[$key];
                                    
                                    }
                                $array=$val;
                            }
                          if(count($binderList)>1) {                           
                         melange($binderList,$modelUser->binderList);       
                        }   

                           
                       }  else {
                          function compare($a, $b){
                             return $a->creationDate<$b->creationDate;
                            }
                            if(count($binderList)>1){
                               usort($binderList, 'compare'); 
                            }  
                       }
                       
                    }else{
                      $binderList= array();   
                    }
                    return $binderList ;
        }
        
         public function personalBinderCorrection(){
                   if(isset(Yii::app()->session['userid'])){
                     $c = new EMongoCriteria;
                    $c->userID('==', Yii::app()->session[Yii::app()->session['userid'].'_user']);
                    $binders = Binders::model()->findAll($c);
                    if(count($binders)==0){
                       $model=new Binders;
                       $id=rand(1,10000000000000);                       
                       $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                       $dateCre=$date->format('Y-m-d H:i:s');                                             
                       $crc64 =hash('crc32', $dateCre);
                       $crc6 =hash('crc32', Yii::app()->session['useremail']); //Yii::app()->session['userid']                     
                       $safeToken= $this->generate_token(23);
                       $crc =hash('crc32', $safeToken);
                       $model->binderID=(String)($id + hexdec($crc64) + hexdec($crc6) + hexdec($crc) +Yii::app()->session['userid']);
                       $model->userID=Yii::app()->session[Yii::app()->session['userid'].'_user'];
                       $model->color='FF0063';
                       $model->name='Personal';
                       $model->description='This is your personal Binder where you can put every quick, unrelated and personal project. Your color, your Binder, your personal Squares.';                      
                       $model->creationDate=$dateCre;
                       $model->lastUpdateDate=$dateCre;
                       $model->save();
                       
                    }  
                   }
                    
        }
        
    /*    public function getSquaresList($id){
           // $c = new EMongoCriteria;
           // $c->binderID('==', Yii::app()->session['currentBinderID']); 
            $currentBinder=Binders::model()->findByPk($id);           
            if($currentBinder && !is_null($currentBinder->squaresList)){
             
             $squares = $currentBinder->squaresList ; 
             if(is_null($currentBinder->squaresortPreference) || $currentBinder->squaresortPreference=='percreationdate'){
                 function comparebydate($a, $b){
                             return $a->creationDate<$b->creationDate;
                            }
                            if(count($squares)>1){
                              usort($squares, 'comparebydate'); 
                            }   
             }
                    
            
            }else{
                  $squares=array();   
            }
           return $squares;  
        }
*/


                                                 
       public function inSquare($idsq, $iduser) {
          $square = Squares::model()->findByPk($idsq); 
          $insq=false;
          foreach ($square->squareMembers as $value) {
             if($value->userID==$iduser){
               $insq=true;
               break;
             } 
          }
          return $insq;  
       }
       
    public function roleInSquare($idsq, $iduser) {
          $square = Squares::model()->findByPk($idsq); 
          $insq='Member';
          foreach ($square->squareMembers as $value) {
             if($value->userID==$iduser){
               $insq=$value->userRole;
               break;
             } 
          }
          return $insq;  
       }
       
        public function generate_token ($len=10) {
      // Array of potential characters, shuffled.
		$chars = array(
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
			'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
		);
		shuffle($chars);

		$num_chars = count($chars) - 1;
		$token = '';

		// Create random token at the specified length.
		for ($i = 0; $i < $len; $i++)
		{
			$token .= $chars[mt_rand(0, $num_chars)];
		}

	   return $token; 
         }
         
         
        
       public function slugify($text){ 
          // replace non letter or digits by -
          $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

          // trim
          $text = trim($text, '-');

          // transliterate
          $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

          // lowercase
          $text = strtolower($text);

          // remove unwanted characters
          $text = preg_replace('~[^-\w]+~', '', $text);

          if (empty($text))
          {
            return null;
          }

          return $text;
        }
        
       
        public function inviteInSquare($POST,$squareid,$dateCre)
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
                     
             if(isset($POST['userinvitecounter'])){
                $index=(int)$POST['userinvitecounter'];
                $square = Squares::model()->findByPk($squareid);               
                $userModel = User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']);
                for ($index1 = 1; $index1 <= $index; $index1++) {
                   $temp="email".$index1;
                   $criteria = new EMongoCriteria;  
                   $criteria->email =$POST[$temp];  
                   $user = User::model()->find($criteria);
                   if($user){
                     $checker=$this->inSquare($squareid, $user->userID);
                     if(!$checker){
                    $notification= new Notifications;
                    $idnotif=rand(1,10000000000000);                                    
                    $crc64no =hash('crc32', $dateCre);                    
                    $crc6no =hash('crc32', $user->email); 
                    $safeToken= $this->generate_token(25);
                    $crc =hash('crc32', $safeToken);
                    $notification->notifID= (String)($idnotif + hexdec($crc64no) + hexdec($crc6no) + hexdec($crc));
                    $notification->creationDate=$dateCre;
                    $notification->notifColor='nada';
                    $notification->status='unread';
                    $notification->notifType='squareinvitation';                                 
                    $notification->userID= $user->userID; 
                    $notification->squareID=$square->squareID;
                    $notification->notifText=$square->name;                  
                    $notification->from=$userModel->firstname.' '.$userModel->lastname;
                    $notification->fromID=Yii::app()->session[Yii::app()->session['userid'].'_user'];
                    $notification->save();
                     }
                   }
                  
                }
               /* while($index>0) {
                $temp="email".$index;
                $criteria = new EMongoCriteria;  
                $criteria->email =$POST[$temp];  
                $user = User::model()->find($criteria);                              
               if(!$this->inSquare($square->squareID, $user->userID)){
                    $notification= new Notifications;
                    $idnotif=rand(1,10000000000000);                                    
                    $crc64no =hash('crc32', $dateCre);                    
                    $crc6no =hash('crc32', $POST[$temp]); 
                    $safeToken= $this->generate_token(25);
                    $crc =hash('crc32', $safeToken);
                    $notification->notifID= (String)($idnotif + hexdec($crc64no) + hexdec($crc6no) + hexdec($crc));
                    $notification->creationDate=$dateCre;
                    $notification->notifColor='nada';
                    $notification->status='unread';
                    $notification->notifType='squareinvitation';                                 
                    $notification->userID= $user->userID; 
                    $notification->squareID=$square->squareID;
                    $notification->notifText=$square->name;                  
                    $notification->from=$userModel->firstname.' '.$userModel->lastname;
                    $notification->fromID=Yii::app()->session[Yii::app()->session['userid'].'_user'];
                    $notification->save();
                    $index= $index-1;
                }    
              
                }*/
                
               
             }
          
	}
        
           public function newMemberInSquare($squareID)
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
                    $square= Squares::model()->findByPk($squareID); 
                    $userModel = User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']);
                    $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                    $dateCre=$date->format('Y-m-d H:i:s');
                    if($square){
                   foreach ($square->squareMembers as $key => $value) {
                    if($value->userID!=Yii::app()->session[Yii::app()->session['userid'].'_user']){                   
                    $notification= new Notifications();
                    $idnotif=rand(1,10000000000000);                                    
                    $crc64no =hash('crc32', $dateCre);                                     
                    $safeToken= $this->generate_token(25);
                    $crc =hash('crc32', $safeToken);
                    $notification->notifID= (String)($idnotif + hexdec($crc64no) + hexdec($crc));
                    $notification->creationDate=$dateCre;
                    $binders=  Binders::model()->findByPk($value->binderID);   
                    $notification->notifColor= $binders->color;
                    $notification->status='unread';
                    $notification->notifType='squareinvitationaccepted';                                 
                    $notification->userID= $value->userID; 
                    $notification->squareID=$square->squareID;
                    $notification->notifText=$square->name;                  
                    $notification->from=$userModel->firstname.' '.$userModel->lastname;
                    $notification->fromID=Yii::app()->session[Yii::app()->session['userid'].'_user'];
                    $notification->save();
                }
                
                 }   
                    }
                    
          
	}
        
          public function squareUpdateNotif($squareid,$dateCre)
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
                                                 
                $square = Squares::model()->findByPk($squareid);
                
                $failed=array();
                $Success=array(); 
                $userModel = User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']);
                foreach ($square->squareMembers as $key => $value) {
                if($value->userID!=Yii::app()->session[Yii::app()->session['userid'].'_user']){
                    $user = User::model()->findByPk($value->userID);                                             
                    $notification= new Notifications();
                    $idnotif=rand(1,10000000000000);                                    
                    $crc64no =hash('crc32', $dateCre);                                     
                    $safeToken= $this->generate_token(25);
                    $crc =hash('crc32', $safeToken);
                    $notification->notifID= (String)($idnotif + hexdec($crc64no) + hexdec($crc));
                    $notification->creationDate=$dateCre;
                    $binders=  Binders::model()->findByPk($value->binderID);   
                    $notification->notifColor= $binders->color;
                    $notification->status='unread';
                    $notification->notifType='squareupdate';                                 
                    $notification->userID= $user->userID; 
                    $notification->squareID=$square->squareID;
                    $notification->notifText=$square->name;                  
                    $notification->from=$userModel->firstname.' '.$userModel->lastname;
                    $notification->fromID=Yii::app()->session[Yii::app()->session['userid'].'_user'];
                     if($notification->save()){
                       $Success[]=array("touser"=>$notification->userID,"squareid"=>$notification->squareID);
                        }  else {
                       $failed[]=array("touser"=>$POST[$temp]);
                      }    
                }
                
                 }  
                 
                 
                 return array($Success, $failed);    
	}
        
        public function mergesort(&$array, $cmp_function = 'percreationdate') { 
    // Arrays of size < 2 require no action. 
        if (count($array) < 2) return; 
        // Split the array in half 
        
        $halfway = round (count($array) / 2); 
        $array1 = array_slice($array, 0, $halfway); 
        $array2 = array_slice($array, $halfway); 
        // Recurse to sort the two halves 
       
        // If all of $array1 is <= all of $array2, just append them. 
        if (new DateTime($array1[count($array1) -1]->creationDate) < new DateTime($array2[0]->creationDate)) { 
            $array = array_merge($array1, $array2); 
            return; 
        } 
        // Merge the two sorted arrays into a single sorted array 
        $array = array(); 
        $ptr1 = $ptr2 = 0; 
        while ($ptr1 < count($array1) && $ptr2 < count($array2)) { 
            if (new DateTime($array1[$ptr1]->creationDate) < new DateTime($array2[$ptr2]->creationDate)) { 
                $array[] = $array1[$ptr1]; 
                $ptr1++;
            } 
            else { 
                $array[] = $array2[$ptr2]; 
                $ptr2++;
            } 
        } 
        // Merge the remainder 
        while ($ptr1 < count($array1)){ 
            $array[] = $array1[$ptr1];
            $ptr1++;
            }
        while ($ptr2 < count($array2)){ 
            $array[] = $array2[$ptr2]; 
            $ptr2++;
        }
        return; 
    } 
    
    public function setAnotherSquareMaster($param) {
        $square= Squares::model()->findByPk($param);
        if($square){
             $dateRef= new DateTime(gmdate('Y-m-d H:i:s')); 
             foreach ($quare->squareMembers as $keysq => $valuesq) {
                 
                 if ($valuesq->userID!=Yii::app()->session[Yii::app()->session['userid'].'_user']) {
                     if (isset($valuesq->dateAdhesion) && !is_null($valuesq->dateAdhesion)) {
                       $currentDate= new DateTime(gmdate($valuesq->dateAdhesion));  
                       if($currentDate<$dateRef){
                         $masterPos=$keysq;
                         $dateRef=$currentDate;
                       }
                     }  
                    $randpos=$keysq;
                   }
             }
            if(isset($masterPos)){
             $quare->squareMembers[$masterPos]->userRole='SquareMaster';   
            }else{
              $quare->squareMembers[$randpos]->userRole='SquareMaster';      
            }
            
           $square->update(); 
         }
     }
            
                                                    
        }

