var eventCheck;
/****************************************************************************/
/* Title: initSelectionController
/* Arguments:	
/* Return value: none
/* Description: initialize the selection controller
/****************************************************************************/
function initSelectionController( userId, socket ){
	
        
	$('iframe#r_engine').contents().bind('selectionchange',function (e){
		onSelectionChange( userId, socket, e );
	});
	
        
	$('iframe#r_engine').contents().bind('mousedown',function (e){		
		$doc('div.selAnchor#'+userId).remove(); 		
	});
	
	$('iframe#r_engine').contents().bind('mouseup',function (e){ 
	});	
	
	$('iframe#r_engine').contents().on('drag', function(e){
		var sel=$('iframe#r_engine').contents()[0].getSelection();
		sel.removeAllRanges();
		$doc('div.cursor#'+userId).remove();
		//console.log('DRAG')
		
		e.preventDefault(true)
		
	})
	
	$('iframe#r_engine').contents().on('drop', function(e){
		var sel=$('iframe#r_engine').contents()[0].getSelection();
		sel.removeAllRanges();
		
		e.preventDefault(true)
		
	})
	
	
}

/****************************************************************************/
/* Title: handleDeniedParagraph
/* Arguments:	userId: the id
/*				backgroundColor: the color of the id 
/* Return value: none
/* Description: if the paragraph can't be locked, remove the beforehand
/*				selection since if should be locked by another user. 
/****************************************************************************/
function handleDeniedParagraph( userId, backgroundColor ){
	
	$doc('div.cursor#'+userId).remove();
	$doc('div.selAnchor#'+userId).remove();

	var previousLock = $doc('div.page').children().filter( function() { return ( $(this).hasClass('background_'+backgroundColor) );});
	previousLock.removeClass('locked');
	previousLock.removeClass('background_'+backgroundColor);
}

/****************************************************************************/
/* Title: onSelectionChange
/* Arguments:	userId:
/*				socket:
/*				e: the event
/* Return value: none
/* Description: manage when there is a selection event.
/****************************************************************************/
function onSelectionChange( userId, socket, e ){
    var sel=$('iframe#r_engine').contents()[0].getSelection();	
    if( !sel.focusNode ){
            return;
    }
    //console.log("I AM THE SELECTION CHANGE : ", sel.focusOffset, sel.anchorOffset, sel.isCollapsed, $doc('div.selAnchor#'+userId).length );

    if( manageSelectionChange( sel, userId, "kolab", 'undo' ) ){
			$('#link,#linktext').val('');
			$('#linkInsert').unbind('click');
			$('#link,#linktext,#linkInsert').attr('disabled', 'disabled');
            //console.log('SELECTIONCHANGED');
            
            var cursorPos = evaluateCursorPosInText( userId, 'cursor' );
            if( $doc('div.selAnchor#'+userId ).length ){
                    var anchorPos = evaluateCursorPosInText( userId, 'selAnchor' );
                    sendPositionChangeEventToServer( cursorPos, $doc('div.cursor#'+userId).parents('p.paragraphContainer').attr('klb'), anchorPos, $doc('div.selAnchor#'+userId).parents('p.paragraphContainer').attr('klb'), userId, socket );
            }else{
                    sendPositionChangeEventToServer( cursorPos, $doc('div.cursor#'+userId).parents('p.paragraphContainer').attr('klb'), null, null, userId, socket );
            }

            checkToolbarState( userId );
            Cursor.setCursor( userId, "#FF0063" );
    }


}

