<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'WindowsAzure/WindowsAzure.php';
use WindowsAzure\Common\ServicesBuilder;
use WindowsAzure\Blob\Models\CreateContainerOptions;
use WindowsAzure\Blob\Models\PublicAccessType;
use WindowsAzure\Common\ServiceException;
$squareID='fodetest1234';
$connectionString="DefaultEndpointsProtocol='http';AccountName='kolabusacdn';AccountKey='VwmR/TUI8BXx51e+ZJDtN3cNF2qkehZzxBppwuet3yuCHhp29C7jGeJ184QOGBL+qlCt9lblwZkrZQenr4+AvQ=='";
$blobRestProxy = ServicesBuilder::getInstance()->createBlobService($connectionString);
$createContainerOptions = new CreateContainerOptions(); 

$createContainerOptions->setPublicAccess(PublicAccessType::CONTAINER_AND_BLOBS);
$createContainerOptions->addMetaData("keyy", "value1b");
$createContainerOptions->addMetaData("keyy", "value2b");


try {
    // Create container.
     $blob_list = $blobRestProxy->listContainers();
    $blobs = $blob_list->getContainers();
    $containersExists=false;
    foreach($blobs as $blob)
    {
        if($squareID==$blob->getName()){
         $containersExists=true; 
         break;
        }                                       
    }

    if(!$containersExists){
    $blobRestProxy->createContainer($squareID, $createContainerOptions);    
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
                                
