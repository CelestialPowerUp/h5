/**
 * Created by caols on 15-6-5.
 */
var snsapi = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2014102800014827&auth_skip=false&scope=auth_userinfo&redirect_uri=http%3A%2F%2F' + host + 'alipay/open_id.html';

var reqParam = getReqParam(), to_snsapi = true;
if (reqParam['auth_code']) {
    //alert('get auth_code : ' + reqParam['auth_code']);
    postReq("login_by_alipay_code.json?code="+reqParam['auth_code'],{},function(data){
        getStore().set("open_id",data['openid']);
        updateUser(data);
        after_login();
    },function(data){
        var json = $.parseJSON(data.data);
        getStore().set('user_gender', json['gender']);
        getStore().set('user_mobile', json['mobile']);
        getStore().set('user_real_name', json['real_name']);
        getStore().set("open_id",json['open_id']);
        if(data && data['code'] == '10007'){
            show_login_win();
        }
    });

    to_snsapi = false;
}

if (to_snsapi) {
    window.location.href = snsapi;
}