/****************************************************************************/
/* Title: manageSelectionChange
/* Arguments:	sel: the selection
/*				userId:
/*				userColor:
/*				stackChanges: argument for undo/redo
/* Return value: none
/* Description: manage the selection
/****************************************************************************/
function manageSelectionChange( sel, userId, userColor, stackChanges ){
	if( !sel.isCollapsed ){
		
		var parentNode = $doc('div.cursor#'+userId ).parent();
		
		if( !sel.custom ){
			// If the selection didn't really changed
			if( sel.focusNode.length == sel.focusOffset ){
				if( $(previousNodeSearch( $doc('div.cursor#'+userId )[0] )).is( sel.focusNode ) ){
					return false;
				}
			}else if( sel.focusOffset == 0 ){
				if( $(nextNodeSearch( $doc('div.cursor#'+userId )[0] )).is( sel.focusNode ) ){
					return false;
				}
			}
		}
		
		//console.log('SELECTION CURSOR : ', sel.focusNode, sel.focusOffset );
		//console.log('SELECTION ANCHOR : ', sel.anchorNode, sel.anchorOffset );
		
		var savedFocusNode = sel.focusNode;
		var savedFocusOffset = sel.focusOffset;
		var tempFocusNode = null;
		
		var focusNodeKlb = $(sel.focusNode).parents('p.paragraphContainer').attr('klb');
		var baseNodeKlb = $(sel.baseNode).parents('p.paragraphContainer').attr('klb');		
		var lockedAnchor = verifySingleLockedParagraph( baseNodeKlb, userId, userColor );
		
		
		// Verify if the paragraph is locked
		if( baseNodeKlb == focusNodeKlb && lockedAnchor ){
			if( !sel.custom ){
				sel.removeAllRanges();
			}			
			return false;
		}	
		
		// The anchor is not placed
		if( !$doc('div.selAnchor#'+userId).length ){			
			// Place the anchor before or after a locked paragraph
			if( !lockedAnchor ){
				var parentAnchorNode = $doc('div.selAnchor#'+userId ).parents('span[style]');				
				tempFocusNode = placeSelectionNode( sel.anchorNode, sel.anchorOffset, 'selAnchor', userId );
				if( tempFocusNode ){
					savedFocusNode = tempFocusNode;
				}
				
				if( parentAnchorNode.length ){
					mergeAllNode( $.makeArray( $(parentAnchorNode)[0].childNodes ) );
				}
			}else{
				return false;				
			}
		}
		
		
		var upDown = $($doc('p.paragraphContainer[klb="'+baseNodeKlb+'"],p.paragraphContainer[klb="'+focusNodeKlb+'"]')[0]).is( $doc('p.paragraphContainer[klb="'+baseNodeKlb+'"]' ) );
		var lockedParagraph = searchLockedParagraph( $doc('p.paragraphContainer[klb="'+baseNodeKlb+'"]'), $doc('p.paragraphContainer[klb="'+focusNodeKlb+'"]'), upDown, userColor );
		
		
		if( lockedParagraph ){
						
			var thisParagraph = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
			
			if( upDown ){
				$(thisParagraph).children(':last').append($doc('div.cursor#'+userId));
			}else{
				$(thisParagraph).children(':first').prepend($doc('div.cursor#'+userId));
			}
			
		}else{			
			placeSelectionNode( savedFocusNode, savedFocusOffset, 'cursor', userId );		
		}
		
		if( parentNode.length ){
			mergeAllNode( $.makeArray( $(parentNode)[0].childNodes ) );
		}
		
		setParagraphLock( userId, userColor );	
		
		
	}else{
		
		if( $doc('div.selAnchor#'+userId).length ){
			return false;
		}
		
		// Verify if the paragraph is locked
		if( verifySingleLockedParagraph( $(sel.focusNode).parents('p.paragraphContainer').attr('klb'), userId, userColor ) ){
			if( !sel.custom ){
				sel.removeAllRanges();
			}
			return false;
		}
		
		// Verify if clicked where the cursor is actually
		if( $doc('div.cursor#'+userId ).length ){
			if( sel.focusNode.length == sel.focusOffset ){
				if( $(previousNodeSearch( $doc('div.cursor#'+userId )[0] )).is( sel.focusNode ) ){
					return false;
				}
			}else if( sel.focusOffset == 0 ){
				if( $(nextNodeSearch( $doc('div.cursor#'+userId )[0] )).is( sel.focusNode ) ){
					return false;
				}
			}
		}
		
		
		var parentNode = $doc('div.cursor#'+userId ).parent();
		placeSelectionNode( sel.focusNode, sel.focusOffset, 'cursor', userId );
		if( parentNode.length ){
			mergeAllNode( $.makeArray( $(parentNode)[0].childNodes ) );
		}
		
		setParagraphLock( userId, userColor );
	}
	return true;
}

