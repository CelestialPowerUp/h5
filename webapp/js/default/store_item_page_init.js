yangaiche(sys.load_default_module)('repository', {});
yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('show_msg', {});
yangaiche(sys.load_default_module)('order', {});

yangaiche(sys.init)(function(t) {
    var device_width = t(window).width();

    t('#store-item-footer div').width(device_width - 200);

    //var raw_data = '{"data":{"ware_type_id":1,"ware_status":"down_shelves","ware_id":1,"introduction_imgs":[{"img_id":1052,"img_index":0,"original_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s1024.jpg","raw_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg","thumbnail_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s250.jpg"}],"ware_full_price":3232,"ware_type_name":"室内清洗","cover_img_id":1052,"product_id":2,"product_info":"机油-磁护","ware_mark_price":94.5,"ware_name":"室内清洗","brief_introduction":"简介备注","cover_img":{"thumbnail_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s250.jpg","img_index":0,"img_id":1052,"original_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s1024.jpg","raw_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg"},"ware_products":[{"product_price":94.5,"product_id":2,"product_name":"磁护","product_category":"机油"}]},"code":"00000"}';
    //var data = JSON.parse(raw_data)['data'];

    function make_array(size) {
        var array = [];
        for (var i = 0; i < size; i++) {
            array.push(i);
        }
        return array;
    }

    var getReq = yangaiche(app.http.get_request), show_msg = yangaiche(app.show_msg.show);
    var page = 1, total_size = 0, real_total_size = 0, page_size = 2, active = true, product_ids = '';
    var store_item = null;

    function load_suc(data, callback) {
        t.each(data['items'], function (i, d) {
            d['order_rating'] = make_array(d['service_rating']);
            d['keeper_rating'] = make_array(d['keeper_rating']);
            d['create_time'] = d['create_time'].substr(0, (4 + 2 + 1 + 2 + 1));
        });

        if (data['items'].length > 0) {
            var tpl = Handlebars.compile(t("#store_item_comment_tpl").text());
            t('#store-item-comments ul').append(tpl(data['items']));

            page = parseInt(data['cur_page']) + 1;
            total_size = parseInt(data['total_size']);
            real_total_size += data['items'].length;

            if (callback !== undefined && callback !== null) {
                callback();
            }
        }

        var total_height = 0;
        t.each(t('#store-item-comments ul li'), function (i, l) {
            var list = t(l);
            var height = (list.children('p').eq(0).height() + 70 * 2);
            total_height += height;
            list.css('height', height + 'px');
        });
        t('#store-item-comments ul').height(total_height);
    }

    function load_more() {
        var progress = $.AMUI.progress;
        progress.start();
        active = false;
        getReq('/v2/api/order/service_comment/page_list.json?total_size=' + total_size + '&page=' + page + '&page_size=' + page_size + '&product_ids=' + product_ids, function (comment_data) {
            load_suc(comment_data);
            progress.done();
            active = true;
        }, function (error) {
            show_msg(error['message']);
        });
    }

    function load_comments(data) {
        t.each(data['ware_products'], function (i, wp) {
            if (i !== 0) {
                product_ids += ',';
            }
            product_ids += wp['product_id'];
        });

        getReq('/v2/api/order/service_comment/page_list.json?page=' + page + '&page_size=' + page_size + '&product_ids=' + product_ids, function (comment_data) {
            load_suc(comment_data, function () {
                t("body").hammer().on('panend', function () {
                    if (active) {
                        var $this = t(this),
                            viewH = t(window).height(),//可见高度
                            contentH = $this.get(0).scrollHeight,//内容高度
                            scrollTop = $this.scrollTop();//滚动高度
                        if (scrollTop / (contentH - viewH) >= 0.95) { //快到达底部时,加载新内容
                            // 这里加载数据..
                            if (real_total_size === total_size) {
                                show_msg('没有更多评论了! ');
                            } else {
                                setTimeout(load_more, 1);
                            }
                        }
                    }
                });
            });
        }, function (error) {
            show_msg(error['message']);
        });
    }

    getReq('/v2/api/store/ware/detail.json?ware_id=' + yangaiche(app.url_parameter)['ware_id'], function (data) {

        store_item = data;

        data['cover_img']['raw_url'] = data['cover_img']['raw_url'] + '?imageView2/3/w/' + parseInt(device_width) + '/h/' + parseInt(device_width / 16 * 9) + '/interlace/1';

        var tpl = Handlebars.compile(t("#store_item_page_tpl").text());
        t('body').prepend(tpl(data));

        t('#store-item-brief-intro-text').width(device_width - 30 - t('#store-item-go-to-detail').width());

        load_comments(data);
    }, function (error) {
        show_msg(error['message']);
    });

    t('#submit').click(function() {
        if (!yangaiche(sys.exist)(store_item)) {
            return true;
        }

        yangaiche(ls.order.update)(function(order) {
            order['products'] = store_item['ware_products'];
            t.each(order['products'], function(i, wp) {
                wp['total_price'] = wp['product_price'];
                wp['product_type'] = wp['product_id'];
                wp['unit_count'] = 1;
            });
        });

        yangaiche(sys.local_storage).set(key.submit_button.submit_text_key, key.submit_button.submit_text_value1);

        window.location.href = './car_list.html';
    });
});
