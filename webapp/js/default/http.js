;(function () {

    'use strict';

	yangaiche(sys.load_default_module)('repository');
    yangaiche(sys.load_default_module)('user');
    yangaiche(sys.load_default_module)('openid');
    yangaiche(sys.load_default_module)('env');

    app.http = {
        get_api_root: 'get_api_root',
        get_request: 'get_request',
        post_request: 'post_request',
        post_charge_request: 'post_charge_request',
        tweak: 'tweak_sth',
        fire_tweaks: 'fire_tweaks',

        abort_or_hijack: 'abort_or_hijack',
        hijacker: 'http_hijacker',
        before_render: 'before_render',
        after_render: 'after_render',

        get: 'get_request_key',
        post: 'post_request_key',
        charge: 'charge_request_key',

        abort: 'app_http_abort',

        tweaks: []
    };

    yangaiche(app.http.get_api_root, function () {
        return function () {
            var api_root = '';

            yangaiche(app.env.do_sth)({
                dev: function () {
                    api_root = '/develop';
                },
                staging: function () {
                    api_root = '/staging';
                },
                product: function () {
                    api_root = '';
                },
                local: function () {
                    api_root = '';
                }
            });

            return api_root;
        }();
    });

    yangaiche(app.http.tweak, function () {
        return function (callback) {
            //alert(callback.toString());
            app.http.tweaks.push(callback);
        };
    });

    yangaiche(app.http.fire_tweaks, function () {
        return function (type, request_type, url) {
            var i = 0;

            if (type === app.http.abort_or_hijack) {
                for (; i < app.http.tweaks.length; i++) {
                    var ret = app.http.tweaks[i](type, request_type, url);

                    if (yangaiche(sys.exist)(ret)) {
                        return ret;
                    }
                }

                return url;
            } else if (type === app.http.hijacker) {
                for (; i < app.http.tweaks.length; i++) {
                    var callback = app.http.tweaks[i](type, request_type, url);

                    if (yangaiche(sys.exist)(callback)) {
                        return callback;
                    }
                }
            } else {
                for (; i < app.http.tweaks.length; i++) {
                    app.http.tweaks[i](type, request_type, url);
                }
            }

        };
    });

    var timeout = 45 * 1000;

    function get_real_url(url) {
        // 所有Ajax后端服务请求都需要'/'开头
        return yangaiche(app.http.get_api_root) + url;
    }

    function default_header(request) {
        //request.setRequestHeader('Accept-Encoding', 'gzip');
        request.setRequestHeader('API-Client-App-Name', 'yangaiche_client');
        request.setRequestHeader('API-Client-Device-Type', yangaiche(sys.browser_type).type);
        yangaiche(ls.user.if_exist)(function (user) {
            request.setRequestHeader('API-Access-Token', user.token);
        });
    }

    yangaiche(app.http.get_request, function () {
        var tweaker = yangaiche(app.http.fire_tweaks);
        return function (url, callBack, failureBack) {
            url = tweaker(app.http.abort_or_hijack, app.http.get, url);

            if (url === app.http.abort) {
                return;
            }

            var real_url = get_real_url(url);

            $.ajax({
                type: 'GET',
                dataType: 'json',
                timeout: timeout,
                url: real_url,
                beforeSend: default_header,
                success: function (data) {
                    if (data && data.code === '00000') {
                        tweaker(app.http.before_render, app.http.get, url);
                        (tweaker(app.http.hijacker, app.http.get, url) || callBack)(data.data);
                        tweaker(app.http.after_render, app.http.get, url);
                    } else if (data && data.code === '20007') {
                        yangaiche(ls.openid.login_by_opencode)();
                    } else {
                        console.log(data.message || JSON.stringify(data));
                        if (failureBack) {
                            failureBack(data);
                        }
                    }
                },
                error: function (xhr, status) {
                    console.log('服务器失败 status : ' + status);
                }
            });
        };
    });

    yangaiche(app.http.post_request, function () {
        var tweaker = yangaiche(app.http.fire_tweaks);
        return function (url, param, callBack, failureBack) {
            url = tweaker(app.http.abort_or_hijack, app.http.post, url);

            if (url === app.http.abort) {
                return;
            }

            var real_url = get_real_url(url);

            $.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                timeout: timeout,
                url: real_url,
                data: JSON.stringify(param),
                beforeSend: default_header,
                success: function (data) {
                    if (data && data.code === '00000') {
                        tweaker(app.http.before_render, app.http.post, url);
                        (tweaker(app.http.hijacker, app.http.post, url) || callBack)(data.data);
                        tweaker(app.http.after_render, app.http.post, url);
                    } else if (data && data.code === '20007') {
                        yangaiche(ls.openid.login_by_opencode)();
                    } else {
                        console.log(data.message || JSON.stringify(data));
                        if (failureBack) {
                            failureBack(data);
                        }
                    }
                },
                error: function (xhr, status) {
                    console.log('服务器失败 status : ' + status);
                }
            });
        };
    });

    yangaiche(app.http.post_charge_request, function () {
        var tweaker = yangaiche(app.http.fire_tweaks);
        return function (url, param, callBack, failureBack) {
            var real_url = get_real_url(url);

            $.ajax({
                type: 'POST',
                dataType: 'text',
                contentType: 'application/json',
                timeout: timeout,
                url: real_url,
                data: JSON.stringify(param),
                beforeSend: default_header,
                success: function (data) {
                    var parsed_data;
                    try {
                        parsed_data = $.parseJSON(data);
                    } catch (e) {
                        parsed_data = data;
                    } finally {
                        if ('string' === typeof(parsed_data) && failureBack) {
                            failureBack(parsed_data);
                        } else if ('object' === typeof(parsed_data)) {
                            if (parsed_data.code) {
                                if (failureBack) {
                                    failureBack(parsed_data);
                                } else {
                                    alert('建议设置请求错误的回调');
                                }
                            } else {
                                tweaker(app.http.before_render, app.http.charge, url);
                                callBack(parsed_data);
                                tweaker(app.http.after_render, app.http.charge, url);
                            }
                        } else if (failureBack) {
                            failureBack('未能识别服务器返回参数');
                        } else {
                            alert('建议设置请求错误的回调');
                        }
                    }
                },
                error: function (xhr, status, error) {
                    alert(status);
                    alert(error);
                    console.log('服务器失败 status : ' + status);
                }
            });
        };
    });

}());