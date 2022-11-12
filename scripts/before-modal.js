/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * before-modal.js = Inaccessible modal
 */

$(document).ready(function(event) {

  $('a[href="cheatsheet.html"]').on('click',function(event) {
    showModal();
    event.preventDefault();
  });

  // handle click on X or Ok button in modal dialog
  $('#modalContent button').on('click',function () { 
console.log('you clicked a button');     
    hideModal();     
  });

  function showModal() {

    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var modalSize = 400;
    var modalLeft = ((winWidth-modalSize)/2) + 'px';
    var modalTop = ((winHeight-modalSize)/2) + 'px';

    $('#modalContent')
      .css({
        'top': modalTop,
        'left': modalLeft
      })
      .show();

    $('#modalMask').show();
  }

  function hideModal() {

    $('#modalContent').hide(); 
    $('#modalMask').hide();
  }

});
