window.app = window.app || (function(window, undefined) {
	"use strict";
	
	function ready() {
		//console.debug("App is ready");
		var tags = 'london';
		var script = document.createElement('script');
		script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=app.feedLoadCallback&tags=' + tags;
		document.head.appendChild(script);
	}

	function feedLoadCallback(data) {
		console.debug(data);

		var container = document.querySelector(".section.flickr-feed");

		var items = data.items;

		for ( var i=0; i < items.length; i++ ) {
			var imgSrc = items[i].media.m;

			
			var img = document. createElement("img");
			img.src = imgSrc;
			img.className = "flickr-feed-thumb";

			container.appendChild(img);

		}


	}	

	function ready2() {
		console.debug("App2 is ready");



	}

	// Some changes to the JS

	return Object.freeze({
		ready: ready,
		feedLoadCallback: feedLoadCallback,
		ready2: ready2
	});

})(window);
	





