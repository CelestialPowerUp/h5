yangaiche(sys.load_default_module)('openid', {});
yangaiche(sys.load_default_module)('user', {});

app.pay.get_extra_param = 'get_pay_extra_param';

yangaiche(app.pay.get_extra_param, function () {
    return function (param) {
        param.channel = 'wx_pub';
        var openid = yangaiche(sys.local_storage).get(ls.openid.open_id);
        if (!yangaiche(sys.exist)(openid) || openid === '') {
            openid = yangaiche(ls.user.touch)()[ls.user.openid];
        }
        param.extra = {open_id: openid};
    };
});
