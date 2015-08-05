/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {
        t(function () {

            console.log(getOrder());
            clearOrder();
            var order_info = getSuccessOrder();

            if (1 === order_info['pay_mode'] && !order_info['paid'] && order_info['total_price'] > 0) {
//                alert(order_info['pay_mode']);
                t('#pay_button').css('display', 'block');
            }

            if (getReqParam()['suc']) {
                t('#total_price').text('0');
                t('#pay_button').css('display', 'none');
            }

            console.log(order_info);
            var info_template = Handlebars.compile(t("#info-tpl").html());
            order_info.total_price = order_info.total_price.toFixed(2);
            t("#info_view").html(info_template(order_info));

            t('#pay_button').click(function () {
                var param = {
                    subject: "养爱车-" + order_info['order_type'],
                    body: "养爱车-" + order_info['order_type'],
                    order_id: order_info['id']
                };
                loadCfg('platform.json', function (platform) {
                    if ('wechat' === platform['platform']) {
                        param['channel'] = 'wx_pub';
                        param['extra'] = { open_id: getStore().get('open_id') };
                    } else {
                        param['channel'] = 'alipay_wap';
                        param['extra'] = {
                            success_url: 'http://' + get_host().replace(/%2F/g, '/') + platform['platform'] + '/order_success.html?suc=true',
                            cancel_url: 'http://' + get_host().replace(/%2F/g, '/') + platform['platform'] + '/order_success.html'
                        };
                    }
                });
                postChargeReq('charge', param, function (charge) {
//                    alert(1);
                    pingpp.createPayment(charge, function (result, error) {
                        console.log(result);
                        console.log(error);
                        if (result == "success") {
                            // 微信公众账号支付的结果会在这里返回
//                            alert('微信公众账号支付的结果会在这里返回');
                            t('#total_price').text('0');
                            t('#pay_button').css('display', 'none');
                        } else if (result == "fail") {
                            // charge 不正确或者微信公众账号支付失败时会在此处返回
                            show_msg("支付失败");
//                            alert('charge 不正确或者微信公众账号支付失败时会在此处返回');
//                            for (var i in error) {
//                                if('function' !== typeof(error[i])) {
//                                    alert(i + ' : ' + error[i]);
//                                }
//                            }
//                            alert('finished alert error');
                        } else if (result == "cancel") {
                            // 微信公众账号支付取消支付
//                            alert('微信公众账号支付取消支付');
                            show_msg('您已取消支付');
                        }
                    });
                }, function (error) {
                    alert(error);
                });
            });

            t("#close_button").click(function () {
                loadCfg('platform.json', function (platform) {
                    if ('wechat' === platform['platform']) {
                        wx.closeWindow();
                    } else if ('alipay' === platform['platform']) {
                        AlipayJSBridge.call('exitApp');
                    }
                });
            });
        });
    }
}(window.jQuery);