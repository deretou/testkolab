<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Reset password</title>

<!--JAY MACHALANI, NXE CORPORATION|KOLAB. ALL RIGHTS RESERVED 2013, KOLABNX3 FRONT-END-->

<link href='http://fonts.googleapis.com/css?family=Exo:400,500|Cabin:400,500,600,700' rel='stylesheet' type='text/css' />

<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/ind_style.css" />

<link rel="icon" type="image/x-icon" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/favicon.ico" />
<script type="text/javascript" >       
        var http_base='<?php echo Yii::app()->getBaseUrl(true); ?>';   
         var controleur='<?php echo Yii::app()->getController()->getAction()->controller->id; ?>';
        var controleurView='<?php echo Yii::app()->getController()->getAction()->controller->action->id; ?>';               
       
        </script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-2.1.1.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/plugins.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/ind_engine.js"></script>
<script data-main="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/nxeHelper" src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/require.js"></script>      
</head>

<body>
   <?php  echo $content;  ?>      
</body>
</html>

