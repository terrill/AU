/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * after-carousel.js = Accessible Carousel
 */

$(document).ready(function() {

  // handle keydown on any element with role="button" as a click 
  $('[role="button"]').on('keydown',function(event) { 
    // Keypresses other then Enter and Space should not trigger a click
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault(); 
      $(this).click();
    }
  });

  // get all slides
  var $slides = $('.slide');
  var slideCount = $slides.length;

  // save a pointer to the current slide
  var currentIndex = 0;

  // add handlers for previous/next buttons
  var prevButton = $('#btn-prev'); 
  prevButton.on('click',function() {
      currentIndex = updateIndex(currentIndex,'prev',slideCount);      
      showSlide(currentIndex);
    });
  var nextButton = $('#btn-next');
  nextButton.on('click',function() {
      currentIndex = updateIndex(currentIndex,'next',slideCount);
      showSlide(currentIndex);
    });

  // add slide indicators (lentils)
  var lentils = $('<ul>').addClass('lentils');
  for (var i=0; i<slideCount; i++) {
    var slideNumber = i + 1;
    var slideLabel = 'Slide ' + slideNumber;
    var lentil = $('<li>');
    var lentilButton = $('<span>').attr({
      'role': 'button',
      'tabindex': '0',
      'data-slide' : i,
      'aria-label' : slideLabel 
    })
    .text(slideNumber)
    .on('click',function() { 
      // Remove aria-current for all lentils except this one 
      $('ul.lentils span[aria-current="true"]').removeAttr('aria-current');      
      $(this).attr('aria-current','true'); 
      showSlide($(this).data('slide'));
    });
    lentil.html(lentilButton);
    lentils.append(lentil);
  }
  $('#carousel').append(lentils);

  // show the first one
  showSlide(0);
});

function showSlide(index) {

  // hide the current visible slide
  $('.slide:visible').removeClass('current');
  $('span.current-slide').remove();
  // and show the new one
  $('.slide').eq(index).addClass('current');

  // also update the slide indicator
  $('.lentils li.active')
    .removeClass('active')
    .find('span').removeAttr('aria-current');
  $('.lentils li').eq(index)
    .addClass('active')
    .find('span').attr('aria-current','true');

  // and update the live region so screen reader users know the slide has changed.
  var numSlides = $('#carousel div.slide').length;
  var slideNum = index + 1;
  var msg = 'Now showing slide ' + slideNum + ' of ' + numSlides;
  $('#slideStatus').text(msg);
}

function updateIndex(index,direction,count) {

  if (direction === 'prev') {
    if (index == 0) {
      // this is the first side, loop around to last slide
      return count-1;
    }
    else {
      return index-1;
    }
  }
  else if (direction == 'next') {
    if (index == (count - 1)) {
      // this is the last side, loop around to first slide
      return 0;
    }
    else {
      return index+1;
    }
  }
  return 0;
}
