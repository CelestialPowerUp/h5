/**
 * Created by caols on 15-6-5.
 */
var snsapi = 'https://account.xiaomi.com/oauth2/authorize?client_id=2882303761517266846&response_type=token&redirect_uri=http%3A%2F%2F' + host + 'xiaomi%2Fopen_id.html';

var reqParam = getReqParam(), to_snsapi = true;
var accessToken = reqParam['access_token'];//小米返回的access_token值
var macKey = reqParam['mac_key'];//获取小米userId需要用到的macKey
if (accessToken && macKey) {
    alert(accessToken);
    alert(macKey);
    //var url = '/carusers/account/userid/range/'+accessToken+'/'+macKey;
    //var obj;
    //obj = $.ajax({
    //    type: type,
    //    url: url,
    //    data: data,
    //    dataType: "json",
    //    contentType: "application/json",
    //    cache: false,
    //    async: false,
    //    timeout: 15 * 1000,
    //    success: function (data) {
    //        if (data != null) {
    //            var phoneNumber = data[2];
    //            var openId = data[1];
    //            getStore().set('user_mobile', phoneNumber);
    //            getStore().set("open_id", openId);
    //
    //            postReq("login_by_xiaomi_openid.json?code="+openId,{},function(data){
    //                updateUser(data);
    //                after_login();
    //            },function(data){
    //                if(data && data['code'] == '10007'){
    //                    show_login_win();
    //                }
    //            });
    //        }
    //    },
    //    beforeSend: function () {
    //        //showLoading();
    //    },
    //    complete: function () {
    //        //hideLoading();
    //    }
    //});

    to_snsapi = false;
}

if (to_snsapi) {
    window.location.href = snsapi;
}