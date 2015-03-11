var current="kzone";
//var sqname="Demonstration Square"; Fode
//var kzcolor="#00C9FF"; Fode
//var userself=2; Fode
var cp_size=0;
var cp_video=0;
var cp_audio=0;
var cp_fs_save=[0,0];

var chat_position="kzchat";
chat_array.unshift('kzchat');
chat_active++;


$(document).ready(function(){
	
	var kzcolordark = darker(kzcolor,10);
	var kzcolordark2 = darker(kzcolor,25);
		
	$('head').append(
	'<style>.demo_txt::selection{background:'+kzcolor+';color:#FFF;}.ebari:active{background-color:'+kzcolor+';border-color:'+kzcolor+';}.view_count{border-color:'+kzcolor+';} #ebar_more:hover, .bt_square:hover{background-color:'+kzcolordark+';} .bt_current_members, .bt_current_organization, .bt_current_resources, .bt_current_history, .bt_current_export, .bt_current_square:hover, .bt_current_members:hover, .bt_current_organization:hover, .bt_current_resources:hover, .bt_current_history:hover, .bt_current_export:hover, .list_mid:active, .kz_km, .ebr_nrm:active{background-color:'+kzcolor+';}.cp_volume:active{background-color:'+kzcolor+';border-color:'+kzcolor+';opacity:1;transform:scale(0.95);}.list_new:active{border-color:'+kzcolordark+';} .list_new:active .list_new_button, #kzchat_view .chat_block_more:hover, #kzchat .bt_bottom:hover{background-color:'+kzcolordark+';}.ebar_box_active{background-color:#555;border-color:#FFF;}.ebr_active{background-color:'+kzcolordark+';border-color:'+kzcolordark+';}#kzchat_view .chat_input_div::-webkit-scrollbar-thumb, #kzchat_view .chat_input_div::-webkit-scrollbar-thumb:window-inactive, #kzchat_view .chat_input_div::-webkit-scrollbar-thumb:active{background-color:'+kzcolordark2+';}.kz_color_bkg{background-color:'+kzcolor+';}.kz_color_txt{color:'+kzcolor+';}.kz_color_brd{border-color:'+kzcolor+';}.kz_color_brdd{border-color:'+kzcolordark+';}.kz_color_bkgd{background-color:'+kzcolordark+';}.kz_color_txtd{color:'+kzcolordark+';}.lockactive{background-color:'+kzcolor+';}.lockactive:hover{background-color:'+kzcolordark+';}</style>'
	);
	$('#struc_content').css({overflow:'visible'},0);
	$('#pages').transition({y:'100%',opacity:0},0);
	$('.ebr').transition({y:-25,opacity:0},0);
	$('.ebr2').transition({y:47},0);
	$('#ebar').transition({y:-60},0);
	$('.list').transition({y:-20,opacity:0},0);
	$('.num').transition({x:-6,opacity:0},0);
	$('#side_safety').transition({x:-72,opacity:'1'},0);
	
	$(".dropsafe").on("click",function(e){
    	e.stopPropagation();
	});
	$("#struc_content").on("click",function(e){
		$('.ebr_drop').fadeOut(100);
		$('.ebar_box').removeClass('ebar_box_active');
		$('.ebari_highlights').removeClass('ebari_highlights_active');
		$('.ebari').removeClass('ebari_active');
	});
		
});

function kzone_reveal(){
	$('#pages').transition({y:0,opacity:1},1200,'easeOutExpo',function(){$(".nano").nanoScroller();});
	$('#ebar').transition({y:0},600,'easeOutExpo');
	$('.ebr2').delay(300).transition({y:0},600,'easeOutExpo');
	$('.num').delay(800).transition({x:0,opacity:1},800,'easeOutExpo');
	
	var ebrcount = $('.ebr').length;
	for(i=0;i<ebrcount;i++){
		$('.ebr').eq(i).delay(260+(i*30)).transition({y:0,opacity:1},800,'easeOutExpo');
	}
	
	var listcount = $('.list').length;
	for(i=0;i<ebrcount;i++){
		$('.list').eq(i).delay(160+(i*100)).transition({y:0,opacity:1},800,'easeOutExpo');
	}
}

