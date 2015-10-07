yangaiche(sys.load_module)('ios/bridge');
yangaiche(sys.load_default_module)('user');
yangaiche(sys.load_default_module)('location');
yangaiche(sys.load_default_module)('order');
yangaiche(sys.load_default_module)('back');

app.supplier = {
    init: 'supplier_init'
};

yangaiche(app.supplier.init, function () {

    function supplier_products(suppliers, callback) {
        var config = suppliers.length > 0 ? '&supplier_id=' + suppliers[0].supplier_id : '';
        yangaiche(app.http.get_request)('/v1/api/service_products.json?code=all' + config, function (data) {
            callback(suppliers, data);
        }, function (error) {
            yangaiche(app.show_msg.show)(error['message']);
        });
    }

    function supplier_adapt(location_info, callback, ware_id) {
        var config = (undefined === ware_id) ? '' : '&ware_id=' + ware_id;
        yangaiche(app.http.get_request)('/v2/api/supplier/adaption.json?longitude=' + location_info['longitude'] + '&latitude=' + location_info['latitude'] + config, function (data) {
            callback(data);
        }, function (error) {
            yangaiche(app.show_msg.show)(error['message']);
        });
    }

    return function (callback, ware_id) {
        //yangaiche(sys.$)('body').append('<script type="text/javascript" src="' + yangaiche(sys.root) + '/js/default/clear_init.js"></script>');
        //yangaiche(sys.$)('body').append('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=WVAXZ05oyNRXS5egLImmentg"></script>');

        yangaiche(app.bridge.connect)(function (bridge) {
            var data = {'Javascript Responds': 'Wee!'};
            bridge.init(function (message, responseCallback) {
                alert('JS responding with: ' + JSON.stringify(data));
                responseCallback(data);
            });
            bridge['callHandler']('getInfo', data, function (responseData) {
                alert('JS got a message: ' + responseData);
                var init = JSON.parse(responseData);
                yangaiche(ls.user.set)(init.user_info);
                yangaiche(ls.location.set)(init.location);
                supplier_adapt(init.location, function (suppliers) {
                    yangaiche(ls.order.update)(function (order) {
                        if (suppliers.length > 0) {
                            order.supplier_id = suppliers[0].supplier_id;
                            order.supplier_name = suppliers[0].supplier_name;
                        }
                    });
                    alert(1);
                    supplier_products(suppliers, callback);
                    alert(2);
                }, ware_id);
            });
        });
    };
});