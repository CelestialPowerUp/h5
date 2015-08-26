yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('show_msg', {});
yangaiche(sys.load_default_module)('duplicate_submission', {});

app.pay = {
    get_param: 'get_param',
    do: 'to_pay',
    to_pay_type_info: 'to_pay_type_info'
};

yangaiche(app.pay.get_param, function() {
    // 加载方法所需模块
    yangaiche(sys.load_module)('pay_param', {});
    return function(order, success_url, cancel_url) {
        var param = {
            subject: "养爱车-一站式管家服务",
            body: "养爱车-一站式管家服务",
            order_id: order['id']
        };
        yangaiche(app.pay.get_extra_param)(param, success_url, cancel_url);
        return param;
    };
});

yangaiche(app.pay.do, function() {
    var reset_button = yangaiche(app.ds.reset_button),
        show_msg = yangaiche(app.show_msg.show);
    return function(param, success_callback, debug_flag) {
        yangaiche(app.http.post_charge_request)('/v3/api/charge.json', param, function (charge) {
            pingpp.createPayment(charge, function (result, error) {
                if (result == "success") {
                    yangaiche(sys.load_module)('close_app', {});
                    if (yangaiche(sys.exist)(success_callback)) {
                        success_callback();
                    }
                } else if (result == "fail") {
                    reset_button("#submit_button");
                    show_msg("支付失败");
                    if (yangaiche(sys.exist)(debug_flag)) {
                        var keys = Object.keys(error);
                        for (var i = 0; i < keys.length; i++) {
                            if('function' !== typeof(error[keys[i]])) {
                                alert(keys[i] + ' : ' + error[keys[i]]);
                            }
                        }
                        alert('finished alert error');
                    }
                } else if (result == "cancel") {
                    reset_button("#submit_button");
                    show_msg('您已取消支付');
                }
            });
        }, function (error) {
            show_msg(error['message'] || error);
        });
    };
});

yangaiche(app.pay.to_pay_type_info, function() {
    return function(order) {
        if (!yangaiche(sys.exist)(order['pay_mode'])) {
            return "线下支付";
        }
        if (1 === order['pay_mode']) {
            return '在线支付';
        } else if (2 === order['pay_mode']) {
            return '线下支付';
        }
    };
});
