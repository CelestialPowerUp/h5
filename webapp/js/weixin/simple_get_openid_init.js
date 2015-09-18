yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('parameter');

app.open_id_init = {};

yangaiche(sys.load_module)('init_open_id_params');

var snsapi = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app.open_id_init.appId + '&redirect_uri=' + encodeURIComponent(window.location.href) + '&state=simple_get_openid&response_type=code&scope=snsapi_userinfo#wechat_redirect';

var reqParam = yangaiche(app.url_parameter), store = yangaiche(sys.local_storage), to_snsapi = true;
if (reqParam['simple_get_openid']) {
    yangaiche(app.http.get_request)("login_by_wx_code.json?code=" + reqParam['code'] + "&situation=" + app.open_id_init.situation, {}, function (data) {
        store.set("external_sale_wechat_openid", data.openid);
        window.location.href = './activity.html?to_pay=true';
    }, function (data) {
        store.set("external_sale_wechat_openid", data.data);
        window.location.href = './activity.html?to_pay=true';
    });
    to_snsapi = false;
}

if (to_snsapi) {
    window.location.href = snsapi;
}