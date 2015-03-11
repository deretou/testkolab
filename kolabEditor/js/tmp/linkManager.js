/****************************************************************************
 * Title: initLinkManager
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @param {object} socket: the communication socket
 * @returns {undefined}
 * Description: init the click on the link button
 ****************************************************************************/
function initLinkManager( userId, userColor, socket ){
	$('#linkAdd').bind('click', function(){
		addLink( userId, userColor );
	});
}

/****************************************************************************
 * Title: addLink
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @returns {undefined}
 * Description: activate link textFields and put the selected text in link text
 ****************************************************************************/
function addLink( userId, userColor ){
	var anchorKlb = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer').attr('klb');
	var cursorKlb = $doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb');
	var text= '';
	//if there is a selection set the link text area to the selected text
	if($doc('div.selAnchor#' + userId).length){
		if(anchorKlb == cursorKlb){
			if($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)){
				var typeStart = 'selAnchor';
				var typeEnd = 'cursor';
			}else{
				var typeStart = 'cursor';
				var typeEnd = 'selAnchor';
			}
			text = $doc('div.cursor#' + userId).parents('p.paragraphContainer').html();
			text = text.replace(new RegExp('<div class="selection(Start|End)?Box" id="' + userId + '".*?><\/div>', 'g'), '');//remove the selections divs
			text = text.replace(new RegExp('.*?<div class="' + typeStart + '" id="' + userId + '"><\/div>(.*?)<div class="' + typeEnd + '" id="' + userId + '"><\/div>.*'), '$1');//take the between cursors/anchors tag 
			text = text.replace(/<.*?>/g,'');//remove tags
			$('#linktext').val(text);
		}
	}
	$('#link,#linktext,#linkInsert').removeAttr('disabled');//enable the fields of edits(will be open sidebar)
	$('#linkInsert').bind('click', function(){
		insertLink( userId, userColor, text);
	});
	$('#linkAdd').attr('disabled', 'disabled');//disable add button while edit
	$('#link').focus();
	
}

/****************************************************************************
 * Title: insertLink
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @param {string} text the original link text
 * @returns {undefined}
 * Description: insert a link in the text
 ****************************************************************************/
function insertLink( userId, userColor, text ){
	if(verifyLink($('#link').val())){
		var anchorKlb = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer').attr('klb');
		var cursorKlb = $doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb');
		//if we have a selection
		if($doc('div.selAnchor#' + userId).length){
			console.log($('#linktext').val(), text);
			//if its not the same paragraph or the link text have change delete selection
			if(anchorKlb != cursorKlb || $('#linktext').val() != text){
				console.log('if',$doc('div.cursor#' + userId)[0]);
				selectionDelete(userId, userColor);
				var value = $('#linktext').val().length ? $('#linktext').val() : simplifyLink($('#link').val());
				$doc('div.cursor#' + userId).before('<a id="' + klbGenerator() + '" href="' + $('#link').val() + '">' + value + '</a>');
			}else{//else wrap around selection
				console.log('else');
				removeLinkInSel( userId );
				if($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)){
					var typeStart = 'selAnchor';
					var typeEnd = 'cursor';
				}else{
					var typeStart = 'cursor';
					var typeEnd = 'selAnchor';
				}
				var parentStart = $doc('div.' + typeStart + '#' + userId).parent();
				var parentEnd = $doc('div.' + typeEnd + '#' + userId).parent();
				if(parentStart[0] == parentEnd[0]){
					$($doc('div.' + typeStart + '#' + userId)[0].nextSibling).wrap('<a id="' + klbGenerator() + '" href="' + $('#link').val() + '">');
				}else{
					var tag = $doc('div.' + typeStart + '#' + userId)[0].nextSibling;
					if( !tag ){
						tag = parentStart[0].childNodes[0];
					}
					$(tag).wrap('<a href="' + $('#link').val() + '">');
					$($doc('div.' + typeEnd + '#' + userId)[0].previousSibling).wrap('<a id="' + klbGenerator() + '" href="' + $('#link').val() + '">');
					var tag = parentStart[0].nextSibling;
					while(tag != parentEnd[0]){
						$(tag.childNodes[0]).wrap('<a id="' + klbGenerator() + '" href="' + $('#link').val() + '">');
						tag = tag.nextSibling;
					}
				}
			}
		}else{
			var value = $('#linktext').val().length ? $('#linktext').val() : simplifyLink($('#link').val());
			$doc('div.cursor#' + userId).before('<a id="' + klbGenerator() + '" href="' + $('#link').val() + '">' + value + '</a>');
		}
	}
	//redisabled the edit, clear the link text and enable the add
	$('#link,#linktext').val('');
	$('#linkInsert').unbind('click');
	$('#link,#linktext,#linkInsert').attr('disabled', 'disabled');
	$('#linkAdd').removeAttr('disabled');
	$('iframe#r_engine')[0].contentWindow.focus();
}

/****************************************************************************
 * Title: removeLinkInSel
 * @param {string} userId: the Id of the user
 * @returns {undefined}
 * Description: remove all the links in the selection
 ****************************************************************************/
function removeLinkInSel( userId ){
	if($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)){
		var typeStart = 'selAnchor';
		var typeEnd = 'cursor';
	}else{
		var typeStart = 'cursor';
		var typeEnd = 'selAnchor';
	}
	var parentStart = $doc('div.' + typeStart + '#' + userId).parent();
	var parentEnd = $doc('div.' + typeEnd + '#' + userId).parent();
	//if selection in the same span
	if(parentStart[0] == parentEnd[0]){
		var tag = $doc('div.' + typeStart + '#' + userId)[0].nextSibling;
		while( !$(tag).is('div.' + typeEnd + '#' + userId) ){//delete a in the span
			if(tag.nodeName == 'A'){
				tag.outerHTML = tag.innerHTML;
			}
			tag = tag.nextSibling;
		}
	}else{
		var tag = $doc('div.' + typeStart + '#' + userId)[0].nextSibling;
		while(tag){ //delete a in the start tag
			if(tag.nodeName == 'A'){
				tag.outerHTML = tag.innerHTML;
			}
			tag = tag.nextSibling;
		}

		tag = parentEnd[0].childNodes[0];//delete a tags in the end span
		while( !$(tag).is('div.' + typeEnd + '#' + userId) ){
			if(tag.nodeName == 'A'){
				tag.outerHTML = tag.innerHTML;
			}
			tag = tag.nextSibling;
		}

		tag = parentStart[0].nextSibling;//delete the in the middle spans
		while(tag != parentEnd[0]){
			$(tag).children('a').each(function(){
				this[0].outerHTML = this.html();
			});
			tag = tag.nextSibling;
		}
	}
}

/****************************************************************************
 * Title: simplifyLink
 * @param {string} link: the link to simplyfy
 * @returns {undefined}
 * Description: take a link and remove the http and all things after the domain
 ****************************************************************************/
function simplifyLink( link ){
	return link.replace(/^(ht|f)tps?:\/\//,'').replace(/\/.*/,'');
}

/****************************************************************************
 * Title: removeLink
 * @param {string} id: the Id of the link
 * @returns {undefined}
 * Description: remove a specific link by is id
 ****************************************************************************/
function removeLink( id ){
	$('a#' + id)[0].outerHTML = $('a#' + id).html();
}