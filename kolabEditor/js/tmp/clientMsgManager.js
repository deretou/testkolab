/****************************************************************************/
/* Title: initMsgManager
/* Arguments:none
/* Return value: none
/* Description: initialize the message manager
/****************************************************************************/
function initMsgManager(userId,userColor) {
    var loc = document.location;
    //get the correct port
    var port = loc.port == "" ? (loc.protocol == "https:" ? 443 : 80) : loc.port;
    //create the url
    var url = loc.protocol + "//" + loc.hostname + ":" + port + "/document";
    //find out in which subfolder we are
    var resource = loc.pathname.substr(1, loc.pathname.indexOf("/")) + "socket.io";
    //connect

    var socket;

    socket = io.connect(url, {
        resource: resource,
        'max reconnection attempts': 3,
        'sync disconnect on unload': false
    });

    socket.once('connect', function() {
        console.log('connected');
        socket.emit('choose', loc.pathname.substr(1));
        sendClientReady(userId, userColor, socket);
    });

    socket.on('disconnect', function(reason) {
        console.log('disconnected');
    });

    socket.on('status', function(obj) {
        console.log('INCOMING message', obj);
        msgRouter(userId, obj);
    });

    socket.on('changeset', function(obj) {
        console.log('INCOMING changeset', obj);
        changesetRouter(obj);
    });

    return socket;
}

/****************************************************************************/
/* Title: msgRouter
/* Arguments:none
/* Return value: none
/* Description: route the message to the right place
/****************************************************************************/
function msgRouter(userId, packet) {
    switch (packet.status) {
        case "userEnter":
            manageUpdateUserInfo(userId, packet)
            break;

        case "initDocument":
            // init the document
            initClientDocument(packet);
            break;

        case "initUsers":
            // init all the users information
            initUsersPosition(userId, packet.content);
            break;

        case "userLeave":
            handleUserDisconnect(packet);
            break;

        case "paragraphDenied":
            handleDeniedParagraph(packet.user, 'kolab');
            break;

        default:
            alert('UNKNOWN MESSAGE : ' + packet.status);
            console.log('UNKNOWN MESSAGE : ', packet.status);
            break;
    }
}

/****************************************************************************/
/* Title: retrieveUserColor
/* Arguments:none
/* Return value: none
/* Description: retrieve the saved userColor
/****************************************************************************/
function retrieveUserColor( userId ){
	var userColor;
	KolabInReal.currentSquareMembers.forEach( function(element){
		console.log( element.kolabID, userId, element.color)
		if( element.kolabID == userId ){
			userColor = element.color;
		}
	});
	
	return userColor;
}

/****************************************************************************/
/* Title: changesetRouter
/* Arguments:none
/* Return value: none
/* Description: route the changeset to the appropriate function
/****************************************************************************/
function changesetRouter(packet, stackChanges) {
	
	var userColor = retrieveUserColor( packet.user );
   
	if (packet.action == 'addSpec') {
        manageSpecialCharacterAdd(packet.user, packet.content, packet.undo ? packet.undo : packet.user, stylesUnZip(packet.extra), userColor, stackChanges);
    } else if (packet.action == 'add') {
        console.log(stackChanges);
        manageCharacterAdd(packet.user, packet.content, packet.undo ? packet.undo : packet.user, stylesUnZip(packet.extra), userColor, stackChanges);
    } else if (packet.action == 'spec') {
        switch (packet.content) {
            // Delete event
            case "DEL":
                manageDelete(packet.user, userColor, stackChanges);
                break;

                // Backspace event
            case "BAK":
                manageBackspace(packet.user, userColor, stackChanges);
                break;

                // Enter event
            case "ENT":
                manageEnter(packet.user, packet.extra, userColor, stackChanges, true);
                break;

                // Tab Event
            case "TAB":
                manageTab(packet.user, userColor, stackChanges);
                break;
        }
    } else if (packet.action == 'style') {
        manageStyling(packet.extra, packet.content, packet.user, stackChanges, true);
    } else if (packet.action == 'styleSpec') {
        applyCoordStyle(packet.content, packet.extra);
    } else if (packet.action == 'stylePgh') {
        switch (packet.extra) {
            // Alignment change
            case "alg":
                manageAlignement(packet.content, packet.user, stackChanges);
                break;

                // Line-height change
            case "lht":
                setLineHeight(packet.content, packet.user, stackChanges);
                break;

                // Indent change && Detent change
            case "ind":
            case "det":
                manageIndent(packet.extra, packet.user, stackChanges);
                break;
            case "hdg":
                manageHeading(packet.content, packet.user, stackChanges);
                break;
        }
    } else if (packet.action == 'styleSpecPgh') {
        applyParagraphStyle(packet.content, packet.extra);
    } else if (packet.action == 'cursor') {
        var contentCursor = packet.content.split(',');
        var contentAnchor = packet.extra ? packet.extra.split(',') : [];
        console.log(packet, contentCursor, contentAnchor);
        manageCursorChangeEvent(userColor, packet.user, contentCursor[0], contentCursor[1], contentAnchor[0], contentAnchor[1], stackChanges)
    } else if (packet.action == 'paste') {
        console.log(packet);
        manageInsertHtml(packet.content, packet.user, userColor, stackChanges);
    } else if (packet.action == 'page') {
        switch (packet.content) {
            case "BRK":
                pageRender.pageBreak(packet.user, userColor, packet.extra);
                break;
            case "NEW":
                pageRender.newPage(packet.user, userColor, packet.extra);
                break;
        }
    }

    Cursor.setCursor(packet.user, userColor);

}

