app.bridge = {
    connect: 'connect_to_bridge'
};

yangaiche(app.bridge.connect, function () {
    return function (callback) {
        if (window['WebViewJavascriptBridge']) {
            alert("already " + JSON.stringify(window['WebViewJavascriptBridge']));
            callback(window['WebViewJavascriptBridge']);
        } else {
            alert("wait for event " + JSON.stringify(window['WebViewJavascriptBridge']));
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                alert("event " + JSON.stringify(window['WebViewJavascriptBridge']));
                callback(window['WebViewJavascriptBridge']);
            }, false);
        }
    };
});