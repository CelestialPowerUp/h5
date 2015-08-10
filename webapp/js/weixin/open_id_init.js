yangaiche(sys.load_default_module)('env', {});
yangaiche(sys.load_default_module)('url_parameter', {});
yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('openid', {});
yangaiche(sys.load_default_module)('user', {});

var situation, appId;
function fn1() {
	situation = 'test';
	appId = 'wx6569a515e0c3e346';
}
function fn2() {
	situation = 'production';
	appId = 'wxb78dc0eb87da0df9';
}
yangaiche(app.env.do_sth)({
	dev: fn1,
	staging: fn1,
	production: fn2
});

var snsapi = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=http%3A%2F%2F' + host + 'wechat%2Fopen_id.html&response_type=code&scope=snsapi_base#wechat_redirect';

var reqParam = yangaiche(app.url_parameter), to_snsapi = true;
if (reqParam['code']) {
    yangaiche(app.http.get_req)("login_by_wx_code.json?code="+reqParam['code']+"&situation="+situation,{},function(data){
        yangaiche(ls.user.set)(data);
        after_login();
    },function(data){
        getStore().set("open_id",data.data);
        if(data && data['code'] == '10007'){
            show_login_win();
        }
    });
    to_snsapi = false;
}

if (to_snsapi) {
    window.location.href = snsapi;
}
