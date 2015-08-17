yangaiche(sys.load_default_module)('car_info');
yangaiche(sys.load_default_module)('template');
yangaiche(sys.load_default_module)('http');

yangaiche(sys.init)(function(t) {
    yangaiche(app.http.get_request)('products.json?service_type=' + service_type + '&car_model_type=' + car_model_type, function (data) {
        console.log(data);

        after_param = after_param || {};
        after_param['ret_data'] = data;
        if (typeof(eval(after)) == "function") {
            if (debugging) {
                console.log('running after');
            }
            after(after_param);
        }
    }, function () {
        alert("AJAX ERROR!");
    });
});