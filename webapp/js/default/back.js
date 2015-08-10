yangaiche(sys.load_default_module)('repository', {});

ls.back = {
    module_name: 'back',
    to_reload: 'to_reload',
    to_reload_value: 'T'
};

yangaiche(ls.back.module_name, function () {
    return {
        go_back_to_reload: function () {
            yangaiche(sys.local_storage).set(ls.back.to_reload, ls.back.to_reload_value);
            window.history.back();
        },
        check_reload_cmd: function () {
            var storage = yangaiche(sys.local_storage);
            if (ls.back.to_reload_value === storage.get(ls.back.to_reload)) {
                storage.remove(ls.back.to_reload);
                window.location.reload();
            }
        }
    };
});