/* Javascript menu based on Simple Javascript Drop Down Menu: 
	http://javascript-array.com/scripts/simple_drop_down_menu/
*/
var timeout	= 3000; /* milliseconds */
var timer = 0;
var subMenu = 0;

// open hidden submenu
function showMenu(id) {	
  // cancel close timer
	cancelCloseTimer();
			
	// close previously open submenu
	if (subMenu) { 
  	subMenu.style.display = 'none';
  }

	// get new submenu and show it
	subMenuId = 'submenu_' + id;
	subMenu = document.getElementById(subMenuId);
	subMenu.style.display = 'block';
}

// close submenu 
function close() {
  if(subMenu) { 
    subMenu.style.display = 'none';
  }

	// close timer
  function closeTimer() {
	  timer = window.setTimeout(close, timeout);
  }

	// cancel close timer
	function cancelCloseTimer() {
		if(closeTimer) {
		  window.clearTimeout(timer);
      timer = null;
		}
  }
	
	// close subMenu when click-out
	document.onclick = close; 
}