var headerContent = [
  'Test Header Content',
  'Subheading text...'
];
var timeLineEventIcons = [
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-movie.svg',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.svg'
];

function setHeader(){
  $('#timeline-header').html('<div><h1>'+headerContent[0]+'</h1><h2>'+headerContent[1]+'</h2></div>');
}

function readEvents(){
  $.getJSON( "data/events.json", function( data ) {
    console.log("Got events JSON");
    var items = [];
    var timeLineContainer = $('section#cd-timeline');
    $.each( data, function( key, el ) {
      //items.push( "<li id='" + key + "'>" + val + "</li>" );
      console.log(el);

      //Create the HTML
      var timeLineItem = [
        '<div class="cd-timeline-block">',
          '<div class="cd-timeline-img cd-picture is-hidden">',
            '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg" alt="Picture">',
          '</div>',
          '<div class="cd-timeline-content is-hidden">',
    				'<h2>'+el.title+'</h2>'
      ];

      if(el.hasOwnProperty('photo')){
        timeLineItem.push(
          '<img class="cd-timeline-content-img" src="'+el.photo+'" alt="Picture">'
        );
      }

      timeLineItem.push(
            '<p>'+el.description+'</p>',
            '<span class="cd-date">'+el.date+'</span>',
          '</div>',
        '</div>'
      );

      timeLineItem = timeLineItem.join('\n');

      //Add the HTML to the DOM
      timeLineContainer.append(timeLineItem);
    });
    setVisClasses();
  });
}

function setVisClasses(){
  //The height of the visible window
  if(window.innerHeight)
  {
    var windowHeight = window.innerHeight;
  }
  else if(document.body.clientHeight)
  {
    var windowHeight = document.body.clientHeight;
  }
  else
  {
    var windowHeight = document.documentElement.clientHeight;
  }

  /*
  * In the below calculation: $(window).scrollTop() + windowHeight * heightFactor
  * $(window).scrollTop() = The current top of the window in pixels
  * windowHeight = the height of the visible window in the browser
  * heightFactor = the factor used to reduce how far to "look ahead" when scrolling down
  * This creates an area and if an event lands in that area, it is shown.
  */

  //Determines how far to "look ahead" when considering the vertical space
   var heightFactor = 0.3;
    //console.log('window.height is '+windowHeight);
    //console.log('init vertical range is '+ ($(window).scrollTop() + windowHeight * heightFactor));
      var $timeline_block = $('.cd-timeline-block');
      $timeline_block.each(function (i,v) {
      //console.log('offset().top for '+i+' is '+$(this).offset().top);

          if ($(this).offset().top > $(window).scrollTop() + windowHeight * heightFactor) {
              //console.log("hiding "+i+" because offset = " + $(this).offset().top);
              $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
          }
      });
      $(window).on('scroll', function () {
          //console.log("new scrollTop: " + $(window).scrollTop());
          //console.log("new vertical range: " + ($(window).scrollTop() + windowHeight * heightFactor));
          $timeline_block.each(function (i,v) {
              //if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * heightFactor && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
              if ($(this).find('.cd-timeline-img').hasClass('is-hidden') && $(this).offset().top <= $(window).scrollTop() + windowHeight * heightFactor) {
                  //console.log("onscroll: showing "+i+" because top offset "+$(this).offset().top+" within range");
                  $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
              }
          });
      });
}

jQuery(document).ready(function ($) {
  setHeader();
  readEvents();
});
