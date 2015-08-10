yangaiche(sys.load_default_module)('repository', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('openid', {});

app.http = {
    get_host: 'get_host',
    get_request: 'get_request',
    post_request: 'post_request',
    post_charge_request: 'post_charge_request'
};

yangaiche(app.http.get_host, function () {
    return function () {
        var host;
        // TODO : data.json是否也可以带上md5签名。
        var thisis = $.ajax({
            url: 'data.json',
            cache: true,
            async: false,
            dataType: 'json'
        });
        if ('dev' === thisis['responseJSON']['thisis']) {
            host = 'dev.yangaiche.com%2Fdeveloper%2F';
        } else if ('staging' === thisis['responseJSON']['thisis']) {
            host = 'dev.yangaiche.com%2Fstage%2F';
        } else {
            host = 'pay.yangaiche.com%2F';
        }
        if (host.indexOf(window.location.host) >= 0) {
            return host;
        }
        host = window.location.host + '%2Fh5%2F';
        return host;
    }();
});

var timeout = 45 * 1000;

function get_real_url(url) {
    return yangaiche(app.http.get_host) + url;
}

function default_header(request) {
    request.setRequestHeader("Accept-Encoding", 'gzip');
    request.setRequestHeader("API-Client-Device-Type", yangaiche(sys.browser_type));
    yangaiche(ls.user.module_name).if_exist(function(user) {
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
                    //show_login_win();
                    login_by_opencode();
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
                        if (parsed_data['code'] == "20007") {
                            if (failureBack) {
                                failureBack(parsed_data['message']);
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
