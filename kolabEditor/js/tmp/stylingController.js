/****************************************************************************/
/* Title: initStylingManager
 /* Arguments:	
 /* Return value: none
 /* Description: initialize the styling manager
 /****************************************************************************/
function initStylingManager(userId, socket) {

    $('#applyStyle').bind('click', function() {
        applyCoordStyle(arrayOfStyle, arrayOfData);
    });

    $('#bold').bind('click', function() {
        manageStyling('font-weight', 'bold', userId, 'undo', true);
        if ($doc('div.selAnchor#' + userId).length) {
            sendParagraphChangeEvent('style', 'bold', 'font-weight', userId, socket);
            checkToolbarState(userId);
            Cursor.setCursor(userId, "#FF0063");
        }
    });
    $('#italic').bind('click', function() {
        manageStyling('font-style', 'italic', userId, 'undo', true);
        if ($doc('div.selAnchor#' + userId).length) {
            sendParagraphChangeEvent('style', 'italic', 'font-style', userId, socket);
            checkToolbarState(userId);
            Cursor.setCursor(userId, "#FF0063");
        }
    });
    $('#underline').bind('click', function() {
        manageStyling('text-decoration', 'underline', userId, 'undo', true);
        if ($doc('div.selAnchor#' + userId).length) {
            sendParagraphChangeEvent('style', 'underline', 'text-decoration', userId, socket);
            checkToolbarState(userId);
            Cursor.setCursor(userId, "#FF0063");
        }
    });
	$('#strike').bind('click',function(){
		manageStyling('text-decoration', 'line-through', userId, 'undo', true);
        if ($doc('div.selAnchor#' + userId).length) {
            sendParagraphChangeEvent('style', 'line-through', 'text-decoration', userId, socket);
            checkToolbarState(userId);
            Cursor.setCursor(userId, "#FF0063");
        }
	});
    $('#fontBtn').bind('click', function() {
        var value = $('#font').children(':selected').val();
        manageStyling('font-family', value, userId, 'undo', true);
        if ($doc('div.selAnchor#' + userId).length) {
            sendParagraphChangeEvent('style', value, 'font-family', userId, socket);
            checkToolbarState(userId);
            Cursor.setCursor(userId, "#FF0063");
        }
    });
    $('#sizeBtn').bind('click', function() {
        var value = $('#size').children(':selected').val();
        manageStyling('font-size', value, userId, 'undo', true);
        if ($doc('div.selAnchor#' + userId).length) {
            sendParagraphChangeEvent('style', value, 'font-size', userId, socket);
            checkToolbarState(userId);
            Cursor.setCursor(userId, "#FF0063");
        }
    });
    $('#colorBtn').bind('click', function() {
        var value = $('#color').children(':selected').val();
        manageStyling('background-color', value, userId, 'undo', true);
        if ($doc('div.selAnchor#' + userId).length) {
            sendParagraphChangeEvent('style', value, 'background-color', userId, socket);
            checkToolbarState(userId);
            Cursor.setCursor(userId, "#FF0063");
        }
    });
    $('#headingBtn').bind('click', function() {
        var value = $('#heading').children(':selected').val();
        manageHeading(value, userId, 'undo');
        sendParagraphChangeEvent('stylePgh', value, 'hdg', userId, socket);
        checkToolbarState(userId);
        Cursor.setCursor(userId, "#FF0063");
    });
    $('#alignBtn').bind('click', function() {
        var value = $('#align').children(':selected').val();
        manageAlignement(value, userId, 'undo');
        sendParagraphChangeEvent('stylePgh', value, 'alg', userId, socket);
        checkToolbarState(userId);
        Cursor.setCursor(userId, "#FF0063");
    });
    $('#lhBtn').bind('click', function() {
        var value = $('#lh').children(':selected').val();
        switch (value) {
            case '1':
                value = "normal";
                break;
            case '1.5':
                value = 1.5;
                break;
            case '2':
                value = 2;
                break;
            case '2.5':
                value = 2.5;
                break;
        }
        setLineHeight(value, userId, 'undo');
        sendParagraphChangeEvent('stylePgh', value, 'lht', userId, socket);
        checkToolbarState(userId);
        Cursor.setCursor(userId, "#FF0063");
    });
    $('#indP').bind('click', function() {
        var value = manageIndent('ind', userId, 'undo');
        sendParagraphChangeEvent('stylePgh', value, 'ind', userId, socket);
        checkToolbarState(userId);
        Cursor.setCursor(userId, "#FF0063");
    });
    $('#indM').bind('click', function() {
        var value = manageIndent('det', userId, 'undo');
        sendParagraphChangeEvent('stylePgh', value, 'det', userId, socket);
        checkToolbarState(userId);
        Cursor.setCursor(userId, "#FF0063");
    });
}

