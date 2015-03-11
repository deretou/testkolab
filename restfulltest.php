<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>API index</title>
   <script src="http://kolabtest.cloudapp.net/kolabNXFront/js/jquery/jquery-git.js"></script> 
  </head>
  <body>
     
 <script type="text/javascript">
 $(document).ready(function(){
    /*   
     jQuery.ajax({                                      
                                       
                                        async: false,
                                        cache: false,
                                        url:"http://kolabtest.cloudapp.net:4242/api/products/",
                                        type: "GET",
                                        dataType:'json',                                      
                                        success:function(data, textStatus, jqXHR) {                                   	                                                                                                                    
                                              console.dir(data);
                                              console.log("Fode");
                                            }
                                        });
      jQuery.post("http://kolabtest.cloudapp.net:4242/api/products", {
  "title": "My Awesome T-shirt",
  "description": "All about the details. Of course it's black.",
  "style": "12345"
}, function (data, textStatus, jqXHR) {
    console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
});   */


  jQuery.ajax({
                            async: false,
                            cache: false,
                            url: "http://kolabtest.cloudapp.net:4242/api/products",
                            type: "POST",                            
                            dataType:'json', 
                            data: {"title": "My Awesome T-shirt8","description": "All about the details. Of course it's black.", "style": "12345"},
                            success:function(data, textStatus, jqXHR) {                                   	                                                                                                                    
                            // body=resp.body;
                             console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
                                }
                            }); 
        
    /*     jQuery.get("http://kolabtest.cloudapp.net:4242/api", function (data, textStatus, jqXHR) {
    console.log("Get resposne:");
    console.dir(data);
    console.log(textStatus);
    console.dir(jqXHR);
     })  ;*/
 });
       
                                     
                                       
                                       
   
                                        
                                        
</script> 
   
  </body>
</html>
