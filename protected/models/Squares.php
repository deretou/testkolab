<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Squares
 *
 * @author NXE0002
 */
class Squares extends EMongoDocument
{
	public $squareID;     
       // public $ownerID;
        public $name; 
        public $description;
        public $deadline;
        public $deadlineTimestamp;
        public $creationDate;
        public $creationDateTimestamp;
        public $status;//active or inactive
        public $availabledcolors;//"00CC00,0099FF,FF5300,9226FF,FFBF00,FF4DFF,00B2B2,BDCC0B"; use user1, user2 .... instead of colors      
        public $lastChangeDate;
        public $squareMembers;
        public $squareMasterNumber;



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
		return 'squareID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'squares';
	}
// add EmbeddedArraysBehavior
       public function behaviors()
        {
          return array(
            array(
              'class'=>'ext.YiiMongoDbSuite.extra.EEmbeddedArraysBehavior',
              'arrayPropertyName'=>'squareMembers', // name of property
              'arrayDocClassName'=>'SquareMembers' // class name of documents in array
            ),
          );
        }
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('squareID,name,creationDate,description', 'required'),		
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('squareID', 'safe', 'on'=>'search'),
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


