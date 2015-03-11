///<!-- Original:  Josh Birk  -->

var hiscore;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("score");
    if (user != "") {
        document.getElementById('hiscore').value = user;
		hiscore=user;
    } else {
        if (user != "" && user != null) {
            setCookie("score", 0, 965);
        }
    }
}

function newHi(points){
	 var user = getCookie("score");
	 setCookie("score", points, 965);
}

//<!-- Begin
gamelength=30;
timerID=null
var playing=false;
var numholes=6*10;
var currentpos=-1;
function clrholes() {
for(var k=0;k<document.dmz.elements.length;k++)
document.dmz.elements[k].checked=false;
}
function stoptimer() {
if(playing)
clearTimeout(timerID);
}
function showtime(remtime) {
document.cpanel.timeleft.value=remtime;
if(playing) {
if(remtime==0) {
stopgame();
return;
}
else {
temp=remtime-1;
timerID=setTimeout("showtime(temp)",1000);
      }
   }
}
function stopgame() {
stoptimer();
playing=false;
document.cpanel.timeleft.value=0;
clrholes();
document.getElementById('score1').value = totalhits;
if(totalhits>(document.getElementById('hiscore').value)){
	document.getElementById('hiscore').value = totalhits
	newHi(totalhits);
	hiscore=totalhits;
}
}
function play() {
stoptimer();
if(playing) {
stopgame();
return;
}
playing=true;
clrholes();
totalhits=0;
document.cpanel.score.value=totalhits;
launch();
showtime(gamelength);
}
function launch() {
var launched=false;
while(!launched) {
mynum=random();
if(mynum!=currentpos) {
document.dmz.elements[mynum].checked=true;
currentpos=mynum;
launched=true;
      }
   }
}

function hithead(id) {
if(playing==false) {
clrholes();
return;
}
if(currentpos!=id) {
totalhits+=-1;
document.cpanel.score.value=totalhits;
document.dmz.elements[id].checked=false;
}
else {
totalhits+=1;
document.cpanel.score.value=totalhits;
launch();
document.dmz.elements[id].checked=false;
   }
}

function random() {
return(Math.floor(Math.random()*100%numholes));
}
// End -->