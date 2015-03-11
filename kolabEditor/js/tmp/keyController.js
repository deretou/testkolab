/****************************************************************************/
/* Title: initKeyController
/* Arguments:	
/* Return value: none
/* Description: initialize the key controller
/****************************************************************************/
function initKeyController( userId, socket ){
	$doc().bind('keypress',function(e){manageKeyPress(e, userId, socket );});
	$doc().bind('keydown',function(e){manageKeyDown(e, userId, socket );});
}

/****************************************************************************/
/* Title: manageKeyPress
/* Arguments:	e: the keypress event use for the keycode 
/*
/* Return value: none
/* Description: If enter is pressed call the manage enter otherwise manage all 
/* the imput of the documents.
/****************************************************************************/
function manageKeyPress(e, userId, socket ){
	
	if( !$doc('div.cursor#'+userId).length || disableWriting ){
		return;
	}
	
	e.preventDefault(true);
	
	//console.log('evet : ', e)
	
	var sel=$('iframe#r_engine').contents()[0].getSelection();
	sel.removeAllRanges();
	
		
	//enter key
	if(e.which==13){
		
		if( e.shiftKey ){
			return;
		}
		
		var generatedKlb = manageEnter( userId, null, 'kolab', 'undo', true );	
		sendKeyEventToServer( 'spec', 'ENT', generatedKlb, userId, socket );
		Cursor.setCursor( userId, "#FF0063" );
	}else{
		var stringCharacter = String.fromCharCode(e.which);
		manageCharacterAdd( userId, stringCharacter, userId, mapStyling, 'kolab', 'undo' );
		
		
		sendKeyEventToServer( 'add', stringCharacter, stylesZip( mapStyling.style, mapStyling.value ), userId, socket );
		
		if( mapStyling.style.length ){
						
			checkToolbarState( userId );			
			
			mapStyling.style = [];
			mapStyling.value = [];
		}
		
		Cursor.setCursor( userId, "#FF0063" ); 
	}	
}

/****************************************************************************/
/* Title: manageSpecialCharacterAdd
/* Arguments:	whichChar: the keyCode of character press                     */
/*              userId: which userId used this function                       */
/*              stylingMap: the map of style linked to this change
/*
/* Return value: none
/* Description: Add a character after the cursor.
/****************************************************************************/
function manageSpecialCharacterAdd( myId, whichChar, authorId, stylingMap, userColor, stackChanges ){
	
        
	// If the current author&style match
	var thisAuthor = $doc('div.cursor#'+myId).parent();
	if( verifyAuthorStyle( thisAuthor, authorId, stylingMap) ){
		// Apply the current character to the text	
		var node=$doc('div.cursor#'+myId)[0].nextSibling;
		// At the end of the node or If is not a nodeText
		if(!node || node.nodeType!=3 ){
			$doc('div.cursor#'+myId).after(whichChar);
		}else{
			node.prependData(whichChar); 
		}	
	}else{
		var nextAuthor;
		// See if the cursor have text after it
		if( $($doc('div.cursor#'+myId))[0].nextSibling && $($doc('div.cursor#'+myId))[0].nextSibling.nodeType == 3 ){
			thisAuthor.after('<span author="'+thisAuthor.attr('author')+'" style="'+thisAuthor.attr('style')+'"></span>');
			nextAuthor = $(thisAuthor[0].nextSibling);
			
			while( $doc('div.cursor#'+myId)[0].nextSibling ){
				nextAuthor.append( $doc('div.cursor#'+myId)[0].nextSibling );
			}
			
			thisAuthor.after('<span author="'+authorId+'"></span>');
			nextAuthor = $(thisAuthor[0].nextSibling);
			// Apply the right style
			for(i=0; i< stylingMap.style.length; i++){
				nextAuthor.css(stylingMap.style[i], stylingMap.value[i]);
			}			
		}else{
			nextAuthor = $(thisAuthor[0].nextSibling);
			// At the end of authorStyle and next authorStyle match
			if( !verifyAuthorStyle( nextAuthor, authorId, stylingMap) ){
				thisAuthor.after('<span author="'+authorId+'"></span>');
				nextAuthor = $(thisAuthor[0].nextSibling);
				// Apply the right style
				for(i=0; i< stylingMap.style.length; i++){
					nextAuthor.css(stylingMap.style[i], stylingMap.value[i]);
				}
			}			
		}
		
		nextAuthor.prepend(whichChar);
	}
	
	var firstChild = thisAuthor[0].childNodes[0];
			
	if( $(firstChild).text().match(/\u200b/) ){
		$(firstChild).remove();
		if( !thisAuthor.text().length ){
			nextAuthor.prepend($doc('div.cursor#'+myId));
			thisAuthor.remove();
		}
	}

	pageRender.pageOverflow( $doc('div.cursor#'+myId).parents('div.page') );
	setParagraphLock( myId, userColor );
	if(stackChanges == 'undo'){
		Undo.addElement('break');
		Undo.addElement({'action': 'spec', 'content': 'BAK', 'user': myId, 'extra': ''});
		Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + myId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( myId, 'cursor' )), 'user': myId, 'extra': ''});
	}else if(stackChanges == 'redo'){
		Redo.addElement('break');
		Redo.addElement({'action': 'spec', 'content': 'BAK', 'user': myId, 'extra': ''});
		Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + myId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( myId, 'cursor' )), 'user': myId, 'extra': ''});
	}
}

