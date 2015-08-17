/**
 * Created by caols on 15-6-5.
 */
var situation = "test";
var appId = loadCfg('data.json', function(enviroment) {
    if ('dev' === enviroment['thisis'] || 'staging' === enviroment['thisis']) {
        situation = "test";
        return 'wx6569a515e0c3e346';
    } else {
        situation = "production";
        return 'wxb78dc0eb87da0df9';
    }
});
var snsapi = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=http%3A%2F%2F' + host + 'wechat%2Fopen_id.html&response_type=code&scope=snsapi_base#wechat_redirect';

var reqParam = getReqParam(), to_snsapi = true;
if (reqParam['code']) {
    var open_id_back = getStore().get('open_id_back');
    postReq("login_by_wx_code.json?code="+reqParam['code']+"&situation="+situation,{},function(data){
        getStore().set("open_id",data.openid);
        updateUser(data);
        if (open_id_back) {
            getStore().remove('open_id_back');
            window.history.replaceState(null, null, 'home_with_products.html');
            window.location.href = open_id_back;
        } else {
            after_login();
        }
    },function(data){
        getStore().set("open_id",data.data);
        if (open_id_back) {
            getStore().remove('open_id_back');
            window.history.replaceState(null, null, 'home_with_products.html');
            window.location.href = open_id_back;
        } else {
            if(data && data['code'] == '10007'){
                show_login_win();
            }
        }
    });
    to_snsapi = false;
}

if (to_snsapi) {
    window.location.href = snsapi;
}