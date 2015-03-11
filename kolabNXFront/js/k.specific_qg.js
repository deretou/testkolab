
var content_status="";
var content_selection="";
var special_status="";

$(document).ready(function(){
	$('.nav_list').hide();
		
	$('#search_input').on("keyup",function(){
		if(($(this).val())==''){
			$('#search_result').stop().fadeOut(180,'',function(){
				$('#search_recent').fadeIn(180,'',function(){$(".nano").nanoScroller();});	
			});
		}
		else{
			$('#search_recent').stop().fadeOut(180,'',function(){
				$('#search_result').fadeIn(180,'',function(){$(".nano").nanoScroller();});	
			});
		}
	});
	
	$('.search_box').on("click",function(){search_control();});
});

function locker_control(){
	if(current=='locker'){
		if(($('#struc_binder').hasClass('struc_binder_on'))){binder_restore();}
	}
}

function social_control(){
	if(current=='social'){
		 //console.log('je suis la 1');
              person_select(user_id); //ID OF THE USER SELF
               
	}
}

function feedback_control(){
	if(current=='feedback'){
		if(special_status!==''){special_content(special_status);}
	}
}

function help_control(){
  //console.log(' moi 0');	
    if(current=='help'){
		if(special_status!==''){
                    special_content(special_status);
                   //  console.log('moi 1');
                    }else{
                 //   console.log('moi 2');
                }
	}else{
            //console.log('current n\'est pas help');
        }
}


function search_control(){
	if(safe==1){
		if((parseInt($('#search').css('width')))<48){
			safe=0;loading(1);
			$('#bt_search').addClass('search_on');
			$('#search').show().animate({width:'369px'},160,'',function(){
				$('.search_content').hide();
				$('#search_recent').fadeIn(500);
				$('#search_box').slideDown(600,'easeOutExpo',function(){$(".nano").nanoScroller();safe=1;loading(0);});
			});
			
			$('#search_input').animate({width:'312px',opacity:'1'},600,'easeOutExpo').focus();
		}
		else{
			safe=0;loading(1);
			$('#search_box').slideUp(150,'',function(){
				$('#search_input').val('').blur().animate({width:'0px',opacity:'0'},50);
				$('#search').animate({width:'47px',backgroundColor:'#AAA'},260,'easeOutExpo',function(){
					$(this).css({backgroundColor:'#222'}).hide();
					$('#bt_search').removeClass('search_on');
					safe=1;loading(0);
				});
			});
		}
	}
}

function nav_control(target){
	if(($('.m_'+target).hasClass('m_active'))){
		$('.m_'+target).removeClass('m_active');
		if(target=='manage'){
			if(current=='locker'&&!$('#struc_binder').hasClass('struc_binder_on')){binder_manage(0);}
			$('#struc_content_manage').fadeOut(300);
			$('#notif_manage').animate({marginTop:'-50px',opacity:'0'},300,'easeOutExpo',function(){
				$(this).hide();
			});
		}
		if(target=='list'){
			$('#nav_list_'+current).fadeOut(140).transition({queue:false,left:98},140);
		}
	}
	else{
		$('.m_'+target).addClass('m_active');
		if(target=='manage'){
			$('#struc_content_manage').fadeIn(300);
			$('#notif_manage').show().animate({marginTop:'0px',opacity:'1'},300,'easeOutExpo');
			if(current=='locker'&&!$('#struc_binder').hasClass('struc_binder_on')){binder_manage(1);}
		}
		if(target=='list'){
			$('#nav_list_'+current).fadeIn(140).transition({queue:false,left:103},140);
		}
	}
}

function menu_states(){
	if(($('.m_manage').hasClass('m_active'))){nav_control('manage');}
	if(($('.m_list').hasClass('m_active'))){nav_control('list');}
}

function binder_count(){
	$('#locker_styles').remove();
	var smallx = ((38*(binders)))+'px';
	var bigx = ((44*(binders)))+'px';
	var smallc = ((38*(binders)))+204+'px';
	var bigc = ((44*(binders)))+204+'px';
	$('head').append(
	'<style id="locker_styles">.cover_locker{width:183px}.cover_locker{width:calc(100% - '+smallx+') !important}#content{width:calc(100% - '+smallx+') !important}.content_manage{width:calc(100% - '+smallc+') !important} @media(min-height:860px) and (min-width:1300px){#cover{width:221px}.cover_locker{width:calc(100% - '+bigx+') !important}#content{width:calc(100% - '+bigx+') !important}.content_manage{width:calc(100% - '+bigc+') !important}}</style>'
	);
}

function binder_manage(status){
	if(status==1){
		$('#struc_binder').sortable({
			'start':function(){
				$('.binder_frame').removeClass('t04');
				$('.binder').removeClass('t04');
				$('.binder_side').removeClass('t03');
				$('.binder_number').removeClass('t03');
				$('.binder_style').removeClass('t03');
			},
			'stop':function(){
				$('.binder_frame').addClass('t04');
				$('.binder').addClass('t04');
				$('.binder_side').addClass('t03');
				$('.binder_number').addClass('t03');
				$('.binder_style').addClass('t03');
			},
			update:function(event,ui){
				$(document).trigger('sortableupdate');
			},
			containment:"parent"
		});
	}
	else{
		$('#struc_binder').sortable('destroy');
	}
}

function locker_reveal(){
	binder_count();
	$('#nl_locker_4').hide();
	
	for(var i=0;i<binders;i++){
		if(binders>0){
			$('.binder').eq(i).delay(i*70).queue(function(){$(this).removeClass('binder_pre');});
			$('.binder .binder_side').eq(i).delay((i*70)+200).queue(function(){$(this).removeClass('binder_side_pre');});
			$('.binder .binder_number').eq(i).delay((i*70)+400).queue(function(){$(this).removeClass('binder_number_pre');});
			if(i==binders-1){$(".nano").nanoScroller();break;}
		}
		else{$(".nano").nanoScroller();break;}
	}
}

