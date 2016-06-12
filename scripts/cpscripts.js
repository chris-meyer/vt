jQuery(document).ready(function ($) {
  console.log('window.scrollTop() is '+$(window).scrollTop());
  console.log('window.height is '+$(window).height());
  console.log('math result is '+ ($(window).scrollTop() + $(window).height() * 0.75));
    var $timeline_block = $('.cd-timeline-block');
    $timeline_block.each(function (i,v) {
        console.log('offset().top for '+i+' is '+$(this).offset().top);

        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
            console.log("hiding "+i);
            $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        }
    });
    $(window).on('scroll', function () {
        $timeline_block.each(function (i,v) {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
              console.log("onscroll: showing "+i);
                $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });
    });
});
//# sourceURL=pen.js
