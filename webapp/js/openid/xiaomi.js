/**
 * Created by caols on 15-6-5.
 */
var situation = "test";
var appId = loadCfg('data.json', function(enviroment) {
    if ('dev' === enviroment['thisis'] || 'staging' === enviroment['thisis']) {
        situation = "test";
        return '2882303761517356288';
    } else {
        situation = "production";
        return '2882303761517266846';
    }
});
var snsapi = 'https://account.xiaomi.com/oauth2/authorize?client_id='+ appId +'&response_type=token&redirect_uri=http%3A%2F%2F' + host + 'xiaomi%2Fopen_id.html';

var reqParam = getHashParam(), to_snsapi = true;
var accessToken = reqParam['access_token'];//小米返回的access_token值
//var macKey = reqParam['mac_key'];//获取小米userId需要用到的macKey
if (accessToken/* && macKey*/) {
    alert(accessToken);
    alert(macKey);
    postReq("login_by_xiaomi_openid.json?code="+accessToken+"&situation="+situation,{},function(data){
        getStore().set("open_id",data.openid);
        updateUser(data);
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