/* 
 * JavaScript for Accessible University Demo Site 
 * http://uw.edu/accesscomputing/AU
 *
 * after-menu.js = Accessible Dropdown menu (aka "Able Menu")
 */
 
/* 
 *  Able Menu is a simplified accessible dropdown menu, heavily influenced by: 
 *
 *  W3C WAI-ARIA Design Pattern for "menu" 
 *  http://www.w3.org/TR/wai-aria-practices/#menu
 *
 *  Adobe Accessible Mega Menu
 *  https://github.com/adobe-accessibility/Accessible-Mega-Menu 
 *  
 *  UW Dropdowns
 *  https://github.com/uweb/uw-2014/blob/master/js/uw.dropdowns.js
 *
 */
 
(function ($) {
  
  $(document).ready(function() { 

    // initialize by adding data-able-menu attribute to the menu's outer <ul> element     
    $('ul').each(function (index, element) {
      if ($(element).data('able-menu') !== undefined) {
        new AbleMenu($(this),$(element));
      }
    });

  });
    
  window.AbleMenu = function($element) {

    this.menu = $element;      
    this.setup();
    // this.initialize();
      
  };

  AbleMenu.prototype.setup = function() {

    this.idPrefix = 'ablemenu_'; 
    this.nextId = 1; 
    
    this.timeout = 3000;
    this.timer = 0; 
    this.subMenu = null; 
    
    this.index = {
      topmenu : 0,
      submenu : 0
    };

    this.keys = {
      enter    :   13,
      esc      :   27,
      tab      :   9,
      left     :   37,
      up       :   38,
      right    :   39,
      down     :   40,
      spacebar :   32
    };

    this.menuItem = $(this.menu).children('li').children('a');

    var thisObj = this;
    this.menuItem.each(function() { 

      var $item = $(this);      
      var $subMenu = $item.next('ul'); 

      // both the menu item and submenu need an id 
      var itemId = thisObj.getId($item);
      var subMenuId = thisObj.getId($subMenu);

      // add ARIA attributes 
      $item.attr({
        'aria-owns': subMenuId,
        'aria-controls': subMenuId,
        'aria-haspopup': 'true',
        'aria-expanded': 'false'
      })
      $subMenu.attr({
        'aria-expanded': 'false',
        'aria-visible': 'false',
        'aria-labelledby': itemId
      })      

      // bind events to each menu item 
      $(this)
        .on('mouseenter',function(event) {         
          // close previously open submenu, then show new submenu
          thisObj.hideSubMenu();
          thisObj.subMenu = $(this).next('ul');
          thisObj.showSubMenu();        
          clearTimeout(thisObj.timer);
        })
        .on('keydown',function(event) { 
          thisObj.handleKeystroke(event);
        })
        .parent().on('mouseleave',function(){
          clearTimeout(thisObj.timer);
          thisObj.timer = setTimeout(function(){
            thisObj.hideSubMenu();
          },thisObj.timeout);
        });

      // bind events to each submenu as well 
      $('#' + subMenuId).on('keydown',function(event) { 
        thisObj.moveFocusInSubMenu(event);
      });
    });    
    
    // close subMenu when user clicks off-menu 
    $(document).on('click',function() { 
      thisObj.hideSubMenu(); 
    });
  }

  AbleMenu.prototype.getId = function($element) {
     
     if (($element).attr('id') !== undefined) { 
       // element already has an id. Return it. 
       return $element.attr('id');        
     }
     else { 
       // assign an id to the element 
       var id = this.idPrefix + this.nextId; 
       $element.attr('id',id);
       this.nextId++;
       return id;
     }
  }

  AbleMenu.prototype.handleKeystroke = function( e ) {

    switch ( e.keyCode ) {

      case this.keys.enter :
      case this.keys.down  :

        $(e.currentTarget).attr('aria-expanded', 'true');
        this.subMenu = $(e.currentTarget).next('ul')
        this.showSubMenu();
        e.preventDefault();
        return false;

      case this.keys.left :

        $(e.currentTarget).parent().prev().children('a').first().focus();
        e.preventDefault();
        return false;

      case this.keys.right :

        $(e.currentTarget).parent().next().children('a').first().focus();
        e.preventDefault();
        return false;

      case this.keys.spacebar:

        window.location.href = $(e.currentTarget).attr('href');
        return false;
    }

  };

  AbleMenu.prototype.moveFocusInSubMenu = function(e) {
    
    switch ( e.keyCode ) {

      case this.keys.tab:
        if (e.shiftKey) { 
          // move to previous top-level menu item
          this.subMenu.hide().parent().prev().children('a').first().focus();
        }
        else { 
          // move to next top-level menu item 
          this.subMenu.hide().parent().next().children('a').first().focus();

        }
        this.index.submenu = 0;
        this.subMenu.attr( 'aria-expanded', 'false' )
          .parent().children('a').first().attr('aria-expanded', 'false');
        e.preventDefault();
        return false;

      case this.keys.down:
        this.index.submenu = this.index.submenu === this.subMenuAnchors.length-1 ? 0 : this.index.submenu + 1;
        this.subMenuAnchors.eq( this.index.submenu ).focus();
        e.preventDefault();
        return false;

      case this.keys.up :
        this.index.submenu = this.index.submenu === 0 ? this.subMenuAnchors.length-1 : this.index.submenu - 1;
        this.subMenuAnchors.eq( this.index.submenu ).focus();
        e.preventDefault();
        return false;

      case this.keys.left:
        this.subMenu.hide().parent().prev().children('a').first().focus();
        this.index.submenu = 0;
        this.subMenu.attr( 'aria-expanded', 'false' )
          .parent().children('a').first().attr('aria-expanded', 'false');
        e.preventDefault();
        return false;

      case this.keys.right:
        this.subMenu.hide().parent().next().children('a').first().focus();
        this.index.submenu = 0;
        this.subMenu.attr( 'aria-expanded', 'false' )
          .parent().children('a').first().attr('aria-expanded', 'false');
        e.preventDefault();
        return false;

      case this.keys.spacebar:
      case this.keys.enter:
        window.location.href = $(e.currentTarget).attr('href')
        return false;

      case this.keys.esc:
        this.subMenu.attr('aria-expanded', 'false' )
          .hide().parent().children('a').first().attr('aria-expanded', 'false').focus();
        e.preventDefault();
        return false;

      default:
        var chr = String.fromCharCode(e.which), exists = false;
        // jump to the next menu item that starts with chr
        this.subMenuAnchors.filter(function() {
          exists = this.innerHTML.charAt(0) === chr;
          return exists;
        }).first().focus();

        e.preventDefault(); // not sure we want to prevent other keys from functioning?
        return !exists;
    }
  };

  AbleMenu.prototype.showSubMenu = function() { 

    this.subMenu
      .attr( 'aria-expanded', 'true' )
      .show()
      .find('a')
      .eq(0)
      .focus();
    
    this.subMenuAnchors = this.subMenu.find('a')
  }
  
  AbleMenu.prototype.hideSubMenu = function() { 
    if (this.subMenu) { 
      this.subMenu.hide(); 
      this.subMenu = null;
      this.index.submenu = 0;
    }
  }

})(jQuery);