/**
 * Initialize the paste and copy events
 * @param {string} userId: the ID of the user
 * @param {object} socket: the socket for messaging to the server
 * @returns {void}
 */
function initPasteManager(userId, userColor, socket) {
    $('iframe#r_engine').contents()[0].addEventListener('paste', function(e) {

        e.preventDefault(true);

        var pasteValue = managePaste(e, userId, 'kolab');
        sendPasteEvent(userId, socket, pasteValue);
        checkToolbarState(userId);
        Cursor.setCursor(userId, "#FF0063");

        var sel = $('iframe#r_engine').contents()[0].getSelection();
        sel.removeAllRanges();
    });

    $('iframe#r_engine').contents()[0].addEventListener('copy', function(e) {

        e.preventDefault(true);

        var text = manageCopy(userId);
        if (text) {
            e.clipboardData.setData("text/html", text);
            e.clipboardData.setData("text", text.replace(/<(span|p).*?>|<\/(span|p)>/g, ""));
        }
    });
    
    $('iframe#r_engine').contents()[0].addEventListener('cut', function(e) {
        e.preventDefault(true);
        
        var text = manageCopy(userId);
        if (text) {
            e.clipboardData.setData("text/html", text);
            e.clipboardData.setData("text", text.replace(/<(span|p).*?>|<\/(span|p)>/g, ""));
        }
        selectionDelete(userId, userColor, 'undo' );
    });
}

/**
 * Manage the copy of the selected text into a formatted version that is sent to clipboard
 * @param {string} userId: the ID of the user
 * @returns {string} the paragraph structure to put in the clipboard
 */
