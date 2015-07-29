!function (t) {
    if (t) {
        t(function () {

            var device_width = t(window).width();

            t('#store-item-footer div').width(device_width - 200);

            t('#store-item-brief-intro-text').width(device_width - 30 - t('#store-item-go-to-detail').width());

        });
    }
}(window.jQuery);