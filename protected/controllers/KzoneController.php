<?php

class KzoneController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('displayimage'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('view','addRessourceFile','getResources','getMembers','getMyIdentity','chatManager'),
				'users'=>array('@'),
			),			
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}
        
        /**
	 * 
	 */
	public function actionDisplayimage($id)
	{
		
          $this->render('displayimage',array('link'=>$id,'target'=>'_blank'));   
                
	}
        
         /**
	 * 
	 */
	public function actionChatManager()
	{
	     
               if(Yii::app()->user->isGuest || !isset(Yii::app()->session['userid'])){
                     
                      echo(json_encode(array("status"=>"Failed")));  
                      
                     }else{                    
                     
                      echo(json_encode(array("status"=>"Success","toksqid"=> Yii::app()->session[$_POST['squareID'].'_squareid'])));    
                         
                   }	
         
                
	}
        
        
        /**
	 * 
	 */
	public function actionGetMyIdentity()
	{
	if(Yii::app()->user->isGuest || !isset(Yii::app()->session['userid'])){
                      echo(json_encode(array("status"=>"Failed")));      
                     }else{
                    $model= User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']); 
                  
                     
                    echo(json_encode(array("status"=>"Success","id"=>Yii::app()->session[$_POST['id'].'_squarecurrentuserpos'],"tokn"=> Yii::app()->session['username'],"tok"=>Yii::app()->session[Yii::app()->session['userid'].'_user'],"tokpic"=> $model->photoProfile,"toksqid"=> Yii::app()->session[$_POST['id'].'_squareid'])));     
                   }	
        
                
	}
        
         /**
	 * 
	 */
	public function actionGetResources()
	{
		
              if(isset($_POST['id'])){                  
                   $criteriafile = new EMongoCriteria;  
                   $criteriafile->squareID =Yii::app()->session[$_POST['id'].'_squareid'];
                   $criteriafile->type='file';
                   $squareResourceFiles = Resources::model()->findAll($criteriafile); 

                   $criterialink = new EMongoCriteria;  
                   $criterialink->squareID =Yii::app()->session[$_POST['id'].'_squareid'];
                   $criterialink->type='link';
                   $squareResourceLinks = Resources::model()->findAll($criterialink); 
                  
                  echo(json_encode(array("status"=>"Success","resources"=>array("files"=>$squareResourceFiles,"links"=>$squareResourceLinks)))); 
                }else{
                 echo(json_encode(array("status"=>"Failed1")));    
                }
                
	}
        
         /**
	 * 
	 */
	public function actionGetMembers()
	{
		
              if(isset($_POST['id'])){                                    
                   $quare=  Squares::model()->findByPk(Yii::app()->session[$_POST['id'].'_squareid']);              
                  if($quare){                  
                   echo(json_encode(array("status"=>"Success","members"=>$quare->squareMembers)));                   
                  }else{
                      echo(json_encode(array("status"=>"Failed1")));    
                  } 
                }else{
                 echo(json_encode(array("status"=>"Failed1")));    
                }
                
	}
        
        /**
	 * 
	 * 
	 */
	public function actionAddRessourceFile()
	{
	$data = array();

        if($_SERVER['REQUEST_METHOD'] == 'POST')
        {  
                $error = false;
                $files = array();

                $uploaddir = Yii::app()->basePath.'/data/userTempFile/';
                $tooBig=false;
                $sendblob= new KolabAzureManager(); 
                foreach($_FILES as $file)
                {
                   if (! $file['error'] && $file['size'] < 15*1024*1024) {
                  if (is_uploaded_file($file['tmp_name'])) {
                        $safaty= new UserManager();
                        $safeToken= $safaty->generate_token(25);
                        $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                        $dateCre=$date->format('Y-m-d H:i:s'); 
                        $entente=explode('.',$file['name']);
                         
                        $temp_file =hash('snefru', $dateCre.$file['name']);
                   
                        if(move_uploaded_file($file['tmp_name'],  $uploaddir.$temp_file.'.'.$entente[1]))
                        {
                                
                               
                                $resourceModel= new Resources;
                                $idRessRand=rand(1,10000000000000);
                                $crc64 =hash('crc32', $dateCre);  
                                $crc6  =hash('crc32', $temp_file);                 
                                $crc =hash('crc32', $safeToken);               
                                $resourceModel->ressourceID=(String)($idRessRand + hexdec($crc64) + hexdec($crc6) + hexdec($crc));
                                if(in_array(strtolower($entente[1]), array("png","jpg","gif"))){
                                 list($width, $height, $type, $attr) = getimagesize($uploaddir.$temp_file.'.'.$entente[1]);
                                 $resourceModel->height=$height;
                                 $resourceModel->width=$width;
                                }else{
                                $width=null;
                                $height=null;    
                                }                               
                                $sendblob->createBlob(Yii::app()->session[$_POST['squareid'].'_squareid'], $temp_file.'.'.$entente[1]);   
                                $resourceModel->path='https://cdnzone1.blob.core.windows.net/'.Yii::app()->session[$_POST['squareid'].'_squareid'].'/'.$temp_file;       
                                $resourceModel->addedID=Yii::app()->session[Yii::app()->session['userid'].'_user'];
                                $resourceModel->createDate=$dateCre;
                                $resourceModel->addedColor=Yii::app()->session[$_POST['squareid'].'_squarecurrentuserpos'];
                                $resourceModel->squareID=Yii::app()->session[$_POST['squareid'].'_squareid'];
                                $resourceModel->addedFullName=Yii::app()->session[$_POST['squareid'].'_squarecurrentusername'];
                                $resourceModel->name=$_POST['name_res'];
                                $resourceModel->description=$_POST['desc_res'];
                                $resourceModel->timestamp=$date->getTimestamp();
                                $resourceModel->type='file';
                                $resourceModel->ext=$entente[1];
                                $resourceModel->sourceName=$file['name'];
                                $resourceModel->size=$file['size'];
                                if($resourceModel->save()){
                                  
                                    $files[] = array( "path"=>'https://cdnzone1.blob.core.windows.net/'.Yii::app()->session[$_POST['squareid'].'_squareid'].'/'.$temp_file,
                                                     "id"=>$resourceModel->ressourceID,
                                                     "userpos"=>$resourceModel->addedColor,
                                                      "userFullName"=>$resourceModel->addedFullName,
                                                      "width"=>$width,"height"=>$height,"timezone"=>Yii::app()->session['usertimezoneoffset']
                                              );   
                                }
                                
                           
                               
                        }
                        else
                        {
                            $error = true;
                        }                 
                        }else{
                        $tooBig=true; 
                        break;    
                            
                        }
                          
                    }else{
                        $tooBig=true; 
                        break;
                    }
                        
                }
                if($tooBig){
                  $data = array("status"=>"Failed",'error' => 'Your file is too big (more than 100 MB)');   
                }else{
                  $data = ($error) ? array("status"=>"Failed",'error' => 'There was an error uploading your files') : array("status"=>"Success",'files' => $files);   
                }
               
        }
        else
        {
                $data = array("status"=>"Failed",'error' => 'POST method error');
        }

        echo json_encode($data);
	
                                                             	
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		
              $squareid=substr($id,3);
              $quare=  Squares::model()->findByPk($squareid);              
              if($quare){
                  //--------------------------------------------------------------------------------------------------
                  $squareToken= new KzoneAccessParameters;
                  $safaty= new UserManager();                    
                  $date= new DateTime(gmdate('Y-m-d H:i:s'));                                                          
                  $dateCre=$date->format('Y-m-d H:i:s');                                             
                  $crc64 =hash('crc32', $dateCre); 
                  $safaty= new UserManager();
                  $safeToken= $safaty->generate_token(25);
                  $crc =hash('crc32', $safeToken);
                  $id1=rand(1,10000000000000);   
                  $squareToken->accessHash=(String)($id1 + hexdec($crc64) + hexdec($crc));
                  $squareToken->squareID=$quare->squareID;
                  $squareToken->userID=Yii::app()->session[Yii::app()->session['userid'].'_user'];
                  //------------------------------------------------------------------------------------------------------
                  foreach ($quare->squareMembers as $memb) {
                    if($memb->userID==Yii::app()->session[Yii::app()->session['userid'].'_user']){
                    $theMember=$memb;
                    break;
                    }  
                  }
                if($theMember){
                 $modelBinder=  Binders::model()->findByPk($theMember->binderID);  
                 if($modelBinder){
                   Yii::app()->session[$id.'_squarecolor']= $modelBinder->color; 
                   Yii::app()->session[$id.'_squarename']=  $quare->name; 
                   Yii::app()->session[$id.'_squareid']= $squareid; 
                   Yii::app()->session[$id.'_squarecurrentuserpos']=  $theMember->userColor; 
                   Yii::app()->session[$id.'_squarecurrentusername']=  $theMember->firstname.' '.$theMember->lastname;                     
                 }
                }  
              }
              
              if($squareToken->save()){
                   Yii::app()->session[$id.'_userid']= $squareToken->accessHash; 
                   $this->render('view',array('target'=>'_blank'));
              }
             
	}


	

	

	

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id)
	{
		$model=Kzone::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='kzone-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
