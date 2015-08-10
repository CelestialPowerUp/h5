yangaiche(sys.load_default_module)('repository', {});
yangaiche(ls.load_default_module)('back', {});

ls.openid = {
    module_name: 'openid',
    open_id: 'open_id',
    page_before_login: 'page_before_login'
};

yangaiche(ls.openid.module_name, function () {
    return {
        login_by_opencode: function () {
            var now_page = window.location.href;
            yangaiche(sys.local_storage).set(ls.openid.page_before_login, now_page);
            window.location.href = "./open_id.html";
        },
        before_login: function () {
            var url = yangaiche(sys.local_storage).get(ls.openid.page_before_login);
            window.history.replaceState(null, null, url);
        },
        after_login: function () {
            var back = yangaiche(ls.back.module_name);
            back.go_back_to_reload();
        }
    };
});