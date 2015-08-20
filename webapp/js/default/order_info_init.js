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
        console.log(order);
        var template = Handlebars.compile(t("#order_info_tpl").html());
        t("body").prepend(template(order));
    };

    var reqParams = yangaiche(app.url_parameter);
    if (yangaiche(sys.exist)(reqParams['order_id'])) {//有参数，查看页面
        getReq("/v2/api/orders.json?order_id=" + reqParams['order_id'], function (order) {
            order['client_basic'].car_number = order.car.licence.province + order.car.licence.number;
            if (order['coupon_price'] > 0) {
                order['coupon'] = {value: order['coupon_price'].toFixed(2)};
            }

            order.to_select = null;
            order.self_items = [];

            t.each(order['products'], function(i, p) {
                var selection_mode = p['selection_mode'];
                if (selection_mode === 1) {
                    order.self_items.push(p);
                } else if (selection_mode === 2) {
                    if (yangaiche(sys.exist)(order.to_select)) {
                        order.to_select = {
                            selected_items: [],
                            unselected_items: []
                        };
                    }
                    order.to_select.unselected_items.push(p);
                } else if (selection_mode !== 5) {
                    if (yangaiche(sys.exist)(order.to_select)) {
                        order.to_select = {
                            selected_items: [],
                            unselected_items: []
                        };
                    }
                    order.to_select.selected_items.push(p);
                }
            });

            if (order['notPaidPrice'] > 0) {
                order.not_paid = {not_paid_price: order['not_paid_price'] || order['notPaidPrice']};
            }
            order.paid_price = order['paid_price'] || order['paidPrice'];

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