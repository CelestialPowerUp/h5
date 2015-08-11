yangaiche(sys.load_default_module)('repository', {});

app.viewport = {
    set: 'set_viewport'
};

yangaiche(app.viewport.set, function () {
    function get_initial_scale() {
        return 640 / window.screen.availWidth;
    }

    return function () {
        document.head.write('<meta name="viewport" content="width=device-width, initial-scale=' + get_initial_scale() + ', user-scalable=no;">');
    };
});