function get_userhex(user){
	if(user==userself){return '#FF0063';}
	else{
		switch(user){
			case 1||'1'||'user1':return '#00CC00';
			case 2||'2'||'user2':return '#0099FF';
			case 3||'3'||'user3':return '#FF5300';
			case 4||'4'||'user4':return '#9326FF';
			case 5||'5'||'user5':return '#FFBF00';
			case 6||'6'||'user6':return '#FF4DFF';
			case 7||'7'||'user7':return '#048A99';
			case 8||'8'||'user8':return '#BDCC0B';
			case 0||'0'||'user0'||'useroff':return '#666666';
			case 'self'||'userself':return '#FF0063';
		}
	}
}

function cp_create(){
	$('#cp').show().transition({opacity:1,scale:1},260).draggable({using:'right',cancel:'.nodrag', delay:60, drag:function(){
     $('body').mouseleave(function(){$('body').mouseup();});},start:function(){$('#cp_frame').fadeOut(120);},stop:function(){$('#cp_frame').fadeIn(60);$('#cp').css({right:Math.round((width-$("#cp").position().left-$("#cp").outerWidth())),left:'',top:Math.round($('#cp').css('height'))});}});
	 
	$('.nodrag').on({'touchstart':function(e){$(this).click()}});
	$('.chat_options').show().css({opacity:1});
	setTimeout(function(){$('.chat_options').addClass('chat_options_on');},120);
	$('.chat_title_media').css({width:170});
	
	$('#cp').mousedown(function(){playerapp_focus('cp');});
	$('#cp').mouseup(function(){playerapp_control('cp');});

	setTimeout(function(){playerapp_focus('cp');playerapp_control('cp');},50);
}

function cp_destroy(){
	$('#cp').transition({opacity:0,scale:0.8,width:182,height:0,top:'12%',right:'8%'},260,'',function(){$(this).hide();});
	$('.chat_options').removeClass('chat_options_on').css({opacity:0})
	setTimeout(function(){$('.chat_options').hide();},120);
	$('.chat_title_media').css({width:195});
}

function cp_open(){
	$('#cp').show().transition({y:0,opacity:1},220,'easeOutExpo');
	$('.chat_options').addClass('chat_options_on').attr('onClick','cp_close();');
}

function cp_close(){
	$('#cp').transition({y:20,opacity:0},220,'easeOutExpo',function(){$(this).hide();});
	$('.chat_options').removeClass('chat_options_on').attr('onClick','cp_open();');
}

function cp_add(user,type){
	var fire;
	if(user==userself){user='self';}
	if(cp_video==0&&cp_audio==0){fire=true}
	if(($('#cp_user_'+user).length)<1){
		if(type=='v'){
			if(cp_video<4){
				cp_video++;
				$('#cp_frame').hide();
				$('#cp_audio_all').delay(100).before(
				'<div id="cp_user_'+user+'" type="v" class="cp_video kz_user'+user+'_brd kz_user'+user+'_dbkg"><video src="http://az735234.vo.msecnd.net/kolabnxfront/test/user'+user+'.mp4" class="cp_video_feed" poster="http://az735234.vo.msecnd.net/kolabnxfront/img/kzone/vid.png" autoplay loop></video></div>'//SRC AND LOOP FOR DEMO PURPOSES, KEEP POSTER
				);
				cp_update();
			}
		}
		else{
			if(cp_audio<8){
				cp_audio++;
				$('#cp_frame').hide();
				$('#cp_audio_all').delay(100).append(
				'<div id="cp_user_'+user+'" type="a" class="cp_audio kz_user'+user+'_brd kz_user'+user+'_dbkg kz_user'+user+'_img"></div>'
				);
				cp_update();
			}
		}
	}
	if(fire){cp_create();}
}

