yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('duplicate_submission', {});
yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('show_msg', {});
yangaiche(sys.load_default_module)('pay', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('order', {});

yangaiche(sys.init)(function (t) {
    var disable_button = yangaiche(app.ds.disable_button),
        reset_button = yangaiche(app.ds.reset_button),
        getReq = yangaiche(app.http.get_request),
        postReq = yangaiche(app.http.post_request),
        show_msg = yangaiche(app.show_msg.show);

    var parse_data = function (order) {
        var template = Handlebars.compile(t("#user_info_tpl").html());
        t("#user_info_view").html(template(order));

        var product_template = Handlebars.compile(t("#product_info_tpl").html());
        t("#products_view").html(product_template(order.products));

        var paid_template = Handlebars.compile(t("#paid_tpl").html());
        t("#paid_view").html(paid_template(order));

        order.pay_type_info = yangaiche(app.pay.to_pay_type_info)(order);
        var paid_type_template = Handlebars.compile(t("#paid_type_tpl").html());
        t("#paid_type_view").html(paid_type_template(order));
    };

    var reqParams = yangaiche(app.url_parameter);
    if (yangaiche(sys.exist)(reqParams['order_id'])) {//有参数，查看页面
        getReq("/v2/api/orders.json?order_id=" + reqParams['order_id'], function (order) {
            order.car_number = order.car.licence.province + order.car.licence.number;
            order.contact_name = order.client_basic.name;
            order.phone_number = order.client_basic.phone_number;
            order.location = order.client_basic.location;
            if (order['coupon_price'] > 0) {
                order['coupon'] = {value: order['coupon_price'].toFixed(2)};
            }

            parse_data(order);

            if (1 === order['pay_mode'] && !order['paid'] && order['total_price'] > 0) {
                t('#submit_button').text('立即付款');
                t('#submit_button').css('display', 'block');
            }

            t("#submit_button").click(function () {
                disable_button("#submit_button");

                var param = yangaiche(app.pay.get_param)(order,
                    'order_info_suc.html?order_id=' + yangaiche(app.url_parameter)['order_id'],
                    'order_info.html?order_id=' + yangaiche(app.url_parameter)['order_id']);

                yangaiche(app.pay.do)(param);
            });
        });
    } else {
        var order = yangaiche(ls.order.touch)(), user = yangaiche(ls.user.touch)();
        if (order['coupon_value'] > 0) {
            order['coupon'] = {value: order['coupon_value'].toFixed(2)};
        }
        parse_data(order);
        t('#submit_button').text('立即预约');
        t('#submit_button').css('display', 'block');

        t("#submit_button").click(function () {
            disable_button("#submit_button");

            var user = yangaiche(ls.user.touch)();
            order.user_id = user.user_id;
            order.peer_source = yangaiche(sys.browser_type).type;
            order.total_price = null;
            postReq("/v2/api/order/create", order, function (data) {
                yangaiche(ls.order.set)(data);
                yangaiche(ls.back.set_back_to_store)('./order_success.html');
            }, function (data) {
                reset_button("#submit_button");
                show_msg("下单失败:" + data['message']);
            });
        });
    }
});