app.bridge = {
    connect: 'connect_to_bridge'
};

yangaiche(app.bridge.connect, function () {
    return function (callback) {
        if (window['WebViewJavascriptBridge']) {
            callback(window['WebViewJavascriptBridge']);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(window['WebViewJavascriptBridge']);
            }, false);
        }
    };
});