function cp_remove(user,uswitch){
	uswitch = uswitch || 0;
	if(user==userself){user='self';}
	if(($('#cp_user_'+user).length)>0){
		var type = $('#cp_user_'+user).attr('type');
		if(type=='v'){
			cp_video=cp_video-1;
		}
		else{
			cp_audio=cp_audio-1;
		}
		$('#cp_frame').hide();
		$('#cp_user_'+user).remove();
		
		if(cp_video==0&&cp_audio==0&&uswitch==0){
			if(($('#cp').hasClass('cp_fs'))){
				cp_fs_check();
			}
			cp_destroy();
			cp_size=cp_size_find();
		}
		else{
			cp_update();
		}
	}
}

function cp_mute(){
	if(($('#cp_volume').hasClass('cp_volume_mute'))){
		$('#cp_volume').removeClass('cp_volume_mute');
	}
	else{
		$('#cp_volume').addClass('cp_volume_mute');
	}
}

function cp_size_find(){
	if($(window).width()>1780){return 3}
	else if($(window).width()>1440){return 2}
	else{return 1}
}

function cp_fs_adjust(){
	var hspace = parseInt($('#cp').css('height'));
	var wspace = parseInt($('#cp').css('width'));
	var hsubstract = 12;
	if(cp_audio>0){
		audio=52;
		hspace = hspace-audio;
		hsubstract = 64;
		$('#cp_audio_all').show().css({position:'absolute',bottom:-6});
	}
	else{
		$('#cp_audio_all').hide();
	}
	
	if(cp_video<2){
		wspace = wspace - 6;
		hspace = hspace - 12;
		if((Math.round(wspace/1.333333))<=hspace){
			$('.cp_video').css({width:'calc(100% - 6px)',height:Math.round(wspace/1.333333),marginTop:Math.round(((hspace-((wspace/1.333333)))/2)+4),marginLeft:0});
		}
		else{
			$('.cp_video').css({height:'calc(100% - '+hsubstract+'px)',width:Math.round(hspace*1.333333),marginLeft:Math.round(((wspace-((hspace*1.333333)))/2)+3),marginTop:0});
		}
		
	}
	else if(cp_video<3){
		wspace = wspace - 12;
		hspace = hspace - 12;
		$('.cp_video').css({width:'calc(50% - 6px)',height:Math.round((wspace/2)/1.333333),marginTop:Math.round(((hspace-(((wspace/2)/1.333333)))/2)+4),marginLeft:0});
	}
	else if(cp_video<4){
		wspace = wspace - 12;
		hspace = hspace - 20;
		if((Math.round(wspace/1.333333))<=hspace){
			$('.cp_video').css({width:'calc(50% - 6px)',height:Math.round((wspace/2)/1.333333),marginTop:0,marginLeft:0});
			$('.cp_video').eq(0).css({marginTop:Math.round(((hspace-((wspace/1.333333)))/2)+4)});
			$('.cp_video').eq(1).css({marginTop:Math.round(((hspace-((wspace/1.333333)))/2)+4)});
			$('.cp_video').eq(2).css({marginLeft:'25%'});
		}
		else{
			if(cp_audio>0){hsubstract = (hsubstract/2)+4;}
			else{hsubstract = hsubstract+2;}
			$('.cp_video').css({height:'calc(50% - '+hsubstract+'px)',width:Math.round((hspace/2)*1.333333),marginLeft:0,marginTop:0});
			$('.cp_video').eq(0).css({marginLeft:Math.round(((wspace-((hspace*1.333333)))/2)+3)});
			$('.cp_video').eq(2).css({marginLeft:(Math.round(((wspace-((hspace*1.333333)))/2)+3))+((Math.round((hspace/2)*1.333333))/2)});
		}
	}
	else{
		wspace = wspace - 12;
		hspace = hspace - 20;
		if((Math.round(wspace/1.333333))<=hspace){
			$('.cp_video').css({width:'calc(50% - 6px)',height:Math.round((wspace/2)/1.333333),marginTop:0,marginLeft:0});
			$('.cp_video').eq(0).css({marginTop:Math.round(((hspace-((wspace/1.333333)))/2)+4)});
			$('.cp_video').eq(1).css({marginTop:Math.round(((hspace-((wspace/1.333333)))/2)+4)});
		}
		else{
			if(cp_audio>0){hsubstract = (hsubstract/2)+4;}
			else{hsubstract = hsubstract+2;}
			$('.cp_video').css({height:'calc(50% - '+hsubstract+'px)',width:Math.round((hspace/2)*1.333333),marginLeft:0,marginTop:0});
			$('.cp_video').eq(0).css({marginLeft:Math.round(((wspace-((hspace*1.333333)))/2)+3)});
			$('.cp_video').eq(2).css({marginLeft:Math.round(((wspace-((hspace*1.333333)))/2)+3)});
		}
	}
}

