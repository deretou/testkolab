/****************************************************************************
 * Title: initImageManager
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @param {object} socket: the communication socket
 * @returns {undefined}
 * Description: init the click on the image buttons
 ****************************************************************************/
function initImageManager(userId, userColor, socket){
	$('#imgAdd').bind('click', function(){// on click disable add enable edit
		$('#imgl,#imgi,#imgInsert').removeAttr('disabled');
		$('#imgAdd').attr('disabled', 'disabled');
		$('#imgInsert').bind('click', function(){
			insertImage( userId, userColor );
		});
		$('#imgl').focus();
	});
}

/****************************************************************************
 * Title: initImageManager
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @returns {undefined}
 * Description: insert an image
 ****************************************************************************/
function insertImage( userId, userColor ){
	if( verifyLink($('#imgl').val()) ){
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
		var link = $('#imgl').val();
		paragraph.append('<img id="' + id + '" src="' + link + '"/>');
		paragraph.append('<div id="' + id + '" class="info" contenteditable="false">' + $('#imgi').val() + '</div>');
		var img = $doc('img#' + id);
		var info = $doc('div#' + id);
		var page=$doc();
		//preload the images
		$.preLoadImages(
			[
				link
			],function(){//on load end resize image if excess page size
			//console.log('preload_sucess');
			//console.log(img.width(),img.height());
				
				if(img.width()>page.width()){
				//console.log('if',img.width(),img.height());
					img.css({
						width:page.width(),
						height:(page.width()*img.height())/img.width()});
					info.css('width', page.width());
				}else{
					info.css('width', img.width());
				}
				if(img.height()>page.height()){
				//console.log('else',img.width(),img.height());
					img.css({
						width:(page.height()*img.width())/img.height(),
						height:page.height()});
				}
			//console.log(img.width(),img.height());
			}
		);
		
		//disable edit enable add
		$('#imgl,#imgi').val('');
		$('#imgInsert').unbind('click');
		$('#imgl,#imgi,#imgInsert').attr('disabled', 'disabled');
		$('#imgAdd').removeAttr('disabled');
		$('iframe#r_engine')[0].contentWindow.focus();
	}
}