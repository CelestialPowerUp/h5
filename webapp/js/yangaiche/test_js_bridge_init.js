;(function () {
    'use strict';

    yangaiche(sys.load_module)('ios/bridge');
    //yangaiche(sys.load_default_module)('');
    //yangaiche(sys.load_lib_module)('');

    yangaiche(sys.init)(function (t) {
        yangaiche(app.bridge.connect)(function (bridge) {
            t('submit').click(function () {
                var params;
                try {
                    params = JSON.parse(t('#params').val());
                } catch (e) {
                    alert(JSON.stringify(e));
                }

                bridge.callHandler('jumpToPage', params, function(responseData) {
                    if (typeof responseData === 'string') {
                        alert(responseData);
                    } else {
                        alert(JSON.stringify(responseData));
                    }
                });
            })
        });
    });
}());