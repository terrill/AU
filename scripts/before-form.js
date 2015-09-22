/* 
 * JavaScript for Accessible University Demo Site 
 * http://uw.edu/accesscomputing/AU
 *
 * before-form.js = Handle form validation 
 */
  
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
  