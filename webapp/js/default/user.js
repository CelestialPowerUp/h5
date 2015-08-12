yangaiche(sys.load_default_module)('repository', {});
yangaiche(sys.load_default_module)('openid', {});

ls.user = {
    if_exist: 'if_user_exist',
    set: 'user_set',
    touch: 'user_touch',

    user_info: 'user_info',
    user_id: 'user_id',
    user_phone: 'phone'
};

yangaiche(ls.user.if_exist, function () {
    return function (callback) {
        var user_info = yangaiche(sys.local_storage).get(ls.user.user_info);
        if (yangaiche(sys.exist)(user_info)) {
            callback(user_info);
        }
    };
});

yangaiche(ls.user.set, function () {
    return function (user) {
        yangaiche(sys.local_storage).set(ls.user.user_info, user);
    };
});

yangaiche(ls.user.touch, function () {
    return function () {
        var user_info = yangaiche(sys.local_storage).get(ls.user.user_info);
        if (!yangaiche(sys.exist)(user_info)) {
            yangaiche(ls.openid.login_by_opencode)();
        }
        return user_info;
    };
});