function social_reveal(){
	$('#locker_styles').remove();
	person_select(user_id); //ID OF THE USER SELF
}

function special_reveal(){
	$('#'+current+'_list').transition({opacity:1,y:0},680,'easeOutExpo');
	$('#'+current+'_special').transition({opacity:1,scale:1},680,'easeOutExpo');
	$('#'+current+'_special .special_info').transition({y:0},680,'easeOutExpo');
}

function backstore_binder_color(color){
	$('.b_sel').removeClass('view_binder_active');
	$('#b_'+color+' .b_sel').addClass('view_binder_active');
	backstore_2_color(color);
	$('#bs_nbinder').transition({borderRightColor:'#'+color},300);
	$('#bs_nbinder .bs_header').transition({backgroundColor:'#'+color},300);
	$('#bs_nbinder .bs_footer').transition({backgroundColor:'#'+color},300);
	$('.style_select').delay(60).transition({backgroundColor:'#'+color,borderBottomColor:'#'+color},300);
	$('#bs_ebinder').transition({borderRightColor:'#'+color},300);
	$('#bs_ebinder .bs_header').transition({backgroundColor:'#'+color},300);
	$('#bs_ebinder .bs_footer').transition({backgroundColor:'#'+color},300);
	
	$('#b_designer').css({backgroundColor:'#'+color}).attr('bcolor',color);
}

function backstore_binder_style(style){
	$('.style_selectd').removeClass('view_binder_active').removeClass('style_selecto');
	$('.s_selm').css({width:'42px',height:'42px'});
	$('#b_'+style+' .style_selectd').addClass('view_binder_active').addClass('style_selecto');
	$('#b_'+style+' .s_selm').css({width:'36px',height:'36px'});
	$('#b_designer_style').css({backgroundImage:'url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/'+style+'.png)'});
	$('#b_designer').attr('bstyle',style);
}

function square_bindercolor(){
	var color = $('#b_'+content_status).css('background-color');
	$('#bs_nsquare').css({borderRightColor:'#'+color});
	$('#bs_nsquare .bs_header').css({backgroundColor:'#'+color});
	$('#bs_nsquare .bs_footer').css({backgroundColor:'#'+color});
	$('#bs_esquare').css({borderRightColor:'#'+color});
	$('#bs_esquare .bs_header').css({backgroundColor:'#'+color});
	$('#bs_esquare .bs_footer').css({backgroundColor:'#'+color});
}

function binder_designer(name,color,style){
	Mousetrap.bind('esc',function(){
		if(backstore_status!==""){
			if(backstore_status=='nbinder'||backstore_status=='ebinder'){
				backstore_control(backstore_status);
				binder_designer();
				$('#nav_time').attr('onClick',"backstore_control('toolbox');$('#toolbox_note').focus();");
			}
			else{backstore_control(backstore_status);}
		}
	});
	if(backstore_status=='nbinder'||backstore_status=='ebinder'){
		$('#safety').show().transition({opacity:0},400,'',function(){$(this).hide();});
		$('#b_designer_frame').transition({top:'160%'},800,'easeOutExpo',function(){$('#b_designer_frame').remove();});
		$('#nav_time').attr('onClick',"backstore_control('toolbox');$('#toolbox_note').focus();");
	}
	else{
		if(name&&color&&style){
			$('#safety').before(
				'<div class="t04" id="b_designer_frame"><div class="t04" id="b_designer" style="background-color:#'+color+'"><div class="t03" id="b_designer_sidee"><p class="t03" id="b_designer_name">'+name+'</p></div><div class="t04" id="b_designer_style" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/'+style+'.png)"></div></div></div>'
			);
			$('#bs_ebinder').css({borderRightColor:'#'+color});
			$('#bs_ebinder .bs_header').css({backgroundColor:'#'+color});
			$('#bs_ebinder .bs_footer').css({backgroundColor:'#'+color});
			$('.style_select').css({backgroundColor:'#'+color,borderBottomColor:'#'+color});
		}
		else{
			$('#safety').before(
				'<div class="t04" id="b_designer_frame"><div class="t04" id="b_designer"><div class="t03" id="b_designer_side"><p class="t03" id="b_designer_name"></p></div><div class="t04" id="b_designer_style"></div></div></div>'
			);
			$('.style_select').css({backgroundColor:'#'+color,borderBottomColor:'#555555'});
		}
		$('#safety').show().transition({opacity:0.92},300,'',function(){$('#b_designer_frame').transition({top:'50%'},800,'easeOutExpo');});
		$('#nav_time').attr('onClick',"");
	}
}

