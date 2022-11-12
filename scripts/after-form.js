/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * after-form.js = Handle form validation
 */

$(document).ready(function() {

  // add text-based captcha to the #captcha container
  // NOTE: This is just an example, not a real CAPTCHA 
  // See info.html for a discussion of captcha accessibility

  var captchas = getCaptchas(); 
  var captchaIndex = getCaptchaIndex(captchas.length);
  var question = captchas[captchaIndex]['question']; 
  var captchaFieldset = $('<fieldset>'); 
  var captchaLegend = $('<legend>').attr({
    class: 'required'
  }).text('Security Question ');
  var captchaStar = $('<span>').attr({
    'class': 'star',
    'aria-hidden': 'true'
  }).text('*');
  captchaLegend.append(captchaStar);
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
  captchaFieldset.append(captchaLegend,captchaLabel,captchaInput);
  $('#captcha').append(captchaFieldset);

  // handle form submission 
  $('#submit').on('click',function(event) { 
    var skippedField, success, feedbackHeading, feedbackMsg, feedbackText; 
    event.preventDefault();
    skippedField = checkRequiredFields(); 
    if (skippedField) { 
      // display the error message, and place focus in the skipped field 
      $('#feedback').empty().text(skippedField['error']).show(); 
      $('#' + skippedField['fieldId']).focus(); 
      return false;
    }
    console.log('after checking for skipped fields');
    if ($('#captcha_answer').val().toLowerCase() === captchas[captchaIndex]['answer']) { 
      success = true; 
    }
    else { 
      success = false; 
    }
    if (success) { 
      $('title').text('Success! Accessible University');
      feedbackHeading = $('<h3>').text('Thank you!');
      feedbackMsg = 'Your application has been received.'
      feedbackText = $('<p>').text(feedbackMsg);
      $('#feedback').empty().append(feedbackHeading,feedbackText).show();
      // Reset the form 
      $('form input[type="text"]').val('');
      $('form input[type="email"]').val('');
      $('form input[type="checkbox"]').prop('checked',false);
    }
    else { 
      $('title').text('Error with fom submission | Accessible University');
      feedbackHeading = $('<h3>').text('Error');
      feedbackMsg = 'Your answer to the security question was not correct. Please try again.';  
      feedbackText = $('<p>').text(feedbackMsg);
      $('#feedback').empty().append(feedbackHeading,feedbackText).show();
      // Empty the captcha field, but not the other fields
      // and place focus in the captcha field
      $('#captcha_answer').empty().focus(); 
    }
  });
});

function getCaptchas() {

  let captchas = [
    { 
      'question': 'If a cow is purple, what color is it?',
      'answer': 'purple'
    },
    { 
      'question': 'Sunday, cow, Friday. Which of these is not a day?',
      'answer': 'cow'
    },
    { 
      'question': 'Cow, pizza, car. Which of these has more than three letters?',
      'answer': 'pizza'
    }
  ]
	return captchas;
}

function getCaptchaIndex(numCaptchas) { 

    // returns a random integer to use for randomly selected an item from the captchas array
  return Math.floor(Math.random() * numCaptchas);
}

function checkRequiredFields() { 

  // if a required field was skipped, returns an object with 'error' and 'fieldId'
  // else returns false 

  var required, skippedId, skippedLabel, result;

  result = null; 

  // get all required fields EXCEPT captcha (it's handled separately)
  required = $('input[required]').not('#captcha_answer'); 
  if (required.length > 0) { 
    // step through all required fields to be sure they have content 
    required.each(function() { 
      if ($(this).val() == '') { 
        // required field is empty. Get label for this field. 
        skippedId = $(this).attr('id'); 
        skippedLabel = $('label[for=' + skippedId + ']').text().replace(' *',''); 
        result = { 
          'error' : 'ERROR: ' + skippedLabel + ' is required.',
          'fieldId' : skippedId
        }; 
        return false; // to break out of the each()  
      }
    });
    return result;   
  }
}
