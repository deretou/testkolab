<?php
/*
try

$db = new Mongo("mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX");

$registrations = $db->selectCollection('kolabNX', 'users');
if(isset($registrations)){
 
	echo 'ca marche machine '.$_SERVER['SERVER_ADDR'].'  <br/>';
	print_r($registrations);
	}

} catch (Exception $e){

echo 'Caught exception:  '.$_SERVER['SERVER_ADDR'].' ',  $e->getMessage(), "";

}
*/
?>

<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Load Balancing in two levels (PHP and Node.js)</title>
        <script type="text/javascript">
          function sendSomething(){
           var  tesxte=document.getElementById('sendtest').value; 
            if(tesxte!=='' && tesxte!==' '){
               layoutSocket.emit('newuser',tesxte);  
            }
          }
      </script>  
        
    </head>
    <body>
<script src='http://usnxe.cloudapp.net:2424/socket.io/socket.io.js'></script> 
 <script type="text/javascript">
    layoutSocket= io.connect('http://usnxe.cloudapp.net:2424/kolabPlatform');  
    layoutSocket.on('loadbalancing',function(doc){
       console.log(doc); 
    });
</script> 
<br/>
<label>Type something</label><input name="Type something" type="text" id="sendtest"/> <input name="Send" value="Send" type="button" onclick="sendSomething();"/>
    </body>
</html>
