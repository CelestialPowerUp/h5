yangaiche(sys.load_default_module)('order', {});
yangaiche(sys.load_default_module)('parameter', {});
yangaiche(sys.load_default_module)('pay', {});

yangaiche(sys.init)(function (t) {
    t('.normal-bottom-btn-div').css('display', 'block');
    
    var order_info = yangaiche(ls.order.touch)();

    if (1 === order_info['pay_mode'] && !order_info['paid'] && order_info['total_price'] > 0) {
        t('#pay_button').css('display', 'block');
    }

    if (yangaiche(app.url_parameter)['suc']) {
        t('#total_price').text('0');
        t('#pay_button').css('display', 'none');
    }

    console.log(order_info);
    var info_template = Handlebars.compile(t("#info-tpl").html());
    order_info.total_price = order_info.total_price.toFixed(2);
    t("#info_view").html(info_template(order_info));

    t('#pay_button').click(function () {
        var param = yangaiche(app.pay.get_param)({order_id: order_info['id']}, 'order_success.html?suc=true', 'order_success.html');
        yangaiche(app.pay.do)(param, function () {
            t('#total_price').text('0');
            t('#pay_button').css('display', 'none');
        });
    });

    t("#close_button").click(function () {
        yangaiche(sys.load_module)('close_app', {});
    });

});