yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('duplicate_submission', {});
yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('show_msg', {});
yangaiche(sys.load_default_module)('pay', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('order', {});
yangaiche(sys.load_default_module)('location', {});
yangaiche(sys.load_default_module)('order_info', {});

yangaiche(sys.init)(function (t) {
    var disable_button = yangaiche(app.ds.disable_button),
        reset_button = yangaiche(app.ds.reset_button),
        getReq = yangaiche(app.http.get_request),
        postReq = yangaiche(app.http.post_request),
        show_msg = yangaiche(app.show_msg.show);

    var reqParams = yangaiche(app.url_parameter);
    if (yangaiche(sys.exist)(reqParams['order_id'])) {//有参数，查看页面
        getReq("/v3/api/orders.json?order_id=" + reqParams['order_id'], function (order) {
            yangaiche(app.order_info.show)(order);

            t('#submit_button').css('display', 'block');

            //if ()

            t("#submit_button").click(function () {
                disable_button("#submit_button");

                var param = yangaiche(app.pay.get_param)(order,
                    'order_info_suc.html?order_id=' + yangaiche(app.url_parameter)['order_id'],
                    'order_info.html?order_id=' + yangaiche(app.url_parameter)['order_id']);

                yangaiche(app.pay.do)(param);
            });

            t('#order_info_advise_items .order_info_items li img').click(function() {
                t(this).css('display', 'none');
                t(this).siblings('img').css('display', 'inline-block');
            });
        });
    } else {
        var order = yangaiche(ls.order.touch)();
        order.client_basic = {
            name: order['contact_name'],
            phone_number: order['phone_number'],
            car_number: order['car_number'],
            location: yangaiche(ls.location.touch)()
        };
        yangaiche(app.order_info.show)(order);

        t('#submit_button').text('立即预约');

        t("#submit_button").click(function () {
            disable_button("#submit_button");

            var user = yangaiche(ls.user.touch)();
            order.user_id = user.user_id;
            order.peer_source = yangaiche(sys.browser_type).type;
            order.total_price = null;
            postReq("/v2/api/order/create.json", order, function (data) {
                yangaiche(ls.order.set)(data);
                yangaiche(ls.back.set_back_to_store)('./order_success.html');
            }, function (data) {
                reset_button("#submit_button");
                show_msg("下单失败:" + data['message']);
            });
        });
    }
});