/****************************************************************************/
/* Title: handleUserDisconnect
/* Arguments:none
/* Return value: none
/* Description: handle when a user disconnect
/****************************************************************************/
function handleUserDisconnect(messageData) {

    //console.log( messageData )
    for (var i = 0; i < KolabInReal.currentSquareMembers.length; i++) {
        // If the user already exist in our data
        if (KolabInReal.currentSquareMembers[i].kolabID === messageData.user) {
			
			var previousLock = $doc('div.page').children().filter( function() { return ( $(this).hasClass('background_'+'blue') );});//$('div#lockSection').children().filter( function() { var match = 'rgb(255, 0, 99)'; return ( $(this).css('borderColor') == match );});
			previousLock.removeClass('locked');
			previousLock.removeClass('background_'+'blue');
			
            $doc('div.cursor#' + messageData.user).remove();
            $doc('div.selAnchor#' + messageData.user).remove();
            KolabInReal.currentSquareMembers.splice(i, 1)
            break;
        }
    }

    removeUserCursorManagement(messageData.user);
	
	

}

/****************************************************************************/
/* Title: manageUpdateUserInfo
/* Arguments:none
/* Return value: none
/* Description: update the info of the user
/****************************************************************************/
function manageUpdateUserInfo(userId, messageData) {

    var found = false;
    for (var i = 0; i < KolabInReal.currentSquareMembers.length; i++) {
        // If the user already exist in our data
        if (KolabInReal.currentSquareMembers[i].kolabID == messageData.user) {
            found = true;
        }
    }
	
	if(userId == messageData.user ){
		messageData.content = '#FF0063'
	}

    // This is a new user
    if (!found) {
        var kolabMember = {
            kolabID: messageData.user,
            colorVisible: true,
            color: messageData.content
        }
        KolabInReal.currentSquareMembers.push(kolabMember);
        createCSSRules();
    }

    addUserCursorManagement(messageData.user);

}

/****************************************************************************/
/* Title: manageCursorChangeEvent
/* Arguments:none
/* Return value: none
/* Description: manage and update the cursor/anchor position of the user
/****************************************************************************/
function manageCursorChangeEvent(userColor, userId, paragraphKlb, cursorPosition, anchorKlb, anchorPosition, stackChanges) {

    var sel = {};
    var textElement;
    var parentNode;

    sel.custom = true;

    if (anchorKlb) {
        sel.isCollapsed = false;
        textElement = childAtPos($doc('p.paragraphContainer[klb="' + anchorKlb + '"]'), anchorPosition);
        sel.anchorNode = textElement[0];
        sel.anchorOffset = textElement[1];
        sel.isCollapsed = false;
    } else {
        sel.isCollapsed = true;
        parentNode = $doc('div.selAnchor#' + userId).parent();
        $doc('div.selAnchor#' + userId).remove();

        if (parentNode.length) {
            mergeAllNode($.makeArray($(parentNode)[0].childNodes));
        }
    }

    textElement = childAtPos($doc('p.paragraphContainer[klb="' + paragraphKlb + '"]'), cursorPosition);
    sel.focusNode = textElement[0];
    sel.focusOffset = textElement[1];
    manageSelectionChange(sel, userId, userColor, stackChanges);
}

