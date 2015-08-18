app.swiper_line = {
    decorate: 'decorate_to_swiper'
};

yangaiche(app.swiper_line.decorate, function () {
    var t = yangaiche(sys.$);
    return function (selector) {
        var swipers = [];
        t.each(t(selector).find('.swiper-container'), function(i, sc) {
            t(sc).addClass('swiper-container' + i);
            t(sc).find('.swiper-scrollbar').addClass('swiper-scrollbar' + i);
            var slide0 = t(sc).find('.swiper-slide').eq(0);
            var btn_count = t(sc).find('button').length;
            var len = btn_count * 200 + (btn_count - 1) * 24;
            slide0.css('width', len + 'px');

            var swiper = new Swiper('.swiper-container' + i, {
                direction: 'horizontal',
                scrollbar: '.swiper-scrollbar' + i,
                slidesPerView: 'auto',
                slidesPerColumnFill: 'row',
                scrollbarHide: true,
                centeredSlides: false,
                spaceBetween: 24,
                grabCursor: true,
                freeMode: true
            });
            swipers.push(swiper);
        });
        var scroll_bars = t(selector).find('.swiper-scrollbar');
        scroll_bars.css('margin', '0 0 105px -3px');
        scroll_bars.css('height', '1px');
        return swipers;
    };
});
