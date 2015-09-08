yangaiche(sys.load_default_module)('store_init');
yangaiche(sys.load_default_module)('user');
yangaiche(sys.load_module)('ios/bridge');

yangaiche(sys.init)(function (t) {
    yangaiche(app.bridge.connect)(function (bridge) {
        var data = {'Javascript Responds': 'Wee!'};
        bridge.init(function (message, responseCallback) {
            console.log('JS got a message: ' + message);
            console.log('JS responding with: ' + JSON.stringify(data));
            yangaiche(ls.user.set)(JSON.parse(message));
            responseCallback(data);
        });
    });
}, 0);

yangaiche(sys.init)(function (t) {
    yangaiche(app.bridge.connect)(function (bridge) {
        t('#services li a').unbind('click').click(function () {
            var data = {type: t(this).index() + 1};
            bridge['callHandler']('route', data, function (responseData) {
                console.log('JS got response: ' + responseData);
            });
        });
    });
});
