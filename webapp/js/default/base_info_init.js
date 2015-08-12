yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('form', {});
yangaiche(sys.load_default_module)('order', {});
yangaiche(sys.load_default_module)('location', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('show_msg', {});
yangaiche(sys.load_default_module)('duplicate_submission', {});
yangaiche(sys.load_default_module)('back', {});

yangaiche(sys.init)(function(t) {
    t('#contact_name').bind('mouseup', function (event) {
        event.preventDefault();
    });
    t('#phone_number').bind('mouseup', function (event) {
        event.preventDefault();
    });
    t('#address').bind('mouseup', function (event) {
        event.preventDefault();
    });
    t('#pick_time_info').bind('click', function (event) {
        var prevent_default = function () {
            t('#pick_time_info').focus();
        };
        t('#phone_number').bind('focus', prevent_default);
        t('#address').bind('focus', prevent_default);
        setTimeout(function () {
            t('#phone_number').unbind('focus', prevent_default);
            t('#address').unbind('focus', prevent_default);
        }, 1000);
    });

    t('#my-btn-group').on('click', 'button', function (e) {
        var group_p = t(this).parents()[0];
        var local_rel = t(this).attr('data-rel');
        var selected_rel = t(group_p).attr('data-rel');
        if (local_rel == selected_rel) {
            return;
        }

        t(group_p).attr('data-rel', local_rel);

        t(group_p).find('button').removeClass('baseinfo-pay-chosen');
        t(group_p).find('button').addClass('baseinfo-pay-chosen-not');

        t(this).removeClass('baseinfo-pay-chosen-not');
        t(this).addClass('baseinfo-pay-chosen');
    });

    var save_from_data = function () {
        var obj = yangaiche(app.form.to_obj)('#base_info_form');
        yangaiche(ls.order.form_obj)(obj);
    };

    var set_order = yangaiche(ls.order.set),
        show_msg = yangaiche(app.show_msg.show),
        postReq = yangaiche(app.http.post_request),
        getReq = yangaiche(app.http.get_request),
        disable_button = yangaiche(app.ds.disable_button),
        reset_button = yangaiche(app.ds.reset_button);

    var submitText = yangaiche(sys.local_storage).get(key.submit_button.submit_text_key);
    t('#submit_button').html(submitText);

    var order = yangaiche(ls.order.touch)(), user = yangaiche(ls.user.touch);
    yangaiche(app.form.from_obj)(order);

    function preview_order() {
        postReq('/v1/api/order_preview', {
            car_model_type: order['car_model_type'],
            coupon_id: order['coupon_id'],
            products: order['products'],
            user_id: user[ls.user.user_id]
        }, function (data) {
            order['coupon_value'] = data['free_price'];
            order['total_price'] = data['total_price'];
            set_order(order);

            window.location.href = './order_info.html';
        }, function (error) {
            order['coupon_id'] = null;
            set_order(order);
            show_msg(error['message']);
        });
    }

    t("#submit_button").click(function () {
        var contact_name = t('#contact_name').val();
        if (!contact_name) {
            show_msg('请输入姓名!');
            return;
        }

        var phone_number = t('#phone_number').val();
        if (!phone_number) {
            show_msg('请输入电话号码!');
            return;
        }

        var address = t('#address').val();
        if (!address) {
            show_msg('请输入地址!');
            return;
        }

        save_from_data();

        if (1 !== order['pay_mode'] && yangaiche(sys.exist)(order['coupon_id'])) {
            show_msg('只有在线支付可以享受优惠券哦');
            return;
        }

        if (key.submit_button.submit_text_value1 === submitText) {
            preview_order();
        } else {
            disable_button('#submit_button');
            order.user_id = user.user_id;
            order.peer_source = yangaiche(sys.browser_type).type;
            order.total_price = null;

            postReq("/v2/api/order/create", order, function (order_data) {
                set_order(order_data);
                yangaiche(ls.back.set_back_to_store)('./order_success.html');
            }, function (data) {
                reset_button('#submit_button');
                show_msg("下单失败:" + data['message']);
            });
        }
    });

    t("#go_to_map").click(function () {
        save_from_data();
        window.location.href = './my_address_manage.html';
    });

    var auto_get_location = function () {
        disable_button('#submit_button');

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (e) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                // 定位成功事件
                var address = '';
                yangaiche(ls.location.update)(function(location_info) {
                    address += e.address.city ? e.address.city : '';
                    address += e.address.district ? e.address.district : '';
                    address += e.address.street ? e.address.street : '';
                    address += e.address.streetNumber ? e.address.streetNumber : '';
                    location_info.name = e.address.city ? e.address.city : '';
                    location_info.address = address;
                    location_info.latitude = e.point.lat;
                    location_info.longitude = e.point.lng;
                    location_info.point = e.point;
                });
                t('#address').attr('placeholder', '限北京地区，请输入...');
                t("#address").val(address);
                reset_button('#submit_button');
            } else {
                // 定位失败事件
                show_msg(e.message);
                t("#address").attr('placeholder', '定位失败');
                reset_button('#submit_button');
            }
        }, {enableHighAccuracy: true});
    };

    //获取接车时间
    getReq("/v1/api/time_segments.json?service_type=keeper", function (data) {
        var time_data = [];

        for (var a = 0; a < data.length; a++) {
            for (var b = 0; b < data[a]['data'].length; b++) {
                var item = {};
                item.pick_time = data[a]['key'];
                item.index = time_data.length;
                item.pick_time_segment = data[a]['data'][b];
                item.infos = item.pick_time + "</br>" + item.pick_time_segment;
                time_data.push(item);
            }
        }
        template = Handlebars.compile(t("#take_time_tpl").html());
        t("#pick_time_info").html(template(time_data));

        var selectApicktime = function () {
            var item = time_data[t("#pick_time_info").val()];
            t("#pick_time").val(item.pick_time);
            t("#pick_time_segment").val(item.pick_time_segment);
            save_from_data();
        };
        selectApicktime();
        t("#pick_time_info").change(selectApicktime);
    }, function(error) {
        show_msg(error['message']);
    });

    if (t("#phone_number").val() === "") {
        t("#phone_number").val(user[ls.user.user_phone]);
    }

    if (t("#contact_name").val() === "") {
        var user_real_name = yangaiche(sys.local_storage).get(ls.openid.user_real_name);
        if (user[ls.user.user_name] && user[ls.user.user_name] !== '') {
            t("#contact_name").val(user.name);
        } else if (yangaiche(sys.exist)(user_real_name)) {
            t("#contact_name").val(user_real_name);
        }
    }

    var address_info = yangaiche(ls.location.touch), exist = yangaiche(sys.exist);
    if ((!exist(address_info.name) || address_info.name === "") && (!exist(address_info.address) || address_info.address === "")) {
        auto_get_location();
    } else {
        t('#address').attr('placeholder', '限北京地区，请输入...');
        if ('' !== address_info.address) {
            t("#address").val(address_info.address.replace(/(^\s*)|(\s*$)/g, ''));
        } else {
            t("#address").val(address_info.name.replace(/(^\s*)|(\s*$)/g, ''));
        }
    }

    if (exist(order['coupon_id'])) {
        t('#use_coupon').children('div').html(order['coupon_name']);
    } else {
        getReq('/v1/api/coupons?user_id=' + getUser()['user_id'], function (data) {
            var len = 0;
            t.each(data, function (i, coupon) {
                if ("未使用" === coupon.status) {
                    len += 1;
                }
            });

            t('#use_coupon').children('div').html(len + '张可用');
        });
        order['coupon_id'] = null;
        order['coupon_value'] = 0;
        set_order(order);
    }

    postReq('order_preview', {
        car_model_type: order['car_model_type'],
        coupon_id: order['coupon_id'],
        products: order['products'],
        user_id: user[ls.user.user_id]
    }, function(data) {
        order['coupon_value'] = data['free_price'];
        order['total_price'] = data['total_price'];
        set_order(order);
    }, function(error) {
        order['coupon_id'] = null;
        set_order(order);
        show_msg(error['message']);
    });

    t('#use_coupon').click(function () {
        window.location.href = './my_coupons.html';
    });
});