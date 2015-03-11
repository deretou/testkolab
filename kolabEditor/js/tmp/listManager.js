/****************************************************************************
 * Title: initList
 * @param {string} userId: the Id of the user
 * @param {object} socket: the communication socket
 * @returns {undefined}
 * Description: init the click on the lists buttons
 ****************************************************************************/
function initList( userId, socket ){
	$('#listBtn').bind('click', function(){
		List.manageChange( userId, 'bullet' )
	});
	$('#numListBtn').bind('click', function(){
		List.manageChange( userId, 'number' )
	});
}
var List = (
		function() {
			/****************************************************************************
			* Title: manageChange
			* @param {string} userId: the Id of the user
			* @param {string} type: the type of list
			* @returns {undefined}
			* Description: manage if we do a make or a remove list
			****************************************************************************/
			function manageChange( userId, type ){
				var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
				if( !paragraph.attr('listId') ){//if the cursor is not a list make a list of the selection
					makeList( userId, type );
				}else{//else remove list in selection
					removeList( userId, type );
				}
				Cursor.setCursor( userId, "#FF0063" );
			}

			/****************************************************************************
			* Title: makeList
			* @param {string} userId: the Id of the user
			* @param {string} type: the type of list
			* @returns {undefined}
			* Description: turn every paragraph in the selection in list paragraph
			****************************************************************************/
			function makeList( userId, type ){
				if($doc('div.selAnchor#' + userId).length){
					if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
						var pStart = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer');
						var pEnd = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
					}else{
						var pStart = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
						var pEnd = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer');
					}
					var nextP = pStart;
					var id = klbGenerator();
					var numCounter = 1;
					while(nextP[0] != pEnd[0]){//add the class and attr on all p until pend
						nextP.attr('listId',id);
						if(type == 'bullet'){
							nextP.addClass('bullet bullet1 s' + parseInt(nextP.children('span[author]:first').css('font-size')));
						}else{
							nextP.addClass('number number1');
							nextP.children('span[author]:first').attr('order', numCounter);
							nextP.children('span[author]:first').attr('orderContent', convertLevelNumber(numCounter, 1));
							numCounter++;
						}
						if(nextP.next('p.paragraphContainer').length){
							nextP = nextP.next('p.paragraphContainer');
						}else{
							nextP = nextP.parent('div.page').next('div.page').children('p.paragraphContainer:first');
						}
					}
					var nextList = nextP.hasClass(type);
					var nextId = nextP.attr('listId');
					//add class on the pend
					pEnd.attr('listId',id);
					if(type == 'bullet'){
						pEnd.addClass('bulletLast bullet1 s' + parseInt(nextP.children('span[author]:first').css('font-size')));
					}else{
						pEnd.addClass('numberLast number1');
						pEnd.children('span[author]:first').attr('order', numCounter);
						pEnd.children('span[author]:first').attr('orderContent', convertLevelNumber(numCounter, 1));
						numCounter++;
					}
				}else{//if no selection put on the cursor p
					var nextP = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
					var id = klbGenerator();
					var nextList = nextP.hasClass(type);
					var nextId = nextP.attr('listId');
					nextP.attr('listId',id);
					if(type == 'bullet'){
						nextP.addClass('bullet bullet1 s' + parseInt(nextP.children('span[author]:first').css('font-size')));
					}else{
						nextP.addClass('number number1');
						nextP.children('span[author]:first').attr('order', numCounter);
						nextP.children('span[author]:first').attr('orderContent', convertLevelNumber(numCounter, 1));
						numCounter++;
					}
				}
				if(nextList){//if there is a list p after the last p change the listId of the folowing p paragraphs
					if(nextP.next('p.paragraphContainer').length){
						nextP = nextP.next('p.paragraphContainer');
					}else{
						nextP = nextP.parent('div.page').next('div.page').children('p.paragraphContainer:first');
					}
					id = klbGenerator();
					while((nextP.hasClass(type) || nextP.hasClass(type + 'Last')) && nextId == nextP.attr('listId')){
						nextP.attr('listId',id);
						if(nextP.next('p.paragraphContainer').length){
							nextP = nextP.next('p.paragraphContainer');
						}else{
							nextP = nextP.parent('div.page').next('div.page').children('p.paragraphContainer:first');
						}
					}
					if(type == 'number'){
						redistributeNumbers(id);
					}
				}
			}

			/****************************************************************************
			* Title: removeList
			* @param {string} userId: the Id of the user
			* @param {string} type: the type of list
			* @returns {undefined}
			* Description: turn every paragraph in the selection in normal paragraph
			****************************************************************************/
			function removeList( userId, type ){
				if($doc('div.selAnchor#' + userId).length){
					if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
						var pStart = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer');
						var pEnd = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
					}else{
						var pStart = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
						var pEnd = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer');
					}
					var nextP = pStart;

					while(nextP[0] != pEnd[0]){//remove classes/attr on selected p
						nextP.removeAttr('listId');
						if(type == 'bullet'){
							nextP.removeClass('bullet bulletLast bullet1 bullet2 bullet3 bullet4 bullet5 bullet6 s' + parseInt(nextP.children('span[author]:first').css('font-size')));
						}else{
							nextP.removeClass('number numberLast number1 number2 number3 number4 number5 number6');
							nextP.children('span[author]:first').removeAttr('order');
							nextP.children('span[author]:first').removeAttr('orderContent');
						}
						if(nextP.next('p.paragraphContainer').length){
							nextP = nextP.next('p.paragraphContainer');
						}else{
							nextP = nextP.parent('div.page').next('div.page').children('p.paragraphContainer:first');
						}
					}
					var nextList = nextP.hasClass(type);
					var nextId = nextP.attr('listId');
					//remove classes/attr on pend
					pEnd.removeAttr('listId');
					if(type == 'bullet'){
						pEnd.removeClass('bullet bulletLast bullet1 bullet2 bullet3 bullet4 bullet5 bullet6 s' + parseInt(nextP.children('span[author]:first').css('font-size')));
					}else{
						pEnd.removeClass('number numberLast number1 number2 number3 number4 number5 number6');
						pEnd.children('span[author]:first').removeAttr('order');
						pEnd.children('span[author]:first').removeAttr('orderContent');
					}
				}else{//unique p
					var pStart = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
					var nextP = pStart;
					var nextList = nextP.hasClass(type);
					var nextId = nextP.attr('listId');
					nextP.removeAttr('listId');
					if(type == 'bullet'){
						nextP.removeClass('bullet bulletLast bullet1 bullet2 bullet3 bullet4 bullet5 bullet6 s' + parseInt(nextP.children('span[author]:first').css('font-size')));
					}else{
						nextP.removeClass('number numberLast number1 number2 number3 number4 number5 number6');
						nextP.children('span[author]:first').removeAttr('order');
						nextP.children('span[author]:first').removeAttr('orderContent');
					}
				}

				//if the prev p is a normal list it becomes a end of list
				if(pStart.prev('p.paragraphContainer').length){
					var prevP = pStart.prev('p.paragraphContainer');
				}else if(pStart.prev('div.page')){
					var prevP = pStart.parent('div.page').prev('div.page').children('p.paragraphContainer:last');
				}
				if(prevP.length && prevP.hasClass(type)){
					prevP.removeClass(type);
					prevP.addClass(type + 'Last');
				}
				var id = klbGenerator();
				if(nextList){//redistribute new id for next list
					if(nextP.next('p.paragraphContainer').length){
						nextP = nextP.next('p.paragraphContainer');
					}else{
						nextP = nextP.parent('div.page').next('div.page').children('p.paragraphContainer:first');
					}
					id = klbGenerator();
					while((nextP.hasClass(type) || nextP.hasClass(type + 'Last'))){
						nextP.attr('listId',id);
						if(nextP.next('p.paragraphContainer').length){
							nextP = nextP.next('p.paragraphContainer');
						}else{
							nextP = nextP.parent('div.page').next('div.page').children('p.paragraphContainer:first');
						}
					}
					console.log('bob');
					if(type == 'number'){
						console.log('bob2');
						redistributeNumbers(id);
					}
				}
			}

			/****************************************************************************
			* Title: increaseLevel
			* @param {object} paragraph: the paragraph we want to increase level
			* @returns {undefined}
			* Description: increase a paragraph list level
			****************************************************************************/
			function increaseLevel( paragraph ){
				var classAttr = paragraph.attr('class');
				var level;
				var type;
				classAttr = classAttr.replace(/(bullet|number)(\d)/, function(search, t, l){//search the level class and increase the number
					level = l;
					type = t;
					level = parseInt(level);
					if(level < 6){
						level++;
					}
					return type + level;
				});
				paragraph.attr('class', classAttr);
				if(type == 'number'){
					redistributeNumbers(paragraph.attr('listId'));
				}
			}

			/****************************************************************************
			* Title: decreaseLevel
			* @param {object} paragraph: the paragraph we want to decrease level
			* @returns {undefined}
			* Description: decrease a paragraph list level
			****************************************************************************/
			function decreaseLevel( paragraph ){
				var remove = false;
				var level;
				var type;
				var classAttr = paragraph.attr('class');
				classAttr = classAttr.replace(/(bullet|number)(\d)/, function(search, t, l){//search the level class and decrease the number
					level = l;
					type = t;
					level = parseInt(level);
					if(level == 1){
						remove = true;
					}else{
						level--;
					}
					return type + level;
				});
				console.log(remove);
				if(remove){//if the decrease make it back to normal p
					//normalize
					paragraph.removeAttr('listId');
					if(type == 'bullet'){
						paragraph.removeClass('bullet bulletLast bullet1 bullet2 bullet3 bullet4 bullet5 bullet6 s' + parseInt(nextP.children('span[author]:first').css('font-size')));
					}else{
						paragraph.removeClass('number numberLast number1 number2 number3 number4 number5 number6');
						paragraph.children('span[author]:first').removeAttr('order');
						paragraph.children('span[author]:first').removeAttr('orderContent');
					}
				
					//if prev not end list it become end list
					if(paragraph.prev('p.paragraphContainer').length){
						var prevP = paragraph.prev('p.paragraphContainer');
					}else{
						var prevP = paragraph.parent('div.page').prev('div.page').children('p.paragraphContainer:last');
					}
					if(prevP.length && prevP.hasClass('bullet')){
						prevP.removeClass('bullet');
						prevP.addClass('bulletLast');
					}

					//if there is a list after redistribute listId and number if needed
					if(paragraph.next('p.paragraphContainer').length){
						var nextP = paragraph.next('p.paragraphContainer');
					}else{
						var nextP = paragraph.parent('div.page').next('div.page').children('p.paragraphContainer:first');
					}
					var id = klbGenerator();
					while(nextP.length && (nextP.hasClass('bullet') || nextP.hasClass('bulletLast'))){
						nextP.attr('listId',id);
						if(nextP.next('p.paragraphContainer').length){
							nextP = nextP.next('p.paragraphContainer');
						}else{
							nextP = nextP.parent('div.page').next('div.page').children('p.paragraphContainer:first');
						}
					}
					if(type == 'number'){
						redistributeNumbers(id);
					}
				}else{//if not remove 
					paragraph.attr('class', classAttr);
					if(type == 'number'){
						var order = 1;
						var lastP = paragraph.prevAll('p.number' + level).last();
						if(lastP && lastP.attr('listId') == paragraph.attr('listId')){
							order = (parseInt(lastP.children('span[author:first').attr('order')) + 1);
						}
						paragraph.children('span[author]:first').attr('order', order);
						paragraph.children('span[author]:first').attr('orderContent', convertLevelNumber(order, level));
					}
					if(type == 'number'){
						redistributeNumbers(paragraph.attr('listId'));
					}
				}
			}
			
			/****************************************************************************
			* Title: changeSize
			* @param {object} paragraph: the paragraph we want to change the size
			* @returns {undefined}
			* Description: change the size of the bullets
			****************************************************************************/
			function changeSize( paragraph ){//change the bullet size according to first span
				if( paragraph.hasClass('bullet') || paragraph.hasClass('bulletLast')){
					var fontSize = paragraph.children('span[author]:first').css('font-size');
					paragraph.attr('class', paragraph.attr('class').replace(/s\d{1,2}/, 's'+parseInt(fontSize)));
				}
			}
			
			/****************************************************************************
			* Title: convertLevelNumber
			* @param {int} numCounter: the numeral position in the list
			* @param {int} level: the list level
			* @returns {undefined}
			* Description: convert the numeral value of the position into the appropriate string for the level
			****************************************************************************/
			function convertLevelNumber(numCounter, level){
				console.log(numCounter);
				switch(level){
					case 1:
						return (numCounter + '.');
						break;
					case 2:
						return (convertAlpha(numCounter) + '.');
						break;
					case 3:
						return (convertRoman(numCounter) + '.');
						break;
					case 4:
						return (numCounter + ')');
						break;
					case 5:
						return (convertAlpha(numCounter) + ')');
						break;
					case 6:
						return (convertRoman(numCounter) + ')');
						break;
				}
			}
			
			/****************************************************************************
			* Title: convertAlpha
			* @param {int} n: the numeral position in the list
			* @returns {undefined}
			* Description: convert a number in letter
			****************************************************************************/
			function convertAlpha(n){
				 var string = "",
                    m;
                while(n>0){
                    m = (n-1)%26;
                    string = "abcdefghijklmnopqrstuvwxyz"[m] + string;
                    n = Math.floor((n-m)/26);
                }
                return string;
			}
			
			/****************************************************************************
			* Title: convertRoman
			* @param {int} n: the numeral position in the list
			* @returns {undefined}
			* Description: convert a number in roman numeral
			****************************************************************************/
			function convertRoman(num){
				if (!+num)
                    return false;
                var digits = String(+num).split(""),
                    key = ["","c","cc","ccc","cd","d","dc","dcc","dccc","cm",
                           "","x","xx","xxx","xl","l","lx","lxx","lxxx","xc",
                           "","i","ii","iii","iv","v","vi","vii","viii","ix"],
                    roman = "",
                    i = 3;
                while (i--){
                    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
                }
                return Array(+digits.join("") + 1).join("m") + roman;
			}
			
			/****************************************************************************
			* Title: convertRoman
			* @param {string} listId: the id of the list
			* @returns {undefined}
			* Description: reaffect the number of a list
			****************************************************************************/
			function redistributeNumbers(listId){
				console.log(listId)
				var counters = [];
				for (i = 0; i < 6; i++) {
					counters.push(1);
				}
				//take all the p and manage different counter for each level when we enter a level every superior level counter are put to zero that allows to distribute order number correctly
				$doc('p[listId="' + listId + '"]').each(function(){
					console.log(counters);
					if($(this).attr('class').match(/number1/)){
						for (i = 1; i < counters.length; i++) {
							counters[i] = 1;
						}
						$(this).children('span[author]:first').attr('order', counters[0]);
						$(this).children('span[author]:first').attr('orderContent', convertLevelNumber(counters[0], 1));
						counters[0]++;
					}else if($(this).attr('class').match(/number2/)){
						for (i = 2; i < counters.length; i++) {
							counters[i] = 1;
						}
						$(this).children('span[author]:first').attr('order', counters[1]);
						$(this).children('span[author]:first').attr('orderContent', convertLevelNumber(counters[1], 2));
						counters[1]++;
					}else if($(this).attr('class').match(/number3/)){
						for (i = 3; i < counters.length; i++) {
							counters[i] = 1;
						}
						$(this).children('span[author]:first').attr('order', counters[2]);
						$(this).children('span[author]:first').attr('orderContent', convertLevelNumber(counters[2], 3));
						counters[2]++;
					}else if($(this).attr('class').match(/number4/)){
						for (i = 4; i < counters.length; i++) {
							counters[i] = 1;
						}
						$(this).children('span[author]:first').attr('order', counters[3]);
						$(this).children('span[author]:first').attr('orderContent', convertLevelNumber(counters[3], 4));
						counters[3]++;
					}else if($(this).attr('class').match(/number5/)){
						for (i = 5; i < counters.length; i++) {
							counters[i] = 1;
						}
						$(this).children('span[author]:first').attr('order', counters[4]);
						$(this).children('span[author]:first').attr('orderContent', convertLevelNumber(counters[4], 5));
						counters[4]++;
					}else if($(this).attr('class').match(/number6/)){
						$(this).children('span[author]:first').attr('order', counters[5]);
						$(this).children('span[author]:first').attr('orderContent', convertLevelNumber(counters[5], 6));
						counters[5]++;
					}
				});
			}
			
			/****************************************************************************
			* Title: manageEnter
			* @param {object} paragraph: the paragraph that we made an enter on
			* @param {object} info: the info needed
			* @returns {undefined}
			* Description: manage the list change on an enter
			****************************************************************************/
			function manageEnter( paragraph, info ){
				if( info.type == 'bullet' ||  info.type == 'bulletLast'){
					if(info.type == 'bulletLast'){
						var prevParagraph = paragraph.prev('p.paragraphContainer');
						prevParagraph.removeClass('bulletLast');
						prevParagraph.addClass('bullet');
					}
					paragraph.addClass(info.type + ' ' + info.level + ' s16');
					paragraph.attr('listId', info.listId);
					changeSize(paragraph);
				}else{
					if(info.type == 'numberLast'){
						var prevParagraph = paragraph.prev('p.paragraphContainer');
						prevParagraph.removeClass('numberLast');
						prevParagraph.addClass('number');
					}
					paragraph.addClass(info.type + ' ' + info.level);
					paragraph.children('span[author]:first').attr('order', info.order);
					paragraph.children('span[author]:first').attr('orderContent', convertLevelNumber(info.order));
				}
				if(info.type == 'number'){
					redistributeNumbers( info.listId );
				}
			}
			
			/****************************************************************************
			* Title: manageEnter
			* @param {object} paragraph: the paragraph that we made an tab in
			* @param {object} info: the info needed
			* @returns {undefined}
			* Description: manage the list change on a tab
			****************************************************************************/
			function manageTab(userId, shift){
				var normal = true;
				if($doc('div.selAnchor#'+userId).length){
					if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {
						var pStart = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer');
						var pEnd = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
					}else{
						var pStart = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
						var pEnd = $doc('div.selAnchor#' + userId).parents('p.paragraphContainer');
					}
					var nextP = pStart;
					while(nextP[0] != pEnd[0]){
						if(nextP.hasClass('bullet') || nextP.hasClass('bulletLast') || nextP.hasClass('number') || nextP.hasClass('numberLast')){
							if(shift){
								decreaseLevel(nextP);
							}else{
								increaseLevel(nextP);
							}
							normal = false;
						}
						if(nextP.next('p.paragraphContainer').length){
							nextP = nextP.next('p.paragraphContainer');
						}else{
							nextP = nextP.parent('div.page').next('div.page').children('p.paragraphContainer:first');
						}
					}
					if(pEnd.hasClass('bullet') || pEnd.hasClass('bulletLast') || pEnd.hasClass('number') || pEnd.hasClass('numberLast')){
						if(shift){
							decreaseLevel(pEnd);
						}else{
							increaseLevel(pEnd);
						}
						normal = false;
					}
				}else{ 
					var paragraph = $doc('div.cursor#' + userId).parents('p.paragraphContainer');
					if(paragraph.hasClass('bullet') || paragraph.hasClass('bulletLast') || paragraph.hasClass('number') || paragraph.hasClass('numberLast')){
						if(shift){
							decreaseLevel(paragraph);
						}else{
							increaseLevel(paragraph);
						}
						normal = false;
					}
				}
				return normal;
			}
			
			return {
				manageChange: manageChange,
				increaseLevel: increaseLevel,
				decreaseLevel: decreaseLevel,
				changeSize: changeSize,
				redistributeNumbers: redistributeNumbers,
				manageEnter: manageEnter
			};

		}
)();