<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Binders
 *
 * @author NXE0002
 */
class Binders extends EMongoDocument
{
	public $binderID;
        public $userID;
        public $name;
        public $color;
        public $style;
        public $description;
        public $creationDate;
        public $lastUpdateDate;
        public $squaresOrdre;
        public $squaresortPreference;
        public $squaresList;



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
		return 'binderID';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'binders';
	}

        // add EmbeddedArraysBehavior
       public function behaviors()
        {
          return array(
            array(
              'class'=>'ext.YiiMongoDbSuite.extra.EEmbeddedArraysBehavior',
              'arrayPropertyName'=>'squaresList', // name of property
              'arrayDocClassName'=>'SquaresList' // class name of documents in array
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
			array('binderID,description,userID,name,color,creationDate', 'required'),		
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('binderID,userID', 'safe', 'on'=>'search'),
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

