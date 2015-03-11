var safe=1; //ANIMATION CONTROL FOR BLOCK DURING TRANSITION OPERATIONS (1 BY DEFAULT)
var appindex=49; //TRACK OF PLAYERAPP INDEX POSITION
var network_status=1; //CHECK NETWORK FUNCTION, CURRENT CONNECTION STATUS (1 BY DEFAULT)
var current=""; //CURRENT PAGE ON KOLAB OPEN (locker BY DEFAULT)
var backstore_status=""; //ID OF THE OPENED BACKSTORE ("" BY DEFAULT)
var backstore_position="1"; //POSITION INSIDE THE CURRENT OPENED BACKSTORE (1 BY DEFAULT)
var backstore_status_2=""; //ID OF THE OPENED BACKSTORE 2 ("" BY DEFAULT)
var backstore_level="A"; //POSITION INSIDE THE CURRENT OPENED BACKSTORE POSITION (A BY DEFAULT)
var timer=0; //HOW MANY TIMERS ARE CURRENTLY ACTIVE
var chat_status=0; //IS ANY CHAT CONVERSATION OPEN (0 BY DEFAULT)
var chatfit=0; //HOW MANY CHAT CLUSTERS CAN FIT ON SCREEN (0 BY DEFAULT)
var chat_position="TESTIDjoe"; //ID OF CURRENT ACTIVE CHAT USER (FIRST OF THE ARRAY)
var chat_active=7; //NUMBER OF ACTIVE CONVERSATIONS
var chat_rebound=0; //CONTROL VARIABLE FOR CONVERSATION REBOUND WHEN OPENING THE CHAT LIST (0 BY DEFAULT)
var chat_array=[]; //CURENT ARRAY OF ACTIVE CONVERSATIONS ON KOLAB (ID)
var notif_mess=0; //NUMBER OF MESSAGES UNSEEN
var notif_info=0; //NUMBER OF INFORMAL NOTIFICATIONS UNSEEN
var notif_action=0; //NUMBER OF ACTIONABLE NOTIFICATIONS PENDING


$(document).ready(function(){
	
	$(window).load(function(){
			
		/*setInterval( function() {
		var newDate = new Date();
		newDate.setDate(newDate.getDate());
		$('#time_date').html(newDate.getDate() + '/' + parseInt(newDate.getMonth()+1));
			var hours = new Date().getHours();
			var minutes = new Date().getMinutes();
			var ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12;
			minutes = minutes < 10 ? '0'+minutes : minutes;
			
			$("#min").html(minutes);
			$("#hours").html(hours);
			$("#mm").html(ampm);
	
		}, 1000);*/
		
		var adj;
		adjust();
		$(window).resize(function(){
			adjust();
		});
		
		ion.sound({
			sounds: [
				{name: "chat_in"},
				{name: "kchat_in",},
				{name: "notif",volume: 0.55},
				{name: "remind",},
				{name: "error",volume: 1}
			],
			volume: 0.85,
			multiplay: true,
			path: http_base+"/kolabNXFront/sound/",
			preload: true
		});
		
		tooltip_refresh();		
		
		$("#load").delay(300).slideUp(300,"",function(){ready();$('body').css('cursor','initial')}); //LOAD READY FUNCTION THROUGH DELAY WHEN EVERYTHING IS LOADED	
		
		$('#chat_list_input').focus(function(){
			$('#view_chat_list').stop('',true,true).delay(150).stop('',true,true).fadeOut(150);
			$('#chat_online').stop('',true,true).delay(150).stop('',true,true).slideUp(200,'',function(){
				$('#view_chat_search').stop('',true,true).delay(140).stop('',true,true).fadeIn(150);
				$('#chat_search').stop('',true,true).slideDown(200,'',function(){$('.nano').nanoScroller();});
			});
		});
		$('#chat_list_input').blur(function(){
			$(this).val('');
			$('#view_chat_search').stop('',true,true).delay(150).stop('',true,true).fadeOut(150);
			$('#chat_search').stop('',true,true).delay(150).stop('',true,true).slideUp(200,'',function(){
				$('#view_chat_list').stop('',true,true).delay(140).stop('',true,true).fadeIn(150);
				$('#chat_online').stop('',true,true).slideDown(200,'',function(){$('.nano').nanoScroller();});
			});
		});
		/*$('.view_peoplesearch').focus(function(){
			$('.view_peoplesearch_tab').stop(true,true).transition({height:154},320,'easeOutExpo');
                        $('#sq_bkdhelper_peoplesearch_tab').empty();//Fode
		});
		$('.view_peoplesearch').blur(function(){
                        $(document).trigger('sqaddusertoinvite',null); //Fode
		});*/
		
		$(document).click(function(){$('.tp').tooltip('close');$('.a_tp').tooltip('close');$('.tm').tooltip('close');$('.km').tooltip('close');});
		$('.tipsafe').click(function(e){e.stopPropagation();}); //USE THIS CLASS ON EVERY ELEMENT THAT CONTAINS A TOOLTIP AND IS GENERATED AFTER INITIAL LOAD/DYNAMICALLY
		
		$('.list_item').mouseup(function(e){
			if(e.which==1){
				var target = $(this).parent().attr("id");
				var clicked = $(this).attr('value');
				
				if($('#'+target).attr('active')==clicked){}
				else{
					$('#'+target+' .list_item').removeClass('list_active').attr('style','');
					$(this).addClass('list_active');
					if($(this).attr('color')){$('#'+target+' .list_active').css({backgroundColor:($(this).attr('color'))});}
					$('#'+target).attr('active',clicked);
				}
			}
		});
		
		$('.onoff_item').mouseup(function(e){
			if(e.which==1){
				console.log(this);
				if($(this).attr('active')==1){
					$(this).attr('active',0).removeClass('onoff_active');
				}
				else{
					$(this).attr('active',1).addClass('onoff_active');
				}
			}
		});
		
		chat_input_manage();
	});
});

function ready(){ //STARTING ANIMATION AND REVEAL OF CONTENT
		
    setTimeout(function(){	
	
		$("#struc_left").transition({x:0},800,"easeOutExpo",update_current());
		$("#struc_right").transition({x:0},800,"easeOutExpo");
		$("#struc_content").delay(800).show().transition({opacity:1,display:'block'},320,'',function(){
			switch(current){
				case 'locker':locker_reveal();break;
				case 'social':social_reveal();break;
				case 'feedback':special_reveal();break;
				case 'help':special_reveal();break;
			}
		});
		$('#background').transition({y:50}).transition({y:0,opacity:0.06},1800,'easeOutExpo',function(){$('.nano').nanoScroller();});
		$("#nav_menu").delay(600).show().transition({opacity:1,display:'block'},400);
		$("#struc_notif").delay(300).show().transition({opacity:1,display:'block'},400,'',function(){notif_update();});
		if(current=='kzone'){setTimeout(function(){kzone_reveal();},700);}
		
		shortcuts();
		
		if(timer>=1){$("#time_remind").css("opacity",'1');}
	
	},300);
}

function adjust(){ //MAIN RESIZING FUNCTION TO BE CALLED ON EVERY RESIZE AND MOVE

    width = parseInt($(window).width());
	height = parseInt($(window).height());
	
	if(width<1160||height<620){
		$('#notif_size').slideDown(600,"easeOutExpo");
	}
	else{
		$('#notif_size').slideUp(300);
	}
		
	var distance = 260;
	var substract = 394;
	
	if(current=='kzone'&&$('#cp').hasClass('cp_fs')){
		cp_fs_adjust();
		distance = 44;
		substract = 159;
	}
	
	$('.nano').nanoScroller();
	setTimeout(function(){$('.nano').nanoScroller();},420); 
	backstore_refresh();

	$('#view_chat').css("height",height-124-parseInt($("#chat_active").css("height")));
	if(($('#chat_list').css("display"))=='block'){$('.view_chat_lists').css("height",height-124-parseInt($("#chat_active").css("height"))-parseInt($("#view_chat_other").css("height")));}

	if(chat_status==0){
		chatfit=(Math.floor((height-153)/52));
		$('#chat_wrapper').stop().transition({height:(chatfit*52)+19},280);
		chat_adjustmore();
	}
	else{
		chatfit=(Math.floor((height-substract)/52));
		$('#chat_wrapper').stop().transition({height:(chatfit*52)+distance},280);
		chat_adjustmore();
	}
}


function loading(signal){
	if(signal==1){$('#wait').stop(true,true).transition({opacity:1},80);}
	else{$('#wait').stop(true,true).transition({opacity:0},380);}
}

function update_rename(target){
	var end = ' | kolab(pre-Alison)';
	switch(target){
		case 'locker':target='Locker'+end;break;
		case 'social':target='Social'+end;break;
		case 'feedback':target='Feedback'+end;break;
		case 'help':target='Help'+end;break;
		case 'kzone':target=sqname;break;
	}
	$(document).prop('title',target);
}

function update_current(target){
	if(target==null){
		$('#bt_'+current).addClass('current bt_current_'+current);
		update_rename(current);
	}
	else if(current==target){}
	else{
		if(($('#struc_content_manage').css('display'))!=='none'){nav_control('manage');}
		//if(backstore_status!==''){backstore_control(backstore_status);} RESET BACKSTORE WHEN CHANGE
		$('#bt_'+current).removeClass('current bt_current_'+current);
		$('#bt_'+target).addClass('current bt_current_'+target);
		update_rename(target);
		current=target;
	}
}

function tooltip_refresh(){
	$(".tp").tooltip({
		content:function(){return $(this).attr('tip');},
		items:'[tip]',
		track:true,
		show:{delay:1200,effect:"fadeIn",duration:120},
		hide:{effect:"fadeOut",duration:100}
	});
	$(".a_tp").tooltip({
		content:function(){return $(this).attr('tip');},
		items:'[tip]',
		track:true,
		position:{my:"left+15 bottom+10",collision:"none"},
		show:{delay:600,effect:"fadeIn",duration:150},
		hide:{effect:"fadeOut",duration:100}
	});
	$(".tm").tooltip({
		content:function(){return $(this).attr('tip');},
		items:'[tip]',
		track:true,
		tooltipClass:'tm_recp',
		show:{delay:200,effect:"fadeIn",duration:80},
		hide:{effect:"fadeOut",duration:80}
	});	
	$(".km").tooltip({
		content:function(){return $(this).attr('tip');},
		items:'[tip]',
		track:true,
		tooltipClass:'kz_km',
		show:{delay:1000,effect:"fadeIn",duration:100},
		hide:{effect:"fadeOut",duration:80}
	});	
}

