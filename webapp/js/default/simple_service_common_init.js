;(function () {

    'use strict';

    yangaiche(sys.load_default_module)('http');
    yangaiche(sys.load_default_module)('show_msg');
    yangaiche(sys.load_default_module)('order');
    yangaiche(sys.load_default_module)('products');
    yangaiche(sys.load_default_module)('back');
    yangaiche(sys.load_default_module)('supplier');

    app.simple_service_products = {
        config: {
            car_beauty_service: 12,
            renewal_service: 13,
            home_testing_service: 14,
            set_loss_service: 15
        }
    };

    yangaiche(sys.init)(function (t) {
        function init() {
            app.simple_service_products.key = window.location.href.match(/\/.*\/(.*?)\.html/)[1];

            var order = yangaiche(ls.order.touch)(),
                service_type = app.simple_service_products.config[app.simple_service_products.key];

            //var config = yangaiche(sys.exist)(order.supplier_id) ? '&supplier_id=' + order.supplier_id : '';

            yangaiche(app.http.get_request)('/v2/api/products.json?service_type=' + service_type + '&car_model_type=' + order.car_model_type, function (data) {
                yangaiche(ls.products.set)(data.required_products);

                // 去支付按钮
                t('#store-item-footer .submit').click(function () {
                    var storage = yangaiche(sys.local_storage);
                    var car = storage.get(key.car.info);
                    if (!yangaiche(sys.exist)(car)) {
                        yangaiche(app.show_msg.show)('请先选车');
                        return false;
                    }

                    yangaiche(sys.local_storage).set(key.submit_button.submit_text_key, key.submit_button.submit_text_value3);

                    yangaiche(ls.back.set_back_to_self)('order_settle.html');
                });

                t('#store-item-car-choose').click(function () {
                    yangaiche(sys.local_storage).remove(key.goto.car_list);
                    yangaiche(ls.back.set_back_to_self)('car_list.html');
                });
            }, function () {
                yangaiche(app.show_msg.show)('AJAX ERROR!');
            });
        }

        init();
        //yangaiche(app.supplier.init)(init);

        var car_info = yangaiche(sys.local_storage).get(key.car.info);
        if (yangaiche(sys.exist)(car_info)) {
            t('#store-item-car-choose .car-info-text').text(car_info.car_number);
            //var short_model = car_info.model.length > 10 ? car_info.model.substr(0, 10) + '...' : car_info.model;
            t('#car_model').text(car_info.car_number);
        }
    });

}());