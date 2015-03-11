<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//$this->layout = "//layouts/kolabnxMainLayout";
// print_r($model);
?>
<script type="text/javascript">current="locker";
$(this).empty();
</script>

<div id="struc_binder">
       <?php 
if (count($model)>0) {    
    foreach ($model as $key => $value) {                   
 ?>       
    <div id="b_<?php if(strtolower($value->name)!='personal'){echo substr(strtolower($value->name),0,3).$value->binderID;}else{ echo 'klb';} ?>_frame" class="t04 binder_frame">
           <div onclick="$(document).trigger('showbindersquaresist',this);"  id="b_<?php if(strtolower($value->name)!='personal'){echo substr(strtolower($value->name),0,3).$value->binderID;}else{ echo 'klb';} ?>" class="t04 binder b_<?php if(strtolower($value->name)!='personal'){echo substr(strtolower($value->name),0,3).$value->binderID;}else{ echo 'klb';} ?>_bkg  binder_pre">
            <div class="t03 binder_side binder_side_pre">
                <p class="binder_name"><?php echo ucfirst($value->name); ?></p>
                <p class="binder_description"><?php echo $value->description; ?></p>
            </div>     
               <div class="t03 binder_number binder_number_pre"><p class="binder_total"><?php if(is_null($value->squaresList)){echo 0;}else{echo count($value->squaresList);}  ?></p></div>
            <div class="t04 binder_style" <?php if (isset($value->style) && !is_null($value->style)) { echo 'style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/'.$value->style.'.png)"'; } ?>  ></div>
        </div>
        </div>  
        
<?php  
    }  
    }
?>          
    
    
</div>

<div id="cover" class="cover_locker">
    <div id="cover_binder_frame" class="binder_frame binder_frame_not">
        <div id="cover_binder" class="binder">
            <div id="cover_binder_style" class="binder_style"></div>
        </div>
    </div>
    
    <div id="cover_info" class="cover_info_locker">
        <p id="cover_name"></p>
        <p id="cover_description"></p>
    </div>
    
    <div id="cover_nav" class="cover_nav_locker">
        <p onClick="content_control(null,'1')" class="t025 cover_nav_bt">Squares</p>
        <p onClick="content_control(null,'2')" class="t025 cover_nav_bt">Social</p>
    </div>

</div>

<div id="content" class="nano">
<div class="nano-content">
       <?php 
if (count($model)>0) {
//  echo  ' binders count  '.count($model). ' in all <br/>'; 
    foreach($model as $value2) {
  //echo $value2->name. ' id '.$value2->binderID.'<br/>';
 // print_r($value2->squaresList); echo  '<br/>';
    if(!is_null($value2->squaresList)){        
  //echo  ' il y a '.count($value2->squaresList). ' square <br/>';
    $mySquares=$value2->squaresList;
    if(count($value2->squaresList)>1){
       // echo  ' je suis avant la sort <br/>'; 
         $notifuser= new UserManager();


     //   echo  ' il y a '.count($mySquares). ' square avant sort <br/>';
         $notifuser->mergesort($mySquares);
      /*  if(is_null($value2->squaresortPreference) || $value2->squaresortPreference=='percreationdate'){
                echo  ' je suis avant la sort 2 <br/>';   
               function comparebydate($a, $b){
                             return $a->creationDate < $b->creationDate;
                            }
                            echo  ' je suis la sort <br/>'; 
                            usort($value2->squaresList, 'comparebydate'); 
                           echo  ' il y a '.count($value2->squaresList). ' square apres sort <br/>';   
                            }  
             
               */
       //   echo  ' il y a '.count($value2->squaresList). ' square apres sort <br/>';   
               } 
         
     }
   
    
 //  echo  '<br/>------------------------------------------------<br/>'; 
   

 ?>       
    <div id="b_<?php  if(strtolower($value2->name)!='personal'){ echo substr(strtolower($value2->name),0,3).$value2->binderID;}else{    echo 'klb';} ?>_content" class="content_view">
    
        <div id="b_<?php  if(strtolower($value2->name)!='personal'){ echo substr(strtolower($value2->name),0,3).$value2->binderID;}else{    echo 'klb';} ?>_c1" class="content_select">
            <p class="content_title">Active</p>
            
            <div class="content_strip give_<?php  if(strtolower($value2->name)!='personal'){ echo substr(strtolower($value2->name),0,3).$value2->binderID;}else{    echo 'klb';} ?>">            
             <?php if(!is_null($value2->squaresList)){
              $counterIndex=  count($mySquares);   
              while ($counterIndex > 0) {
               $counterIndex--;                 
          if($mySquares[$counterIndex]->status=='active' || is_null($mySquares[$counterIndex]->status)){ 
   
                 ?>
               <div onclick="$(document).trigger('openkzone',this);" id="sq_<?php echo trim(substr(strtolower($mySquares[$counterIndex]->squareName),0,3)).$mySquares[$counterIndex]->squareID; ?>_<?php echo $value2->binderID; ?>" class="t025 sq get">
                    <p class="sq_name"><?php echo $mySquares[$counterIndex]->squareName; ?></p>
                    <p class="sq_date"><?php $sqDate= new DateTime($mySquares[$counterIndex]->creationDate); echo $sqDate->format('d/m/Y'); ?></p>
                    <div class="sq_update"></div>
                    <div class="t02 sq_streak"></div>
</div>
                
              <?php
             }      
              
              }    
              
             }else{
                echo '<p class="content_text">All clear chief</p>';   
              } ?>                               
</div>  
            
            <p class="content_title">Inactive</p>
            
            <div class="content_strip give_<?php  if(strtolower($value2->name)!='personal'){ echo substr(strtolower($value2->name),0,3).$value2->binderID;}else{    echo 'klb';} ?>">            
              <?php  if(!is_null($value2->squaresList)){
               $inactivecounter=0;
                  foreach ($mySquares as $quare) {
                  if($quare->status=='inactive'){ 
                    $inactivecounter+=1;   
                  ?>
                <div id="sq_<?php echo trim(substr(strtolower($quare->squareName),0,3)).$quare->squareID; ?>_<?php echo $value2->binderID; ?>" class="t025 sq get">
                    <p class="sq_name"><?php echo $quare->squareName; ?></p>
                    <p class="sq_date"><?php $sqDate= new DateTime($quare->creationDate); echo $sqDate->format('d/m/Y'); ?></p>
                    <div class="sq_update"></div>
                    <div class="t02 sq_streak"></div>
                </div>                   
                
              <?php
             }
               }    
              }else{
                echo '<p class="content_text">All clear chief</p>';   
              }
              if (isset($inactivecounter) && $inactivecounter==0) {
                  echo '<p class="content_text">All clear chief</p>';   
              }
              unset($inactivecounter);
              ?>  
            
            </div>
            
        </div>
        <div id="b_<?php  if(strtolower($value2->name)!='personal'){ echo substr(strtolower($value2->name),0,3).$value2->binderID;}else{    echo 'klb';} ?>_c2" class="content_select">
            <p class="content_title">People</p>
            
            <div class="content_strip give_<?php  if(strtolower($value2->name)!='personal'){ echo substr(strtolower($value2->name),0,3).$value2->binderID;}else{    echo 'klb';} ?>">
            	<p class="content_text">All clear chief</p>
                
            </div>
            
        </div>
    </div>    
<?php     

    }  
    }
?> 
        

</div>
</div>  
<?php 
//echo '<script type="text/javascript" >console.log(\'pret\');  setTimeout(function(){$(document).trigger(\'lockerpartialisready\') },200); </script>';