yangaiche(sys.load_default_module)('local_storage_repository', {});

yangaiche(ls.openid.module_name, function() {
    return {
        login_by_opencode: function() {
            var now_page = window.location.href;
            yangaiche(sys.local_storage).set(ls.openid.page_before_login, now_page);
            window.location.href = "./open_id.html";
        }
    };
});