//@prepros-prepend vendor/jquery-3.1.1.min.js
//@prepros-prepend vendor/modernizr.js

//Enquire to JS media queries, delete as needed
//@prepros-prepend vendor/media.match.min.js
//@prepros-prepend vendor/enquire.js

//@prepros-prepend components/burger.js
//@prepros-prepend components/tabs.js
//@prepros-prepend components/randomLayoutLoader.js
//@prepros-prepend components/video.js

if(typeof window.blankProject === 'undefined')
  window.blankProject = {};

window.blankProject.init = function() {
	burger.init();
	tabs.init();

	randomLayoutLoader.init();
	video.init();
};

$(document).ready(window.blankProject.init);