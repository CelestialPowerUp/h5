;(function () {

    'use strict';

	//yangaiche(sys.load_default_module)('init/store_init');
    yangaiche(sys.load_default_module)('http');
    yangaiche(sys.load_default_module)('parameter');
    yangaiche(sys.load_default_module)('user');
    yangaiche(sys.load_default_module)('back');
    yangaiche(sys.load_default_module)('show_msg');

    yangaiche(sys.init)(function (t) {

        var get_user = yangaiche(ls.user.touch),
            set_back_to_self = yangaiche(ls.back.set_back_to_self);

        t('#to_show_user_win').remove();
        t('#home-page-wrapper').empty().css('display', 'block');

        yangaiche(app.http.tweak)(function (type, request_type, url) {
            if (type === app.http.abort_or_hijack) {
                if (url === '/v1/api/radius/auto_login.json') {
                    var user = get_user();
                    if (user) {
                        set_back_to_self('shequbanjing_store.html');
                        return app.http.abort;
                    }
                    return url;
                }
                return app.http.abort;
            }
        });

        yangaiche(app.http.post_request)('/v1/api/radius/auto_login.json', yangaiche(app.url_parameter), function (data) {
            yangaiche(ls.user.set)(data);
            set_back_to_self('shequbanjing_store.html');
        }, function (error) {
            yangaiche(app.show_msg.show)(error.message || JSON.stringify(error));
        });

    }, 0);

}());