yangaiche(sys.load_default_module)('repository', {});
yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('show_msg', {});
yangaiche(sys.load_default_module)('order', {});
yangaiche(sys.load_default_module)('products', {});
yangaiche(sys.load_default_module)('supplier');

yangaiche(sys.init)(function (t) {
    var device_width = t(window).width();

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
    var store_item = null, service_product_dict = {};

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

    function init(suppliers, service_products) {
        t.each(service_products, function(i, p) {
            service_product_dict[p['product_type']] = p;
            t('#my-btn-group button[data-key="'+p['service_type']+'"]').attr('data-rel', p['product_type']);
        });

        if (service_products.length < 2) {
            t('#my-btn-group button[data-key="self"]').css('display', 'none');
        }

        if (suppliers.length > 0) {
            t('#store-item-supplier span:last-child').text(suppliers[0]['supplier_name']);
        }

        var order = yangaiche(ls.order.touch)(),
            config = suppliers.length > 0 ? '&supplier_id=' + suppliers[0].supplier_id : '';
        getReq('/v2/api/store/ware/detail.json?ware_id=' + yangaiche(app.url_parameter)['ware_id'] + config, function (data) {

            store_item = data;

            t('#item_image_cover').attr('src', data['cover_img']['raw_url'] + '?imageView2/3/w/180/h/180/interlace/1');

            data['cover_img']['raw_url'] = data['cover_img']['raw_url'] + '?imageView2/3/w/' + parseInt(device_width) + '/h/' + parseInt(device_width / 16 * 9) + '/interlace/1';

            var tpl = Handlebars.compile(t("#store_item_page_tpl").text());
            t('body').prepend(tpl(data));

            t('.store-item-u-price').text('¥' + data['ware_mark_price']);
            t('#item_title').text(data['ware_name']);

            load_comments(data);

            t('#submit_btn').click(function () {
                if (!yangaiche(sys.exist)(store_item)) {
                    return true;
                }

                yangaiche(ls.products.update)(function (products) {
                    t.each(store_item['ware_products'], function (i, wp) {
                        wp['total_price'] = wp['product_price'];
                        wp['product_type'] = wp['product_id'];
                        wp['unit_count'] = 1;
                        products.push(wp);
                    });
                    t.each(t('#my-btn-group button'), function(i, btn) {
                        if (t(btn).hasClass('service-type-choose-chosen')) {
                            var selected_service = service_product_dict[t(btn).attr('data-rel')];
                            selected_service['total_price'] = yangaiche(ls.products.calculate_single)(selected_service);
                            products.push(selected_service);
                        }
                    });
                });

                var storage = yangaiche(sys.local_storage);
                var car = storage.get(key.car.info);

                yangaiche(ls.order.update)(function (order) {
                    order.car_id = car.car_id;
                    order.car_model_type = car.car_model_type;
                    order.car_number = car.car_number;
                });

                storage.set(key.submit_button.submit_text_key, key.submit_button.submit_text_value1);

                yangaiche(ls.back.set_back_to_self)('base_info.html');
            });

            var service_type = storage.get(key.service.type);
            if (yangaiche(sys.exist)(service_type)) {
                var btn = t('#my-btn-group button[data-key="' + service_type + '"]');
                if (btn.css('display') === 'none') {
                    t('#my-btn-group button[data-key="keeper"]').click();
                } else {
                    btn.click();
                }
            } else {
                t('#my-btn-group button[data-key="keeper"]').click();
            }
        }, function (error) {
            show_msg(error['message']);
        });
    }

    yangaiche(app.supplier.init)(init);

    t('#store-item-car-choose').click(function () {
        yangaiche(sys.local_storage).remove(key.goto.car_list);
        yangaiche(ls.back.set_back_to_self)('car_list.html');
    });

    function ready_submit() {
        var storage = yangaiche(sys.local_storage);
        var car = storage.get(key.car.info);
        if (!yangaiche(sys.exist)(car)) {
            yangaiche(app.show_msg.show)('请先选车');
            return false;
        }

        t('#popup').css('display', 'block');
    }

    t('#store-item-service-type').click(ready_submit);

    t('#ready_submit').click(ready_submit);

    t('.store-item-cover').click(function () {
        t('#popup').css('display', 'none');
    });

    var storage = yangaiche(sys.local_storage);

    t('#my-btn-group').on('click', 'button', function () {
        var $this = t(this);
        var group_p = $this.parents()[0];
        var local_rel = $this.attr('data-rel');
        var selected_rel = t(group_p).attr('data-rel');
        if (local_rel === selected_rel) {
            return false;
        }

        t(group_p).attr('data-rel', local_rel);
        storage.set(key.service.type, $this.attr('data-key'));
        t('#store-item-service-type span').text($this.text());

        t('.store-item-u-price').text('¥' + (store_item['ware_mark_price'] +
        parseFloat(yangaiche(ls.products.calculate_single)(service_product_dict[local_rel]))));

        t(group_p).find('button').removeClass('service-type-choose-chosen');
        t(group_p).find('button').addClass('service-type-choose-chosen-not');

        $this.removeClass('service-type-choose-chosen-not');
        $this.addClass('service-type-choose-chosen');
    });

    var car_info = storage.get(key.car.info);
    if (yangaiche(sys.exist)(car_info)) {
        t('#store-item-car-choose span').text(car_info.model);
        var short_model = car_info.model.length > 10 ? car_info.model.substr(0, 10) + '...' : car_info.model;
        t('#car_model').text(short_model);
    }
});
