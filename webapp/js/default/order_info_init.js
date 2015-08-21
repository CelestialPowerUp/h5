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
    var getReq = yangaiche(app.http.get_request);

    var reqParams = yangaiche(app.url_parameter);
    if (yangaiche(sys.exist)(reqParams['order_id'])) {//有参数，查看页面
        getReq("/v3/api/orders.json?order_id=" + reqParams['order_id'], function (order) {
            yangaiche(app.order_info.show)(order);

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
        order.order_status_key = 'creating';
        yangaiche(app.order_info.show)(order);
    }
});