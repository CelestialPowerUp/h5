yangaiche(sys.load_default_module)('env', {});

ls.back = {
    set_back_to: 'set_back_to_anywhere',
    set_back_to_store: 'set_back_to_store',
    set_back_to_self: 'set_back_to_self',
    set_back_to_his: 'set_back_to_his',
    get_parent_of: 'get_parent_of_anything'
};

yangaiche(ls.back.set_back_to, function() {
    var host = yangaiche(app.env.get_host),
        storage = yangaiche(sys.local_storage);
    return function(url, back_to) {
        url = host + url;
        storage.set(url, back_to);
        window.history.replaceState(null, null, back_to);
        window.location.href = url;
    };
});

yangaiche(ls.back.set_back_to_store, function() {
    var host = yangaiche(app.env.get_host);
    return function(url) {
        yangaiche(ls.back.set_back_to)(url, host + 'store.html');
    };
});

yangaiche(ls.back.set_back_to_self, function() {
    return function(url) {
        yangaiche(ls.back.set_back_to)(url, window.location.href);
    };
});

yangaiche(ls.back.set_back_to_his, function() {
    var storage = yangaiche(sys.local_storage);
    return function(url) {
        yangaiche(ls.back.set_back_to)(url, storage.get(url));
    };
});

yangaiche(ls.back.get_parent_of, function() {
    var storage = yangaiche(sys.local_storage);
    return function(url) {
        return storage.get(url);
    };
});
