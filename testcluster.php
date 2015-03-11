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

<script src="http://kolabzone1.cloudapp.net:8087/socket.io/socket.io.js"></script>

<script type="text/javascript" > 
       layoutSocket= io.connect('http://kolabzone1.cloudapp.net:8087');  
     // console.log('check 1', layoutSocket.socket.connected);
       //layoutSocket.emit('testeditor','Brandon test')
</script>

</body>
</html>