function manageCopy(userId) {
    //window.console.log("I AM THE MANAGER");
    if ($doc('div.selAnchor#' + userId).length) {
        var regexStart, regexEnd, nodeStart, regexSearch, textToCopy, expStart, expEnd;

        // if in the same paragraph
        if ($doc('div.selAnchor#' + userId).parents('p.paragraphContainer').attr('klb') == $doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb')) {
            textToCopy = $doc("div.selAnchor#" + userId).parents('p.paragraphContainer')[0].outerHTML.replace(/<div class="selection(Start|End)?Box".*?><\/div>/g, '');

            if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {//if the anchor is before
                expStart = 'selAnchor';
                expEnd = 'cursor';
            } else {
                expStart = 'cursor';
                expEnd = 'selAnchor';
            }

            //regex to search the content in the selection
            regexSearch = new RegExp('(<p.*?>).*?<div class="' + expStart + '" id="' + userId + '"><\/div>(.*?)<div class="' + expEnd + '" id="' + userId + '"><\/div>.*?</p>');
            //regex for the start selection node
            regexStart = new RegExp('(<div class="' + expStart + '" id="' + userId + '"><\/div>)');
            //regex for the end selection node
            regexEnd = new RegExp('(<div class="' + expEnd + '" id="' + userId + '"><\/div>)');
            nodeStart = $doc('div.' + expStart + '#' + userId);

            textToCopy = textToCopy.replace(regexStart, '$1<span author="' + nodeStart.parents("span[author]").attr("author") + '" style="' + nodeStart.parents("span[author]").attr("style") + '">');//split the span at the start of the sel
            textToCopy = textToCopy.replace(regexEnd, "</span>$1");//split the span at the start of the sel
            textToCopy = textToCopy.replace(regexSearch, "$1$2") + "</p>";// take all the span in the selection and put them in a paragraph
            textToCopy = textToCopy.replace(/<span author=".*?><\/span>/g, "");//delete blank spans
            textToCopy = textToCopy.replace(/class="paragraphContainer.*?"/g, 'class="paragraphContainer"');// assure that there's no other class except paragraphContainer

        } else {
            if ($($doc('div.selAnchor#' + userId + ',div.cursor#' + userId)[0]).is('div.selAnchor#' + userId)) {//if the anchor is before
                expStart = 'selAnchor';
                expEnd = 'cursor';
            } else {
                expStart = 'cursor';
                expEnd = 'selAnchor';
            }

            //the regex that search the content between the start of the selection and the end of the p
            var regexSearchStart = new RegExp('(<p.*?>).*?<div class="' + expStart + '" id="' + userId + '"><\/div>(.*?</p>)');
            //the regex that search the content between the start of the p and the end of the selection
            var regexSearchEnd = new RegExp('(<p.*?>.*?)<div class="' + expEnd + '" id="' + userId + '"><\/div>.*?</p>');
            //the regex for the start of the selection
            regexStart = new RegExp('(<div class="' + expStart + '" id="' + userId + '"><\/div>)');
            //the regex for the end of the selection
            regexEnd = new RegExp('(<div class="' + expEnd + '" id="' + userId + '"><\/div>)');
            nodeStart = $doc('div.' + expStart + '#' + userId);
            var klbStart = nodeStart.parents('p.paragraphContainer');
            var klbEnd = $doc('div.' + expEnd + '#' + userId).parents('p.paragraphContainer');


            var paragraphStart = klbStart[0].outerHTML;
            paragraphStart = paragraphStart.replace(/<div class="selection(Start|End)?Box".*?><\/div>/g, "");//remove the selection
            paragraphStart = paragraphStart.replace(regexStart, '$1<span author="' + nodeStart.parents("span[author]").attr("author") + '" style="' + nodeStart.parents("span[author]").attr("style") + '">');//split the text at the start of the selection
            paragraphStart = paragraphStart.replace(regexSearchStart, "$1$2");// extract the content and put it inside a p
            paragraphStart = paragraphStart.replace(/<span author=".*?><\/span>/g, "");// remove empty spans

            textToCopy = paragraphStart;


            var nextKlb = $(klbStart[0].nextSibling);
            while (!nextKlb.is(klbEnd)) {
                textToCopy += nextKlb[0].outerHTML;
				
				if( !$(nextKlb[0].nextSibling).length && nextKlb.parent()[0].nextSibling ){
					var page = $(nextKlb.parent()[0].nextSibling);
					if(page.hasClass('pageBreak')){
						page = $(page[0].nextSibling);
					}
					nextKlb = page.children(':first');
				}else {
					nextKlb = $(nextKlb[0].nextSibling);
				}
            }

            var paragraphEnd = klbEnd[0].outerHTML;
            paragraphEnd = paragraphEnd.replace(/<div class="selection(Start|End)?Box".*?><\/div>/g, "");//remove the selection
            paragraphEnd = paragraphEnd.replace(regexEnd, '</span>$1');// split the text at the end
            paragraphEnd = paragraphEnd.replace(regexSearchEnd, "$1") + "</p>";// extract the text and put it in a p
            console.log(paragraphEnd);
            paragraphEnd = paragraphEnd.replace(/<span author=".*?><\/span>/g, "");// remove empty spans
            window.console.log(paragraphEnd);
            textToCopy += paragraphEnd;
            textToCopy = textToCopy.replace(/class="paragraphContainer.*?"/g, 'class="paragraphContainer"');// assure that there's no other class except paragraphContainer
			if(textToCopy.match(/<iframe.*?>/)){
				textToCopy = textToCopy.match(/<p class="paragraphContainer.*?>.*?<\/p>/g);
				for (i = 0; i < textToCopy.length; i++) {
					if(textToCopy[i].match(/<iframe.*?>/)){
						textToCopy.splice(i, 1);
						i--;
					}
				}
				textToCopy = textToCopy.join('');
			}
            window.console.log(textToCopy);
			
        }
		
        return applyHeadToText(textToCopy);
    }
    return null;
}

/**
 * Manage the clipboard data to create a kolab structure then call a function to insert it in the editor
 * @param {event} e: the paste event
 * @param {string} userId: the ID of the user
 * @returns {void}
 */
function managePaste(e, userId, userColor) {
    var data = e.clipboardData.getData("text/html");
    var baseStyle = 'font-family:arial,helvetica,sans-serif;font-size:16px;background-color:transparent;font-weight:normal;font-style:normal;text-decoration:none;';
    
    
    if (!data.length == 0) { //if the cliboard data is not html pass to paste brute text

        if (data.match(/<p class="paragraphContainer.*?" klb=".*?>/)) {//intern paste
            data = data.replace(/[\n\r]/g, '').replace(/.+<!--StartFragment-->/, '').replace(/<!--EndFragment-->.+/, '');//remove line breaks and extract the content between start and end fragment
            data = data.replace(/(<p.*?klb=").*?(".*?>)/g, function(tag, start, end) {
                return (start + klbGenerator() + end);
            });
        } else if (data.match(/<w:WordDocument>/)) {// word paste
            data = manageWordPaste(data, userId);
        } else if (data.match(/<.*?CONTENT="OpenOffice.*?>/)) { // open office paste
            data = manageOpenOfficePaste(data, userId);
        } else if (data.match(/<(span|strong|u|i|p).*?>/)) { //html paste
            data = manageHtmlPaste(data, userId);
        } else { // other paste in brute text
            data = $(data).text();
            data = '<p class="paragraphContainer" klb="' + klbGenerator() + '"><span author="rosendaEngine" style="' + baseStyle + '">' + data + '</span></p>';
        }
    } else {
        var data = e.clipboardData.getData("text");
        data = $(data).text();
        data = '<p class="paragraphContainer" klb="' + klbGenerator() + '"><span author="rosendaEngine" style="' + baseStyle + '">' + data + '</span></p>';
    }

    manageInsertHtml(data, userId, userColor, 'undo');
    
    return data;
}

/**
 * Convert MS Word html data to kolab structure
 * @param {string} data: the html data from the clipboard
 * @param {string} userId: the ID of the user
 * @returns {string} the kolab formatted data
 */
function manageWordPaste(data, userId) {
    var baseStyle = 'font-family:arial,helvetica,sans-serif;font-size:16px;background-color:transparent;font-weight:normal;font-style:normal;text-decoration:none;';
    //remove line breaks and extract the content between start and end fragment and remove the unknown tag
    data = data.replace(/[\n\r]/g, '').replace(/.+<!--StartFragment-->/, '').replace(/<!--EndFragment-->.+/, '').replace(/(<.*?>)|(<\/.*?>)/g, function(search, tag) {
        if (tag.match(/<\/?(span|b|u|i|p)/)) {
            return tag;
        } else {
            return "";
        }
    });
    data = data.match(htmlPartsPlus); // split in tag and non-tag
    var level = [];
    level.push(0);//this will contain the level in the html structure
    level.push(""); // this contain the last tag
    window.console.log(level[0]);
    for (i = 0; i < data.length; i++) {
        if (data[i].match(/<p.*?>/)) { // if its a p
            if (data[i].match(/<p.*?style=["'].+?["'].*?>/)) {//if it got a styling
                data[i] = data[i].replace(/<p.*?style=["'](.*?)["'].*?>/g, function(tag, style) {
                    var pStyling = '';
                    var temp = null;
                    //search and convert line-height if not found default
                    temp = style.match(/line-height: ?(150|200|250)%/);
                    if (temp) {
                        switch (temp[1]) {
                            case "150":
                                pStyling += "line-height: 1.5;";
                                break;
                            case "200":
                                pStyling += "line-height: 2.0;";
                                break;
                            case "250":
                                pStyling += "line-height: 2.5;";
                                break;
                        }
                    } else {
                        pStyling += "line-height: normal;"
                    }
                    //search and convert text-align if not found default
                    temp = style.match(/text-align: ?(center|right|justify)/);
                    pStyling += temp != null ? "text-align: " + temp[1] + ";" : 'text-align: left;';
                    return '<p class="paragraphContainer" klb="' + klbGenerator() + '" style="' + pStyling + '">';
                });
            } else {
                data[i] = '<p class="paragraphContainer" klb="' + klbGenerator() + '">';
            }
            level[0] = 1;
            level[1] = data[i];
        } else if (data[i].match(/<\/p>/)) { // closing p tag
            level[0] = 0;
            level[1] = "";
        } else if (data[i].match(/<b.*?>/)) { //bold tag
            window.console.log(level);
            if (i != 0 && data[i - 1].match(/<span.*?>/)) { // if the last tag is a span add the bold in his style and delete the tag
                data[i - 1].replace(/font-weight:.*?;/, "font-weight: bold;");
                data.splice(i, 1);

                level[1] = data[i - 1];
            } else {
                if (level[0] <= 1) { //if we are just inside the p use base style and add bold
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else { // if we are into a span already use this span style and add bold
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/font-weight:.*?;/, "font-weight: bold;");
                if (level[0] == 2) {// if we are in a span split it and prepare the level for split at the end
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<i.*?>/)) { //italic tag
            window.console.log(level[0]);
            if (i != 0 && data[i - 1].match(/<span.*?>/)) {// if the last tag is a span add the italic in his style and delete the tag
                data[i - 1].replace(/font-style:.*?;/, "font-style: italic;");
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                if (level[0] <= 1) {//if we are just inside the p use base style and add italic
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else { // if we are into a span already use this span style and add italic
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/font-style:.*?;/, "font-style: italic;");
                if (level[0] == 2) {// if we are in a span split it and prepare the level for split at the end
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<u.*?>/)) { // underline tag
            window.console.log(level[0]);
            if (i != 0 && data[i - 1].match(/<span.*?>/)) {// if the last tag is a span add the underline in his style and delete the tag
                data[i - 1].replace(/text-decoration:.*?;/, "text-decoration: underline;");
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                if (level[0] <= 1) {//if we are just inside the p use base style and add underline
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else { // if we are into a span already use this span style and add underline
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/text-decoration:.*?;/, "text-decoration: underline;");
                if (level[0] == 2) {// if we are in a span split it and prepare the level for split at the end
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<\/(span|b|i|u)>/)) {// closing tags
            if (i != 0 && data[i - 1].match(/<\/span>/)) {// if there is already a closing span before just remove the tag
                data.splice(i, 1);
                i--;
            } else {
                data[i] = '</span>';
                if (level[0] > 3) {//if we are in multiples level of tag split to have one at the end
                    if (!(i != data.length - 1 && data[i + 1].match(/<\/span>/))) {//if there is no span closing before
                        data[i] += level.pop();
                        level[0]--;
                    }
                } else if (level[0] == 3) {//if we are in  a tag inside a tag just split the tags to have only one level
                    if (!(i != data.length - 1 && data[i + 1].match(/<\/span>/))) {//if there is no span closing before
                        data[i] += level[1];
                        level[0] = 2;
                        level[1] = "";
                    }
                } else {
                    level[0] = 1;
                    level[1] = "";
                }
            }
        } else if (data[i].match(/<span.*?style='.+?'.*?>/)) {// a span style
            var style = data[i].match(/<span.*?style='(.+?)'.*?>/)[1]; //extract the style
            if (i != 0 && data[i - 1].match(/<span.*?>/)) { //if there is a span before take his style for styling base
                var styling = data[i - 1].match(/<span.*?style='(.+?)'.*?>/)[1];
            } else { // else base style
                var styling = baseStyle;
            }
            var temp;
            temp = style.match(/background: ?(yellow|lime|aqua|fuchsia|purple|red|silver)/);//match a background-color that is one of ours
            if (temp) {
                //convert word background in kolab background-color
                styling = styling.replace(/background-color:.*?;/, function() {
                    switch (temp[1]) {
                        case "yellow":
                            return "background-color:#FFFF00;";
                            break;
                        case "lime":
                            return "background-color:#48FF48;";
                            break;
                        case "aqua":
                            return "background-color:#40FFFF;";
                            break;
                        case "fuchsia":
                            return "background-color:#FF82FF;";
                            break;
                        case "purple":
                            return "background-color:#7171FF;";
                            break;
                        case "red":
                            return "background-color:#FF4242;";
                            break;
                        case "silver":
                            return "background-color:#C0C0C0;";
                            break;
                    }
                });
            }
            temp = style.match(/font-size: ?(8|9|10|11|14|16|18|20|22|24|26|28|36|48|72).0pt/);//match a font-size that is one of ours
            if (temp) {
                //convert word font-size in kolab font-size
                styling = styling.replace(/font-size:.*?;/, function() {
                    switch (temp[1]) {
                        case "8":
                            return "font-size: 11px;";
                            break;
                        case "9":
                            return "font-size: 12px;";
                            break;
                        case "10":
                            return "font-size: 13px;";
                            break;
                        case "11":
                            return "font-size: 15px;";
                            break;
                        case "14":
                            return "font-size: 19px;";
                            break;
                        case "16":
                            return "font-size: 22px;";
                            break;
                        case "18":
                            return "font-size: 24px;";
                            break;
                        case "20":
                            return "font-size: 26px;";
                            break;
                        case "22":
                            return "font-size: 29px;";
                            break;
                        case "24":
                            return "font-size: 32px;";
                            break;
                        case "26":
                            return "font-size: 35px;";
                            break;
                        case "28":
                            return "font-size: 37px;";
                            break;
                        case "36":
                            return "font-size: 48px;";
                            break;
                        case "48":
                            return "font-size: 64px;";
                            break;
                        case "72":
                            return "font-size: 96px;";
                            break;
                    }
                });
            }
            //match the font-family tha are accepted
            temp = style.match(/font-family: ?("Arial","sans-serif"|"Arial Black","sans-serif"|"Georgia","serif"|"Impact","sans-serif"|"Lucida Sans Unicode","sans-serif"|"Myriad Pro","sans-serif"|"Tahoma","sans-serif"|"Times New Roman","serif"|"Trebuchet MS","sans-serif"|"Verdana","sans-serif")/);
            if (temp) {
                //convert the font in our font-family
                styling = styling.replace(/font-family:.*?;/, convertFont(temp[1]));
            }
            if (i != 0 && data[i - 1].match(/<span.*?>/)) {//if there is a span before replace is styling
                data[i - 1] = data[i - 1].replace(/(<span.*?style=["']).*?(["'].*?>)/, "$1" + styling + "$2");
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                data[i] = '<span author="' + userId + '" style="' + styling + '">';
                //if we are already in level start the split and prepare for the split end to make it one level
                if (level[0] == 3) {
                    data[i] = "</span>" + [data[i]];
                    level[0] = 3;
                } else if (level[0] > 3) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                    window.console.log(level);
                }
            }
        } else if (data[i].match(/<.*?>/)) {//if its another tag remove it
            data.splice(i, 1);
            i--;
        } else {//if its text
            if (level[0] == 1) {//if its stand alone text wrap in span
                data[i] = '<span author="' + userId + '" style="' + baseStyle + '">' + data[i] + '</span>';
            }
        }
    }
    data = data.join("");
    //remove empty spans
    data = data.replace(/<span .*?>(.*?)<\/span>/g, function(search, content) {
        if (!content.length) {
            return "";
        } else {
            return search;
        }
    });
    return data;
}

/**
 * Convert Open Office html data to kolab structure
 * @param {string} data: the html data from the clipboard
 * @param {string} userId: the ID of the user
 * @returns {string} the kolab formatted data
 */
function manageOpenOfficePaste(data, userId) {
    var baseStyle = 'font-family:arial,helvetica,sans-serif;font-size:16px;background-color:transparent;font-weight:normal;font-style:normal;text-decoration:none;';
    data = data.toLowerCase();
    //remove line breaks and extract the content between start and end fragment and remove the unknown tag
    data = data.replace(/[\n\r]/g, '').replace(/.+<body.*?>/, '').replace(/<\/body>.+/, '').replace(/(<.*?>)|(<\/.*?>)/g, function(search, tag) {
        if (tag.match(/<\/?(span|font|b|u|i|p)/)) {
            return tag;
        } else {
            return "";
        }
    });

    data = data.match(htmlPartsPlus);// split in tag and non-tag
    var level = [0, ""];//container of the level and the last tag
    for (i = 0; i < data.length; i++) {
        //console.log(data[i]);
        if (data[i].match(/<p.*?>/)) {// if its a p
            //console.log("p");
            if (data[i].match(/<p.*?style.*?>/)) { // if theres a style
                data[i] = data[i].replace(/<p.*?style=["'](.*?)["'].*?>/g, function(tag, style) {
                    var pStyling = '';
                    var temp = null;
                    temp = style.match(/line-height: ?(150|200|250)%/);//extract and convert line-height
                    if (temp) {
                        switch (temp[1]) {
                            case "150":
                                pStyling += "line-height: 1.5;";
                                break;
                            case "200":
                                pStyling += "line-height: 2.0;";
                                break;
                            case "250":
                                pStyling += "line-height: 2.5;";
                                break;
                        }
                    } else {
                        pStyling += "line-height: normal;"
                    }
                    temp = tag.match(/align= ?(center|right|justify)/);//extract and convert line-height
                    pStyling += temp != null ? "text-align: " + temp[1] + ";" : 'text-align: left;';
                    return '<p class="paragraphContainer" klb="' + klbGenerator() + '" style="' + pStyling + '">';
                });
            } else {
                data[i] = '<p class="paragraphContainer" klb="' + klbGenerator() + '">';
            }
            level[0] = 1;
            level[1] = data[i];
        } else if (data[i].match(/<\/p>/)) { // closing p tag
            //console.log("</p>");
            level[0] = 0;
            level[1] = "";
        } else if (data[i].match(/<b.*?>/)) { // bold tag
            // console.log("bold");
            if (i != 0 && data[i - 1].match(/<span.*?>/)) { //if the last element is a span add bold to it
                data[i - 1] = data[i - 1].replace(/font-weight:.*?;/, "font-weight: bold;");
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                if (level[0] <= 1) { // if we are not in a span use base style and add bold
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else { //else use the style of the span and add bold
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/font-weight:.*?;/, "font-weight: bold;");
                // check if we are inside a span if so it add tags to makre only a level and prepare to add tags in closing
                if (level[0] == 2) {
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<i.*?>/)) { // italic tag
            //window.console.log("italic");
            if (i != 0 && data[i - 1].match(/<span.*?>/)) { //if the last element is a span add italic to it
                data[i - 1] = data[i - 1].replace(/font-style:.*?;/, "font-style: italic;");
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                if (level[0] <= 1) { // if we are not in a span use base style and add italic
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else { //else use the style of the span and add italic
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/font-style:.*?;/, "font-style: italic;");
                // check if we are inside a span if so it add tags to makre only a level and prepare to add tags in closing
                if (level[0] == 2) {
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<u.*?>/)) { //underline tag
            //window.console.log("underline");
            if (i != 0 && data[i - 1].match(/<span.*?>/)) {//if the last element is a span add underline to it
                data[i - 1] = data[i - 1].replace(/text-decoration:.*?;/, "text-decoration: underline;");
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                if (level[0] <= 1) {// if we are not in a span use base style and add underline
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else {//else use the style of the span and add underline
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/text-decoration:.*?;/, "text-decoration: underline;");
                // check if we are inside a span if so it add tags to makre only a level and prepare to add tags in closing
                if (level[0] == 2) {
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<font.*?size=.*?>/)) { // size tag
            // console.log("size");
            var size = data[i].replace(/<font.*?size=(\d)( .*?style="(.*?)".*?)?>/, function(search, size, optional, style) { //extract the size in px from the size in points
                if (style) {
                    switch (style.match(/font-size: ?(\d{1,2})pt/)[1]) {
                        case "8":
                            return "font-size: 11px;";
                            break;
                        case "9":
                            return "font-size: 12px;";
                            break;
                        case "11":
                            return "font-size: 15px;";
                            break;
                        case "16":
                            return "font-size: 22px;";
                            break;
                        case "20":
                            return "font-size: 26px;";
                            break;
                        case "22":
                            return "font-size: 29px;";
                            break;
                        case "26":
                            return "font-size: 35px;";
                            break;
                        case "28":
                            return "font-size: 37px;";
                            break;
                        case "48":
                            return "font-size: 64px;";
                            break;
                        case "72":
                            return "font-size: 96px;";
                            break;
                        default:
                            return "font-size: 16px;"
                    }
                } else {
                    switch (size) {
                        case "2":
                            return "font-size :13px;";
                            break;
                        case "3":
                            return "font-size :16px;";
                            break;
                        case "4":
                            return "font-size :19px;";
                            break;
                        case "5":
                            return "font-size :24px;";
                            break;
                        case "6":
                            return "font-size :32px;";
                            break;
                        case "7":
                            return "font-size :48px;";
                            break;

                    }
                }
            });
            if (i != 0 && data[i - 1].match(/<span.*?>/)) {//if the last element is a span add font-size to it
                data[i - 1] = data[i - 1].replace(/font-size:.*?;/, size);
                console.log(data[i], data[i + 1]);
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                if (level[0] <= 1) {// if we are not in a span use base style and add font-size
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else {//else use the style of the span and add font-size
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/font-size:.*?;/, size);
                // check if we are inside a span if so it add tags to makre only a level and prepare to add tags in closing
                if (level[0] == 2) {
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<font.*?face=.*?>/)) { //font tag
            //console.log("face");
            var face = convertFont(data[i].match(/<font.*?face="(.*?)".*?>/)[1]);// extract and convert font
            if (i != 0 && data[i - 1].match(/<span.*?>/)) {//if the last element is a span add font to it
                data[i - 1] = data[i - 1].replace(/font-family:.*?;/, face);
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                if (level[0] <= 1) {// if we are not in a span use base style and add font
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else {//else use the style of the span and add font
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/font-family:.*?;/, face);
                // check if we are inside a span if so it add tags to makre only a level and prepare to add tags in closing
                if (level[0] == 2) {
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<span.*?style=.*?>/)) { // color tag
            //console.log("color");
            var color = data[i].replace(/<span.*?style="(.*?").*?>/, function(search, color) {//extract and convert the background-color
                //console.log(color.match(/background: ?(.*?)[" ]/)[1], data[i]);
                switch (color.match(/background: ?(.*?)[" ]/)[1]) {
                    case '#ffff00':
                        return 'background-color: #FFFF00;';
                        break;
                    case '#00ff00':
                        return 'background-color: #48FF48;';
                        break;
                    case '#00ffff':
                        return 'background-color: #40FFFF;';
                        break;
                    case '#ff00ff':
                        return 'background-color: #FF82FF;';
                        break;
                    case '#800080':
                        return 'background-color: #7171FF;';
                        break;
                    case '#ff0000':
                        return 'background-color: #FF4242;';
                        break;
                    case '#c0c0c0':
                        return 'background-color: #C0C0C0;';
                        break;
                    default:
                        return 'background-color: transparent;';
                        break
                }
            });
            if (i != 0 && data[i - 1].match(/<span.*?>/)) {//if the last element is a span add color to it
                data[i - 1] = data[i - 1].replace(/background-color:.*?;/, color);
                data.splice(i, 1);
                level[1] = data[i - 1];
                i--;
            } else {
                if (level[0] <= 1) {// if we are not in a span use base style and add color
                    data[i] = '<span author="' + userId + '" style="' + baseStyle + '">';
                } else {//else use the style of the span and add color
                    data[i] = '<span author="' + userId + '" style="' + level[1].match(/<span.*?style="(.+?)".*?>/)[1] + '">';
                }
                data[i] = data[i].replace(/background-color:.*?;/, color);
                // check if we are inside a span if so it add tags to makre only a level and prepare to add tags in closing
                if (level[0] == 2) {
                    data[i] = "</span>" + data[i];
                    level[0] = 3;
                } else if (level[0] > 2) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 2;
                    level[1] = data[i];
                }
            }
        } else if (data[i].match(/<\/(span|font|b|i|u)>/)) { //closing tag
            //console.log("end tag");
            if (i != 0 && data[i - 1].match(/<\/span>/)) { // if there is already a closing span before delete the current tag
                data.splice(i, 1);
                i--;
            } else {

                data[i] = '</span>';
                // check if we are inside a span if we are add tag to make less level until one level of span
                if (level[0] == 3) {
                    if (!(i != data.length - 1 && data[i + 1].match(/<\/span>/))) {
                        data[i] += level[1];
                        level[0] = 2;
                        level[1] = "";
                    }
                } else if (level[0] > 3) {
                    data[i] = "</span>" + data[i];
                    level[0]++;
                    level.push(data[i]);
                } else {
                    level[0] = 1;
                    level[1] = "";
                }
            }
        } else if (data[i].match(/<.*?>/)) { // unknown tag delete it
            //console.log("tag");
            data.splice(i, 1);
            i--;
        } else { // text
            //console.log("text");
            if (level[0] == 1) { // if its stand-alone text wrap it in a span
                data[i] = '<span author="' + userId + '" style="' + baseStyle + '">' + data[i] + '</span>';
            }
        }
    }
    data = data.join("");
//    data = data.replace(/<span .*?>(.*?)<\/span>/g,function(search, content){
//        if( !content.length ){
//            return "";
//        }else{
//            return search;
//        }
//    });
    return data;
}

/**
 * Convert html data to kolab structure
 * @param {string} data: the html data from the clipboard
 * @param {string} userId: the ID of the user
 * @returns {string} the kolab formatted data
 */
function manageHtmlPaste(data, userId) {
    var baseStyle = 'font-family:arial,helvetica,sans-serif;font-size:16px;background-color:transparent;font-weight:normal;font-style:normal;text-decoration:none;';
    //remove line breaks and extract the content between start and end fragment and remove the unknown tag
    data = data.replace(/[\n\r]/g, '').replace(/.+<!--StartFragment-->/, '').replace(/<!--EndFragment-->.+/, '').replace(/(<.*?>)|(<\/.*?>)/g, function(search, tag) {
        if (tag.match(/<\/?(span|strong|u|i|p|br)/)) {
            return tag;
        } else {
            return "";
        }
    });
    data = data.replace(/<span class="Apple-converted-space">.*?<\/span>/g, " "); //remove the span for spaces
    data = data.replace(/<(span|strong|u|i).*?style="(.*?)".*?>(.*?)<\/(span|strong|u|i)>/g, function(search, tag, style, content) {//extract the style of the span for replacement
        var styling = '';
        var temp;
        //extract and convert font-family and add to styling
        temp = style.match(/font-family:(.*?);/);
        styling += temp != null ? convertFont(temp[1]) : 'font-family: arial,helvetica,sans-serif;';
        //extract and convert font-size and add to styling
        temp = style.match(/font-size: ?(11px|12px|13px|15px|19px|22px|24px|26px|29px|32px|35px|37px|48px|64px|96px);?/);
        styling += temp != null ? 'font-size: ' + temp[1] + ';' : 'font-size: 16px;';
        //extract and convert background-color and add to styling
        temp = style.match(/background-color: ?((rgb(255,255,0)|#FFFF00|#ffff00)|(rgb(72,255,72)|#48FF48|#48ff48))|(rgb(64,255,255)|#40FFFF|#40ffff)|(rgb(255,130,255)|#FF82FF|#ff82ff)|(rgb(113,113,255)|#7171FF|#7171ff)|(rgb(255,66,66)|#FF4242|#ff4242)|(rgb(192,192,192)|#C0C0C0|#c0c0c0);?/);
        styling += temp != null ? 'background-color: ' + temp[1] + ';' : 'background-color: transparent;';
        temp = style.match(/font-weight: ?bold;?/);
        //extract and convert font-weight and add to styling
        styling += temp != null ? 'font-weight: bold;' : 'font-weight: normal;';
        //extract and convert font-style and add to styling
        temp = style.match(/font-style: ?italic;?/);
        styling += temp != null ? 'font-style: italic;' : 'font-style: normal;';
        //extract and convert text-decoration and add to styling
        temp = style.match(/text-decoration: ?underline;?/);
        styling += temp != null ? 'text-decoration: underline;' : 'text-decoration: none;';

        //if its a strong italic or underline tag replace the corresponding property in styling
        if (tag == "strong") {
            if (styling.match(/font-weight:normal;/)) {
                styling.replace(/font-weight:normal;/, "font-weight: bold;");
            } else {
                styling += "font-weight: bold;";
            }
        } else if (tag == "i") {
            if (styling.match(/font-style:normal;/)) {
                styling.replace(/font-style:normal;/, "font-style: italic;");
            } else {
                styling += "font-style: italic;";
            }
        } else if (tag == "u") {
            if (styling.match(/text-decoration:none;/)) {
                styling.replace(/text-decoration:none;/, "text-decoration:underline;")
            } else {
                styling += "text-decoration:underline;";
            }
        }

        return '<span author="rosendaEditor" style="' + styling + '">' + content + '</span>';
    });
    data = data.replace(/<p.*?style="(.*?)".*?>(.*?)<\/p>/g, function(tag, style, content) { // extract and replace the p
        var pStyling = '';
        var sStyling = '';
        var temp = null;
        //extract and convert line-height and add to styling
        temp = style.match(/line-height: ?(1.5|2|2.5);?/);
        pStyling += temp != null ? 'line-height: ' + temp[1] + ';' : 'line-height: normal;';
        //extract and convert text-align and add to styling
        temp = style.match(/text-align: ?(center|right|justify);?/);
        pStyling += temp != null ? 'text-align: ' + temp[1] + ';' : 'text-align: left;';
        //extract and convert padding-left and add to styling
        temp = style.match(/padding-left: ?(30px|60px|90px|120px);?/);
        pStyling += temp != null ? 'padding-left: ' + temp[1] + ';' : 'padding-left: 0px;';

        //normaly if there is those styling in the p there is no span in it
        //extract and convert font-family and add to styling
        temp = style.match(/font-family:(.*?);/);
        sStyling += temp != null ? convertFont(temp[1]) : '';
        //extract and convert font-size and add to styling
        temp = style.match(/font-size: ?(11px|12px|13px|15px|19px|22px|24px|26px|29px|32px|35px|37px|48px|64px|96px);?/);
        sStyling += temp != null ? 'font-size: ' + temp[1] + ';' : '';
        //extract and convert background-color: and add to styling
        temp = style.match(/background-color: ?((rgb(255,255,0)|#FFFF00)|(rgb(72,255,72)|#48FF48))|(rgb(64,255,255)|#40FFFF)|(rgb(255,130,255)|#FF82FF)|(rgb(113,113,255)|#7171FF)|(rgb(255,66,66)|#FF4242)|(rgb(192,192,192)|#C0C0C0);?/);
        sStyling += temp != null ? 'background-color: ' + temp[1] + ';' : '';
        //extract and convert font-weigth and add to styling
        temp = style.match(/font-weight: ?bold;?/);
        sStyling += temp != null ? 'font-weight: bold;' : '';
        //extract and convert font-style and add to styling
        temp = style.match(/font-style: ?italic;?/);
        sStyling += temp != null ? 'font-style: italic;' : '';
        //extract and convert text-decoration and add to styling
        temp = style.match(/text-decoration: ?underline;?/);
        sStyling += temp != null ? 'text-decoration: underline;' : '';
        if (sStyling.lenght) {
            return '<p class="paragraphContainer" klb="' + klbGenerator() + '" style="' + pStyling + '"><span author="rosendaEditor" style="' + sStyling + '">' + content + '</span></p>';
        } else {
            return '<p class="paragraphContainer" klb="' + klbGenerator() + '" style="' + pStyling + '">' + content + '</p>';
        }
    });

    if (!data.match(/<p/)) {//if there is no p wrap all spans in a p
        window.console.log("bob1");
        data = '<p class="paragraphContainer" klb="' + klbGenerator() + '">' + data + '</p>';
        if (data.match(/<br/)) {//if there is br replace them by closing p tag and new p tag
            console.log("br");
            data = data.replace(/(<br.*?>)+/g, '</p><p class="paragraphContainer" klb="' + klbGenerator() + '">');
        }
    } else if (data.match(/<br/)) {//if there is p and br remove br
        data = data.replace(/<br.*?>/, "");
    }
    return data;
}

/**
 * Insert kolab formatted data in the editor
 * @param {string} data: the kolab formatted data
 * @param {string} userId: the ID of the user
 * @returns {void}
 */
function manageInsertHtml(data, userId, userColor, stackChanges ) {
    if(stackChanges == 'undo' || stackChanges == 'redo'){
        var anchor = {};
        anchor.klb = $doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb');
        anchor.pos = evaluateCursorPosInText( userId, 'cursor' );
    }
    if ($doc("div.selAnchor#" + userId).length) {// if there is a selection delete it
        selectionDelete( userId, userColor );
    }
    data = data.match(/<p class="paragraphContainer".*?<\/p>|.*/g); // split in paragraphs and maybe not a paragraph at the end
    for (i = 0; i < data.length; i++) {// if there are tag that are empty delete it if there is no p wrap in a p
        if (!data[i].length) {
            data.splice(i, 1);
            i--;
        } else if (!data[i].match(/<p/)) {
            data[i] = '<p class="paragraphContainer" klb="' + klbGenerator() + '">' + data[i] + '</p>';
        }
    }

    var cursor = $doc("div.cursor#" + userId);
    var author = cursor.parents('span[author]');
    var nextAuthor;

    if ($doc('div.cursor#' + userId)[0].nextSibling && $doc('div.cursor#' + userId)[0].previousSibling) {
        author.after('<span author="' + cursor.parents("span[author]").attr("author") + '" style="' + cursor.parents("span[author]").attr("style") + '"></span>');
        nextAuthor = $(author[0].nextSibling)
        while ($doc('div.cursor#' + userId)[0].nextSibling) {
            nextAuthor.prepend($doc('div.cursor#' + userId)[0].nextSibling);
        }
    }

    if (data.length == 1) {//if there is only one paragraph

        if (!$doc('div.cursor#' + userId)[0].previousSibling) {
            cursor.remove();
            author.before(data[0].replace(/<p.*?>(.*?)<\/span><\/p>/, '$1<div class="cursor" id="' + userId + '"></div></span>'));//re,move the p tag and put the spans after the author ones qhit the cursor in the last one
            author = $(author[0].previousSibling)
        } else {
            cursor.remove();
            author.after(data[0].replace(/<p.*?>(.*?)<\/span><\/p>/, '$1<div class="cursor" id="' + userId + '"></div></span>'));//re,move the p tag and put the spans after the author ones qhit the cursor in the last one
        }

        if (author.attr('author') == author.next("span[author]").attr('author') && author.attr('style') == author.next("span[author]").attr('style')) {
            combineSpanAuthor(author, author.next("span[author]"));
            if (author.attr('author') == author.next("span[author]").attr('author') && author.attr('style') == author.next("span[author]").attr('style')) {
                combineSpanAuthor(author, author.next("span[author]"));
            }
        }

    } else {

        if (!$doc('div.cursor#' + userId)[0].previousSibling) {
            author.after('<span author="' + cursor.parents("span[author]").attr("author") + '" style="' + cursor.parents("span[author]").attr("style") + '"></span>');
            nextAuthor = $(author[0].nextSibling)
            while ($doc('div.cursor#' + userId)[0].nextSibling) {
                nextAuthor.prepend($doc('div.cursor#' + userId)[0].nextSibling);
            }
        }

        nextAuthor = cursor.parents("span[author]")[0].nextSibling;

        var savedData = '', temp;
        //save all the remaining span after the cursor one and delete them
        while (nextAuthor) {
            savedData += nextAuthor.outerHTML;
            temp = nextAuthor.nextSibling;
            $(nextAuthor).remove();
            nextAuthor = temp;
        }
        author.after(data[0].replace(/<p.*?>(.*?)<\/p>/, "$1"));//remove the p of the first paragraph and put the span after the cursor one
        cursor = $doc("div.cursor#" + userId);
        if (author.attr('author') == author.next("span[author]").attr('author') && author.attr('style') == author.next("span[author]").attr('style')) {
            combineSpanAuthor(author, author.next("span[author]"));
        }
        //put all the other paragraph after
        var klb = cursor.parents("p.paragraphContainer");
        cursor.remove();
        for (i = 1; i < data.length; i++) {
            klb.after(data[i]/*.replace(/(<p.*?klb=").*?(".*?>)/, "$1" + klbGenerator() + "$2")*/);
            klb = $(klb[0].nextSibling);
        }

        if (!author[0].childNodes.length) {
            author.remove();
        }

        //console.log(klb[0].outerHtml)
        author = klb.children("span[author]:last");

        author.append('<div class="cursor" id="' + userId + '"></div>')

        //console.log(savedData);
        author.after(savedData);//restore the data after the last span of the last pasted p
        if (author.attr('author') == author.next("span[author]").attr('author') && author.attr('style') == author.next("span[author]").attr('style')) {
            combineSpanAuthor(author, author.next("span[author]"));
        }
    }
    if(stackChanges == 'undo' || stackChanges == 'redo'){
        var cursor = {};
        cursor.klb = $doc('div.cursor#' + userId).parents('p.paragraphContainer').attr('klb');
        cursor.pos = evaluateCursorPosInText( userId, 'cursor' );
    }
    if(stackChanges == 'undo'){
		Undo.addElement('break');
        Undo.addElement({'action':'spec', 'content':'BAK', 'user':userId, 'extra':''});
        Undo.addElement({'action':'cursor', 'content':(cursor.klb + ',' + cursor.pos), 'user':userId, 'extra':(anchor.klb + ',' + anchor.pos)});
    }else if(stackChanges == 'redo'){
		Redo.addElement('break');
        Redo.addElement({'action':'spec', 'content':'BAK', 'user':userId, 'extra':''});
        Redo.addElement({'action':'cursor', 'content':(cursor.klb + ',' + cursor.pos), 'user':userId, 'extra':(anchor.klb + ',' + anchor.pos)});
    }
    setParagraphLock(userId, userColor);
}

/**
 * convert any font family or font face to the propper css font-fammily in kolab environement
 * @param {string} font: the font that we want to convert
 * @returns {void} the converted font-family
 */
function convertFont(font) {
    if (font.match(/[Aa]rial [Bb]lack/)) {
        return 'font-family: arial black,helvetica,sans-serif;';
    } else if (font.match(/[Gg]eorgia/)) {
        return 'font-family: georgia,serif;';
    } else if (font.match(/[Ii]mpact/)) {
        return 'font-family: impact,cursive;';
    } else if (font.match(/[Ll]ucida [Ss]ans [Uu]nicode/)) {
        return 'font-family: lucida sans unicode, lucida grande, sans-serif;';
    } else if (font.match(/[Mm]yriad[- ][Pp]ro/)) {
        return 'font-family: myriad-pro,sans-serif;';
    } else if (font.match(/[Tt]ahoma/)) {
        return 'font-family: tahoma,geneva,sans-serif;';
    } else if (font.match(/[Tt]imes [Nn]ew [Rr]oman/)) {
        return 'font-family: times new roman, times, serif;';
    } else if (font.match(/[Tt]rebuchet [Mm][Ss]/)) {
        return 'font-family: trebuchet ms,helvetica,sans-serif;';
    } else if (font.match(/[Vv]erdana/)) {
        return 'font-family: verdana,geneva,sans-serif;';
    } else {
        return 'font-family: arial,helvetica,sans-serif;';
    }
}