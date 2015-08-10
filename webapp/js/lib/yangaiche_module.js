sys.site_config = 'site_config';
sys.browser_type = 'browser_type';
sys.load_module = 'load_module';
sys.load_default_module = 'load_default_module';

yangaiche(sys.site_config, function () {
    var site_config = null;
    return function () {
        if (!exist(site_config)) {
            site_config = $.ajax({
                url: './map/site.json',
                cache: false,
                async: false,
                dataType: 'json'
            })['responseJSON'];
        }
        console.log(site_config);
        return site_config;
    }();
});

yangaiche(sys.browser_type, function () {
    var type = null, module_root = null;
    return function () {
        if (!type) {
            var user_agent = window.navigator.userAgent.toLowerCase();
            console.log(user_agent);
            for (var i = 0; i < yangaiche(sys.site_config)['browser'].length; i++) {
                var b = yangaiche(sys.site_config)['browser'][i];
                if (user_agent.indexOf(b['userAgent']) >= 0) {
                    type = b['type'];
                    module_root = b['moduleRoot'];
                    if ('normal' !== b['type']) {
                        return {type: type, module_root: module_root};
                    }
                }
            }
        }
        return {type: type, module_root: module_root};
    }();
});

yangaiche(sys.load_module, function () {
    var browser = yangaiche(sys.browser_type);
    console.log(browser);
    return function (name) {
        yangaiche(sys.load)('./js/' + browser.module_root + '/' + name + '.js');
    };
});

yangaiche(sys.load_default_module, function () {
    var browser = yangaiche(sys.browser_type);
    console.log(browser);
    return function (name) {
        yangaiche(sys.load)('./js/default/' + name + '.js');
    };
});
