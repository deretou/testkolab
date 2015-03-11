<?php
require_once 'WindowsAzure/WindowsAzure.php';
use WindowsAzure\Common\ServicesBuilder;
use WindowsAzure\Blob\Models\CreateContainerOptions;
use WindowsAzure\Blob\Models\PublicAccessType;
use WindowsAzure\Common\ServiceException;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of KolabAzureManager
 *
 * @author NXE0002
 */
class KolabAzureManager {
    //put your code here
    private $connectionString="DefaultEndpointsProtocol='http';AccountName='cdnzone1';AccountKey='UzdXtsgIFq4TRYXYRLpTulx/OV9ruzUKlwrEH3OSFdQ80KBnt002Q6qmfITu8BE9fZknBdBFzDfFnpnOrt/Etw=='";
    private $connectionStringEuropa="DefaultEndpointsProtocol='http';AccountName='cdnzone2';AccountKey='ix6FPB6QnutNEsrkvlZhdicIhZcfACaa6nJSqd5CWZaHSpO9oTe8y1ujzP2yXDaS+6akL7fD/1HfdE7V75BjmQ=='";
    private $connectionStringAsia="DefaultEndpointsProtocol='http';AccountName='cdnzone3';AccountKey='2DHkggKMNG7HQjj73lSJVVcdSZaEHZrvosft89Irtb7UrBHIca/qYyCLo094WfDlF2gUoGHxcsIl+I7JwzMxbg=='";
      /*
  * Function : constructor
  */   
    public function __construct()
	{  
	}
        
    public function createBlob($container,$blob_name) {
                                $blobRestProxy = ServicesBuilder::getInstance()->createBlobService($this->connectionString);
                                $createContainerOptions = new CreateContainerOptions(); 

                                $createContainerOptions->setPublicAccess(PublicAccessType::CONTAINER_AND_BLOBS);                               


                                try {
                                    // Create container.
                                     $blob_list = $blobRestProxy->listContainers();
                                    $blobs = $blob_list->getContainers();
                                    $containersExists=false;
                                    foreach($blobs as $blob)
                                    {
                                        if($container==$blob->getName()){
                                         $containersExists=true; 
                                         break;
                                        }                                       
                                    }

                                    if(!$containersExists){
                                    $blobRestProxy->createContainer($container, $createContainerOptions);    
                                    }                               
                                }
                                catch(ServiceException $e){
                                    // Handle exception based on error codes and messages.
                                    // Error codes and messages are here: 
                                    // http://msdn.microsoft.com/en-us/library/windowsazure/dd179439.aspx
                                    $code = $e->getCode();
                                    $error_message = $e->getMessage();
                                    echo $code.": ".$error_message."<br />";
                                }
                                                                
                                $content = fopen(Yii::app()->basePath."/data/userTempFile/$blob_name", "r");
                                //$content =  file_get_contents(Yii::app()->basePath.'/data/5323696518372/pdfo4JoVbBCBlTeW98jg7P3aPIY4z097ea09653b6.jpg.jpg');                               

                                try {
                                    //Upload blob
                                    $nameblob=  explode('.', $blob_name);
                                    $blobRestProxy->createBlockBlob($container, $nameblob[0], $content);
                                     //unlink(Yii::app()->basePath."/data/userTempFile/$blob_name");
                                }
                                catch(ServiceException $e){
                                    // Handle exception based on error codes and messages.
                                    // Error codes and messages are here: 
                                    // http://msdn.microsoft.com/en-us/library/windowsazure/dd179439.aspx
                                    $code = $e->getCode();
                                    $error_message = $e->getMessage();
                                    echo $code.": ".$error_message."<br />";
                                }
                           
    }
    
    public function deleteBlob($container,$blob_name) {
                                 $blobRestProxy = ServicesBuilder::getInstance()->createBlobService($this->connectionString);
                                  try {
                                        // Delete container.
                                        $blobRestProxy->deleteBlob($container, $blob_name);
                                    }
                                    catch(ServiceException $e){
                                        // Handle exception based on error codes and messages.
                                        // Error codes and messages are here: 
                                        // http://msdn.microsoft.com/en-us/library/windowsazure/dd179439.aspx
                                        $code = $e->getCode();
                                        $error_message = $e->getMessage();
                                        echo $code.": ".$error_message."<br />";
                                    } 
    }
    
    
        /*
     * 
     * 
     */
    
