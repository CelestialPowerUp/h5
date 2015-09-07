yangaiche(sys.load_default_module)('store_init');

yangaiche(sys.init)(function(t) {
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge);
            }, false)
        }
    }

    connectWebViewJavascriptBridge(function(bridge) {

        /* Init your app here */

        bridge.init(function(message, responseCallback) {
            alert('Received message: ' + message);
            if (responseCallback) {
                responseCallback("Right back atcha")
            }
        });
        //bridge.send('Hello from the javascript')
        //bridge.send('Please respond to this', function responseCallback(responseData) {
        //    console.log("Javascript got its response", responseData)
        //})
    });

}, 0);

yangaiche(sys.start)();