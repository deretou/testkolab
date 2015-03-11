<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'kolabNX preview',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
                'ext.YiiMongoDbSuite.*',
                'ext.smileys.*',
                'ext.twitteroauth.*',
                'ext.facebookPHP.*',
                'ext.facebookPHP.Facebook.*',
                'ext.facebookPHP.Facebook.HttpClients.*',
                'ext.facebookPHP.Facebook.Entities.*',
                'ext.kolabEXT.*',
                'ext.GmailAPI.*',
                'ext.YahooAPI.*', 
                'ext.Google.*', 
                'ext.Google.src.*', 
                'ext.Google.src.Google.*', 
                'ext.Google.src.Google.Auth.*',
                'ext.Google.src.Google.Service.*', 
                'ext.Google.src.Google.Http.*', 
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		
		/*'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'kolabnxcodegenerator',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
                        // add additional generator path
                        'generatorPaths'=>array(
                            'ext.YiiMongoDbSuite.gii'
                        ),
		),*/
		
	),

	// application components
	'components'=>array(
		'cache'=>array(
                      'class'=>'CApcCache',
                          ), 
              
                'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
             'session' => array(
                        //'class' => 'CDbHttpSession',//Fode Change original
                        'class' => 'CCacheHttpSession',//Fode Change
                        'autoStart' => true,//Fode Change
                        'cacheID' =>'cache',//Fode Change
                        'timeout' => 86400,
                ),
               'sessionCache' => array(
                'class' => 'CMemCache',
                'servers' => array(
                    array( 'host' => '10.0.1.5', 'port' => 11211, 'weight' => 6),
                   /* array( 'host' => '10.0.1.6', 'port' => 11211/*, 'weight' => 3),
                    /*array( 'host' => '10.0.1.7', 'port' => 11211/*, 'weight' => 2),*/
                      ),
                   ),
                 'mongodb' => array(
                        'class'             => 'EMongoDB',
                        'connectionString'  => 'mongodb://kolabdb:yM32elq5fN9Q95q3whk5qnZW5B1VOcP0J7.QjY1EDso-@ds064897-a0.mongolab.com:64897,ds064897-a1.mongolab.com:64896/kolabdb',
                        'dbName'            => 'kolabdb',
                        'fsyncFlag'         => false,
                        'safeFlag'          => false,
                        'useCursor'         => false,
                        'replicaSet' => 'rs-ds064897'
                    ),
		// uncomment the following to enable URLs in path-format
		
		'urlManager'=>array(
			'urlFormat'=>'path',
                        'showScriptName'=>false,
                        'caseSensitive'=>false, 
			'rules'=>array(                                
                                'locker'=>'binders/main',  
                                'locker/<id:\d+>'=>'binders/view',
                                'locker/<action:\w+>/<id:\d+>'=>'binders/<action>',
				'kzone/<id:\d+>'=>'kzone/view',
                                '<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
                    /*array(
                            'articles'=>'article/list',
                            'article/<id:\d+>/*'=>'article/read', important pour moi non dans la config de depart
                        )*/
		),
		/*
		'db'=>array(
			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
		),*/
		// uncomment the following to use a MySQL database
		
		/*'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=kolabNX',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
		),*/	
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@example.com',
	),
);