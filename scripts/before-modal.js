/* 
 * JavaScript for Accessible University Demo Site 
 * http://uw.edu/accesscomputing/AU
 *
 * before-modal.js = Inaccessible Modal
 */
  
$(document).ready(function() { 

  // code here 
    
});

		function getWindowSize() {
			//returns an array of windows width and height
			var windowSize = new Array();
			//get available width
			windowSize[0] = window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ?       document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
			//get available height
			windowSize[1] = window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ?  document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
			return windowSize;
		}	
