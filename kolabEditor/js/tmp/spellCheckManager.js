/****************************************************************************
 * Title: spellCheck
 * @returns {undefined}
 * Description: pops out the spellcheck box
 ****************************************************************************/
function spellCheck(){
	var paragraphs = $doc('p.background_kolab');
	var htmlString = '';
	for (i = 0; i < paragraphs.length; i++) {//create text areas for each p
		$('body').append('<input id="spellCheck_' + i + '" klb="' + $(paragraphs[i]).attr('klb') + '" type="textarea" style="margin: 5px;display: none;"/>');
		$('#spellCheck_' + i).val($(paragraphs[i]).text());
	}
	$('input[klb]').bind('change', function(e){
		var target = $(e.target);
		var paragraph = $doc('p.paragraphContainer[klb="' + target.attr('klb') + '"]');
		var diff = new diff_match_patch();
		var patches = diff.patch_make(paragraph.text(), target.val());//make the diff between paragraph text and textaerea text
		applySpellCheck(paragraph, patches);
	});
	var o = $('input[klb]').spellCheckInDialog({popUpStyle:'fancybox',theme:'modern', showStatisticsScreen:false});
	o.onDialogClose = function(){
		$('input[klb]').remove();
	}
	
}

/****************************************************************************
 * Title: applySpellCheck
 * @param {object} paragraph: the paragraph we need to apply the changeset
 * @param {object} patches: the array of changes
 * @returns {undefined}
 * Description: apply the changes on one paragraph
 ****************************************************************************/
function applySpellCheck(paragraph, patches){
	//console.log(patches);
	for(i = 0; i < patches.length; i++){
		console.log(patches[i]);
		var pos = 0;
		var nextNode = paragraph[0].childNodes[0];
		var search = true;
		while(search){//find the start node of the patch and the start pos in this node
			if(nextNode.nodeType == 1 && nextNode.nodeName == 'SPAN'){
				nextNode = nextNode.childNodes[0];
			}else if(nextNode.nodeType == 1){
				if(nextNode.nextSibling){
					nextNode = nextNode.nextSibling;
				}else{
					return;
				}
			}else if(nextNode.nodeType == 3){
				if((pos + nextNode.textContent.length) < patches[i].start1){
					pos += nextNode.textContent.length;
					if(nextNode.nextSibling){
						nextNode = nextNode.nextSibling;
					}else{
						nextNode = nextNode.parentNode;
					}
				}else if((pos + nextNode.textContent.length) == patches[i].start1){
					if(nextNode.nextSibling){
						nextNode = nextNode.nextSibling;
					}else{
						nextNode = nextNode.parentNode;
					}
				}else{
					search = false;
				}
			}else{
				return;
			}
		}
		console.log(nextNode)
		pos = patches[i].start1-pos;
		var diffs = patches[i].diffs;
		for (j = 0; j < diffs.length; j++) {
			var charsLength = diffs[j][1].length;
			switch(diffs[j][0]){//spply the diffs
				case 0://no changes just increase pos and change node if necessary
					console.log('none')
					if(diffs[j+1]){
						//console.log(pos, charsLength)
						while((pos + charsLength) > nextNode.length){
							console.log('while', pos, charsLength, nextNode.length);
							charsLength = charsLength - (nextNode.length - pos);
							pos = 0;
							do{
								if(nextNode.nextSibling){
									nextNode = nextNode.nextSibling;
								}else if(nextNode.parentNode.nextSibling){
									nextNode = nextNode.parentNode.nextSibling.childNodes[0];
								}else{
									return;
								}
							}while(nextNode.nodeType != 3);
						}
						pos += charsLength;
						console.log(nextNode, pos)
					}
					break;
				case 1://add text and increase pos
					console.log('add')
					nextNode.insertData(pos, diffs[j][1]);
					pos += charsLength;
					break;
				case -1://remove text and increase pos change node if necessary
					console.log('remove')
					while((pos + charsLength) > nextNode.length){
						var restingChars = (nextNode.length - pos);
						nextNode.deleteData(pos, restingChars);
						charsLength -= restingChars;
						pos = 0;
						do{
							if(nextNode.nextSibling){
								nextNode = nextNode.nextSibling;
							}else if(nextNode.parentNode.nextSibling){
								nextNode = nextNode.parentNode.nextSibling.childNodes[0];
							}else{
								return;
							}
						}while(nextNode.nodeType != 3);
					}
					nextNode.deleteData(pos, charsLength);
					break;
			}
		}
	}
}