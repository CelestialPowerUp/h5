yangaiche(sys.load)('./js/lib/yangaiche_module.js', {});

window.location.href.replace(/\/.*\/(.*?)\.html/, function (sth, filename) {
    yangaiche(sys.load_module)(filename + '_init');
});
