<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
    require_once('html2pdf/html2pdf.class.php');	

    //instruction to execute on the PDF
    $content = explode('<br clear=all>', $_GET['content']) ; 
    $choice = $_GET['choice'];
    //print_r( $content);
    $html2pdf = new HTML2PDF('P','LETTER','fr');//Declaring class   

    for ($index = 0; $index < count($content); $index++) {
        $html2pdf->WriteHTML($content[$index]);//Write content (the content is the HTML) in PDF   
    }

    if($choice=='D'){
        $html2pdf->Output('editorContent.pdf','D');  
    }else{
        $html2pdf->pdf->IncludeJS("print(true);");//Print on open
        $html2pdf->Output('editorContent.pdf');//Output in browser        
    }
                                              
           
?>
