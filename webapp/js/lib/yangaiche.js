// lib objects
var yangaiche;

// default modules
var sys = {
    exist: 'exist',
    local_storage: 'local_storage',
    load: 'load',
    $: '$',
    init: 'init'
};

function exist(obj) {
    return typeof obj !== 'undefined' && obj !== null;
}

var runtime_obj = {};
yangaiche = function (name, callback, params) {
    if (exist(runtime_obj[name])) {
        return runtime_obj[name];
    }
    if (exist(callback)) {
        runtime_obj[name] = callback(params);
    }
    if (exist(runtime_obj[name])) {
        return runtime_obj[name];
    } else {
        console.error('yangaiche can not be done with "' + name + '" & "' + callback + '" & "' + params + '" ');
    }
};

yangaiche(sys.exist, function () {
    return exist;
});

yangaiche(sys.local_storage, function () {
    var store = $.AMUI.store;
    if (!store.enabled) {
        console.error('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
        return null;
    }
    return store;
});

if (![].includes) {
    Array.prototype.includes = function (searchElement /*, fromIndex*/) {
        'use strict';
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {
                k = 0;
            }
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
            k++;
        }
        return false;
    };
}

yangaiche(sys.$, function () {
    jQuery.cachedScript = function (url, options) {

        // Allow user to set any option except for dataType, cache, and url
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });

        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        return jQuery.ajax(options);
    };

    return jQuery;
});

yangaiche(sys.init, function() {
    return function(callback) {
        var $ = yangaiche(sys.$);
        $(callback($));
    };
});

yangaiche(sys.load, function () {
    var loaded = [];
    var map = $.ajax({
        url: './map.json',
        cache: false,
        async: false,
        dataType: 'json'
    });
    map = map['responseJSON']['res'];
    // 两个特性：1. 同步异步加载的标示是第二个参数，存在就是同步，不存在就是异步；也就是随便传个{}代表要同步加载。
    // 2. 对于同步加载，可以返回true代表加载成功，false代表加载失败；对于异步加载，总是返回null；可以使用sys.exist判断为null。
    return function (url, enable_sync_mode) {
        if (!loaded.includes(url)) {
            var result = null;
            if (exist(enable_sync_mode)) {
                console.log('start sync mode [' + map[url] + ']');
                yangaiche(sys.$).cachedScript(map[url], {async: false})
                    .done(function () {
                        loaded.push(url);
                        result = true;
                    })
                    .fail(function (jqxhr) {
                        result = jqxhr.status === 404 ? false : null;
                    });
                console.log('end sync mode [' + map[url] + ']');
            } else {
                console.log('start async mode [' + map[url] + ']');
                yangaiche(sys.$).cachedScript(map[url], {async: true})
                    .done(function () {
                        loaded.push(url);
                    })
                    .fail(function () {
                    });
                console.log('end async mode [' + map[url] + ']');
            }
            return result;
        }
    };
});

yangaiche(sys.load)('js/lib/yangaiche_init.js');
