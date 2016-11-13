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

    // initalize any <ul> element that has a data-able-menu attribute
    $('ul').each(function (index, element) {
      if ($(element).data('able-menu') !== undefined) {
        new AbleMenu($(this),$(element));
      }
    });

  });

  window.AbleMenu = function($element) {

    this.menu = $element;
    this.setup();

  };

  AbleMenu.prototype.setup = function() {

    this.idPrefix = 'ablemenu_';
    this.menuItemId = 1;

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
      var itemId = thisObj.idPrefix + '_link_' + thisObj.menuItemId;
      var subMenuId = thisObj.idPrefix + '_sub_' + thisObj.menuItemId;
      thisObj.menuItemId++;

      // add ARIA attributes
      $item.attr({
        'id': itemId,
        'aria-owns': subMenuId,
        'aria-controls': subMenuId,
        'aria-haspopup': 'true',
        'aria-expanded': 'false'
      })
      $subMenu.attr({
        'id': subMenuId,
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
        .on('click',function(event) {
          thisObj.handleClick(event);
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
    // add toggle for help text
    var helpButton = $('<button>')
      .attr({
        'type': 'button',
        'title': 'Show menu keyboard shortcuts'
      })
      .on('click',function() {
        if ($('#nav-help').is(':visible')) {
          $('#nav-help').hide();
          $(this).attr('title','Show menu keyboard shortcuts');
        }
        else {
          $('#nav-help').show();
          $(this).attr('title','Hide menu keyboard shortcuts');
        }
      });
    var helpIcon = $('<img>').attr({
      'src' : 'images/help.png',
      'alt' : '',
      'role' : 'presentation'
    });
    helpButton.html(helpIcon);
    $('#main-nav').prepend(helpButton);

    // add help text, hidden by default
    var help = $('<div>').attr({
      'id': 'nav-help',
      'role': 'alert'
    });
    var helpHeading = $('<h2>').text('Main menu keyboard shortcuts');
    var helpList = $('<ul>');
    var helpItems = [];
    helpItems[0] = '<strong>Tab</strong> or <strong>left/right arrow</strong> to move through menu bar';
    helpItems[1] = '<strong>Space</strong> to follow a link to an external page';
    helpItems[2] = '<strong>Enter</strong> or <strong>down arrow</strong> to open a submenu';
    helpItems[3] = '<strong>Up/down arrow</strong> to move through submenu items';
    helpItems[4] = '<strong>The first character</strong> of any submenu item to jump to that item';
    helpItems[5] = '<strong>Escape</strong> to close a submenu';
    for (var i=0; i<helpItems.length; i++) {
      var helpItem = $('<li>').html(helpItems[i]);
      helpList.append(helpItem);
    }
    help.append(helpHeading, helpList);
    $('#main-nav').prepend(help);

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

        // Bypass submenu and follow the link to the top-level menu item.
        window.location.href = $(e.currentTarget).attr('href');
        return false;
    }

  };

  AbleMenu.prototype.handleClick = function( e ) {

    $(e.currentTarget).attr('aria-expanded', 'true');
    this.subMenu = $(e.currentTarget).next('ul')
    this.showSubMenu();
    e.preventDefault();
    e.stopPropagation();
    return false;
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
        this.subMenu.parent().children('a').first().attr('aria-expanded', 'false');
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
        this.subMenu.parent().children('a').first().attr('aria-expanded', 'false');
        e.preventDefault();
        return false;

      case this.keys.right:
        this.subMenu.hide().parent().next().children('a').first().focus();
        this.index.submenu = 0;
        this.subMenu.parent().children('a').first().attr('aria-expanded', 'false');
        e.preventDefault();
        return false;

      case this.keys.spacebar:
      case this.keys.enter:
        window.location.href = $(e.currentTarget).attr('href')
        return false;

      case this.keys.esc:
        this.subMenu.hide().parent().children('a').first().attr('aria-expanded', 'false').focus();
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

    this.subMenu.show().find('a').eq(0).focus();

    this.subMenu.prev('a').attr('aria-expanded','true');

    this.subMenuAnchors = this.subMenu.find('a')
  }

  AbleMenu.prototype.hideSubMenu = function() {
    if (this.subMenu) {
      this.subMenu.hide();
      this.subMenu.prev('a').attr('aria-expanded','false');

      // place focus on parent anchor
      this.subMenu.closest('a').focus();

      this.subMenu = null;
      this.index.submenu = 0;
    }
  }

})(jQuery);