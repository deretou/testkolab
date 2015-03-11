

// Temporary value;
var KolabInReal = {};
var color = ["green","blue"];


/****************************************************************************/
/* Title: load
/* Arguments:none
/* Return value: none
/* Description: It initialize the iframe and bind the different events
/****************************************************************************/
function load(http_base_editor){
	
	// load the style sheets font and css that has to be modified
	//$('iframe#r_engine').contents().children('html').children('head').append('<link rel="stylesheet" type="text/css" href="css/reset.css" />');
	//$('iframe#r_engine').contents().children('html').children('head').append('<link rel="stylesheet" type="text/css" href="css/normalize.css" />');
	$('iframe#r_engine').contents().children('html').children('head').append('<link rel="stylesheet" type="text/css" href="'+http_base_editor+'css/rosendoc.css" />');	
	$('iframe#r_engine').contents().children('html').children('head').append('<link rel="stylesheet" type="text/css" href="'+http_base_editor+'css/list.css" />');	
//	$('iframe#r_engine').contents().children('html').children('head').append('<link rel="stylesheet" href="http://Rosenda_Engine/jsSC/extensions/fancybox/jquery.fancybox-1.3.4.css" type="text/css" media="screen" />');	
//	$('iframe#r_engine').contents().children('html').children('head').append('<script type="text/javascript" src="http://Rosenda_Engine/jsSC/include.js" ></script>');	
//	$('iframe#r_engine').contents().children('html').children('head').append("<script type='text/javascript' src='http://Rosenda_Engine/jsSC/extensions/fancybox/jquery.fancybox-1.3.4.pack.js' ></script>");	
	//$('iframe#r_engine').contents().children('html').children('head').append('<link href="http://fonts.googleapis.com/css?family=Oxygen:400,700&subset=latin,latin-ext" rel="stylesheet" type="text/css">');	
	
	klbGenerator = klbGeneratorGenerator(5,"klb");// create the klb generator
		
	//Initialize the userId
	kolabID = klbGenerator();
	var userColor = 'green';
	
	//Initialize the communication
	var socket = initMsgManager( kolabID, userColor );
	
	// Set the document 
	init( '', kolabID );
	$('div#myUserColor').css('background-color', userColor);
	
	// Initialization
	BrowserDetect.init();	
	initKeyController( kolabID, socket );
	initStylingManager( kolabID, socket );	
	initSelectionController( kolabID, socket );
	//initSourceController( kolabID, socket );
	initPasteManager( kolabID, userColor, socket );
    initUndoRedoManager( kolabID, socket );
	initLinkManager( kolabID, userColor, socket );
	initImageManager( kolabID, userColor, socket );
	initVideoManager( kolabID, userColor, socket );
	initList( kolabID, socket );
	initExports();
    //initHistoryManager( kolabID, socket );
	pageRender.initializePageControl( kolabID, socket );
	
	
	// ** TEMP VALUE ** //
	KolabInReal.currentSquareMembers = [];
	KolabInReal.authorOrder = [];
	
	$('iframe#r_engine')[0].contentWindow.focus();
	
	manageUpdateUserInfo( kolabID, {user:kolabID,content:userColor});
	
	//$Spelling.SpellCheckAsYouType('all')
}

/****************************************************************************/
/* Title: init
/* Arguments:none
/* Return value: none
/* Description: temporary initialization. USE initClientDocument when server is
 *				ready to save and send the saved current editor.
/****************************************************************************/
function init( kolabID ){
	console.log('TODO : init the client document');
	
	$doc().attr('contentEditable', true );
	$doc().attr('spellcheck', false );
	
	var baseStyle='font-family:arial,helvetica,sans-serif;font-size:16px;background-color:transparent;font-weight:normal;font-style:normal;text-decoration:none;';

	var authorSpan1 = '<span author="rosendaEditor" style="'+baseStyle+'">Welcom the newWelcome to the new rosenda_engine editor on chrome</span>';
	var authorSpanNumber = '<span author="rosendaEditor" style="'+baseStyle+'">123456789 dsfkjhdsfkjh sdfkjdshfkjh sdfkjdshfkh</span>';
	var authorSpan2 = '<span author="'+kolabID+'1" style="'+baseStyle+'">\u200b</span>';
	var authorSpan2img = '<span author="'+kolabID+'1" style="'+baseStyle+'"><img src="https://pbs.twimg.com/profile_images/604644048/sign051.gif" height="200" width="200"></span>';
	var authorSpan3 = '<span author="'+kolabID+'2" style="'+baseStyle+'"> </span>';
	
	$doc().append('<div class="page" id="page1"></div>');
	$doc().children().append('<p class="paragraphContainer" klb="initialKlb">'+authorSpan1+'</p>');
	//$doc().children().append('<p class="paragraphContainer locked background_blue" klb="initialKlb1">'+authorSpanNumber+'</p>');
	$doc().children().append('<p class="paragraphContainer" klb="initialKlb3">'+authorSpan1+'</p>');
	//$doc().children().append('<p class="paragraphContainer" klb="initialKlb2">'+authorSpan2img+'</p>');
	//$doc().children().append('<p class="paragraphContainer locked background_green" klb="initialKlb3">'+authorSpan3+'</p>');
	$doc().children().append('<p class="paragraphContainer" klb="initialKlb4">'+authorSpan3+'</p>');
	
	$doc().append('<div class="page" id="page2"></div>');
	$doc().children(':last').append('<p class="paragraphContainer" klb="initialKlb5">'+authorSpanNumber+'</p>');
}

/****************************************************************************/
/* Title: initClientDocument
/* Arguments: documentStruct
/* Return value: none
/* Description: initialize the document page, pagebreak and paragraphs.
/****************************************************************************/
function initClientDocument( documentStruct ){
		
	$doc().append('<div class="page"></div>');
	var thisPage = $doc().children(':first');	
	
	for( var i = 0; i < documentStruct.length; i++ ){		
		if( documentStruct[i] == 'pageBreak' ){
			thisPage.after('<div class="pageBreak"></div>');
			thisPage.after('<div class="page"></div>');
			thisPage = $( thisPage[0].nextSibling.nextSibling );
		}else{
			thisPage.append( documentStruct[i] );
			pageRender.pageOverflow( thisPage );
			thisPage = $doc().children(':last');
		}		
	}
}

/****************************************************************************/
/* Title: initUsersPosition
/* Arguments: 
/* Return value: none
/* Description: initialize the positions of the current online users.
/****************************************************************************/
function initUsersPosition( userId, usersInfo ){	
	for( var i = 0; i < usersInfo.length; i++ ){
		var cursorPos = usersInfo[i].pos;
		var cursorKlb = usersInfo[i].klb;
		var anchorPos = usersInfo[i].apos ? usersInfo[i].apos : null;
		var anchorKlb = usersInfo[i].aklb ? usersInfo[i].aklb : null;
		manageCursorChangeEvent( usersInfo[i].userColor, usersInfo[i].id, cursorKlb, cursorPos, anchorKlb, anchorPos );
		Cursor.setCursor( usersInfo[i].user, usersInfo[i].color );
		
		manageUpdateUserInfo( userId, { user:usersInfo[i].user, content:usersInfo[i].color} );
	}	
}


