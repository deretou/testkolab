<?php

/**
 * This is the MongoDB Document model class based on table "keyaccesscode".
 */
class KeyAccessCode extends EMongoDocument
{
	public $keyCode;       	
	public $creationDate;
        public $status; //used, unused
        public $usingDate;
        public $type; // reason of creation        
        public $expirationDate;
        public $usedBy;      
        public $generatedBy;
        public $usinglocation;

	/**
	 * Returns the static model of the specified AR class.
	 * @return KeyAccessCode the static model class
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
		return 'keyCode';
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'kolabkeyaccesscodes';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('keyCode', 'required'),			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('keyCode', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		
	}
}