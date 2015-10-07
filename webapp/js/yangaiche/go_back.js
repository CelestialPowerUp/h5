yangaiche(sys.load_default_module)('back');
yangaiche(sys.load_module)('ios/bridge');

yangaiche(app.bridge.connect)(function (bridge) {
    var data = {'Javascript Responds': 'Wee!'};
    bridge.init(function (message, responseCallback) {
        alert('JS got a message: ' + message);

        if (/.*go_back.*/.test(message)) {
            alert('go_back');
            var parent_of_this = yangaiche(ls.back.get_parent_of_this)();
            alert(parent_of_this);
            if (!/.*undefined/.test(parent_of_this)) {
                yangaiche(ls.back.set_back_to_his)(parent_of_this);
                return true;
            } else {
                yangaiche(sys.load_module)('close_app');
                return true;
            }
        }

        alert('JS responding with: ' + JSON.stringify(data));
        responseCallback(data);
    });
});