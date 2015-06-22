window.app = window.app || (function(window, undefined) {
	"use strict";
	
	var savedImages = [];
	var eventType = "ontouchstart" in window ? "touchend" : "click";

	var mobileMenuVisible = false;

	function ready() {
		//console.debug("App is ready");
		var tags = "london";
		var script = document.createElement("script");
		script.src = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=app.feedLoadCallback&tags=" + tags;
		
		var docHead = document.head || document.getElementsByTagName("head")[0];

		docHead.appendChild(script);

		var menuButtonElm = document.querySelector(".navbar-menu-button");

		var mobileMenuEl = document.querySelector(".nav-mobile");

		menuButtonElm.onclick = function(e) {

			mobileMenuEl.className = "nav-mobile";

			if ( !mobileMenuVisible ) {
				mobileMenuEl.className += " nav-mobile__animate_out";
			} 

			mobileMenuVisible = !mobileMenuVisible;

		};
	}


	function updateLocalStorage() {
		if ( "localStorage" in window ) {
			window.localStorage["saved-images"] = JSON.stringify(savedImages);
		}
	}

	function checkLocalStorageForSavedImages() {
		if ( "localStorage" in window ) {
			var lsSavedImages = window.localStorage["saved-images"];

			if ( typeof lsSavedImages === "string" ) {
				savedImages = JSON.parse(lsSavedImages);
			}
		}
	}


	function inputHandler(link) {

		return function(e) {

			if ( typeof this.className === "string" ) {
				var classesArray = this.className.split(" ");
			
				var selectedClassIndex = classesArray.indexOf("flicker-feed-thumb__selected");

				if ( !!~selectedClassIndex ) {
					// remove the class
					classesArray.splice(selectedClassIndex, 1);

					// remove it from the array
					var savedNameIndex = classesArray.indexOf(link);

					if ( !!~savedNameIndex ) {

						savedImages.splice(savedNameIndex, 1);

					} else {
						console.error("Whoops couldn't find the image " +  link + " in the array");
					}

				} else {
					// add the class
					classesArray.push("flicker-feed-thumb__selected");
					savedImages.push(link);	
				}

				
				this.className = classesArray.join( " " );
				updateLocalStorage();


		
			}
			

		};

	}

	function feedLoadCallback(data) {
		console.debug(data);

		var container = document.querySelector(".section.flickr-feed");

		var items = data.items;

		checkLocalStorageForSavedImages();

		for ( var i=0; i < items.length; i++ ) {
			var imgSrc = items[i].media.m;

			
			var img = document. createElement("img");
			img.src = imgSrc;
			
			var classString = "flickr-feed-thumb";

			if ( !!~savedImages.indexOf(items[i].link) ) {
				classString += " flicker-feed-thumb__selected";
			}

			img.className = classString;


		
			img.addEventListener(eventType, inputHandler(items[i].link));

			container.appendChild(img);

		}
	}	

	// Some changes to the JS

	return {
		ready: ready,
		feedLoadCallback: feedLoadCallback,
	};

})(window);
	





