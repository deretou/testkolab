/****************************************************************************/
/* Title: $doc
 /* Arguments:	param: a jquery selector to search in the iframe
 /*
 /* Return value: a jquery object result from the search or param in iframe body
 /* Description: the shortcut for the jquery search in the iframe body
 /****************************************************************************/
function $doc(param) {
    if (param) {
        return $('iframe#r_engine').contents().children('html').children('body').find(param);
    }
    else {
        return $('iframe#r_engine').contents().children('html').children('body');
    }
}

/****************************************************************************/
/* Title: $klb
 /* Arguments:	param: a klb for line search
 /*
 /* Return value: val1: jquery object for the line specify
 /* Description: return the jquery object of the klb we send to it
 /****************************************************************************/
function $klb(param) {
    return $doc().find('p[klb="' + param + '"]');
}

/****************************************************************************/
/* Title: klbGeneratorGenerator
 /* Arguments:	klbLength: the length of the random string
 /*				check: the name of the attribute
 /*
 /* Return value: val1: a function that creates a unique random string for a
 /* given attribute
 /* Description: creates a function that will generate unique random string
 /* basing on a parameter exemple if u give 5 and klb as parameter it will
 /* create a function that generate five character random string that is never
 /* the same as the already existing klb attributes.
 /****************************************************************************/
function klbGeneratorGenerator(klbLength, check) {
    var alpha = 'abcdefghijklmnopqrstuvwxyz0123456789',
            al = alpha.length,
            klen = klbLength,
            klbs = [],
            failsafe = 1000;

    if (typeof check == "string") {
        $doc('[' + check + ']').each(function() {
            try {
                klbs.push(this.getAttribute(check));
            }
            catch (e) {
            }
        });
    }

    // return the actual generator
    return (function() {
        var i, n, c = 0;

        // create a random string
        // if it exists already, repeat
        do {
            if (c > 750 && check) {
                // run cleanup function
            }
            n = "";
            for (i = 0; i < klen; i++) {
                n += alpha[Math.floor(Math.random() * al)];
            }
            c++;
        } while (klbs.indexOf(n) != -1 && c < failsafe);

        // add to the list of existing strings
        klbs.push(n);

        return n;
    });

}

/****************************************************************************/
/* Title: textOnly
 /* Arguments:	html: an html string that will be parse
 /*
 /* Return value: val1: the text content of the html string
 /* Description: Parse an html string to give only the text without the tags
 /****************************************************************************/
function textOnly(html) {
    // takes each segment, adds only the lengths of the text nodes
    return (html.match(htmlPartsPlus) || []).reduce(function(ac, seg) {
        if (seg[0] != '<') {
            /****************************************************************************/
            /* Description: use to replace all html character by spaces
             /****************************************************************************/
            ac += seg.replace(/&\w{2,7};/g, ' ').length;
        }
        return ac;
    }, 0);
}

/****************************************************************************/
/* Title: childAtPos
 /* Arguments:	elem: a jquery element that we will search in
 /*				position: the position in the text of the element
 /*
 /* Return value:	val1: the node at this position
 /*					val2: the position in the node
 /* Description: This function will search trough the text an element for a
 /* specify position and will return the text node that contain this poistion
 /* and the equivalent position in the node
 /****************************************************************************/
function childAtPos(elem, position) {
    var focus, num, rec;

    // check if there's no element passed
    if (!elem.length) {
        return [null, parseInt(position)];
    }

    //console.log('HERE IS THE ELEMENT : ', position );
    // go through each element
    elem.contents().each(function() {
        //console.log(this);
        //console.log('HERE IS THE ELEMENT EACH : ', this, this.hasOwnProperty('outerHTML'), this.outerHTML );
        // if this is an element, count only text
        if (this.outerHTML != undefined && this.outerHTML.length) {
            //console.log('HERE IS THE ELEMENT EACH 1: ', this, this.hasOwnProperty('outerHTML') );
            num = textOnly(this.outerHTML);
            //console.log('HERE IS THE ELEMENT EACH 1: ', this, this.hasOwnProperty('outerHTML'), num, position, $(this).contents().length );
            // if the position is past this element, simply continue
            if (num < position) {
                position -= num;
            }
            // otherwise, check for child nodes
            else {
                if ($(this).contents().length) {
                    rec = childAtPos($(this), position);
                    focus = rec[0];
                    position = rec[1];

                    //console.log("LAST INFO : ",focus, position);
                }
                return false;
            }
        }
        // if this is a textNode, count length
        else {
            //console.log('HERE IS THE ELEMENT EACH 2: ', this, this.hasOwnProperty('outerHTML'), this.length, position );
            // if the position is past this element, simply continue
            if (this.length < position) {
                position -= this.length;
            }
            // otherwise, this is the one
            else {
                focus = this;
                return false;
            }
        }
    });
    return [focus, parseInt(position)];
}