function binder_designer_done(id){ //DO NOT FORGET TO CREATE THE THREE STYLE CLASS

	if(id==null){id='demo'+((parseInt($('.binder_frame').length))+1);} //FOR DEMO BINDERS
	var color = $('#b_designer').attr('bcolor');
	
	$("<style type='text/css'>.b_"+id+"_bkg{background-color:#"+color+"}.b_"+id+"_txt{color:#"+color+"}.b_"+id+"_brd{border-color:#"+color+"}.give_"+id+" .get{background-color:#"+color+"}</style>").appendTo("head");
	
	var binder_designer='<div id="b_'+id+'_frame" class="t04 binder_frame binder_frame_cpre"><div onClick="binder_select(\''+id+'\')" id="b_'+id+'" class="t04 binder b_'+id+'_bkg binder_pre"><div class="t03 binder_side binder_side_pre"><p class="binder_name">'+($('#bn_binder_name').val())+'</p><p class="binder_description">'+($('#bn_desc').val())+'</p></div><div class="t03 binder_number binder_number_pre"><p class="binder_total">0</p></div><div class="t04 binder_style" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/'+($('#b_designer').attr('bstyle'))+'.png)"></div></div></div>';
	
	var binder_content='<div id="b_'+id+'_content" class="content_view"><div id="b_'+id+'_c1" class="content_select"><p class="content_title">Active</p><div class="content_strip give_'+id+'"><p class="content_text">All clear chief</p></div></div><div id="b_'+id+'_c2" class="content_select"><p class="content_title">People</p><div class="content_strip give_'+id+'"><p class="content_text">All clear chief</p></div></div></div>';
	
	if($('.binder_frame').eq(-2).attr('id')=='b_klb_frame'){
		$('#b_klb_frame').before(binder_designer);
	}
	else{
		$('#struc_binder').append(binder_designer);
	}
	
	$('#b_klb_content').after(binder_content);
	
	$('#safety').show().transition({opacity:0},400,'',function(){$(this).hide();});
	$('#b_designer_frame').transition({top:'-60%'},800,'easeOutExpo',function(){$('#b_designer_frame').remove();});
	$('#nav_time').attr('onClick',"backstore_control('toolbox');$('#toolbox_note').focus();");
	
	
	setTimeout(function(){$('#b_'+id+'_frame').removeClass('binder_frame_cpre');safe=0;loading(1);},800);
	setTimeout(function(){$('#b_'+id).removeClass('binder_pre');$(".nano").nanoScroller();},1200);
	setTimeout(function(){$('#b_'+id+' .binder_side').removeClass('binder_side_pre');},1400);
	setTimeout(function(){$('#b_'+id+' .binder_number').removeClass('binder_number_pre');safe=1;loading(0);},1600);
	
	binders++;
	binder_count();
}

function binder_select(target,selection){
	if(safe==1){
		if(backstore_status=='nsquare'||backstore_status=='esquare'){
			backstore_control(backstore_status);
		}
		if(($('#struc_binder').hasClass('struc_binder_on'))){
			if(content_status==target){}
			else{
				menu_states();
				
				$('.binder_frame').removeClass('binder_on_select');
				$('#b_'+target+'_frame').addClass('binder_on_select');
					
				$('.cover_locker #cover_binder').stop(true,true).transition({marginTop:5,marginLeft:5},180).transition({backgroundColor:($('#b_'+target).css('background-color')),marginTop:0,marginLeft:0},360);
				$('.cover_locker #cover_binder_style').stop(true,true).delay(180).transition({backgroundImage:($('#b_'+target+' .binder_style').css('background-image'))},360);
					
				$('.cover_locker #cover_name').text(($('#b_'+target+' .binder_name').text())).stop(true,true).transition({x:10,opacity:0},0).transition({x:0,opacity:1},380);
				$('.cover_locker #cover_description').html($('#b_'+target+' .binder_description').html());
				$('.cover_locker #cover_description').stop(true,true).transition({x:4,opacity:0},0).delay(120).transition({x:0,opacity:1},380);
				
				content_control(target,selection,1);
			}
			
		}
		else{
			menu_states();
			loading(1);
			$('#struc_binder').transition({opacity:0},260,'',function(){
				//console.log(' je suis 1');
                               // console.log(target);
				$('#nl_locker_4').show();
				$('#struc_content_manage').addClass('content_manage');
				$('.m_add').attr('onClick',"backstore_control('nsquare');square_bindercolor();");
				
				$('#struc_binder').addClass('struc_binder_on').transition({x:-20},0).css({opacity:1}).transition({x:0},300);
				
				$('#b_'+target+'_frame').addClass('binder_on_select');
				
				$('.binder_frame:not(.binder_frame_not)').addClass('binder_frame_on').addClass('t0');
				$('.binder:not(.cover_locker #cover_binder)').addClass('binder_on').addClass('t0');
				
				for(i=0;i<binders;i++){
					$('.binder_frame_on').eq(i).transition({y:-20,opacity:0},0).delay(i*16).transition({y:0,opacity:1},540);
					if(i==binders-1){safe=1;loading(0);}
				}

				$('.cover_locker').show().transition({opacity:1},360);
				$('.cover_locker').next('#content').show();
				
				$('.cover_locker #cover_binder').transition({backgroundColor:($('#b_'+target).css('background-color')),marginTop:0,marginLeft:0},400);
				$('.cover_locker #cover_binder_style').transition({backgroundImage:($('#b_'+target+' .binder_style').css('background-image'))},480);
				
				$('.cover_locker #cover_name').text(($('#b_'+target+' .binder_name').text())).stop(true,true).transition({x:10,opacity:0},0).transition({x:0,opacity:1},380);
				$('.cover_locker #cover_description').html($('#b_'+target+' .binder_description').html());
				$('.cover_locker #cover_description').stop(true,true).transition({x:4,opacity:0},0).delay(120).transition({x:0,opacity:1},380,'',function(){loading(0);});
				
				content_control(target,selection,1);
			});
		}
	}
}

