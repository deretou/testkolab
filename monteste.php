<?php

try{

$db = new Mongo("mongodb://kolabuser:nxe cyvex secure system 1@ds041751-a0.mongolab.com:41751,ds041751-a1.mongolab.com:41751/kolabnx");

$registrations = $db->selectCollection('kolabNX', 'users');
if(isset($registrations)){
	echo 'ca marche machine  <br/>';
	print_r($registrations);
	}

} catch (Exception $e){

echo 'Caught exception:  '.$_SERVER['SERVER_ADDR'].' ',  $e->getMessage(), "";

}

?>
 