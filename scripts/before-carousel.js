/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * before-carousel.js = Inaccessible Carousel
 */

$(document).ready(function() {

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
    var lentil = $('<li>')
      .attr('data-slide',i)
      .on('click',function() {
        showSlide($(this).data('slide'));
      });
    lentils.append(lentil);
  }
  $('#carousel').append(lentils);

  // show the first one
  showSlide(0);

  // Auto-advance slides 
  /* Disabled for now because it's buggy 
    & super annoying (that's the point, but it renders the site unusable)
  setInterval(function() { 
    if (currentIndex == (slideCount-1)) { 
      // this is the the last slide. reset 
      currentIndex = 0; 
    }
    else { 
      currentIndex++; 
    }
    showSlide(currentIndex); 
  }, 3000);
  */
});

function showSlide(index) {

  // hide the current visible slide
  $('.slide:visible').removeClass('current');
  // and show the new one
  $('.slide').eq(index).addClass('current');

  // also update the slide indicator
  $('.lentils li.active').removeClass('active');
  $('.lentils li').eq(index).addClass('active');

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