function cp_fs_in(){
	cp_fs_save[0]=Math.round(parseInt($('#cp').css('top')));
	cp_fs_save[1]=Math.round(parseInt($('#cp').css('right')));
	
	$('#cp').addClass('cp_fs').css({cursor:'default'}).draggable({disabled:true}).transition({width:'calc(100% - 357px)',height:'calc(100% - 66px)',paddingBottom:40,borderWidth:'2px',top:8,right:335},580,'easeOutExpo',function(){cp_fs_adjust();$('#cp_frame').fadeIn(280);safe=1;loading(0);if(chat_status==1){}else{chat_control('kzchat');}$('.nano').nanoScroller();$('#'+chat_position+'_view .nano').nanoScroller({scroll:'bottom'});});
	$('#cp_close').transition({opacity:0},200,'',function(){$(this).css({display:'none'});});
	$('.cp_size').transition({y:-2},280);
	
	$('#cp_audio_all').transition({height:46},580,'easeOutExpo');
	$('.cp_audio').transition({width:42,height:42,backgroundSize:'42px 42px'},580,'easeOutExpo');
	
	$('.chat_options').removeClass('chat_options_on').css({opacity:0})
	setTimeout(function(){$('.chat_options').hide();},120);
	$('.chat_title_media').css({width:195});
	
	$('.player').transition({opacity:0},420,'',function(){$(this).hide()});
	$('.app').transition({opacity:0},420,'',function(){$(this).hide()});
	
	$('#nav_time').attr('onClick',"");
	
	if(chat_status==0){
		$('#chat').hide().transition({height:'calc(100% - 20px)',y:'calc(100% + 20px)'},0,'',function(){$(this).show();});
	}
	else{
		chat_fs_in();
		$('#chat').transition({height:'calc(100% - 20px)'},580,'easeOutExpo',function(){chat_adjustcall("open");});
	}
	
	if(backstore_status!==''){backstore_control(backstore_status,'BYPASS');}
	$('#struc_content').fadeOut(580);
	$('#struc_notif').fadeOut(580);
}

function cp_fs_check(w,h){
	if(($('#cp').hasClass('cp_fs'))){					
		$('#cp').removeClass('cp_fs').css({cursor:'move'}).transition({width:w,height:h,paddingBottom:36,borderWidth:'2px',top:cp_fs_save[0],right:cp_fs_save[1]},480,'easeOutExpo',function(){$('#cp').draggable({disabled:false});$('.nano').nanoScroller();$('#'+chat_position+'_view .nano').nanoScroller({scroll:'bottom'});});
		$('#cp_close').css({display:'block'}).transition({opacity:1},200);
		$('.cp_size').transition({y:0},280);
		$('#cp_audio_all').show().css({position:'initial',bottom:'initial'});
		$('.cp_video').css({marginLeft:0,marginTop:0});
		
		$('.chat_options').show().css({opacity:1});
		setTimeout(function(){$('.chat_options').addClass('chat_options_on');},120);
		$('.chat_title_media').css({width:170});
	
		$('.player').show().transition({opacity:1},420);
		$('.app').show().transition({opacity:1},420);
		
		$('#struc_content').fadeIn(480);
		$('#struc_notif').fadeIn(480);
		$('#nav_time').attr('onClick',"backstore_control('toolbox');$('#toolbox_note').focus();");
		if(chat_status==0){
			$('#chat').hide().transition({height:340,y:350},0,'',function(){$(this).show();});
		}
		else{
			chat_fs_out();
			$('#chat').transition({height:340},480,'easeOutExpo',function(){chat_adjustcall("open");});
		}
	}
	else{
		$('#cp').transition({width:w,height:h},480,'easeOutExpo');
	}
}

