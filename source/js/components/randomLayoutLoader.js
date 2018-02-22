/*
  The object name should be captialised
  and would usually be namespaced by
  the project/client name, e.g. intu.Pattern.
  Variable and function names should be 
  full words, using camel case with a 
  lowercase first letter.
*/
if (typeof randomLayoutLoader === 'undefined') {
  var randomLayoutLoader = {};
}

randomLayoutLoader = {

  vars: {
    sampleVar: true
  },

  DOM: {

  },

  init: function () {
    //IF IS NOT HOME PAGE RETURN
    if(!$('body').data('homepage')) return;

    $.getJSON( '../assets/json/home-page.json').done(function( data ) {

      var getTitle = data;
      var objKeys = Object.keys(getTitle);
      var counter = 0;
      var size = Object.keys(data).length;
      var timer = setInterval(function() {

            counter++;

            if(counter >= size) {
              counter = -1;
              return;
            } 
            var ranKey = objKeys[counter];
            var randomTitle = getTitle[ranKey];

            // wait 1.5 seconds Set new body classs & add new title/image
            var hideContent = setInterval(function() {
              $('#home-bg, #main-title').css('opacity', 0);
              // cancel this interval
              clearInterval(hideContent);
            }, 2500);


            //wait 3 seconds Set New body classs & add new title/image
            var setContent = setInterval(function() {

              $('body').removeClass('grey pink blue green orange');
              $('body').addClass(randomTitle.bodyClass);
              $('#main-title').html(randomTitle.title);
              $('#home-bg').attr('src', 'assets/img/' + randomTitle.image);
              // cancel this interval
              clearInterval(setContent);
            }, 5000);

            //console.log(ranKey, size);

            //wait 4 seconds, reveal title & image
            var revealContent = setInterval(function() {
              $('#home-bg, #main-title').css('opacity', 1);
              // cancel this interval
              clearInterval(revealContent);
            }, 7500);

      }, 9000);

    });

  },


  events: {
    
  },

  helpers: {
    
  }
};