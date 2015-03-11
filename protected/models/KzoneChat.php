<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of KzoneChat
 *
 * @author NXE0002
 */
class KzoneChat extends EMongoDocument
{
	public $kzonechatID;
        public $fromID;
        public $fromPic;
        public $fromFullName;
        public $squareID;            
        public $body;   
        public $createDate;          
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
		return 'kzonechatID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'kzonechatmessages';
	}

      
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('kzonechatID,fromID,squareID', 'required'),		
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('kzonechatID', 'safe', 'on'=>'search'),
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

