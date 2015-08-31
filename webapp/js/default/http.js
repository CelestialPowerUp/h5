yangaiche(sys.load_default_module)('repository', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('openid', {});
yangaiche(sys.load_default_module)('env', {});

app.http = {
    get_api_root: 'get_api_root',
    get_request: 'get_request',
    post_request: 'post_request',
    post_charge_request: 'post_charge_request'
};

yangaiche(app.http.get_api_root, function() {
    return function () {
        var api_root = '';

        yangaiche(app.env.do_sth)({
            dev: function() {
                api_root = '/develop';
            },
            staging: function() {
                api_root = '/staging';
            },
            product: function() {
                api_root = 'http://api.yangaiche.com';
            },
            local: function() {
                api_root = '';
            }
        });

        return api_root;
    }();
});

var timeout = 45 * 1000;

function get_real_url(url) {
    // 所有Ajax后端服务请求都需要'/'开头
    return yangaiche(app.http.get_api_root) + url;
}

function default_header(request) {
    //request.setRequestHeader("Accept-Encoding", 'gzip');
    request.setRequestHeader("API-Client-Device-Type", yangaiche(sys.browser_type).type);
    yangaiche(ls.user.if_exist)(function(user) {
        request.setRequestHeader("API-Access-Token", user.token);
    });
}

yangaiche(app.http.get_request, function () {
    return function (url, callBack, failureBack) {
        var real_url = get_real_url(url);

        $.ajax({
            type: "GET",
            dataType: "json",
            timeout: timeout,
            url: real_url,
            beforeSend: default_header,
            success: function (data) {
                if (data && data['code'] == '00000') {
                    callBack(data['data']);
                } else if (data && data['code'] === '20007') {
                    yangaiche(ls.openid.login_by_opencode)();
                } else {
                    console.log(data['message']);
                    if (failureBack) {
                        failureBack(data);
                    }
                }
            },
            error: function (xhr, status) {
                console.log("服务器失败 status : " + status);
            }
        });
    };
});

yangaiche(app.http.post_request, function () {
    return function (url, param, callBack, failureBack) {
        var real_url = get_real_url(url);

        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            timeout: timeout,
            url: real_url,
            data: JSON.stringify(param),
            beforeSend: default_header,
            success: function (data) {
                if (data && data['code'] == '00000') {
                    callBack(data['data']);
                } else if (data && data['code'] == '20007') {
                    yangaiche(ls.openid.login_by_opencode)();
                } else {
                    console.log(data['message']);
                    if (failureBack) {
                        failureBack(data);
                    }
                }
            },
            error: function (xhr, status) {
                console.log("服务器失败 status : " + status);
            }
        });
    };
});

yangaiche(app.http.post_charge_request, function () {
    return function (url, param, callBack, failureBack) {
        var real_url = get_real_url(url);

        $.ajax({
            type: "POST",
            dataType: "text",
            contentType: "application/json",
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
                    //alert(typeof(parsed_data));
                    if ('string' == typeof(parsed_data) && failureBack) {
                        failureBack(parsed_data);
                    } else if ('object' == typeof(parsed_data)) {
                        if (parsed_data['code']) {
                            if (failureBack) {
                                failureBack(parsed_data);
                            } else {
                                alert('建议设置请求错误的回调');
                            }
                        } else {
                            callBack(parsed_data);
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
                console.log("服务器失败 status : " + status);
            }
        });
    };
});