/******************************************************************************/
/* Title: manageCharacterAdd                                                  */
/* Arguments:	whichChar: the keyCode of character press                     */
/*              userId: which userId used this function                       */
/*              stylingMap: the map of style linked to this change            */
/*                                                                            */
/* Return value: none                                                         */
/* Description: Add a character before the cursor                             */
/******************************************************************************/
function manageCharacterAdd( myId, whichChar, authorId, stylingMap, userColor, stackChanges ){
	var selDelete = false;
	// There is a selection
	if( $doc('div.selAnchor#'+myId).length ){
		selectionDelete( myId, userColor, stackChanges );
		selDelete = true;
	}
	//console.log(stackChanges);
	
	var firstChild = $doc('div.cursor#'+myId).parents('p.paragraphContainer').children('span[author]:first')[0].childNodes[0];
	var spanAttr = {order:'', orderContent:''};
	if( $(firstChild).text().match(/\u200b/) ){
		spanAttr.order = $(firstChild).parent().attr('order');
		spanAttr.orderContent = $(firstChild).parent().attr('orderContent');
		$(firstChild).parent().removeAttr('order');
		$(firstChild).parent().removeAttr('orderContent');
		$(firstChild).remove();
	}else if($doc('div.cursor#' + myId).parent()[0] == $(firstChild).parent()[0]){
		spanAttr.order = $doc('div.cursor#' + myId).parent().attr('order');
		spanAttr.orderContent = $doc('div.cursor#' + myId).parent().attr('orderContent');
		$doc('div.cursor#' + myId).parent().removeAttr('order');
		$doc('div.cursor#' + myId).parent().removeAttr('orderContent');
	}
	
	// Verify if the space at the beginning of a linked paragraph should go at the end of the previous
	if( whichChar == ' ' ){
		if( !$doc('div.cursor#'+myId)[0].previousSibling && !$doc('div.cursor#'+myId).parent()[0].previousSibling ){
			if( !$doc('div.cursor#'+myId).parents('p')[0].previousSibling && $doc('div.cursor#'+myId).parents('div.page')[0].previousSibling ){
				if( $doc('div.cursor#'+myId).parents('p').attr('klb') == $($doc('div.cursor#'+myId).parents('div.page')[0].previousSibling).children(':last').attr('klb') ){
					$($doc('div.cursor#'+myId).parents('div.page')[0].previousSibling).children(':last').children(':last').append( $doc('div.cursor#'+myId) );
				}
			}
		}
	}
	
	
	var firstItem = true;
	var lastItem = true;
	var authorStyleMatch = true;
	var currentAuthor = $doc('div.cursor#'+myId).parent('span[author]');
	var thisStyle = currentAuthor.attr('style')
	var thisAuthor = currentAuthor.attr('author');
		
	// See if the cursor dont have text in front of it
	if( $($doc('div.cursor#'+myId))[0].previousSibling && $($doc('div.cursor#'+myId))[0].previousSibling.nodeType == 3 ){
			firstItem = false;
	}
	
	// See if the cursor dont have text after it
	if( $($doc('div.cursor#'+myId))[0].nextSibling && $($doc('div.cursor#'+myId))[0].nextSibling.nodeType == 3 ){
			lastItem = false;
	}
	
	var doNothing = false;
	
	// Verify if there is nothing to do since the state didn't changed
	if( thisAuthor == authorId && !stylingMap.style.length ){
		doNothing = true;
	}
	
	if( firstItem && !doNothing ){

		// Verification
		var previousAuthorStyle = $(currentAuthor[0].previousSibling);
		if( previousAuthorStyle.length && previousAuthorStyle.attr('author') == authorId ){
			if( stylingMap.style.length ){
				for( var i = 0; i < stylingMap.style.length; i++ ){
					if( previousAuthorStyle.css( stylingMap.style[i] ) != stylingMap.value[i] ){
						authorStyleMatch = false;
						break;
					}
				}
			}else if( previousAuthorStyle.attr('style') != currentAuthor.attr('style') ){
				authorStyleMatch = false;
			}	
		}else{
			authorStyleMatch = false;
		}

		// Same new style and author
		if( !authorStyleMatch ){
			if( !currentAuthor[0].previousSibling ){
				currentAuthor.before('<span author="'+authorId+'" style="'+thisStyle+'"></span>');
				previousAuthorStyle = $(currentAuthor[0].previousSibling);
			}else{
				currentAuthor.before('<span author="'+authorId+'" style="'+previousAuthorStyle.attr('style')+'"></span>');
				previousAuthorStyle = $(currentAuthor[0].previousSibling);
			}

			// Apply the right style
			for(i=0; i< stylingMap.style.length; i++){
				previousAuthorStyle.css(stylingMap.style[i], stylingMap.value[i]);
			}

		}

		previousAuthorStyle.append( $doc('div.cursor#'+myId) );

	}else if( lastItem && !doNothing ){
				
		// Verification
		var nextAuthorStyle = $(currentAuthor[0].nextSibling);
		if( nextAuthorStyle.length && nextAuthorStyle.attr('author') == authorId ){
			if( stylingMap.style.length ){
				for( var i = 0; i < stylingMap.style.length; i++ ){
					if( nextAuthorStyle.css( stylingMap.style[i] ) != stylingMap.value[i] ){
						authorStyleMatch = false;
						break;
					}
				}
			}else if( nextAuthorStyle.attr('style') != currentAuthor.attr('style') ){
				authorStyleMatch = false;
			}			
		}else{
			authorStyleMatch = false;
		}
		
		// Same new style and author
		if( !authorStyleMatch ){
			currentAuthor.after('<span author="'+authorId+'" style="'+thisStyle+'"></span>');
			nextAuthorStyle = $(currentAuthor[0].nextSibling);			

			// Apply the right style
			for(i=0; i< stylingMap.style.length; i++){
				nextAuthorStyle.css(stylingMap.style[i], stylingMap.value[i]);
			}

		}

		nextAuthorStyle.prepend( $doc('div.cursor#'+myId) );	
		
	// Split the current author
	}else if( !doNothing ){
		currentAuthor.before('<span author="'+thisAuthor+'" style="'+thisStyle+'"></span>');
		var previousSameAuthorStyle = $(currentAuthor[0].previousSibling);

		var childNodes = currentAuthor[0].childNodes;				
		for( var i = 0; i < childNodes.length; i++ ){
			if( !$(childNodes[i]).is( $doc('div.cursor#'+myId ) ) ){						
				previousSameAuthorStyle.append( $(childNodes[i]) );
				i--;						
			}else{
				break;
			}
		}		
		
		currentAuthor.before('<span author="'+authorId+'" style="'+thisStyle+'"></span>');
		var previousAuthorStyle = $(currentAuthor[0].previousSibling);
		

		// Apply the right style
		for(i=0; i< stylingMap.style.length; i++){
			previousAuthorStyle.css(stylingMap.style[i], stylingMap.value[i]);
		}	
		
		previousAuthorStyle.append( $doc('div.cursor#'+myId) );		
	}
	
	if( !currentAuthor[0].childNodes.length ){
		currentAuthor.remove();
	}
		
	// Apply the current character to the text	
	var node=$doc('div.cursor#'+myId)[0].previousSibling;

	// At the beginning of the node or If is not a nodeText
	if(!node || node.nodeType!=3 ){
		$doc('div.cursor#'+myId).before(whichChar);
	}else{
		node.appendData(whichChar); 
	}	
	
	if( whichChar == ' ' && pageRender.verifyIfUnderflow( myId ) ){
		pageRender.pageUnderflow( $($doc('div.cursor#'+myId).parents('div.page')[0].previousSibling), myId, userColor );
	}
	
	pageRender.pageOverflow( $doc('div.cursor#'+myId).parents('div.page') );
		
	if(spanAttr.orderContent && spanAttr.orderContent.length){
		$doc('div.cursor#' + myId).parent().attr('order', spanAttr.order);
		$doc('div.cursor#' + myId).parent().attr('orderContent', spanAttr.orderContent);
	}
	setParagraphLock( myId, userColor );
	if(stackChanges == 'undo'){
		if(!selDelete){
			Undo.addElement('break');
		}
		Undo.addElement({'action': 'spec', 'content': 'BAK', 'user': myId, 'extra': ''});
		Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + myId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( myId, 'cursor' )), 'user': myId, 'extra': ''});
	}else if(stackChanges == 'redo'){
		if(!selDelete){
			Redo.addElement('break');
		}
		Redo.addElement({'action': 'spec', 'content': 'BAK', 'user': myId, 'extra': ''});
		Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + myId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( myId, 'cursor' )), 'user': myId, 'extra': ''});
	}
	
}

