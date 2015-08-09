// lib objects
var yangaiche;

// default modules
var sys = {
    local_storage: 'local_storage',
    load: 'load'
};

function exist(obj) {
    return obj !== undefined && obj !== null;
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

yangaiche(sys.load, function () {
    var loaded = [];
    return function (url, enable_sync_mode) {
        if (!loaded.includes(url)) {
            if (exist(enable_sync_mode)) {
                console.log('start sync mode ['+url+']');
                jQuery.cachedScript(url, {async: false})
                    .done(function () {
                        loaded.push(url);
                    })
                    .fail(function () {
                    });
                console.log('end sync mode ['+url+']');
            } else {
                console.log('start async mode ['+url+']');
                jQuery.cachedScript(url, {async: true})
                    .done(function () {
                        loaded.push(url);
                    })
                    .fail(function () {
                    });
                console.log('end async mode ['+url+']');
            }
        }
    };
});

yangaiche(sys.load)('./js/lib/yangaiche_init.js');
