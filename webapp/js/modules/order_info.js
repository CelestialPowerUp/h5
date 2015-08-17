/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    t(function () {

        if (!getStore().get('open_id')) {
            retry('open_id', 30, function() {
                getStore().set('open_id_back', window.location.href.match(/\/.*\/(.*?\.html\?order_id=\d*)/)[1]);
                window.location.href = './open_id.html';
            });
        }

        $("#submit_button").click(function () {
            getStore().remove('open_id');
//            disable_button("submit_button");
//
////            alert(t('#submit_button').text());
//            if (t('#submit_button').text() === '立即付款') {
//                var order_info = getStore().get('display_order');
//                var param = {
//                    subject: "养爱车-" + order_info['order_type'],
//                    body: "养爱车-" + order_info['order_type'],
//                    order_id: order_info['id']
//                };
//                loadCfg('platform.json', function (platform) {
//                    if ('wechat' === platform['platform']) {
//                        param['channel'] = 'wx_pub';
//                        param['extra'] = { open_id: getStore().get('open_id') };
//                    } else {
//                        param['channel'] = 'alipay_wap';
//                        param['extra'] = {
//                            success_url: 'http://' + get_host().replace(/%2F/g, '/') + platform['platform'] + '/order_info_suc.html?order_id=' + getReqParam()['order_id'],
//                            cancel_url: 'http://' + get_host().replace(/%2F/g, '/') + platform['platform'] + '/order_info.html?order_id=' + getReqParam()['order_id']
//                        };
//                    }
//                });
//                postChargeReq('charge', param, function (charge) {
//
//                    if ('alipay_wap' === param['channel']) {
//                        set_back_to_home();
//                    }
//
//                    pingpp.createPayment(charge, function (result, error) {
//                        if (result == "success") {
//                            // 微信公众账号支付的结果会在这里返回
////                            alert('微信公众账号支付的结果会在这里返回');
//                            loadCfg('platform.json', function (platform) {
//                                if ('wechat' === platform['platform']) {
//                                    wx.closeWindow();
//                                } else if ('alipay' === platform['platform']) {
//                                    AlipayJSBridge.call('exitApp');
//                                }
//                            });
//                        } else if (result == "fail") {
//                            // charge 不正确或者微信公众账号支付失败时会在此处返回
//                            reset_button("submit_button");
//                            show_msg("支付失败");
////                            alert('charge 不正确或者微信公众账号支付失败时会在此处返回');
////                            for (var i in error) {
////                                if('function' !== typeof(error[i])) {
////                                    alert(i + ' : ' + error[i]);
////                                }
////                            }
////                            alert('finished alert error');
//                        } else if (result == "cancel") {
//                            // 微信公众账号支付取消支付
//                            reset_button("submit_button");
//                            show_msg('您已取消支付');
//                        }
//                    });
//                }, function (error) {
//                    alert(error);
//                });
//            } else {
//                var formdata = getOrder();
//                var user = getUser();
//                formdata.user_id = user.user_id;
//                formdata.peer_source = loadCfg('platform.json', function (platform) {
//                    return conditionalReturn(platform);
//                });
//                formdata.total_price = null;
//                console.log(formdata);
//                postReq("/v2/api/order/create", formdata, function (data) {
////                clearOrder();
//                    updateSuccessOrder(data);
//
//                    set_back_to_home();
//
//                    window.location.href = './order_success.html';
//                }, function (data) {
//                    reset_button("submit_button");
//                    show_msg("下单失败:" + data['message']);
//                });
//            }
        });

        //var order_info = getOrder();

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
                if (order['coupon_price'] > 0) {
                    order['coupon'] = {value:order['coupon_price'].toFixed(2)};
                }
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
                order['coupon'] = {value:order['coupon_value'].toFixed(2)};
            }
            parse_data(order);
            t('#submit_button').text('立即预约');
            t('#submit_button').css('display', 'block');
        }

    })
}(window.jQuery);