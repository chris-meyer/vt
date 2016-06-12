
function readEvents(){
  $.getJSON( "data/events.json", function( data ) {
    console.log("Got events JSON");
    var items = [];
    $.each( data, function( key, val ) {
      //items.push( "<li id='" + key + "'>" + val + "</li>" );
      console.log(val);
    });

//    $( "<ul/>", {
//      "class": "my-new-list",
//      html: items.join( "" )
//    }).appendTo( "body" );
  });
}

jQuery(document).ready(function ($) {
  readEvents();
//Determines how far to "look ahead" when considering the vertical space
 var heightFactor = 0.2;
  console.log('window.scrollTop() is '+$(window).scrollTop());
  console.log('window.height is '+$(window).height());
  //console.log('init vertical range is '+ ($(window).scrollTop() + $(window).height() * 0.75));
  console.log('init vertical range is '+ ($(window).scrollTop() + $(window).height() * heightFactor));
    var $timeline_block = $('.cd-timeline-block');
    $timeline_block.each(function (i,v) {
        console.log('offset().top for '+i+' is '+$(this).offset().top);

        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * heightFactor) {
            console.log("hiding "+i);
            $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        }
    });
    $(window).on('scroll', function () {
        console.log("new vertical range: " + ($(window).scrollTop() + $(window).height() * heightFactor));
        $timeline_block.each(function (i,v) {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * heightFactor && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
              console.log("onscroll: showing "+i+" because top offset within range");
                $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });
    });
});
//# sourceURL=pen.js
