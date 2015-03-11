<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

class Subscribe extends EMongoDocument
{
	public $email;
	public $token;
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
		return 'subscribers';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('email, token', 'required'),		
			array('email, token', 'length', 'max'=>256),
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


