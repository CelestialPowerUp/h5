;(function () {
    'use strict';

    //yangaiche(sys.load_module)();
    yangaiche(sys.load_default_module)('http');
    yangaiche(sys.load_default_module)('init/store_item_page_init');

    yangaiche(sys.init)(function (t) {
        // 定义变量

        // 功能代码
        yangaiche(app.http.tweak)(function (type, request_type, url) {
            if (type === app.http.abort_or_hijack) {
                if (/^\/v1\/api\/service_products\.json.*/.test(url)) {
                    return '/v1/api/service_products.json?code=keeper';
                }
                return url;
            }

            if (type === app.http.after_render) {
                if (/^\/v2\/api\/store\/ware\/detail.json.*/.test(url)) {
                    t('#supplier > .text').html('养爱车综合店');
                }
            }
        });
    }, 0);
}());
