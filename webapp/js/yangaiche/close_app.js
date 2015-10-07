yangaiche(sys.load_module)('ios/bridge');

yangaiche(app.bridge.connect)(function (bridge) {
    bridge['callHandler']('close_webview', {}, function (responseData) {
        alert('JS got response: ' + responseData);
    });
});