/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * after-carousel.js = Accessible Carousel
 */

$(document).ready(function() {

  // get all slides
  var $slides = $('.slide');
  var slideCount = $slides.length;

  // save a pointer to the current slide
  var currentIndex = 0;

  // add previous/next buttons
  var navButtons = $('<div>');
  var prevIcon = $('<img>').attr({
    'src': 'images/arrow-left.png',
    'alt': 'Previous slide'
  });
  var nextIcon = $('<img>').attr({
    'src': 'images/arrow-right.png',
    'alt': 'Next slide'
  });
  var prevButton = $('<button>')
    .attr('type','button')
    .addClass('btn-prev')
    .on('click',function() {
      currentIndex = updateIndex(currentIndex,'prev',slideCount);
      showSlide(currentIndex);
    })
    .html(prevIcon);
  var nextButton = $('<button>')
    .attr('type','button')
    .addClass('btn-next')
    .on('click',function() {
      currentIndex = updateIndex(currentIndex,'next',slideCount);
      showSlide(currentIndex);
    })
    .html(nextIcon);

  navButtons.append(prevButton,nextButton);
  $('#carousel').append(navButtons);

  // add slide indicators (lentils)
  var lentils = $('<ul>').addClass('lentils');
  for (var i=0; i<slideCount; i++) {
    var lentil = $('<li>');
    var lentilButton = $('<button>').attr({
      'data-slide' : i
    }).on('click',function() {
      showSlide($(this).data('slide'));
    });
    var slideNumber = i + 1;
    var lentilHTML = '<span class="clipped">Slide </span> ' + slideNumber;
    lentilButton.html(lentilHTML);
    lentil.html(lentilButton);
    lentils.append(lentil);
  }
  $('#carousel').append(lentils);

  // show the first one
  showSlide(0);
});

function showSlide(index) {

  // hide the current visible slide
  $('.slide:visible')
    .removeClass('current')
    .removeAttr('aria-live');
  $('span.current-slide').remove();
  // and show the new one
  // also add an aria-live attribute so screen readers will announce the slide's contents
  $('.slide').eq(index).addClass('current').attr('aria-live','assertive');

  // also update the slide indicator
  $('.lentils li.active').removeClass('active');
  $('.lentils li').eq(index)
    .addClass('active')
    .find('button').append('<span class="clipped current-slide">(current slide)</span>');
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
