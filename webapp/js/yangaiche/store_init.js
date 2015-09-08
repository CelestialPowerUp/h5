yangaiche(sys.load_default_module)('store_init');
yangaiche(sys.load_default_module)('user');

yangaiche(sys.init)(function(t) {
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge);
            }, false);
        }
    }

    connectWebViewJavascriptBridge(function(bridge) {
        var data = { 'Javascript Responds':'Wee!' };
        bridge.init(function(message, responseCallback) {
            console.log('JS got a message' + message);
            console.log('JS responding with' + JSON.stringify(data));
            yangaiche(ls.user.set)(JSON.parse(message));
            responseCallback(data);
        });
    });
}, 0);