var mapStyling = {};
mapStyling.value = [];
mapStyling.style = [];

/****************************************************************************/
/* Title: manageStyling
 /* Arguments:	style: which style
 /*				value: the value of the style
 /*				userId:
 /*				stackChanges: undo/redo attr.								
 /*				toggle: boolean that indicates if u want to toggle bold/italic/underline to their normal state						
 /* Return value: none
 /* Description: apply a style with its value to either the stylingMap or the selection
 /****************************************************************************/
function manageStyling(style, value, userId, stackChanges, toggle) {    /*if(stackChanges == 'undo'){
     var valueToSave;
     if(style == 'font-weight' || style == 'font-style' || style == 'text-decoration'){
     valueToSave = value;
     }else{
     valueToSave = $doc('div.cursor#' + userId).parent().attr('style').match(new RegExp(style + ':(.*?);'))[1];
     }
     Undo.addElement({'action':'style', 'content':valueToSave, 'user':userId, 'extra':style});
     }else if(stackChanges == 'redo'){
     var valueToSave;
     if(style == 'font-weight' || style == 'font-style' || style == 'text-decoration'){
     valueToSave = value;
     }else{
     valueToSave = $doc('div.cursor#' + userId).parent().attr('style').match(new RegExp(style + ':(.*?);'))[1];
     }
     Redo.addElement({'action':'style', 'content':valueToSave, 'user':userId, 'extra':style});
     }*/
    // If there is no selection for the user
    if (!$doc('div.selAnchor#' + userId).length) {
        // If the map already has styling inside of it              
        if (mapStyling.style.length) {
            if (mapStyling.style.indexOf(style) != -1) {
                var pos = mapStyling.style.indexOf(style);
                if (style == 'font-family' || style == 'font-size' || style == 'background-color') {
                    mapStyling.value.splice(pos, 1, value);
                } else if (style == 'text-decoration'){
					mapStyling.value[pos] = mapStyling.value[pos].replace(new RegExp(' ?' + value + ' ?'), '');
					if(!mapStyling.value[pos].match(/(underline|line-through)/)){
						mapStyling.style.splice(pos,1);
						mapStyling.value.splice(pos,1);
					}
				} else {
                    mapStyling.style.splice(pos, 1);
                    mapStyling.value.splice(pos, 1);
                }
            } else {
               if (style == 'text-decoration'){
					var currentValue = $doc('div.cursor#'+userId).parent().css(style);
					if( !currentValue.match(new RegExp(' ?' + value + ' ?')) ){
						if(currentValue.match(/none/)){
							currentValue = value;
						}else{
							currentValue = 'underline line-through';
						}
					}else{
						currentValue = currentValue.replace(new RegExp(' ?' + value + ' ?'), '');
						if( !currentValue.match(/(underline|line-through)/) ){
							currentValue = 'none';
						}else{
							if (value == 'underline'){
								currentValue = 'line-through';
							}else{
								currentValue = 'underline';
							}
						}
					}
					mapStyling.style.push(style);
					mapStyling.value.push(currentValue);
				} else if ($doc('div.cursor#' + userId).parent().css(style) == value) {
					mapStyling.style.push(style);
					mapStyling.value.push('normal');
                } else {
                    mapStyling.style.push(style);
                    mapStyling.value.push(value);
                }
            }
        } else {

            var valueToCheck = $doc('div.cursor#' + userId).parent().css(style);
            // If the request style equals the current value, we actually want to remove that style
            if (style == 'text-decoration'){
				if( !valueToCheck.match(new RegExp(' ?' + value + ' ?')) ){
					if(valueToCheck.match(/none/)){
						valueToCheck = value;
					}else{
						valueToCheck = 'underline line-through';
					}
				}else{
					valueToCheck = valueToCheck.replace(new RegExp(' ?' + value + ' ?'), '');
					if( !valueToCheck.match(/(underline|line-through)/) ){
						valueToCheck = 'none';
					}else{
						if (value == 'underline'){
							valueToCheck = 'line-through';
						}else{
							valueToCheck = 'underline';
						}
					}
				}
				mapStyling.style.push(style);
				mapStyling.value.push(valueToCheck);
			} else if (valueToCheck == value) {
				mapStyling.style.push(style);
				mapStyling.value.push('normal');
            } else {
                mapStyling.style.push(style);
                mapStyling.value.push(value);
            }
        }
    } else {
        var styleArray = [[]];
        var index = 0;
        var valueToCheck = $doc('div.cursor#' + userId).parent().css(style);

        if(style == 'text-decoration' && toggle){
			if( !valueToCheck.match(new RegExp(' ?' + value + ' ?')) ){
				if(valueToCheck.match(/none/)){
					valueToCheck = value;
				}else{
					valueToCheck = 'underline line-through';
				}
			}else{
				valueToCheck = valueToCheck.replace(new RegExp(' ?' + value + ' ?'), '');
				if( !valueToCheck.match(/(underline|line-through)/) ){
					valueToCheck = 'none';
				}else{
					if (value == 'underline'){
						valueToCheck = 'line-through';
					}else{
						valueToCheck = 'underline';
					}
				}
			}
			value = valueToCheck;
		} else if (valueToCheck == value && toggle) {
			value = 'normal';
        }

		//console.log(value);
        // Select if the selection is from updown or downup
        if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
            var nodeStart = $doc('div.selAnchor#' + userId)[0];
            var nodeEnd = $doc('div.cursor#' + userId)[0];
            var pos = evaluateCursorPosInText(userId, 'selAnchor');
        } else {
            var nodeStart = $doc('div.cursor#' + userId)[0];
            var nodeEnd = $doc('div.selAnchor#' + userId)[0];
            var pos = evaluateCursorPosInText(userId, 'cursor');
        }
		var startNode = false;
		var startSpan = $(nodeStart).parent();
        // Text after and before the nodeStart
        if ($(nodeStart)[0].nextSibling && $(nodeStart)[0].previousSibling) {
            $(nodeStart).parent().after('<span author="' + $(nodeStart).parent().attr('author') + '" style="' + $(nodeStart).parent().attr('style') + '"></span>');
            var nextParent = $($(nodeStart).parent()[0].nextSibling);
            while ($(nodeStart)[0].nextSibling) {
                nextParent.append($(nodeStart)[0].nextSibling);
            }
        }else if($(nodeStart)[0].nextSibling){
			startNode = true;
		}

		var endSpan = $(nodeEnd).parent();
        // Text after and before the nodeEnd
        if ($(nodeEnd)[0].nextSibling && $(nodeEnd)[0].previousSibling) {
            $(nodeEnd).parent().after('<span author="' + $(nodeEnd).parent().attr('author') + '" style="' + $(nodeEnd).parent().attr('style') + '"></span>');
            var nextParent = $($(nodeEnd).parent()[0].nextSibling);
            while ($(nodeEnd)[0].nextSibling) {
                nextParent.append($(nodeEnd)[0].nextSibling);
            }
        }

        var thisParent;
        if ($doc(nodeStart).parent()[0].nextSibling && !startNode) {
            thisParent = $($doc(nodeStart).parent()[0].nextSibling);
        } else {
            thisParent = $doc(nodeStart).parent();
        }
        var dataArray = [{klb: thisParent.parent().attr('klb'), coord: []}];

        while (thisParent.length) {
            //window.console.log(thisParent.find(nodeEnd).length);
            if (!thisParent.find(nodeEnd).length) {
                //window.console.log(thisParent.text());
				if(stackChanges == 'undo'){
					styleArray[index].push(style + ':' + thisParent.css(style) + ';');
				}
                dataArray[index].coord.push({start: pos, end: (pos + thisParent.text().length)});
                pos += thisParent.text().length;
                thisParent.css(style, value);
				if(stackChanges == 'redo'){
					styleArray[index].push(style + ':' + thisParent.css(style) + ';');
				}
            } else {
                break;
            }

            if (thisParent[0].nextSibling) {
                thisParent = $(thisParent[0].nextSibling);
            } else if (thisParent.parent()[0].nextSibling) {
				List.changeSize(thisParent.parent());
                thisParent = $($(thisParent.parent()[0].nextSibling).children()[0]);
                styleArray.push([]);
                dataArray.push({klb: thisParent.parent().attr('klb'), coord: []});
                index++
            } else {
                break;
            }

        }
        if (thisParent.find(nodeEnd).length) {
            styleArray[index].push(style + ':' + thisParent.css(style) + ';');
            dataArray[index].coord.push({start: pos, end: (pos + thisParent.text().length)});
        }

        $doc(nodeEnd).parent().css(style, value);
		List.changeSize( $doc(nodeEnd).parent().parent());
        if (stackChanges == 'undo') {
			if(!toggle){
				Undo.addElement({action: 'styleSpec', content: styleArray, user: userId, extra: dataArray});
			}else{
				Undo.addElement('break');
				Undo.addElement({action: 'styleSpec', content: styleArray, user: userId, extra: dataArray});
				var anchor = null;
				if($doc('div.selAnchor#' + userId).length){
					anchor = {};
					anchor.klb = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer').attr('klb');
					anchor.pos = evaluateCursorPosInText( userId, 'cursor' );
				}
				Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
			}
        }else if(stackChanges == 'redo'){
			if(!toggle){
				Redo.addElement({action: 'styleSpec', content: styleArray, user: userId, extra: dataArray});
			}else{
				Redo.addElement('break');
				Redo.addElement({action: 'styleSpec', content: styleArray, user: userId, extra: dataArray});
				var anchor = null;
				if($doc('div.selAnchor#' + userId).length){
					anchor = {};
					anchor.klb = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer').attr('klb');
					anchor.pos = evaluateCursorPosInText( userId, 'cursor' );
				}
				Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
			}
		}
		combineSpanAuthor(startSpan, endSpan);
    }

    $('iframe#r_engine')[0].contentWindow.focus();
}