/****************************************************************************/
/* Title: manageClick
/* Arguments:	none
/*
/* Return value: none
/* Description: manage the moving of the cursor by click and the merge of the
/* previous text nodes
/****************************************************************************/
function placeSelectionNode( selNode, selOffSet, nodeType, userId ){
	
	var tempNextNode = null;
	
	if( selNode.nodeType == 3  ){//if we are in a text node
		
		$doc('div.'+nodeType+'#'+userId).remove();
		
		// Always place it at the end of a node, never at the beginning
		if( selOffSet == selNode.textContent.length ){	
			$(selNode).after('<div class="'+nodeType+'" id="'+userId+'"></div>');
									
		}else if( selOffSet == 0 ){						
				var newFocusNode = previousNodeSearch( selNode );
				
				if( newFocusNode == 'firstLine' ){
					$(selNode).before('<div class="'+nodeType+'" id="'+userId+'"></div>');
				}else{					
					$(newFocusNode).after('<div class="'+nodeType+'" id="'+userId+'"></div>');					
				}		
		}else{
			var split=selNode.splitText( selOffSet );
			$(split).before('<div class="'+nodeType+'" id="'+userId+'"></div>');
			
			if( $doc('div.cursor#'+userId)[0] ){
				tempNextNode = $doc('div.cursor#'+userId)[0].nextSibling;
			}			
		}
		
	}else if( selNode.nodeType == 1 ){
		
		// if we click on a division
		if( !$(selNode).is('div.cursor') && !$(selNode).is('div.selAnchor')){
			
			$doc('div.'+nodeType+'#'+userId).remove();
			if( $(selNode).is('p.paragraphContainer') ){
				$(selNode).children(':first').prepend('<div class="'+nodeType+'" id="'+userId+'"></div>');
			}else if($(selNode).is('span[author]')){
				$(selNode).prepend('<div class="'+nodeType+'" id="'+userId+'"></div>');
			}	
		}
	}
	
	return tempNextNode;
}

