yangaiche(sys.load)('js/lib/yangaiche_module.js', {});
yangaiche(sys.load_default_module)('repository', {});

//yangaiche(sys.load_default_module)('viewport', {});
//yangaiche(app.viewport.set)();

window.location.href.replace(/\/.*\/(.*?)\.html/, function (sth, filename) {
    yangaiche(sys.load_module)(filename + '_init');
});