/****************************************************************************/
/* Title: childPos
 /* Arguments:	thisElement: the element whitin you want to search
 /*				selector: the jquery selector of the element you want to know
 /*				the position
 /*
 /* Return value: val1: the position of the element
 /* Description: this function return the absolute text position of an element
 /* inside another
 /****************************************************************************/
function childPos(thisElement, selector) {
    var arrayOfChild = thisElement.children();
    var count = 0;

    for (var i = 0; i < arrayOfChild.length; i++) {
        if ($(arrayOfChild[i]).find(selector).length) {
            break;
        } else {
            count += $(arrayOfChild[i]).text().length;
        }
    }
    obj = $(arrayOfChild[i]).find(selector)[0];
    while (obj != $(arrayOfChild[i])[0]) {
        var temp = obj.previousSibling;
        if (temp) {
            obj = temp;
            if (obj.nodeType == 3) {
                count += obj.data.length;
            } else {
                count += obj.textContent.length;
            }
        } else {
            obj = obj.parentNode;
        }
    }


    return count;
}

/****************************************************************************/
/* Title: prghSplit
 /* Arguments:	prghChild: the text div in the klb we want to overflow
 /*				pageWidth: the width of the page
 /* Return value: result: the array of all the nodes to overflow with their
 /* styling and authors
 /* Description: it will remove and store all the node that exeed the page 
 /* width and return them whit their styling and author in an array of array
 /****************************************************************************/
function prghSplit(prghChild, userId) {

    var result = [];
    //var c = 0;

    while ($(prghChild).width() > (pageWidth - parseInt(prghChild.parents('p.paragraphContainer').css('padding-left')))/* && c < 75*/) {
        // remove word from this paragraph
        var length;
        /****************************************************************************/
        /* Description: use to match all the spaces
         /****************************************************************************/
        if ($(prghChild).text().match(/ /g) && !($(prghChild).text().match(/ /g).length == 1 && $(prghChild).text().match(/ $/))) {
            var word = htmlPop(prghChild[0]);
            //console.log(word);
            length = word.length;
        } else {
            var nbCaracter = $(prghChild).text().length;
            var width = $(prghChild).width();
            var divider = width / nbCaracter;
            length = (width - pageWidth) / divider;
            length = Math.ceil(length);

        }
        /*if(c >= 50){
         console.log('!!!!!!!!!!---------- LOOP INFO ----------!!!!!!!!!!');
         console.log('word :',word);
         console.log('nbCaracter :',nbCaracter);
         console.log('length :',length);
         console.log('line width :',$(prghChild).width());
         console.log('line length :',$(prghChild).text().length);
         console.log('page width :',pageWidth);
         }*/
        //console.log(length);
        var pos = $(prghChild).text().length - length;
        //console.log(pos);
        var search = childAtPos($(prghChild), pos);
        var node = search[0];
        pos = search[1];
        var previousNode = node;
        if (pos == node.data.length) {
            node = node.nextSibling;
        } else if (pos != 0) {
            node = node.splitText(pos);
        }
        var stack = [];
        var tabParent = [];
        //console.log(node.data);
        while (!$(previousNode).is('div.lineText')) {
            if (!node) {
                previousNode = previousNode.parentNode;
                node = previousNode.nextSibling;
                if (!$(previousNode).is('div.lineText')) {
                    tabParent.push(previousNode);
                }
            } else if (node.nodeType != 3 && !$(node).is('div.cursor#' + userId) && !$(node).is('div#selAnchor') && !$(node).is('div.space')) {
                previousNode = node;
                node = node.childNodes[0];
            } else {
                var style = $(node).parent().attr('style');
                var author = $(node).parent().parent().attr('author');
                stack.unshift([node, style, author]);
                previousNode = node;
                node = node.nextSibling;
            }
        }
        result = result.concat(stack);
        for (i = 0; i < stack.length; i++) {
            if ($(stack[i][0]).is('div.space')) {
                $(stack[i][0]).remove();
                stack[i][0] = document.createTextNode(' ');
            } else {
                $(stack[i][0]).remove();
            }
        }
        stack = [];
        //console.log(nextL.html());
        for (i = 0; i < tabParent.length; i++) {
            //console.log($(tabParent[i]));
            if (!$(tabParent[i]).text().length) {
                $(tabParent[i]).remove();
            }
        }
        /*if(c >= 50){
         console.log('line width :',$(prghChild).width());
         console.log('line length :',$(prghChild).text().length);
         console.log('!!!!!!!!!!---------- LOOP INFO ----------!!!!!!!!!!');
         }
         c++;*/
    }
    return result;

}