/****************************************************************************/
/* Title: manageHeading
 /* Arguments:	value: the heading type we want to apply
 /* Return value: none
 /* Description: apply a certain heading to all the selected paragraph
 /****************************************************************************/
function manageHeading(value, userId, stackChanges) {
    var style = 'font-family:arial,helvetica,sans-serif;font-size:16px;background-color:transparent;font-weight:normal;font-style:normal;text-decoration:none;';
    var values = [];
    var data = {type: 'head', klb: []};
	if (stackChanges == 'undo') {
		Undo.addElement('break');
	}else if (stackChanges == 'redo') {
		Redo.addElement('break');
	}
    // If there is no selection
    if (!$doc('div.selAnchor#' + userId).length) {

        var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
        data.klb.push(paragraph.attr('klb'));
        values.push(paragraph.attr('head') ? paragraph.attr('head') : '');

        if (value == '') {
            paragraph.attr('head', '');
        } else if (value != "Normal") {
            paragraph.attr('head', value);
        } else {
            var styleArray = [[]];
            var dataArray = [{klb: paragraph.attr('klb'), coord: []}];
            paragraph.attr('head', '');
            var temp = combineAllSpan(paragraph.children(':first'), styleArray, dataArray, 0);
            console.log(temp[0]);
            styleArray = temp[0];
            dataArray = temp[1];
            paragraph.children().each(function() {
                var savedBackground = $(this).css('background-color');
                $(this).attr('style', style);
                $(this).css('background-color', savedBackground);
            });
        }

    } else {
        // Select if the selection is from updown or downup
        if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
            var nodeStart = $doc('div.selAnchor#' + userId)[0];
            var nodeEnd = $doc('div.cursor#' + userId)[0];
        } else {
            var nodeStart = $doc('div.cursor#' + userId)[0];
            var nodeEnd = $doc('div.selAnchor#' + userId)[0];
        }

        var klbStart = $(nodeStart).parents('p.paragraphContainer').attr('klb');
        var klbEnd = $(nodeEnd).parents('p.paragraphContainer').attr('klb');
        var thisKlb = klbStart;
        var first = true;
        var styleArray = [[]];
        var dataArray = [{klb: thisKlb, coord: []}];
        var index = 0;
        var pos = 0;
        do {
            if (!first) {
                thisKlb = $($doc('p.paragraphContainer[klb="' + thisKlb + '"]')[0].nextSibling).attr('klb');
            }

            var paragraph = $doc('p.paragraphContainer[klb="' + thisKlb + '"]');
            data.klb.push(paragraph.attr('klb'));
            values.push(paragraph.attr('head') ? paragraph.attr('head') : '');
            if (value == '') {
                paragraph.attr('head', '');
            } else if (value != "Normal") {
                paragraph.attr('head', value);
            } else {
                paragraph.attr('head', '');
                var temp = combineAllSpan(paragraph.children(':first'), styleArray, dataArray, index);
                styleArray = temp[0];
                dataArray = temp[1];
                paragraph.children().each(function() {
                    var savedBackground = $(this).css('background-color');
                    $(this).attr('style', style);
                    $(this).css('background-color', savedBackground);
                });
                if ($doc('p.paragraphContainer[klb="' + thisKlb + '"]')[0].nextSibling) {
                    index++;
                    pos = 0;
                    styleArray.push([]);
                    dataArray.push([{klb: $($doc('p.paragraphContainer[klb="' + thisKlb + '"]')[0].nextSibling).attr('klb'), coord: []}]);
                }
            }

            first = false;
        } while (thisKlb != klbEnd);
    }
    if (stackChanges == 'undo') {
		Undo.addElement({action: 'styleSpec', content: styleArray, user: userId, extra: dataArray});
		var anchor = null;
		if($doc('div.selAnchor#' + userId).length){
			anchor = {};
			anchor.klb = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer').attr('klb');
			anchor.pos = evaluateCursorPosInText( userId, 'cursor' );
		}
		Undo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
	}else if(stackChanges == 'redo'){
		Redo.addElement({action: 'styleSpec', content: styleArray, user: userId, extra: dataArray});
		var anchor = null;
		if($doc('div.selAnchor#' + userId).length){
			anchor = {};
			anchor.klb = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer').attr('klb');
			anchor.pos = evaluateCursorPosInText( userId, 'cursor' );
		}
		Redo.addElement({'action': 'cursor', 'content': ($doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb') + ',' + evaluateCursorPosInText( userId, 'cursor' )), 'user': userId, 'extra': ''});
	}
    $('iframe#r_engine')[0].contentWindow.focus();

}

/****************************************************************************/
/* Title: manageAlignement
 /* Arguments:	value: the alignement we want to apply
 /* Return value: none
 /* Description: apply a certain alignement to all the selected paragraph
 /****************************************************************************/
function manageAlignement(value, userId, stackChanges) {
    var data = {type: 'css', klb: []};
    var values = [];
    if (!$doc('div.selAnchor#' + userId).length) {
        var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
        data.klb.push(paragraph.attr('klb'));
        values.push(paragraph.attr('style'));
        paragraph.css('text-align', value);
        if (value.toLowerCase() == "justify") {
            paragraph.css('white-space', "normal");
        }
        else {
            paragraph.css('white-space', "pre-wrap");
        }
    } else {
        // Select if the selection is from updown or downup
        if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
            var nodeStart = $doc('div.selAnchor#' + userId)[0];
            var nodeEnd = $doc('div.cursor#' + userId)[0];
        } else {
            var nodeStart = $doc('div.cursor#' + userId)[0];
            var nodeEnd = $doc('div.selAnchor#' + userId)[0];
        }

        var klbStart = $(nodeStart).parents('p.paragraphContainer').attr('klb');
        var klbEnd = $(nodeEnd).parents('p.paragraphContainer').attr('klb');
        var thisKlb = klbStart;
        var first = true;
        do {
            if (!first) {
                thisKlb = $($doc('p.paragraphContainer[klb="' + thisKlb + '"]')[0].nextSibling).attr('klb');
            }
            data.klb.push(thisKlb);
            values.push($doc('p.paragraphContainer[klb="' + thisKlb + '"]').attr('style'));
            $doc('p.paragraphContainer[klb="' + thisKlb + '"]').css('text-align', value);
            if (value == "justify") {
                $doc('p.paragraphContainer[klb="' + thisKlb + '"]').css('white-space', "normal");
            }
            else {
                $doc('p.paragraphContainer[klb="' + thisKlb + '"]').css('white-space', "pre-wrap");
            }
            first = false;
        } while (thisKlb != klbEnd)

    }
    if (stackChanges == 'undo') {
        Undo.addElement({action: 'styleSpecPgh', content: values, user: userId, extra: data});
    }
    $('iframe#r_engine')[0].contentWindow.focus();

}

/****************************************************************************/
/* Title: setLineHeight
 /* Arguments:	value: the line-height we want to apply
 /* Return value: none
 /* Description: apply a certain line-height to all the selected paragraph
 /****************************************************************************/
function setLineHeight(value, userId, stackChanges) {
    var data = {type: 'css', klb: []};
    var values = [];
    if (!$doc('div.selAnchor#' + userId).length) {
        var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
        data.klb.push(paragraph.attr('klb'));
        values.push(paragraph.attr('style'));
        paragraph.css('line-height', value);
    } else {
        // Select if the selection is from updown or downup
        if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
            var nodeStart = $doc('div.selAnchor#' + userId)[0];
            var nodeEnd = $doc('div.cursor#' + userId)[0];
        } else {
            var nodeStart = $doc('div.cursor#' + userId)[0];
            var nodeEnd = $doc('div.selAnchor#' + userId)[0];
        }

        var klbStart = $(nodeStart).parents('p.paragraphContainer').attr('klb');
        var klbEnd = $(nodeEnd).parents('p.paragraphContainer').attr('klb');
        var thisKlb = klbStart;
        var first = true;
        do {
            if (!first) {
                thisKlb = $($doc('p.paragraphContainer[klb="' + thisKlb + '"]')[0].nextSibling).attr('klb');
            }

            var paragraph = $doc('p.paragraphContainer[klb="' + thisKlb + '"]');
            data.klb.push(paragraph.attr('klb'));
            values.push(paragraph.attr('style'));
            paragraph.css('line-height', value);
            first = false;
        } while (thisKlb != klbEnd)
    }
    if (stackChanges == 'undo') {
        Undo.addElement({action: 'styleSpecPgh', content: values, user: userId, extra: data});
    }
    $('iframe#r_engine')[0].contentWindow.focus();
}

