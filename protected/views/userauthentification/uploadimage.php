<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
if (!isset(Yii::app()->session['useremail'])){
  header("Location: ".Yii::app()->getBaseUrl(true));  
}

$this->layout = "//layouts/imageCropLayout";
if($model){
?>

<div id="wrapper">
<div id="left_content" style="float:left;width:158px;height:auto;">

<div id="profile_pic">
<img id="thumb"/>
</div>

</div>
<div style="float:right;width:804px;">
<form id="upload_form"  >
	<input type="hidden" id="w" name="w" />
    <input type="hidden" id="h" name="h" />
    <input type="hidden" id="x1" name="x1" />
    <input type="hidden" id="y1" name="y1" />
    <input type="hidden" id="x2" name="x2" />
    <input type="hidden" id="y2" name="y2" />
<h1>Change Profile Picture</h1>
<div class="file_field">
<strong>Select An Image: </strong>
<input type="file" style="width:220px;" id="image_file" name="image_file">
<input type="submit" value="Upload"/>
</div>
<br/>
<div class="error" style="display: none;">
Manish Kumar Jangir
</div>
<br/>
<div id="image_div" style="display:none; ">
<img src="" id="load_img"/>
<br/>

</div>
</form>
</div>

<div style="clear: both"></div>
</div>


<?php 
}else{
  header("Location: ".Yii::app()->getBaseUrl(true));    
}
?>