function cp_update(size){
	if(safe==1){
		if(size!==cp_size){
			safe=0;loading(1);
			var audio=0;
			
			$('.cp_size').removeClass('kz_color_brd kz_color_bkg');
			if(cp_size==0){cp_size=cp_size_find();}
			else if(size==null){}
			else{cp_size=size;}
			$('#cp_size_'+cp_size).addClass('kz_color_brd kz_color_bkg');
			
			$('#cp_frame').hide();
			
			if(cp_size<4){

				if(cp_video>0){
					
					if(cp_audio>0){if(cp_size<3){audio=41;}else{audio=52;}}
					
					if(cp_size==1){
						$('.cp_video').transition({width:88,height:66},480,'easeOutExpo',function(){$('#cp_frame').fadeIn(280);safe=1;loading(0);});
						$('#cp_audio_all').transition({height:35},480,'easeOutExpo');
						$('.cp_audio').transition({width:31,height:31,backgroundSize:'31px 31px'},480,'easeOutExpo');
						
						if(cp_video==1 && cp_audio<3){
							cp_fs_check(182,70+audio);
						}
						else if(cp_video<3){
							if(cp_audio<6){
								cp_fs_check(182,70+audio);
							}
							else{
								cp_fs_check(206,70+audio);
							}
						}
						else if(cp_video==3){
							cp_fs_check(276,70+audio);
						}
						else{
							cp_fs_check(182,146+audio);
						}
					}
					
					else if(cp_size==2){
						$('.cp_video').transition({width:160,height:120},480,'easeOutExpo',function(){$('#cp_frame').fadeIn(280);safe=1;loading(0);});
						$('#cp_audio_all').transition({height:35},480,'easeOutExpo');
						$('.cp_audio').transition({width:31,height:31,backgroundSize:'31px 31px'},480,'easeOutExpo');
						
						if(cp_video==1 && cp_audio<5){
							cp_fs_check(160,124+audio);
						}
						else if(cp_video<3){
							cp_fs_check(326,124+audio);
						}
						else{
							cp_fs_check(326,254+audio);
						}
					}
					
					else{
						$('.cp_video').transition({width:320,height:240},480,'easeOutExpo',function(){$('#cp_frame').fadeIn(280);safe=1;loading(0);});
						$('#cp_audio_all').transition({height:46},480,'easeOutExpo');
						$('.cp_audio').transition({width:42,height:42,backgroundSize:'42px 42px'},480,'easeOutExpo');
						
						if(cp_video==1){
							cp_fs_check(320,244+audio);
						}
						else if(cp_video<3){
							cp_fs_check(646,244+audio);
						}
						else{
							cp_fs_check(646,494+audio);
						}
					}
					
				}
				else{
					if(cp_audio==0){cp_destroy();safe=1;loading(0);}
					else{
						if(cp_size<3){
							audio=35;
							$('#cp_audio_all').transition({height:35},480,'easeOutExpo',function(){$('#cp_frame').fadeIn(280);safe=1;loading(0);});
							$('.cp_audio').transition({width:31,height:31,backgroundSize:'31px 31px'},480,'easeOutExpo');
							if(cp_audio<6){
								cp_fs_check(182,audio);
							}
							else{
								cp_fs_check(276,audio);
							}
						}
						else{
							audio=47;
							$('#cp_audio_all').transition({height:46},480,'easeOutExpo',function(){$('#cp_frame').fadeIn(280);safe=1;loading(0);});
							$('.cp_audio').transition({width:42,height:42,backgroundSize:'42px 42px'},480,'easeOutExpo');
							if(cp_audio<8){
								cp_fs_check(320,+audio);
							}
							else{
								cp_fs_check(356,audio);
							}
						}
					}
				}
			}
			else{
				cp_fs_in();
			}
		}
	}
}

