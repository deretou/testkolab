var $dyncss = function (){
    var dst = $('iframe#r_engine').contents().children('html').children('head').children('style[title="dynamicstyle"]');
    if(!dst.length){
        $('iframe#r_engine').contents().children('html').children('head').append('<style title="dynamicstyle"></style>');
        dst = $('iframe#r_engine').contents().children('html').children('head').children('style[title="dynamicstyle"]');
    }
    return dst;
};

// Goes through all the members in the square, and creates a new rule for each
// Places (replaces) the rules into the dynamicstyle style tag
function createCSSRules(){
    if(typeof KolabInReal != "object" || !KolabInReal.hasOwnProperty('currentSquareMembers')){
        return;
    }
    var lines = "";
    KolabInReal.currentSquareMembers.forEach(function (m){
        // if colorVisible (a custom property) is set and set to true
        // then turn that colour on
        if(m.hasOwnProperty('colorVisible') && m.colorVisible){
            lines += 'span[author="'+m.kolabID+'"] {color:'+m.color+';}\n';
        }
        // if the variable is not set (this is more likely)
        // then add the colour, and set it to black
        else{
            lines += 'span[author="'+m.kolabID+'"] {color:#000000;}\n';
            m.colorVisible = false;
        }
    });

    // add the lines to the dynamic css tag
    $dyncss().text(lines);
}

// Makes sure that all users are included in the dynamic css rules.
// If someone is missing, add them.
function updateCSSRules(){
    if(typeof KolabInReal != "object" || !KolabInReal.hasOwnProperty('currentSquareMembers')){
        return;
    }
    var changed = false,
        lines = $dyncss().text(),
        members = [],
        temp = -1;

    // parse through the existing lines of the dynamic css tag
    lines.split("\n").forEach(function (m){
        temp = m.indexOf('"', 13);
        if(m.indexOf('span[author="') === 0 && temp !== -1){
            members.push(m.substring(13, temp));
        }
    });

    // parse through all the current square members and check if they're present
    KolabInReal.currentSquareMembers.forEach(function (m){
        if(members.indexOf(m.kolabID) == -1){
            changed = true;
            lines += 'span[author="'+m.kolabID+'"] {color:#000000;}\n';
	    m.colorVisible = false;
        }
    });

    // if lines needed to be added, update the dynamic css text
    if(changed){
        $dyncss().text(lines);
    }
    return changed;
}

function getCSSRule(userid, secondTry){
    var secondTry = typeof secondTry != "undefined" ? secondTry : false;
    var lines = $dyncss().text(),
        temp, temp2,
        value = "";
    lines.split("\n").forEach(function (m){
        if(value){
            return;
        }
        temp = m.indexOf('"', 13);
        if(m.indexOf('span[author="') === 0 && temp !== -1 && m.substring(13, temp) === userid){
            temp = m.indexOf('{color:');
            temp2 = m.indexOf(';', temp+1);
            value = m.substring(temp+7, temp2);
            return;
        }
    });

    // if value is not found
    // update, and try a second time
    // (it should be added and set to black)
    if(!value && !secondTry){
        updateCSSRules();
        value = getCSSRule(userid, true);
    }

    return value;
}

function setCSSRule(userid, newvalue){
    window.console.log(newvalue);
    if(typeof KolabInReal != "object" || !KolabInReal.hasOwnProperty('currentSquareMembers')){
        return;
    }
    var found = false,
        changed = false,
        lines = $dyncss().text().split("\n"),
        temp = -1,
        value = "";
    if(lines[lines.length-1] == ""){
        lines.pop();
    }
    lines.forEach(function (m, ind){
        temp = m.indexOf('"', 13);
        if(m.indexOf('span[author="') === 0 && temp !== -1 && m.substring(13, temp) === userid){
            found = true;
            temp = m.indexOf('{color:');
            temp2 = m.indexOf(';', temp+1);
            value = m.substring(temp+7, temp2);
            window.console.log(value);
            if(value != newvalue){
                changed = true;
                lines[ind] = m.substring(0, temp+7) + newvalue + m.substring(temp2);
            }
        }
    });
    if(!found){
        lines.push('span[author="'+userid+'"] {color:'+newvalue+';}')
        changed = true;
        found = true;
    }
    if(changed){
        $dyncss().text(lines.join("\n"));
    }
    return changed;
}

function toggleCSSRule(userid){
    if(typeof KolabInReal != "object" || !KolabInReal.hasOwnProperty('currentSquareMembers')){
        return;
    }
    var value = getCSSRule(userid),
        color = "",
	user = null;
    // get user's color
    KolabInReal.currentSquareMembers.forEach(function (m){
        if(m.kolabID == userid){
            color = m.color;
        }
    });
    // if value is the user's color, set to black
    if(value == color){
        setCSSRule(userid, '#000000');
        if(user){
            user.colorVisible = false;
        }
    }
    // otherwise, set to the color
    else{
        setCSSRule(userid, color);
        if(user){
            user.colorVisible = true;
        }
    }
}

