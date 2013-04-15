(function() {
	
	// Send messages to the parent PhantomJS process via alert! Good times!!
	function sendMessage() {
		var args = [].slice.call(arguments);
		alert(JSON.stringify(args));
	}
	
	console.log('Bridge injected');
	
	var history = [];
	
	// Send history to parent on update
	setTimeout(function sendHistory() {
		
		console.log('Polling history');
		
		var newHistory = Ext.Loader.history.slice();
		
		if(history.length < newHistory.length) {
			sendMessage('extdeps.history', newHistory.slice(history.length));
			history = newHistory;
		}
		
		setTimeout(sendHistory, 50);
		
	}, 50);
	
})();

