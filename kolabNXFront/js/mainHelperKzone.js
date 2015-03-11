/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(["http://kolabrealtime.trafficmanager.net/socket.io/socket.io.js",http_base+"/kolabNXFront/js/jQuery-Chrono/lib/jquery.chrono.min.js","//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js"],function(iomain) {
  
  
     //window.oncontextmenu = function () { return false; } 
     //document.onkeydown = function (e) {if (window.event.keyCode == 123 || e.button==2)	return false; } 
     var kzoneSocket;
 
    // var chatSocket;
    
        kzoneSocket= iomain.connect('http://kolabrealtime.trafficmanager.net/kolabKzone');  
        kzoneSocket.heartbeatTimeout = 5000;        
     //window.oncontextmenu = function () { return false; } 
     //document.onkeydown = function (e) {if (window.event.keyCode == 123 || e.button==2)	return false; } 
  
         if(typeof iomain !== 'undefined'){
          // console.log('node est la 1');
          $(document).trigger('dothat',1);
         }else {
          console.log('node est absente');
           // network();
          }
          
       
          
           $.after(1000, function() {  
		 
                    //-----------------------------------
                  $.every(2, function() {  
                    if(kzoneSocket.connected){
                        
                    }else{
                      console.log('node est absente');  
                      }
                       });
                       
                       });
                    //----------------------------------------
 String.prototype.replaceArray = function(find) {
      var replaceString = this;
        $.each(find,function(index,memb){                   
             replaceString = replaceString.replace(new RegExp('(^|\\s)' + escapeRegExp(index)+ '(\\s|$)', 'g'),'<span class="smiley '+memb[0]+'" ></span>');
          });
        return replaceString;
        };
        
function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
        
   
  
 $(function(){
	     getSquareResources();
             getSquareMembers();
              whoIAm();
              
              kzoneSocket.on('newuser',function(msg){
                                 console.log(msg);                
                                });
              
               kzoneSocket.on('kzonericochetmsg',function(msg){
                                  displayMyKzoneChatMsg(msg);                 
                                });
                                
                kzoneSocket.on('newkzonemsg',function(msg){
                   //console.log(msg); 
                   displayMyKzoneChatMsg(msg);  
                  });
                  
                   kzoneSocket.on('message',function(msg){
                   console.log(msg);              
                  });
	}); 
    

    return {
           prepareUpload:prepareUpload,
           uploadResourceManager:uploadResourceManager,
           kzoneChatevent:kzoneChatevent
          };
          
          
function displayMyKzoneChatMsg(msg){
           var smb=0;
           var testBody=msg.body;
           var smileyParse=testBody.replaceArray(Smileys).trim();
           var numberEmo1=smileyParse.split(/<\/?span[^>]*>/g);
           if(numberEmo1.length==3 && numberEmo1[0].trim()=='' && numberEmo1[2].trim()==''){
                  smileyParse=smileyParse.split('smiley').join('smiley smiley_big ');               
                  smb=1;
            }
             // console.log(smileyParse.toString());    
          kz_chat_mess({person:msg.userid,name:msg.username,message:smileyParse,smb:smb,time:msg.timestan,pre:0}); 
          if(msg.userid==userself){
            kzoneChatManager(msg);   
          }
         
}
function kzoneChatManager(msg){
    msg['squareID']=squareid;
    $.ajax({
        url: http_base+'/kzone/chatManager',
        type: 'POST',
        data: msg,
       /* async: false,
        cache: false,*/       
        dataType:'json',
        success: function (resp) {        // console.log('2'); 
        if(resp.status=='Success'){
         console.log(resp); 
         //-------------Fode Toure----------------------                 
        }
       }
      });   
}

function kzoneChatevent(msg){
   kzoneSocket.emit('kzonechatmessagesend',{body:msg});    
}

function whoIAm(){
    jQuery.ajax({
                                       
                                       /* async: false,
                                        cache: false,*/
                                        url: http_base+'/kzone/getMyIdentity',
                                        type: "POST",
                                        data: {id:squareid},
                                        dataType:'json',                                       
                                        success:function(result){
                                       if(result.status==='Success'){
                                               // console.log(result);
                                               kzoneSocket.emit('newuser',result);                                              
                                        }else{
                                             

                                             console.log('loggout who');
                                            }
                                        }  
  }); 
}



function getSquareResources(){
$.ajax({
        url: http_base+'/kzone/getResources',
        type: 'POST',
        data: {id:squareid},
       /* async: false,
        cache: false,*/       
        dataType:'json',
        success: function (resp) {        // console.log('2'); 
        if(resp.status=='Success'){
        // console.log(resp.resources); 
         //-------------Fode Toure---------------------- 
       
         if(resp.resources.files.length>0){
          $.each(resp.resources.files,function(idx,res){             
          //console.log(dateString); 
          squareRessoursesDisplayer(res);
         });    
         }
        
        }
       }
      });   
}


function squareRessoursesDisplayer(currentFile){     
     var desc='';     
     var ext='';    
      switch(currentFile.ext){
          case 'doc': 
          case 'docx':
                 ext='word'; 
                 desc='Word document (.'+currentFile.ext+')';
                  break;
          case 'ppt': 
          case 'pptx':
               ext='power';
                desc='PowerPoint presentation (.'+currentFile.ext+')';
                break;
          case 'xls': 
          case 'xlsx':
               ext='excel'; 
               desc='Excel spreadsheet (.'+currentFile.ext+')';
                break;
          case 'pdf':
                ext='pdf'; 
               desc='PDF document (.'+currentFile.ext+')';
              break;
          case 'png': 
               ext='img'; 
               desc='PNG photo (.'+currentFile.ext+')';
                break; 
          case 'jpg':
               ext='img'; 
               desc='JPEG photo (.'+currentFile.ext+')';
                break;              
          default:
              
              break;            
     }
     
     var ressourse='<div class="view_box"><div class="kz_block">';
      if(ext=='img'){
     ressourse+='<a href="http://build.kolabalison.com/kzone/displayimage?id='+currentFile.path+'" target="_blank">'
               +'<div class="t02 view_img kz_img kzics kzi_res_'+ext+' kz_user'+currentFile.addedColor+'_bkg"></div></a>';     
      }else{
      ressourse+='<div class="t02 view_img kz_img kzics kzi_res_'+ext+' kz_user'+currentFile.addedColor+'_bkg"></div>';    
      }
        
        ressourse+='<div class="t01 kz_text" onClick="$(document).trigger(\'resbackstoreopen\',this);" id="'+currentFile.ressourceID+'"><p class="t01 view_text view_text_1 kzt">'+currentFile.name+'</p>'
         +'<p class="t01 view_text view_text_2 kzt">'+desc+'</p></div></div><div class="view_action view_action_manage">'
         +'<div onClick="backstore_control_2(\'delete\')" class="t015 view_action_half view_action_full">Delete</div></div></div>';
        if($('#view_resources_1 p.box_nohover').length>0){
         $('#view_resources_1 p.box_nohover').remove();
        }
       $('#view_resources_1 p.view_title:first').after(ressourse);  
       $('#'+currentFile.ressourceID).data('name',currentFile.name); 
       $('#'+currentFile.ressourceID).data('desc',currentFile.description);
       $('#'+currentFile.ressourceID).data('originename',currentFile.sourceName); 
       $('#'+currentFile.ressourceID).data('ext',ext); 
       $('#'+currentFile.ressourceID).data('path',currentFile.path); 
       $('#'+currentFile.ressourceID).data('ownername',currentFile.addedFullName); 
       $('#'+currentFile.ressourceID).data('ownercolor',currentFile.addedColor);
        var filesize=currentFile.size;
         var unit='Bytes';
         var pass=0;
         
         if(filesize>1024 && pass==0){
           filesize=Math.ceil(filesize/1024);
           unit='KB';
           pass=1;
         }
         
         if(filesize>1024 && pass==1){
           filesize=Math.ceil(filesize/1024);
           unit='MB';
           pass=2;
         }
         
         if(filesize>1024 && pass==2){
           filesize=Math.ceil(filesize/1024);
           unit='GB';          
         }
         
       $('#'+currentFile.ressourceID).data('size', filesize+' '+unit);
        if(ext=='img'){
          $('#'+currentFile.ressourceID).data('width',currentFile.width); 
          $('#'+currentFile.ressourceID).data('height',currentFile.height); 
        }
       //-----------------------------------
        var theDate = new Date(currentFile.timestamp  * 1000);      
        var temp=theDate.toLocaleTimeString();
        var hours= temp.split(':');                                       
        var suffix='';
                if(hours[0]>12){
                 suffix='PM'; 
                hours[0]=hours[0] - 12;
                }else{
                 suffix='AM';     
                }  
        var dateString = theDate.toLocaleDateString() + ' ' + hours[0]+':'+hours[1]+' '+suffix;  
        $('#'+currentFile.ressourceID).data('datecreation',dateString);  
 } 


function getSquareMembers(){
$.ajax({
        url: http_base+'/kzone/getMembers',
        type: 'POST',
        data: {id:squareid},
       /* async: false,
        cache: false,*/       
        dataType:'json',
        success: function (resp) {        // console.log('2'); 
        if(resp.status=='Success'){
           //console.log(resp.members);
        }
       }
      });     
}


function prepareUpload(temfile)
{ 
 var files=new Array(); 
 $.each(temfile, function(keyt, valuet)
	{       
                  if(valuet.name!=''){
                   files[0]=(valuet);
                    }
		
                // console.log('changement');
	});

var temp=files[0].name;
var tempsplit=temp.split('.');
 $('#file_name').val(tempsplit[0]);
 $('#myfile').val('');
 return files;
 }
 
 
function uploadResourceManager(files){
  if(files.length>0){
    
    var formData = new FormData();
    $.each(files, function(key, value)
	{
		//console.log(key, value);
          formData.append(key, value);
	});
	 formData.append('name_res', $('#file_name').val());
         formData.append('desc_res', $('#file_desc').val());
         formData.append('squareid', squareid);
        
       $.ajax({
        url: http_base+"/kzone/addRessourceFile",
        type: 'POST',
        data: formData,
       /* async: false,
        cache: false,*/
        contentType: false,
        processData: false,
        dataType:'json',
        success: function (returndata) {
         // alert(returndata);
         if(returndata.status=='Success'){
        var filesize=files[0].size;
         var unit='Bytes';
         var pass=0;
         
         if(filesize>1024 && pass==0){
           filesize=Math.ceil(filesize/1024);
           unit='KB';
           pass=1;
         }
         
         if(filesize>1024 && pass==1){
           filesize=Math.ceil(filesize/1024);
           unit='MB';
           pass=2;
         }
         
         if(filesize>1024 && pass==2){
           filesize=Math.ceil(filesize/1024);
           unit='GB';          
         }
         
         // console.log(' file size '+filesize+' '+ unit);
          // console.log(files[0]); 
          console.log(returndata.files);
           if((returndata.files).length>0){
            ressoursesDisplayer(files[0]); 
               setTimeout(function(){
                       // $(document).trigger('editsquare',source);      
                               // backstore_binder_color(resp.binderColor);  
                        loading(0);       
                        
                       },700);
           }
          
         }else{
          console.log(returndata.error);    
         }
 
          files=[];
          action_done('bs2');
        }
       });    
  }else{
      console.log('Upload empty'); 
      setTimeout(function(){
                       // $(document).trigger('editsquare',source);      
                               // backstore_binder_color(resp.binderColor);  
                        loading(0);       
                        
                       },700);
  }
 
	}

function ressoursesDisplayer(currentFile){
    var fileType=(currentFile.name).split('.'); 
   
    var userSim=randomIntFromInterval(1,8);
     //console.log(fileType,userSim);
     var ext='';
     var desc='';
     if(fileType.length==2){
      switch(fileType[1]){
          case 'doc': 
          case 'docx':
                 ext='word'; 
                 desc='Word document (.'+fileType[1]+')';
                  break;
          case 'ppt': 
          case 'pptx':
               ext='power';
                desc='PowerPoint presentation (.'+fileType[1]+')';
                break;
          case 'xls': 
          case 'xlsx':
               ext='excel'; 
               desc='Excel spreadsheet (.'+fileType[1]+')';
                break;
          case 'pdf':
                ext='pdf'; 
               desc='PDF document (.'+fileType[1]+')';
              break;
          case 'png': 
               ext='img'; 
               desc='PNG photo (.'+fileType[1]+')';
                break; 
          case 'jpg':
               ext='img'; 
               desc='JPEG photo (.'+fileType[1]+')';
                break;              
          default:              
              break;            
     }
     
     var ressourse='<div class="view_box reveal"><div class="kz_block"><div class="t02 view_img kz_img kzics kzi_res_'+ext+' kz_user'+userSim+'_bkg"></div>'
         +'<div class="t01 kz_text" onClick="backstore_selectionB();"><p class="t01 view_text view_text_1 kzt">'+$('#file_name').val()+'</p>'
         +'<p class="t01 view_text view_text_2 kzt">'+desc+'</p></div></div><div class="view_action view_action_manage">'
         +'<div onClick="backstore_control_2(\'delete\')" class="t015 view_action_half view_action_full">Delete</div></div></div>';
    if($('#view_resources_1 p.box_nohover').length>0){
       $('#view_resources_1 p.box_nohover').remove();
     }
     $('#view_resources_1 p.view_title:first').after(ressourse); 
     reveal();
     }
     
     
   $('#file_name').val(''); 
 } 
 
 function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}



function fileAssociation(fileType){   
    var  matching= {};
        matching['ext']='';
        matching['desc']='';
      switch(fileType){
        case 'blender':
          matching['ext']='3d'; 
          matching['desc']='Blender File (.'+fileType+')';
          break;
        case 'c4d':
          matching['ext']='3d'; 
          matching['desc']='Cinema 4D File (.'+fileType+')';
          break;
        case 'fbx':
          matching['ext']='3d'; 
          matching['desc']='Autodesk FBX File (.'+fileType+')';
          break;          
        case 'ma':
        case 'mb':
          matching['ext']='3d'; 
          matching['desc']='Maya File (.'+fileType+')';
          break;
        case 'max':
          matching['ext']='3d'; 
          matching['desc']='3D Studio Max File (.'+fileType+')';
          break;
        case 'm':
        case 'mesh':
          matching['ext']='3d'; 
          matching['desc']='Meshwork File (.'+fileType+')';
          break;
        case 'skp':
          matching['ext']='3d'; 
          matching['desc']='Sketchup File (.'+fileType+')';
          break;
        case 'obj':
          matching['ext']='3d'; 
          matching['desc']='Wavefront Object (.'+fileType+')';
          break;
        case 'rwx':
          matching['ext']='3d'; 
          matching['desc']='Renderware File (.'+fileType+')';
          break;
        case 'z3d':
          matching['ext']='3d'; 
          matching['desc']='ZBrush File (.'+fileType+')';
          break;
        case 'sldam':
        case 'sldprt':
          matching['ext']='3d'; 
          matching['desc']='SolidWorks File (.'+fileType+')';
          break;
        case 'html':
        case 'htm':
          matching['ext']='code'; 
          matching['desc']='HTML File (.'+fileType+')';
          break;
        case 'css':
          matching['ext']='code'; 
          matching['desc']='Cascading Style Sheet (.'+fileType+')';
          break;
        case 'php':
        case 'php3':
        case 'php4':
        case 'php5':            
          matching['ext']='code'; 
          matching['desc']='PHP File (.'+fileType+')';
          break;
        case 'js':
          matching['ext']='code'; 
          matching['desc']='JavaScript File (.'+fileType+')';
          break;
        case 'as':
          matching['ext']='code'; 
          matching['desc']='Flash ActionScript (.'+fileType+')';
          break;
        case 'lua':
          matching['ext']='code'; 
          matching['desc']='LUA File (.'+fileType+')';
          break;
        case 'py':
        case 'pyc':
        case 'pyo':            
          matching['ext']='code'; 
          matching['desc']='Python Source (.'+fileType+')';
          break;
        case 'scrt':
          matching['ext']='code'; 
          matching['desc']='AppleScript File (.'+fileType+')';
          break;
        case 'vbs':
        case 'cls':
        case 'frx':
        case 'vb':
        case 'vbscript':
        case 'frm':            
          matching['ext']='code'; 
          matching['desc']='Visual Basic File (.'+fileType+')';
          break;
        case 'vbp':
        case 'vip':
        case 'vbproj':
        case 'vcproj':
        case 'vdproj':                 
          matching['ext']='code'; 
          matching['desc']='Visual Project File (.'+fileType+')';
          break;
        case 'c':
        case 'csproj':                 
          matching['ext']='code'; 
          matching['desc']='C# File (.'+fileType+')';
          break;
        case 'java':                 
          matching['ext']='code'; 
          matching['desc']='Java File (.'+fileType+')';
          break;
        case 'asm':
        case 's':                 
          matching['ext']='code'; 
          matching['desc']='Assembly Source (.'+fileType+')';
          break;
        case 'm':                 
          matching['ext']='code'; 
          matching['desc']='MATLAB File (.'+fileType+')';
          break;
        case 'lisp':                 
          matching['ext']='code'; 
          matching['desc']='Lisp Source (.'+fileType+')';
          break;
        case 'pas':
        case 'pp':
        case 'p':
        case 'dpr':                 
          matching['ext']='code'; 
          matching['desc']='Pascal Source (.'+fileType+')';
          break;
        case 'pl':
        case 'pm':                 
          matching['ext']='code'; 
          matching['desc']='Perl Source (.'+fileType+')';
          break;
        case 'rb':                 
          matching['ext']='code'; 
          matching['desc']='Ruby Source (.'+fileType+')';
          break;
        case 'sqlitedb':
        case 'sqlite':                 
          matching['ext']='data'; 
          matching['desc']='SQLite Database (.'+fileType+')';
          break;
        case 'db':
        case 'dbf':                 
          matching['ext']='data'; 
          matching['desc']='Database File (.'+fileType+')';
          break;
        case 'dsn':                 
          matching['ext']='data'; 
          matching['desc']='Database Source (.'+fileType+')';
          break;
        case 'dbs':                 
          matching['ext']='data'; 
          matching['desc']='SQLBase Database (.'+fileType+')';
          break;
        case 'nyf':                 
          matching['ext']='data'; 
          matching['desc']='myBase Database (.'+fileType+')';
          break;
        case 'frm':
        case 'myd':                 
          matching['ext']='data'; 
          matching['desc']='MySQL Database (.'+fileType+')';
          break;
        case 'sdf':                 
          matching['ext']='data'; 
          matching['desc']='SQL Server Compact (.'+fileType+')';
          break;
        case 'pdb':                 
          matching['ext']='data'; 
          matching['desc']='Program Database (.'+fileType+')';
          break;
        case 'adp':                 
          matching['ext']='data'; 
          matching['desc']='Access Project (.'+fileType+')';
          break;
        case 'accdb':                 
          matching['ext']='data'; 
          matching['desc']='Access Database (.'+fileType+')';
          break;
        case 'fp7':                 
          matching['ext']='data'; 
          matching['desc']='FileMaker Pro Database (.'+fileType+')';
          break;
        case 'ora':                 
          matching['ext']='data'; 
          matching['desc']='Oracle Database (.'+fileType+')';
          break;
        case 'qvd':                 
          matching['ext']='data'; 
          matching['desc']='QlikView Data (.'+fileType+')';
          break;
        case 'maq':                 
          matching['ext']='data'; 
          matching['desc']='Access Query (.'+fileType+')';
          break;
        case 'wdb':                 
          matching['ext']='data'; 
          matching['desc']='Works Database (.'+fileType+')';
          break;        
        case 'xml':                 
          matching['ext']='data'; 
          matching['desc']='XML Database (.'+fileType+')';
          break;
        case 'doc': 
        case 'docx':
            matching['ext']='word'; 
            matching['desc']='Word document (.'+fileType+')';
             break;
        case 'ppt': 
        case 'pptx':
            matching['ext']='power';
            matching['desc']='PowerPoint presentation (.'+fileType+')';
            break;
        case 'key': 
        case 'keynote':
            matching['ext']='power';
            matching['desc']='Keynote Presentation (.'+fileType+')';
            break;
        case 'odp':
            matching['ext']='power';
            matching['desc']='OpenOffice Presentation (.'+fileType+')';
            break;
        case 'nb': 
        case 'ndp':
            matching['ext']='power';
            matching['desc']='Mathematica Slideshow (.'+fileType+')';
            break;
        case 'sdd':
            matching['ext']='power';
            matching['desc']='StarImpress Presentation (.'+fileType+')';
            break;
        case 'pez':
            matching['ext']='power';
            matching['desc']='Prezi Presentation (.'+fileType+')';
            break;
        case 'xls': 
        case 'xlsm': 
        case 'xlsx':
        case 'xlw':
           matching['ext']='excel'; 
           matching['desc']='Excel spreadsheet (.'+fileType+')';
            break;
        case 'sdc':
           matching['ext']='excel'; 
           matching['desc']='StarCalc Spreadsheet (.'+fileType+')';
           break;
        case 'numbers':
           matching['ext']='excel'; 
           matching['desc']='Numbers Spreadsheet (.'+fileType+')';
            break;
        case 'ods':
           matching['ext']='excel'; 
           matching['desc']='OpenOffice Spreadsheet (.'+fileType+')';
           break;
        case '123':
        case 'wk4':
        case 'wks':
           matching['ext']='excel'; 
           matching['desc']='Lotus Spreadsheet (.'+fileType+')';
           break;
        case 'pdf':
           matching['ext']='pdf'; 
           matching['desc']='PDF document (.'+fileType+')';
           break;
        case 'xps':
           matching['ext']='pdf'; 
           matching['desc']='XPS Document (.'+fileType+')';
           break;
        case 'ps':
           matching['ext']='pdf'; 
           matching['desc']='PostScript Document (.'+fileType+')';
           break;           
        case 'png': 
           matching['ext']='img'; 
           matching['desc']='PNG photo (.'+fileType+')';
           break; 
        case 'jpeg':
        case 'jpg':
           matching['ext']='img'; 
           matching['desc']='JPEG photo (.'+fileType+')';
           break;                     
        case 'gif':
           matching['ext']='img'; 
           matching['desc']='GIF Image (.'+fileType+')';
           break;
        case 'tgs':
        case 'targa':
        case 'vda':
           matching['ext']='img'; 
           matching['desc']='Truevision Image (.'+fileType+')';
           break;
        case 'bmp':
        case 'pbm':
           matching['ext']='img'; 
           matching['desc']='Bitmap Image (.'+fileType+')';
           break;        
        case 'ai':
           matching['ext']='img'; 
           matching['desc']='Illustrator Document (.'+fileType+')';
           break;
        case 'tiff':
        case 'tif':
           matching['ext']='img'; 
           matching['desc']='TIFF Image (.'+fileType+')';
           break;
        case 'eps':
           matching['ext']='img'; 
           matching['desc']='EPS Document (.'+fileType+')';
           break;
        case 'svg':
           matching['ext']='img'; 
           matching['desc']='Scalable Vector Graphics (.'+fileType+')';
           break;
        case 'cdr':
        case 'cmx':
           matching['ext']='img'; 
           matching['desc']='CorelDraw Image (.'+fileType+')';
           break
        case 'fcp':
           matching['ext']='mon'; 
           matching['desc']='Final Cut Pro Project (.'+fileType+')';
           break;
        case 'aep':
           matching['ext']='mon'; 
           matching['desc']='After Effects Project (.'+fileType+')';
           break;
        case 'fla':
           matching['ext']='mon'; 
           matching['desc']='Flash Project (.'+fileType+')';
           break;
        case 'mswmm':
           matching['ext']='mon'; 
           matching['desc']='Movie Maker Project (.'+fileType+')';
           break;
        case 'ppj':
           matching['ext']='mon'; 
           matching['desc']='Premiere Pro Project (.'+fileType+')';
           break;
        case 'imovieproj':
           matching['ext']='mon'; 
           matching['desc']='iMovie Project (.'+fileType+')';
           break;
        case 'veg':
        case 'veg-bak':
           matching['ext']='mon'; 
           matching['desc']='Vegas Project (.'+fileType+')';
           break;
        case 'wlmp':
           matching['ext']='mon'; 
           matching['desc']='Live Movie Maker Project (.'+fileType+')';
           break;
        case 'aiff':
           matching['ext']='mp3'; 
           matching['desc']='AIFF Audio (.'+fileType+')';
           break;
        case 'wav':
           matching['ext']='mp3'; 
           matching['desc']='WAV Audio (.'+fileType+')';
           break;
        case 'flac':
           matching['ext']='mp3'; 
           matching['desc']='FLAC Audio (.'+fileType+')';
           break;
        case 'wma':
           matching['ext']='mp3'; 
           matching['desc']='Windows Media Audio (.'+fileType+')';
           break;
        case 'mp3':
           matching['ext']='mp3'; 
           matching['desc']='MP3 Audio (.'+fileType+')';
           break;
        case 'mp43':
        case 'm4p':
        case 'acc':
           matching['ext']='mp3'; 
           matching['desc']='AAC Audio (.'+fileType+')';
           break;
        case 'mpp':
           matching['ext']='pro'; 
           matching['desc']='Microsoft Project (.'+fileType+')';
           break;
        case 'psd':
        case 'psb':
        case 'pdd':
           matching['ext']='ps'; 
           matching['desc']='Photoshop Drawing (.'+fileType+')';
           break;
        case 'pub':
           matching['ext']='pub'; 
           matching['desc']='Microsoft Publisher Project (.'+fileType+')';
           break;
        case '3gp':
           matching['ext']='vid'; 
           matching['desc']='3GP Video (.'+fileType+')';
           break;
        case 'avchd':
           matching['ext']='vid'; 
           matching['desc']='AVCHD Video (.'+fileType+')';
           break;
        case 'avi':
           matching['ext']='vid'; 
           matching['desc']='AVI Video (.'+fileType+')';
           break;
        case 'm4v':
           matching['ext']='vid'; 
           matching['desc']='M4V Video (.'+fileType+')';
           break;
        case 'mkv':
           matching['ext']='vid'; 
           matching['desc']='Matroska Video (.'+fileType+')';
           break;
        case 'mov':
           matching['ext']='vid'; 
           matching['desc']='QuickTime Video (.'+fileType+')';
           break;
        case 'swf':
           matching['ext']='vid'; 
           matching['desc']='Flash Video (.'+fileType+')';
           break;
        case 'ogg':
           matching['ext']='vid'; 
           matching['desc']='Ogg Video (.'+fileType+')';
           break;
        case 'mpe':
        case 'mpeg':
        case 'mpg':
           matching['ext']='vid'; 
           matching['desc']='MPEG Video (.'+fileType+')';
           break;
        default:              
          break;            
     } 
     return matching;
}
 
});

