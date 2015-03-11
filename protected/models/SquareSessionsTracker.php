<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SquareSessionsTracker
 *
 * @author NXE0002
 */
class SquareSessionsTracker  extends EMongoDocument{
    //put your code here
        public $userID;	
        public $sessionID;
        public $squareID;
        public $startDate;
        public $endDate;
      





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
		return 'sessionID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'squaressessionstracking';
	}
}
