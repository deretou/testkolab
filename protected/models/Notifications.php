<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Notifications
 *
 * @author NXE0002
 */
class Notifications extends EMongoDocument
{
	public $userID;       
	public $notifID;
        public $notifType; //kolabinvitation, kolabinvitationaccepted, squareinvitation, squareinvitationaccepted, squareupdate, kolabevent, newmessage, masterinvitation
        public $notifText;
        public $notifColor;
        public $from;
        public $fromID;
        public $squareID;
	public $creationDate;
        public $decisionDate;
        public $invitationDecision;
        public $status; //read, unread

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
		return 'notifID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'notifications';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('userID, notifID, notifType, creationDate', 'required'),
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
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