function binder_restore(){
	if(backstore_status=='nsquare'||backstore_status=='esquare'){
		backstore_control(backstore_status);
	}
	else{safe=0;loading(1);}
	if(content_selection=='2'){
		$('.m_manage').css('height','26px');
		$('.m_list').css('height','26px');
	}
	menu_states();
	$('.cover_locker').transition({opacity:0},260);
	$('.cover_locker').next('#content').transition({opacity:0},260);
	$('#struc_binder').transition({opacity:0},260,'',function(){
				
		$('#nl_locker_4').hide();
		$('#struc_content_manage').removeClass('content_manage');
		$('.m_add').attr('onClick',"backstore_control('nbinder');binder_designer();");
		
		$('#struc_binder').removeClass('struc_binder_on').css({opacity:0}).transition({opacity:1},300);
		
		$('#b_'+content_status+'_frame').removeClass('binder_on_select');
		
		$('.binder_frame:not(.binder_frame_not)').addClass('t0').removeClass('binder_frame_on');
		
		$('.binder:not(#cover_binder)').addClass('t0').removeClass('binder_on').addClass('binder_pre2');
		$('.binder_side').addClass('t0').addClass('binder_side_pre2');
		$('.binder_number').addClass('t0').addClass('binder_number_pre2');

		$('#cover_binder').css({marginTop:7,marginLeft:7,backgroundColor:'#666'});
		$('#cover_binder_style').css({backgroundImage:'initial'});
		
		$('.cover_locker').hide();
		$('.cover_locker').next('#content').hide().css({opacity:1});
		
		setTimeout(function(){
			$('.binder_frame:not(.binder_frame_not)').removeClass('t0');
		
			$('.binder:not(#cover_binder)').removeClass('binder_pre2').removeClass('t0');
			$('.binder_side').removeClass('binder_side_pre2').removeClass('t0');
			$('.binder_number').removeClass('binder_number_pre2').removeClass('t0');
			safe=1;loading(0);
		},10);
		
		content_status="";
		content_selection="";
	});
}

function delete_binder(target){
	
	$('#b_'+target).attr('onClick',"").css('cursor','wait');
	$('#b_'+target+'_frame').addClass('binder_frame_not');
	setTimeout(function(){$('#b_'+target).addClass('destroy_binder');},0);
	setTimeout(function(){$('#b_'+target+' .binder_side').addClass('destroy_binder_side');},0);
	setTimeout(function(){$('#b_'+target+' .binder_number').addClass('destroy_binder_side');},0);
	setTimeout(function(){$('#b_'+target+' .binder_style').addClass('destroy_binder_style');},0);
	setTimeout(function(){safe=0;loading(1);$('#b_'+target+'_frame').removeClass('t04').transition({width:0,opacity:0,margin:0,padding:0,border:0},480,'',function(){$('#b_'+target+'_frame').remove();safe=1;loading(0);});},800);
	$('#b_'+target+'_content').remove();
	binders=binders-1;
	binder_count();
}

function delete_square(target){
	$('#sq_'+target).attr('onClick',"").css({cursor:'wait'}).transition({scale:0.8,opacity:0},380,'',function(){$(this).transition({scale:1},0).transition({width:0},160,'',function(){$(this).remove();});});
}

function square_done(id){
	if(id==null){id='demosq'+((parseInt($('.sq').length))+1);} //FOR DEMO SQUARES
	
	setTimeout(function(){
	
		safe=0;loading(1);
	
		$('#b_'+content_status+'_c1 .content_strip').eq(0).prepend('<div id="'+id+'" class="t025 sq get t04 sq_pre"><p class="sq_name">'+($('#sq_square_name').val())+'</p><p class="sq_date">'+($.datepicker.formatDate('dd/mm/y', new Date()))+'</p><div class="sq_update"></div><div class="t02 sq_streak t04 sq_streak_pre"></div></div>');
		
		setTimeout(function(){$('#'+id).removeClass('sq_pre');},50);
		setTimeout(function(){$('#'+id+' .sq_streak').removeClass('sq_streak_pre');},300);
		setTimeout(function(){$('#'+id).removeClass('t04');},455);
		setTimeout(function(){$('#'+id+' .sq_streak').removeClass('t04');safe=1;loading(0);},805);
	
	},860);
}

function person_get(target){
	var iconsb = '<div class="social_icons social_';
	var iconse = '" style="display:none"></div>';
	if(social[target].facebook!==''){$('#cover_icons').append('<a href="http://facebook.com/'+social[target].facebook+'" target="_blank">'+iconsb+'facebook'+iconse+'</a>');}
	if(social[target].google!==''){$('#cover_icons').append('<a href="http://plus.google.com/'+social[target].google+'" target="_blank">'+iconsb+'google'+iconse+'</a>');}
	if(social[target].twitter!==''){$('#cover_icons').append('<a href="http://twitter.com/'+social[target].twitter+'" target="_blank">'+iconsb+'twitter'+iconse+'</a>');}
	if(social[target].instagram!==''){$('#cover_icons').append('<a href="http://instagram.com/'+social[target].instagram+'" target="_blank">'+iconsb+'instagram'+iconse+'</a>');}
	if(social[target].skype!==''){$('#cover_icons').append('<a href="skype:'+social[target].skype+'?call">'+iconsb+'skype'+iconse+'</a>');}
	if(social[target].linkedin!==''){$('#cover_icons').append('<a href="http://linkedin.com/in/'+social[target].linkedin+'" target="_blank">'+iconsb+'linkedin'+iconse+'</a>');}
	if(social[target].tumblr!==''){$('#cover_icons').append('<a href="http://'+social[target].tumblr+'.tumblr.com" target="_blank">'+iconsb+'tumblr'+iconse+'</a>');}
	if(social[target].youtube!==''){$('#cover_icons').append('<a href="http://youtube.com/'+social[target].youtube+'" target="_blank">'+iconsb+'youtube'+iconse+'</a>');}
	if(social[target].vimeo!==''){$('#cover_icons').append('<a href="http://vimeo.com/'+social[target].vimeo+'" target="_blank">'+iconsb+'vimeo'+iconse+'</a>');}
	if(social[target].vine!==''){$('#cover_icons').append('<a href="http://vine.co/'+social[target].vine+'" target="_blank">'+iconsb+'vine'+iconse+'</a>');}
	if(social[target].flickr!==''){$('#cover_icons').append('<a href="http://flickr.com/photos/'+social[target].flickr+'" target="_blank">'+iconsb+'flickr'+iconse+'</a>');}
	if(social[target].pinterest!==''){$('#cover_icons').append('<a href="http://pinterest.com/'+social[target].pinterest+'" target="_blank">'+iconsb+'pinterest'+iconse+'</a>');}
	if(social[target].soundcloud!==''){$('#cover_icons').append('<a href="http://soundcloud.com/'+social[target].soundcloud+'" target="_blank">'+iconsb+'soundcloud'+iconse+'</a>');}
	if(social[target].deviantart!==''){$('#cover_icons').append('<a href="http://'+social[target].deviantart+'.deviantart.com" target="_blank">'+iconsb+'deviantart'+iconse+'</a>');}
	if(social[target].dribbble!==''){$('#cover_icons').append('<a href="http://dribbble.com/'+social[target].dribbble+'" target="_blank">'+iconsb+'dribbble'+iconse+'</a>');}
	if(social[target].behance!==''){$('#cover_icons').append('<a href="http://behance.net/'+social[target].behance+'" target="_blank">'+iconsb+'behance'+iconse+'</a>');}
	if(social[target].twitch!==''){$('#cover_icons').append('<a href="http://twitch.tv/'+social[target].twitch+'" target="_blank">'+iconsb+'twitch'+iconse+'</a>');}
	if(social[target].steam!==''){$('#cover_icons').append('<a href="http://steamcommunity.com/id/'+social[target].steam+'" target="_blank">'+iconsb+'steam'+iconse+'</a>');}
	if(social[target].xbox!==''){$('#cover_icons').append('<a href="http://account.xbox.com/en-US/Profile?gamerTag='+social[target].xbox+'" target="_blank">'+iconsb+'xbox'+iconse+'</a>');}
	
	$('.social_icons').transition({scale:0.86,opacity:0},0).show().transition({scale:1,opacity:1},380,'',function(){$(this).addClass('t02');});
	
	setTimeout(function(){
		$('#'+target+'_content .content_location').geocomplete({
			map:'#'+target+'_content .content_location',
			mapOptions:{zoom:16},
			markerOptions:{draggable:false},
			location:social[target].location
		});
	},1);
}

