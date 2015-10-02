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
  
  // add previous/next buttons 
  var navButtons = $('<div>');
  var prevIcon = $('<img>').attr({
    'src': 'images/arrow-left.png'    
  });
  var nextIcon = $('<img>').attr({
    'src': 'images/arrow-right.png'    
  });
  var prevButton = $('<div>')
    .addClass('btn-prev')
    .on('click',function() { 
      currentIndex = updateIndex(currentIndex,'prev',slideCount);
      showSlide(currentIndex);      
    })
    .html(prevIcon);
  var nextButton = $('<div>')
    .addClass('btn-next')
    .on('click',function() { 
      currentIndex = updateIndex(currentIndex,'next',slideCount);
      showSlide(currentIndex);      
    })
    .html(nextIcon);

  navButtons.append(prevButton,nextButton);
  $('#carousel').append(navButtons);    

  
  // show the first one 
  showSlide(0);
});

function showSlide(index) { 
  
  // hide the current visible slide 
  $('.slide:visible').removeClass('current'); 
  // and show the new one 
  $('.slide').eq(index).addClass('current'); 
}

function updateIndex(index,direction,count) { 
  
console.log('updating ' + index);  
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