/****************************************************************************/
/* Title: manageKeyDown
/* Arguments:	e: the keydown event use for the keycode 
/*
/* Return value: val1: none
/* Description: call the manage backspace and the manage arrow
/****************************************************************************/
function manageKeyDown(e, userId, socket ){
	
	if( !$doc('div.cursor#'+userId).length || disableWriting ){
		return;
	}
	
	if( e.ctrlKey && e.which != 17 ){
		//manageCtrlKey(e, userId, socket );
	}
	
	if( e.which == 8 ){ // backspace key
		e.preventDefault(true);
		var sel=$('iframe#r_engine').contents()[0].getSelection();
		sel.removeAllRanges();
		if( !manageBackspace( userId, 'kolab', 'undo' ) ){
			return;
		}
		sendKeyEventToServer( 'spec', 'BAK', null, userId, socket );
		checkToolbarState( userId );
		Cursor.setCursor( userId, "#FF0063" );
		
	}else if(e.which >=37  && e.which <= 40){ // arrow key
		var range = document.createRange();
		var selection = window.getSelection();
		// If the shiftKey is pressed while arrowKey
		if( e.shiftKey ){

			if( e.which == 39 ){
				var node = nextNodeSearch( $doc('div.cursor#'+userId)[0] );
                                if( node == "lastLine" ){
                                    node = previousNodeSearch( $doc('div.cursor#'+userId)[0] );
                                    range.setStart( node, node.length );
                                    range.setEnd( node, node.length );
                                }
                                else{
                                    range.setStart( node, 0 );
                                    range.setEnd( node, 0 );
                                }

			}else{
				var node = previousNodeSearch( $doc('div.cursor#'+userId)[0] );
				if( node == "firstLine"){
					node = nextNodeSearch( $doc('div.cursor#'+userId)[0] );
					range.setStart( node, 0 );
					range.setEnd( node, 0 );
				}else{
					range.setStart( node, node.length );
					range.setEnd( node, node.length );
				}
			}

		}else{
			$doc('div.selAnchor#'+userId).remove();
			var node = previousNodeSearch( $doc('div.cursor#'+userId)[0] );
			if( node == "firstLine"){
				node = nextNodeSearch( $doc('div.cursor#'+userId)[0] );
				range.setStart( node, 0 );
				range.setEnd( node, 0 );
			}else{
				range.setStart( node, node.length );
				range.setEnd( node, node.length );
			}
		}       
		selection.removeAllRanges();
		selection.addRange(range);
		
	}else if(e.which == 46){ // delete key
		var sel=$('iframe#r_engine').contents()[0].getSelection();
		sel.removeAllRanges();
		e.preventDefault(true);
		if( !manageDelete( userId, 'kolab', 'undo' ) ){
			return;
		}
		sendKeyEventToServer( 'spec', 'DEL', null, userId, socket );		
		checkToolbarState( userId );
		Cursor.setCursor( userId, "#FF0063" );
		
	}else if( e.which == 9 ){ // tab key
		var sel=$('iframe#r_engine').contents()[0].getSelection();
		sel.removeAllRanges();
		e.preventDefault(true);
		manageTab( userId, e.shiftKey, 'kolab', 'undo' );
		sendKeyEventToServer( 'spec', 'TAB', null, userId, socket );		
		checkToolbarState( userId );
		Cursor.setCursor( userId, "#FF0063" );
	}
}

