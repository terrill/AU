/* 
 * JavaScript for Accessible University Demo Site 
 * http://uw.edu/accesscomputing/AU
 *
 * before-form.js = Handle form validation 
 */

$(document).ready(function(event) { 

  $('#submit').on('click',function(event) { 
    // show error in a modal dialog 
    var heading = 'ERROR'; 
    var errorMsg = 'Your form has errors. '; 
    errorMsg += 'Please correct them and resubmit.';
    showModal(heading,errorMsg);
    event.preventDefault();
  }); 
  
  function showModal(heading,content) { 
    
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var modalSize = 200; 
    var modalLeft = ((winWidth-modalSize)/2) + 'px';
    var modalTop = ((winHeight-modalSize)/2) + 'px';
	
    var $modal = $('#modalContent');
    var $modalMask = $('#modalMask');
    var headingTag = '<div><b>' + heading + '</b></div>'; 
    var contentTag = '<p>' + content + '</p>'; 
    var $okButton = $('<button>').attr({
      'type': 'button'
    }).text('ok').on('click',function(){ 
      $('#modalContent').hide();
      $('#modalMask').hide();
    });;
		$modal
		  .html(headingTag + contentTag)
		  .append($okButton)
		  .css({ 
    		'top': modalTop,
        'left': modalLeft
      })
      .show();
  	$modalMask.show();
  }
});
