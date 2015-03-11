<?php
/* @var $this SiteController */
if (Yii::app()->user->isGuest){
  header("Location: ".Yii::app()->getBaseUrl(true));  
}
//print_r($model);
?>

<script type="text/javascript"> 
    
 var offset1=new Date().getTimezoneOffset()/(-60) ;
   
  var d = new Date();  
var str= d.toTimeString();

var n=str.split("(");
var str=n[0].split("T");
var offset=str[1].substring(0,str[1].length-3);
if(parseInt(offset)===offset1){
  //console.log(parseInt(offset));  
}

   
</script>

        	<p id="demo1" class="demo_text">hello to</p>
            <p id="demo2" class="demo_text" style="background:#FF0063;font-size:60px;padding:40px;">framework 0.2</p>
            <p id="demo3" class="demo_text" style="font-size:26px">chat & notifications</p>
            <p id="demo4" class="demo_text" style="font-size:26px;margin-top:-5px;">enhancements</p>