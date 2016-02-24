;(function () {

    'use strict';

	yangaiche(sys.load_default_module)('repository');
    yangaiche(sys.load_default_module)('http');
    yangaiche(sys.load_default_module)('parameter');
    yangaiche(sys.load_default_module)('show_msg');
    yangaiche(sys.load_default_module)('order');
    yangaiche(sys.load_default_module)('products');
    yangaiche(sys.load_default_module)('paging');
    yangaiche(sys.load_default_module)('format');
    yangaiche(sys.load_default_module)('obj_util');

    if (/=42$/.test(window.location.href)) {
        yangaiche(sys.load_default_module)('supplier');
    } else {
        yangaiche(sys.load_module)('supplier');
    }

    yangaiche(sys.load_module)('set_activity_peer_source');

    yangaiche(sys.init)(function (t) {

        if (/=50$/.test(window.location.href)) {
            yangaiche(ls.user.touch)();
            yangaiche(app.http.get_request)('/v1/api/pass_card/exchange_check?code=wei_ka_voucher', function () {
            }, function () {
                yangaiche(ls.back.set_back_to_self)('activities/pubhtml/activity399v2.html');
            });
        }

        var device_width = t(window).width();

        //var raw_data = '{"data":{"ware_type_id":1,"ware_status":"down_shelves","ware_id":1,"introduction_imgs":[{"img_id":1052,"img_index":0,"original_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s1024.jpg","raw_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg","thumbnail_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s250.jpg"}],"ware_full_price":3232,"ware_type_name":"室内清洗","cover_img_id":1052,"product_id":2,"product_info":"机油-磁护","ware_mark_price":94.5,"ware_name":"室内清洗","brief_introduction":"简介备注","cover_img":{"thumbnail_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s250.jpg","img_index":0,"img_id":1052,"original_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg/s1024.jpg","raw_url":"http://7xiqd7.com2.z0.glb.qiniucdn.com/1052.jpg"},"ware_products":[{"product_price":94.5,"product_id":2,"product_name":"磁护","product_category":"机油"}]},"code":"00000"}';
        //var data = JSON.parse(raw_data).data;

        function make_array(size) {
            var array = [];
            for (var i = 0; i < size; i++) {
                array.push(i);
            }
            return array;
        }

        var getReq = yangaiche(app.http.get_request),
            show_msg = yangaiche(app.show_msg.show),
            product_ids = '';

        function load_comments(store_item) {
            t.each(store_item.ware_products, function (i, wp) {
                if (i !== 0) {
                    product_ids += ',';
                }
                product_ids += wp.product_id;
            });

            yangaiche(app.paging.setup)({
                url_request: '/v2/api/order/service_comment/page_list.json?product_ids=' + product_ids,
                data_handler: function (data) {
                    t.each(data.items, function (i, d) {
                        d.order_rating = make_array(d.service_rating);
                        d.keeper_rating = make_array(d.keeper_rating);
                        d.create_time = d.create_time.substr(0, (4 + 2 + 1 + 2 + 1));
                        d.comment_user_name = d.comment_user_name.substr(0, 1) + '**';
                        d.comment_text = yangaiche(app.format.stripscript)(d.comment_text);
                    });

                    var tpl = Handlebars.compile(t('#store_item_comment_tpl').text());
                    t('#store-item-comments ul').append(tpl(data.items));

                    var total_height = 0;
                    t.each(t('#store-item-comments ul li'), function (i, l) {
                        var list = t(l);
                        var height = (list.children('p').eq(0).height() + 70 * 2);
                        total_height += height;
                        list.css('height', height + 'px');
                    });
                    t('#store-item-comments ul').height(total_height);
                }
            });
        }

        var gsth;

        function get_unique_service_type(sth) {
            if (undefined !== sth) {
                gsth = sth;
                return key.service.type + sth + yangaiche(app.url_parameter).ware_id;
            }
            return key.service.type + gsth + yangaiche(app.url_parameter).ware_id;
        }

        function init(suppliers, service_products) {
            if (suppliers.length > 0) {
                t('#store-item-supplier span:last-child').text(suppliers[0].supplier_name);
            } else {
                t('#store-item-supplier span:last-child').text('养爱车综合店');
                t('#my-btn-group button[data-key="self"]').css('display', 'none');
            }

            t.each(service_products, function (i, service_product) {
                service_product.total_price = yangaiche(ls.products.calculate_single)(service_product).toFixed(2);
            });

            t('#my-btn-group').on('click', 'button', function () {
                var $this = t(this);
                var group_p = $this.parents()[0];
                var local_key = $this.attr('data-key');
                var selected_key = t(group_p).attr('data-key');
                if (local_key === selected_key) {
                    return false;
                }

                t(group_p).attr('data-key', local_key);
                storage.set(get_unique_service_type(), $this.attr('data-key'));
                t('#store-item-service-type span').text($this.text());

                const products = yangaiche(ls.products.touch)();
                const mutable_products = yangaiche(app.obj_util.copy)(products);
                t.each(service_products, function (i, service_product) {
                    if (service_product.service_type === local_key) {
                        mutable_products.push(service_product);
                    }
                });

                t('.store-item-u-price').text('¥' + yangaiche(ls.products.calculate)(mutable_products) + '(含服务费)');

                t(group_p).find('button').removeClass('service-type-choose-chosen');
                t(group_p).find('button').addClass('service-type-choose-chosen-not');

                $this.removeClass('service-type-choose-chosen-not');
                $this.addClass('service-type-choose-chosen');
            });

            var config = suppliers.length > 0 ? '&supplier_id=' + suppliers[0].supplier_id : '';
            getReq('/v2/api/store/ware/detail.json?ware_id=' + yangaiche(app.url_parameter).ware_id + config, function (store_item) {

                t.each(store_item.ware_products, function (i, wp) {
                    wp.price = wp.total_price = wp.product_price;
                    wp.product_type = wp.product_id;
                    wp.unit_count = 1;
                    wp.labour_price = 0;
                });
                yangaiche(ls.products.set)(store_item.ware_products);

                t('#item_image_cover').attr('src', store_item.cover_img.raw_url + '?imageView2/3/w/180/h/180/interlace/1');

                store_item.cover_img.raw_url = store_item.cover_img.raw_url + '?imageView2/3/w/' + parseInt(device_width) + '/h/' + parseInt(device_width / 16 * 9) + '/interlace/1';

                var tpl = Handlebars.compile(t('#store_item_page_tpl').text());
                t('body').prepend(tpl(store_item));

                t('#item_title').text(store_item.ware_name);

                load_comments(store_item);

                t('#submit_btn').click(function () {
                    if (!yangaiche(sys.exist)(store_item)) {
                        return true;
                    }

                    var storage = yangaiche(sys.local_storage);

                    var car = storage.get(key.car.info);

                    yangaiche(ls.order.update)(function (order) {
                        order.car_id = car.car_id;
                        order.car_model_type = car.car_model_type;
                        order.car_number = car.car_number;

                        if ('洗车打蜡' === store_item.ware_name) {
                            yangaiche(app.set_activity_peer_source)(order);
                        }

                        t.each(t('#my-btn-group button'), function (i, btn) {
                            if (t(btn).hasClass('service-type-choose-chosen')) {
                                var local_key = t(btn).attr('data-key');
                                order.service_type = local_key;
                                order[ls.products.products_info] = order[ls.products.products_info] || [];
                                t.each(service_products, function (i, service_product) {
                                    if (service_product.service_type === local_key) {
                                        order[ls.products.products_info].push(service_product);
                                    }
                                });
                            }
                        });
                    });

                    storage.set(key.submit_button.submit_text_key, key.submit_button.submit_text_value1);

                    yangaiche(ls.back.set_back_to_self)('base_info.html');
                });

                var service_type = storage.get(get_unique_service_type(suppliers.length > 0 ? suppliers[0].supplier_name : ''));
                if (yangaiche(sys.exist)(service_type)) {
                    var btn = t('#my-btn-group button[data-key="' + service_type + '"]');
                    if (btn.css('display') === 'none') {
                        t('#my-btn-group button[data-key="keeper"]').click();
                    } else {
                        btn.click();
                    }
                } else {
                    var self_btn = t('#my-btn-group button[data-key="self"]');
                    if (self_btn.css('display') === 'none') {
                        t('#my-btn-group button[data-key="keeper"]').click();
                    } else {
                        self_btn.click();
                    }
                }
            }, function (error) {
                show_msg(error.message);
            });
        }

        yangaiche(app.supplier.init)(init, yangaiche(app.url_parameter).ware_id);

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


        var car_info = storage.get(key.car.info);
        if (yangaiche(sys.exist)(car_info)) {
            t('#store-item-car-choose span').text(car_info.model);
            var short_model = car_info.model.length > 10 ? car_info.model.substr(0, 10) + '...' : car_info.model;
            t('#car_model').text(short_model);
        }
    });

}());