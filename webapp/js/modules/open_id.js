/**
 * Created by caols on 7/27/15.
 */

before_order_success();

var host = get_host();

var script_url;
var platform = $.ajax({
    url: 'platform.json',
    cache: false,
    async: false,
    dataType: 'json'
});
console.log(platform);
if ('wechat' === platform.responseJSON['platform']) {
    script_url = 'js/openid/wechat.js';
    getStore().set('channel', 'wx_pub');
} else if ('xiaomi' === platform.responseJSON['platform']) {
    script_url = 'js/openid/xiaomi.js';
    getStore().set('channel', 'alipay_wap');
} else if ('mirc' === platform.responseJSON['platform']) {
    script_url = 'js/openid/xiaomi.js';
    getStore().set('channel', 'alipay_wap');
} else if ('alipay' === platform.responseJSON['platform']) {
    script_url = 'js/openid/alipay.js';
    getStore().set('channel', 'alipay_wap');
} else if ('normal' === platform.responseJSON['platform']) {
    script_url = 'js/openid/normal.js';
    getStore().set('channel', 'alipay_wap');
} else if ('rc' === platform.responseJSON['platform']) {
    script_url = 'js/openid/normal.js';
    getStore().set('channel', 'alipay_wap');
}

console.log(script_url);
var script = $.ajax({
    type: 'GET',
    url: script_url,
    cache: false,
    async: false,
    dataType: 'text'
});
console.log(script);
var oBody = document.getElementsByTagName('body').item(0);
var oScript = document.createElement("script");
oScript.language = "javascript";
oScript.type = "text/javascript";
oScript.defer = true;
oScript.text = script.responseText;
oBody.appendChild(oScript);