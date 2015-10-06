yangaiche(sys.load_default_module)('store_item_page_init');
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
