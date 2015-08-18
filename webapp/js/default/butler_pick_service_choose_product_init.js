yangaiche(sys.load_default_module)('car_info');
yangaiche(sys.load_default_module)('template');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('order');

yangaiche(sys.init)(function (t) {
    var order = yangaiche(ls.order.touch)(),
        calculate = yangaiche(ls.products.calculate);
    yangaiche(app.http.get_request)('products.json?service_type=1&supplier_id=' + order.supplier_id + '&car_model_type=' + order.car_model_type, function (data) {
        var required_products = data['required_products'], required_price = calculate(data['required_products']), product_dict = {};

        t.each(data['optional_products'] ? data['optional_products'] : [], function(i, p_c) {
            t.each(p_c['products'], function (j, p) {
                p['part_type'] = p_c['part_type'];
                product_dict[p['product_type']] = p;
            });
        });

        var tpl = Handlebars.compile(yangaiche(app.tpl.load)('template/carProducts.html'));
        t('#products').empty().html(tpl(data['optional_products']));

    }, function () {
        yangaiche(app.show_msg.show)("AJAX ERROR!");
    });
});