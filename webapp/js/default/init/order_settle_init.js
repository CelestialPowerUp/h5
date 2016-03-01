;(function () {
    'use strict';

    //yangaiche(sys.load_module)('');
    //yangaiche(sys.load_default_module)('');
    //yangaiche(sys.load_lib_module)('');

    yangaiche(sys.init)(function (t) {
        t('#pick_time').click(function () {
            t('#popup').css('display', 'block');

            var swiper1 = new Swiper('.swiper-container-day', {
                direction: 'vertical',
                slidesPerView: 'auto',
                slidesPerColumnFill: 'row',
                scrollbarHide: true,
                centeredSlides: false,
                spaceBetween: 24,
                grabCursor: true,
                freeMode: true
            });
            var swiper2 = new Swiper('.swiper-container-time', {
                direction: 'vertical',
                slidesPerView: 'auto',
                slidesPerColumnFill: 'row',
                scrollbarHide: true,
                centeredSlides: false,
                spaceBetween: 24,
                grabCursor: true,
                freeMode: true
            });
        });

        t('#popup .cover').click(function () {
            t('#popup').css('display', 'none');
        });
    });
}());