var kz_chat = {person:'',name:'',message:'',smb:0,time:0,pre:0};  //USE SMB=1 IF CONVERSATION ONLY CONTAINS BIG SMILEY
function kz_chat_mess(kz_chat){ //CHAT FUNCTION TO SEND/RECEIVE MESSAGES

	var person = kz_chat.person || '';
	var name = kz_chat.name || '';
	var smb = kz_chat.smb || 0;
	var message = kz_chat.message || '';
	var time = kz_chat.time || 0;
		
	var last_p = $('#kzchat_view .chat_block_text').last().attr('person') || "";
	var last_t = parseInt($('#kzchat_view .chat_block_text').last().attr('time')) || 0;
	var now = parseInt(time);
	var nameb = name.split(" ");
	
	if(smb==1){smb=" smiley_big_text";}
	else{smb="";}
      //-------------Fode Toure---------------------- 
	var theDate = new Date(now  * 1000); 
        var options = { year: "2-digit",month: "2-digit",day: "2-digit"};
       var options2 = {  hour: "2-digit", minute: "2-digit"};
        var dateString = theDate.toLocaleDateString("en-GB",options) + ' ' + theDate.toLocaleTimeString("en-US",options2);
        //---------------------------------------------
	var check;
	if(last_t==0){check = "none";}
	else{check = now-last_t;}
	
	if('kzchat'==chat_position && chat_status==1){}
	else{chat_ping('kzchat');}
	
	if(person==userself){
		if(person==last_p){
			if(check<=60000){
				$('#kzchat_view .chat_conv').last().append(
				'<p class="chat_block_text'+smb+'" person="'+person+'" time="'+dateString+'">'+message+'</p>'
				);
			}
			else{
				$('#kzchat_view .nano-content').last().append(
				'<div class="chat_conv user_conv kz_userself_brd"><span class="chat_block_time user_block_time">'+dateString+'</span><p class="chat_block_title">You</p><p class="chat_block_text'+smb+'" person="'+person+'" time="'+dateString+'">'+message+'</p></div>'
				);
			}
		}
		else{
			$('#kzchat_view .nano-content').last().append(
			'<div class="chat_conv user_conv kz_userself_brd"><span class="chat_block_time user_block_time">'+dateString+'</span><p class="chat_block_title">You</p><p class="chat_block_text'+smb+'" person="'+person+'" time="'+dateString+'">'+message+'</p></div>'
			);
		}
	}
	else{
		if(person==last_p){
			if(check<=60000 && person==last_p){
				$('#kzchat_view .chat_conv').last().append(
				'<p class="chat_block_text'+smb+'" person="'+person+'" time="'+dateString+'">'+message+'</p>'
				);
			}
			else{
				$('#kzchat_view .nano-content').last().append(
				'<div class="chat_conv kz_user'+person+'_brd"><span class="chat_block_time">'+dateString+'</span><p class="chat_block_title">'+nameb[0]+'</p><p class="chat_block_text'+smb+'" person="'+person+'" time="'+dateString+'">'+message+'</p></div>'
				);
			}
		}
		else{
			$('#kzchat_view .nano-content').last().append(
			'<div class="chat_conv kz_user'+person+'_brd"><span class="chat_block_time">'+dateString+'</span><p class="chat_block_title">'+nameb[0]+'</p><p class="chat_block_text'+smb+'" person="'+person+'" time="'+dateString+'">'+message+'</p></div>'
			);
		}
	}
	
	$('#kzchat_view .chat_block_write').insertAfter('.chat_conv:last-child');
	$('#kzchat_view .chat_block_text').last().fadeTo(0,0.01).fadeTo(200,1);
	if(chat.pre!==1){chat_nanodown();}
	
}