/****************************************************************************/
/* Title: setSelectionBox
/* Arguments:	userId:
/*				userColor:
/* Return value: none
/* Description: manage the selectionBox
/****************************************************************************/
function setSelectionBox( userId, userColor ){
	
    var constSelectionOpacity = 0.5;
	$doc('div.selectionEndBox#'+userId).remove();
	$doc('div.selectionStartBox#'+userId).remove();
	$doc('div.selectionBox#'+userId).remove();
	
	if( !$doc('div.selAnchor#'+userId ).length ){
		return;
	}
	
	// Select if the selection is from updown or downup
	if ($($doc('div.selAnchor#'+userId+',div.cursor#'+userId)[0]).is('div.selAnchor#'+userId)) {

		var nodeStart = $doc('div.selAnchor#'+userId)[0];
		var nodeEnd = $doc('div.cursor#'+userId)[0];
	} else {

		var nodeStart = $doc('div.cursor#'+userId)[0];
		var nodeEnd = $doc('div.selAnchor#'+userId)[0];
	}
	
	var cursorP = $doc('div.cursor#'+userId).parents('p');
	var anchorP = $doc('div.selAnchor#'+userId).parents('p');
	
	if( cursorP.attr('klb') == anchorP.attr('klb') && cursorP.parent().is(anchorP.parent()) ){
		if( $doc('div.cursor#'+userId).position().top == $doc('div.selAnchor#'+userId).position().top ){
			
			var width = $(nodeEnd).position().left - $(nodeStart).position().left;
			if( !$(nodeStart).children().length ){
				$(nodeStart).append('<div class="selectionStartBox" id="'+userId+'" ></div>');
			}
			
			$(nodeStart).children('div.selectionStartBox#'+userId).width( width );
			$(nodeStart).children('div.selectionStartBox#'+userId).height( $(nodeStart).height() );
			$(nodeStart).children('div.selectionStartBox#'+userId).css( "background-color" , userColor );
                        $(nodeStart).children('div.selectionStartBox#'+userId).css( "top" , $(nodeStart).position().top );
			$(nodeStart).children('div.selectionStartBox#'+userId).css( "opacity" , constSelectionOpacity );				
						
			return;
		}else{
			
			var widthStart = 650 - $(nodeStart).position().left;
			var widthEnd = $(nodeEnd).position().left;			
			var nodeStartHeight = parseInt( $(nodeStart).height() );
			var nodeEndHeight = parseInt( $(nodeEnd).height() );
			
			
			if( !$(nodeStart).children('div.selectionStartBox').length ){
				$(nodeStart).append('<div class="selectionStartBox" id="'+userId+'" ></div>');
			}
			
			if( !$(nodeEnd).children('div.selectionEndBox').length ){
				$(nodeEnd).append('<div class="selectionEndBox" id="'+userId+'" ></div>');
			}
			
			$(nodeStart).children('div.selectionStartBox#'+userId).width( widthStart );
			$(nodeStart).children('div.selectionStartBox#'+userId).height( nodeStartHeight );
			$(nodeStart).children('div.selectionStartBox#'+userId).css( "background-color" , userColor );
                        $(nodeStart).children('div.selectionStartBox#'+userId).css( "top" , $(nodeStart).position().top );
			$(nodeStart).children('div.selectionStartBox#'+userId).css( "opacity" , constSelectionOpacity );
			
			
			$(nodeEnd).children('div.selectionEndBox#'+userId).width( widthEnd + 1 );
			$(nodeEnd).children('div.selectionEndBox#'+userId).height( nodeEndHeight );
			$(nodeEnd).children('div.selectionEndBox#'+userId).css( "background-color" , userColor );
                        $(nodeEnd).children('div.selectionEndBox#'+userId).css( "top" , $(nodeEnd).position().top );
			$(nodeEnd).children('div.selectionEndBox#'+userId).css( "opacity" , constSelectionOpacity );
			$(nodeEnd).children().css( "left" , 0 );
			
			
			if( nodeStartHeight + $(nodeStart).position().top < $(nodeEnd).position().top ){
								
				if( !$(nodeStart).children('div.selectionBox').length ){
					$(nodeStart).append('<div class="selectionBox" id="'+userId+'" ></div>');			
				}
				
				var boxHeight = $(nodeEnd).position().top - ( nodeStartHeight + $(nodeStart).position().top );

				$(nodeStart).children('div.selectionBox#'+userId).width( 650 );
				$(nodeStart).children('div.selectionBox#'+userId).height( boxHeight );
				$(nodeStart).children('div.selectionBox#'+userId).css( "background-color" , userColor );
				$(nodeStart).children('div.selectionBox#'+userId).css( "opacity" , constSelectionOpacity );
				$(nodeStart).children('div.selectionBox#'+userId).css( "top" , nodeStartHeight + $(nodeStart).position().top );
				$(nodeStart).children('div.selectionBox#'+userId).css( "left" , 0 );
			}else{
				$doc('div.selectionBox').remove();
			}
			
		}
	}else{
		
		var widthStart = 650 - $(nodeStart).position().left;
		var widthEnd = $(nodeEnd).position().left;			
		var nodeStartHeight = parseInt( $(nodeStart).height() );
		var nodeEndHeight = parseInt( $(nodeEnd).height() );


		if( !$(nodeStart).children('div.selectionStartBox').length ){
			$(nodeStart).append('<div class="selectionStartBox" id="'+userId+'" ></div>');
		}

		if( !$(nodeEnd).children('div.selectionEndBox').length ){
			$(nodeEnd).append('<div class="selectionEndBox" id="'+userId+'" ></div>');
		}

		$(nodeStart).children('div.selectionStartBox#'+userId).width( widthStart );
		$(nodeStart).children('div.selectionStartBox#'+userId).height( nodeStartHeight );
		$(nodeStart).children('div.selectionStartBox#'+userId).css( "background-color" , userColor );
                $(nodeStart).children('div.selectionStartBox#'+userId).css( "top" , $(nodeStart).position().top );
		$(nodeStart).children('div.selectionStartBox#'+userId).css( "opacity" , constSelectionOpacity );


		$(nodeEnd).children('div.selectionEndBox#'+userId).width( widthEnd + 1 );
		$(nodeEnd).children('div.selectionEndBox#'+userId).height( nodeEndHeight );
		$(nodeEnd).children('div.selectionEndBox#'+userId).css( "background-color" , userColor );
                $(nodeEnd).children('div.selectionEndBox#'+userId).css( "top" , $(nodeEnd).position().top );
		$(nodeEnd).children('div.selectionEndBox#'+userId).css( "opacity" , constSelectionOpacity );
		$(nodeEnd).children().css( "left" , 0 );
		
		
		createParagraphBox( userId, nodeStart, nodeEnd, nodeStartHeight, nodeEndHeight, userColor );
		

	}
	
}

