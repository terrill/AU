
$(document).ready(function() {
// Get today's date and time
var date = new Date();

// Set the date we're counting down to
var future = new Date(date.getTime());
future.setFullYear(date.getFullYear() + 1);
var countDownDate = future.getTime();

// Element we're pasting the result into
var countdown = document.getElementById("countdown");

updateCountdown();

// Update the count down every 1 minute
var x = setInterval(function() {
  updateCountdown();
}, 1000*60);

function updateCountdown() {

  // Get today's date and time
  var now = Date.now();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  // Display the result
  countdown.innerHTML = days + "d " + hours + "h "
  + minutes + "m";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    countdowninnerHTML = "EXPIRED";
  }
}

});