/****************************************************************************/
/* Title: manageTab
/* Arguments:	none
/*
/* Return value: none
/* Description: Add a tab independent of the author. If its in a list, increase
 *				or decrease the indentation
/****************************************************************************/
function manageTab( userId, shift, userColor, stackChanges ){
	var normal = List.manageTab( userId, shift );
	if (normal){

		// There is a selection
		if( $doc('div.selAnchor#'+userId).length ){
			selectionDelete( userId, userColor );
		}

		var currentParent = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
		var currentHeight = currentParent.height();
		$doc('div.cursor#'+userId).before( '&emsp;');
		
		pageRender.pageOverflow( $doc('div.cursor#'+userId).parents('div.page') );

		setParagraphLock( userId, userColor );
	}
}

/****************************************************************************/
/* Title: manageBackspace
/* Arguments:	none
/*
/* Return value: none
/* Description: manage the different case of backspace when the cursor is
/* collapse and call the delete funcion when not
/****************************************************************************/
function manageBackspace( userId, userColor, stackChanges ){
	// There is a selection
	if( $doc('div.selAnchor#'+userId).length ){
		selectionDelete( userId, userColor, stackChanges );		
		setParagraphLock( userId, userColor );
		return true;
	}
	
	var previousNode = previousNodeSearch( $doc('div.cursor#'+userId)[0] );
	var currentParent = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
	var currentHeight = currentParent.height();
	
	
	var thisPage = $doc('div.cursor#'+userId).parents('div.page');
	
	// Disable backspace at beginning of a paragraph if the previous is locked
	if( previousNode == 'firstLine' || $(previousNode).text().match(/\u200b/) ){
		var thisParagraph = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
		var prevParagraph = $(thisParagraph[0].previousSibling);
		if(thisParagraph.hasClass('bullet') || thisParagraph.hasClass('bulletLast') || thisParagraph.hasClass('number') || thisParagraph.hasClass('numberLast')){
			List.decreaseLevel(thisParagraph);
			return true;
		}else if( prevParagraph.hasClass('locked') && !prevParagraph.hasClass('background_kolab')  ){
			return false;
		}
	}
	
	var thisParagraph;
	var prevParagraph;
	
	if( previousNode == 'firstLine' ){
		thisParagraph = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
		prevParagraph = $(thisParagraph[0].previousSibling);
		
		if( !prevParagraph.length ){
			if( thisParagraph.parent()[0].previousSibling ){
				prevParagraph = $(thisParagraph.parent()[0].previousSibling).children(':last');
				if( prevParagraph.attr('klb') == thisParagraph.attr('klb') ){
					var childNodes = prevParagraph.children(':last')[0].childNodes;
					previousNode = childNodes[childNodes.length-1];
					
					thisPage = prevParagraph.parent();
				}
			}
		}
		
	}
	
	// If it's an empty paragraph with zeroWidthSpace, remove it then proceed.
	if( $(previousNode).text().match(/\u200b/) ){
		$(previousNode).remove();
		previousNode = previousNodeSearch( $doc('div.cursor#'+userId)[0] );
	}
	
	
	// We are at the beginning of the paragraph
	if( previousNode == 'firstLine' ){
		// If the previousParagraph exist
		if( prevParagraph.length ){
			
			// No text in paragraph
			if( !$(thisParagraph).text().length ){
				$(prevParagraph).children(':last').append( $(thisParagraph).children(':first')[0].childNodes );
				thisParagraph.remove();		
			}else{
				
				if( $(prevParagraph).text().match(/\u200b/) ){
					prevParagraph.children(':first').remove();
				}
				
				$(prevParagraph).children(':last').append( $doc('div.cursor#'+userId) );
				
				// Same author and same style
				if( prevParagraph.children(':last').attr('author') == thisParagraph.children(':first').attr('author') && prevParagraph.children(':last').attr('style') == thisParagraph.children(':first').attr('style') ){
					$(prevParagraph).children(':last').append($(thisParagraph).children(':first')[0].childNodes);
					$(thisParagraph).children(':first').remove();
				}
				
				$(prevParagraph).append( $(thisParagraph).children() );
				
				$(thisParagraph).remove();
				
			}
			
			var cursorParent = $doc('div.cursor#'+userId).parent();
			var nextParent = $(cursorParent[0].nextSibling);
			if( cursorParent.attr('author') == nextParent.attr('author') && cursorParent.attr('style') == nextParent.attr('style') ){
				combineSpanAuthor( cursorParent, nextParent );
			}
			if(stackChanges == 'undo'){
				Undo.addElement('break');
				Undo.addElement( {'action': 'spec', 'content': 'ENT', 'user': userId, 'extra': $(thisParagraph).attr('klb')} );
				Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
			}else if(stackChanges == 'redo'){
				Redo.addElement('break');
				Redo.addElement( {'action': 'spec', 'content': 'ENT', 'user': userId, 'extra': $(thisParagraph).attr('klb')} );
				Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
			}
		}else if( thisParagraph.parent()[0].previousSibling ){
			prevParagraph = $(thisParagraph.parent()[0].previousSibling).children(':last');
			
		}else{
			return false;
		}
		
		
	// The previous is a normal text node
	}else{
		if(stackChanges == 'undo' && stackChanges == 'redo'){
			var temp = Undo.getStyleMap( userId );
			var info = {};
			info.content = previousNode.textContent.substr(previousNode.textContent.length-1,1);
			info.extra = stylesZip(temp[0], temp[1]);
			info.undo = $doc('div.cursor#' + userId).parents('span[author]').attr('author');
		}
		if( previousNode.length > 1 ){
			previousNode.deleteData(previousNode.data.length-1,1);
		}else{
			// Remove the node
			$(previousNode).remove();
			if(!$doc('div.cursor#'+userId)[0].previousSibling){
				// Send the cursor in previousNode if possible
				var thisAuthor = $doc('div.cursor#'+userId).parent();
				var remainingText = $doc('div.cursor#'+userId)[0].nextSibling;

				if( thisAuthor[0].previousSibling ){
					$(thisAuthor[0].previousSibling).append( $doc('div.cursor#'+userId) );
				}else if( thisAuthor[0].nextSibling && !remainingText ){
					$(thisAuthor[0].nextSibling).prepend( $doc('div.cursor#'+userId) );
				}else if( !remainingText ){
					$doc('div.cursor#'+userId).before('\u200b');
				}

				// If empty authorStyle, remove
				if( !thisAuthor[0].childNodes.length ){
					thisAuthor.remove();
				}

				// Combine if necessary
				var cursorParent = $doc('div.cursor#'+userId).parent();
				var nextParent = $(cursorParent[0].nextSibling);
				if( cursorParent.attr('author') == nextParent.attr('author') && cursorParent.attr('style') == nextParent.attr('style') ){
					combineSpanAuthor( cursorParent, nextParent );
				}
			}
		}
		if(stackChanges == 'undo'){
			Undo.addElement('break');
			Undo.addElement( {'action': 'add', 'content': info.content, 'user': userId, 'extra': info.extra, 'undo': info.undo} );
			Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
		}else if(stackChanges == 'redo'){
			Redo.addElement('break');
			Redo.addElement( {'action': 'add', 'content': info.content, 'user': userId, 'extra': info.extra, 'undo': info.undo} );
			Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
		}
		
	}
	pageRender.pageUnderflow( thisPage, userId, userColor );
	
	if( !$doc('div.cursor#'+userId)[0].previousSibling && !$doc('div.cursor#'+userId).parent()[0].previousSibling ){
		if( !$doc('div.cursor#'+userId).parents('p')[0].previousSibling && $doc('div.cursor#'+userId).parents('div.page')[0].previousSibling ){
			if( $doc('div.cursor#'+userId).parents('p').attr('klb') == $($doc('div.cursor#'+userId).parents('div.page')[0].previousSibling).children(':last').attr('klb') ){
				sendSpaceInPrevious( $($doc('div.cursor#'+userId).parents('div.page')[0].previousSibling).children(':last'), $doc('div.cursor#'+userId).parents('p'), userId );
			}
		}
	}
	
	setParagraphLock( userId, userColor );
	return true;
}

