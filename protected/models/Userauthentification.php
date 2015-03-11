<?php

/**
 * This is the MongoDB Document model class based on table "userauthentification".
 */
class Userauthentification extends EMongoDocument
{
	public $userID;
	public $username;
	public $password;
	public $lastModification;

	/**
	 * Returns the static model of the specified AR class.
	 * @return Userauthentification the static model class
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
		return 'userauthentification';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('userID, username, password, lastModification', 'required'),
			/*array('userID', 'numerical', 'integerOnly'=>true),
			array('username', 'length', 'max'=>100),
			array('password', 'length', 'max'=>256),*/
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('userID, username, password, lastModification', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'userID' => 'User',
			'username' => 'Username',
			'password' => 'Password',
			'lastModification' => 'Last Modification',
		);
	}
}