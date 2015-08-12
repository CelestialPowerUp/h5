yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('env', {});
yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('http', {});

app.pay = {
    get_param: 'get_param',
    do: 'to_pay'
};

yangaiche(app.pay.get_param, function() {
    function fn1(param) {
        param.channel = 'wx_pub';
        param.extra = { open_id: yangaiche(sys.local_storage).get(ls.openid.open_id) || yangaiche(ls.user.touch)()[ls.user.openid] };
    }
    function fn2(param, success_url, cancel_url) {
        param.channel = 'alipay_wap';
        param.extra = {
            success_url: yangaiche(app.env.get_host) + success_url,
            cancel_url: yangaiche(app.env.get_host) + cancel_url
        };
    }
    return function(order, success_url, cancel_url) {
        var param = {
            subject: "???-" + order['order_type'],
            body: "???-" + order['order_type'],
            order_id: order['id']
        };
        yangaiche(app.env.do_sth_by_browser)({
            weixin: fn1(param),
            yangaiche: fn2(param, success_url, cancel_url),
            alipay: fn2(param, success_url, cancel_url),
            xiaomi: fn2(param, success_url, cancel_url),
            normal: fn2(param, success_url, cancel_url)
        });
        return param;
    };
});

yangaiche(app.pay.do, function() {
    return function(param) {
        yangaiche(app.http.post_charge_request)('/v1/api/charge', param, function (charge) {
            pingpp.createPayment(charge, function (result, error) {
                if (result == "success") {
                    // ?????????????????
                    function fn() {
                    }
                    yangaiche(app.env.do_sth_by_browser)({
                        weixin: function () {
                            wx.closeWindow();
                        },
                        alipay: function () {
                            AlipayJSBridge.call('exitApp');
                        },
                        xiaomi: fn,
                        normal: fn,
                        yangaiche: fn
                    });
                } else if (result == "fail") {
                    // charge ??????????????????????
                    reset_button("#submit_button");
                    show_msg("????");
                } else if (result == "cancel") {
                    // ????????????
                    reset_button("#submit_button");
                    show_msg('??????');
                }
            });
        }, function (error) {
            show_msg(error);
        });
    };
});
