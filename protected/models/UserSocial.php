<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserSocial
 *
 * @author NXE0002
 */
class UserSocial  extends EMongoDocument
{
	public $userID;	
        public $personalEmail;
        public $workEmail;
        public $otherEmail;
        public $homePhone;
        public $mobilePhone;
        public $otherPhone;
        public $blog;
        public $website;
        public $twitter;
        public $facebook;
        public $googleplus;
        public $skype;
        public $instagram;
        public $linkedin;
        public $tumblr;
        public $youtube;
        public $vimeo;
        public $vine;
        public $flickr;
        public $pinterest;
        public $soundcloud;
        public $deviantart;
        public $dribbble;
        public $behance;
        public $twitch;
        public $steam;
        public $xboxlive;




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
		return 'userssocial';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('userID', 'required'),			
			
			array('userID', 'safe', 'on'=>'search'),
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
