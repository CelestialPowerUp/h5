yangaiche(sys.load_default_module)('repository', {});

ls.back = {
    go_back_to_reload: 'go_back_to_reload',
    check_reload_cmd: 'check_reload_cmd',
    to_reload: 'to_reload',
    to_reload_value: 'T'
};

yangaiche(ls.back.go_back_to_reload, function () {
    return function (num) {
        yangaiche(sys.local_storage).set(ls.back.to_reload, ls.back.to_reload_value);
        if (yangaiche(sys.exist)(num) && typeof num === 'number' && num < 0) {
            window.history.go(num);
        } else {
            window.history.back();
        }
    };
});

yangaiche(ls.back.check_reload_cmd, function () {
    return function () {
        var storage = yangaiche(sys.local_storage);
        if (ls.back.to_reload_value === storage.get(ls.back.to_reload)) {
            storage.remove(ls.back.to_reload);
            window.location.reload();
        }
    };
});
