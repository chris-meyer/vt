var headerContent = [
  'Test Header Content'
];
var timeLineEventIcons = [
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-movie.svg',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.svg'
];

function setHeader(){
  $('#timeline-header').html('<h1>'+headerContent[0]+'</h1>');
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
  //Determines how far to "look ahead" when considering the vertical space
   var heightFactor = 0.1;
    //console.log('window.scrollTop() is '+$(window).scrollTop());
    //console.log('window.height is '+$(window).height());
    //console.log('init vertical range is '+ ($(window).scrollTop() + $(window).height() * heightFactor));
      var $timeline_block = $('.cd-timeline-block');
      $timeline_block.each(function (i,v) {
      //    console.log('offset().top for '+i+' is '+$(this).offset().top);

          if ($(this).offset().top > $(window).scrollTop() + $(window).height() * heightFactor) {
      //        console.log("hiding "+i);
              $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
          }
      });
      $(window).on('scroll', function () {
      //    console.log("new vertical range: " + ($(window).scrollTop() + $(window).height() * heightFactor));
          $timeline_block.each(function (i,v) {
              if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * heightFactor && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
      //          console.log("onscroll: showing "+i+" because top offset within range");
                  $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
              }
          });
      });
}

jQuery(document).ready(function ($) {
  setHeader();
  readEvents();
});
