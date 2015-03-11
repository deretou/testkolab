function initHistoryManager( userId, socket ){
    $("#userColor").bind("click", function(){
        toggleCSSRule( userId );
        $('iframe#r_engine')[0].contentWindow.focus();
    });
}


