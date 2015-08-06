// lib objects
var yangaiche;

// default modules
var local_storage = 'local_storage';
var load = 'load';
var browser_type = 'browser_type';

!function ($) {

    function exist(callback) {
        return callback !== undefined && callback !== null;
    }

    var runtime_obj = {};
    yangaiche = function (name, callback, params) {
        if (exist(callback)) {
            runtime_obj[name] = callback(params);
        }
        if (exist(runtime_obj[name])) {
            return runtime_obj[name];
        } else {
            console.error('yangaiche can not be done with "' + name + '" & "' + callback + '" & "' + params + '" ');
        }
    };

    yangaiche(local_storage, function () {
        var store = $.AMUI.store;
        if (!store.enabled) {
            console.error('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
            return null;
        }
        return store;
    });

    if (![].includes) {
        Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
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
                if (k < 0) {k = 0;}
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

    yangaiche(load, function () {
        var loaded = [];
        return function (url) {
            if (!loaded.includes(url)) {
                var head = document.getElementsByTagName('head')[0], script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                head.appendChild(script);
                loaded.push(url);
            }
        };
    });

    yangaiche(browser_type, function () {
        var type = null;
        return function () {
            if (!type) {
                var ua = window.navigator.userAgent.toLowerCase();
                return ua;
            }
        };
    });

    window.location.href.replace(/\/.*\/(.*?)\.html/, function (sth, filename) {
        yangaiche(load)('./js/default/' + filename + '.js');
        alert(yangaiche(browser_type)());
    });
}(window.jQuery);