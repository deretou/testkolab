<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
         // if(!Yii::app()->user->isGuest && isset(Yii::app()->session['userid'])){              
         //  header("Location: ".Yii::app()->request->baseUrl."/index.php/user/locker?action=main"); 
           // }else{
             Yii::app()->user->logout();
           // header("Location: ".Yii::app()->request->baseUrl."/index.php/userauthentification/login"); 
             $this->render('/userauthentification/login');
           // }
            
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
		$model=new ContactForm;
		if(isset($_POST['ContactForm']))
		{
			$model->attributes=$_POST['ContactForm'];
			if($model->validate())
			{
				$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				$headers="From: $name <{$model->email}>\r\n".
					"Reply-To: {$model->email}\r\n".
					"MIME-Version: 1.0\r\n".
					"Content-Type: text/plain; charset=UTF-8";

				mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
				$this->refresh();
			}
		}
		$this->render('contact',array('model'=>$model));
	}

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		
		// display the login form
		//$this->render('login');
                //header("Location: ".Yii::app()->request->baseUrl."/userauthentification/login"); 
              //  $this->render('/userauthentification/login');
                $this->redirect('index');
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		UsersOnline::model()->deleteByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']);
               /* $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                $dateCre=$date->format('Y-m-d H:i:s'); 
                $userSessionModel=UsersSessions::model()->findByPk(Yii::app()->session['usersessionid']);
                if($userSessionModel) {
                 $userSessionModel->sessionEndDate= $dateCre;
                 $userSessionModel->update();
                }*/
                Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}
        
        
        /*
         * 
         * 
         */
        
        public function actionSmileyParser()
	{
             if(isset($_POST['body'])){
                 Yii::import('application.extensions.smileys.SmileysParser');
               $content=SmileysParser::parse($_POST['body'],'default');    
               echo(json_encode(array("body"=>$content)));     
             }
            
        }
}