/****************************************************************************/
/* Title: prghShift
 /* Arguments:	line: the line that we need to add word too
 /*				nextL: the next line that we will take word from to add to the
 /*				curent line
 /*				pageWidth: the width of the page
 /* Return value: result: the array of all the nodes to underflow with their
 /* styling and authors
 /* Description: it will remove and store all the node that we will add to the
 /* curent line until it reach the page width
 /****************************************************************************/
function prghShift(line, nextL, userId) {
    var shift = true;
    var result = [];
    var lineWidth = parseInt(line.width());
    var overflow = false;
    var wordLength = 0;
    while (shift) {
        //console.log(shift);

        /****************************************************************************/
        /* Description: use to match all spaces
         /****************************************************************************/
        //console.log(line.text()[line.text().length-1]);
        if (nextL.text().match(/ /g) || line.text()[line.text().length - 1] == ' ') {
            var word = htmlShift(nextL[0]);
            //console.log(word);

            wordLength = word.length;
        } else {

            var nbCaracter = line.text().length;

            if (nbCaracter != 0) {
                var divider = lineWidth / nbCaracter;
                wordLength = (pageWidth - lineWidth) / divider;
                wordLength = Math.round(wordLength);
            } else {
                wordLength = 0;
            }

            if (wordLength == 0) {
                wordLength = 1;
            }
            if (wordLength > nextL.text().length) {
                wordLength = nextL.text().length;
            }
            //console.log('=======================Letter by letter========================');
        }

        var pos = wordLength;
        var search = childAtPos(nextL, pos);
        var node = search[0];
        pos = search[1];

        var previousNode = node;
        if (pos == 0) {
            node = node.previousSibling;
        } else if (pos != node.data.length) {
            node = node.splitText(pos);
            node = node.previousSibling;
        }
        var stack = [];
        var tabParent = [];
        //console.log(node);
        while (!$(previousNode).is('div.lineText')) {
            if (!node) {
                previousNode = previousNode.parentNode;
                node = previousNode.previousSibling;
                if (!$(previousNode).is('div.lineText')) {
                    tabParent.push(previousNode);
                }
            } else if (node.nodeType != 3 && !$(node).is('div.cursor#' + userId) && !$(node).is('div#selAnchor')) {
                previousNode = node;
                node = node.childNodes[node.childNodes.length - 1];
            } else {
                var style = $(node).parent().attr('style');
                var author = $(node).parent().parent().attr('author');
                stack.unshift([node, style, author]);
                previousNode = node;
                node = node.previousSibling;
            }
        }
        var width = 0;
        //console.log(stack.length);
        $('#rosenframe_back').append('<span id="invisible" style="visibility: hidden;"></span>');
        //console.log(stack);
        for (i = 0; i < stack.length; i++) {
            if (stack[i][0].nodeType == 3) {
                $('#rosenframe_back').children('#invisible').append('<span style="' + stack[i][1] + '">' + stack[i][0].data + '</span>');
            } else {
                $('#rosenframe_back').children('#invisible').append('<span style="' + stack[i][1] + '">' + stack[i][0].outerHTML + '</span>');
            }
        }
        //console.log($('#rosenframe_back').children('#invisible').html());
        width = $('#rosenframe_back').children('#invisible').width();
        $('#rosenframe_back').children('#invisible').remove();
        //console.log(lineWidth,width);
        //console.log(stack,lineWidth,width);
        if ((lineWidth + width) <= (pageWidth - parseInt(line.parents('div.paragraphContainer').css('padding-left')))) {
            lineWidth = lineWidth + width;
            result = result.concat(stack);
            for (i = 0; i < stack.length; i++) {
                $(stack[i][0]).remove();
            }
            stack = [];
            //console.log(nextL.html());
            for (i = 0; i < tabParent.length; i++) {
                //console.log($(tabParent[i]));
                if (!$(tabParent[i]).text().length) {
                    $(tabParent[i]).remove();
                }
            }
            if (!nextL.html().length) {
                //console.log('if');
                var temp = nextL.parent('div.lineContainer').next('div.lineContainer');
                //console.log(temp);
                nextL.parent().remove();
                if (temp.length) {
                    nextL = temp.children();
                } else {
                    shift = false;
                }
            }
        } else if (line.text().match(/ /g) && !line.text().match(/ $/)) {
            lineWidth = lineWidth + width;
            result = result.concat(stack);
            for (i = 0; i < stack.length; i++) {
                $(stack[i][0]).remove();
            }
            stack = [];
            //console.log(nextL.html());
            for (i = 0; i < tabParent.length; i++) {
                //console.log($(tabParent[i]));
                if (!$(tabParent[i]).text().length) {
                    $(tabParent[i]).remove();
                }
            }
            if (!nextL.html().length) {
                //console.log('if');
                var temp = nextL.parent('div.lineContainer').next('div.lineContainer');
                //console.log(temp);
                nextL.parent().remove();
                if (temp.length) {
                    nextL = temp.children();
                }
            }
            shift = false;
            overflow = true;
        } else {
            shift = false;
        }
    }
    return [result, overflow];
}

