/**
 * Created by caols on 8/5/15.
 */
!function ($) {

    $.cachedScript = function (url, options) {
        // Allow user to set any option except for dataType, cache, and url
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });

        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        return $.ajax(options);
    };

    function exist(callback) {
        return callback !== undefined && callback !== null;
    }

    var lib_name = 'yangaiche';
    var runtime_obj = 'yangaiche_obj';
    var local_storage = 'local_storage';
    var load = 'load';

    window[runtime_obj] = {};
    window[lib_name] = function (name, callback, params) {
        if (exist(callback)) {
            window[runtime_obj][name] = callback(params);
        }
        if (exist(window[runtime_obj][name])) {
            return window[runtime_obj][name];
        } else {
            console.error(lib_name + ' can not be done with "' + name + '" & "' + callback + '" & "' + params + '" ');
        }
    };

    window[lib_name](local_storage, function () {
        var store = $.AMUI.store;
        if (!store.enabled) {
            console.error('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
            return null;
        }
        return store;
    });

    window[lib_name](load, function () {
        return function (url) {
            //$.cachedScript(url)
            //    .done(function (script, textStatus, jqxhr) {
            //        console.log(script); // Script returned
            //        console.log(textStatus); // Success
            //        console.log(jqxhr.status); // 200
            //        console.log("Load was performed.");
            //    })
            //    .fail(function (jqxhr, settings, exception) {
            //        console.error(jqxhr);
            //        console.error(settings);
            //        console.error(exception);
            //
            //        console.error("Triggered ajaxError handler.");
            //    });
            var head = document.getElementsByTagName('head')[0], script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            head.appendChild(script);
        };
    });

    //window[lib_name](browser_type, function () {
    //    return function (url) {
    //        $.cachedScript(url)
    //            .done(function (script, textStatus, jqxhr) {
    //                console.log(script); // Script returned
    //                console.log(textStatus); // Success
    //                console.log(jqxhr.status); // 200
    //                console.log("Load was performed.");
    //            })
    //            .fail(function (jqxhr, settings, exception) {
    //                console.error(jqxhr);
    //                console.error(settings);
    //                console.error(exception);
    //
    //                console.error("Triggered ajaxError handler.");
    //            });
    //    };
    //});

    window.location.href.replace(/\/.*\/(.*?)\.html/, function (sth, filename) {
        window[runtime_obj][load]('./js/default/' + filename + '.js');
    });
}(window.jQuery);