/****************************************************************************/
/* Title: lockParagraph
/* Arguments:none
/* Return value: none
/* Description: lock the set paragraph
/****************************************************************************/
function lockParagraph( klb, userId, backgroundColor ){
	$doc('p[klb="'+klb+'"]').each( function(){ $(this).addClass('locked') });
	$doc('p[klb="'+klb+'"]').each( function(){ $(this).addClass('background_'+backgroundColor) });
}

/****************************************************************************/
/* Title: unlockParagraph
/* Arguments:none
/* Return value: none
/* Description: unlock the set paragraph
/****************************************************************************/
function unlockParagraph( klb, userId ){
	$doc('p[klb="'+klb+'"]').each( function(){ $(this).removeClass('locked') });
	var backgroundColor = $doc('p[klb="'+klb+'"]').attr('class').split(" ").reduce( function(f, e) { if( e.match(/^background/)){ return e } else{ return f } }, ""); 	
	$doc('p[klb="'+klb+'"]').removeClass(backgroundColor);
	$doc('p[klb="'+klb+'"]').each( function(){ $(this).removeClass(backgroundColor) });
	
}

/****************************************************************************/
/* Title: verifySingleLockedParagraph
/* Arguments:none
/* Return value: none
/* Description: verify if set paragraph is locked
/****************************************************************************/
function verifySingleLockedParagraph( klb, userId, userColor ){
	if( $doc('p[klb="'+klb+'"]').hasClass('locked') && !$doc('p[klb="'+klb+'"]').hasClass('background_'+userColor) ){
		return true;
	}else{
		return false;
	}
}

/****************************************************************************/
/* Title: searchLockedParagraph
/* Arguments:none
/* Return value: none
/* Description: search if in the currentSelection, another paragraph is locked
 *				by another user.
/****************************************************************************/
function searchLockedParagraph( klbStart, klbEnd, upDown, userColor ){
	
	var thisKlb = null;
	var lastKlb = null;
	if( upDown ){
		thisKlb = klbStart;
		lastKlb = klbEnd;
	}else{
		thisKlb = klbEnd;
		lastKlb = klbStart;
	}
		
	if( thisKlb.hasClass('locked') && !thisKlb.hasClass('background_'+userColor) ){
		return true;
	}else if( lastKlb.hasClass('locked') && !lastKlb.hasClass('background_'+userColor) ){
		return true;
	}else if( !$(thisKlb).is(lastKlb) ){
		var verifLocked = false;
		$(thisKlb).nextAll().each(function(){
			if( $(this).hasClass('locked') && !$(this).hasClass('background_'+userColor) ){
				verifLocked = true;
				return false;
			}
			
			if( $(this).is(lastKlb) ){
				return false;
			}
		});
		
		return verifLocked;
	}else{
		return false;
	}
}

/****************************************************************************/
/* Title: setParagraphLock
/* Arguments:none
/* Return value: none
/* Description: set the selected paragraph to be locked
/****************************************************************************/
function setParagraphLock( userId, backgroundColor ){

	var previousLock = $doc('div.page').children().filter( function() { return ( $(this).hasClass('background_'+backgroundColor) );});//$('div#lockSection').children().filter( function() { var match = 'rgb(255, 0, 99)'; return ( $(this).css('borderColor') == match );});
		
	previousLock.removeClass('locked');
	previousLock.removeClass('background_'+backgroundColor);
	
	
	if( !$doc('div.selAnchor#'+userId).length ){
		lockParagraph( $doc('div.cursor#'+userId).parents('p.paragraphContainer').attr('klb'), userId, backgroundColor );
		return;
	}
	
	
	// Select if the selection is from updown or downup
	if ($($doc('div.selAnchor#'+userId+',div.cursor#'+userId)[0]).is('div.selAnchor#'+userId)) {
		var nodeStart = $doc('div.selAnchor#'+userId).parents('p.paragraphContainer');
		var nodeEnd = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
	} else {
		var nodeStart = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
		var nodeEnd = $doc('div.selAnchor#'+userId).parents('p.paragraphContainer');
	}
	
	var thisNode = nodeStart;
		
	while( thisNode.length && thisNode.attr('klb') != nodeEnd.attr('klb') ){
		lockParagraph( thisNode.attr('klb'), userId, backgroundColor );	
		
		if( !$(thisNode[0].nextSibling).length && $(thisNode.parents('div.page')[0].nextSibling).length ){
			thisNode = $(thisNode.parents('div.page')[0].nextSibling).children(':first');
		}else{
			thisNode = $(thisNode[0].nextSibling);
		}		
	}
	
	lockParagraph( nodeEnd.attr('klb'), userId, backgroundColor );
	
}
