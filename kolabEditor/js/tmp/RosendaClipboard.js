var RosendaClipboard = (
		function() {
			var clipboardData = '';
                        
                        function getData(){
                            return clipboardData;
                        }
                        
                        function setData( text ){
                            clipboardData = text;
                        }
                        
			return {
				getData:getData,
                                setData:setData
			};

		}
)();