/****************************************************************************/
/* Title: htmlShift
 /* Arguments:	element: the element from witch we want to know the first word
 /* Return value: word: the first word of an element including the space after
 /*               and before
 /* Description: parse an element text and return the first word with the space
 /* after and before
 /****************************************************************************/
function htmlShift(element) {
    var text = element.textContent;
    /****************************************************************************/
    /* Description: use to delete the cursor and the selAnchor from the string
     /****************************************************************************/
    text = text.replace(/<div class="cursor"><\/div>|<div class="selAnchor"><\/div>/g, '');
    /****************************************************************************/
    /* Description: use to check if there is a space at the start
     /****************************************************************************/
    if (text.match(/^ /)) {
        /****************************************************************************/
        /* Description: use to match the first word with a space before and one after
         /****************************************************************************/
        word = text.match(/^ *?\S*? |^ *?\S*?$/)[0];
    } else {
        /****************************************************************************/
        /* Description: use to match the first word with a space after
         /****************************************************************************/
        word = text.match(/^\S*? |^\S*?$/)[0];
    }
    return word;
}
/****************************************************************************/
/* Title: htmlPop
 /* Arguments:	element: the element from witch we want to know the last word
 /* Return value: word: the last word of an element including the space after
 /*				 but noy before
 /* Description: parse an element text and return the last word with the space
 /* after but not before
 /****************************************************************************/
function htmlPop(element) {
    //window.console.log('htmlShift');
    var text = element.textContent;
    /****************************************************************************/
    /* Description: use to delete the cursor and the selAnchor from the string
     /****************************************************************************/
    text = text.replace(/<div class="cursor"><\/div>|<div class="selAnchor"><\/div>/g, '');
    //console.log(text);
    /****************************************************************************/
    /* Description: use to check if there is a space at the end
     /****************************************************************************/
    if (text.match(/ $/)) {
        /****************************************************************************/
        /* Description: use to match all the word with space after
         /****************************************************************************/
        word = text.match(/\S+? +/g);
        //console.log(word);
        word = word[word.length - 1];
        //console.log(word);
    } else {
        /****************************************************************************/
        /* Description: use to match the last word
         /****************************************************************************/
        word = text.match(/\S+?$/)[0];
    }
    return word;
}
/*function htmlUnshift(element, add){
 //window.console.log('htmlUnshift');
 var segments = segmenter(element);
 if(add.length){ segments.unshift(add); }
 return combiner(segments);
 }
 function htmlPush(element, add){
 //window.console.log('htmlPush');
 var segments = segmenter(element);
 if(add.length){ segments.push(add); }
 return combiner(segments);
 }*/
// === HTML ARRAY FUNCTIONS
// segmenter
// accepts element, takes element's innerHTML and splits into
//   an array of words with their associated tags
var standalones = {'area': true, 'base': true, 'basefont': true, 'br': true, 'col': true, 'frame': true, 'hr': true, 'img': true, 'input': true, 'link': true, 'meta': true, 'param': true};
function segmenter(element) {
    var tagStack = [];
    // go through each tag/non-tag segment
    //window.console.log("segmenter", element, element.innerHTML, 'bool:', Boolean(element.innerHTML), element.innerHTML.match(htmlPartsPlus));
    if (!element.innerHTML) {
        return [];
    }
    return (function(a) {
        return a ? a : [];
    }(element.innerHTML.match(htmlPartsPlus))).reduce(function(acc, seg) {
        var words = [],
                spaces = [],
                tagname,
                ind, ind1, ind2, sp;

        // if it's a tag
        if (seg.match(htmlParts)) {
            tagName = seg.match(/[^\/<>\s]+/);
            if (tagName.length) {
                if (tagName[0] in standalones) {
                    words.push([seg, tagStack.map(function(c) {
                            return c;
                        })]);
                }
                else {
                    if (seg[1] === "/") {
                        tagStack.pop();
                    }
                    else {
                        tagStack.push(seg);
                    }
                }
            }
        }

        // if it's text, make sure it contains text
        else if (seg == " " || seg.trim()) {
            // get all the spaces
            ind1 = 0;
            while (ind !== -1) {
                ind = seg.indexOf(' ', spaces.length ? spaces[spaces.length - 1] + 1 : 0);
                if (ind !== -1) {
                    spaces.push(ind + 1);
                }
            }

            // push words onto the "words" array, along with the tag stack

            // if there's no spaces, return the whole chunk of text
            if (!spaces.length) {
                words.push([seg, tagStack.map(function(c) {
                        return c;
                    })]);
            }
            else {
                // if the text does not begin with a space, push the initial word
                if (spaces[0] !== 0) {
                    words.push([seg.substring(0, spaces[0]), tagStack.map(function(c) {
                            return c;
                        })]);
                }
                // push each word (including the trailing space)
                for (sp = 1; sp < spaces.length; sp++) {
                    words.push([seg.substring(spaces[sp - 1], spaces[sp]), tagStack.map(function(c) {
                            return c;
                        })]);
                }
                // push the last word if there is one
                if (spaces[spaces.length - 1] < seg.length) {
                    words.push([seg.substring(spaces[spaces.length - 1]), tagStack.map(function(c) {
                            return c;
                        })]);
                }
            }
        }
        return acc.concat(words);
    }, []);
}

