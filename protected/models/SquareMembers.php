<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SquareMembers
 *
 * @author NXE0002
 */
class SquareMembers extends EMongoDocument
{
	public $userID;	
        public $userColor;// 1,2,3,4,5,6,7,8 or null
        public $userRole;//member, squaremaster,none             
        public $binderID;
        public $firstname;
	public $lastname;
        public $photoProfile; 
        public $dateAdhesion;





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
		return '_id';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'squaresmembers';
	}
}
