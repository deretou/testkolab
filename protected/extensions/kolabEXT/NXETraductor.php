<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NXETraductor
 *
 * @author DERETOU
 */
class NXETraductor {
    //put your code here
    
    
    private $_lang;
    
    public function __construct($lang="") {
        
        if($lang==""){
        $lang = Yii::app()->session->get('userLang');
	if ($lang != 'fr')
		$lang = 'en';        
                }
        $this->_lang=$lang;
        } 


    public function traductor($item) {
      $xmlStr = file_get_contents(dirname(__FILE__).'/../../data/dictionnaire.xml'); 
      $xml = new SimpleXMLElement($xmlStr); 
      $trad = $xml->xpath("//item[@nom='$item']/lang[@nom='$this->_lang']"); 
      return$trad[0];
        
    }
    
 public function dicoJSON(){
       $dicoJSON=array();
       $xmlStr = file_get_contents(dirname(__FILE__).'/../../data/dictionnaire.xml'); 
       $xml = new SimpleXMLElement($xmlStr); 
       $trad = $xml->xpath("//item"); 
     //  print_r($trad);
       foreach ($trad as $item) {
           $token=(string)$item->attributes()->nom;          
           $userLang0=(string)$item->lang[0]->attributes()->nom;
           $tokenValu0=(string)$item->lang[0];
            $userLang1=(string)$item->lang[1]->attributes()->nom;
           $tokenValu1=(string)$item->lang[1];
            $dicoJSON[$token]=array($userLang0=>$tokenValu0,$userLang1=>$tokenValu1);
         // print_r($token);           echo ' ---   ';   print_r((string)$item->lang->attributes()->nom);           echo ' ---   ';    print_r((string)$item->lang);         echo '<br/>';
       }
       
      // print_r($dicoJSON);
      return json_encode($dicoJSON);
     
 }
}

?>