// combiner
// accepts an array of text-tags segments
//   and combines them into an html string
function combiner(segments) {
    var tagStack = [];

    // add an empty slot to the segments to close off the tags
    // (dirty, yes, but it works)
    segments.push(["", []]);

    // creates a string for all the given opening tags
    function opening(tags) {
        return tags.reduce(function(acc, tag) {
            if (tagStack.indexOf(tag) !== -1) {
                return acc;
            }
            else {
                tagStack.push(tag);
                return acc + tag;
            }
        }, "");
    }

    // creates a string of closing tags for all tags
    //   that were previously opened, but don't now apply
    function closing(tags) {
        var ts = tagStack.map(function(a) {
            return a;
        });
        tagStack = [];
        return ts.filter(function(tag) {
            // get rid of tags from ts that are not in the current list of tags
            if (tags.indexOf(tag) !== -1) {
                // put back the tag on the stack
                tagStack.push(tag);
                return false;
            }
            return true;
        }).reverse().reduce(function(acc, tag) {
            // create a closing tag and append it
            var stop = tag.indexOf(' ');
            if (stop === -1) {
                stop = tag.indexOf('>');
            }
            return acc + '</' + tag.substring(1, stop) + '>';
        }, "");
    }

    return segments.reduce(function(acc, seg) {
        if (!seg) {
            return acc;
        }
        return acc + closing(seg[1]) + opening(seg[1]) + seg[0];
    }, "");
}

// === HTML PARSERS ===

/****************************************************************************/
/* Description: use to create an array of all the tags in order
 /****************************************************************************/
var htmlParts = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'>])*)\/?>))/g,
        /*******************************************************************************/
        /* Description: use to create an array of all the tags and the non-tags in order
         /*******************************************************************************/
        htmlPartsPlus = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'>])*)\/?>))|[^<>]+/g,
        /****************************************************************************/
        /* Description: use to create an array of all the tags in order even if the 
         /* tags are incomplete
         /****************************************************************************/
        fullOrPartialTags = /[^<>]+>|<[^<>]+>|<+[^<>]+|[<>]/g;

// creates and returns a html-tag
// "debug" mode uses visually distinct characters, for easier identification

/****************************************************************************/
/* Title: htmlHash
 /* Arguments:	debug: set true for visible unicode characters, false otherwise
 /* Return value: val1: An object that contains functions for converting tags
 /*                     into single characters temporarily and storing the
 /*                     tag html code in a hidden object, and restoring it
 /* Description: Creates 
 /****************************************************************************/
function htmlHash(debug) {
// debug: \u5078 (20600)(visible characters)
// normal: \u1a00 (6656 ~6700)(undefined)
    var base = debug ? 20600 : 6700,
            hash = [];
    return {
        give: function(tag) {
            if (tag === "") {
                return "";
            }
            var i, hl = hash.length;
            for (i = 0; i < hl; i++) {
                if (hash[i] == tag) {
                    return String.fromCharCode(base + i);
                }
            }
            hash.push(tag);
            return String.fromCharCode(base + i);
        },
        get: function(symbol) {
            if (symbol === "") {
                return "";
            }
            var index = symbol.charCodeAt(0) - base;
            if (index < 0 || index >= hash.length) {
                return "";
            }
            return hash[index];
        },
        regex: function() {
            var i,
                    hl = hash.length,
                    s = "";
            for (i = 0; i < hl; i++) {
                s += String.fromCharCode(base + i);
            }
            return new RegExp("[" + s + "]", 'g');
        },
        debug: debug ? (function() {
            return hash;
        }) : (function() {
        })
    };
}

