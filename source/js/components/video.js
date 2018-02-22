/*
  The object name should be captialised
  and would usually be namespaced by
  the project/client name, e.g. intu.Pattern.
  Variable and function names should be 
  full words, using camel case with a 
  lowercase first letter.
*/
if (typeof video === 'undefined') {
  var video = {};
}

video = {

  vars: {
    sampleVar: true
  },

  DOM: {

  },

  init: function () {
    //console.log('loaded video');
    video.videoControl();
    


  },

  videoControl: function() {
  	var video = document.getElementById('video');

  	$('a[data-video="play-btn"]').on('click', function() {
  		$(this).remove();
  		video.play();
  	});

  },

  events: {
    
  },

  helpers: {
    
  }
};