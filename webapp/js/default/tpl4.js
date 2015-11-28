yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('duplicate_submission');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('user');
yangaiche(sys.load_default_module)('back');
yangaiche(sys.load_default_module)('parameter');

!function (t) {
    t('body').on('touchstart', function () {
    });

    var show_msg = yangaiche(app.show_msg.show),
        disable_button = yangaiche(app.ds.disable_button),
        reset_button = yangaiche(app.ds.reset_button),
        postReq = yangaiche(app.http.post_request),
        getReq = yangaiche(app.http.get_request),
        store = yangaiche(sys.local_storage);

    var to_do_sth = function () {
        postReq("/v1/api/car_user/sign_up.json", {
            phone: store.get('external_sale_phone_number'),
            verify_code: store.get('external_sale_verify_code'),
            sign_origin: "activity"
        }, function (data) {

            yangaiche(ls.user.set)(data);

            postReq('/v1/api/coupon_package_pick.json', {
                coupon_package_id: 1
            }, function (data) {

                var text = "<div style=\"background: url('http://7xiqe8.com2.z0.glb.qiniucdn.com/coupon_bg.png') 50% 50% no-repeat; width: inherit; height: 270px; overflow: hidden;\">\n" +
                    "        <div style=\"margin: 70px 0 0 0; overflow: hidden;\">\n" +
                    "            <div style=\"margin: 0 0 0 125px; float: left; overflow: hidden;\">\n" +
                    "                <div style=\"font-size: 50px; line-height: 50px; float: left;\">¥</div>\n" +
                    "                <div style=\"font-size: 118px; line-height: 118px; float: left;\">{{value}}</div>\n" +
                    "            </div>\n" +
                    "            <div style=\"margin: 0 0 0 0; float: left;\">\n" +
                    "                <div style=\"font-size: 22px; line-height: 22px;\">YUAN</div>\n" +
                    "                <div style=\"font-size: 44px; line-height: 78px;\">{{coupon_type_value}}</div>\n" +
                    "                <div style=\"font-size: 18px; line-height: 18px;\">COUPON</div>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "        <div style=\"margin: 10px auto; font-size: 24px; width: inherit; clear: both; text-align: center;\">\n" +
                    "            有效期至{{expired_time}}\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "    <div style=\"font-size: 24px; text-align: center; width: inherit;\">\n" +
                    "        优惠券已存入养爱车账户\n" +
                    "        <br>\n" +
                    "        {{user_phone_number}}\n" +
                    "        <span id='modify_phone_number' style=\"font-size: 24px; color: #ffeb08;\">修改></span>\n" +
                    "    </div>" +
                    "    <button id=\"to_use_button\" type=\"button\" class=\"am-btn\"\n" +
                    "        style=\"margin: 13px 161px 13px 161px;padding: 20px 48px 40px 48px;background: url('http://7xiqe8.com2.z0.glb.qiniucdn.com/btn_get_coupon.png') 50% 50% no-repeat;color: #850000;font-size: 48px;border-radius: 8px;width: 317px;height: 107px;\">\n" +
                    "       去使用\n" +
                    "    </button>";

                var tpl_fn = Handlebars.compile(text);

                var tpl_data = {
                    value: data[0].coupon.value,
                    coupon_type_value: data[0].coupon.coupon_type_value,
                    expired_time: data[0].coupon.expired_time.match(/^(.*)T.*$/)[1],
                    user_phone_number: data[0].user_phone_number
                };

                var coupon = tpl_fn(tpl_data);

                store.set(key.activity.login_html, t('.component[data-tpl=input4]').html());

                t('.component[data-tpl=input4]').empty().html(coupon);

                t('#modify_phone_number').click(function () {
                    t('.component[data-tpl=input4]').empty().html(store.get(key.activity.login_html));
                });

                t('#to_use_button').click(function() {
                    yangaiche(ls.back.set_back_to_self)('http://a.app.qq.com/o/simple.jsp?pkgname=com.yac.yacapp');
                });

            }, function (error) {
                reset_button("login_button");
                show_msg(error['message']);
            });

        }, function (data) {
            reset_button("login_button");
            show_msg(data['message']);
        });
    };

    var is_weixin = function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i);
    }();

    if (yangaiche(app.url_parameter)['to_pay']) {
        t('body').css('display', 'none');
        to_do_sth();
    } else if (yangaiche(app.url_parameter)['code']) {
        yangaiche(sys.load_module)('simple_get_openid_init');
    }

    var start_timer_controll = function (value) {
        if (typeof(t("#verify_button")) === 'undefined') {
            return;
        }
        t("#verify_button").text(value);
        if (value === 0) {
            t("#verify_button").text("获取验证码");
            reset_button("verify_button");
            return;
        }
        setTimeout(function () {
            return start_timer_controll(value - 1);
        }, 1000);
    };

    t("#verify_button").click(function () {
        disable_button("verify_button");
        var phone_number = t("#phone").val();
        if (phone_number === "") {
            show_msg("请输入手机号码获取验证码");
            reset_button("verify_button");
            return;
        }
        if (!phone_number.match(/^\d{11}$/)) {
            show_msg("请输入正确的手机号码获取验证码");
            reset_button("verify_button");
            return;
        }
        getReq("/v1/api/sign_verify_code.json/" + phone_number, function (data) {
            start_timer_controll(60);
        }, function (data) {
            reset_button("verify_button");
            show_msg(data['message'])
        });
    });

    t("#login_button").click(function () {
        disable_button("login_button");
        var phone_number = t("#phone").val();
        var verify_code = t("#verify_code").val();
        if (phone_number === "" || verify_code === "") {
            show_msg("手机号码与验证码均不能为空");
            reset_button("login_button");
            return;
        }

        store.set('external_sale_phone_number', phone_number);
        store.set('external_sale_verify_code', verify_code);

        if (is_weixin && !store.get('external_sale_wechat_openid')) {
            yangaiche(sys.load_module)('simple_get_openid_init');
        } else {
            to_do_sth();
        }
    });
}(yangaiche(sys.$));