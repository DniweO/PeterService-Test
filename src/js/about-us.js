(function($){
    $(document).ready(function(){
        var brandItem = $('.js-brand-item');
        var videoPopup = $('.js-video-popup');

       brandItem.hover(function() {
           brandItem.addClass('black-and-white');
           $(this).removeClass('black-and-white');
       }, function () {
           brandItem.removeClass('black-and-white');
       });


       $('.js-show-video').click(function () {
            $('.js-video-popup').addClass('show');
       });

        $('.js-close-video').click(function () {
            $('.js-video-popup').removeClass('show');
            pauseFullScreenVideo();
        });

        $('.js-show-material-popup').click(function () {
            $('.js-material-popup').addClass('show');
        });

        $('.js-close-material-popup').click(function () {
            $('.js-material-popup').removeClass('show');
        })

    });
})(jQuery);
