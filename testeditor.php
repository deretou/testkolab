<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>kolab [preview beta]</title>

</head>

<body>

<script src="http://kolabeditor.trafficmanager.net:2525/socket.io/socket.io.js"></script>

<script type="text/javascript" > 
       layoutSocket= io.connect('http://kolabeditor.trafficmanager.net:2525/kolabTest');  
     // console.log('check 1', layoutSocket.socket.connected);
       layoutSocket.emit('testeditor','Brandon test')
</script>

</body>
</html>


