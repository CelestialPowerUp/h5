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

        var get_user = yangaiche(ls.user.touch);

        yangaiche(app.http.tweak)(function (type, request_type, url) {
            if (type === app.http.abort_or_hijack) {
                if (url === '/v1/api/radius/auto_login.json') {
                    var user = get_user();
                    if (user) {
                        return app.http.abort;
                    }
                }
                return url;
            }
        });

        yangaiche(app.http.post_request)('/v1/api/radius/auto_login.json', yangaiche(app.url_parameter), function (data) {
            yangaiche(ls.user.set)(data);
        }, function (error) {
            yangaiche(app.show_msg.show)(error.message || JSON.stringify(error));
        });

        t('#store-item-car-choose').click(function () {
            return Boolean(get_user());
        });
    }, 0);
}());