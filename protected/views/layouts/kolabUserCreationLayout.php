<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 $modelSub=Subscribe::model()->findByPk(Yii::app()->session['useremail']);
 $c = new EMongoCriteria;
 $c->email('==', Yii::app()->session['useremail']);
 $subscriber = User::model()->find($c);
 $modelImport=UserInfoImported::model()->findByPk(Yii::app()->session['useremail']);
  $position=0;  
 if($subscriber){
  $position=$subscriber->profilComplet;   
 }
 if($modelImport && !isset($subscriber)){
   $position=1;  
 } 
 
 //----------------------------------------------
 
 //---------------------------
  if($modelImport && isset($modelImport->photoProfile) &&  $position==2){     
     // echo $modelImport->photoProfile;
       $upload_dir = Yii::app()->basePath.'/../tempData/userTempFile/';
       $temp_file = $upload_dir. hash('snefru', Yii::app()->session['useremail']);
       $upload_dirR = Yii::app()->basePath.'/data/userTempFile/';
       $temp_fileR = $upload_dirR. hash('snefru', Yii::app()->session['useremail']);
      if($modelImport->from=="twitter"){ 
       $ext=  explode('.', $modelImport->photoProfile);      
       copy($modelImport->photoProfile,$temp_file.'_original.'.$ext[count($ext)-1]);
       copy($modelImport->photoProfile,$temp_fileR.'_original.'.$ext[count($ext)-1]);
      $profileURL=Yii::app()->getBaseUrl(true).'/tempData/userTempFile/'.hash('snefru', Yii::app()->session['useremail']).'_original.'.$ext[count($ext)-1];   
      }elseif($modelImport->from=="facebook"){
           //--------------------------------         
         $url = $modelImport->photoProfile;
          $data = file_get_contents($url);        
          
          $fp = fopen($temp_file."_original.jpg","wb");
          $fp2 = fopen($temp_fileR."_original.jpg","wb");
          
          if($fp){ 
            fwrite($fp, $data);          
          }
           fclose($fp);
          if($fp2){ 
            fwrite($fp2, $data);          
          }
          
          fclose($fp2);
         //-----------------------------------------
          
       $profileURL=Yii::app()->getBaseUrl(true).'/tempData/userTempFile/'.hash('snefru', Yii::app()->session['useremail']).'_original.jpg';     
      }
      
  }else{
      $profileURL='';     
  }
  $gmailfriendslist='';
  if(isset(Yii::app()->session['gmailfriendslist'])){
     $gmailfriendslist= Yii::app()->session['gmailfriendslist'];
  }
  $yahoofriendslist='';
  if(isset(Yii::app()->session['yahoofriendslist'])){
     $yahoofriendslist= Yii::app()->session['yahoofriendslist'];
  }
  $microsoftfriendslist='';
  if(isset(Yii::app()->session['microsoftfriendslist'])){
     $microsoftfriendslist= Yii::app()->session['microsoftfriendslist'];
  }
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Create account</title>

<link type="text/css" rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/ind_style.css" />

<link rel="icon" type="image/x-icon" href="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/favicon.ico" />
<script type="text/javascript" >       
        var http_base='<?php echo Yii::app()->getBaseUrl(true); ?>';   
         var controleur='<?php echo Yii::app()->getController()->getAction()->controller->id; ?>';
        var controleurView='<?php echo Yii::app()->getController()->getAction()->controller->action->id; ?>';        
        var profileURL='<?php echo $profileURL;?>'; 
        var microsoftfriendslist='<?php echo $microsoftfriendslist;?>'; 
        var yahoofriendslist='<?php echo $yahoofriendslist;?>'; 
        var gmailfriendslist='<?php echo $gmailfriendslist;?>'; 
       
        </script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-2.1.3.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/jquery/jquery-ui.custom.min.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/misc/plugins.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/ind_engine.js"></script>
<script data-main="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/nxeHelper" src="<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/js/require.js"></script>              
<script type="text/javascript">
    position=parseInt('<?php echo $position; ?>');//position in account creation	
    $(document).ready(function(){
		page='create';
		var elem=$("#number");
		$("#about").limiter(160, elem);
		
		$('textarea').bind('keypress',function(e){
			if((e.keyCode || e.which)==13){
			$(this).parents('form').submit();
			return false;
		  }
		});
		
               if(profileURL!=''){
		$('.image-editor').cropit({
			imageState:{src:profileURL}
		});
		}else{
                $('.image-editor').cropit({
			imageState:{src:'<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/img/page/default.gif'}
		});
                }
		
		function checkMap(){
			if((parseInt($('#container').css('height')))<709){$('#map').css({marginRight:'18px'});}
			else{$('#map').css({marginRight:'0px'});}
		}
		checkMap();
		$(window).resize(function(){checkMap();});
	});
</script>

</head>

<body>

    
  <?php  echo $content;  ?>      
</body>
</html>
