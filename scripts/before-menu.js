/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * before-menu.js = Inaccessible Dropdown Menu
 */

$(document).ready(function() {

  var timeout = 3000;
  var timer = 0;
  var subMenu = null;

  // handle mouseover  
  $("#menu > li")
    .on('mouseenter',function(){
      // close previously open submenu
      closeSubMenu();
      // get and show new submenu
      subMenu = $(this).children('ul');
      subMenu.show();
      clearTimeout(timer);
    })
    .parent().mouseout(function(){
      clearTimeout(timer);
      timer = setTimeout(function(){
        closeSubMenu();
      },timeout);
    });

  // close subMenu when click-out
  document.onclick = closeSubMenu;

  // expose submenus when top menu item receives keyboard focus 
  var menuHasFocus = false;
  $("#menu > li> a")
    .on('focus',function(){
      menuHasFocus = true; 
      // close previously open submenu
      closeSubMenu();
      // get and show new submenu
      subMenu = $(this).parent('li').children('ul');
      subMenu.show();
      clearTimeout(timer);
    });

  // close any open submenus when user tabs away 
  $('#menu a').on('focusout',function(event) { 
    // user has tabbed away from a menu item, but is the focus still in the menu? 
    if ($(event.relatedTarget).closest('#menu').length > 0) { 
      // yes - do nothing 
    }
    else { 
      // no - close any open submenus 
      closeSubMenu(); 
    }
  });


  function closeSubMenu() {
    if (subMenu) {
      subMenu.hide();
      subMenu = null;
    }
  }
});
