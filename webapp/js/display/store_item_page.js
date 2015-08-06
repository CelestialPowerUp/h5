!function (t) {
    if (t) {
        t(function () {

            var device_width = t(window).width();

            t('#store-item-footer div').width(device_width - 200);

            //var raw_data = '{"data":{"ware_type_id":1,"ware_status":"down_shelves","ware_id":1,"introduction_imgs":[{"img_id":1052,"img_index":0,"original_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s1024.jpg","raw_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg","thumbnail_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s250.jpg"}],"ware_full_price":3232,"ware_type_name":"室内清洗","cover_img_id":1052,"product_id":2,"product_info":"机油-磁护","ware_mark_price":94.5,"ware_name":"室内清洗","brief_introduction":"简介备注","cover_img":{"thumbnail_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s250.jpg","img_index":0,"img_id":1052,"original_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s1024.jpg","raw_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg"},"ware_products":[{"product_price":94.5,"product_id":2,"product_name":"磁护","product_category":"机油"}]},"code":"00000"}';
            //var data = JSON.parse(raw_data)['data'];

            function make_array(size) {
                var array = [];
                for (var i= 0; i < size; i++) {
                    array.push(i);
                }
                return array;
            }

            getReq('/v2/api/store/ware/detail.json?ware_id=' + getReqParam()['ware_id'], function(data) {

                getStore().set('store_item_spec', data);

                data['cover_img']['raw_url'] = data['cover_img']['raw_url'] + '?imageView2/3/w/'+ parseInt(device_width) +'/h/'+parseInt(device_width / 16 * 9)+'/interlace/1';

                var tpl = Handlebars.compile(t("#store_item_page_tpl").text());
                t('body').prepend(tpl(data));

                t('#store-item-brief-intro-text').width(device_width - 30 - t('#store-item-go-to-detail').width());

                //var raw_data = '{"code":"00000","data":[{"comment_user_id":5,"create_time":"2015-04-09T17:25:32.000","keeper_rating":5,"order_rating":5,"comment_user_name":"帅哥","comment_text":"服务态度真不错，管家师傅很辛苦，而且节约了我很多的时间"},{"comment_user_id":6,"create_time":"2015-04-09T17:25:32.000","keeper_rating":4,"order_rating":2,"comment_user_name":"占山","comment_text":"服务态度真不错，管家师傅很辛苦，而且节约了我很多的时间"}]}';
                //var data = JSON.parse(raw_data)['data'];

                var product_ids = '';
                t.each(data['ware_products'], function(i, wp) {
                    if (i !== 0) {
                        product_ids += ',';
                    }
                    product_ids += wp['product_id'];
                });

                getReq('v2/api/order/customer_comment/list.json?product_ids=' + product_ids, function(comment_data) {
                    t.each(comment_data, function(i, d) {
                        d['order_rating'] = make_array(d['order_rating']);
                        d['keeper_rating'] = make_array(d['keeper_rating']);
                        d['create_time'] = d['create_time'].substr(0, (4+2+1+2+1));
                    });

                    var tpl = Handlebars.compile(t("#store_item_comment_tpl").text());
                    t('#store-item-comments').empty().html(tpl(comment_data));

                    var total_height = 0;
                    t.each(t('#store-item-comments ul li'), function(i, l) {
                        var list = t(l);
                        var height = (list.children('p').eq(0).height() + 70 * 2);
                        total_height += height;
                        list.css('height', height + 'px');
                    });
                    t('#store-item-comments ul').height(total_height);
                }, function(error) {
                    show_msg(error['message']);
                });

            }, function(error) {
                show_msg(error['message']);
            });

        });
    }
}(window.jQuery);
