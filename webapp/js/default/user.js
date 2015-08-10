yangaiche(sys.load_default_module)('repository', {});
yangaiche(sys.load_default_module)('openid', {});

ls.user = {
    module_name: 'user',
    user_info: 'user_info'
};

yangaiche(ls.user.module_name, function () {
    return {
        if_exist: function (callback) {
            var user_info = yangaiche(sys.local_storage).get(ls.user.user_info);
            if (yangaiche(sys.exist)(user_info)) {
                callback(user_info);
            }
        },
        set: function (user) {
            yangaiche(sys.local_storage).set(ls.user.user_info, user);
        },
        touch: function () {
            var user_info = yangaiche(sys.local_storage).get(ls.user.user_info);
            if (!yangaiche(sys.exist)(user_info)) {
                yangaiche(ls.openid.module_name).login_by_opencode();
            }
            return user_info;
        }
    };
});