function person_select(target,selection){
	if(safe==1){
		var description="";
		//console.log(target);
               // console.log(social);
		switch(social[target].type){
			case 'student':description='<span class="cover_description_type">I\'m a Student.</span> '+social[target].description;break;
			case 'teacher':description='<span class="cover_description_type">I\'m a Teacher.</span> '+social[target].description;break;
			case 'artist':description='<span class="cover_description_type">I\'m an Artist.</span> '+social[target].description;break;
			case 'pro':description='<span class="cover_description_type">I\'m a Professional.</span> '+social[target].description;break;
			case 'home':description=''+social[target].description;break;
		}
		// console.log('je suis la 6'); 
		if($('#cover').css('display')=='block'){
			// console.log('je suis la 7'); 
                         if(content_status==target){
                         //  console.log('je suis la 8'); 
                        }
			else{
				menu_states();
				// console.log('je suis la 9'); 	
				$('#cover_picture').stop(true,true).transition({marginTop:5,marginLeft:5},180).transition({backgroundImage:'url('+(social[target].picture)+')',marginTop:0,marginLeft:0},360);
				
				$('.menu_social').css({height:0,marginBottom:0});
				$('.menu_social.m_chat').removeClass('s_online').removeClass('s_busy').removeClass('s_away').removeClass('s_offline');
				$('.menu_social.m_fav').removeClass('m_favorite').attr('onClick','');
				
				if(target==user_id){
					$('.m_manage').css({height:26,marginBottom:5});
				}
				else if(social[target].contact){
					$('.m_chat').css({height:26,marginBottom:5}).addClass('s_'+social[target].status).attr('onClick','chat_create(\''+target+'\',\''+social[target].name+'\',\''+social[target].picture+'\',0,\''+social[target].status+'\')');
					$('.m_fav').css({height:26,marginBottom:5}).attr('onClick','person_fav(\''+target+'\')');
					$('.m_delete').css({height:26,marginBottom:5});
					if(social[target].fav){$('.m_fav').addClass('m_favorite');}
				}
				else{
					$('.m_add').css({height:26,marginBottom:5}).attr('onClick','notif_create({type:\'contacti\',person:\''+social[target].name+'\',picture:\''+social[target].picture+'\'})');
				}
				
				$('#cover_icons').html('');
				if(social[target].contact||target==user_id){person_get(target);}
					
				$('#cover_name').text(social[target].name).stop(true,true).transition({x:10,opacity:0},0).transition({x:0,opacity:1},380);
				$('#cover_description').html(description).stop(true,true).transition({x:4,opacity:0},0).delay(120).transition({x:0,opacity:1},380);
				
				content_control(target,selection,1);
			}
			
		}
		else{
                    	 //console.log('je suis la 10'); 
			menu_states();
			loading(1);
				$('#struc_content_manage').addClass('content_manage');

				$('#cover').show().transition({opacity:1},360);
				$('#content').show();
				
				$('#cover_picture').transition({backgroundImage:'url('+(social[target].picture)+')',marginTop:0,marginLeft:0},400);
				
				$('#cover_icons').html('');
				if(social[target].contact||target==user_id){person_get(target);}	
				
				$('#cover_name').text(social[target].name).stop(true,true).transition({x:10,opacity:0},0).transition({x:0,opacity:1},380);
				$('#cover_description').html(description).stop(true,true).transition({x:4,opacity:0},0).delay(120).transition({x:0,opacity:1},380,'',function(){loading(0);});
				
				content_control(target,selection,1);
		}
	}else{
            
        }
}

function person_fav(target){
	if(social[target].fav){
		social[target].fav=false;
		$('.menu_social.m_fav').removeClass('m_favorite');
	}
	else{
		social[target].fav=true;
		$('.menu_social.m_fav').addClass('m_favorite');
	}
	
}