/****************************************************************************/
/* Title: manageIdent
 /* Arguments:	indent: the indent/outdent we want to apply
 /* Return value: none
 /* Description: apply a certain indent/outdent to all the selected paragraph
 /****************************************************************************/
function manageIndent(indent, userId, stackChanges) {

    var value;
    if (stackChanges == 'undo') {
        if (indent == 'ind') {
            Undo.addElement({'action': 'stylePgh', 'content': '', 'user': userId, 'extra': 'det'});
        } else {
            Undo.addElement({'action': 'stylePgh', 'content': '', 'user': userId, 'extra': 'ind'});
        }
    } else if (stackChanges == 'redo') {
        if (indent == 'ind') {
            Redo.addElement({'action': 'stylePgh', 'content': '', 'user': userId, 'extra': 'det'});
        } else {
            Redo.addElement({'action': 'stylePgh', 'content': '', 'user': userId, 'extra': 'ind'});
        }
    }
    if (!$doc('div.selAnchor#' + userId).length) {
        var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
        if (indent == 'ind') {
            if(paragraph.hasClass('bullet') || paragraph.hasClass('bulletLast')){
				List.increaseLevel(paragraph);
			}else if (parseInt(paragraph.css('padding-left')) <= 90) {
                value = parseInt(paragraph.css('padding-left')) + 30;
                paragraph.css('padding-left', value + 'px');
                paragraph[0].style.width = paragraph.width() - 30;
            }
        } else {
            if(paragraph.hasClass('bullet') || paragraph.hasClass('bulletLast')){
				List.decreaseLevel(paragraph);
			}else if (parseInt(paragraph.css('padding-left')) >= 30) {
                value = parseInt(paragraph.css('padding-left')) - 30;
                paragraph.css('padding-left', value + 'px');
                paragraph[0].style.width = paragraph.width() + 30;
            }
        }
    } else {
        // Select if the selection is from updown or downup
        if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
            var nodeStart = $doc('div.selAnchor#' + userId)[0];
            var nodeEnd = $doc('div.cursor#' + userId)[0];
        } else {
            var nodeStart = $doc('div.cursor#' + userId)[0];
            var nodeEnd = $doc('div.selAnchor#' + userId)[0];
        }

        var klbStart = $(nodeStart).parents('p.paragraphContainer').attr('klb');
        var klbEnd = $(nodeEnd).parents('p.paragraphContainer').attr('klb');
        var thisKlb = klbStart;

        var first = true;
        do {
            if (!first) {
                thisKlb = $($doc('p.paragraphContainer[klb="' + thisKlb + '"]')[0].nextSibling).attr('klb');
            }

            var paragraph = $doc('p.paragraphContainer[klb="' + thisKlb + '"]');
            if (indent == 'ind') {
                if(paragraph.hasClass('bullet') || paragraph.hasClass('bulletLast')){
					List.increaseLevel(paragraph);
				}else if (parseInt(paragraph.css('padding-left')) <= 90) {
                    value = parseInt(paragraph.css('padding-left')) + 30;
                    paragraph.css('padding-left', value + 'px');
                    paragraph[0].style.width = paragraph.width() - 30;
                }
            } else {
                if(paragraph.hasClass('bullet') || paragraph.hasClass('bulletLast')){
					List.decreaseLevel(paragraph);
				}else if (parseInt(paragraph.css('padding-left')) >= 30) {
                    value = parseInt(paragraph.css('padding-left')) - 30;
                    paragraph.css('padding-left', value + 'px');
                    paragraph[0].style.width = paragraph.width() + 30;
                }
            }
            first = false;
        } while (thisKlb != klbEnd)
    }

    $('iframe#r_engine')[0].contentWindow.focus();

    return value;
}

