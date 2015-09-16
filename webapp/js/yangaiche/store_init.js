yangaiche(sys.load_default_module)('store_init');
yangaiche(sys.load_default_module)('user');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_module)('ios/bridge');

yangaiche(sys.init)(function (t) {

    yangaiche(app.bridge.connect)(function (bridge) {
        var data = {'Javascript Responds': 'Wee!'};
        bridge.init(function (message, responseCallback) {
            alert('JS got a message: ' + message);
            alert('JS responding with: ' + JSON.stringify(data));
            yangaiche(ls.user.set)(JSON.parse(message));
            responseCallback(data);
        });

        alert(1);
        yangaiche(app.http.tweak)(function (type, request_type, url) {
            var this_context = type + request_type + url,
                accept_context = app.http.after_render + app.http.get + '/v2/api/store/home_ware_list.json',
                accept_context2 = app.http.after_render + app.http.get + '/v2/api/store/banners.json';
            alert(this_context);
            if (this_context === accept_context) {
                t('.home-page-products li').unbind('click').click(function () {
                    var data = {type: 7, ware_id: t(this).attr('data-rel')};
                    alert('JS responding with: ' + JSON.stringify(data));
                    bridge['callHandler']('route', data, function (responseData) {
                        console.log('JS got response: ' + responseData);
                    });
                });
            }
            if (this_context === accept_context2) {
                t('#banner img').unbind('click').click(function () {
                    var data = {type: 0, web_url: t(t(this).parents()[0]).attr('data-rel')};
                    alert('JS responding with: ' + JSON.stringify(data));
                    bridge['callHandler']('route', data, function (responseData) {
                        console.log('JS got response: ' + responseData);
                    });
                });
            }
        });
        alert(2);
    });

}, 0);

yangaiche(sys.init)(function (t) {
    yangaiche(app.bridge.connect)(function (bridge) {
        t('#services li a').unbind('click').click(function () {
            var array = t('#services li a'), index = 0, $this_data_rel = t(this).attr('data-rel');
            t.each(array, function (i, a) {
                if (t(a).attr('data-rel') === $this_data_rel) {
                    index = i;
                }
            });
            var data = {type: index + 1};
            alert('JS responding with: ' + JSON.stringify(data));
            bridge['callHandler']('route', data, function (responseData) {
                console.log('JS got response: ' + responseData);
            });
        });

        t('.home-page-products li').unbind('click').click(function () {
            var data = {type: 7, ware_id: t(this).attr('data-rel')};
            alert('JS responding with: ' + JSON.stringify(data));
            bridge['callHandler']('route', data, function (responseData) {
                console.log('JS got response: ' + responseData);
            });
        });

        t('#banner img').unbind('click').click(function () {
            var data = {type: 0, web_url: t(t(this).parents()[0]).attr('data-rel')};
            alert('JS responding with: ' + JSON.stringify(data));
            bridge['callHandler']('route', data, function (responseData) {
                console.log('JS got response: ' + responseData);
            });
        });
    });
});