/****************************************************************************/
/* Title: sendSpaceInPrevious
/* Arguments:	none
/*
/* Return value: none
/* Description: After a delete, backspace, if the first character of the paragraph
 *				is a space, linked to a previous paragraph, send all the space
 *				in the previous paragraph
/****************************************************************************/
function sendSpaceInPrevious( thisParagraph, nextParagraph, userId ){
	
	if( nextParagraph.children(':first').text()[0] != " " ){
		return;
	}
	
	if( $doc('div.cursor#'+userId).parents('p.paragraphContainer').is(nextParagraph) ){
		thisParagraph.children(':last').append( $doc('div.cursor#'+userId) );
	}
	
	var thisAuthor = thisParagraph.children(':last');
	var lastAuthor = nextParagraph.children(':first');
	
	while( nextParagraph.children(':first').text()[0] == " " ){
		if( thisAuthor.attr('author') != lastAuthor.attr('author') && thisAuthor.attr('style') != lastAuthor.attr('style') ){
			thisParagraph.append('<span author="'+lastAuthor.attr('author')+'" style="'+lastAuthor.attr('style')+'"></span>');
			thisAuthor = thisParagraph.children(':last');
		}
		
		thisAuthor.append(" ");
		var childText = lastAuthor[0].childNodes[0];
		childText.deleteData(0,1);
		
		if( !lastAuthor.childNodes.length ){
			lastAuthor.remove();
		}
		
		thisAuthor = thisParagraph.children(':last');
		lastAuthor = nextParagraph.children(':first');		
	}
	
	if( !nextParagraph.children().length ){
		nextParagraph.remove();
	}
	
}

