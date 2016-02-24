;(function () {

    'use strict';

	yangaiche(sys.load_default_module)('env');

    ls.back = {
        set_back_to: 'set_back_to_anywhere',
        set_back_to_store: 'set_back_to_store',
        set_back_to_self: 'set_back_to_self',
        set_back_to_his: 'set_back_to_his',
        get_parent_of: 'get_parent_of_anything',
        get_parent_of_this: 'get_parent_of_this',

        get_whole_url: 'get_whole_url'
    };

    yangaiche(ls.back.get_whole_url, function () {
        return function (url) {
            if (/https:\/\//.test(url) || /http:\/\//.test(url)) {
                return url;
            }
            return yangaiche(app.env.get_host) + url;
        };
    });

    yangaiche(ls.back.set_back_to, function () {
        var storage = yangaiche(sys.local_storage), wrapper = yangaiche(ls.back.get_whole_url);
        return function (url, back_to) {
            storage.set(wrapper(url), wrapper(back_to));
            window.history.replaceState(null, null, wrapper(back_to));
            window.location.href = wrapper(url);
        };
    });

    yangaiche(ls.back.set_back_to_store, function () {
        var wrapper = yangaiche(ls.back.get_whole_url);
        return function (url) {
            yangaiche(ls.back.set_back_to)(wrapper(url), wrapper('store.html'));
        };
    });

    yangaiche(ls.back.set_back_to_self, function () {
        var wrapper = yangaiche(ls.back.get_whole_url);
        return function (url) {
            yangaiche(ls.back.set_back_to)(wrapper(url), window.location.href);
        };
    });

    yangaiche(ls.back.set_back_to_his, function () {
        var storage = yangaiche(sys.local_storage), wrapper = yangaiche(ls.back.get_whole_url);
        return function (url) {
            yangaiche(ls.back.set_back_to)(wrapper(url), storage.get(wrapper(url)));
        };
    });

    yangaiche(ls.back.get_parent_of, function () {
        var storage = yangaiche(sys.local_storage), wrapper = yangaiche(ls.back.get_whole_url);
        return function (url) {
            var referer = storage.get(wrapper(url));
            if (yangaiche(sys.exist)(referer)) {
                return referer;
            } else {
                return null;
            }
        };
    });

    yangaiche(ls.back.get_parent_of_this, function () {
        var storage = yangaiche(sys.local_storage), wrapper = yangaiche(ls.back.get_whole_url);
        return function () {
            var referer = storage.get(wrapper(window.location.href));
            if (yangaiche(sys.exist)(referer)) {
                return referer;
            } else {
                return null;
            }
        };
    });

}());