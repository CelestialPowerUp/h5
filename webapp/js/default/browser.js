app.browser = {
    what_device: 'app_browser_is_android',
    is_android: 'app_browser_is_android',

    android: 'Android',
    ios: 'iOS',
    unknown: 'Unknown'
};

yangaiche(app,browser.what_device, function() {
    var UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid, // 据说某些国产机的UA会同时包含 android iphone 字符
        isMobile = isAndroid || isIos;  // 粗略的判断
    return function() {
        if (isAndroid) {
            return app.browser.android;
        }
        if (isIos) {
            return app.browser.ios;
        }
        return app.browser.unknown;
    } ();
});