function content_control(target,selection,bypass){
	if(safe==1||bypass==1){
		safe=1;loading(0);
		selection = selection || '1';
		var prefix="";
		var color="";
		
		if(current=='locker'){
			if(selection=='1'){
				$('.m_add').attr('onClick',"backstore_control('nsquare');square_bindercolor();");
				$('.m_manage').css('height','26px');
				$('.m_list').css('height','26px');
			}
			else{
				if(backstore_status=='nsquare'||backstore_status=='esquare'){
					backstore_control(backstore_status);
				}
				$('.m_add').attr('onClick',"backstore_control('nsquare');square_bindercolor();content_control(null,'1',1);");
				$('.m_manage').css('height','0px');
				$('.m_list').css('height','0px');
			}
			prefix="b_";
			if(target){color=$('#'+prefix+target).css('background-color');}
			else{color=$('#'+prefix+content_status).css('background-color');}
			menu_states();
		}
		else{
			// console.log('je suis la 20'); 
                           if(selection==1){
				if(target){
					$('#'+target+'_content .content_location').stop(true,true).transition({x:5,y:5,opacity:0},0).delay(240).transition({x:0,y:0,opacity:1},320);
				}
				else{
					$('#'+content_status+'_content .content_location').stop(true,true).transition({x:5,y:5,opacity:0},0).delay(240).transition({x:0,y:0,opacity:1},320);
				}
			}
			color="#FF0063"
			menu_states();
		}
                //--------------Fode -----------------
                var bkd_current_helper='';
		if(current=='locker'){ 
                  bkd_current_helper='.cover_locker ';
                 }else if(current=='social'){
                   bkd_current_helper='.cover_social ';  
                }
                //--------------Fin
                
		if(target){
			content_status=target;
			$('.content_view').hide();
			$('.content_select').hide();
			$('#'+prefix+content_status+'_content').show();
                        
			for(i=0;i<($(bkd_current_helper+'.cover_nav_bt').length);i++){
				if(i==parseInt(selection)-1){$(bkd_current_helper + '.cover_nav_bt').eq(i).removeClass('t025').removeClass('cover_nav_on').transition({y:10,opacity:0,backgroundColor:'#444'},0).transition({delay:(i*80)+240,y:0,opacity:1,backgroundColor:color,queue:false},260,'',function(){$(this).addClass('t025').addClass('cover_nav_on');});}
				else{$(bkd_current_helper + '.cover_nav_bt').eq(i).removeClass('t025').removeClass('cover_nav_on').transition({y:10,opacity:0,backgroundColor:'#444'},0).transition({delay:(i*80)+240,y:0,opacity:1,queue:false},260,'',function(){$(this).addClass('t025');});}
			}
                      
		}
	
		if(content_selection==selection && target==null){
		}
		else{
			content_selection=selection;
			if(target){}
			else{
				$('.content_select').hide();
				$(bkd_current_helper + '.cover_nav_bt').css({backgroundColor:'#444'}).removeClass('cover_nav_on').addClass('t025');
				$(bkd_current_helper + '.cover_nav_bt').eq(parseInt(content_selection)-1).removeClass('t025').transition({backgroundColor:color,queue:false},300,'',function(){$(this).addClass('t025').addClass('cover_nav_on');});
			}
			$('#'+prefix+content_status+'_c'+content_selection).show();
                        if(bkd_current_helper==''){
                        $('.nano').nanoScroller();    
                        }else{
                         $(bkd_current_helper).next('.nano').nanoScroller();   
                        }
			
			$('#'+prefix+content_status+'_c'+content_selection+' .content_title').transition({opacity:0},0).transition({opacity:1},560);
			$('#'+prefix+content_status+'_c'+content_selection+' .content_strip').transition({x:16,opacity:0},0).delay(200).transition({x:0,opacity:1},460);
		}
		
	}
}

function special_get(target){
		
		if(current=='feedback'){
			$('#'+current+'_special_2 .special_textarea').text(special_post[target].description);
		}
		else{
			$('#'+current+'_special_2 .special_video').remove();
			if(special_post[target].description==''){
				$('#'+current+'_special_2 .special_frame').append(
				'<div class="special_main special_video"><iframe src="//player.vimeo.com/video/118739987?autoplay=1&color=FF0063&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'
				);
			}
			else{
				$('#'+current+'_special_2 .special_frame').append(
				'<div class="special_main special_video"><iframe src="//player.vimeo.com/video/'+(special_post[target].description)+'?autoplay=1&color=FF0063&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'
				);
			}
			
		}
		$('#'+current+'_special_2 .special_title').text($('#'+target+' .special_obj_title').text());
		$('#'+current+'_special_2 .special_type').text($('#'+target+' .special_obj_type').text());
		$('#'+current+'_special_2 .special_date').text(special_post[target].date);
		$('#'+current+'_special_2 .special_author').text(special_post[target].author);
		$('#'+current+'_special_2 .special_author_picture').css({backgroundImage:'url('+special_post[target].picture+')'});
		$('#'+current+'_special_2 .special_date').text(special_post[target].date);
		if(($('#'+target+' .special_obj_tag').text())=='Comms'){$('#'+current+'_special_2 .special_tag').text('Communications');}
		else{$('#'+current+'_special_2 .special_tag').text($('#'+target+' .special_obj_tag').text());}
		$('#'+current+'_special_2 .special_tag_color').css({backgroundColor:($('#'+target+' .special_obj_tag_color').css('backgroundColor'))});
	
}

