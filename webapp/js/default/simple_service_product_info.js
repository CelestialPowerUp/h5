yangaiche(sys.load_default_module)('car_info');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('order');
yangaiche(sys.load_default_module)('products');
yangaiche(sys.load_default_module)('back');

app.simple_service_products = {
    config: {
        car_beauty_service_product_info: 2,
        renewal_service_product_info: 3,
        home_testing_service_product_info: 4,
        set_loss_service_product_info: 5,
        vehicle_exam_service_product_info: 13
    }
};

yangaiche(sys.init)(function (t) {
    app.simple_service_products.key = window.location.href.match(/\/.*\/(.*?)\.html/)[1];

    var order = yangaiche(ls.order.touch)(),
        service_type = app.simple_service_products.config[app.simple_service_products.key];
    yangaiche(app.http.get_request)('/v1/api/products.json?service_type=' + service_type + '&supplier_id=' + order.supplier_id + '&car_model_type=' + order.car_model_type, function (data) {
        var total_price = yangaiche(ls.products.calculate)(data['required_products']);
        t('#total_price').html('¥' + total_price);
        yangaiche(ls.products.set)(data['required_products']);

        // 下一步按钮
        t('#next').click(function () {
            yangaiche(sys.local_storage).set(key.submit_button.submit_text_key, key.submit_button.submit_text_value3);

            yangaiche(ls.back.set_back_to_self)('base_info.html');
        });
    }, function () {
        yangaiche(app.show_msg.show)("AJAX ERROR!");
    });
});
