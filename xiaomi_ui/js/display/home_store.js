!function (t) {
    if (t) {
        t(function () {

            var device_width = t(window).width();

            var services = t('#services li');
            var service_height = (services.eq(0).width() / 213 * 170);
            services.css('height', service_height + 'px');
            t('#services').css('height', (service_height * 2) + 'px');

            //var raw_data = '{"code":"00000","data":[{"ware_list":[{"product_name":"机油-磁护","ware_mark_price":94.5,"ware_status":"down_shelves","ware_full_price":3232,"ware_type_name":"室内清洗","cover_img":{"img_id":1052,"thumbnail_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s250.jpg","img_index":0,"original_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s1024.jpg","raw_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg"},"ware_id":1,"ware_name":"室内清洗"}],"ware_type_name":"室内清洗"}]}';
            //var data = JSON.parse(raw_data)['data'];

            getReq('/v2/api/store/home_ware_list.json', function(data) {

                var square = t(window).width() / 2 - 15;
                console.log(square);
                var img_height = (square / 290 * 196);
                console.log(img_height);

                t.each(data, function(i, d) {
                    t.each(d['ware_list'], function(j, wl) {
                        if (j % 2 === 0) {
                            wl.odd_or_even = 'odd';
                        } else {
                            wl.odd_or_even = 'even';
                        }
                        wl['cover_img']['raw_url'] = wl['cover_img']['raw_url'] + '?imageView2/3/w/'+parseInt(square)+'/h/'+parseInt(img_height)+'/interlace/1';
                    });
                });

                var tpl = Handlebars.compile(t("#home_store_list_tpl").text());
                t('.home-page-wrapper').append(tpl(data));

                !function() {
                    var product_title = t('.products-title');
                    product_title.css('height', (device_width / 640 * 60) + 'px');
                    product_title.css('margin-top', (device_width / 640 * 20) + 'px');

                    var square_wrapper = t('.home-page-products li a');
                    square_wrapper.css('height', square + 'px');
                    var text_height = (square / 290 * 38);
                    console.log(text_height);
                    var text_wrapper = t('.home-page-products-text');
                    text_wrapper.css('height', text_height + 'px');
                    text_wrapper.css('line-height', text_height + 'px');
                    var image_wrapper = t('.home-page-products li a div:first-child');
                    image_wrapper.css('height', img_height + 'px');
                    var margin = (square / 290 * 9);
                    t('.home-page-products-title').css('margin-top', margin + 'px');
                    t('.home-page-products-price').css('margin-down', margin + 'px');

                    t.each(t('.home-page-products'), function(i, l) {
                        var list = t(l);
                        list.css('height', (parseInt((list.children('li').length + 1) / 2) * (square + 20)) + 'px');
                    });
                } ();

            }, function(error) {
                show_msg(error['message']);
            });

        });
    }
}(window.jQuery);