function special_content(target){
	if(safe==1){
		safe=0;
		loading(1);
		if(special_status==""){
			$('.special_obj').removeClass('t025').transition({opacity:0.70,queue:false},320,'',function(){$(this).addClass('t025');});
			$('#'+target).removeClass('t025').transition({opacity:1,queue:false},320,'',function(){$(this).addClass('t025');});
			$('#'+target).transition({scale:0.98},140).transition({scale:1},220);
			
			if(current=='feedback'){
				$('.feedback_zone').css({width:336});
				$('#'+target+' .feedback_zone').css({width:260});
				$('.feedback_self .feedback_zone').css({width:336});
			}
			else{
				if($('#'+target+' .special_obj_tag').text()=='Tutorial'){
					$('#'+target+' .help_graphic').css({backgroundColor:'#DA095A'});
				}
			}
			
			special_get(target);
			
			$('#'+current+'_special_2').transition({x:10,opacity:0},0).show().transition({x:0,opacity:1},680,'easeOutExpo',function(){safe=1;loading(0);special_status=target;});
			$('#'+current+'_special_2 .special_tags').transition({x:-10,y:-39},0).show().transition({x:0,y:0},680,'easeOutExpo');
			$('#'+current+'_special_2 .special_main').transition({x:-10,y:19},0).show().transition({x:0,y:0},680,'easeOutExpo');
			$('#'+current+'_special_2 .special_author_picture').transition({x:-10,scale:0.92},0).show().transition({x:0,y:0,scale:1},680,'easeOutExpo');
			
		}
		else if(special_status==target){
			$('.special_obj').removeClass('t025').transition({opacity:1,queue:false},320,'',function(){$(this).addClass('t025');});
			$('#'+target).removeClass('t025').transition({opacity:1,queue:false},320,'',function(){$(this).addClass('t025');});
			$('#'+target).transition({scale:0.99},120).transition({scale:1},190);
			
			if(current=='feedback'){
				$('.feedback_zone').css({width:260});
				$('.feedback_self .feedback_zone').css({width:336});
			}
			else{
				setTimeout(function(){$('#'+current+'_special_2 .special_video').remove();},440);
				$('.help_graphic').css({backgroundColor:'#444444'});
			}
			
			$('#'+current+'_special_2').transition({x:10,opacity:0},440,'easeOutExpo',function(){$(this).hide();safe=1;loading(0);special_status="";});
			$('#'+current+'_special_2 .special_tags').transition({x:-10,y:-39},440,'easeOutExpo');
			$('#'+current+'_special_2 .special_main').transition({x:-10,y:19},440,'easeOutExpo');
		}
		else{
			$('.special_obj').removeClass('t025').transition({opacity:0.70,queue:false},320,'',function(){$(this).addClass('t025');});
			$('#'+target).removeClass('t025').transition({opacity:1,queue:false},320,'',function(){$(this).addClass('t025');});
			$('#'+target).transition({scale:0.98},140).transition({scale:1},220);
			$('#'+target).transition({opacity:1},320);
			
			if(current=='feedback'){
				$('.feedback_zone').css({width:336});
				$('#'+target+' .feedback_zone').css({width:260});
				$('.feedback_self .feedback_zone').css({width:336});
			}
			else{
				$('.help_graphic').css({backgroundColor:'#444444'});
				if($('#'+target+' .special_obj_tag').text()=='Tutorial'){
					$('#'+target+' .help_graphic').css({backgroundColor:'#DA095A'});
				}
			}
			
			special_get(target);
			
			$('#'+current+'_special_2 .special_anim').transition({opacity:0},0).show().transition({opacity:1},460,'',function(){safe=1;loading(0);special_status=target;});
			$('#'+current+'_special_2 .special_tag_color').transition({opacity:0,y:-39},0).show().transition({opacity:0.82,y:0},460,'easeOutExpo');
			$('#'+current+'_special_2 .special_tag').transition({opacity:0,y:-39},0).show().transition({opacity:1,y:0},460,'easeOutExpo');
			$('#'+current+'_special_2 .special_main').transition({y:19,opacity:0},0).show().transition({y:0,opacity:1},460,'easeOutExpo');
			$('#'+current+'_special_2 .special_author_picture').transition({scale:0.92},0).show().transition({x:0,y:0,scale:1},460,'easeOutExpo');
		}
	}
}

function special_filter(target){
	if(current=='feedback'){
		$('#nav_list_feedback .nav_listing').removeClass('nav_active');
		switch(target){
			case 'all': 
				$('.feedback').removeClass('t025').hide().fadeIn(380,'',function(){$('.feedback').addClass('t025');});
				$('#nl_feedback_1').addClass('nav_active');
			break;
			case 'bugs': 
				$('.feedback').removeClass('t025').hide();
				$('.feedback_bug').fadeIn(380,'',function(){$('.feedback').addClass('t025');});
				$('#nl_feedback_2').addClass('nav_active');
			break;
			case 'suggestions': 
				$('.feedback').removeClass('t025').hide();
				$('.feedback_suggestion').fadeIn(380,'',function(){$('.feedback').addClass('t025');});
				$('#nl_feedback_3').addClass('nav_active');
			break;
			default: $('.feedback').removeClass('t025').hide().fadeIn(380,'',function(){$('.feedback').addClass('t025');});
					 $('#nl_feedback_1').addClass('nav_active');
			break;
		}
	}
	else{
		$('#nav_list_help .nav_listing').removeClass('nav_active');
		switch(target){
			case 'all': 
				$('.help').removeClass('t025').hide().fadeIn(380,'',function(){$('.help').addClass('t025');});
				$('#nl_help_1').addClass('nav_active');
			break;
			case 'tutorials': 
				$('.help').removeClass('t025').hide();
				$('.help_tutorials').fadeIn(380,'',function(){$('.help').addClass('t025');});
				$('#nl_help_2').addClass('nav_active');
			break;
			case 'updates': 
				$('.help').removeClass('t025').hide();
				$('.help_updates').fadeIn(380,'',function(){$('.help').addClass('t025');});
				$('#nl_help_3').addClass('nav_active');
			break;
			default: $('.help').removeClass('t025').hide().fadeIn(380,'',function(){$('.help').addClass('t025');});
					 $('#nl_help_1').addClass('nav_active');
			break;
		}
	}
}

