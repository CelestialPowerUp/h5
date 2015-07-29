!function (t) {
    if (t) {
        t(function () {

            var device_width = t(window).width();
            var product_title = t('.products-title');
            product_title.css('height', (device_width / 640 * 60) + 'px');
            product_title.css('margin-top', (device_width / 640 * 20) + 'px');

            var services = t('#services li');
            var service_height = (services.eq(0).width() / 213 * 170);
            services.css('height', service_height + 'px');
            t('#services').css('height', (service_height * 2) + 'px');

            var square_wrapper = t('.home-page-products li div');
            var square = square_wrapper.eq(0).width();
            square_wrapper.css('height', square + 'px');
            console.log(square);
            var img_height = (square / 290 * 196);
            console.log(img_height);
            var text_height = (square / 290 * 38);
            console.log(text_height);
            var text_wrapper = t('.home-page-products-text');
            text_wrapper.css('height', text_height + 'px');
            text_wrapper.css('line-height', text_height + 'px');
            var image_wrapper = t('.home-page-products li div div:first-child');
            image_wrapper.css('height', img_height + 'px');
            var margin = (square / 290 * 9);
            t('.home-page-products-title').css('margin-top', margin + 'px');
            t('.home-page-products-price').css('margin-down', margin + 'px');

            !function(ids) {
                t.each(ids, function(i, id) {
                    var list = t(id);
                    list.css('height', (parseInt((list.children('li').length + 1) / 2) * (square + 20)) + 'px');
                });
            } (['#online-products', '#offline-products']);

        });
    }
}(window.jQuery);