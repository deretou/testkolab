<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserInfoImported
 *
 * @author NXE0002
 */
class UserInfoImported  extends EMongoDocument
{
	public $email;
	public $from;
        public $firstname;
	public $lastname;
        public $username;
        public $gender;
        public $userID;
        public $photoProfile;
        // public $verifyCode;
	

	/**
	 * Returns the static model of the specified AR class.
	 * @return Ressources the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * returns the primary key field for this model
	 */
	public function primaryKey()
	{
		return 'email';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'userprofileimported';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('email,from', 'required'),					
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
                     //   array('verifyCode', 'captcha', 'allowEmpty'=>!CCaptcha::checkRequirements()),
			array('email', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			
		);
	}
}