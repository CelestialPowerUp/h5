;(function () {

    'use strict';

	yangaiche(sys.load_default_module)('store_init');
    yangaiche(sys.load_default_module)('http');
    yangaiche(sys.load_default_module)('parameter');
    yangaiche(sys.load_default_module)('user');
    yangaiche(sys.load_default_module)('show_msg');

    yangaiche(sys.init)(function (t) {

        t('#to_show_user_win').remove();
        t('#home-page-wrapper').empty().css('display', 'block');

        yangaiche(app.http.post_request)('/v1/api/radius/auto_login.json', yangaiche(app.url_parameter), function (data) {
            yangaiche(ls.user.set)(data);
        }, function (error) {
            yangaiche(app.show_msg.show)(error.message || JSON.stringify(error));
        });

        yangaiche(app.http.tweak)(function (type, request_type, url) {
            if (type === app.http.abort_or_hijack) {
                if (url === '/v2/api/store/home_ware_list.json') {
                    return '/v1/api/radius/get_goods_info.json';
                }
                //return url;
                return app.http.abort;
            }
        });

    }, 0);

}());