/****************************************************************************/
/* Title: previousNodeSearch
 /* Arguments:	actualNode: the actualNode we searching from
 /* Return value: previousNode: 
 /* Description: send the type/previousNode of the actualNode that we are
 /*              starting from
 /****************************************************************************/
function previousNodeSearch(actualNode) {

    var previousNode = actualNode.previousSibling;

    var searching = true;
    while (searching) {
        if (!previousNode) {
            if ($(actualNode).is('span[author]')) {
                previousNode = 'firstLine';
                searching = false;
            } else {
                actualNode = actualNode.parentNode;
                previousNode = actualNode.previousSibling;
            }
        } else if (previousNode.nodeType != 3 && !$(previousNode).is('div.cursor') && !$(previousNode).is('div.selAnchor')) {
            previousNode = previousNode.childNodes[previousNode.childNodes.length - 1];
        } else if ($(previousNode).is('div.cursor') || $(previousNode).is('div.selAnchor') || !previousNode.data.length) {
            previousNode = previousNode.previousSibling;
        } else {
            searching = false;
        }
    }

    return previousNode;
}

/****************************************************************************/
/* Title: nextNodeSearch
 /* Arguments:	actualNode: the actualNode we searching from
 /* Return value: nextNode: 
 /* Description: send the type/nextNode of the actualNode that we are
 /*              starting from
 /****************************************************************************/
function nextNodeSearch(actualNode) {

    var nextNode = actualNode.nextSibling;

    var searching = true;
    while (searching) {
        if (!nextNode) {
            if ($(actualNode).is('span[author]')) {
                nextNode = 'lastLine';
                searching = false;
            } else {
                actualNode = actualNode.parentNode;
                nextNode = actualNode.nextSibling;
            }

        } else if (nextNode.nodeType != 3 && !$(nextNode).is('div.cursor') && !$(nextNode).is('div.selAnchor')) {
            nextNode = nextNode.childNodes[0];
        } else if ($(nextNode).is('div.cursor') || $(nextNode).is('div.selAnchor') || !nextNode.data.length) {
            nextNode = nextNode.nextSibling;
        } else {
            searching = false;
        }
    }

    return nextNode;
}

/****************************************************************************/
/* Title: mergeSpanAuthor
 /* Arguments:	spanAuthor: the currentSpanAuthor we are working from
 /* Return value: none 
 /* Description: if the next or the previous author is the same, merge it.
 /****************************************************************************/
function mergeSpanAuthor(spanAuthor) {
    if (spanAuthor.attr("author") == spanAuthor.next("span[author]").attr("author")) {
        spanAuthor.append(spanAuthor.next("span[author]").children());
        spanAuthor.next("span[author]").remove();
    } else if (spanAuthor.attr("author") == spanAuthor.prev("span[author]").attr("author")) {
        spanAuthor.prepend(spanAuthor.prev("span[author]").html());
        spanAuthor.prev("span[author]").remove();
    }
}

/****************************************************************************/
/* Title: combineAllSpan
 /* Arguments:	initialAuthorSpan: the first author to merge in.
 /*			    styleArray: array of style for each author (use for undo/redo)
 /*			    dataArray: array of coord for each author style (use for undo/redo)
 /*			    index: index of the array.
 /* Return value: none 
 /* Description: merge all the author together without looking for the style
 /****************************************************************************/
function combineAllSpan(initialAuthorSpan, styleArray, dataArray, index) {
    var currentAuthor = initialAuthorSpan;
    var pos = 0;
    styleArray[index].push(initialAuthorSpan.attr('style'));
    dataArray[index].coord.push({start: pos, end: (pos + initialAuthorSpan.text().length)});
    pos += initialAuthorSpan.text().length;
    initialAuthorSpan.nextAll().each(function() {
        styleArray[index].push($(this).attr('style'));
        dataArray[index].coord.push({start: pos, end: (pos + $(this).text().length)});
        pos += $(this).text().length;
        if (currentAuthor.attr('author') == $(this).attr('author')) {
            currentAuthor.append($(this)[0].childNodes);
            $(this).remove();
        } else {
            mergeAllNode($.makeArray($(currentAuthor)[0].childNodes));
            currentAuthor = $(this);
        }
    });
    console.log(styleArray);
    return [styleArray, dataArray];
}