function blur_alert(target,size){ //BLUR A SPECIFIED TARGET
	var gray = 'grayscale(100%)';
	if(size==0){gray = 'grayscale(0%)'}
	var filter = 'blur('+size+'px) '+gray;
	$(target).css({webkitFilter:filter});
}

function refreshk(){ //NETWORK DISCONNECT ALERT NOTIFICATION
	if(backstore_status!=='network'&&backstore_status!=='restricted'){
		$('#splash_refresh').stop(true,true).transition({opacity:0,scale:0.9},0).show().transition({opacity:1,scale:1},800,'easeOutExpo');
		blur_alert('#struc_wrapper',3);
		$('#safety').show().transition({opacity:0.70},300);
		setTimeout(function(){backstore_control('refresh','BYPASS');},2600);
		ion.sound.play("error");
	}
	else{
		/*
						
$('#splash_refresh').stop(true,true).transition({opacity:0,scale:0.9},600,'easeOutExpo',function(){$(this).hide();});
		blur_alert('#struc_wrapper',0);
		$('#safety').show().transition({opacity:0},400,'',function(){$(this).hide();});
		if(backstore_status=='refresh'){backstore_control('refresh','BYPASS');}
		*/
	}
}

function network(){ //NETWORK DISCONNECT ALERT NOTIFICATION
	if(backstore_status!=='refresh'&&backstore_status!=='restricted'){
		if(network_status==1){
			$('#splash_network').stop(true,true).transition({opacity:0,scale:0.9},0).show().transition({opacity:1,scale:1},800,'easeOutExpo');
			blur_alert('#struc_wrapper',3);
			$('#safety').show().transition({opacity:0.70},300);
			setTimeout(function(){backstore_control('network','BYPASS');},2600);
			network_status=0;
			ion.sound.play("error");
		}
		else{
			/*
			$('#splash_network').stop(true,true).transition({opacity:0,scale:0.9},600,'easeOutExpo',function(){$(this).hide();});
			blur_alert('#struc_wrapper',0);
			$('#safety').show().transition({opacity:0},400,'',function(){$(this).hide();});
			if(backstore_status=='network'){backstore_control('network','BYPASS');}
			network_status=1;
			*/
		}
	}
}

function restricted(){ //NETWORK DISCONNECT ALERT NOTIFICATION
	if(backstore_status!=='refresh'&&backstore_status!=='network'){
			$('#splash_restricted').stop(true,true).transition({opacity:0,scale:0.9},0).show().transition({opacity:1,scale:1},800,'easeOutExpo');
			blur_alert('#struc_wrapper',3);
			$('#safety').show().transition({opacity:0.70},300);
			setTimeout(function(){backstore_control('restricted','BYPASS');},2600);
			ion.sound.play("error");
		}
		else{
			/*
			$('#splash_restricted').stop(true,true).transition({opacity:0,scale:0.9},600,'easeOutExpo',function(){$(this).hide();});
			blur_alert('#struc_wrapper',0);
			$('#safety').show().transition({opacity:0},400,'',function(){$(this).hide();});
			if(backstore_status=='restricted'){backstore_control('restricted','BYPASS');}
			*/
		}
}

function shortcuts(){ //KEYBOARD SHORTCUTS BINDING FUNCTION

	Mousetrap.bind('esc',function(){
    	if(backstore_status!==""){backstore_control(backstore_status);}
	});
	
	Mousetrap.bind('alt+1',function(e){if(typeof chat_array[0]!=='undefined'&&chat_array[0]!==''){e.preventDefault();chat_control(chat_array[0]);}});
	Mousetrap.bind('alt+2',function(e){if(typeof chat_array[1]!=='undefined'&&chat_array[1]!==''){e.preventDefault();chat_control(chat_array[1]);}});
	Mousetrap.bind('alt+3',function(e){if(typeof chat_array[2]!=='undefined'&&chat_array[2]!==''){e.preventDefault();chat_control(chat_array[2]);}});
	Mousetrap.bind('alt+4',function(e){if(typeof chat_array[3]!=='undefined'&&chat_array[3]!==''){e.preventDefault();chat_control(chat_array[3]);}});
	Mousetrap.bind('alt+5',function(e){if(typeof chat_array[4]!=='undefined'&&chat_array[4]!==''){e.preventDefault();chat_control(chat_array[4]);}});
	Mousetrap.bind('alt+6',function(e){if(typeof chat_array[5]!=='undefined'&&chat_array[5]!==''){e.preventDefault();chat_control(chat_array[5]);}});
	Mousetrap.bind('alt+7',function(e){if(typeof chat_array[6]!=='undefined'&&chat_array[6]!==''){e.preventDefault();chat_control(chat_array[6]);}});
	Mousetrap.bind('alt+8',function(e){if(typeof chat_array[7]!=='undefined'&&chat_array[7]!==''){e.preventDefault();chat_control(chat_array[7]);}});
	Mousetrap.bind('alt+9',function(e){if(typeof chat_array[8]!=='undefined'&&chat_array[8]!==''){e.preventDefault();chat_control(chat_array[8]);}});
	Mousetrap.bind('alt+m',function(e){e.preventDefault();setTimeout(function(){backstore_control('mess');},1)});
	Mousetrap.bind('alt+n',function(e){e.preventDefault();setTimeout(function(){backstore_control('notif');},1)});
	Mousetrap.bind('alt+u',function(e){e.preventDefault();setTimeout(function(){backstore_control('user');},1)});
	Mousetrap.bind('alt+t',function(e){e.preventDefault();setTimeout(function(){backstore_control('toolbox');},1)});
	Mousetrap.bind('alt+p',function(e){e.preventDefault();setTimeout(function(){backstore_control('toolbox',3);},1)});
	Mousetrap.bind('alt+a',function(e){e.preventDefault();setTimeout(function(){backstore_control('toolbox',4);},1)});
	Mousetrap.bind('alt+s',function(e){e.preventDefault();setTimeout(function(){$('#bt_search').click();},1);});
	Mousetrap.bind('enter',function(){
		if($('#search_input').is(':focus')){$('.search_first').trigger('click');}
		if(($('.view_location_input').is(":focus"))){$(".view_location").geocomplete();}
	});
}

