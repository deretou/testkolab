
var disableWriting = false;

/****************************************************************************/
/* Title: placeCursorInOrder
/* Arguments:none
/* Return value: none
/* Description: place the currentCursor in order of users. (currently obsolete)
/****************************************************************************/
function placeCursorInOrder( startingLeft, thisNode, userId, cursorType ){
	
	if( startingLeft ){
		var tmpNode = nextNodeSearch( thisNode );
		if( tmpNode != 'lastLine' ){
			thisNode = tmpNode;
		}
	}

	// There is no more cursor than 8 times 2 for the cursor and anchor, safety is 18
	//var count = KolabInReal.authorOrder.length * 2 + 2;
	var cursorIsPlaced = false;
	var previousSibling = $(thisNode)[0].previousSibling;
	
	var userIdIndex = KolabInReal.authorOrder.indexOf( userId );
	
	while( !cursorIsPlaced ){
		
		// If the currentNode is the first
		if( !previousSibling ){
			if( $(thisNode).is('div.cursor') || $(thisNode).is('div.selAnchor') ){
				var cursorId = $(thisNode).attr('id');
				if( KolabInReal.authorOrder.indexOf( cursorId ) < userIdIndex ){
					$(thisNode).after('<div class="'+cursorType+'" id="'+userId+'"></div>');
				}else{
					$(thisNode).before('<div class="'+cursorType+'" id="'+userId+'"></div>');
				}
			}else{
				$(thisNode).before('<div class="'+cursorType+'" id="'+userId+'"></div>');
			}
			cursorIsPlaced = true;
			break;			
		
		// If its a cursor, check the position
		}else if( $(previousSibling).is('div.cursor') || $(previousSibling).is('div.selAnchor') ){
			var cursorId = $(previousSibling).attr('id');
			// If the position is bigger, place it after
			if( KolabInReal.authorOrder.indexOf( cursorId ) < userIdIndex ){
				$(previousSibling).after('<div class="'+cursorType+'" id="'+userId+'"></div>');
				cursorIsPlaced = true;
				break;
			}else{
				thisNode = previousSibling;
				previousSibling = $(thisNode)[0].previousSibling;
			}			
		// The current node is the first cursor, should place it before
		}else if( previousSibling.nodeType == 3 ){
			$(thisNode).before('<div class="'+cursorType+'" id="'+userId+'"></div>');
			cursorIsPlaced = true;
			break;
		}		
	}
}

/****************************************************************************/
/* Title: evaluateCursorPosInText
/* Arguments:none
/* Return value: none
/* Description: what is the current position of the cursor/anchor in text
/****************************************************************************/
function evaluateCursorPosInText( userId, cursorType ){
	var cursorPos = 0;
	
	var paragraph = $doc('div.'+cursorType+'#'+userId).parents('p.paragraphContainer');
		
	var authors = $(paragraph).children('span[author]');
	// Run throught every author of the paragraph
	for( var i = 0; i < authors.length; i++ ){
		// If it's our current author parent
		if( $(authors[i]).is($doc('div.'+cursorType+'#'+userId).parents('span[author]')) ){
			
			var childNode = $(authors[i])[0].childNodes;
			for( var i = 0; i < childNode.length; i++ ){
				if( $(childNode[i]).is($doc('div.'+cursorType+'#'+userId) ) ){
					break;
				}else if( childNode[i].nodeType == 3 ){
					cursorPos += $(childNode[i]).text().length;
				}
			}
							
			break;
		// Add it's length to the position
		}else{
			cursorPos += $(authors[i]).text().length;
		}
	}

	var parentKlb = paragraph.attr('klb')

	if( $klb( parentKlb ).length > 1 ){
		$klb( parentKlb ).each( function(){ if( !$(this).is( paragraph )){ cursorPos += $(this).text().length }else{ return false;}} )
	}
	
	return cursorPos;
	
}

/****************************************************************************/
/* Title: addUserCursorManagement
/* Arguments:none
/* Return value: none
/* Description: add the cursor/anchor info in the head to allow the modification 
 *				of their height
/****************************************************************************/
function addUserCursorManagement( userId ){
	
	if( !$('iframe#r_engine').contents().children('html').children('head').children('style#cursorheight'+userId).length ){
		$('iframe#r_engine').contents().children('html').children('head').append('<style id="cursorheight'+userId+'"></style>');	
		$('iframe#r_engine').contents().children('html').children('head').append('<style id="anchorheight'+userId+'"></style>');
	}
}

