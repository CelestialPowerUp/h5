yangaiche(sys.load_default_module)('car_info');
yangaiche(sys.load_default_module)('template');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('order');

yangaiche(sys.init)(function (t) {
    var order = yangaiche(ls.order.touch)();
    yangaiche(app.http.get_request)('products.json?service_type=1&supplier_id=' + order.supplier_id + '&car_model_type=' + order.car_model_type, function (data) {

    }, function () {
        yangaiche(app.show_msg.show)("AJAX ERROR!");
    });
});