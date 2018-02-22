/*
  The object name should be captialised
  and would usually be namespaced by
  the project/client name, e.g. intu.Pattern.
  Variable and function names should be 
  full words, using camel case with a 
  lowercase first letter.
*/
if (typeof burger === 'undefined') {
  var burger = {};
}

burger = {

  vars: {
    sampleVar: true
  },

  DOM: {

  },

  init: function () {
    // console.log('loaded burger');
    var menuButton = document.getElementById('menuButton');
    var nav = document.getElementById('nav');
    var body = document.body;

    if ( window.location.pathname === '/' ){
        // Index (home) page
        console.log('HOME', window.location.pathname);

    } else {
        // Other page
        $('nav a[href^="/' + location.pathname.split('/')[1] + '"]').addClass('active');
    }

    menuButton.addEventListener('click', function (e) {
        body.classList.toggle('no-scroll');
        nav.classList.toggle('is-active');
        e.preventDefault();
    });

  },

  events: {
    
  },

  helpers: {
    
  }
};