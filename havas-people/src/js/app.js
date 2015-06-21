window.app = window.app || (function(window, undefined) {
	"use strict";
	
	function ready() {
		console.debug("App is ready");
	}

	function ready2() {
		console.debug("App2 is ready");
	}

	// Some changes to the JS

	return Object.freeze({
		ready: ready,
		ready2: ready2
	});

})(window);
	