/****************************************************************************/
/* Title: sendPasteEvent
/* Arguments:none
/* Return value: none
/* Description: send a paste event
/****************************************************************************/
function sendPasteEvent(userId, socket, pasteValue) {

    var msgToSend = {};

    msgToSend.action = 'paste';
    msgToSend.content = pasteValue;
    msgToSend.extra = klbGenerator();

    sendMessage(msgToSend, userId, socket);
}

/****************************************************************************/
/* Title: sendParagraphChangeEvent
/* Arguments:none
/* Return value: none
/* Description: send a paragraph change event
/****************************************************************************/
function sendParagraphChangeEvent(styleAction, styleContent, styleExtra, userId, socket) {

    var msgToSend = {};

    msgToSend.action = styleAction;
    msgToSend.content = styleContent;
    msgToSend.extra = styleExtra;

    sendMessage(msgToSend, userId, socket);
}

/****************************************************************************/
/* Title: sendKeyEventToServer
/* Arguments:none
/* Return value: none
/* Description: send a keyboard action event
/****************************************************************************/
function sendKeyEventToServer(keyAction, keyContent, keyExtra, userId, socket, overwriteAuthor) {

    var msgToSend = {};

    msgToSend.action = keyAction;
    msgToSend.content = keyContent;
    msgToSend.extra = keyExtra;

    if (overwriteAuthor) {
        msgToSend.undo = overwriteAuthor;
    }

    sendMessage(msgToSend, userId, socket);
}

/****************************************************************************/
/* Title: sendPageEvent
/* Arguments:none
/* Return value: none
/* Description: send a pagebreak/newpage event
/****************************************************************************/
function sendPageEvent(pageContent, pageExtra, userId, socket) {

    var msgToSend = {};

    msgToSend.action = 'page';
    msgToSend.content = pageContent;
    msgToSend.extra = pageExtra;

    sendMessage(msgToSend, userId, socket);
}

/****************************************************************************/
/* Title: sendPositionChangeEventToServer
/* Arguments:none
/* Return value: none
/* Description: send a cursor/anchor position change
/****************************************************************************/
function sendPositionChangeEventToServer(cursorPosition, paragraphKlb, anchorPosition, anchorKlb, userId, socket) {

    var msgToSend = {};

    msgToSend.action = 'cursor';
    msgToSend.content = paragraphKlb + ',' + cursorPosition;
    msgToSend.extra = anchorKlb ? anchorKlb + ',' + anchorPosition : null;

    sendMessage(msgToSend, userId, socket);
}

/****************************************************************************/
/* Title: sendClientReady
/* Arguments:none
/* Return value: none
/* Description: send a clientready event, telling the server to send us back
 *				the current editor info (init the communication)
/****************************************************************************/
function sendClientReady(userId, userColor, socket) {

    var msgToSend = {};

    msgToSend.status = 'ready';
	msgToSend.content = userColor;
	
    sendStatus(msgToSend, userId, socket);
}

/****************************************************************************/
/* Title: sendStatus
/* Arguments:none
/* Return value: none
/* Description: send a status message, different from changeset message
/****************************************************************************/
function sendStatus(packet, userId, socket) {

    packet.doc = document.location.pathname.substr(1);
    packet.user = userId;

    socket.emit('status', packet);
}

/****************************************************************************/
/* Title: sendMessage
/* Arguments:none
/* Return value: none
/* Description: send a changeset message
/****************************************************************************/
function sendMessage(packet, userId, socket) {

    //console.log('OUTGOING changeset', packet);

    packet.id = (Math.floor(Math.random() * 10000));
    packet.doc = document.location.pathname.substr(1);
    packet.user = userId;

    socket.emit('changeset', packet);

}