function feedback_done(id){
	if((parseInt($('#feedback_points p').text()))>1){
		id = id || ('post_TESTID'+(Math.floor(Math.random()*100000)+1));
		$('#feedback_list').append(
		'<div id="'+id+'" class="special_obj feedback feedback_'+($('#list_type').attr('active')).toLowerCase()+' feedback_vote_up feedback_self"><div onClick="special_content(\''+id+'\')" class="feedback_zone"></div><p class="special_obj_title">'+($('#feedback_post_title').val())+'</p><p class="special_obj_type">'+($('#list_type').attr('active'))+'</p><p class="special_obj_tag">'+($('#list_tag').attr('active'))+'</p><div class="special_obj_tag_color fdt_'+(($('#list_tag').attr('active')).toLowerCase())+'"></div><div class="feedback_counter_block"><div onClick="feedback_vote(\'up\',\''+id+'\');" class="t02 icons feedback_counter feedback_counter_up"></div><div class="feedback_counter_number"><p>1</p></div><div onClick="feedback_vote(\'down\',\''+id+'\');" class="t02 icons feedback_counter feedback_counter_down"></div></div></div>'
		);
		
		special_post[id] = {
			author:user_fullname,
			picture:user_picture,
			date:(($.datepicker.formatDate('dd/mm/y', new Date()))+' '+formatTime()),
			description:($('#feedback_post_description').val())											
		}
		
		action_done();
		$('#feedback_points p').text((parseInt($('#feedback_points p').text())-2));
		
		$('#'+id).transition({scale:0.76,opacity:0},0).transition({scale:1,opacity:1},640,'easeOutExpo',function(){$(this).addClass('t025');});
	}
}

function feedback_compare(vote,target){
	var before = $('#'+target).prev();
	if($(before).hasClass('feedback')){before = $(before).attr('id');}
	else{
		before = $(before).prev();
		if($(before).hasClass('feedback')){before = $(before).attr('id');}
		else{
			before = $(before).prev();
			if($(before).hasClass('feedback')){before = $(before).attr('id');}
		}
	}
	var target_n = parseInt($('#'+target+' .feedback_counter_number p').text());
	var before_n = parseInt($('#'+before+' .feedback_counter_number p').text());
	var after = $('#'+target).next();
	if($(after).hasClass('feedback')){after = $(after).attr('id');}
	else{
		after = $(after).next();
		if($(after).hasClass('feedback')){after = $(after).attr('id');}
		else{
			after = $(after).next();
			if($(after).hasClass('feedback')){after = $(after).attr('id');}
		}
	}
	
	var target_n = parseInt($('#'+target+' .feedback_counter_number p').text());
	var after_n = parseInt($('#'+after+' .feedback_counter_number p').text());
	
	if(target_n<=after_n){
		$('#'+target).removeClass('t025').transition({y:6,opacity:0},160);
		$('#'+after).removeClass('t025').transition({y:6,opacity:0},160,'',function(){
			$('#'+target).insertAfter($('#'+after));
			$('#'+target).transition({y:0,opacity:1},160,'',function(){$(this).addClass('t025');});
			$('#'+after).transition({y:0,opacity:1},160,'',function(){$(this).addClass('t025');});
		});
	}
	else if(target_n>=before_n){
		$('#'+target).removeClass('t025').transition({y:6,opacity:0},160);
		$('#'+before).removeClass('t025').transition({y:6,opacity:0},160,'',function(){
			$('#'+target).insertBefore($('#'+before));
			$('#'+target).transition({y:0,opacity:1},160,'',function(){$(this).addClass('t025');});
			$('#'+before).transition({y:0,opacity:1},160,'',function(){$(this).addClass('t025');});
		});
	}
}

function feedback_vote(vote,target){
	var points = parseInt($('#feedback_points p').text());
	var count = parseInt($('#'+target+' .feedback_counter_number p').text());
	
	if(special_status==""){}
	else{special_content(special_status);}
	
	if(($('#'+target).hasClass('feedback_vote_up'))){
		if(vote=='up'){
			$('#'+target).removeClass('feedback_vote_up');
			$('#'+target+' .feedback_counter_number p').stop(true,true).hide().text((count-1)).fadeIn(160);
			$('#feedback_points p').stop(true,true).hide().text((points+1)).fadeIn(160);
		}
		else{
			$('#'+target).removeClass('feedback_vote_up');
			$('#'+target).addClass('feedback_vote_down');
			$('#'+target+' .feedback_counter_number p').stop(true,true).hide().text((count-2)).fadeIn(160);
		}
		
	}
	else if(($('#'+target).hasClass('feedback_vote_down'))){
		if(vote=='down'){
			$('#'+target).removeClass('feedback_vote_down');
			$('#'+target+' .feedback_counter_number p').stop(true,true).hide().text((count+1)).fadeIn(160);
			$('#feedback_points p').stop(true,true).hide().text((points+1)).fadeIn(160);
		}
		else{
			$('#'+target).removeClass('feedback_vote_down');
			$('#'+target).addClass('feedback_vote_up');
			$('#'+target+' .feedback_counter_number p').stop(true,true).hide().text((count+2)).fadeIn(160);
		}
	}
	else{
		if(points>0){
			if(vote=='up'){
				$('#'+target).addClass('feedback_vote_up');
				$('#'+target+' .feedback_counter_number p').stop(true,true).hide().text((count+1)).fadeIn(160);
			}
			else{
				$('#'+target).addClass('feedback_vote_down');
				$('#'+target+' .feedback_counter_number p').stop(true,true).hide().text((count-1)).fadeIn(160);
			}
			$('#feedback_points p').stop(true,true).hide().text((points-1)).fadeIn(160);
		}
	}
	feedback_compare(vote,target);
}