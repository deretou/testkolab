<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
if (!Yii::app()->user->isGuest){
  header("Location: ".Yii::app()->user->returnUrl); 
}
 $traductor=new NXETraductor("en");  
echo ' test';
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>kolab</title>
<meta name="description" content="kolab is a social collaboration platform for students, artists and professionals." />
<meta name="keywords" content="kolab,social,collaboration,education,platform,students,online,free,web,team,teamwork,work">
<meta name="author" content="NXE">

<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@gomagenta">
<meta name="twitter:title" content="kolab [preview beta]">
<meta name="twitter:description" content="kolab is a social collaboration platform for students, artists and professionals.">
<meta name="twitter:creator" content="@technofou">
<meta name="twitter:image" content="http://cdn.kolab.co/kolabnxfront/img/page/fb.png">

<meta property="og:title" content="kolab [preview beta]" />
<meta property="og:type" content="website" />
<meta property="og:image" content="http://cdn.kolab.co/kolabnxfront/kolabNXFront/img/page/fb.png" />
<meta property="og:description" content="kolab is a social collaboration platform for students, artists and professionals." />
<meta property="fb:admins" content="jmachalani" />

<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/page_style.css" />

<link rel="icon" type="image/x-icon" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/favicon.ico" />
<script type="text/javascript" > 
     
        var http_base='<?php echo Yii::app()->getBaseUrl(true); ?>';   
        var controleur='<?php echo Yii::app()->getController()->getAction()->controller->id; ?>';
        var controleurView='<?php echo Yii::app()->getController()->getAction()->controller->action->id; ?>';  
    
        </script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-2.1.3.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/plugins.js"></script>

<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/magic/TweenMax.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/magic/jquery.gsap.min.js"></script>

<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/page_engine.js"></script>
<script data-main="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/nxeHelper" src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/require.js"></script>
<style>
#wait{width:100%;background-color:#FF0063;background-image:url(http://cdn.kolab.co/kolabnxfront/img/page/load.gif);background-repeat:repeat;position:fixed;top:0;left:0;z-index:10;}
.wait_on{height:10px}
.wait_off{height:0px}
</style>
</head>

<body>
<div id="wait" class="t02 wait_off"></div>
<div id="container">
<?php  echo $content;  ?>  
</div>

</body>
</html>
