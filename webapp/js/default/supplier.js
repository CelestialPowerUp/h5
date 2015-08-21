yangaiche(sys.load_default_module)('location');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('map');
yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('order');

app.supplier = {
    init: 'supplier_init'
};

yangaiche(app.supplier.init, function() {
    function supplier_adapt(location_info, callback) {
        yangaiche(app.http.get_request)('/v2/api/supplier/adaption.json?longitude=' + location_info['longitude'] + '&latitude=' + location_info['latitude'], function (data) {
            yangaiche(ls.order.update)(function (order) {
                if (data.length > 0) {
                    order.supplier_id = data[0].supplier_id;
                    order.supplier_name = data[0].supplier_name;
                }
            });
            callback(data);
        }, function () {
            yangaiche(app.show_msg.show)("AJAX ERROR!");
        });
    }

    return function(callback) {
        var location_info = yangaiche(ls.location.touch)();
        if (!yangaiche(sys.exist)(location_info['address']) || '' === location_info['address']) {
            yangaiche(app.map.auto_location)(function (address, location_info2) {
                supplier_adapt(location_info2, callback);
            });
        } else {
            supplier_adapt(location_info, callback);
        }
    };
});