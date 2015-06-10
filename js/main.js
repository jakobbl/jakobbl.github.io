function inverse(hex) {
  var inverted = null;
  if (hex.length == 7 && hex.indexOf('#') == 0) {
    inverted = '#';
    for (var i = 1; i < 7; i += 2) {
      // Burde være 255 men den skal altid være lidt lysere derfor 280. Så en farvekode der burde være (100,100,100) nu er (125,125,125)
      var value = (280 - parseInt(hex.substring(i, i + 2), 16)).toString(16);
      inverted += pad(value);
    }
  }

  return inverted;
}

function pad(num) {
  if (num.length < 2) {
    return '0' + num;
  } else {
    return num;
  }
}

$(document).ready(function() {

  // Kategori vælger init
  $('#grid').mixItUp();
  // Kategori vælger reset
  $('.filter').on('click', function() {
    var state = $('#grid').mixItUp('getState');
    state = state.activeFilter;
    if (state == $(this).data('filter')) {
      $('#grid').mixItUp('filter', 'all');
      $(this).removeClass('active');
    }
  });
  // Mobile navigation
  $('.list-title').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).children('.glyphicon').toggleClass('flip-vertical');
    $(this).next('.list-group').collapse('toggle');
    console.log('Collapse toggle');
  });

  // Kør først Vibrant.js igennem når MixItUp er færdig
  $('#grid').on('mixLoad', function() {
    // Vibrant.js
    var thumbnails = $('.thumbnail img');
    // Loop igennem hvert thumbnail
    thumbnails.each(function(index, el) {
      var vibrant = new Vibrant(this, 48, 10);
      // Alle swatches
      var swatches = vibrant.swatches();
      // RGB værdi af Vibrant swatch
      var vibrantSwatch = swatches.Vibrant.getRgb();
      //Rgba() notering af Vibrant ( Men træk 45 fra så den altid er mørkere så rgb(255,255,255) bliver rgb(215,215,215))
      var vibrantRgba = 'rgba(' + (vibrantSwatch[0] - 45) + ',' + (vibrantSwatch[1] - 45) + ',' + (vibrantSwatch[2] - 45) + ',0.85)';
      // Den omvendte farve af Vibrant
      var vibrantInverse = inverse(swatches.Vibrant.getHex());

      // Indstil swatches til det tilhørende element - Overlay = Vibrant - "Se projektet" = Vibrant inverse
      // $(this).siblings('a').children('.overlay').css({
      $(this).siblings('.overlay').css({
        'background-color': vibrantRgba
      });
      $(this).siblings('.thumbnail-caption').children('a').css({
        'border-color': vibrantInverse,
        'color': vibrantInverse
        // 'background-color': vibrantInverse
      });
      // $(this).siblings('.thumbnail-caption').children('a:before').css({
      //   'background-color': vibrantInverse
      // });
    });
  });

});
