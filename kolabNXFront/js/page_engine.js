var keeplogin=0;
var emergency="";

function cb(){if(BrowserDetect.OS=="Windows"||BrowserDetect.OS=="Mac"){if(BrowserDetect.browser=="Chrome"){return 1}}else if(BrowserDetect.OS=="Linux"){if(BrowserDetect.browser=="Chrome"){var e=navigator.userAgent.toLowerCase();var t=e.indexOf("android")>-1;if(t){return 0}else{return 1}}}return 0}function field(e){$("#"+e).animate({marginLeft:"-5px",opacity:"0.5"},100).animate({marginLeft:"5px"},200).animate({marginLeft:"0px",opacity:"1.0"},100).css({borderColor:"#D90000",backgroundColor:"#FFE1E1"})}function login_try(e){e=e||"10";$("#tryagain").text("Try again in "+e+" minutes");$("#try").slideDown(200)}function login_check(){if(keeplogin==0){$("#check").css({backgroundPosition:"-40px -79px"});$("#check_title").css({color:"#333333"});keeplogin=1}else{$("#check").css({backgroundPosition:"-20px -79px"});$("#check_title").css({color:"#858585"});keeplogin=0}}function login_go(){$(".block").fadeOut(200,"",function(){window.location="main.php"})}function login_code(){$("#login_main_view").fadeOut(260,"",function(){$("#login_code_view").fadeIn(260,"",function(){$("#code").focus()})})}function login_reset(){if($("#login_reset_view").css("display")=="none"){$("#login_main_view").fadeOut(260,"",function(){$("#login_reset_view").fadeIn(260,"",function(){$("#reset_user").focus()})})}else{$("#login_reset_view").fadeOut(260,"",function(){$("#login_main_view").fadeIn(260,"",function(){$("#user").focus()})})}}function loginreset_go(){$("#login_back").css({marginTop:"0px"});$("#reset").slideUp(600,"easeOutExpo",function(){$("#reset_text_1").fadeOut(300,"",function(){$("#reset_text_2").fadeIn(300);setTimeout(function(){login_reset()},2800)})})}function loginnew_click(){if(parseInt($("#login_new").css("height"))<41){setTimeout(function(){$("#email").focus()},300);$("#login_new").removeClass("t01").addClass("t03").css({height:"80px",marginTop:"15px"});$("#data").hide()}else{$("#email").blur();$("#login_new").css("height","40px");$("#data").show()}}function loginnew_go(){loginnew_click();$("#first").fadeOut(300,"",function(){$("#second").fadeIn(300).css("cursor","default")})}function loginnew_resend(){loginnew_click();$("#first").fadeOut(300,"",function(){$("#third").fadeIn(300).css("cursor","default")})}function loginnew_exists(){loginnew_click();$("#first").fadeOut(300,"",function(){$("#forth").fadeIn(300).css("cursor","default")})}function createacc(){$.scrollTo("#bl_login",600,{easing:"easeOutExpo"});setTimeout(function(){loginnew_click()},700)}function begink(){$.scrollTo("#bl_info",800,{easing:"easeOutExpo"})}function topk(){$.scrollTo("#bl_login",800,{easing:"easeOutExpo"})}(function(e){function t(e){return typeof e=="object"?e:{top:e,left:e}}var n=e.scrollTo=function(t,n,r){e(window).scrollTo(t,n,r)};n.defaults={axis:"xy",duration:parseFloat(e.fn.jquery)>=1.3?0:1,limit:true};n.window=function(t){return e(window)._scrollable()};e.fn._scrollable=function(){return this.map(function(){var t=this,n=!t.nodeName||e.inArray(t.nodeName.toLowerCase(),["iframe","#document","html","body"])!=-1;if(!n)return t;var r=(t.contentWindow||t).document||t.ownerDocument||t;return/webkit/i.test(navigator.userAgent)||r.compatMode=="BackCompat"?r.body:r.documentElement})};e.fn.scrollTo=function(r,i,s){if(typeof i=="object"){s=i;i=0}if(typeof s=="function")s={onAfter:s};if(r=="max")r=9e9;s=e.extend({},n.defaults,s);i=i||s.duration;s.queue=s.queue&&s.axis.length>1;if(s.queue)i/=2;s.offset=t(s.offset);s.over=t(s.over);return this._scrollable().each(function(){function o(e){a.animate(c,i,s.easing,e&&function(){e.call(this,f,s)})}if(r==null)return;var u=this,a=e(u),f=r,l,c={},h=a.is("html,body");switch(typeof f){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(f)){f=t(f);break}f=e(f,this);if(!f.length)return;case"object":if(f.is||f.style)l=(f=e(f)).offset()}e.each(s.axis.split(""),function(e,t){var r=t=="x"?"Left":"Top",i=r.toLowerCase(),p="scroll"+r,d=u[p],v=n.max(u,t);if(l){c[p]=l[i]+(h?0:d-a.offset()[i]);if(s.margin){c[p]-=parseInt(f.css("margin"+r))||0;c[p]-=parseInt(f.css("border"+r+"Width"))||0}c[p]+=s.offset[i]||0;if(s.over[i])c[p]+=f[t=="x"?"width":"height"]()*s.over[i]}else{var m=f[i];c[p]=m.slice&&m.slice(-1)=="%"?parseFloat(m)/100*v:m}if(s.limit&&/^\d+$/.test(c[p]))c[p]=c[p]<=0?0:Math.min(c[p],v);if(!e&&s.queue){if(d!=c[p])o(s.onAfterFirst);delete c[p]}});o(s.onAfter)}).end()};n.max=function(t,n){var r=n=="x"?"Width":"Height",i="scroll"+r;if(!e(t).is("html,body"))return t[i]-e(t)[r.toLowerCase()]();var s="client"+r,o=t.ownerDocument.documentElement,u=t.ownerDocument.body;return Math.max(o[i],u[i])-Math.min(o[s],u[s])}})(jQuery);var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string;var r=e[t].prop;this.versionSearchString=e[t].versionSearch||e[t].identity;if(n){if(n.indexOf(e[t].subString)!=-1)return e[t].identity}else if(r)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(t==-1)return;return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};$(document).ready(function(){$(window).load(function(){BrowserDetect.init();if(cb()==1){$("#login_view").show();$("#login_new").show()}else{$("#get_view").show();$("#mainimg").after('<div id="chimg" class="splash chimg"></div>');setTimeout(function(){$("#mainimg").css({opacity:"0"});$("#chimg").css({opacity:"1"})},3400)}$.scrollTo("#bl_login",300);$("#user").focus();$("#login").css({opacity:"1",marginLeft:"0px"});$(".splash").css({right:"0px"});$("#mainimg").css({opacity:"1"});$("#more").delay(1500).slideDown(800,"easeOutElastic");if(keeplogin==1){$("#check").css({backgroundPosition:"-40px -79px"});$("#check_title").css({color:"#333333"})}if(emergency!==""){$("#emergency_message").text(emergency);$("#emergency").delay(1e3).slideDown(600,"easeOutExpo",function(){$(this).fadeTo(600,.5).fadeTo(600,1).fadeTo(600,.5).fadeTo(600,1)})}Mousetrap.bind("enter",function(){if($("input#user").is(":focus")||$("input#pass").is(":focus")){$("#go").click()}else if($("input#email").is(":focus")){$("#create").click()}else if($("input#code").is(":focus")){$("#login_code").click()}else if($("input#reset_user").is(":focus")){$("#reset_user_button").click()}else if($("input#reset_email").is(":focus")){$("#reset_email_button").click()}});$(".button_anim").hover(function(){if(parseInt($("#login_new").css("height"))<41){$(this).removeClass("t03").addClass("t01").css({marginTop:"18px"})}},function(){$(this).removeClass("t01").addClass("t03").css({marginTop:"15px"})});$("#more").hover(function(){$(this).animate({height:"43px"},200)},function(){$(this).animate({height:"40px"},200)});$("#check_sub").hover(function(){if(keeplogin==0){$("#check_title").css({color:"#333333"});$("#check").css({backgroundPosition:"-20px -79px"})}},function(){if(keeplogin==0){$("#check_title").css({color:"#858585"});$("#check").css({backgroundPosition:"0px -79px"})}})})});function loading(e){if(e==1){$("#wait").removeClass("wait_off").addClass("wait_on")}else{$("#wait").removeClass("wait_on").addClass("wait_off")}}