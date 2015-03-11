<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
         private $_id;
	public function authenticate()
	{
		/*$users=array(
	  		// username => password
			'demo'=>'demo',
			'admin'=>'admin',
		);*/
               $criteria = new EMongoCriteria;                        
               $criteria->username =$this->username;                                                        
               $modelUser=Userauthentification::model()->find($criteria);
               if($modelUser){ 
                $userModel = User::model()->findByPk($modelUser->userID);   
                 if(hash('whirlpool', $this->password)!==$modelUser->password)
			 $this->errorCode=self::ERROR_PASSWORD_INVALID;
                  else{                                          
                         $this->_id=$modelUser->userID;
                         $this->setState('name',$userModel->username); 
                         $this->errorCode=self::ERROR_NONE;  
                      }
                			
                 }else{
                        $this->errorCode=self::ERROR_USERNAME_INVALID;      
                }
              
		return !$this->errorCode;
	}
        
        public function getId()
        {
           return $this->_id;
        }
}