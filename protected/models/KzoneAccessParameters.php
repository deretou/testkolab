<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of KzoneAccessParameters
 *
 * @author NXE0002
 */
class KzoneAccessParameters extends EMongoDocument
{
	public $accessHash;
        public $userID;
        public $squareID;
        public $accessDate;
       



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
		return 'accessHash';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'kzoneaccessparameters';
	}

      
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('accessHash, userID, squareID', 'required'),		
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('accessHash', 'safe', 'on'=>'search'),
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