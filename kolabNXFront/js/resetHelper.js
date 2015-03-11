/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(function(){
    
    
    return {       
        resetpasswordmanager:resetpasswordmanager
    };
    
    function resetpasswordmanager(){
        var content={};
        var createUserLock=true;
        content['password'] = $('#pass1').val();                        
        var passwordConfirm=$('#pass2').val();

              if (content['password']==='' || content['password']===' ') {
                                   field('pass1'); 
                                    createUserLock=false;
                                }else if(!CheckPassword(content['password'])){
                                    passsecurity(); 
                                    createUserLock=false;
                                }else if(isCommonPswd(content['password'])){
                                     pass10000();
                                    createUserLock=false;  
                                }
                               
                               if (passwordConfirm==='' || passwordConfirm===' ') {
                                   field('pass2'); 
                                    createUserLock=false;
                                }else if(content['password']!==passwordConfirm){
                                     passmatch(); 
                                    createUserLock=false;  
                                }

        if(createUserLock){
         jQuery.ajax({
                                    async: false,
                                    cache: false,
                                    url: http_base+"/userauthentification/resetpasswordmanager",
                                    type: "POST",
                                    dataType:'json', 
                                    data: content,
                                    success:function(resp) {                                   	                                                                                                                    
                                       if(resp.status==='Success'){
                                         // 
                                           location.href=http_base; 
                                       }else{
                                        $('#pass').css({background: '#F00',color: '#fff','border-color':'#F00' });     
                                       }
                                    // console.log(body);
                                        }
                                    });  
        }    

        }
        
   function isCommonPswd(passwd){
      checker=true;
      jQuery.ajax({
                            async: false,
                            cache: false,
                            url: http_base+"/user/commonPassword",
                            type: "POST",
                            dataType:'json', 
                            data: {password:passwd},
                            success:function(resp) {                                   	                                                                                                                    
                            checker=resp.status;
                            // console.log(body);
                                }
                            });
                            
       return checker;                     
 } 
 
   
      /* 
      * password between 6 to 20 characters which contain at least one lowercase letter, 
      * one uppercase letter, one numeric digit- 
      * See more at: http://www.w3resource.com/javascript/form/password-validation.php#sthash.XG3B4Oa0.dpuf
      * 
      * */   
  function CheckPassword(inputtxt)   
    {   
            var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;  
            if(inputtxt.match(decimal))   
            {   
         // alert('Correct, try another...')  
            return true;  
            }  
            else  
            {   
            //alert('Wrong...!')  
            return false;  
            }  
    }  
    
    
});

