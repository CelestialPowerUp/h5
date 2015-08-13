yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_module)('pay_param', {});

app.pay = {
    get_param: 'get_param',
    do: 'to_pay',
    to_pay_type_info: 'to_pay_type_info'
};

yangaiche(app.pay.get_param, function() {
    return function(order, success_url, cancel_url) {
        var param = {
            subject: "养爱车-" + order['order_type'],
            body: "养爱车-" + order['order_type'],
            order_id: order['id']
        };
        yangaiche(app.pay.get_extra_param)(param, success_url, cancel_url);
        return param;
    };
});

yangaiche(app.pay.do, function() {
    return function(param) {
        yangaiche(app.http.post_charge_request)('/v1/api/charge', param, function (charge) {
            pingpp.createPayment(charge, function (result) {
                if (result == "success") {
                    yangaiche(sys.load_module)('pay_success', {});
                } else if (result == "fail") {
                    reset_button("#submit_button");
                    show_msg("支付失败");
                } else if (result == "cancel") {
                    reset_button("#submit_button");
                    show_msg('您已取消支付');
                }
            });
        }, function (error) {
            show_msg(error);
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
