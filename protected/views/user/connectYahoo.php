        <?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//Email Contacts 
//print_r($conta);

?>
<table width="600" border="0">
  <tr>
    <th scope="col"><table width="600" border="0">
      <tr>
        <th width="65" scope="col">&nbsp;</th>
        <th align="left" width="200" scope="col">Name</th>
        <th align="left" width="200" scope="col">Email</th>
      </tr>
        <?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//Email Contacts 
 //
 echo count($conta).'<br/>';
  print_r($conta);
 /*
if(count($conta)>0){
foreach ($conta as $valuefr) {
   // print_r($valuefr); echo "<br />==============================================<br />"; 

?>
  
  <tr>
    <td>
      <label>
        <input type="checkbox" name="checkbox" class="frdemail" value="<?php echo $valuefr['email']; ?>"/>
      </label>
    </td>
    <td align="left"> <?php echo $valuefr['name'];?>
</td>
    <td align="left"><?php echo $valuefr['email']; ?></td>
  </tr> 
  
  
  <?php
}

}
?>
    </table></th>
  </tr>
  <tr>
    <td align="right">
  
        <input type="submit" name="button" id="button" value="Invite Friends" onclick="inviteFriends();"  />
     
    </td>
  </tr>
</table>*/
?>