<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$currentBinder=Binders::model()->findByPk(Yii::app()->session['currentBinderID']);
         
     // print_r($currentBinder);
      
?>
<div class="bndSquareList">
<div class="bndIcone" style=" background-color:#<?php echo $currentBinder->color; ?>" onClick=" showLockerMain();"></div>
<div class="squaresList">
 <?php if (count($model->squaresList)>0) {
   
    foreach ($model->squaresList as $key => $val) {
        
     

 ?>
 <div class="square"  id="<?php echo $val->squareID; ?>" style=" background-color:#<?php echo $currentBinder->color; ?>"><p class="squareTitle" ><?php echo $val->squareName; ?></p>
 <div class="squareClickZone" style="cursor:pointer; height: 70px;" onclick="openSquare(this);"></div>
 </div>
 <?php 

    }  
    }
?>
<!--div class="square" style=" background-color:#<?php //echo $currentBinder->color; ?>"><p class="squareTitle" >Nom 1</p></div>
<div class="square" style=" background-color:#<?php //echo $currentBinder->color; ?>"><p class="squareTitle" >Nom 2</p></div>
<div class="square" style=" background-color:#<?php //echo $currentBinder->color; ?>"><p class="squareTitle" >Nom 3</p></div>
<div class="square" style=" background-color:#<?php //echo $currentBinder->color; ?>"><p class="squareTitle" >Nom 4</p></div>
<div class="square" style=" background-color:#<?php //echo $currentBinder->color; ?>"><p class="squareTitle" >Nom 5</p></div>
<div class="square" style=" background-color:#<?php //echo $currentBinder->color; ?>"><p class="squareTitle" >Nom 6</p></div-->

</div>
<div class="bindersList">
<?php 
if (count($model->bindersList)>0) {
   
    foreach ($model->bindersList as $key => $value) {
        
     

 ?>   
    <div class="binder" style="background-color:#<?php echo $value->color; ?>" id="<?php echo $value->binderID; ?>"><p class="binderTitle" > <?php echo $value->name; ?></p>
        <div class="binderClickZone" style="cursor:pointer; height: 100px;" onClick="showSquareList(this);"></div>
    </div>

<?php 

    }  
    }
?>
</div>


  
