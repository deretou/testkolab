<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$this->layout = "//layouts/twitterconnectLayout";
?>

<div>
      
      <?php if (isset($menu)) { ?>
        <?php echo $menu; ?>
      <?php } ?>
    </div>
    <?php if (isset($status_text)) { ?>
      <?php echo '<h3>'.$status_text.'</h3>'; ?>
    <?php } ?>
    <p>
      <pre>
        <?php 
           print_r($model);
           
        ?>
      </pre>
    </p>