/****************************************************************************/
/* Title: manageDelete
/* Arguments:	none
/*
/* Return value: none
/* Description: manage the different case of delete when the cursor is
/* collapse and call the delete funcion when not
/****************************************************************************/
function manageDelete( userId, userColor, stackChanges ){
		
	// There is a selection
	if( $doc('div.selAnchor#'+userId).length ){
		selectionDelete( userId, userColor, stackChanges );
		setParagraphLock( userId, userColor );
		return true;
	}
		
	var nextNode = nextNodeSearch( $doc('div.cursor#'+userId)[0] );
	var currentParent = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
	var currentHeight = currentParent.height();
	
	
	// Disable backspace at beginning of a paragraph if the previous is locked
	if( nextNode == 'lastLine' ){
		var paragraph = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
		var nextParagraph = $(paragraph[0].nextSibling);
		
		if( nextParagraph.hasClass('locked') && !nextParagraph.hasClass('background_kolab')  ){
			return false;
		}
	}
	
	var thisParagraph;
	var nextParagraph;
	
	if( nextNode == 'lastLine' ){
		thisParagraph = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
		nextParagraph = $(thisParagraph[0].nextSibling);
		
		if( !nextParagraph.length ){
			if( thisParagraph.parent()[0].nextSibling ){
				nextParagraph = $(thisParagraph.parent()[0].nextSibling).children(':first');
				if( nextParagraph.attr('klb') == thisParagraph.attr('klb') ){
					var childNodes = nextParagraph.children(':first')[0].childNodes;
					nextNode = childNodes[0];
				}
			}
		}		
	}
	
	// If it's an empty paragraph with zeroWidthSpace, remove it then proceed.
	if( $(nextNode).text().match(/\u200b/) ){
		$(nextNode).remove();
		nextNode = nextNodeSearch( $doc('div.cursor#'+userId)[0] );
	}	
	
	// We are at the end of the paragraph
	if( nextNode == 'lastLine' ){
		
		// If the previousParagraph exist
		if( nextParagraph.length ){
			var info = $(nextParagraph).attr('klb');
			// No text in paragraph
			if( !$(nextParagraph).text().length ){
				nextParagraph.remove();		
			}else{
				
				if( $(thisParagraph).text().match(/\u200b/) ){
					if( $(nextParagraph).text().match(/\u200b/) ){
						nextParagraph.children(':first').append( $doc('div.cursor#'+userId) );
					}else{
						nextParagraph.children(':first').prepend( $doc('div.cursor#'+userId) );
					}
					
					thisParagraph.children(':first').remove();					
				}
				
				// Same author and same style
				if( thisParagraph.children(':last').attr('author') == nextParagraph.children(':first').attr('author') && thisParagraph.children(':last').attr('style') == nextParagraph.children(':first').attr('style') ){
					$(thisParagraph).children(':last').append($(nextParagraph).children(':first')[0].childNodes);
					$(nextParagraph).children(':first').remove();
				}
				
				$(thisParagraph).append( $(nextParagraph).children() );
				
				$(nextParagraph).remove();
				
				// Combine if necessary
				var cursorParent = $doc('div.cursor#'+userId).parent();
				var nextParent = $(cursorParent[0].nextSibling);
				if( cursorParent.attr('author') == nextParent.attr('author') && cursorParent.attr('style') == nextParent.attr('style') ){
					combineSpanAuthor( cursorParent, nextParent );
				}
				
			}
			if(stackChanges == 'undo'){
				Undo.addElement('break');
				Undo.addElement( {'action': 'spec', 'content': 'ENT', 'user': userId, 'extra': info} );
				Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
			}else if(stackChanges == 'redo'){
				Redo.addElement('break');
				Redo.addElement( {'action': 'spec', 'content': 'ENT', 'user': userId, 'extra': info} );
				Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
			}
		}else{
			return false;
		}
	
	}else{
		if(stackChanges == 'undo' && stackChanges == 'redo'){
			var temp = Undo.getStyleMap( userId );
			var info = {};
			info.content = nextNode.textContent.substr(0,1);
			info.extra = stylesZip(temp[0], temp[1]);
			info.undo = $(nextNode).parent().attr('author');
		}
		
		if( nextNode.length > 1 ){
			nextNode.deleteData(0,1);
		}else{
			
			var parentNode = $(nextNode).parent();
			
			// Remove the node
			$(nextNode).remove();
			
			// Send the cursor in previousNode if possible
			var thisAuthor = $doc('div.cursor#'+userId).parent();
			var remainingText = $doc('div.cursor#'+userId)[0].previousSibling;
			
			if( !parentNode.is( thisAuthor) ){
				parentNode.remove();
			}else if( thisAuthor[0].nextSibling && !remainingText ){
				$(thisAuthor[0].nextSibling).prepend( $doc('div.cursor#'+userId) );
			}else if( !remainingText ){
				$doc('div.cursor#'+userId).before('\u200b');
			}
			
			// If empty authorStyle, remove
			if( !thisAuthor[0].childNodes.length ){
				thisAuthor.remove();
			}
			
			// Combine if necessary
			var cursorParent = $doc('div.cursor#'+userId).parent();
			var nextParent = $(cursorParent[0].nextSibling);
			if( cursorParent.attr('author') == nextParent.attr('author') && cursorParent.attr('style') == nextParent.attr('style') ){
				combineSpanAuthor( cursorParent, nextParent );
			}
		}	
		if(stackChanges == 'undo'){
			
			Undo.addElement('break');
			Undo.addElement( {'action': 'addSpec', 'content': info.content, 'user': userId, 'extra': info.extra, 'undo': info.undo} );
			Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
		}else if(stackChanges == 'redo'){
			var temp = Undo.getStyleMap( userId );
			Redo.addElement('break');
			Redo.addElement( {'action': 'addSpec', 'content': info.content, 'user': userId, 'extra': info.extra, 'undo': info.undo} );
			Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
		}
		
	}
	
	pageRender.pageUnderflow( $doc('div.cursor#'+userId).parents('div.page'), userId, userColor );
	
	if( !$doc('div.cursor#'+userId)[0].nextSibling && !$doc('div.cursor#'+userId).parent()[0].nextSibling ){
		if( !$doc('div.cursor#'+userId).parents('p')[0].nextSibling && $doc('div.cursor#'+userId).parents('div.page')[0].nextSibling ){
			if( $doc('div.cursor#'+userId).parents('p').attr('klb') == $($doc('div.cursor#'+userId).parents('div.page')[0].nextSibling).children(':first').attr('klb') ){
				sendSpaceInPrevious( $doc('div.cursor#'+userId).parents('p'), $($doc('div.cursor#'+userId).parents('div.page')[0].nextSibling).children(':first'),  userId );
			}
		}
	}else if( !$doc('div.cursor#'+userId)[0].previousSibling && !$doc('div.cursor#'+userId).parent()[0].previousSibling ){
		if( !$doc('div.cursor#'+userId).parents('p')[0].previousSibling && $doc('div.cursor#'+userId).parents('div.page')[0].previousSibling ){
			if( $doc('div.cursor#'+userId).parents('p').attr('klb') == $($doc('div.cursor#'+userId).parents('div.page')[0].previousSibling).children(':last').attr('klb') ){
				sendSpaceInPrevious( $($doc('div.cursor#'+userId).parents('div.page')[0].previousSibling).children(':last'), $doc('div.cursor#'+userId).parents('p'), userId );
			}
		}
	}
	
	setParagraphLock( userId, userColor );
	return true;
}

