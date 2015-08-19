yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('pay', {});

yangaiche(sys.init)(function (t) {
    var getReq = yangaiche(app.http.get_request);

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

            t('#submit_button').text('关闭');
            t('#submit_button').css('display', 'block');

            t("#submit_button").click(function () {
                yangaiche(sys.load_module)('close_app', {});
            });
        });
    }
});