/****************************************************************************/
/* Title: createParagraphBox
/* Arguments:	userId:
/*				userColor:
/* Return value: none
/* Description: manage the selectionBox when cursor/anchor are not in the same klb
/****************************************************************************/
function createParagraphBox( userId, nodeStart, nodeEnd, nodeStartHeight, nodeEndHeight, userColor ){
	
	
	var thisParagraph = $(nodeStart).parents('p.paragraphContainer');
	var nodeStartParagraph = $(nodeStart).parents('p.paragraphContainer'); 
	var nodeEndParagraph = $(nodeEnd).parents('p.paragraphContainer');
	
	if( !$(nodeStart).children('div.selectionBox').length ){
		$(nodeStart).append('<div class="selectionBox" id="'+userId+'" ></div>');			
	}
	
	$(nodeStart).children('div.selectionBox#'+userId).width( 650 );
	$(nodeStart).children('div.selectionBox#'+userId).css( "background-color" , userColor );
	$(nodeStart).children('div.selectionBox#'+userId).css( "opacity" , 0.5 );
	$(nodeStart).children('div.selectionBox#'+userId).css( "left" , 0 );
	
	var boxHeight = 0;
	
	while( thisParagraph.length && !$(thisParagraph).is( $(nodeEndParagraph) ) ){
		
		if( $(thisParagraph).is( $(nodeStartParagraph) ) ){
			boxHeight += $(thisParagraph).height() - ( $(nodeStart).position().top + nodeStartHeight ) + parseInt( $(thisParagraph).css('margin-bottom') );
		}else{
			boxHeight += $(thisParagraph).height() + parseInt( $(thisParagraph).css('margin-bottom') );
		}
			
		
		if( !thisParagraph[0].nextSibling ){
			var nextSibling = $($(thisParagraph).parents('div.page')[0].nextSibling);
			
			if( nextSibling.length && nextSibling.hasClass('pageBreak') ){
				nextSibling = $(nextSibling[0].nextSibling)
			}
			
			if( nextSibling.length ){
				
				var heightModif = thisParagraph.parents('div.page').position().top + thisParagraph.parents('div.page').height() - (thisParagraph.position().top + thisParagraph.height());
				
				thisParagraph = nextSibling.children(':first');
				
				boxHeight += heightModif + 30;
			}
		}else{
			thisParagraph = $(thisParagraph[0].nextSibling);
		}
	}
	
	
	boxHeight += $(nodeEnd).position().top;
	
	
	$(nodeStart).children('div.selectionBox#'+userId).height( boxHeight );
	$(nodeStart).children('div.selectionBox#'+userId).css( "top" , $(nodeStart).position().top + nodeStartHeight );
	
}