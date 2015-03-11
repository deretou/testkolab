function initExports(){
    $('#copyAll').zclip({
        path:'exports/Clipboard/ZeroClipboard10.swf',
        copy:function(){
            var content = $doc().html().replace(/(<div.*?>|<\/div>)/g,'');
            console.log(content);
            return applyHeadToText(content);
        }
    });
    
    $('#copyAllBrute').zclip({
        path:'exports/Clipboard/ZeroClipboard.swf',
        copy:$doc().text()
    });
    
    $('#pdf').bind('click', function(){
        managePdf('D');
    });
    $('#pdfPrint').bind('click', function(){
        managePdf('P');
    });
}

function managePdf( choice ){
    $('#PDFchoice').val( choice );
    var content = $doc().html().replace(/^<div class="page.*?>/, '<page>').replace(/<\/div\>$/, '</page>').replace(/<\/div><div class="page.*?>/g, '</page><br clear=all><page>');
    content = content.replace(/(<div.*?>|<\/div>)/g, '');
	content = content.replace(/<iframe.*?link="(.*?)".*?><\/iframe>/, function(tag, link){
		return '<qrcode value="' + link + '" ec="H" style="width: 50mm; background-color: white; color: black;"></qrcode>';
	});
    $('#PDFcontent').val( applyHeadToText(content) );
    console.log(choice, content);
}