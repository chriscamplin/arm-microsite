/*
  The object name should be captialised
  and would usually be namespaced by
  the project/client name, e.g. intu.Pattern.
  Variable and function names should be 
  full words, using camel case with a 
  lowercase first letter.
*/
if (typeof tabs === 'undefined') {
  var tabs = {};
}

tabs = {

  vars: {
    sampleVar: true
  },

  DOM: {

  },

  init: function () {
    //console.log('loaded tabs');
    tabs.tabControl();
    
    $('.more-info-btn').on('click', function() {
      var text = $(this).text();

      $(this).toggleClass('is-active');
      $(this).parent('section').toggleClass('make-space');
      $(this).parent('section').find('p').toggleClass('is-active');
      $(this).html(text === 'More info' ? 'Close' : 'More info');
    });

    /*
     apply the switch when a viewport change is detected on the fly
    (e.g. when you resize the browser window or flip your device from 
    portrait mode to landscape). We set a timer with a small delay to run 
    it only once when the resizing ends. It's not perfect, but it's better
    than have it running constantly during the action of resizing.
    */
    var resizeTimer;
    $(window).on('resize', function(e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        tabs.tabControl();
      }, 250);
    });

    /*
    The function below is responsible for switching the tabs when clicked.
    It switches both the tabs and the accordion buttons even if 
    only the one or the other can be visible on a screen. We prefer
    that in order to have a consistent selection in case the viewport
    changes (e.g. when you esize the browser window or flip your 
    device from portrait mode to landscape).
    */

  },

  tabControl: function() {

    var tabs = $('.tabbed-content').find('.tabs');
    var dragging = false;
    var clickTouchendInProgress = false;

    if(tabs.is(':visible')) {

      tabs.find('a').on('click', function(e) {

        $('body').removeClass('grey');

        var thisHref = $(this).attr('href');

        if(thisHref === '#side_tab5' || thisHref === '#side_tab6') {
          $('body').addClass('grey');
        }

        //console.log(e);
        e.preventDefault();

        var target = $(this).attr('href'),
            tabs = $(this).parents('.tabs'),
            buttons = tabs.find('a'),
            item = tabs.parents('.tabbed-content').find('.item');

        buttons.removeClass('active');
        item.removeClass('active');
        $(this).addClass('active');
        $(target).addClass('active');
      });
      
    } else {

      $('body').on('touchmove', function(){
            dragging = true;
      });

      $('.item').on('touchend', function(e) {
        //console.log(e, $(this), dragging);
        if(dragging) return;
        // handle multiple clicks on IOS //
        if(clickTouchendInProgress) return;

        clickTouchendInProgress = true;
        setTimeout(function(){
            clickTouchendInProgress = false;
        },500);
        
        if (event.target.id === 'download-btn') return;


        e.preventDefault();


        $('body').removeClass('grey');

        var thisId = $(this).attr('id');

        if(thisId === 'side_tab5' || thisId === 'side_tab6') {
          $('body').addClass('grey');
        }


        var itemHeight = $('.item').height();

        if($(this).hasClass('active')) {
          $(this).removeClass('active');
          return;
        }

        var container = $(this).parents('.tabbed-content'),
            currId = $(this).attr('id'),
            items = container.find('.item');

        container.find('.tabs a').removeClass('active');
        items.removeClass('active');
        var eTop = $('#side_tab1').offset().top; //get the offset top of the element
        var thisIndex = $(this).index() ;

        //console.log(eTop, thisIndex, itemHeight,  (eTop*thisIndex) );
        $(this).addClass('active');
        container.find('.tabs a[href$="#'+ currId +'"]').addClass('active');

        $('html, body').animate({ scrollTop: eTop + (73 * thisIndex)});

      });

      $('body').on('touchstart', function(){
          dragging = false;
      });
    } 

  },

  events: {
    
  },

  helpers: {
    
  }
};