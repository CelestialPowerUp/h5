;(function () {
    'use strict';

    //yangaiche(sys.load_module)('');
    yangaiche(sys.load_default_module)('http');
    yangaiche(sys.load_default_module)('user');
    yangaiche(sys.load_default_module)('show_msg');
    yangaiche(sys.load_default_module)('parameter');
    yangaiche(sys.load_default_module)('init/butler_pick_service_init');
    //yangaiche(sys.load_lib_module)('');

    yangaiche(sys.init)(function (t) {
        yangaiche(app.http.post_request)('/v1/api/radius/auto_login.json', yangaiche(app.url_parameter), function (data) {
            yangaiche(ls.user.set)(data);
        }, function (error) {
            yangaiche(app.show_msg.show)(error.message || JSON.stringify(error));
        });
    }, 0);
}());