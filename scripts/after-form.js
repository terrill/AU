/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * after-form.js = Handle form validation
 */

$(document).ready(function() {

  // add text-based captcha to the #captcha container
  // NOTE: This is just an example; no captcha validation actually occurs
  // See problems.html for a discussion of captcha accessibility

  var question = getQuestion();
  var captchaHeading = $('<h3>').text('Security Question');
  var captchaLabel = $('<label>').attr({
    'id': 'captcha_label',
    'for': 'captcha_answer'
  }).text(question);
  var captchaInput = $('<input>').attr({
    'id': 'captcha_answer',
    'name': 'captcha_answer',
    'type': 'text',
    'required': ''
  });
  $('#captcha').append(captchaHeading,captchaLabel,captchaInput);

  // handle form submission
  // NOTE: This is just an example; normally this would be handled server-side
  // In this example, all submissions are good submissions!
  // Provide accessible information that indicates submission was successful
  var formParams = document.location.search;
  if (formParams.indexOf('submitted=yes') !== -1) {
    $('title').text('Success! Accessible University');
    var feedbackHeading = $('<h3>').text('Thank you!');
    var feedbackText = $('<p>').text('Your application has been received.');
    $('#feedback').append(feedbackHeading,feedbackText).show();
  }
});

function getQuestion() {

  var questions = [];
  questions[0] = 'If a cow is purple, what color is it?';
	questions[1] = '2 plus two equals ';
	questions[2] = 'Sunday, Bird, Friday. Which of these is not a day?';
	var question = questions[Math.floor(Math.random() * questions.length)];
	return question;
}
