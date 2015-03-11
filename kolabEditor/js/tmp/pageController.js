var pageRender = (function()
{
	var pageHeight = 100;
	var baseStyle='font-family:arial,helvetica,sans-serif;font-size:16px;background-color:transparent;font-weight:normal;font-style:normal;text-decoration:none;';

/****************************************************************************/
/* Title: initializePageControl
/* Arguments:none
/* Return value: none
/* Description: initialize the onclick event
/****************************************************************************/
	function initializePageControl( userId, socket ){
		
		$('#newPage').bind('click',function (){
			var newKlb = klbGenerator();
			newPage( userId, 'kolab', newKlb );
			
			sendPageEvent( 'NEW', newKlb, userId, socket );
			checkToolbarState( userId );
			Cursor.setCursor( userId, "#FF0063" ); 
		});
		
		$('#pageBreak').bind('click',function (){
			var newKlb = klbGenerator();
			pageBreak( userId, 'kolab', newKlb );
			
			sendPageEvent( 'BRK', newKlb, userId, socket );
			checkToolbarState( userId );
			Cursor.setCursor( userId, "#FF0063" ); 
		});
	}
	
/****************************************************************************/
/* Title: pageOverflow
/* Arguments:none
/* Return value: none
/* Description: overflow the currentPage
/****************************************************************************/
	function pageOverflow( thisPage ){
		
		var doNext = false;
		
		while( $(thisPage).height() > pageHeight ){
		
		doNext = true;
		
		var nextPage = $(thisPage[0].nextSibling);
		var lastParagraph = thisPage.children(':last');
		var firstParagraph;
		
		if( !nextPage.length || !nextPage.hasClass('page') ){
			thisPage.after('<div class="page"></div>');
			nextPage =$(thisPage[0].nextSibling);
		}
		
		var pageEnd = $(thisPage).position().top + pageHeight;
		var prghStart = lastParagraph.position().top;
		
		// Verify if the whole paragraph doesn't fit in the page
		if( prghStart >= pageEnd ){
			// Same klb
			if( nextPage.children(':first').attr('klb') == lastParagraph.attr('klb') ){
				firstParagraph = nextPage.children(':first');
				var firstAuthor = firstParagraph.children(':first');
				var lastAuthor = lastParagraph.children(':last');
				if( firstAuthor.attr('author') == lastAuthor.attr('author') && firstAuthor.attr('style') == lastAuthor.attr('style') ){
					firstAuthor.prepend( lastAuthor[0].childNodes );
					lastAuthor.remove();
					mergeAllNode( $.makeArray( $(firstAuthor)[0].childNodes ) );
				}
				
				firstParagraph.prepend( lastParagraph.children() );
				lastParagraph.remove();
			}else{
				nextPage.prepend( lastParagraph );
			}			
		}else{
			if( nextPage.children(':first').attr('klb') != lastParagraph.attr('klb') ){
				nextPage.prepend('<p class="paragraphContainer" klb="'+lastParagraph.attr('klb')+'"></p>');
				firstParagraph = nextPage.children(':first');
				$(firstParagraph).css('padding-left', $(lastParagraph).css('padding-left'));	
				$(firstParagraph).css('text-align', $(lastParagraph).css('text-align'));
			}		

			firstParagraph = nextPage.children(':first');
			sendWord( lastParagraph, firstParagraph );
		}	
		
		}
		
		if( doNext ){
			pageOverflow( $(thisPage[0].nextSibling) );
		}
		
	}

/****************************************************************************/
/* Title: sendWord
/* Arguments:none
/* Return value: none
/* Description: send a word from the current page to the next
/****************************************************************************/
	function sendWord( lastParagraph, firstParagraph ){
		
		var sel=$('iframe#r_engine').contents()[0].getSelection();
		sel.removeAllRanges();
		
		var thisParent;
		var lastTextWord;
		var lastChildPos;
		var childToSend;
		
		// If there is no space
		if( !lastParagraph.text().match(/ /) ){
			childToSend = childAtPos( lastParagraph, lastParagraph.text().length-1);
		}else if( lastParagraph.text() == " " ){
			childToSend = childAtPos( lastParagraph, lastParagraph.text().length-1);
		}else{
			// Get the last word
			lastTextWord = lastParagraph.text().match(/\S+\s*$/)[0];
			lastChildPos = lastParagraph.text().length - lastTextWord.length;
			childToSend = childAtPos( lastParagraph, lastChildPos );
		}
		
		
		
		//console.log('INFO', lastTextWord, lastChildPos, childToSend )
		
		var lastWord;
		if( !childToSend[0] ){
			var childNodes = lastParagraph.children(':last')[0].childNodes;
			lastWord = childNodes[0];
		}else{
			if( childToSend[0].length == childToSend[1]  ){
				lastWord = nextNodeSearch( childToSend[0] );
			}else if( childToSend[1] == 0 ){
				lastWord = childToSend[0];
			}else{
				lastWord = childToSend[0].splitText( childToSend[1] );
			}
		}
			
		thisParent = $(lastWord).parent();
		
		if( !lastParagraph.children(':last').is( thisParent ) ){
			if( lastParagraph.children(':last').attr('author') == firstParagraph.children(':first').attr('author') && lastParagraph.children(':last').attr('style') == firstParagraph.children(':first').attr('style') ){
				firstParagraph.children(':first').prepend( lastParagraph.children(':last')[0].childNodes );
				lastParagraph.children(':last').remove();
				mergeAllNode( $.makeArray( $(firstParagraph.children(':first'))[0].childNodes ) );
			}
			
			$.makeArray( thisParent.nextAll() ).reverse().forEach( function(element){
				
				firstParagraph.prepend( $(element) );
			});
		}		
		
		if( !(lastParagraph.children(':last').attr('author') == firstParagraph.children(':first').attr('author') && lastParagraph.children(':last').attr('style') == firstParagraph.children(':first').attr('style')) ){
			
			firstParagraph.prepend('<span author="'+thisParent.attr('author')+'" style="'+thisParent.attr('style')+'"></span>')
		}
		
		var thisParentChild = thisParent[0].childNodes;
		
		while( !$(thisParentChild[thisParentChild.length-1]).is( $(lastWord) ) ){
			firstParagraph.children(':first').prepend( thisParentChild[thisParentChild.length-1] );
		}
		
		firstParagraph.children(':first').prepend( lastWord );
		
		mergeAllNode( $.makeArray( $(firstParagraph.children(':first'))[0].childNodes ) );
		
		// Delete the author if necessary
		if( !thisParent[0].childNodes.length ){
			thisParent.remove();
		}
		
		// Delete the paragraph if necessary
		if( !lastParagraph[0].childNodes.length ){
			lastParagraph.remove();
		}
	}

/****************************************************************************/
/* Title: recieveWord
/* Arguments:none
/* Return value: none
/* Description: send a word from the nextPage in the currentpage
/****************************************************************************/
	function recieveWord( lastParagraph, firstParagraph){
				
		// Find the first word to send back up
		var firstTextWord = firstParagraph.text().match(/^\S+\s*/)[0];
		var firstChildPos = firstTextWord.length;

		var childToSend = childAtPos( firstParagraph, firstChildPos );
		var firstWord;
		
		if( childToSend[1] != 0 && childToSend[1] != childToSend[0].length ){
			var result = childToSend[0].splitText( childToSend[1] );
			firstWord = $(result)[0].previousSibling;
		}else{
			firstWord = childToSend[0];
		}
		
		// Send all the author
		$.makeArray( $(firstWord).parent().prevAll() ).reverse().forEach( function(element){
			if( lastParagraph.children(':last').attr('author') != $(element).attr('author') || lastParagraph.children(':last').attr('style') != $(element).attr('style') ){
				lastParagraph.append('<span author="'+$(element).attr('author')+'" style="'+$(element).attr('style')+'"></span>');
			}
			lastParagraph.children(':last').append( $(element)[0].childNodes );
			$(element).remove();
		});
		
		if( lastParagraph.children(':last').attr('author') != firstParagraph.children(':first').attr('author') || lastParagraph.children(':last').attr('style') != firstParagraph.children(':first').attr('style') ){
			lastParagraph.append('<span author="'+firstParagraph.children(':first').attr('author')+'" style="'+firstParagraph.children(':first').attr('style')+'"></span>');
		}
		
		while( !$(firstParagraph.children(':first')[0].childNodes[0]).is( $(firstWord) ) ){
			lastParagraph.children(':last').append( firstParagraph.children(':first')[0].childNodes[0] );
		}

		lastParagraph.children(':last').append( firstParagraph.children(':first')[0].childNodes[0] );
		
		mergeAllNode( $.makeArray( $(lastParagraph.children(':last'))[0].childNodes ) );
		
		if( !firstParagraph.children(':first')[0].childNodes.length ){
			firstParagraph.children(':first').remove();
		}
		
		if( !firstParagraph[0].childNodes.length ){
			firstParagraph.remove();
		}	
		
		return true;
		
	}

/****************************************************************************/
/* Title: verifyIfUnderflow
/* Arguments:none
/* Return value: none
/* Description: verify if you should underflow or not.
/****************************************************************************/
	function verifyIfUnderflow( userId ){
		var thisPage = $doc('div.cursor#'+userId).parents('div.page');
		var previousPage = $($(thisPage)[0].previousSibling);
		
		var thisParagraphChild = $doc('div.cursor#'+userId).parents('p.paragraphContainer').children();
		
		// No previousPage or this is not the firstParagraph of the thisPage.
		if( !previousPage || $doc('div.cursor#'+userId).parents('p.paragraphContainer')[0].previousSibling ){
			return false;
		// Last and first are not the same paragraph. Doesn't apply
		}else if( previousPage.children(':last').attr('klb') != thisPage.children(':first').attr('klb') ){
			return false;
		}
		
		var checkResult = false;
		thisParagraphChild.each( 
		function(){ 
			var thisMatch = $(this.childNodes[0]).text().match(/ +/);
			if( thisMatch ){
				if( thisMatch[0].length == 1){
					var thisText = $(this.childNodes[0]).text();
					if( (thisText.search(/ +/) + 1) == thisText.length && $($(this.childNodes[0])[0].nextSibling).is( $doc('div.cursor#'+userId) ) ){
						checkResult = true;
					}					
				}				
				return false;
			}else{
				return true;
			}			
		});
		
		
		return checkResult;
	}	

/****************************************************************************/
/* Title: pageUnderflow
/* Arguments:none
/* Return value: none
/* Description: proceed the underflow
/****************************************************************************/
	function pageUnderflow( thisPage, userId, userColor ){
		
		//console.log('UNDERFLOWCHECK')
		
		var nextPage = $(thisPage[0].nextSibling);
		var doNext = false;
		
		// No following page.
		if( !nextPage.length || !nextPage.hasClass('page') ){
			return;
		}
		
		var firstParagraph = nextPage.children(':first');
		var lastParagraph = thisPage.children(':last');
		var remainingSpace = lastParagraph.position().top + lastParagraph.height() - thisPage.position().top;
		
		//console.log( lastParagraph.position().top , lastParagraph.height() , thisPage.position().top, remainingSpace, firstParagraph.height() )
		
		if( pageHeight - remainingSpace > firstParagraph.height() ) {
			doNext = true;
			if( lastParagraph.attr('klb') == firstParagraph.attr('klb') ){
				if( lastParagraph.children(':last').attr('author') == firstParagraph.children(':first').attr('author') && lastParagraph.children(':last').attr('style') == firstParagraph.children(':first').attr('style') ){
					lastParagraph.children(':last').append( firstParagraph.children(':first')[0].childNodes );
					firstParagraph.children(':first').remove();
				}
				lastParagraph.append( firstParagraph.children() );
				firstParagraph.remove();
			}else{
				thisPage.append( firstParagraph );
			}
		}else{
			if( lastParagraph.attr('klb') != firstParagraph.attr('klb') ){
				thisPage.append('<p class="paragraphContainer" klb="'+firstParagraph.attr('klb')+'"></p>');
				lastParagraph = thisPage.children(':last');
				lastParagraph.append('<span author="'+firstParagraph.children(':first').attr('author')+'" style="'+firstParagraph.children(':first').attr('style')+'"></span>')
			}

			if( recieveWord( lastParagraph, firstParagraph ) ){
				doNext = true;
			}
		}		
		
		if( !nextPage[0].childNodes.length ){
			nextPage.remove();
		}
		
		if( doNext && thisPage[0].nextSibling && $(thisPage[0].nextSibling)[0].nextSibling ){
			pageUnderflow( $(thisPage[0].nextSibling), userId, userColor )
		}
		
		//alert('see')
		pageRender.pageOverflow( thisPage );
		
	}

/****************************************************************************/
/* Title: newPage
/* Arguments:none
/* Return value: none
/* Description: create a newPage at the end of the document
/****************************************************************************/
	function newPage( userId, userColor, newKlb ){
		$doc('div.cursor#'+userId).remove();
		$doc('div.selAnchor#'+userId).remove();
		$doc().children('div.page:last').after('<div class="page"><p class="paragraphContainer" klb="'+newKlb+'" ><span author="'+userId+'" style="'+baseStyle+'"></span></p></div>');
		
		$doc().children('div.page:last').children(':first').children(':first').append('<div class="cursor" id="'+userId+'"></div>');
		
		$doc().children('div.page:last').before('<div class="pageBreak" ></div>')
		
		$doc('div.cursor#'+userId).before('\u200b');
		
		$('iframe#r_engine')[0].contentWindow.focus();
		
		setParagraphLock( userId, userColor );
		
	}
	
/****************************************************************************/
/* Title: pageBreak
/* Arguments:none
/* Return value: none
/* Description: split the currentParagraph and create a pageBreak, send the following
*				paragraph into the nextPage 
/****************************************************************************/
	function pageBreak( userId, userColor, newKlb ){
		
		var nextPage = $($doc('div.cursor#'+userId).parents('div.page')[0].nextSibling);
		
		if( !nextPage.length || !nextPage.hasClass('page') ){
			$doc('div.cursor#'+userId).parents('div.page').after('<div class="page"></div>');
			nextPage = $($doc('div.cursor#'+userId).parents('div.page')[0].nextSibling);
			
		}
		
		var thisParent = $doc('div.cursor#'+userId).parent();
		var thisParagraph = thisParent.parent();
		var thisPage = thisParagraph.parent();
		
		var nextParagraph;
		var lastAuthorStyle;
		var firstAuthorStyle;
		
		// The page was there before and probably need to merge the last child
		if( nextPage.children(':first').length && nextPage.children(':first').attr('klb') == thisPage.children(':last').attr('klb') ){
			 // If it's an empty paragraph with zeroWidthSpace, remove it then proceed.
			if( thisPage.children(':last').text().match(/\u200b/) && !thisParagraph.is( thisPage.children(':last') ) ){
				thisPage.children(':last').remove();			
			// Merge all the authors if applicable and send the remaining one
			}else if( !thisParagraph.is( thisPage.children(':last') ) ){
				lastAuthorStyle = thisPage.children(':last').children(':last');
				firstAuthorStyle = nextPage.children(':first').children(':first');
				if( lastAuthorStyle.attr('author') == firstAuthorStyle.attr('author') && lastAuthorStyle.attr('style') == firstAuthorStyle.attr('style') ){
					firstAuthorStyle.prepend( lastAuthorStyle[0].childNodes );
					lastAuthorStyle.remove();
				}
				nextPage.children(':first').prepend(thisPage.children(':last').children());
				thisPage.children(':last').remove();
			}
		}
		
		// Send all the next paragraph
		$.makeArray( thisParagraph.nextAll() ).reverse().forEach( function(element){
			$(nextPage).prepend( $(element) );
		});
		
		if( !(nextPage.children(':first').length && nextPage.children(':first').attr('klb') == thisPage.children(':last').attr('klb')) ){
			$(nextPage).prepend( '<p class="paragraphContainer" klb="'+newKlb+'"></p>' );
		}
		
		nextParagraph = nextPage.children(':first');
					
		$(nextParagraph).css('padding-left', $(thisParagraph).css('padding-left'));	
		$(nextParagraph).css('text-align', $(thisParagraph).css('text-align'));
		
		nextParagraph.attr('klb', newKlb);
		
		lastAuthorStyle = thisParagraph.children(':last');
		firstAuthorStyle = nextParagraph.children(':first');
		if( !lastAuthorStyle.is( thisParent ) && lastAuthorStyle.attr('author') == firstAuthorStyle.attr('author') && lastAuthorStyle.attr('style') == firstAuthorStyle.attr('style') ){
			firstAuthorStyle.prepend( lastAuthorStyle[0].childNodes );
			lastAuthorStyle.remove();
		}
		
		// Send all the next author
		$.makeArray( thisParent.nextAll() ).reverse().forEach( function(element){
			$(nextParagraph).prepend( $(element) );
		});
		
		var nextParent = nextParagraph.children(':first');		
		if( !(thisParent.attr('author') == nextParent.attr('author') && thisParent.attr('style') == nextParent.attr('style')) ){
			$(nextParagraph).prepend('<span author="'+thisParent.attr('author')+'" style="'+thisParent.attr('style')+'"></span>');
			nextParent = $(nextParagraph).children(':first');
		}
		
		// Send the remaining text;
		while( $doc('div.cursor#'+userId)[0].nextSibling ){
			$(nextParent).append( $doc('div.cursor#'+userId)[0].nextSibling );
		}		
		
		$(nextParent).prepend($doc('div.cursor#'+userId));

		nextPage.before('<div class="pageBreak" ></div>');
		
		if( thisParent.parent().is( thisPage.children(':first') ) && !thisParent[0].childNodes.length && thisParagraph[0].childNodes.length == 1 ){
			thisParent.append( '\u200b' );
		}
		
		// Delete the author if necessary
		if( !thisParent[0].childNodes.length ){
			thisParent.remove();
		}
		
		// Delete the paragraph if necessary
		if( !thisParagraph[0].childNodes.length ){
			thisParagraph.remove();
		}
		
		// Overflow might be needed
		pageOverflow( nextPage );
		
		$('iframe#r_engine')[0].contentWindow.focus();
		
		setParagraphLock( userId, userColor );

	}
	
	return {
		pageOverflow: pageOverflow,
		pageUnderflow: pageUnderflow,
		newPage: newPage,
		pageBreak: pageBreak,
		initializePageControl: initializePageControl,
		verifyIfUnderflow: verifyIfUnderflow
		
	};
	
})();

