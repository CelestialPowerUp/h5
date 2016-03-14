;(function () {

    'use strict';

	yangaiche(sys.load_default_module)('back');
	yangaiche(sys.load_default_module)('order');
    yangaiche(sys.load_default_module)('parameter');
    yangaiche(sys.load_default_module)('pay');
    yangaiche(sys.load_module)('order/get_payment_order_id');

    yangaiche(sys.init)(function (t) {
        if (yangaiche(app.url_parameter).msg_key) {
            yangaiche(ls.back.set_back_to_store)('order_success_v2.html');
            return;
        }

        t('.normal-bottom-btn-div').css('display', 'block');
        t('#pay_button').css('display', 'none');

        var info_template = Handlebars.compile(t('#info-tpl').html());
        var order_info = yangaiche(ls.order.touch)();
        order_info.total_price = order_info.total_price.toFixed(1);
        t('#info_view').html(info_template(order_info));

        t('#close_button').click(function () {
            yangaiche(sys.load_module)('close_app');
        });

    });
}());