(function($){
    $(document).ready(function(){
        var historySlider = new Swiper('.js-history-slider', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<div class="' + className + '">' + (2016 - index) + '</div>';
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });

})(jQuery);
