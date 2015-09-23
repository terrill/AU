/* 
 * JavaScript for Accessible University Demo Site 
 * http://uw.edu/accesscomputing/AU
 *
 * before-menu.js = Inaccessible Dropdown Menu 
 */
  
$(document).ready(function() { 

  var timeout = 3000; /* milliseconds */
  var timer = 0; 
  var subMenu = false; 
  
  $('#menu li').hover(function() { 
    
    cancelCloseTimer(); 
    
    // close previously open submenu
    if (subMenu) { 
  	  subMenu.hide();
    }

    // get anbd show new submenu
    subMenu = $(this).children('ul');
    subMenu.show();
    
  }) 

  // close submenu 
  function close() {
    if(subMenu) { 
      subMenu.hide();
    }
  }

	// close timer
  function closeTimer() {
	  timer = setTimeout(close, timeout);
  }

	// cancel close timer
	function cancelCloseTimer() {
		if(closeTimer) {
		  clearTimeout(timer);
      timer = null;
		}
  }
  
  // close subMenu when click-out
	document.onclick = close; 
    
});
