/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    t(function () {

        t('#phone').on('click', function() {
            t(this).focus();
        });

        if (getStore().get('user_mobile')) {
            t('#phone').val(getStore().get('user_mobile'));
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

        var show_msg = function (msg) {
            t("#msg").text(msg);
            setTimeout(function () {
                t("#msg").text("");
            }, 3000);
        };

        t("#verify_button").click(function () {
            var phone_number = t("#phone").val();
            console.log(phone_number);
            if (phone_number === "") {
                show_msg("请输入手机号码获取验证码");
                return;
            }
            if (!phone_number.match(/^\d{11}$/)) {
                show_msg("请输入正确的手机号码获取验证码");
                return;
            }
            getReq("sign_verify_code.json/" + phone_number, function (data) {
                disable_button("verify_button");
                start_timer_controll(60);
            }, function (data) {
                reset_button("login_button");
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
            var param = {phone: phone_number, verify_code: verify_code, sign_origin: loadCfg('platform.json', function (platform) {
                return conditionalReturn(platform);
            })};
            postReq("car_user/sign_up.json", param, function (data) {
                updateUser(data);
                bind_openid();
                after_login();
            }, function (data) {
                reset_button("login_button");
                show_msg(data['message'])
            });
        });
    })
}(window.jQuery);