/****************************************************************************
 * Title: addHorizontalLine
 * @param {string} userId: the Id of the user
 * @param {string} userColor: the color of the user
 * @param {string} stackChanges: the communication socket
 * @returns {undefined}
 * Description: add a non-editable paragraph with an horizontal line as background image
 ****************************************************************************/
function addHorizontalLine( userId, userColor, stackChanges ){
	if( $doc('div.selAnchor#'+userId).length ){
		selectionDelete( userId, userColor, stackChanges );
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
	paragraph.attr('contentEditable', false);
	paragraph.addClass('hr');
}

/****************************************************************************/
/* Title: checkToolbarState
 /* Arguments:	userId
 /* Return value: none
 /* Description: set the right state for each toolbar options
 /****************************************************************************/
function checkToolbarState(userId) {


    var fontList = ["arial, helvetica, sans-serif", "arial black, helvetica, sans-serif", "georgia, serif", "helvetica, helvetica, sans-serif", "impact, cursive", "lucida sans unicode, lucida grande, sans-serif", "myriad-pro, sans-serif", "tahoma, geneva, sans-serif", "times new roman, times, serif", "trebuchet ms, helvetica, sans-serif", "verdana, geneva, sans-serif"];
    var fontSizeList = ['11px', '12px', '13px', '15px', '16px', '19px', '22px', '24px', '26px', '29px', '32px', '35px', '37px', '48px', '64px', '96px'];
    var hightLight = ["#FFFF00", "#48FF48", "#40FFFF", "#FF82FF", "#7171FF", "#FF4242", "#C0C0C0", "transparent"];
    var lineHeight = ["normal", "1.5", "2", "2.5"];
    var alignement = ['left', 'center', 'right', 'justify'];
    var heading = ['Normal', 'Title', 'Subtitle', 'Heading1', 'Heading2', 'Heading3', 'Note'];

    var parent;
    // Select if the selection is from updown or downup
    if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
        parent = $doc('div.selAnchor#' + userId).parent()
    } else {
        parent = $doc('div.cursor#' + userId).parent()
    }

    // Set bold/italic/underline
    var fontWeight = parent.css('font-weight');
    if (fontWeight == "bold") {
        $("#bold").attr("src", "/kolabEditor/images/bolda.jpg");
    } else {
        $("#bold").attr("src", "/kolabEditor/images/bold.jpg");
    }

    var fontStyle = parent.css('font-style');
    if (fontStyle == "italic") {
        $("#italic").attr("src", "/kolabEditor/images/italica.jpg");
    } else {
        $("#italic").attr("src", "/kolabEditor/images/italic.jpg");
    }

    var fontDecoration = parent.css('text-decoration');
    if (fontDecoration.match(/\underline/)) {
        $("#underline").attr("src", "/kolabEditor/images/underlinea.jpg");
    } else {
        $("#underline").attr("src", "/kolabEditor/images/underline.jpg");
    }


    // Set the font
    var fontIndex = fontList.indexOf(parent.css('font-family'));
    $('#font')[0].selectedIndex = fontIndex;

    // Set the font-size
    var fontSizeIndex = fontSizeList.indexOf(parent.css('font-size'));
    $('#size')[0].selectedIndex = fontSizeIndex;

    // Set the hightlight
    var rgbcolors = parent.css('background-color').split("(")[1].split(")")[0];
    rgbcolors = rgbcolors.split(",");

    var hexColor = rgbcolors.map(function(x) {             //For each array element
        x = parseInt(x).toString(16);      //Convert to a base16 string
        return (x.length == 1) ? "0" + x : x;  //Add zero if we get only one character
    });
    if (hexColor.join("") == "00000000") {
        hexColor = "transparent";
    } else {
        hexColor = "#" + hexColor.join("").toUpperCase();
    }
    var hightLightIndex = hightLight.indexOf(hexColor);
    $('#color')[0].selectedIndex = hightLightIndex;
    backgroundOptionChange();

    // Set the line-height	
    var lineHeightndex = lineHeight.indexOf(parent.css('line-height'));
    $('#lh')[0].selectedIndex = lineHeightndex;

    // Set the alignment
    var alignementIndex = alignement.indexOf(parent.css('text-align'));
    $('#align')[0].selectedIndex = alignementIndex;

    var headingIndex = 0;
    if (parent.parents('p.paragraphContainer').attr('head')) {
        headingIndex = heading.indexOf(parent.parents('p.paragraphContainer').attr('head'));
    }
    $('#heading')[0].selectedIndex = headingIndex;

}

