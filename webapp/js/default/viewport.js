yangaiche(sys.load_default_module)('repository', {});

app.viewport = {
    set: 'set_viewport',
    replace: 'replace_viewport'
};

yangaiche(app.viewport.set, function () {
    function get_initial_scale() {
        return window.screen.availWidth / 640;
    }

    return function () {
        yangaiche(sys.$)('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=' + get_initial_scale() + ', user-scalable=no">');
    };
});

yangaiche(app.viewport.replace, function() {
    return function (initial_scale) {
        var $ = yangaiche(sys.$);
        $('head>meta[name="viewport"]').remove();
        $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=' + initial_scale + ', user-scalable=no">');
    };
});
