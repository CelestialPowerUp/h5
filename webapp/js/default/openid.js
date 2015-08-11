yangaiche(sys.load_default_module)('repository', {});
yangaiche(sys.load_default_module)('back', {});
yangaiche(sys.load_default_module)('env', {});

ls.openid = {
    login_by_opencode: 'login_by_opencode',
    show_login_win: 'show_login_win',
    after_login: 'after_login',
    get_redirect_uri: 'get_redirect_uri',
    
    open_id: 'open_id',
    user_gender: 'user_gender',
    user_mobile: 'user_mobile',
    user_real_name: 'user_real_name',
    page_before_login: 'page_before_login'
};

yangaiche(ls.openid.login_by_opencode, function () {
    return function () {
        var now_page = window.location.href;
        yangaiche(sys.local_storage).set(ls.openid.page_before_login, now_page);
        window.history.replaceState(null, null, url);
        window.location.href = "./open_id.html";
    };
});

yangaiche(ls.openid.show_login_win, function () {
    return function () {
        var url = yangaiche(sys.local_storage).get(ls.openid.page_before_login);
        window.history.replaceState(null, null, url);
        window.location.href = "./login.html";
    };
});

yangaiche(ls.openid.after_login, function () {
    return function (num) {
        yangaiche(ls.back.go_back_to_reload)(num);
    };
});

yangaiche(ls.openid.get_redirect_uri, function () {
    return function () {
        return 'http://' + yangaiche(app.env.get_host) + 'open_id.html';
    }();
});