/* TESTING PLATFORM

kz_chat_mess({person:3,name:'Frank Asselin',message:'This is a test',smb:0,time:1});
kz_chat_mess({person:3,name:'Frank Asselin',message:'Here is my second message pretty closely',smb:0,time:2});
kz_chat_mess({person:5,name:'Kevin Berard',message:'Another person to the conversation!',smb:0,time:3});
kz_chat_mess({person:2,name:'Jay Machalani',message:'Aiight here I come myself',smb:0,time:1000});
kz_chat_mess({person:2,name:'Jay Machalani',message:'A notch later',smb:0,time:70000});
kz_chat_mess({person:3,name:'Frank Asselin',message:'My turn now',smb:0,time:140000});
kz_chat_mess({person:3,name:'Frank Asselin',message:'A notch later too',smb:0,time:210000});
kz_chat_mess({person:4,name:'Catherine Francoeur',message:'New Convo!!! Miaw!',smb:0,time:20000000});

*/

function kz_chat_newsession(){ //USE THIS FUNCTION TO ADD LINE BETWEEN CONVERSATION SESSIONS, A SESSION IS WHEN EVERYBODY LEFT THE SQUARE !!!!!!
	$('#kzchat_view .nano-content').append('<div class="chat_block_later"></div>');
}

function task_toggles(target){
	if($('#task_'+target+' .kz_img').hasClass('kz_user'+userself+'_bkg')){
		if(($('#task_'+target).attr('taskstatus'))=='a'){
			$('#task_'+target).hide().prependTo('#kz_completed').attr('taskstatus','c').fadeIn(200);
			$('#task_'+target+' .kz_img').addClass('kzics kzi_task');
			$('#task_'+target+' .view_action_full').eq(0).remove();
		}
		else if(($('#task_'+target).attr('taskstatus'))=='u'){
			$('#task_'+target).hide().appendTo('#kz_assigned').attr('taskstatus','a').fadeIn(200);
			$('#task_'+target+' .view_action_manage').prepend('<div onClick="task_moveup(\''+target+'\')" class="t015 view_action_half view_action_full">Move up</div>');
		}
		else{
			$('#task_'+target).hide().appendTo('#kz_unassigned').attr('taskstatus','u').fadeIn(200);
			$('#task_'+target+' .kz_img').removeClass('kzics kzi_task').removeClass('kz_user'+userself+'_bkg kz_userself_bkg');
		}
	}
	else{
		for(i=0;i<8;i++){
			if($('#task_'+target+' .kz_img').hasClass('kz_user'+(i+1)+'_bkg')){
				$('#task_'+target+' .kz_img').removeClass('kz_user'+(i+1)+'_bkg');
			}
		}
		$('#task_'+target+' .kz_img').addClass('kz_user'+userself+'_bkg kz_userself_bkg');
		
		if(($('#task_'+target).attr('taskstatus'))=='a'){
		}
		else if(($('#task_'+target).attr('taskstatus'))=='u'){
			$('#task_'+target).hide().appendTo('#kz_assigned').attr('taskstatus','a').fadeIn(200);
			$('#task_'+target+' .view_action_manage').prepend('<div onClick="task_moveup(\''+target+'\')" class="t015 view_action_half view_action_full">Move up</div>');
		}
		else{
			$('#task_'+target).hide().appendTo('#kz_assigned').attr('taskstatus','a').fadeIn(200);
			$('#task_'+target+' .kz_img').removeClass('kzics kzi_task');
			$('#task_'+target+' .view_action_manage').prepend('<div onClick="task_moveup(\''+target+'\')" class="t015 view_action_half view_action_full">Move up</div>');
		}
	}
	if($('#kz_assigned .view_box').length<1){$('#kz_assigned_title').slideUp(240);$('#kz_assigned').slideUp(240);}
	else{$('#kz_assigned_title').slideDown(180);$('#kz_assigned').slideDown(180);}
	
	if($('#kz_unassigned .view_box').length<1){$('#kz_unassigned_title').slideUp(240);$('#kz_unassigned').slideUp(240);}
	else{$('#kz_unassigned_title').slideDown(180);$('#kz_unassigned').slideDown(180);}
	
	if($('#kz_completed .view_box').length<1){$('#kz_completed_title').slideUp(240);$('#kz_completed').slideUp(240);}
	else{$('#kz_completed_title').slideDown(180);$('#kz_completed').slideDown(180);}
}

