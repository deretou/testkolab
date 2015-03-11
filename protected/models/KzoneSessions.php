<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of KzoneSessions
 *
 * @author NXE0002
 */
class KzoneSessions extends EMongoDocument
{
	
        public $userID; 
        public $kzonesessionID;
        public $squareID;
        public $sessionStartDate;
        public $sessionEndDate;



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
		return 'kzonesessionID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'kzonesessions';
	}
       
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('userID,kzonesessionID,squareID', 'required'),		
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('userID,kzonesessionID,squareID', 'safe', 'on'=>'search'),
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