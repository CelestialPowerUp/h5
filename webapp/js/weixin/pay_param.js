yangaiche(sys.load_default_module)('openid', {});
yangaiche(sys.load_default_module)('user', {});

app.pay.get_extra_param = 'get_pay_extra_param';

yangaiche(app.pay.get_extra_param, function() {
    return function(param) {
        param.channel = 'wx_pub';
        param.extra = { open_id: yangaiche(sys.local_storage).get(ls.openid.open_id) || yangaiche(ls.user.touch)()[ls.user.openid] };
    };
});
