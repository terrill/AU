/* 
 * JavaScript for Accessible University Demo Site 
 * http://uw.edu/accesscomputing/AU
 *
 * after-form.js = Handle form validation 
 */

$(document).ready(function() { 

		function showCaptcha() { 
			// create an array with a few questions 
			var questions = new Array();
			questions[0] = 'If a cow is purple, what color is it?';
			questions[1] = '2 plus two equals ';
			questions[2] = 'Sunday, Bird, Friday. Which of these is not a day?';
			var question = questions[Math.floor(Math.random() * questions.length)];
			document.getElementById('captcha_label').innerHTML = question;
		}

    // form validation - compare this with "before" version, below
		function showError(errorMessage) {			
			var errorDiv = document.getElementById('errorMsg');
			errorDiv.innerHTML = errorMessage;
			errorDiv.style.display='block';
			errorDiv.setAttribute('tabindex','0');
			errorDiv.focus();
		}
		function validateEmail(email) {
			var atPos=email.indexOf("@");
			var dotPos=email.lastIndexOf(".");
			//must contain at least an @ sign and a dot (.) 
			//The @ must not be the first character 
			//The last dot must at least be one character after the @ sign
			if (atPos<1||dotPos-atPos<2) return false; 
			else return true;
		}
		function validate (thisform) {
			var userName = thisform.name.value;
			var userEmail = thisform.email.value;
			var captchaAnswer = thisform.captcha_answer.value;
			var numErrors = 0;
			var errorMessages = new Array();
			if (userName==null||userName=="") { 
				errorMessages[numErrors] = 'Name is required';
				var firstBadField = 'name';
				numErrors++;
			}
			if (userEmail==null||userEmail=="") { 
				errorMessages[numErrors] = 'Email is required';
				if (numErrors == 0) var firstBadField = 'email';
				numErrors++;
			}
			else if (validateEmail(userEmail) == false) { 
				errorMessages[numErrors] = 'You entered an invalid email address';
				if (numErrors == 0) var firstBadField = 'email';
				numErrors++;
			}
			if (captchaAnswer==null||captchaAnswer=="") { 
				errorMessages[numErrors] = 'You must answer the security question at the bottom of the form';
				if (numErrors == 0) var firstBadField = 'captcha_answer';
				numErrors++;
			}			
			if (numErrors > 0) { 
				if (numErrors == 1) { 
					var errorMessage = 'ERROR: ' + errorMessages[0];
					errorMessage += '. Please correct this error and submit again.';
				}
				else { 
					var errorMessage = '<p>There were ' + numErrors + ' errors '; 
					errorMessage += 'in the information you entered:</p> ';
					errorMessage += '<ul>';
					for (i=0;i<numErrors;i++) { 
						errorMessage += '<li>' + errorMessages[i] + '</li>';
					}
					errorMessage += '</ul>';
					errorMessage += '<p>Please correct these errors and submit again.</p>';
				}
				showError(errorMessage);
				//set focus to the first field that requires correcting
				if (firstBadField == 'name') thisform.name.focus();
				else if (firstBadField == 'email') thisform.email.focus();
				else if (firstBadField == 'captcha_answer') thisform.captcha_answer.focus();
				//scroll viewport to top of page so error message is visible
				window.scrollTo(0,0); 
				return false;
			}
			else return true;
		}
});
  
		function showError() {
			var errorDiv = document.getElementById('errorMsg');
			var errorMask = document.getElementById('errorMask');
			//add an event listener to capture when user clicks on errorMask 
			if (errorMask.addEventListener) { 
				errorMask.addEventListener('click',function() { 
					//hide error message (and background mask)
					errorDiv.style.display='none';
					errorMask.style.display='none';
				}, false);
			}
			else if (errorMask.attachEvent) { //do the same thing for IE 
				errorMask.attachEvent('click',function() { 
					errorDiv.style.display='none';
					errorMask.style.display='none';
				});
			}
			errorDiv.innerHTML = 'Your form has errors. Please correct, then resubmit.';
			//position errorDiv in center of browser window
			var winSize = getWindowSize();
			var winWidth = winSize[0];
			var winHeight = winSize[1];
			var errorLeft = ((winWidth-200)/2) + 'px';
			var errorTop = ((winHeight-200)/2) + 'px';
			errorDiv.style.left=errorLeft;
			errorDiv.style.top=errorTop;
			errorDiv.style.display='block';
			errorMask.style.display='block';
		}
		function validateEmail(email) {
			var atPos=email.indexOf("@");
			var dotPos=email.lastIndexOf(".");
			//must contain at least an @ sign and a dot (.) 
			//The @ must not be the first character 
			//The last dot must at least be one character after the @ sign
			if (atPos<1||dotPos-atPos<2) return false; 
			else return true;
		}
		function validate (thisform) {
			//returns true if all form input is valid
			//otherwise calls showError() and returns false
			var userName = thisform.name.value;
			var userEmail = thisform.email.value;
			var captcha = thisform.captcha.value;
			var isValid = true; //until proven false
			if (userName==null||userName=="") isValid = false;
			else if (userEmail==null||userEmail=="") isValid = false;
			else if (validateEmail(userEmail) == false) isValid = false;
			else isValid = false; // user for sure entered the wrong captcha text 
			if (isValid == false) {
				showError();
				return false;
			}
			else return true;
		}
  