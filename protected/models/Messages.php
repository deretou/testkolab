<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Messages
 *
 * @author NXE0002
 */
class Messages extends EMongoDocument
{
	public $messageID;
        public $fromID;
        public $fromPic;
        public $fromFullName;
        public $toID;
        public $toPic;
        public $toFullName;
        public $subject;
        public $body;
        public $status;
        public $createDate;
        public $readDate;       
        public $timestamp;
        
       



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
		return 'messageID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'messages';
	}

      
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('messageID,fromID,toID', 'required'),		
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('messageID', 'safe', 'on'=>'search'),
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
