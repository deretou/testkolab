/****************************************************************************
 * Title: initUndoRedoManager
 * @param {string} userId: the Id of the user
 * @param {object} socket: the communication socket
 * @returns {undefined}
 * Description: init the click on the undo/redo buttons
 ****************************************************************************/
function initUndoRedoManager( userId, socket ){
    $('#undo').bind('click', function(){
        var cs = Undo.getElement();
        if( cs ){
            console.log('UNDO: ', cs);
            changesetRouter( cs, 'redo' );
            //sendMessage( cs, userId, socket );
        }
        $('iframe#r_engine')[0].contentWindow.focus();
    });
    $('#redo').bind('click', function(){
        var cs = Redo.getElement();
        if( cs ){
            console.log('REDO: ', cs);
            changesetRouter( cs, 'undo' );
            //sendMessage( cs, userId, socket );
        }
        $('iframe#r_engine')[0].contentWindow.focus();
    });
}

var Undo = (
    function() {
		/*the stack of undo changeset*/
        var undoStack = [];
        
		/****************************************************************************
		* Title: addElement
		* @param {object} cs: the undo changeset
		* @returns {undefined}
		* Description: add a changeset to the stack
		****************************************************************************/
        function addElement( cs ){
            undoStack.push(cs);
        }
        
		/****************************************************************************
		* Title: getElement
		* @returns {undefined}
		* Description: get the last changeset of the stack
		****************************************************************************/
        function getElement(){
            return undoStack.pop();
        }
        
		/****************************************************************************
		* Title: clearStack
		* @returns {undefined}
		* Description: clear the stack
		****************************************************************************/
        function clearStack(){
            undoStack = [];
        }
        
		/****************************************************************************
		* Title: getStyleMap
		* @param {string} userId: the Id of the user
		* @returns {array} the styles map
		* Description: get the style map of the author
		****************************************************************************/
        function getStyleMap( userId ){
            var temp = $doc('div.cursor#' + userId).parents('span[author]').attr('style').split(';');
            temp.pop();
            var attrs = [];
            var values = [];
            for (i = 0; i < temp.length; i++) {
                temp[i] = temp[i].split(':');
                attrs.push(temp[i][0]);
                values.push(temp[i][1]);
            }
            return [attrs, values];
        }
        
        return {
            getElement:getElement,
            addElement:addElement,
            clearStack:clearStack,
            getStyleMap:getStyleMap
        };

    }
)();

var Redo = (
    function() {
		/*the redo stack*/
        var redoStack = [];
        
		/****************************************************************************
		* Title: addElement
		* @param {object} cs: the redo changeset
		* @returns {undefined}
		* Description: add a changeset to the stack
		****************************************************************************/
        function addElement( cs ){
            redoStack.push(cs);
        }
        
		/****************************************************************************
		* Title: getElement
		* @returns {undefined}
		* Description: get the last changeset of the stack
		****************************************************************************/
        function getElement(){
            return redoStack.pop();
        }
        
		/****************************************************************************
		* Title: clearStack
		* @returns {undefined}
		* Description: clear the stack
		****************************************************************************/
        function clearStack(){
            redoStack = [];
        }
        
        return {
            getElement:getElement,
            addElement:addElement,
            clearStack:clearStack
        };

    }
)();

