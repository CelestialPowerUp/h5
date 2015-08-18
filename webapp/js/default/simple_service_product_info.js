yangaiche(sys.load_default_module)('car_info');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('order');
yangaiche(sys.load_default_module)('products');
yangaiche(sys.load_default_module)('back');

yangaiche(sys.init)(function (t) {
    var order = yangaiche(ls.order.touch)();
    yangaiche(app.http.get_request)('/v1/api/products.json?service_type=1&supplier_id=' + order.supplier_id + '&car_model_type=' + order.car_model_type, function (data) {
        var total_price = yangaiche(ls.products.calculate)(data['required_products']);
        t('#total_price').html('¥' + total_price);
        yangaiche(ls.products.set)(data['required_products']);

        // 下一步按钮
        t('#next').click(function () {
            yangaiche(ls.back.set_back_to_self)('base_info.html');
        });
    }, function () {
        yangaiche(app.show_msg.show)("AJAX ERROR!");
    });
});