/****************************************************************************
 * Title: stylesEquivalent
 * @param {string} s1: the first style
 * @param {string} s2: the second style
 * @returns {boolean} if they are identical
 * Description: check if two style string have the same properties even if they're not in the same order
 ****************************************************************************/
function stylesEquivalent(s1, s2) {
    if( s1 === s2 ) {
        return true;
    }

    // create arrays, split by semicolon (css)
    var sl1 = s1.split(';'),
        sl2 = s2.split(';'),
        i;

    // remove empty elements, strip excess whitespace
    for( i = sl1.length - 1; i >= 0; i-- ) {
        sl1[i] = sl1[i].toLowerCase().replace(/^\s*/, '').replace(/\s*$/, '').replace(/:\s*/g, '');
        if( sl1[i] === "" ) {
            sl1.splice(i, 1);
        }
    }
    for( i = sl2.length - 1; i >= 0; i-- ) {
        sl2[i] = sl2[i].toLowerCase().replace(/^\s*/, '').replace(/\s*$/, '').replace(/:\s*/g, '');
        if( sl2[i] === "" ) {
            sl2.splice(i, 1);
        }
    }

    // if they are different lengths, they are not the same
    if( sl1.length !== sl2.length ) {
        return false;
    }

    // sort (for a quicker comparison)
    //TODO: the order might matter in some css cases
    //      check cascade order
    sl1.sort();
    sl2.sort();

    // compare each element
    for( i = 0; i < sl1.length; i++ ) {
        if( sl1[i] !== sl2[i] ) {
            return false;
        }
    }

    return true;
}



/****************************************************************************/
/* Title: combineSpanAuthor
/* Arguments:	startSpan: the span from wich we start
/* Arguments:	endSpan: the span where we end
/* Return value:  
/* Description: combine all the same span that have the same author and style in the deffined range
/****************************************************************************/
function combineSpanAuthor(startSpan, endSpan) {
	var span = startSpan;
	var nextSpan;
	var continuer = true;
	while(continuer){
		if(span[0].nextSibling){
			nextSpan = $(span[0].nextSibling);
		}else{ 
			var paragraph = span.parent();
			do{
				if(paragraph[0].nextSibling){
					paragraph = $(paragraph[0].nextSibling);
				}else if(paragraph.parent()[0].nextSibling){
					var page = paragraph.parent()[0].nextSibling;
					if($(page).hasClass('pageBreak')){
						page = page[0].nextSibling;
					}
					var paragraph = $(page.childNodes[0]);
				}else{
					return;
				}
				var search = true;
				if( paragraph[0].childNodes.length >=2 ){
					span = paragraph[0].childNodes[0];
					nextSpan = paragraph[0].childNodes[1];
					search = false;
				}else if(paragraph.find(endSpan)){
					search = false;
					continuer =  false;
					span = null; 
					nextSpan = null;
				}
			}while(search);
		}
		if(span && nextSpan){
			if(nextSpan[0] == endSpan[0]){
				continuer = false;
			}
			if(span.attr('author') == nextSpan.attr('author') && stylesEquivalent(span.attr('style'), nextSpan.attr('style'))){
				span.append(nextSpan[0].childNodes);
				nextSpan.remove();
			}else{
				span = nextSpan;
			}
		}
	}
}

/****************************************************************************/
/* Title: mergeNodeToNext
 /* Arguments:	node: the actualNode we working from
 /* Return value:  
 /* Description: combine the working text node in the next
 /****************************************************************************/
function mergeNodeToNext(actualNode) {
    var mergeNode = actualNode.nextSibling;
    if (mergeNode) {
        if (mergeNode.nodeType == 3) {
            var data = actualNode.data;
            $doc(actualNode).remove();
            mergeNode.insertData(0, data);
        }
    }
}

/****************************************************************************/
/* Title: mergeNodeToPrevious
 /* Arguments:	node: the actualNode we working from
 /* Return value:  
 /* Description: combine the working text node in the previous
 /****************************************************************************/
function mergeNodeToPrevious(actualNode) {
    var mergeNode = actualNode.previousSibling;
    if (mergeNode) {
        if (mergeNode.nodeType == 3) {
            var data = actualNode.data;
            $(actualNode).remove();
            mergeNode.insertData(mergeNode.data.length, data);
        }
    }
}

/****************************************************************************/
/* Title: mergeAllNode
 /* Arguments:	node: the actualNode we working from
 /* Return value:  
 /* Description: combine all the node together to make sure there is no double 
 /* nodetext right next to each other
 /****************************************************************************/