/****************************************************************************/
/* Title: removeUserCursorManagement
/* Arguments:none
/* Return value: none
/* Description: remove the cursorManagement in the head
/****************************************************************************/
function removeUserCursorManagement( userId ){
	
	$('iframe#r_engine').contents().children('html').children('head').children('style#cursorheight'+userId).remove();	
	$('iframe#r_engine').contents().children('html').children('head').children('style#anchorheight'+userId).remove();	
}

/****************************************************************************/
/* Title: updateUserCursorManagement
/* Arguments:none
/* Return value: none
/* Description: update the cursor/anchor height in the head
/****************************************************************************/
function updateUserCursorManagement( userId, cursorType, cursorId, height, userColor ){
        var top = $doc('div.' + cursorType + '#'+userId).position().top;
	$('iframe#r_engine').contents().children('html').children('head').children('style#'+cursorId+userId).html('div.'+cursorType+'[id="'+userId+'"]:before{ background-color:'+userColor+'; height: '+height+'px; top: ' + top + '; } div.'+cursorType+'[id="'+userId+'"]{ height: '+height+'px; }');
        
}

/****************************************************************************/
/* Title: lineHeightAdjustment
/* Arguments:none
/* Return value: none
/* Description: value that allows to adjust the height of the cursor in function
 *				of the lineHeight
/****************************************************************************/
function lineHeightAdjustment( paragraph ){
	var lineHeight = $(paragraph).css('line-height');
	if( lineHeight == "normal" ){
		return 3;
	}else{
		lineHeight = parseInt( lineHeight );
		if( lineHeight == 24 ){
			return 5;
		}else if( lineHeight == 32 ){
			return 10;
		}else if( lineHeight == 40 ){
			return 15;
		}
	}
	
}

/****************************************************************************/
/* Title: cursorManagement
/* Arguments:none
/* Return value: none
/* Description: manage the cursorInfo and height
/****************************************************************************/
function cursorManagement( userId, userColor ){
	
	var fontSize = 0;

	var updateValue = lineHeightAdjustment( $doc('div.cursor#'+userId).parents('p.paragraphContainer') );
	
	//console.log('LINE-HEIGHT : ', $doc('div.cursor#'+userId).parents('p.paragraphContainer').css('line-height'))
	
	fontSize = verifyCursorHeight( userId, 'cursor' ) + updateValue;
	
	updateUserCursorManagement( userId, 'cursor', 'cursorheight', fontSize, userColor );
	
	if( $doc('div.selAnchor#'+userId).length ){
		var fontSize = 0;
		
		updateValue = lineHeightAdjustment( $doc('div.cursor#'+userId).parents('p.paragraphContainer') );
				
		fontSize = verifyCursorHeight( userId, 'selAnchor' ) + updateValue;
		
		updateUserCursorManagement( userId, 'selAnchor', 'anchorheight', fontSize, userColor );
	}
}

/****************************************************************************/
/* Title: verifyCursorHeight
/* Arguments:none
/* Return value: none
/* Description: retrieves the current cursor height in function of the whole
 *				"line" of text.
/****************************************************************************/
function verifyCursorHeight( userId, type ){
	 	
	var cursorParagraph = $doc('div.'+type+'#'+userId).parents('p.paragraphContainer');
	
	var height = 0;
	var cursorTop = $doc('div.'+type+'#'+userId).position().top;
	
	cursorParagraph.children().each( function(){
		
		if( $(this).position().top <= cursorTop && $(this).position().top + $(this).height() > cursorTop ){
			var thisHeight = parseInt( $(this).css('font-size') );
			if( thisHeight > height ){
				height = thisHeight;
			}
		}else{
			return height;
		}
	});
	
	return height;
	
}

var Cursor = (
		function() {
			/****************************************************************************/
			/* Title: showState
			/* Arguments:	none
			/*
			/* Return value: none
			/* Description: show the cursor state in the text
			/****************************************************************************/
			function showState() {
				$('span#klb').html(cursor.klbStart);
				$('span#pos').html(cursor.absoluteStart);
			}
			/****************************************************************************/
			/* Title: setCursor
			/* Arguments:	UpDown: boolean that control the cursor position save(always
			/*              true except for up and down arrows)
			/*
			/* Return value: none
			/* Description: do all the operation that are neaded on cursor move
			/* !!!!!----THIS FUNCTION MUST ALWAYS BE CALLED ON CURSOR MOVE----!!!!!
			/****************************************************************************/
			function setCursor( userId, userColor ) {
				cursorManagement( userId, userColor );
				setSelectionBox( userId, userColor );
			}			

			return {
				showState: showState,
				setCursor: setCursor
			};

		}
)();