function task_moveup(target){
	$('#task_'+target).hide().prependTo('#kz_assigned').fadeIn(200);
}

function color_toggles(target){
	var check = $('#'+target+'_tg').css('backgroundColor');
	
	if(check=='rgba(0, 0, 0, 0)'){
		$('#'+target+'_tg').addClass('kz_'+target+'_bkg');
	}
	else{
		$('#'+target+'_tg').removeClass('kz_'+target+'_bkg');
	}
}

function ebr_drop(target){
	if(safe==1){
		safe==0;
		$('.ebr_drop').fadeOut(100);
		$('.ebar_box').removeClass('ebar_box_active');
		$('.ebari_highlights').removeClass('ebari_highlights_active');
		$('.ebari').removeClass('ebari_active');
		if(($('.ebr_'+target).css('display'))=='none'){
			$('.ebr_'+target).slideDown(300,'easeOutExpo',function(){safe==1});
			if(target=='highlight'){$('.ebari_highlights').addClass('ebari_highlights_active');}
			else if(target=='linesp'){$('.ebari_'+target).addClass('ebari_active');}
			else{$('.ebar_'+target).addClass('ebar_box_active');}
		}
		else{
			$('.ebr_'+target).fadeOut(100,'',function(){safe==1});
			$('.ebar_box').removeClass('ebar_box_active');
			$('.ebari_highlights').removeClass('ebari_highlights_active');
			$('.ebari').removeClass('ebari_active');
		}
	}
}

function ebr_title(section,target){
	switch(section){
		case 'style': 
			$('.ebr_style .ebr_dropl').removeClass('lockactive');
			$('.ss_'+target).addClass('lockactive');
			$('.ebar_title_style').attr('current',target).text($('.ss_'+target).text());break;
		
		case 'font': 
			$('.ebr_font .ebr_dropl').removeClass('lockactive');
			$('.ss_'+target).addClass('lockactive');
			$('.ebar_title_font').attr('current',target).text($('.ss_'+target).text());break;
		
		case 'size': 
			$('.ebr_size .ebr_dropl').removeClass('lockactive');
			$('.ss_'+target).addClass('lockactive');
			$('.ebar_title_size').attr('current',target).text($('.ss_'+target).text());break;
		
		case 'highlight': 
			if(target!==($('.ebari_highlight').attr('current'))){
				$('.ebari_highlight').addClass(target).removeClass(($('.ebari_highlight').eq(0).attr('current')));
				$('.ebari_highlights').addClass(target).removeClass(($('.ebari_highlight').eq(0).attr('current')));
				$('.ebari_highlight').attr('current',target);
			}break;
		
		case 'linesp': 
			$('.ebr_linesp .ebr_dropl').removeClass('lockactive');
			$('.ss_'+target).addClass('lockactive');
			$('.ebari_linesp').attr('current',target);break;
	}
}

function editor_info(){
	$('#editor_info').css({width:(parseInt($('.page').outerWidth(true)))});
	if(parseInt($('#editor_info').css('bottom'))>-10){
		$('#editor_info').stop(true,true).transition({bottom:-57},160);
	}
	else{
		$('#editor_info').stop(true,true).transition({bottom:10},500,'easeOutExpo');
	}
}