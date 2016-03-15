;(function () {
    'use strict';

    //yangaiche(sys.load_module)();
    yangaiche(sys.load_default_module)('location');
    yangaiche(sys.load_default_module)('back');
    yangaiche(sys.load_default_module)('show_msg');
    yangaiche(sys.load_default_module)('http');

    yangaiche(sys.init)(function (t) {
        // 定义变量
        var get_location = yangaiche(ls.location.touch),
            show_msg = yangaiche(app.show_msg.show),
            exit = yangaiche(app.exist),
            postReq = yangaiche(app.http.post_request),
            set_back_to_his = yangaiche(ls.back.set_back_to_his);

        // 功能代码
        var location = get_location();
        t('#title .value').html(location.name);
        t('#address input').val(location.address);

        t('#submit').click(function () {
            if (!exit(location)) {
                show_msg('地址不能为空');
                return false;
            }

            var address = t('#address input').val();
            if (!address) {
                show_msg('地址不能为空');
                return false;
            }

            location.address = address;

            var url = location.id ? '/v1/api/address/update.json' : '/v1/api/address/create.json';

            postReq(url, location, function () {
                set_back_to_his('my_address_manage.html');
            }, function (error) {
                show_msg(error.message || JSON.stringify(error));
            });

        });
    });
}());