/****************************************************************************
 * Title: backgroundOptionChange
 * @returns {undefined}
 * Description: changes the highlight selection box background-color
 ****************************************************************************/
function backgroundOptionChange() {
    var value = $('#color').children(':selected').val();
    if (value == "transparent") {
        $("#color").css("background-color", "white");
    } else {
        $("#color").css("background-color", value);
    }
}

/****************************************************************************
 * Title: addHorizontalLine
 * @param {object} data: the array of the paragraphs styles value
 * @param {object} dataType: the map of the klb and the type of value
 * @returns {undefined}
 * Description: apply different style on a list of paragraphs
 ****************************************************************************/
function applyParagraphStyle(data, dataType) {

    for (var i = 0; i < dataType.klb.length; i++) {
        var thisParagraph = $doc('p.paragraphContainer[klb="' + dataType.klb[i] + '"]');
        if (dataType.type == 'head') {
            if (data[i] == '') {
                thisParagraph.attr('head', '');
            } else {
                thisParagraph.attr('head', data[i]);
            }
        } else {
            thisParagraph.attr('style', data[i]);
        }

    }
}

/****************************************************************************
 * Title: addHorizontalLine
 * @param {object} style: the array of styles for each paragraphs
 * @param {object} data: the array of info map for each paragraph
 * @param {object} stackChanges: undo/redo attr.
 * @returns {undefined}
 * Description: apply different style deffined coordonates in different paragraphs
 ****************************************************************************/