/****************************************************************************/
/* Title: manageEnter
/* Arguments:	none
/*
/* Return value: none
/* Description: manage all the enter cases and call the delete function if the
/* cursor is not collapsed
/****************************************************************************/
function manageEnter( userId, paragraphKlb, userColor, stackChanges, list ){
	var redistribute = false;
	var selDelete = false;
	// There is a selection
	if( $doc('div.selAnchor#'+userId).length ){
		selDelete = true;
		selectionDelete( userId, userColor, stackChanges );
	}
	
	var thisParagraph = $doc('div.cursor#'+userId).parents('p.paragraphContainer');
	if (list && (thisParagraph.hasClass('bullet') || thisParagraph.hasClass('bulletLast') || thisParagraph.hasClass('number') || thisParagraph.hasClass('numberLast'))){
		if(!thisParagraph.text().length || thisParagraph.text() == '\u200b'){
			List.manageChange( userId );
			return thisParagraph.attr('klb');
		}else{
			var classAttr = thisParagraph.attr('class');
			var info = {};
			if( classAttr.match(/bullet(Last)?/) ){
				if ( classAttr.match(/bulletLast/) ){
					info.type = 'bulletLast';
				}else{
					info.type = 'bullet';
				}
				info.listId = thisParagraph.attr('listId');
				info.level = classAttr.match(/(bullet\d)/)[1];
			}else{
				if ( classAttr.match(/numberLast/) ){
					info.type = 'numberLast';
				}else{
					info.type = 'number';
				}
				info.listId = thisParagraph.attr('listId');
				info.level = classAttr.match(/(number\d)/)[1];
				info.order = parseInt(thisParagraph.children('span[author]:first').attr('order'));
			}
		}
	}
	if( !paragraphKlb ){
		paragraphKlb = klbGenerator();
	}
	var classAttr = 'paragraphContainer';
	var attr = '';
	thisParagraph.after('<p class="' + classAttr + '" klb="'+paragraphKlb+'"' + attr + '></div>');
	var nextParagraphNode = $(thisParagraph)[0].nextSibling;
	
	var applyChangeKlb = false;
	$doc('p.paragraphContainer[klb="'+thisParagraph.attr('klb')+'"]').each(function(){
		if( applyChangeKlb ){
			$(this).attr('klb', paragraphKlb);
		}else if( $(this).is(thisParagraph) ){
			applyChangeKlb = true;
		}
	});
	$(nextParagraphNode).css('padding-left', $(thisParagraph).css('padding-left'));
	$(nextParagraphNode).css('text-align', $(thisParagraph).css('text-align'));			
	
	// If the last child is the cursor, send it to the next paragraph.
	if( !$doc('div.cursor#'+userId)[0].nextSibling && !$doc('div.cursor#'+userId).parent()[0].nextSibling ){
		
		var firstChild;
		
		$(nextParagraphNode).prepend('<span author="'+$doc('div.cursor#'+userId).parents('span[author]').attr('author')+'" style="'+$doc('div.cursor#'+userId).parents('span[style]').attr('style')+'"></span>' );
		firstChild = $(nextParagraphNode).children('span[author]:first');
		$doc('div.cursor#'+userId).remove();
		//firstChild.prepend($doc('div.cursor#'+userId));
		firstChild.prepend('\u200b')
		firstChild.append( '<div class="cursor" id="'+userId+'"></div>' );
		//firstChild.prepend('\u200b');
	
	}else{
		
		var thisParent =  $doc('div.cursor#'+userId).parent();
		$.makeArray( thisParent.nextAll()).reverse().forEach( function(element){
			$(nextParagraphNode).prepend($(element));
		});
		
		
		if( $doc('div.cursor#'+userId)[0].nextSibling ){
			$(nextParagraphNode).prepend( '<span author="'+thisParent.attr('author')+'" style="'+thisParent.attr('style')+'"></span>' );
			var firstAuthor = $(nextParagraphNode).children(':first');		
			var childNodes = thisParent[0].childNodes;

			for( var i = childNodes.length - 1; i >= 0; i-- ){
				if( $(childNodes[i]).is($doc('div.cursor#'+userId)) ){
					break;
				}else{
					firstAuthor.prepend( $(childNodes[i]) );
				}
			}			
		}
		
		firstAuthor = $(nextParagraphNode).children(':first');			
		firstAuthor.prepend( $doc('div.cursor#'+userId) );
		if( !thisParent[0].childNodes.length && thisParent.parent().children().length > 1 ){
			thisParent.remove();
		}
		
	}
	if( !$(thisParagraph).text().length ){
		$(thisParagraph).children().prepend('\u200b');
	}
	
	pageRender.pageOverflow( $doc('div.cursor#'+userId).parents('div.page') );
	
	setParagraphLock( userId, userColor );
	if(stackChanges == 'undo'){
		if(!selDelete){
			Undo.addElement('break');
		}
		Undo.addElement( {'action': 'spec', 'content': 'BAK', 'user': userId, 'extra': ''} );
		Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
	}else if(stackChanges == 'redo'){
		if(!selDelete){
			Redo.addElement('break');
		}
		Redo.addElement( {'action': 'spec', 'content': 'BAK', 'user': userId, 'extra': ''} );
		Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
	}
	return paragraphKlb;
}

