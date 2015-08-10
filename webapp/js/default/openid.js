yangaiche(sys.load_default_module)('repository', {});
yangaiche(ls.load_default_module)('back', {});

ls.openid = {
    login_by_opencode: 'login_by_opencode',
    before_login: 'before_login',
    after_login: 'after_login',
    open_id: 'open_id',
    page_before_login: 'page_before_login'
};

yangaiche(ls.openid.login_by_opencode, function () {
    return function () {
        var now_page = window.location.href;
        yangaiche(sys.local_storage).set(ls.openid.page_before_login, now_page);
        window.location.href = "./open_id.html";
    };
});

yangaiche(ls.openid.before_login, function () {
    return function () {
        var url = yangaiche(sys.local_storage).get(ls.openid.page_before_login);
        window.history.replaceState(null, null, url);
    };
});

yangaiche(ls.openid.after_login, function () {
    return function () {
        yangaiche(ls.back.go_back_to_reload)();
    };
});
