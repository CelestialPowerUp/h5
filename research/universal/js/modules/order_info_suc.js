/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    t(function () {

        loadCfg('platform.json', function (platform) {
            if ('alipay' === platform['platform']) {
                AlipayJSBridge.call('exitApp');
            }
        });

        var parse_data = function (order_info) {
            console.log(order_info);
            var template = Handlebars.compile(t("#user_info_tpl").html());
            t("#user_info_view").html(template(order_info));

            var product_template = Handlebars.compile(t("#product_info_tpl").html());
            t("#products_view").html(product_template(order_info.products));

            var paid_template = Handlebars.compile(t("#paid_tpl").html());
            t("#paid_view").html(paid_template(order_info));

            order_info.pay_type_info = getPayTypeInfo(order_info);
            var paid_type_template = Handlebars.compile(t("#paid_type_tpl").html());
            t("#paid_type_view").html(paid_type_template(order_info));

        };

        var reqParams = getReqParam();
        if (reqParams['order_id']) {//有参数，查看页面
            getReq("orders.json?order_id=" + reqParams.order_id, function (order) {
                order.car_number = order.car.licence.province + order.car.licence.number;
                order.contact_name = order.client_basic.name;
                order.phone_number = order.client_basic.phone_number;
                order.location = order.client_basic.location;
                parse_data(order);
                getStore().set('display_order', order);

                if (1 === order['pay_mode'] && !order['paid'] && order['total_price'] > 0) {
                    t('#submit_button').text('立即付款');
                    t('#submit_button').css('display', 'block');
                }
            });
        } else {
            var order = getOrder();
            if (order['coupon_value'] > 0) {
                order['coupon'] = {value:order['coupon_value']};
            }
            parse_data(order);
            t('#submit_button').text('立即预约');
            t('#submit_button').css('display', 'block');
        }

    })
}(window.jQuery);