/****************************************************************************/
/* Title: selectionDelete
/* Arguments:	none
/*
/* Return value: none
/* Description: delete everything that is included between the cursor and anchor.
 *				then merge the authorStyle accordingly.
/****************************************************************************/
function selectionDelete( userId, userColor, stackChanges ){
	var content = manageCopy( userId );
	// Select if the selection is from updown or downup
	if ($($doc('div.selAnchor#'+userId+',div.cursor#'+userId)[0]).is('div.selAnchor#'+userId)) {
		var nodeStart = $doc('div.selAnchor#'+userId)[0];
		var nodeEnd = $doc('div.cursor#'+userId)[0];
	} else {
		var nodeStart = $doc('div.cursor#'+userId)[0];
		var nodeEnd = $doc('div.selAnchor#'+userId)[0];
	}
	var shuffle = {bool:false, listId:''};
	var parentEnd =$(nodeEnd).parents('p.paragraphContainer');
	var nextEnd = parentEnd.next('p.paragraphContainer');
	if((nextEnd.hasClass('number') || nextEnd.hasClass('numberLast')) && parentEnd.attr('listId') == nextEnd.attr('listId')){
		shuffle.bool = true;
		shuffle.listId = nextEnd.attr('listId');
	}
	var authorStart = $(nodeStart).parent();
	var paragraphStart = $(authorStart).parent();
	var pageStart = $(paragraphStart).parent();
	
	var authorEnd = $(nodeEnd).parent();
	var paragraphEnd = $(authorEnd).parent();
	var pageEnd = $(paragraphEnd).parent();
	
	
	if( !authorStart.is( authorEnd ) ){
		authorStart.nextAll().each( function(){ if( !$(this).is( $(authorEnd) ) ){ $(this).remove(); }else{ return false} });
	}	
	
	while( $(nodeStart)[0].nextSibling && !$($(nodeStart)[0].nextSibling).is( $(nodeEnd) ) ){
		$($(nodeStart)[0].nextSibling).remove();
	}
	
	if( !paragraphStart.is(paragraphEnd) ){
		
		paragraphStart.nextAll().each( function(){ if( !$(this).is( $(paragraphEnd) ) ){ $(this).remove(); }else{ return false} });
		if(pageStart[0] != pageEnd[0]){
			paragraphEnd.prevAll().each( function(){ $(this).remove();});	
		}
		authorEnd.prevAll().each( function(){ $(this).remove();});	
		
		while( $(nodeEnd)[0].previousSibling ){
			$($(nodeEnd)[0].previousSibling).remove();
		}
		
		if( paragraphEnd.text().length > 0 ){
			$(paragraphEnd).children().each(function (){
				$(this).remove().appendTo(paragraphStart);
			});
		}
		paragraphEnd.remove();
		
	}else{
		while( $(nodeEnd)[0].previousSibling && !$($(nodeEnd)[0].previousSibling).is( $(nodeStart) ) ){
			$($(nodeEnd)[0].previousSibling).remove();
		}
	}


	if( $(nodeStart).is( $doc('div.selAnchor#'+userId) ) ){
		$doc('div.selAnchor#'+userId).after( $doc('div.cursor#'+userId));
	}

	$doc('div.selAnchor#'+userId).remove();
	
	// If no more text, add empty character
	if( !$(paragraphStart).text().length ){
		$doc('div.cursor#'+userId).before('\u200b')
	}
	
	// Combine if necessary
	var cursorParent = $doc('div.cursor#'+userId).parent();
	var nextParent = $(cursorParent[0].nextSibling);
	if( cursorParent.attr('author') == nextParent.attr('author') && cursorParent.attr('style') == nextParent.attr('style') ){
		combineSpanAuthor( cursorParent, nextParent );
	}
	
	if(pageStart[0] != pageEnd[0]){
		var page = pageStart[0].nextSibling;
		while(page != pageEnd[0]){
			var temp = page.nextSibling;
			$(page).remove();
			page = temp;
		}
		if(pageEnd.text().length > 0 ){
			pageEnd.children().each(function (){
				$(this).remove().appendTo(pageStart);
			});
		}
		pageEnd.remove();
	}
	
	
	if(shuffle.bool){
		List.redistributeNumbers(shuffle.listId);
	}
	if(stackChanges == 'undo'){
		Undo.addElement('break');
		Undo.addElement( {'action': 'paste', 'content': content, 'user': userId, 'extra': klbGenerator()} );
		Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
	}else if(stackChanges == 'redo'){
		Redo.addElement('break');
		Redo.addElement( {'action': 'paste', 'content': content, 'user': userId, 'extra': klbGenerator()} );
		Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
	}
	pageRender.pageUnderflow( $doc('div.cursor#'+userId).parents('div.page'), userId, userColor );
	
}