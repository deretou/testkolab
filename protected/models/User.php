<?php

/**
 * This is the MongoDB Document model class based on table "user".
 */
class User extends EMongoDocument
{
	public $userID;
	public $email;
	public $firstname;
	public $lastname;
        public $username;
        public $gender; //student, teacher, professional, other
        public $adhesionDate;
	public $adhesionLocation;
        public $twitterID;
        public $facebookID;
        public $userTimeZoneOffset;
        public $profilComplet; //
        public $city;
        public $country;
        public $userLanguage;
        public $about;
        public $photoProfile;              
        public $binderList;
        public $bindersortPreference;//usercustumizedsort
        public $accessCodeVerified; // yes or no
    




        public $invitedBy;

        /**
	 * Returns the static model of the specified AR class.
	 * @return User the static model class
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
		return 'userID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'users';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('userID, email, firstname, lastname, adhesionDate', 'required'),			
			
			array('userID, email, firstname, lastname, adhesionDate', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'userID' => 'User',
			'email' => 'Email',
			'firstname' => 'Firstname',
			'lastname' => 'Lastname',
			'adhesionDate' => 'Adhesion Date',			
		);
	}
}