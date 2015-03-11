/****************************************************************************
 * Title: initVideoManager
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @param {object} socket: the communication socket
 * @returns {undefined}
 * Description: init the click on the video buttons
 ****************************************************************************/
function initVideoManager(userId, userColor, socket){
	$('#vidAdd').bind('click', function(){//on click disable add enable edit
		$('#vidl,#vidInsert').removeAttr('disabled');
		$('#vidAdd').attr('disabled', 'disabled');
		$('#vidInsert').bind('click', function(){
			verifyVideoLink( userId, userColor );
		});
		$('#vidl').focus();
	});
}

/****************************************************************************
 * Title: verifyVideoLink
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @returns {undefined}
 * Description: verify that the link is supported and convert it for the iframe
 ****************************************************************************/
function verifyVideoLink( userId, userColor ){
	var originalLink = $('#vidl').val();
	var link = originalLink;
	if( link.length ){
		if(link.match(/^https?:\/\/www.youtube.com\/watch\?v=.*/)){//normal youtube
			link=link.substr((link.indexOf('/watch?v=')+9));
			if(link.indexOf('&')!=-1){
				link=link.substring(0,link.indexOf('&'));
			}
			insertvideo(userId, userColor, 'youtube', originalLink, link);
		}else if(link.match(/^https?:\/\/youtu.be\/.*/)){//youtube with time
			var time;
			link=link.substr((link.indexOf('youtu.be/')+9));
			if(link.indexOf('?')!=-1){
				time=link.substring(link.indexOf('?'));
				link=link.substring(0,link.indexOf('?'));
				var min = time.match(/(\d+)m/);
				var sec = time.match(/(\d+)s/);
				min = min ? parseInt(min[1]) : 0;
				sec = sec ? parseInt(sec[1]) : 0;
				time = (min*60) + sec;
				//console.log(time);
			}else{
				time=0;
			}
			insertvideo(userId, userColor, 'youtu.be', originalLink, link, time);
		}else if(link.match(/^https?:\/\/vimeo.com\/.*/)){//vimeo
			link=link.substr((link.lastIndexOf('/')+1));
			insertvideo(userId, userColor, 'vimeo', originalLink, link);
		}else if(link.match(/^https?:\/\/www.dailymotion.com\/video\/.*/)){//daylymotion
			link=link.substring((link.indexOf('video/')+6),(link.indexOf('_')));
			insertvideo(userId, userColor, 'dailymotion', originalLink, link);
		}
	}
}

/****************************************************************************
 * Title: insertvideo
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @param {string} type: the type of video(youtube,vimeo,etc...)
 * @param {string} originalLink: the link given by the user
 * @param {string} link: the converted link
 * @param {string} time: the time code for youtube video
 * @returns {undefined}
 * Description: make and insert an the video iframe
 ****************************************************************************/
function insertvideo(userId, userColor, type, originalLink, link, time){
	if($doc('div.selAnchor#' + userId).length){
		selectionDelete(userId, userColor);
	}
	if(previousNodeSearch($doc('div.cursor#' + userId)[0]) == 'firstLine' ){//at p start one enter insert in prev p
		manageEnter( userId, null, 'kolab', 'undo', false );
		var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer').prev('p.paragraphContainer');
	}else if( nextNodeSearch($doc('div.cursor#' + userId)[0]) == 'lastLine'){//end of p one enter insert in next P
		manageEnter( userId, null, 'kolab', 'undo', false );
		var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
	}else{//in the middle two enter insert in prev P
		manageEnter( userId, null, 'kolab', 'undo', false );
		manageEnter( userId, null, 'kolab', 'undo', false );
		var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer').prev('p.paragraphContainer');
	}
	paragraph.html('');
	var id= klbGenerator();
	
	switch(type){
		case 'youtube':
			paragraph.append('<iframe id="' + id + '" link="'+originalLink+'" src="http://www.youtube.com/embed/'+link+'" width="564" height="368" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			break;
		case 'youtu.be':
			paragraph.append('<iframe id="' + id + '" link="'+originalLink+'" src="http://www.youtube.com/embed/'+link+'?wmode=transparent&start='+time+'" width="564" height="368" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			break;
		case 'vimeo':
			paragraph.append('<iframe id="' + id + '" link="'+originalLink+'" src="http://player.vimeo.com/video/'+link+'" width="564" height="368" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			break;
		case 'dailymotion':
			paragraph.append('<iframe id="' + id + '" link="'+originalLink+'" src="http://www.dailymotion.com/embed/video/'+link+'" width="564" height="368" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			break;
	}
	
	//disable edit enable add
	$('#vidl').val('');
	$('#vidInsert').unbind('click');
	$('#vidl,#vidInsert').attr('disabled', 'disabled');
	$('#vidAdd').removeAttr('disabled');
	$('iframe#r_engine')[0].contentWindow.focus();
}