function mergeAllNode(childList) {

    for (var i = childList.length - 1; i > 0; i--) {
        if (childList[i].data == "") {
            $(childList[i]).remove();
        } else if (childList[i].nodeType == 3 && childList[i].nodeType == childList[i - 1].nodeType) {
            mergeNodeToNext(childList[i - 1]);
        }
    }
}

// takes two arrays - one containing css style attributes, the other containing style values
//   and combines them into a css-compatible string
function stylesZip(attrs, values) {
    return attrs.reduce(function(str, att, ind) {
        if (str.length) {
            str += ';';
        }
        str += att;
        str += ':';
        str += values[ind];
        return str;
    }, '');
}

// takes a standard css string - separates it into two arrays, stored in one object
//                               (one containing css style attributes, the other containing style values)
function stylesUnZip(cssString) {
    var obj = {
        style: [],
        value: []
    };
    cssString.split(';').forEach(function(kv) {
        if (kv.length) {
            var pair = kv.split(':');
            obj.style.push(pair[0]);
            obj.value.push(pair[1]);
        }
    });
    return obj;
}

/****************************************************************************/
/* Title: verifyAuthorStyle
 /* Arguments:	thisAuthor: the current authorStyle to verify
 /*			    authorId: the id of the author to verify
 /*			    stylingMap: the map to verify
 /* Return value: true/false 
 /* Description: verify if the current author is the same than the authorId
 /*				 and then verify if the stylingMap is the same as the current style. 
 /****************************************************************************/
function verifyAuthorStyle(thisAuthor, authorId, stylingMap) {
    if (thisAuthor.length && thisAuthor.attr('author') == authorId) {
        for (var i = 0; i < stylingMap.style.length; i++) {
            if (thisAuthor.css(stylingMap.style[i]) != stylingMap.value[i]) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}

/****************************************************************************/
/* Title: wordCount
 /* Arguments:	none
 /* Return value: word count value 
 /* Description: return the number of word in the whole document
 /****************************************************************************/
function wordCount(){
	var text = $doc().text();
	if(!text.length){
		return 0;
	}else{
		text = text.replace(/[-_]/g, '')
		return text.split(/[^A-Za-z0-9]+/).length;
	}
}

/****************************************************************************/
/* Title: pageCount
 /* Arguments:	none
 /* Return value: page count value 
 /* Description: return the number of page in the whole document
 /****************************************************************************/
function pageCount(){
	return $doc('div.page').length;
}

/****************************************************************************
 * Title: applyHeadToText
 * @param {string} userId: the text content
 * @returns {undefined}
 * Description: take a paragraph list from exports or copy and apply the headings in the spans
 ****************************************************************************/
function applyHeadToText(content){
	content = content.replace(/(<p.*?head=".+?".*?>)(.*?)(<\/p>)/, function(search, p, spans, pend){
		var head = p.match(/head="(.*?)"/)[1];
		p = p.replace(/ head="(.*?)"/, '');
		var style = '';
		switch(head){//determine the style from the head parameter
			case 'Title':
				style = 'font-family:arial,helvetica,sans-serif;font-size:48px;font-weight:bold;font-style:normal;text-decoration:none;';
				break;
			case 'Subtitle':
				style = 'font-family:arial,helvetica,sans-serif;font-size:32px;font-weight:normal;font-style:normal;text-decoration:none;';
				break;
			case 'Heading1':
				style = 'font-family:arial,helvetica,sans-serif;font-size:32px;font-weight:bold;font-style:normal;text-decoration:none;';
				break;
			case 'Heading2':
				style = 'font-family:arial,helvetica,sans-serif;font-size:24px;font-weight:normal;font-style:normal;text-decoration:none;';
				break;
			case 'Heading3':
				style = 'font-family:arial,helvetica,sans-serif;font-size:19px;font-weight:normal;font-style:normal;text-decoration:none;';
				break;
			case 'Note':
				style = 'font-family:arial,helvetica,sans-serif;font-size:13px;font-weight:normal;font-style:italic;text-decoration:none;';
				break;
		}
		//apply it
		if(p.match(/style/)){
			p = p.replace(/style="(.*?)"/, 'style="$1' + style + '"');
		}else{
			p = p.replace(/>/, ' style="$1' + style + '">');
		}
		spans = spans.replace(/(<span author.*?style=")(.*?)(">)/, function(tag, start, style, end){
			return (start + style.match(/background-color:.*?;/)[0] +end);
		});
		return (p + spans + pend);
	});
	return content;
}

/****************************************************************************/
/* Title: verifyLink
 /* Arguments:	link: the link to verify
 /* Return value: valid the link
 /* Description: valid that it's a link
 /****************************************************************************/
function verifyLink( link ){
	if(link.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/)){
		return true;
	}else{
		return false;
	}
}