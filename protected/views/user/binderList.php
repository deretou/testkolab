<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(isset($model) && !is_null($model)){
?>
<p class="view_title">Select</p>

<p class="view_line">Binder</p>
<?php 
if(count($model)>0){
    
  foreach ($model as $key => $binder) {
        
   
    
 ?>
 <div class="selectbinder_frame">
    	<div id="bselect_<?php echo $binder->binderID; ?>" onClick="selectbinder('<?php echo $binder->binderID; ?>')" design="<?php if(isset($binder->style) && !is_null($binder->style)){echo $binder->style;}else{ echo '';} ?>" class="t02 tipsafe selectbinder_map tp" tip="<?php echo ucfirst($binder->name); ?>" colour="<?php echo $binder->color; ?>" style="background-color:#<?php echo $binder->color; ?>;">
            <div class="t015 selectbinder_stylem" <?php if(isset($binder->style) && !is_null($binder->style)){
          echo 'style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/'.$binder->style.'.png);"';} ?> ></div>
        </div> 
  </div>

     <?php   
}
 }

?>
<script type="text/javascript" > 

        tooltip_refresh(); 
        </script> 
<?php
}else{
    echo '';  
}

