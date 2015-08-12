

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
        var form_data = getFormValues("base_info_form");
        var order = getOrder();
        order = copyObj(order, form_data);
        order['pay_mode'] = parseInt(t('#my-btn-group').attr('data-rel'));
        order['order_type'] = get_service_type_from_router2();
        console.log(order);
        updateOrder(order);
    };

    var submitText = getStore().get('submit_text');
    t('#submit_button').html(submitText);

    t("#submit_button").click(function () {
        var contact_name = t('#contact_name').val();
        if (!contact_name) {
            alert('请输入姓名!');
            return;
        }

        var phone_number = t('#phone_number').val();
        if (!phone_number) {
            alert('请输入电话号码!');
            return;
        }

        var address = t('#address').val();
        if (!address) {
            alert('请输入地址!');
            return;
        }

        save_from_data();

        var order = getOrder();

        if (1 !== order['pay_mode'] && null !== order['coupon_id'] && undefined !== order['coupon_id']) {
            show_msg('只有在线支付可以享受优惠券哦');
            return;
        }

        if ('确定' === submitText) {
            postReq('order_preview', {
                car_model_type: order['car_model_type'],
                coupon_id: order['coupon_id'],
                products: order['products'],
                user_id: getUser()['user_id']
            }, function(data) {
                order['coupon_value'] = data['free_price'];
                order['total_price'] = data['total_price'];
                updateOrder(order);

                window.location.href = './order_info.html';
            }, function(error) {
                order['coupon_id'] = null;
                updateOrder(order);
                show_msg(error['message']);
            });
        } else {
            disable_button("submit_button");
            var user = getUser();
            order.user_id = user.user_id;
            order.peer_source = loadCfg('platform.json', function (platform) {
                return conditionalReturn(platform);
            });
            order.total_price = null;

            postReq("/v2/api/order/create", order, function (order_data) {
//                    clearOrder();
                updateSuccessOrder(order_data);

                set_back_to_home();

                window.location.href = './order_success.html';
            }, function (data) {
                reset_button("submit_button");
                show_msg("下单失败:" + data['message']);
            });
        }
    });

    t("#go_to_map").click(function () {
        save_from_data();
        window.location.href = './my_address_manage.html';
    });

    parseFormValue("base_info_form", getOrder());

    var auto_get_location = function () {
        disable_button("submit_button");

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (e) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                // 定位成功事件
                console.log(e);
                var location_info = getLocation();
                var address = '';
                address += e.address.city ? e.address.city : '';
                address += e.address.district ? e.address.district : '';
                address += e.address.street ? e.address.street : '';
                address += e.address.streetNumber ? e.address.streetNumber : '';
                location_info.name = e.address.city ? e.address.city : '';
                location_info.address = address;
                location_info.latitude = e.point.lat;
                location_info.longitude = e.point.lng;
                location_info.point = e.point;
                updateLocation(location_info);
                t('#address').attr('placeholder', '限北京地区，请输入...');
                t("#address").val(address);
//                    myBlur("#address");
                reset_button("submit_button");
            } else {
                // 定位失败事件
                alert(e.message);
                t("#address").attr('placeholder', '定位失败');
                reset_button("submit_button");
            }
        }, {enableHighAccuracy: true});
    };

    //获取接车时间
    getReq("time_segments.json?service_type=keeper", function (data) {
        console.log(data);
        var time_datas = [];

        for (var a = 0; a < data.length; a++) {
            for (var b = 0; b < data[a]['data'].length; b++) {
                var item = {};
                item.pick_time = data[a]['key'];
                item.index = time_datas.length;
                item.pick_time_segment = data[a]['data'][b];
                item.infos = item.pick_time + "</br>" + item.pick_time_segment;
                time_datas.push(item);
            }
        }
        console.log(time_datas);
        template = Handlebars.compile(t("#take_time_tpl").html());
        t("#pick_time_info").html(template(time_datas));

        var selectApicktime = function () {
            var item = time_datas[t("#pick_time_info").val()];
            t("#pick_time").val(item.pick_time);
            t("#pick_time_segment").val(item.pick_time_segment);
            save_from_data();
        };
        selectApicktime();
        t("#pick_time_info").change(selectApicktime);

        var user = getUser();

        console.log('user' + user['phone']);

        if (t("#phone_number").val() === "") {
            t("#phone_number").val(user['phone']);
        }

        console.log('phone altered');

        if (t("#contact_name").val() === "") {
            if (user.name && user.name !== '') {
                t("#contact_name").val(user.name);
            } else if (getStore().get('user_real_name')) {
                t("#contact_name").val(getStore().get('user_real_name'));
            }
        }

        console.log('name altered');

        var address_info = getLocation();
        if (address_info.name === "" && address_info.address === "") {
            auto_get_location();
        } else {
            t('#address').attr('placeholder', '限北京地区，请输入...');
            if ('' !== address_info.address) {
                t("#address").val(address_info.address.replace(/(^\s*)|(\s*$)/g, ''));
            } else {
                t("#address").val(address_info.name.replace(/(^\s*)|(\s*$)/g, ''));
            }
        }
        console.log('address altered');

        var order = getOrder();
        if (null !== order['coupon_id'] && undefined !== order['coupon_id']) {
            t('#use_coupon').children('div').html(order['coupon_name']);

        } else {
            getReq('coupons?user_id=' + getUser()['user_id'], function (data) {
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
            updateOrder(order);
        }

        postReq('order_preview', {
            car_model_type: order['car_model_type'],
            coupon_id: order['coupon_id'],
            products: order['products'],
            user_id: getUser()['user_id']
        }, function(data) {
            order['coupon_value'] = data['free_price'];
            order['total_price'] = data['total_price'];
            updateOrder(order);
        }, function(error) {
            order['coupon_id'] = null;
            updateOrder(order);
            show_msg(error['message']);
        });
    });

    t('#use_coupon').click(function (e) {
        window.location.href = './my_coupons.html';
    });
});