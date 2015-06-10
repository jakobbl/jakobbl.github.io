// function sizeCheck() {
//   'use strict';
//   if ($('.list-title').css('display') === 'none') {
//     $('.list-group').collapse('show');
//     console.log('.list-title var skjult, kører collapse ud');
//   }
//   else {
//     $('.list-group').collapse('hide');
//     console.log('.list-title var synlig, kører collapse ind');
//   }
// }
// sizeCheck();
// $(window).resize(sizeCheck);

// Mobile navigation
$('.list-title').click(function(e) {
  // 'use strict';
  e.preventDefault();
  $(this).toggleClass('active');
  $(this).children('.glyphicon').toggleClass('flip-vertical');
  $(this).next('.list-group').collapse('toggle');
  console.log('Collapse toggle');
});

// Kategori vælger
$('.category-link').click(function(e) {
  // 'use strict';
  var selectedCategory = '.category.' + $(this).data('category');
  var filter = $('.category').not(selectedCategory);
  var effect = 'flipY';

  e.preventDefault();

  if ($(this).hasClass('active')) {
    $(filter).velocity('transition.' + effect + 'In', {
      stagger: 100,
      drag: true
    });
    $(this).removeClass('active');
  } else {
    $('.category-link.active').removeClass('active');
    $(this).addClass('active');
    // console.log('category:', selectedCategory);
    $(filter).velocity('transition.' + effect + 'Out', {
      stagger: 100,
      drag: true
    });
    $(selectedCategory).velocity('transition.' + effect + 'In', {
      stagger: 100,
      drag: true
    });
  }
});
