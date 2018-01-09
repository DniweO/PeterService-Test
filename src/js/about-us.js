(function($){
    $(document).ready(function(){

       $('.js-brand-item').hover(function() {
           $('.js-brand-item').addClass('black-and-white');
           $(this).removeClass('black-and-white');
       }, function () {
           $('.js-brand-item').removeClass('black-and-white');
       });


       $(".js-show-video").click(function () {
            $('.js-video-popup').addClass('show');
       })

        $(".js-close-video").click(function () {
            $('.js-video-popup').removeClass('show');
            pauseFullScreenVideo();
        })

        $(".js-show-material-popup").click(function () {
            $('.js-material-popup').addClass('show');
        })

        $(".js-close-material-popup").click(function () {
            $('.js-material-popup').removeClass('show');
        })

    });
})(jQuery);