function applyCoordStyle(style, data, stackChanges) {

    var sel, textElement;
    sel = {};
    sel.isCollapsed = false;
	var cpt = 0;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].coord.length; j++) {
			//console.log(data[i].coord[j].start, data[i].coord[j].end);
			
			//put the temporary anchor at start position
            textElement = childAtPos($doc('p.paragraphContainer[klb="' + data[i].klb + '"]'), data[i].coord[j].start);
            sel.anchorNode = textElement[0];
            sel.anchorOffset = textElement[1];

            // apply the tempCursor coordAnchor	
            placeSelectionNode(sel.anchorNode, sel.anchorOffset, 'selAnchor', 'tempCursor');

			//put the temporary cursor at end position
            textElement = childAtPos($doc('p.paragraphContainer[klb="' + data[i].klb + '"]'), data[i].coord[j].end);
            sel.focusNode = textElement[0];
            sel.focusOffset = textElement[1];

            // apply the tempCursor coordCursor	
            placeSelectionNode(sel.focusNode, sel.focusOffset, 'cursor', 'tempCursor');
            // set all the style
            var styleArray = stylesUnZip(style[i][j]);
            console.log(styleArray, styleArray.value.length, style[i][j], data, style)
            for (var k = 0; k < styleArray.value.length; k++) {
                console.log(styleArray.value[k], styleArray.style[k])
                manageStyling(styleArray.style[k], styleArray.value[k], 'tempCursor', stackChanges, false);
            }
            // remove the cursor & merge appropriate nodeText
            var parentCursor = $doc('div.cursor#tempCursor').parent();
            var parentAnchor = $doc('div.selAnchor#tempCursor').parent();
            $doc('div.cursor#tempCursor').remove();
            $doc('div.selAnchor#tempCursor').remove();
            mergeAllNode($.makeArray($(parentAnchor)[0].childNodes));
            mergeAllNode($.makeArray($(parentCursor)[0].childNodes));
        }
    }

}

arrayOfStyle = [[]];
arrayOfData = [];

arrayOfStyle[0][0] = "font-weight:bold;font-style:italic";

arrayOfStyle.push(["font-weight:bold;font-style:italic"]);
arrayOfData[0] = {klb: 'initialKlb', coord: [{start: 2, end: 5}]};
arrayOfData.push({klb: 'initialKlb3', coord: [{start: 7, end: 10}]});