    public function downloadBlob($containerName, $blobName){
                        $blobRestProxy = ServicesBuilder::getInstance()->createBlobService($this->connectionString);
                                   try {
                                        // Delete blob.
                                        $blob =  $blobRestProxy->getBlob($containerName,$blobName);
                                        fpassthru($blob->getContentStream());
                                    }
                                    catch(ServiceException $e){
                                        // Handle exception based on error codes and messages.
                                        // Error codes and messages are here: 
                                        // http://msdn.microsoft.com/en-us/library/windowsazure/dd179439.aspx
                                        $code = $e->getCode();
                                        $error_message = $e->getMessage();
                                        echo $code.": ".$error_message."<br />";
                                    }
        
    }
    
    
    
public function createBlobInEuropa($container,$blob_name) {
                                $blobRestProxy = ServicesBuilder::getInstance()->createBlobService($this->connectionStringEuropa);
                                $createContainerOptions = new CreateContainerOptions(); 

                                $createContainerOptions->setPublicAccess(PublicAccessType::CONTAINER_AND_BLOBS);                               


                                try {
                                    // Create container.
                                     $blob_list = $blobRestProxy->listContainers();
                                    $blobs = $blob_list->getContainers();
                                    $containersExists=false;
                                    foreach($blobs as $blob)
                                    {
                                        if($container==$blob->getName()){
                                         $containersExists=true; 
                                         break;
                                        }                                       
                                    }

                                    if(!$containersExists){
                                    $blobRestProxy->createContainer($container, $createContainerOptions);    
                                    }                               
                                }
                                catch(ServiceException $e){
                                    // Handle exception based on error codes and messages.
                                    // Error codes and messages are here: 
                                    // http://msdn.microsoft.com/en-us/library/windowsazure/dd179439.aspx
                                    $code = $e->getCode();
                                    $error_message = $e->getMessage();
                                    echo $code.": ".$error_message."<br />";
                                }
                                                                
                                $content = fopen(Yii::app()->basePath."/data/userTempFile/$blob_name", "r");
                                //$content =  file_get_contents(Yii::app()->basePath.'/data/5323696518372/pdfo4JoVbBCBlTeW98jg7P3aPIY4z097ea09653b6.jpg.jpg');                               

                                try {
                                    //Upload blob
                                    $nameblob=  explode('.', $blob_name);
                                    $blobRestProxy->createBlockBlob($container, $nameblob[0], $content);
                                     //unlink(Yii::app()->basePath."/data/userTempFile/$blob_name");
                                }
                                catch(ServiceException $e){
                                    // Handle exception based on error codes and messages.
                                    // Error codes and messages are here: 
                                    // http://msdn.microsoft.com/en-us/library/windowsazure/dd179439.aspx
                                    $code = $e->getCode();
                                    $error_message = $e->getMessage();
                                    echo $code.": ".$error_message."<br />";
                                }
                           
    }    
  

public function createBlobInAsia($container,$blob_name) {
                                $blobRestProxy = ServicesBuilder::getInstance()->createBlobService($this->connectionStringAsia);
                                $createContainerOptions = new CreateContainerOptions(); 

                                $createContainerOptions->setPublicAccess(PublicAccessType::CONTAINER_AND_BLOBS);                               


                                try {
                                    // Create container.
                                     $blob_list = $blobRestProxy->listContainers();
                                    $blobs = $blob_list->getContainers();
                                    $containersExists=false;
                                    foreach($blobs as $blob)
                                    {
                                        if($container==$blob->getName()){
                                         $containersExists=true; 
                                         break;
                                        }                                       
                                    }

                                    if(!$containersExists){
                                    $blobRestProxy->createContainer($container, $createContainerOptions);    
                                    }                               
                                }
                                catch(ServiceException $e){
                                    // Handle exception based on error codes and messages.
                                    // Error codes and messages are here: 
                                    // http://msdn.microsoft.com/en-us/library/windowsazure/dd179439.aspx
                                    $code = $e->getCode();
                                    $error_message = $e->getMessage();
                                    echo $code.": ".$error_message."<br />";
                                }
                                                                
                                $content = fopen(Yii::app()->basePath."/data/userTempFile/$blob_name", "r");
                                //$content =  file_get_contents(Yii::app()->basePath.'/data/5323696518372/pdfo4JoVbBCBlTeW98jg7P3aPIY4z097ea09653b6.jpg.jpg');                               

                                try {
                                    //Upload blob
                                    $nameblob=  explode('.', $blob_name);
                                    $blobRestProxy->createBlockBlob($container, $nameblob[0], $content);
                                     //unlink(Yii::app()->basePath."/data/userTempFile/$blob_name");
                                }
                                catch(ServiceException $e){
                                    // Handle exception based on error codes and messages.
                                    // Error codes and messages are here: 
                                    // http://msdn.microsoft.com/en-us/library/windowsazure/dd179439.aspx
                                    $code = $e->getCode();
                                    $error_message = $e->getMessage();
                                    echo $code.": ".$error_message."<br />";
                                }
                           
    }     
    
}