function darker(hex, percent){
    hex = hex.replace(/^\s*#|\s*$/g, '');
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
	   ((0|(1<<8) + r * (1 - percent / 100)).toString(16)).substr(1) +
	   ((0|(1<<8) + g * (1 - percent / 100)).toString(16)).substr(1) +
	   ((0|(1<<8) + b * (1 - percent / 100)).toString(16)).substr(1);
}

function formatTime(){
	now = new Date();
	var format = "{h}:{m} {ap}";
	var h = now.getHours();
	var ap = new String();
	var pm = (h>11) ? true : false;
	if(h>12) { h -= 12; };
	ap = pm ? "PM" : "AM";
	format = format.replace(/\{ap\}/g,ap);
	var hh = new String();
	hh = h;
	format = format.replace(/\{h\}/g,hh);
	var mm = new String();
	mm = now.getMinutes();
	if(mm<10) { mm = "0"+mm; }
	format = format.replace(/\{m\}/g,mm);

	return format;
}

function backstore_activebutton(target){
	
	if(backstore_status==""){
		switch(target){
			case "square": case "members": case "organization": case "resources": case "history": case "export": case "options": 
			$("#bt_"+target).addClass("bt_current_"+target);break;
			case "mess": case "notif": 
			$("#bt_"+target).addClass("bt_bottom_active");break;
			case "user": 
			$("#bt_"+target).addClass("bt_bottomc_active");break;
		}
	}
	else{
		switch(backstore_status){
			case "square": case "members": case "organization": case "resources": case "history": case "export": case "options": 
			$("#bt_"+backstore_status).removeClass("bt_current_"+backstore_status);break;
			case "mess": case "notif": 
			$("#bt_"+backstore_status).removeClass("bt_bottom_active");break;
			case "user": 
			$("#bt_"+backstore_status).removeClass("bt_bottomc_active");break;
		}
		if(backstore_status!==target){
			switch(target){
				case "square": case "members": case "organization": case "resources": case "history": case "export": case "options": 
			$("#bt_"+target).addClass("bt_current_"+target);break;
				case "mess": case "notif": 
				$("#bt_"+target).addClass("bt_bottom_active");break;
				case "user": 
				$("#bt_"+target).addClass("bt_bottomc_active");break;
			}
		}
	}
}

function backstore_refresh(){
	var vm = $('.view_titlevm').length;
	var vv = $('.view_titlevv').length;
	if(vm>0){
		$('.view_message_vm').css("height",height-329-vm);
		$(".nano").nanoScroller();
	}
	if(vv>0){
		$('.view_message_vv').css("height",height-445-vv);
		$(".nano").nanoScroller();
	}
	tooltip_refresh();
	$(".nano").nanoScroller();
}

function backstore_2(action){
	backstore_status_2='';
	switch(action){
		case 'restore':$('#struc_backstore_2').transition({x:0},0);
		break;
		case 'move':$('#struc_backstore_2').transition({x:274},0);
		break;
		case 'force':$('#struc_backstore_2').transition({x:0},500,"easeOutExpo");
		break;
		case 'forcex':$('#struc_backstore_2').transition({x:0},600,"easeOutExpo");
					  backstore_control(backstore_status);
		break;
		default:'backstore_2("restore")';
		break;
	}
}

function backstore_2_color(color){
	var switchto;
	if(color){
		switchto = darker(color,20);
		
		$('#struc_backstore_2').delay(60).transition({borderRightColor:switchto},300);
		$('#struc_backstore_2 .bs_header').delay(60).transition({backgroundColor:switchto},300);
		$('#struc_backstore_2 .bs_footer').delay(60).transition({backgroundColor:switchto},300);
	}
	else{
		var rgb = $('#bs_'+backstore_status+' .bs_header').css('backgroundColor');
		
		rgb= rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		var tohex = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
			switchto = darker(tohex,20);
			
		$('#struc_backstore_2').css('borderRightColor',switchto);
		$('#struc_backstore_2 .bs_header').css('backgroundColor',switchto);
		$('#struc_backstore_2 .bs_footer').css('backgroundColor',switchto);
	}
}

function backstore_control_2(target,BYPASS){
	if(safe==1||BYPASS==1){
		safe=0;loading(1);
		if(backstore_status_2==''){
			backstore_2_color();
			$('#struc_backstore_2').transition({x:548},800,"easeOutExpo");
			$(".trans").transition({x:548},800,"easeOutExpo",
			function(){
				backstore_status_2=target;safe=1;loading(0);tooltip_refresh();
			});
		}
		else if(backstore_status_2==target){
			$('#struc_backstore_2').transition({x:274},600,"easeOutExpo");
			$(".trans").transition({x:274},600,"easeOutExpo",
			function(){
				backstore_status_2="";safe=1;loading(0);tooltip_refresh();
			});
		}
		else{			
			$("#struc_left").transition({x:534},280).transition({x:548});
			$("#search").transition({x:534},280).transition({x:548});
			$("#search_box").transition({x:534},280).transition({x:548});
			$("#nav_menu").transition({x:534},280).transition({x:548});
			$("#struc_content_manage").transition({x:534},280).transition({x:548});
			$("#struc_content").transition({x:534},280).transition({x:548});
			
			backstore_2_color();
			$('#struc_backstore_2').transition({x:0},300).transition({x:548},800,"easeOutExpo",
			function(){
				tooltip_refresh();
				backstore_status_2=target;safe=1;loading(0);tooltip_refresh();
			});
		}
		
	}
}

function backstore_restore(target){
	$("#bs_"+backstore_status+"_"+backstore_position).removeClass(
		"bs_subtitle_active").addClass("bs_subtitle_not");
	$("#bs_"+backstore_status+"_1").removeClass(
		"bs_subtitle_not").addClass("bs_subtitle_active");
	if(backstore_level=='A'){
		$("#view_"+backstore_status+"_"+backstore_position).fadeOut(200);
		$("#action_"+backstore_status+"_"+backstore_position).fadeOut(200);
	}
	else{
		$("#view_"+backstore_status+"_"+backstore_position+'B').fadeOut(200);
		$("#action_"+backstore_status+"_"+backstore_position+'B').fadeOut(200);
	}
	backstore_position="1";
}

function backstore_selection(target){
	if(safe==1){
		if(backstore_level=='A'){
			safe=0;loading(1);
			var managestatus = $('.view_action_manage').css('display');
			if(managestatus!=='none'){$('.view_action_manage').slideUp(400);}
			
			if(backstore_position==target){safe=1;loading(0);}
			else{
				if(backstore_status_2==''){}
				else{backstore_control_2(backstore_status_2,1);}
				if(backstore_status=='notif'&&target==1){notif_info=0;notif_update();}
				$("#bs_"+backstore_status+"_"+backstore_position).removeClass(
					"bs_subtitle_active").addClass("bs_subtitle_not");
				$("#view_"+backstore_status+"_"+backstore_position).fadeOut(200,"",
					function(){$("#view_"+backstore_status+"_"+target).fadeIn(320);
					$(".nano").nanoScroller();backstore_refresh();});
				$("#action_"+backstore_status+"_"+backstore_position).fadeOut(200,"",
					function(){$("#action_"+backstore_status+"_"+target).fadeIn(320,'',function(){tooltip_refresh();});});
				$("#bs_"+backstore_status+"_"+target).removeClass(
					"bs_subtitle_not").addClass("bs_subtitle_active");
				backstore_position=target;
				safe=1;loading(0);
			}
		}
		else{
			if(target==backstore_position){
				action_back(backstore_status);
			}
			else{
				safe=0;loading(1);
				var managestatus = $('.view_action_manage').css('display');
				if(managestatus!=='none'){$('.view_action_manage').slideUp(400);}
				
				$("#view_"+backstore_status+"_"+backstore_position+'B').fadeOut(200,"",
				function(){$("#view_"+backstore_status+"_"+target).fadeIn(320);
				backstore_refresh();backstore_level='A';});
				$("#action_"+backstore_status+"_"+backstore_position+'B').fadeOut(200,"",
					function(){$("#action_"+backstore_status+"_"+target).fadeIn(320,'',function(){backstore_refresh();});});
				$('.bs_subtitle_active').removeClass('bs_subtitle_activeB');
				$("#bs_"+backstore_status+"_"+backstore_position).removeClass(
					"bs_subtitle_active").addClass("bs_subtitle_not");
				$("#bs_"+backstore_status+"_"+target).removeClass(
					"bs_subtitle_not").addClass("bs_subtitle_active");
				backstore_position=target;
				safe=1;loading(0);tooltip_refresh();
			}
		}
	}
}

function backstore_selectionB(){
	if(safe==1){
		safe=0;loading(1);
		if(backstore_level=='A'){
			$("#view_"+backstore_status+"_"+backstore_position).fadeOut(200,"",
				function(){$("#view_"+backstore_status+"_"+backstore_position+'B').fadeIn(320);
				backstore_refresh();backstore_level='B';safe=1;loading(0);});
			$("#action_"+backstore_status+"_"+backstore_position).fadeOut(200,"",
				function(){$("#action_"+backstore_status+"_"+backstore_position+'B').fadeIn(320,'',function(){backstore_refresh();});});
			$('.bs_subtitle_active').addClass('bs_subtitle_activeB');
		}
	}
}

function backstore_open(target){
	if(target=='notif'){notif_info=0;notif_update();}
	backstore_activebutton(target);
	$("#view_"+target+"_1").fadeIn(200,'',function(){backstore_refresh();});
	$("#action_"+target+"_1").fadeIn(200);
}

function backstore_open_bypass(target,selection,level){
	if(target=='notif' && selection<2){notif_info=0;notif_update();}
	
	$("#bs_"+target+"_"+backstore_position).removeClass(
		"bs_subtitle_active").addClass("bs_subtitle_not");
	$("#view_"+target+"_"+backstore_position).hide();
		backstore_refresh();
	$("#bs_"+target+"_"+selection).removeClass(
		"bs_subtitle_not").addClass("bs_subtitle_active");
	backstore_position=selection;
	
	backstore_activebutton(target);
	if(level=='B'){
		$("#view_"+target+"_"+selection+'B').fadeIn(200,'',function(){backstore_refresh();});
		$("#action_"+target+"_"+selection+'B').fadeIn(200);
		$('.bs_subtitle_active').addClass('bs_subtitle_activeB');
		backstore_level='B';
	}
	else{
		$("#view_"+target+"_"+selection).fadeIn(200,'',function(){backstore_refresh();});
		$("#action_"+target+"_"+selection).fadeIn(200);
	}
	$(".nano").nanoScroller();
}

function backstore_control(target,selection,level){
	if(safe==1||selection=='BYPASS'){
		safe=0;loading(1);
		var managestatus = $('.view_action_manage').css('display');
		if(managestatus!=='none'){$('.view_action_manage').slideUp(400);}
		
		if(backstore_status==""){
			if(($('#bs_'+target).length)>0){
				if(current=='kzone'){$('#ebar_more').transition({x:-274},800,'easeOutExpo');}
				else{$('#side_safety').transition({x:-72,opacity:'1'},600,'easeOutExpo');}
				$("#bs_"+target).css({"z-index":900,"display":"block"}).transition({x:274},800,"easeOutExpo",function(){backstore_2('move');});
				if(selection>0){backstore_open_bypass(target,selection,level);}
				else{backstore_open(target);}
				$(".trans").transition({x:274},800,"easeOutExpo",
					function(){
						backstore_status=target;safe=1;loading(0);tooltip_refresh();
					});
			}
			else{error();console.log('Can\'t load "'+target+'" Backstore');safe=1;loading(0);}
		}
		else if(backstore_status==target){
			if(selection>0){
				safe=1;loading(0);
				if(selection==backstore_position){
					if(level=='B'){
						if(backstore_level=='B'){
							action_back(backstore_status);
							setTimeout(function(){backstore_selectionB();tooltip_refresh();},321);
						}
						else{
							backstore_selectionB();
							tooltip_refresh();
						}
					}
				}
				else{
					if(level=='B'){
						backstore_selection(selection);
						setTimeout(function(){backstore_selectionB();tooltip_refresh();},321);
					}
					else{
						backstore_selection(selection);
						tooltip_refresh();
					}
				}
			}
			else{
				if(backstore_status_2==''){backstore_2('restore');}
				else{backstore_2('force');}
				if(current=='kzone'){$('#ebar_more').transition({x:0},600,'easeOutExpo');}
				else{$('#side_safety').transition({x:0,opacity:'0'},600,'easeOutExpo');}
				$("#bs_"+backstore_status).css("z-index",899).transition({x:0},600,"easeOutExpo");
				backstore_activebutton(target);
				backstore_restore(backstore_position);
				$(".trans").transition({x:0},600,"easeOutExpo",
					function(){backstore_status="";backstore_level='A';safe=1;loading(0);tooltip_refresh();});
			}
		}
		else{
			if(($('#bs_'+target).length)>0){
				backstore_2('restore');
				$("#bs_"+backstore_status).css("z-index",899).transition({x:0}).hide();
				backstore_activebutton(target);
				backstore_restore(backstore_status);
					
				$("#struc_left").transition({x:264},200).transition({x:274},360);
				$("#search").transition({x:264},200).transition({x:274},360);
				$("#search_box").transition({x:264},200).transition({x:274},360);
				$("#nav_menu").transition({x:264},200).transition({x:274},360);
				$("#struc_content_manage").transition({x:264},200).transition({x:274},360);
				$("#struc_content").transition({x:264},200).transition({x:274},360);
				if(current=='kzone'){$('#ebar_more').transition({x:-264},200).transition({x:-274},360);}
				else{$(".nav_list").transition({x:264},200).transition({x:274},360);}
				
				$("#bs_"+target).css({"z-index":900,"display":"block"}).transition({x:274},800,"easeOutExpo",
					function(){
						$("#bs_"+backstore_status).css("left","-274px");
						backstore_2('move');
						if(selection>0&&level=='B'){backstore_level='B';}
						else{backstore_level='A';}
						backstore_status=target;safe=1;loading(0);tooltip_refresh();
					});
				if(selection>0){
					if(level=='B'){
						backstore_open_bypass(target,selection,level);tooltip_refresh();
					}
					else{
						backstore_open_bypass(target,selection);
					}
				}
				else{backstore_open(target);}
			}
			else{error();console.log('Can\'t load "'+target+'" Backstore');safe=1;loading(0);}
		}
	}
}

function action_back(target){
	if(target=='bs2'){
		backstore_control_2(backstore_status_2);
	}
	else{
		if(backstore_level=='A'){
			backstore_control(target);
		}
		else{
			if(safe==1){
				safe=0;loading(1);
				$("#view_"+backstore_status+"_"+backstore_position+'B').fadeOut(200,"",
					function(){$("#view_"+backstore_status+"_"+backstore_position).fadeIn(320);
					backstore_refresh();backstore_level='A';safe=1;loading(0);});
				$("#action_"+backstore_status+"_"+backstore_position+'B').fadeOut(200,"",
					function(){$("#action_"+backstore_status+"_"+backstore_position).fadeIn(320,'',function(){backstore_refresh();});});
				$('.bs_subtitle_active').removeClass('bs_subtitle_activeB');
			}
		}
	}
}

function action_manage(){
	var status = $('.view_action_manage').css('display');
	if(status=='none'){$('.view_action_manage').slideDown(300,'easeOutExpo');}
	else{$('.view_action_manage').slideUp(300,'easeOutExpo');}
}

function action_done(target){
	if(target=='bs2'){backstore_control_2(backstore_status_2);}
	else{
		if(backstore_level=='A'){backstore_control(backstore_status);}
		else{action_back(backstore_status);}
	}
}

function timer_check(){ //SHOW OR HIDE THE TIMER TIME ICON

	if(timer>=1){$("#time_remind").css("opacity",'1');}
	else if(timer<0){timer=0;$("#time_remind").css("opacity",'0');}
	else{$("#time_remind").css("opacity",'0');}
}

function ping_visual(target){ //CHANGE THE COLOR OF SELECTED TIMER OPTION
	
	var status=$('#ping_'+target).css("backgroundColor");
	
	if(status=='rgb(85, 85, 85)'){
		$('#ping_'+target).css("backgroundColor",'rgb(255, 0, 99)');
		timer++;
	}
	else{
		$('#ping_'+target).css("backgroundColor",'rgb(85, 85, 85)');
		timer--;
	}
	timer_check();
}

function selectbinder(target){
	$('.selectbinder_map').removeClass('selectbinder_activem');
	$('#bselect_'+target).addClass('selectbinder_activem');
}

function user_loadmap(ulocation){
	setTimeout(function(){
		$("#user_location_input").geocomplete({
			map:"#user_location",
			mapOptions:{zoom:16},
			markerOptions:{draggable:false},
			location:ulocation
		});
	},220);
}

function chat_input_manage(){
	$('.chat_input_div').bind('keydown',function(){
		setTimeout(function(){
			if(parseInt($('#'+chat_position+'_input').css('height'))>20){
				if(parseInt($('#'+chat_position+'_input').css('height'))==85){$('#'+chat_position+'_input').css('overflow-y','auto')}
				else{$('#'+chat_position+'_input').css('overflow-y','hidden')}
				$('#'+chat_position+'_view .chat_block').css({height:'calc(100% - '+(80+(parseInt($('#'+chat_position+'_input').css('height'))-19))+'px)'});
			}
			else{
				$('#'+chat_position+'_view .chat_block').css({height:'calc(100% - 80px)'});
			}
			$('.nano').nanoScroller();
			$('#'+chat_position+'_view .nano').nanoScroller({scroll:'bottom'});
		},2);
	});
}

function user_status(){
	var ctarget = "";
	var cnew = "s_"+$('#user_status').attr('active');
	
	if($('.bt_status_left').hasClass('s_online')){ctarget='s_online'}
	else if($('.bt_status_left').hasClass('s_away')){ctarget='s_away'}
	else if($('.bt_status_left').hasClass('s_busy')){ctarget='s_busy'}
	else{ctarget='s_offline'}
	if(ctarget!==cnew){
		$('.bt_status_left').switchClass(ctarget,cnew,200);
		$('#view_user_1 .b_chat').switchClass(ctarget,cnew);
	}
}

function user_shout(){
	if(backstore_status!==''){backstore_control(backstore_status);}
	setTimeout(function(){
		$('#shout_zone').text('');
		$('#shout').transition({opacity:0,scale:1.03,backgroundColor:'#999'},0).show().transition({opacity:1,scale:1},720,'easeOutExpo');
		$('#shout_done').transition({y:-26,opacity:0},0);
		$('#shout_close').transition({y:-26,opacity:0},0);
	},420);
	setTimeout(function(){$('#shout_zone').text('S');},520);
	setTimeout(function(){$('#shout_zone').text('Sa');},560);
	setTimeout(function(){$('#shout_zone').text('Say');},600);
	setTimeout(function(){$('#shout_zone').text('Say ');},640);
	setTimeout(function(){$('#shout_zone').text('Say s');},680);
	setTimeout(function(){$('#shout_zone').text('Say so');},720);
	setTimeout(function(){$('#shout_zone').text('Say som');},760);
	setTimeout(function(){$('#shout_zone').text('Say some');},800);
	setTimeout(function(){$('#shout_zone').text('Say somet');},840);
	setTimeout(function(){$('#shout_zone').text('Say someth');},880);
	setTimeout(function(){$('#shout_zone').text('Say somethi');},920);
	setTimeout(function(){$('#shout_zone').text('Say somethin');},960);
	setTimeout(function(){$('#shout_zone').text('Say something');},1000);
	setTimeout(function(){$('#shout_zone').text('Say something.');},1200);
	setTimeout(function(){$('#shout_zone').text('Say something..');},1480);
	setTimeout(function(){$('#shout_zone').text('Say something...');},1760);
	setTimeout(function(){
		$('#shout_zone').text('').attr('contenteditable','true').focus();
		$('#shout').transition({backgroundColor:'#AAA'},620);
		$('#shout_done').transition({y:-26,opacity:0},0).show().transition({y:0,opacity:1},780,'easeOutExpo');
		$('#shout_close').transition({y:-26,opacity:0},0).show().delay(80).transition({y:0,opacity:1},780,'easeOutExpo');
	},2800);
}

function user_shout_close(done){
	$('#shout').transition({opacity:0,scale:1.03},460,'easeOutExpo',function(){
		$(this).css({display:'none'});
		$('#shout_done').css({display:'none'});
		$('#shout_close').css({display:'none'});
	});
	if(done==1){
	}
}

function user_pass(){
	$("#user_pass_match").hide();
	$("#user_pass_10000").hide();
	$("#user_pass_security").hide();
	$('#user_npass').attr('style','');
	$('#user_npass2').attr('style','');
}

function passmatch(){
	field("user_npass");
	field("user_npass2");
	$('#user_npass').css({borderBottomColor:'#DA0000'});
	$('#user_npass2').css({borderBottomColor:'#DA0000'});
	$("#user_pass_match").hide();
	$("#user_pass_10000").hide();
	$("#user_pass_security").hide();
	$("#user_pass_match").slideDown(600,"easeOutExpo");
}
function pass10000(){
	field("user_npass");
	field("user_npass2");
	$('#user_npass').css({borderBottomColor:'#DA0000'});
	$('#user_npass2').css({borderBottomColor:'#DA0000'});
	$("#user_pass_match").hide();
	$("#user_pass_10000").hide();
	$("#user_pass_security").hide();
	$("#user_pass_10000").slideDown(600,"easeOutExpo");
}
function passsecurity(){
	field("user_npass");
	field("user_npass2");
	$('#user_npass').css({borderBottomColor:'#DA0000'});
	$('#user_npass2').css({borderBottomColor:'#DA0000'});
	$("#user_pass_match").hide();
	$("#user_pass_10000").hide();
	$("#user_pass_security").hide();
	$("#user_pass_security").slideDown(600,"easeOutExpo");
}

function chat_adjustmore(){ //FADE IN/OUT OF MORE-THAN-VISIBLE ACTIVE CHATS

	if(chat_active>chatfit){$('#chat_more').fadeIn(320);}
	else{$('#chat_more').fadeOut(280);}
}

function chat_adjustcall(force){ //FORCE THE RESIZING AND COUNTING OF THE NUMBER OF ACTIVE CHAT POSSIBLE

	var distance = 260;
	var substract = 394;
	
	if(current=='kzone'&&$('#cp').hasClass('cp_fs')){
		distance = 44;
		substract = 159;
	}
	
	if(force=="close"){
		chatfit=(Math.floor((height-153)/52));
		$('#chat_wrapper').stop().animate({height:(chatfit*52)+19},280);
		chat_adjustmore();
	} 
	else{
		chatfit=(Math.floor((height-substract)/52));
		$('#chat_wrapper').stop().animate({height:(chatfit*52)+distance},280);
		chat_adjustmore();
	}
}

function chat_unping(target){ //REMOVAL OF CHAT VISUAL EFFECT WHEN CONVERSATION IS OPENED
	
	$('#'+target).closest("div").animate({marginLeft:"0px"},160);
	$('#'+target+'_l').animate({marginTop:"7px",height:"38px"},160);
}

function chat_ping(target){ //CHAT NOTIFICATION VISUAL EFFECT FOR AN ACTIVE USER

	if(target==chat_position && chat_status==1){}
	else{
		var pingcheck = $('#'+target+'_l').css("marginTop");
		
		if(pingcheck=="17px"){
			$('#'+target).closest("div").animate({marginLeft:"0px"},200);
			$('#'+target+'_l').animate({marginTop:"7px",height:"38px"},200,'',function(){chat_ping(target);});
			
		}
		else{
			if(target=='kzchat'){ion.sound.play("kchat_in");}
			else{ion.sound.play("chat_in");}
			$('#'+target).closest("div").animate({marginLeft:"12px"},280);
			$('#'+target+'_l').animate({marginTop:"17px",height:"28px"},280);
		}
	}
}

function chat_notification(){ //PREVIEW OF THE RECEIVED CHAT MESSAGE/NOTIFICATION
}

function chat_rearray(){ //STRUCTURES THE CHAT_ARRAY AND REORGANIZES THE ACTIVE 
	
	var type = 'o';
	
	if(current=='kzone'){
		if($('#cp').hasClass('cp_fs')){type='fs';}
	}
	
	chat_array=[];
	chat_array[0]=chat_position;
	for(i=1;i<chat_active;i++){
		if(chat_status==1){chat_array[i]=$('.chat_'+(i+1)+type).attr('id');}
		else{chat_array[i]=$('.chat_'+(i+1)).attr('id');}
		$('#'+chat_array[i]+'_l').insertAfter('#'+chat_array[i-1]+'_l');
	}
}

function chat_list(){ //OPEN/CLOSES THE CHAT LIST
	
	if(safe==1){
		var status = $('#chat_list').css("display");
		
		if(status=="none"){
			if(chat_status==1){
				safe=0;loading(1);
				chat_rebound=1;
				chat_close();
				$('#chat_list').delay(250).fadeIn(200,"",
				function(){safe=1;loading(0);$('.nano').nanoScroller();});
				setTimeout(function(){$('.view_chat_lists').css("height",height-124-parseInt($("#chat_active").css("height"))-parseInt($("#view_chat_other").css("height")));},251);
			}
			$('#chat_list').fadeIn(150,'',function(){
				$('.nano').nanoScroller();
			});
			setTimeout(function(){$('.view_chat_lists').css("height",height-124-parseInt($("#chat_active").css("height"))-parseInt($("#view_chat_other").css("height")));},1);
		}
		else{
			if(chat_rebound==1){
				$('#chat_list').fadeOut(200,"",
				function(){chat_control(chat_position);chat_rebound=0;});
			}
			else{
				$('#chat_list').fadeOut(200);
			}
		}
	}
}

function chat_nanodown(target){ //SCROLLS DOWN ON A CHAT CONVERSATION
	if(target){
		$('.nano').nanoScroller();
		$('#'+target+'_view .nano').nanoScroller({scroll:'bottom'});
	}
	else{
		$('.nano').nanoScroller();
		$('#'+chat_position+'_view .nano').nanoScroller({scroll:'bottom'});
	}
}


function chat_typing(target){ //TOGGLES THE TYPING ANIMATION FOR A CONVERSATION
	if(($('#'+target+'_view .chat_block_write').css('display'))=='none'){
		$('#'+target+'_view .chat_block_write').fadeIn(240);
	}
	else{
		$('#'+target+'_view .chat_block_write').fadeOut(240);
	}
	chat_nanodown();
	
}

function chat_fs_in(){
	for(i=2;i<(chat_array.length+2);i++){
		$(".chat_"+i+'o').switchClass("chat_"+i+'o',"chat_"+i+'fs',450,"easeOutExpo");
	}
}
function chat_fs_out(){
	for(i=2;i<(chat_array.length+2);i++){
		$(".chat_"+i+'fs').switchClass("chat_"+i+'fs',"chat_"+i+'o',350,"easeOutExpo");
	}
}

function chat_open(target){ //OPENS A CHAT CONVERSATION

	var type = 'o';

	if(current=='kzone'){
		if(target=='kzchat'){$('#kzchat .s_dark').transition({opacity:1},160);}
		if($('#cp').hasClass('cp_fs')){
			type='fs';
		}
	}
	
	if(chat_active>1){
		for(i=2;i<(chat_array.length+2);i++){
			var bottomVar = parseInt($(".chat_"+i).css("bottom"));
			$(".chat_"+i).switchClass("chat_"+i,"chat_"+i+type,400,"easeOutExpo");
		}
	}
	chat_status=1;
	$('#'+chat_position+'_view').show();
	$('#'+chat_position+'_input').focus();
	$('#chat').transition({y:0},450,"easeOutExpo",
			function(){chat_unping(target);safe=1;loading(0);});
	chat_nanodown();
	chat_adjustcall("open");
}

function chat_close(del){ //CLOSES A CHAT CONVERSATION, DEL FOR CASE OF CONVERSATION INACTIVE
	
	var closey = 350;
	var type = 'o';

	if(current=='kzone'){
		$('#kzchat .s_dark').transition({opacity:0},160);
		if($('#cp').hasClass('cp_fs')){
			closey='calc(100% + 20px)';
			type='fs';
		}
	}

	if(chat_active>1){
		for(i=2;i<(chat_array.length+2);i++){
			var bottomVar = parseInt($(".chat_"+i).css("bottom"));
			$(".chat_"+i+type).switchClass("chat_"+i+type,"chat_"+i,400,"easeOutExpo",
				function(){chat_status="0";if(del!=="1"){safe=1;loading(0);}$('#'+chat_position+'_view').hide();});
		}
	}
	else{
		chat_status="0";if(del!=="1"){safe=1;loading(0);}$('#'+chat_position+'_view').hide();
	}
	$('#chat').transition({y:closey},150,"");
	chat_adjustcall("close");
}

function chat_shuffle(target,active){ //SHUFFLING CODE OF POSITIONING AND ANIMATION OF CHAT CLUSTER POSITION

	var type = 'o';
	
	if(current=='kzone'){
		if(target=='kzchat'){$('#kzchat .s_dark').transition({opacity:1},160);}
		else{$('#kzchat .s_dark').transition({opacity:0},160);}
		if($('#cp').hasClass('cp_fs')){type='fs';}
	}

	if(chat_status==1){
		
		for(i=active-1;i>1;i--){
			$('.chat_'+i+type).addClass('chat_anim').addClass('chat_'+(i+1)+type).removeClass('chat_'+i+type);
		}
		$('#'+chat_position).removeClass('chat_1'+type).removeClass('chat_1').addClass('chat_anim').addClass('chat_2'+type);
		
		$("#"+target).fadeOut(100,"",function(){$(this).removeClass("chat_"+active+type)
		.addClass("chat_1").fadeIn(150);});
			
		$('#'+chat_position+'_view').fadeOut(120,"",function(){
			chat_unping(target);
			$('#'+target+'_view').fadeIn(120);
			$('#'+target+'_input').focus();
			chat_nanodown(target);
		});
		
	}
	else{
		
		for(i=active-1;i>1;i--){
			$('.chat_'+i).addClass('chat_anim').addClass('chat_'+(i+1)).removeClass('chat_'+i);
		}
		$('#'+chat_position).removeClass('chat_1').addClass('chat_anim').addClass('chat_2');
		
		if(chat_active>1){
			$("#"+target).fadeOut(100,"",function(){$(this).removeClass("chat_"+active)
			.addClass("chat_1").fadeIn(150);});
		}
		else{
			$("#"+target).fadeIn(250);
		}
		
	}
	
	setTimeout(function(){
		$('.chat').removeClass('chat_anim');
		chat_position=target;
		chat_rearray();
		if(chat_status==1){
			safe=1;loading(0);
		}
		else{
			setTimeout(function(){chat_open(target);},200);
		}
	},250);
	
}

function chat_find(target){ //FINDS POSITION OF CLICKED CHAT CLUSTER ORDER

	var distance = 241;
	
	if(current=='kzone'&&($('#cp').hasClass('cp_fs'))){distance=25;}

	var position = parseInt($('#'+target).css("bottom"))+52;
	if(chat_status==1){position = position-distance;}
	position = position/52;
	chat_shuffle(target,position);
}

function chat_create(id,name,picture,incoming,status){ //CREATE A CHAT CLUSTER/CONVERSATION
	
	if((parseInt($('#'+id).length))>0){
		if(id==chat_position){chat_open(id);}
		else{chat_find(id);}
	}
	else{
		
		if(status==null){
			var status = $('#'+id+'_ls').attr('status') || 'offline';
		}
		chat_active++;
		adjust();
		
		var chato = "";
		if(chat_status==1){chato = "o";}
	
		if(incoming=="1"){
			$('#chat_wrapper').append(
			'<div class="bt_cluster chat chat_'+chat_active+chato+'" id="'+id+'"><div class="bt_status bt_status_right s_'+status+'"></div><div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control(\''+id+'\')" style="background-image:url('+picture+')" tip="'+name+'"></div></div>'
			);
			$('#'+id).hide().fadeIn(250,'',function(){tooltip_refresh();});
			chat_rearray();
		}
		else{
			$('#chat_wrapper').append(
			'<div class="bt_cluster chat chat_1" id="'+id+'"><div class="bt_status bt_status_right s_'+status+'"></div><div class="t03 bt bt_bottom bt_chat tp" onClick="chat_control(\''+id+'\')" style="background-image:url('+picture+')" tip="'+name+'"></div></div>'
			);
			$('#'+id).hide();
			chat_shuffle(id,chat_active);
		}
		
		$('#chat').append(
		'<div class="chat_view" id="'+id+'_view"><div class="t02 chat_title" onClick="chat_control(\''+id+'\')">'+name+'</div><div onClick="chat_delete(\''+id+'\')" class="t02 icons chat_icons chat_close"></div><div class="chat_block"><div class="chat_block_padding nano"><div class="nano-content"><div class="chat_spacer"></div></div></div></div><div id="'+id+'_input" class="chat_input_div" contenteditable="true" spellcheck="false"></div><div class="chat_input_line"></div>'
		);
		$('#chat_active').append(
		'<div id="'+id+'_l" onClick="chat_controlL(\''+id+'\')" class="t01 chat_img sb_'+status+'" style="background-image:url('+picture+')"></div>'
		);
	}
	setTimeout(function(){tooltip_refresh();},300);
	chat_input_manage();
}

function chat_delete(target){ //DELETE A CHAT CLUSTER/CONVERSATION

	if(safe==1){
		safe=0;loading(1);
		chat_close("1");
		
		setTimeout(function(){
			safe=0;loading(1);
			$('#'+target+'_view').remove();
			$('#'+target+'_l').remove();
			$('#'+target+'_ls .chat_box').remove();
			$('#'+target).fadeOut(300,"",function(){
				$(this).remove();
			});
			for(i=2;i<(chat_array.length+2);i++){
				$('.chat_'+i).addClass('chat_'+(i-1)).addClass('chat_anim').removeClass('chat_'+i);
			}
			chat_active--;
			setTimeout(function(){$('.chat').removeClass('chat_anim');chat_position=$('.chat_1').attr('id');chat_rearray();safe=1;loading(0);
			},400);
			
		},500);
		
	}
}

function chat_control(target,bypass){ //MAIN CHAT FUNCTION ROUTER

	if(safe==1||bypass=='BYPASS'){
		safe=0;loading(1);
		if(chat_status==0){
			if(target==chat_position){chat_open(target);}
			else{chat_find(target);}
		}
		else{
			if(target==chat_position){chat_close();}
			else{chat_find(target);}
		}
	}
}

function chat_controlL(target){ //CHAT FUNCTION ROUTER FOR ACTIVE CHAT IN CHAT LIST

	if(safe==1){
		safe=0;loading(1);
		$('#chat_list').fadeOut(200,"",function(){
				chat_rebound=0;
				if(target==chat_position){chat_open(target);}
				else{chat_find(target);}
		});
	}
}

function chat_controlC(id,name,picture){ //CHAT FUNCTION ROUTER FOR NEW ACTIVE CHAT

	if(safe==1){
		
		safe=0;loading(1);
		if(($('#chat_list').css("display"))=='none'){
			if(id==chat_position){chat_open(id);}
			else{chat_create(id,name,picture,status);}
		}
		else{
			$('#chat_list').fadeOut(200,"",function(){
				chat_rebound=0;
				if(id==chat_position){chat_open(id);}
				else{chat_create(id,name,picture);}
			});
		}
	}
}

var chat = {target:'',person:'',name:'',message:'',smb:0,time:0,pre:0};  //USE SMB=1 IF CONVERSATION ONLY CONTAINS BIG SMILEY
function chat_mess(chat){ //CHAT FUNCTION TO SEND/RECEIVE MESSAGES
		
	var target = chat.target || '';
	var person = chat.person || '';
	var name = chat.name || '';
	var smb = chat.smb || 0;
	var message = chat.message || '';
	var time = chat.time || 0;
		
	var last_p = $('#'+target+'_view .chat_block_text').last().attr('person') || "";
	var last_t = parseInt($('#'+target+'_view .chat_block_text').last().attr('time')) || 0;
	var now = parseInt(time);
	var nameb = name.split(" ");
	
	if(smb==1){smb=" smiley_big_text";}
	else{smb="";}
	
	var check;
	if(last_t==0){check = "none";}
	else{check = now-last_t;}
	
	if(target==chat_position && chat_status==1){}
	else{chat_ping(target);}
	
	if(person==target){ //OTHER PERSON TALKING
		if(check<=60000 && person==last_p){
			$('#'+target+'_view .chat_conv').last().append(
			'<p class="chat_block_text'+smb+'" person="'+person+'" time="'+time+'">'+message+'</p>'
			);
		}
		else{
			if(check>3600000 && check!=="none"){$('#'+target+'_view .nano-content').append('<div class="chat_block_later"></div>');}
			$('#'+target+'_view .nano-content').last().append(
			'<div class="chat_conv"><span class="chat_block_time">'+time+'</span><p class="chat_block_title">'+nameb[0]+'</p><p class="chat_block_text'+smb+'" person="'+person+'" time="'+time+'">'+message+'</p></div>'
			);
		}
	}
	else{ //THE USER TALKING
		if(check<=60000 && person==last_p){
			$('#'+target+'_view .chat_conv').last().append(
			'<p class="chat_block_text'+smb+'" person="'+person+'" time="'+time+'">'+message+'</p>'
			);
		}
		else{
			if(check>3600000 && check!=="none"){$('#'+target+'_view .nano-content').append(
			'<div class="chat_block_later"></div>'
			);}
			$('#'+target+'_view .nano-content').last().append(
			'<div class="chat_conv user_conv"><span class="chat_block_time user_block_time">'+time+'</span><p class="chat_block_title">You</p><p class="chat_block_text'+smb+'" person="'+person+'" time="'+time+'">'+message+'</p></div>'
			);
		}
	}
	
	$('#'+target+'_view .chat_block_write').insertAfter('.chat_conv:last-child');
	$('#'+target+'_view .chat_block_text').last().fadeTo(0,0.01).fadeTo(200,1);
	if(chat.pre!==1){chat_nanodown();}
	
}

function chat_update(target,status){ //UPDATES THE CHAT STATUS COLOR	
	
	var color="";
	
	switch(status){
		case 'offline':color='#AAAAAA';break;
		case 'busy':color='#FF4000';break;
		case 'online':color='#6DD900';break;
		case 'away':color='#FFD24D';break;
	}
	
	$('#'+target+' .bt_status_right').animate({backgroundColor:'transparent'},220).delay(220).animate({backgroundColor:color},220,'',function(){$(this).removeClass('s_offline s_busy s_online s_away').addClass('s_'+status);});
	
	$('#'+target).attr('status',status);
	
	$('#'+target+'_l').attr('status',status).animate({borderColor:'#444444',borderWidth:'0px'},180).delay(180).animate({borderColor:color,borderWidth:'2px'},180,'',function(){$(this).removeClass('sb_offline sb_busy sb_online sb_away').addClass('sb_'+status);});
	
	$('#'+target+'_ls .chat_imgb').animate({borderColor:'#333333',borderWidth:'0px'},180).delay(180).animate({borderColor:color,borderWidth:'2px'},180,'',function(){$(this).removeClass('sb_offline sb_busy sb_online sb_away').addClass('sb_'+status);});
	
	$('#'+target+'_ls').animate({borderColor:'#333333',borderWidth:'0px'},180).delay(180).animate({borderColor:color,borderWidth:'2px'},180,'',function(){$(this).removeClass('sb_offline sb_busy sb_online sb_away').addClass('sb_'+status);});
	
	$('#'+target+'_ls').attr('status',status);
	
}

var chatrt = {id:'',name:'',picture:'',status:'',pre:0};
function chat_router(chatrt){ //SERVES AS THE ROUTER TO UPDATE CHAT STATUS AND MANAGE THE CHAT LIST
	
	var id = chatrt.id || '';
	var name = chatrt.name || '';
	var picture = chatrt.picture || '';
	var status = chatrt.status || '';
	var pre = chatrt.pre || 0;
	
	var check = $('#'+id+'_ls').length;
	
	 
	if(check>0){
		if(status=='offline'){
			if(($('#'+id+'_ls').hasClass('chat_box'))){
				if(($('#chat_list').css("display"))=='none'){
					$('#'+id+'_ls').remove();
					chat_update(id,status);
				}
				else{
					$('#'+id+'_ls').fadeTo(340,0,'',function(){
						$('#'+id+'_ls .chat_box').remove();
						$('#'+id+'_ls .view_text').remove();
						$(this).css({minHeight:'1px',height:'1px',marginTop:'46px'});
					}).slideUp(340,'easeOutExpo',function(){
						$(this).remove();
						chat_update(id,status);
					});
				}
			 }
			 else{
			 	chat_update(id,status);
			 }
		 }
		 else if(($('#'+id+'_ls').attr('status'))!==status){
		 	chat_update(id,status);
		 }
	 }
	 else{
		 /*
		 if(status!=='offline'){
			 for(i=0;i<(parseInt($('.chat_box').length));i++){
				 if(($('.chat_box .view_text_1c').eq(i).text())>name){
					 $('.chat_box').eq(i-1).after(
					 '<div onclick="chat_controlC(\''+id+'\',\''+name+'\',\''+picture+'\',\''+status+'\')" id="'+id+'_ls" status="'+status+'" style="display:none;opacity:0" class="view_box chat_box"><div class="t02 view_img view_bsnav chat_imgb sb_'+status+'" style="background-image:url('+picture+')"></div><p class="t01 view_text view_text1 view_text_1c">'+name+'</p></div>'
					 );
					 if(($('#chat_list').css("display"))=='none'){$('#'+id+'_ls').show().fadeTo(0,1);}
					 else{$('#'+id+'_ls').slideDown(340,'easeOutExpo').fadeTo(340,1);}
					 if(status=='online'){
						 notif_create({type:'online',person:name,picture:picture,run:'chat_controlC(\''+id+'\',\''+name+'\',\''+picture+'\')'});
					 }
					 break;
				 }
			 }
		 }*/
		 if(status!=='offline'){
			if($('.chatbox').length>0){//==Fode
			var dropped=false;
			for(i=0;i<(parseInt($('.chat_box').length));i++){
			if(($('.chat_box .view_text_1c').eq(i).text())>name){
			$('.chat_box').eq(i).before(
			'<div onclick="chat_controlC(\''+id+'\',\''+name+'\',\''+picture+'\',\''+status+'\')" id="'+id+'_ls" status="'+status+'" style="display:none;opacity:0" class="view_box chat_box"><div class="t02 view_img view_bsnav chat_imgb sb'+status+'" style="background-image:url('+picture+')"></div><p class="t01 view_text view_text1 view_text_1c">'+name+'</p></div>'
			);
			dropped=true;
			break;
			}
			}

		  if(!dropped){
			 $('#view_chat_list div.nano-content div.view_end').last().before(
					 '<div onclick="chat_controlC(\''+id+'\',\''+name+'\',\''+picture+'\',\''+status+'\')" id="'+id+'_ls" status="'+status+'" style="display:none;opacity:0" class="view_box chat_box"><div class="t02 view_img view_bsnav chat_imgb sb_'+status+'" style="background-image:url('+picture+')"></div><p class="t01 view_text view_text1 view_text_1c">'+name+'</p></div>'
					 );                                          
			   }
		}else{
		  $('#view_chat_list div.nano-content').prepend(
					 '<div onclick="chat_controlC(\''+id+'\',\''+name+'\',\''+picture+'\',\''+status+'\')" id="'+id+'_ls" status="'+status+'" style="display:none;opacity:0" class="view_box chat_box"><div class="t02 view_img view_bsnav chat_imgb sb_'+status+'" style="background-image:url('+picture+')"></div><p class="t01 view_text view_text1 view_text_1c">'+name+'</p></div>'
					 );                                             
		}

	   if(($('#chat_list').css("display"))=='none'){$('#'+id+'_ls').show().fadeTo(0,1);}
					 else{$('#'+id+'_ls').slideDown(340,'easeOutExpo').fadeTo(340,1);}
					 if(status=='online'&&pre==0){
							 notif_create({type:'online',person:name,picture:picture,run:'chat_controlC(\''+id+'\',\''+name+'\',\''+picture+'\')'});
					 }    

     }
	 }
}

function chat_favorites(){
	var count=0;
	for(i=0;i<(parseInt($('#view_chat .chat_img').length));i++){
		if(($('#view_chat .chat_img').eq(i).attr('status'))=='online'){count++}
	}
	if(count<1){}
	else if(count==1){notif_create({type:'favs',person:count+' favorite'});}
	else{notif_create({type:'favs',person:count+' favorites'});}
}

function notif_update(){ //UPDATES THE NOTIFICATION COUNT FOR MESSAGES AND NOTIFICATIONS
	
	var notifs = notif_info+notif_action;
	
	if((parseInt($('#notif_text_mess').text()))!==notif_mess){
		if(notif_mess>0){
			$('#bt_notif_mess').animate({marginLeft:'23px'},700,"easeOutExpo");
			
			$('#notif_text_mess').stop().fadeOut(150,'',function(){
				$(this).text(notif_mess).fadeIn(500);});
		}
		else{
			$('#bt_notif_mess').delay(140).animate({marginLeft:'0px'},700,"easeOutExpo");
			$('#notif_text_mess').fadeOut(300,'',function(){
				$(this).text(notif_mess);});
		}
	}
	
	if((parseInt($('#notif_text_notif').text()))!==notifs){
		if(notifs>0){
			$('#bt_notif_notif').delay(100).animate({marginLeft:'23px'},700,"easeOutExpo");
			
			$('#notif_text_notif').stop().delay(100).fadeOut(150,'',function(){
				$(this).text(notifs).fadeIn(500);});
		}
		else{
			$('#bt_notif_notif').delay(240).animate({marginLeft:'0px'},700,"easeOutExpo");
			$('#notif_text_notif').delay(100).fadeOut(300,'',function(){
				$(this).text(notifs);});
		}
	}
}

function notif_dismiss(target){ //DISMISS A NOTIFICATION

	$('#'+target).animate({marginTop:"-52px",opacity:"0"},500,"easeOutExpo",function(){
		$(this).remove();
	});
}

var notif = {id:'',type:'',person:'',picture:'',color:'',info:'',run:''};
function notif_create(notif){ //CREATE A NOTIFICATION
	
	var id = notif.id || '';
	var type = notif.type || '';
	var person = notif.person || '';
	var picture = notif.picture || '';
	var color = notif.color || '';
	var info = notif.info || '';
	var run = notif.run || '';
	
	if(id==''){id = "notif_" + Math.floor(Math.random()*1000000000)+1;}
	
	var n2=0; if(type=='online'||type=='favs'||type=='join'||type=='quit'||type=='na'){n2=1;}
	
	var mess = "";
	var byfrom = "from";
	if(picture!==''){picture = '<div id="'+id+'_img" class="view_notif_img" style="background-image:url('+picture+')"></div>';}
	var sound = true;
	
	if(person==''){person="kolab";}
	if(color==''){color="FF0063";}
		if(type=='online'||type=='favs'){color="6DD900";}
	if(type=='update'||type=='resource'||type=='task'||type=='member'||type=='contacta'||type=='sqm'){byfrom="by";}
	else if(type=='contacti'){byfrom="to"}
	
	switch(type){
		case "newsq":mess="Square invitation ";run="backstore_control('notif','2')";break;
		case "sqa":mess=info+" added";type="newsq";info="";break;
		case "update":mess=info+" updated";info="";break;
		case "grade":mess="Grade ";break;
		case "notes":mess="Note shared ";break;
		case "event":mess="Event ";break;
		case "resource":mess="Resource in ";;break;
		case "task":mess="Task in ";;break;
		case "member":mess="Member in ";break;
		case "contact":mess="Contact request ";run="backstore_control('notif','2')";break;
		case "contacta":mess="Contact request accepted ";break;
		case "contacti":mess="Contact request sent ";sound=false;break;
		
		case "sqm":mess="SquareMaster request ";run="backstore_control('notif','2')";type="sqmw";break; //NEW
		case "newsqm":mess="SquareMaster in ";type="sqmw";break; //NEW
		
		case "sqremind2":mess=info+" due in 2 days";type="event";info="";break; //NEW
		case "sqremind1":mess=info+" due tomorrow";type="event";info="";break; //NEW
		case "sqremind0":mess=info+" due today";type="event";info="";break; //NEW
		
		case "online":mess="is now Online ";break;
		case "favs":if(parseInt('person')==1){mess="is now online ";}else{mess="are now online ";};break;
		case "join":mess="joined the Square ";break;
		case "quit":mess="left the Square ";break;
		
		case "na":info="Not yet available";mess="in kolab Alison";person="";run="backstore_control('na')";if(current=='kzone'){color=kzcolor.slice(1)}break;
		
		case "news":mess="Announcement ";type="kolab";run="backstore_control('news','1')";break;
		case "version":mess="Update ";type="kolab";run="backstore_control('news','1')";break;
		case "message":mess="Message ";run="backstore_control('mess','1')";break;
		
		case "ping5":mess="Your 5 minutes ping ";type="ping";break;
		case "ping10":mess="Your 10 minutes ping ";type="ping";break;
		case "ping15":mess="Your 15 minutes ping ";type="ping";break;
		case "ping20":mess="Your 20 minutes ping ";type="ping";break;
		case "ping30":mess="Your 30 minutes ping ";type="ping";break;
		case "ping45":mess="Your 40 minutes ping ";type="ping";break;
		case "ping60":mess="Your 1 hour ping! ";type="ping";break;
		case "ping120":mess="Your 2 hours ping! ";type="ping";break;
		
		case "remind":mess=info;person="You";break;
	}
	
	if(type=='message'){notif_mess++;}
	else if(type=='sqm'||type=='newsq'||type=='contact'){notif_action++;}
	else if(type=='contacti'||type=='ping'||type=='remind'||type=='online'||type=='favs'||type=='join'||type=='quit'||type=='na'){}
	else{notif_info++;}
	
	notif_update();
	
	if(type=='ping'||type=='remind'){
		ion.sound.play("remind");
		$('#struc_notif').append(
			'<div onClick="notif_dismiss(\''+id+'\')" class="notif tipsafe" id="'+id+'" style="border-color:#FF0063;display:none;"><div class="view_img view_notif notif_fade" style="background-color:#FF0063;background-image:none;"></div><div class="view_img view_notif n_'+type+'" style="background-color:transparent;"></div><p class="view_text view_text_1 view_text_notif">'+mess+'</p><p class="view_text view_text_2">'+byfrom+' '+person+'</p></div>'
		);
		$('#'+id).slideDown(600,"easeOutExpo");
		$('#'+id+' .notif_fade').stop().effect("pulsate",{times:40},48000);
		timer--;
		timer_check();
	}
	else{
		if(sound){ion.sound.play("notif");}
		if(n2==1){
			$('#struc_notif').append(
			'<div onClick="'+run+'" class="notif tipsafe" id="'+id+'" style="border-color:#'+color+';display:none;"><div class="view_img view_notif n_'+type+'" style="background-color:#'+color+'">'+picture+'</div><p class="view_text view_text_1 view_text_notif">'+person+info+'</p><p class="view_text view_text_2">'+mess+'</p></div>'
			);
		}
		else{
			$('#struc_notif').append(
			'<div onClick="'+run+'" class="notif tipsafe" id="'+id+'" style="border-color:#'+color+';display:none;"><div class="view_img view_notif n_'+type+'" style="background-color:#'+color+'">'+picture+'</div><p class="view_text view_text_1 view_text_notif">'+mess+info+'</p><p class="view_text view_text_2">'+byfrom+' '+person+'</p></div>'
			);
		}
		$('#'+id).slideDown(600,"easeOutExpo");
		if(picture!=='' && n2!==1){$('#'+id+'_img').delay(1800).fadeIn(280);}
		else if(n2==1){$('#'+id+'_img').show();}
		$('#'+id).delay(5000).animate({marginTop:"-52px",opacity:"0"},500,"easeOutExpo",function(){
			$(this).remove();
		});
	}
}

function notif_welcome(){
	$('#struc_notif').prepend(
			'<div onClick="notif_dismiss(\'notif_welcome\');backstore_control(\'welcome\',\'1\')" class="notif" id="notif_welcome" style="border-color:#FF0063;display:none;"><div class="view_img view_notif notif_fade" style="background-color:#FF0063;background-image:none;"></div><div class="view_img view_notif n_kolab" style="background-color:transparent;"></div><p class="view_text view_text_1 view_text_notif">Welcome to kolab(pre-Alison)</p><p class="view_text view_text_2">Getting Started</p></div>'
	);
	$('#notif_welcome').slideDown(600,"easeOutExpo");
	$('#notif_welcome .notif_fade').stop().effect("pulsate",{times:40},88000);
	$('#m_add_flash').show();
	$('.m_add:last').removeClass('t03').stop().effect("pulsate",{times:100},110000);
}

function error(){
	ion.sound.play("error");
	var id = "error_" + Math.floor(Math.random()*1000000000)+1;
	$('#struc_notif').prepend(
			'<div onClick="notif_dismiss(\''+id+'\');backstore_control(\'error\')" id="'+id+'" class="notif notif_alert"><div class="t02 view_img view_notif n_error" style="background-color:#444"></div><p class="view_text view_text_1 view_text_notif">I\'m sorry Chief!</p><p class="view_text view_text_2">Something unexpected happend</p></div>'
	);
	$('#'+id).slideDown(600,"easeOutExpo");
	$('#'+id).delay(1200).animate({marginTop:"-52px",opacity:"0"},500,"easeOutExpo",function(){
		$(this).remove();
	});
}

function field(target){
	$('#'+target).transition({scale:0.94,opacity:0.4},160).transition({scale:1,opacity:1},160);
}

function reveal(){
	$('.reveal').slideDown(600,'easeOutExpo',function(){$(this).removeClass('reveal');});
}

function playerapp_control(target){
	if($('#'+target+' .playerapp_click').hasClass('allow')){}
	else{
		$('.player .playerapp_click').removeClass('allow').addClass('block');
		$('.app .playerapp_click').removeClass('allow').addClass('block');
		$('#cp .playerapp_click').removeClass('allow').addClass('block');
		$('#'+target+' .playerapp_click').removeClass('block').addClass('allow');
		$('#'+target).transition({scale:.98},140).transition({scale:1},140);
	}
}

function playerapp_focus(target){
	if(appindex<850){
		appindex++;
	}
	else{
		appindex=50;
		$('.player').css({zIndex:appindex});
		$('.app').css({zIndex:appindex});
		$('#cp').css({zIndex:appindex});
		appindex++;
	}
	$('#'+target).css('z-index',appindex);
}


function playerapp_info(target){
	$('#'+target+'_info').toggle('slide',{direction:'down'},160);
}

function playerapp_clear(id){
	if(($('#'+id).length)>0){
		$('#'+id).transition({opacity:0,scale:0.8},160,'',function(){$(this).remove()});
	}
}

function player_clearall(){
	if(($('.player').length)>0){
		$('.player').transition({opacity:0,scale:0.8},160,'',function(){$(this).remove()});
	}
}

function app_clearall(){
	if(($('.app').length)>0){
		$('.app').transition({opacity:0,scale:0.8},160,'',function(){$(this).remove()});
	}
}

function playerapp_create(id,resizable,aspect){
	if(resizable){
		$('#'+id).transition({opacity:0,scale:0.8},0).transition({opacity:1,scale:1},260).draggable({cancel:'.nodrag',delay:60,drag:function(){
     	$('body').mouseleave(function(){$('body').mouseup();});},start:function(){$('#'+id+'_frame').fadeOut(120);},stop:function(){$('#'+id+'_frame').fadeIn(60);$('#'+id).css({right:Math.round((width-$('#'+id).position().left-$('#'+id).outerWidth())),left:'',top:Math.round($('#'+id).css('height'))});}}).resizable({aspectRatio:aspect,handles:"nw, ne, sw, se",start:function(){$('#'+id+'_frame').fadeOut(120);},stop:function(){$('#'+id+'_frame').fadeIn(60);}});
		$('#'+id+' .ui-resizable-handle').mousedown(function(){$('#'+id).css({left:Math.round($('#'+id).position().left)});}).mouseup(function(){$('#'+id).css({right:Math.round((width-$('#'+id).position().left-$('#'+id).outerWidth())),left:''});});
	}
	else{
		$('#'+id).transition({opacity:0,scale:0.8},0).transition({opacity:1,scale:1},260).draggable({cancel:'.nodrag', delay:60,drag:function(){
     	$('body').mouseleave(function(){$('body').mouseup();});},start:function(){$('#'+id+'_frame').fadeOut(120);},stop:function(){$('#'+id+'_frame').fadeIn(60);$('#'+id).css({right:Math.round((width-$('#'+id).position().left-$('#'+id).outerWidth())),left:'',top:Math.round($('#'+id).css('height'))});}});
	}
		
	$('.nodrag').on({'touchstart':function(e){$(this).click()}});
	
	$('#'+id+'_frame').hide().delay(800).fadeIn(360,'',function(){loading(0);});
	$('#'+id+'_info').delay(970).toggle('slide',{direction:'down'},360);
	$('#'+id+' .playerapp_info').delay(1190).transition({scale:1.2,opacity:1},180).transition({scale:1},200,'',function(){$(this).addClass('playerapp_infoRE');});
	
	$('#'+id).mousedown(function(){playerapp_focus(id);});
	$('#'+id).mouseup(function(){playerapp_control(id);});

	setTimeout(function(){playerapp_focus(id);playerapp_control(id);},50);
}




function player_youtube(target,bigger){
	var weblink = target || $('#player_youtube').val();
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var id = "player_" + Math.floor(Math.random()*1000000000)+1;
	var match = weblink.match(regExp);
	var bigger_class = "";
	if(bigger==1){bigger_class=" player_welcome"}
	
	if(match && match[2].length == 11){
		loading(1);
		
		$.getJSON(http_base+'/kolabNXFront/apps/player/info.json',function(json){
			$('#struc_wrapper').append('<div id="'+id+'" class="player" style="z-index:'+(appindex+1)+';"><div class="playerapp_frame"><div class="playerapp_click block"></div><iframe id="'+id+'_frame" class="player_v" width="100%" height="100%" src="//www.youtube.com/embed/'+match[2]+'" frameborder="0" allowfullscreen></iframe></div><div id="'+id+'_info" class="playerapp_infobl"><div class="view_block nohover" style="margin-left:16px"><div class="t02 view_img" style="background-image:url('+http_base+'/kolabNXFront/apps/'+target+'/'+target+'.html" width="100%" height="100%" frameborder="0"></iframe></div><div id="'+id+'_info" class="playerapp_infobl"><div class="view_block nohover" style="margin-left:16px"><div class="t02 view_img" style="background-image:url('+http_base+'/kolabNXFront/apps/player/img.png)"></div><p class="t01 view_text view_text_1">'+json.name+'</p><p class="t01 view_text view_text_2">'+json.description+'</p></div></div><!--<div class="playerapp_icon" style="background-image:url('+http_base+'/kolabNXFront/apps/'+target+'/'+target+'.html" width="100%" height="100%" frameborder="0"></iframe></div><div id="'+id+'_info" class="playerapp_infobl"><div class="view_block nohover" style="margin-left:16px"><div class="t02 view_img" style="background-image:url('+http_base+'/kolabNXFront/apps/player/img.png)"></div>--><div onclick="playerapp_clear(\''+id+'\')" class="t02 icons chat_icons chat_close playerapp_close nodrag"></div><div class="t02 icons chat_icons playerapp_info nodrag" onClick="playerapp_info(\''+id+'\')"></div></div>');playerapp_create(id,true,true);$('#player_youtube').val('');backstore_control(backstore_status);
		});
	}
	else{field('player_youtube');}
}

function player_vimeo(target,bigger,t){
	var weblink = target || $('#player_vimeo').val();
	var regExp = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
	var id = "player_" + Math.floor(Math.random()*1000000000)+1;
	var bigger_class = " ";
	if(bigger==1){bigger_class=" player_welcome"}
	var autocolor = "?color=FF0063";
	if(t==1){autocolor='?autoplay=1&amp;color=FF0063'}

	var match = weblink.match(regExp);
  
	if(match){
		loading(1);
		
		$.getJSON(http_base+'/kolabNXFront/apps/player/info.json',function(json){
			$('#struc_wrapper').append('<div id="'+id+'" class="player" style="z-index:'+(appindex+1)+';"><div class="playerapp_frame"><div class="playerapp_click block"></div><iframe id="'+id+'_frame" class="player_v" src="//player.vimeo.com/video/'+match[3]+'?color=FFFFFF" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div><div id="'+id+'_info" class="playerapp_infobl"><div class="view_block nohover" style="margin-left:16px"><div class="t02 view_img" style="background-image:url('+http_base+'/kolabNXFront/apps/'+target+'/'+target+'.html" width="100%" height="100%" frameborder="0"></iframe></div><div id="'+id+'_info" class="playerapp_infobl"><div class="view_block nohover" style="margin-left:16px"><div class="t02 view_img" style="background-image:url('+http_base+'/kolabNXFront/apps/player/img.png)"></div><p class="t01 view_text view_text_1">'+json.name+'</p><p class="t01 view_text view_text_2">'+json.description+'</p></div></div><!--<div class="playerapp_icon" style="background-image:url('+http_base+'/kolabNXFront/apps/player/img.png)"></div>--><div onclick="playerapp_clear(\''+id+'\')" class="t02 icons chat_icons chat_close playerapp_close nodrag"></div><div class="t02 icons chat_icons playerapp_info nodrag" onClick="playerapp_info(\''+id+'\')"></div></div>');playerapp_create(id,true,true);$('#player_vimeo').val('');backstore_control(backstore_status);
		});
	}
	else{field('player_vimeo');}
}

function player_twitch(target,bigger){
	var weblink = target || $('#player_twitch').val();
	var regExp = /(?:twitch.tv\/([^/]+)|\1(^[\w\d-_]*$))/i;
	var id = "player_" + Math.floor(Math.random()*1000000000)+1;
	var bigger_class = " ";
	if(bigger==1){bigger_class=" player_welcome"}

	var match = weblink.match(regExp);
  
	if(match){
		if(match[1]){match=match[1]}else{match=match[2]}
		$.getJSON(http_base+'/kolabNXFront/apps/player/info.json',function(json){
			$('#struc_wrapper').append('<div id="'+id+'" class="player" style="z-index:'+(appindex+1)+';"><div class="playerapp_frame"><div class="playerapp_click block"></div><iframe id="'+id+'_frame" class="player_v" src="http://www.twitch.tv/'+match+'/embed" frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div><div id="'+id+'_info" class="playerapp_infobl"><div class="view_block nohover" style="margin-left:16px"><div class="t02 view_img" style="background-image:url('+http_base+'/kolabNXFront/apps/'+target+'/'+target+'.html" width="100%" height="100%" frameborder="0"></iframe></div><div id="'+id+'_info" class="playerapp_infobl"><div class="view_block nohover" style="margin-left:16px"><div class="t02 view_img" style="background-image:url('+http_base+'/kolabNXFront/apps/player/img.png)"></div><p class="t01 view_text view_text_1">'+json.name+'</p><p class="t01 view_text view_text_2">'+json.description+'</p></div></div><!--<div class="playerapp_icon" style="background-image:url('+http_base+'/kolabNXFront/apps/player/img.png)"></div>--><div onclick="playerapp_clear(\''+id+'\')" class="t02 icons chat_icons chat_close playerapp_close nodrag"></div><div class="t02 icons chat_icons playerapp_info nodrag" onClick="playerapp_info(\''+id+'\')"></div></div>');playerapp_create(id,true,true);$('#player_vimeo').val('');backstore_control(backstore_status);
		});
	}
	else{field('player_twitch');}
}

function app_create(target){
	var id = "app_" + Math.floor(Math.random()*1000000000)+1;
	
	loading(1);
	
	$.getJSON(http_base+'/kolabNXFront/apps/'+target+'/info.json',function(json){
		$('#struc_wrapper').append('<div id="'+id+'" class="app" style="width:'+json.width+'px;height:'+json.height+'px;z-index:'+(appindex+1)+';"><div class="playerapp_frame"><div class="playerapp_click block"></div><iframe id="'+id+'_frame" src="'+http_base+'/kolabNXFront/apps/'+target+'/'+target+'.html" width="100%" height="100%" frameborder="0"></iframe></div><div id="'+id+'_info" class="playerapp_infobl"><div class="view_block nohover" style="margin-left:16px"><div class="t02 view_img" style="background-image:url('+http_base+'/kolabNXFront/apps/'+target+'/img.png)"></div><p class="t01 view_text view_text_1">'+json.name+'</p><p class="t01 view_text view_text_2">'+json.description+'</p></div></div><!--<div class="playerapp_icon" style="background-image:url('+http_base+'/kolabNXFront/apps/'+target+'/img.png)"></div>--><div onclick="playerapp_clear(\''+id+'\')" class="t02 icons chat_icons chat_close playerapp_close nodrag"></div><div class="t02 icons chat_icons playerapp_info nodrag" onClick="playerapp_info(\''+id+'\')"></div></div>');backstore_control(backstore_status);
		
		playerapp_create(id,json.resizable,json.aspect);
	});
}
