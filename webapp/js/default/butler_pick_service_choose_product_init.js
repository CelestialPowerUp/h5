yangaiche(sys.load_default_module)('car_info');
yangaiche(sys.load_default_module)('swiper_line');
yangaiche(sys.load_default_module)('template');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('order');
yangaiche(sys.load_default_module)('products');
yangaiche(sys.load_default_module)('back');

yangaiche(sys.init)(function (t) {
    var order = yangaiche(ls.order.touch)(),
        calculate = yangaiche(ls.products.calculate);
    yangaiche(app.http.get_request)('/v1/api/products.json?service_type=11&supplier_id=' + order.supplier_id + '&car_model_type=' + order.car_model_type, function (data) {
        var required_products = data['required_products'], required_price = calculate(data['required_products']), product_dict = {};

        t.each(data['optional_products'] ? data['optional_products'] : [], function (i, p_c) {
            t.each(p_c['products'], function (j, p) {
                p['part_type'] = p_c['part_type'];
                product_dict[p['product_type']] = p;
            });
        });

        var tpl = Handlebars.compile(yangaiche(app.tpl.load)('template/carProducts.html'));
        t('#products').empty().html(tpl(data['optional_products']));

        yangaiche(app.swiper_line.decorate)('#products');

        t.each(t('.my-btn-group'), function (i, btn_group) {
            var part_name = data['optional_products'][i]['part_name'];
            var first_p = t(btn_group).find('button').eq(0);
            if ('空气滤' === part_name) {
                t(first_p).css('background-color', '#FFFFFF');
                t(first_p).css('color', '#333333');
                t(first_p).css('border', '1px solid #cccccc');
            } else {
                var local_rel = first_p.attr('data-rel');
                t(btn_group).attr('data-rel', local_rel);
            }
        });

        function copy(array) {
            var new_array = [];
            t.each(array, function(i, item) {
                new_array.push(item);
            });
            return new_array;
        }

        function recalculate_products(products) {
            var total_price = 0, total_products = products || copy(required_products);
            t.each(t('.my-btn-group'), function (i, btn_group) {
                var selected_rel = t(btn_group).attr('data-rel');
                var p = product_dict[selected_rel];
                if (p) {
                    if (products) {
                        p['total_price'] = parseFloat(calculate([p]));
                        total_products.push(p);
                    }
                    total_price += parseFloat(calculate([p]));
                }
            });
            var now_total_price = (parseFloat(required_price) + total_price).toFixed(2);
            t('#total_price').html('¥' + now_total_price);
            if (products) {
                yangaiche(ls.order.update)(function(order) {
                    order['total_price'] = now_total_price;
                    order['products'] = total_products;
                });
            }
        }

        recalculate_products();

        t('.my-btn-group').on('click', 'button', function (e) {
            var group_p = t(this).parents()[1];
            var local_rel = t(this).attr('data-rel');
            var selected_rel = t(group_p).attr('data-rel');
            if (local_rel == selected_rel) {
                t(group_p).attr('data-rel', '');
                t(this).css('background-color', '#FFFFFF');
                t(this).css('color', '#333333');
                t(this).css('border', '1px solid #cccccc');

                recalculate_products();
                return;
            }

            t(group_p).attr('data-rel', local_rel);
            t(group_p).find('button').css('background-color', '#FFFFFF');
            t(group_p).find('button').css('color', '#333333');
            t(group_p).find('button').css('border', '1px solid #cccccc');
            t(this).css('background-color', '#0db603');
            t(this).css('color', '#FFFFFF');
            t(this).css('border', '1px solid #0db603');

            recalculate_products();
        });

        // 下一步按钮
        t('#next').click(function () {
            yangaiche(ls.order.update)(function (order) {
                order['product_comment'] = t('#comment').val();
            });

            recalculate_products(required_products);

            yangaiche(sys.local_storage).set(key.submit_button.submit_text_key, key.submit_button.submit_text_value1);

            yangaiche(ls.back.set_back_to_self)('base_info.html');
        });
    }, function () {
        yangaiche(app.show_msg.show)("AJAX ERROR!");
    });
});