yangaiche(sys.init)(function (t) {
    t('#dimmer').click(function () {
        t('#dimmer').hide();
        t('#legend').hide();
        t('#picker').hide();
    });

    t('#pick_time').click(function () {
        t('#dimmer').show();
        t('#legend').show();
        t('#picker').show();

        var swiper = swiper || new Swiper('.swiper-container', {
            direction: 'horizontal',
            scrollbar: '.swiper-scrollbar',
            slidesPerView: 'auto',
            scrollbarHide: true,
            centeredSlides: false,
            grabCursor: true,
            freeMode: true
        });
    });
});