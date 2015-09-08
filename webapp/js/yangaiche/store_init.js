yangaiche(sys.load_default_module)('store_init');

yangaiche(sys.init)(function(t) {
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }

    connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
            alert('JS got a message' + JSON.stringify(message));
            var data = { 'Javascript Responds':'Wee!' };
            alert('JS responding with' + JSON.stringify(data));
            responseCallback(data);
        })
    });
}, 0);