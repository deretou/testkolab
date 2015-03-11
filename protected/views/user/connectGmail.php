<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 //header("Location: ".Yii::app()->request->baseUrl."/index.php/userauthentification/login"); 
?>
 <script type="text/javascript">
   location.href="https://www.google.com/accounts/OAuthAuthorizeToken?oauth_token=<?php echo $oauth->rfc3986_decode(Yii::app()->session['oauth_token']) ?>";     
</script> 