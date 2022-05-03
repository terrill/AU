/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * before-form.js = Handle form validation
 */

$(document).ready(function(event) {

  $('#submit').on('click',function(event) {
    // Submitting the form always returns a vague error message
    var heading = $('<div>').addClass('errorHeading').text('ERROR');
    var errorMsg = $('<p>')
      .text('Your form has errors. Please correct them and resubmit.');
    $('#error').html(heading).append(errorMsg).show();
    event.preventDefault();
  });
});
