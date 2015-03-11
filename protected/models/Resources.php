<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Resources
 *
 * @author NXE0002
 */
class Resources extends EMongoDocument
{
	public $ressourceID;
        public $sourceName;
        public $name;
        public $path;
        public $type; //link, file
        public $ext;        
        public $description;
        public $squareID;
        public $addedID;
        public $addedFullName;
        public $createDate;  
        public $addedColor;
        public $timestamp;
        public $size;
        public $width;
        public $height;
        public $visiteNumber;
        public $downloadNumber;







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
		return 'ressourceID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'ressources';
	}

      
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('ressourceID,squareID,addedID', 'required'),		
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('ressourceID', 'safe', 'on'=>'search'),
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

