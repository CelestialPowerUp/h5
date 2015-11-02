yangaiche(sys.load_default_module)('duplicate_submission');
yangaiche(sys.load_default_module)('back');
yangaiche(sys.load_default_module)('user');
yangaiche(sys.load_default_module)('order');
yangaiche(sys.load_default_module)('location');
yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('pay');
yangaiche(sys.load_default_module)('parameter');

yangaiche(sys.init)(function (t) {
    t('#dimmer').click(function () {
        t('#legend').css('display', 'none');
        t('#picker').css('display', 'none');
        t('#dimmer').css('display', 'none');
    });

    t('#pick_time').click(function () {
        t('#dimmer').css('display', 'block');

        setTimeout(function () {
            t('#legend').css('display', 'block');
            t('#picker').css('display', 'block');

            var swiper = swiper || new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    scrollbar: '.swiper-scrollbar',
                    slidesPerView: 'auto',
                    scrollbarHide: true,
                    centeredSlides: false,
                    grabCursor: true,
                    freeMode: true
                });
        }, 0);
    });

    t('#pick_car').click(function () {
        yangaiche(ls.back.set_back_to_self)('car_list.html');
    });

    t('#pick_location').click(function () {
        yangaiche(ls.back.set_back_to_self)('my_address_manage.html');
    });

    var pay_btn_group = [t('#alipay_btn'), t('#wechat_btn')];
    t.each(pay_btn_group, function (i, btn) {
        function other_btn() {
            var ret = [];
            var len = pay_btn_group.length;
            for (var j = 0; j < len; j++) {
                if (i !== j) {
                    ret.push(pay_btn_group[j]);
                }
            }
            return ret;
        }

        var weixuan = 'url("../pubimg/new/weixuan.png") 50% 50% no-repeat';
        var gouxuan = 'url("../pubimg/new/gouxuan.png") 50% 50% no-repeat';

        btn.click(function () {
            t.each(other_btn(), function (k, other) {
                other.find('.choose').css('background', weixuan);
            });
            btn.find('.choose').css('background', gouxuan);
        });
    });

    t('#coupon_btn').click(function () {
        yangaiche(ls.back.set_back_to_self)('my_coupons.html?can_select=true');
    });

    var url_params = yangaiche(app.url_parameter),
        disable_button = yangaiche(app.ds.disable_button),
        reset_button = yangaiche(app.ds.reset_button),
        postReq = yangaiche(app.http.post_request),
        getReq = yangaiche(app.http.get_request),
        user = yangaiche(ls.user.touch)(),
        location = yangaiche(ls.location.touch)(),
        show_msg = yangaiche(app.show_msg.show),
        exist = yangaiche(sys.exist);

    function pay_order(order) {
        var param = yangaiche(app.pay.get_param)({order_id: order['id']},
            'activities/pubhtml/activity_order_success.html',
            'activities/pubhtml/activity_order_create.html?order_id=' + order['id']);

        yangaiche(app.pay.do)(param);
    }

    t('#submit_button').click(function () {
        var order = yangaiche(ls.order.touch)();

        var contact_name = t('#contact_name .am-form-field').val();
        if (!exist(contact_name) || !exist(contact_name.replace(/\s*/g, ''))) {
            show_msg('请填写联系人姓名');
            return false;
        }

        disable_button("#submit_button");
        if (exist(order.id)) {
            pay_order(order);
        } else {
            postReq("/v2/api/order/create.json", order, function (data) {
                yangaiche(ls.order.set)(data);
                show_msg('下单成功，请支付');

                pay_order(data);
            }, function (data) {
                reset_button("#submit_button");
                show_msg("下单失败:" + data['message']);
            });
        }
    });

    function handle_time_segments(data) {
        if (data.length <= 0) {
            show_msg('接车区域管家繁忙，请您输入其他地址或稍后再试');
            return;
        }

        var today = moment();
        var weekday_str = ['', '一', '二', '三', '四', '五', '六', '日'];
        var pick_time_point = ["09:00", "11:00", "13:00", "15:00"];
        var pick_time_rel = ["09:00-10:00", "11:00-12:00", "13:00-14:00", "15:00-16:00"];

        var count = 14, view = [];

        for (var i = 0, p = 0; i < count; i += 1) {
            today.add(1, 'd');

            var data_array = today.toArray();
            var date_str = data_array[2];
            var data_key = data_array[0] + '-' + (data_array[1] + 1) + '-' + ((data_array[2] > 9) ? data_array[2] : ('0' + data_array[2]));

            var weekday = today.isoWeekday();

            var current_points = data[p];

            var get_pick_time = function () {
                var ret = [];

                if (current_points.key.indexOf(data_key) < 0) {
                    t.each(pick_time_point, function (ii, pp) {
                        ret.push({
                            color: 'gray',
                            value: pick_time_point[ii],
                            rel: data_key + pick_time_rel[ii]
                        });
                    });
                    current_points.quick_pass = true;
                    return ret;
                }

                current_points.quick_pass = false;
                for (var ii = 0, jj = 0; ii < pick_time_point.length; ii += 1) {
                    if (current_points.data[jj].indexOf(pick_time_point[ii]) > -1) {
                        ret.push({
                            color: 'white',
                            value: pick_time_point[ii],
                            rel1: data_key,
                            rel2: pick_time_rel[ii]
                        });
                        jj += 1;
                    } else {
                        ret.push({
                            color: 'gray',
                            value: pick_time_point[ii],
                            rel1: data_key,
                            rel2: pick_time_rel[ii]
                        });
                    }
                }

                return ret;
            }();

            view.push({
                date_str: date_str,
                weekday_str: weekday_str[weekday],
                pick_time: get_pick_time
            });

            if (!current_points.quick_pass) {
                p += 1;
            }
        }

        var html = '{{#each this}}'
            + '<div class="swiper-slide">'
            + '<div class="day">{{date_str}}<br>{{weekday_str}}</div>'
            + '<ul>'
            + '{{#each pick_time}}'
            + '<li class="{{color}} btn" data-rel1="{{rel1}}" data-rel2="{{rel2}}">{{value}}</li>'
            + '{{/each}}'
            + '</ul>'
            + '</div>'
            + '{{/each}}';

        var template = Handlebars.compile(html);
        t('#picker .swiper-wrapper').empty().html(template(view));

        var last_clicked = null;
        t('#picker .swiper-wrapper .btn').click(function () {
            if (last_clicked) {
                last_clicked.removeClass('green');
                last_clicked.addClass('white');
            }

            var $this = t(this);
            if ($this.hasClass('white')) {
                $this.removeClass('white');
                $this.addClass('green');

                var pick_time = $this.attr('data-rel1');
                var pick_time_segment = $this.attr('data-rel2');
                t('#pick_time .am-form-field').text(
                    pick_time + ' ' + pick_time_segment);

                yangaiche(ls.order.update)(function(order) {
                    order.pick_time = pick_time;
                    order.pick_time_segment = pick_time_segment;
                });

                last_clicked = $this;
            }
        });

        reset_button('#submit_button');
    }

    function set_activity_time_segments(address_info) {
        getReq('/v1/api/activity/time_segments?longitude=' + address_info.longitude + '&latitude=' + address_info.latitude, function (data) {
            handle_time_segments(data);
        }, function (error) {
            show_msg(error['message']);
        });
    }

    function auto_get_location(order) {
        disable_button('#submit_button');

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (e) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                // 定位成功事件
                var address = '';
                yangaiche(ls.location.update)(function (location_info) {
                    address += e.address.city ? e.address.city : '';
                    address += e.address.district ? e.address.district : '';
                    address += e.address.street ? e.address.street : '';
                    address += e.address.streetNumber ? e.address.streetNumber : '';
                    location_info.name = e.address.city ? e.address.city : '';
                    location_info.address = address;
                    location_info.latitude = e.point.lat;
                    location_info.longitude = e.point.lng;
                    location_info.point = e.point;
                    if (/activity/.test(order.peer_source)) {
                        set_activity_time_segments(location_info);
                    }
                });
                t('#pick_location .am-form-field').text(address);
            } else {
                // 定位失败事件
                show_msg(e.message);
                reset_button('#submit_button');
            }
        }, {enableHighAccuracy: true});
    }

    function init_page() {
        var order = yangaiche(ls.order.touch)(),
            set_order = yangaiche(ls.order.set),
            car_info = yangaiche(sys.local_storage).get(key.car.info);

        if (exist(order.client_basic.name, sys.string)) {
            t('#contact_name .am-form-field').val(order.client_basic.name);
        } else if (exist(user.name, sys.string)) {
            t('#contact_name .am-form-field').val(user.name);
        }

        if (exist(order.client_basic.phone_number, sys.string)) {
            t('#contact_phone .am-form-field').val(order.client_basic.phone_number);
        } else if (exist(user.phone_number, sys.string)) {
            t('#contact_phone .am-form-field').val(user.phone_number);
        }

        if (exist(car_info)) {
            t('#pick_car .am-form-field').text(car_info.model);
            yangaiche(ls.order.update)(function (order) {
                order.car_id = car_info.car_id;
                order.car_model_type = car_info.car_model_type;
            });
        }

        if (exist(location.address, sys.string) && exist(location.longitude) && exist(location.latitude)) {
            t('#pick_location .am-form-field').text(location.address);
            set_activity_time_segments(location);
        } else {
            auto_get_location(order);
        }

        if (exist(order.pick_time, sys.string) && exist(order.pick_time_segment, sys.string)) {
            t('#pick_time .am-form-field').text(order.pick_time + ' ' + order.pick_time_segment);
        }

        function preview_order(go_flag) {
            var order = yangaiche(ls.order.touch)();

            var params = {
                coupon_id: order['coupon_id'],
                products: order['products'],
                user_id: user[ls.user.user_id]
            };
            if (yangaiche(sys.exist)(order['supplier_id'])) {
                params.supplier_id = order['supplier_id'];
            }

            if (exist(url_params.order_id)) {
                after_preview_order(order);
            } else {
                postReq('/v1/api/order_preview', params, function (data) {
                    order['coupon_price'] = data['free_price'];
                    order['paid_price'] = 0;
                    order['not_paid_price'] = data['total_price'];
                    set_order(order);

                    after_preview_order(order);
                }, function (error) {
                    order['coupon_id'] = null;
                    order.coupon_price = 0;
                    order.not_paid_price = order.products[0].product_price;
                    set_order(order);

                    after_preview_order(order);
                    show_msg(error['message']);
                });
            }
        }

        function after_preview_order(order) {
            var bool1 = exist(order.coupon_price);
            if (bool1) {
                t('#coupon_btn .coupon-price .number').text(order.coupon_price);
            }

            var bool2 = exist(order.not_paid_price);
            if (bool2) {
                t('#final_price .final-price .number').text(order.not_paid_price);
            }

            if (bool1 && bool2) {
                t('#product_price .product-price .number').text(
                    order.coupon_price + order.not_paid_price + 69
                );
            }
        }

        if (exist(order.coupon_id) || (exist(order.coupon) && exist(order.coupon.id))) {
            preview_order();
        } else {
            getReq('/v1/api/coupons?user_id=' + user[ls.user.user_id], function (data) {
                t.each(data, function (i, coupon) {
                    if ("未使用" === coupon.status && 'coupon_type_4' === coupon.coupon_type) {
                        yangaiche(ls.order.update)(function(order) {
                            order.coupon_id = coupon.id;
                        });
                        return preview_order();
                    }
                });
            });
        }
    }

    if ('weixin' === yangaiche(sys.browser_type).type) {
        t('#wechat_btn').css('display', 'block');
    } else {
        t('#alipay_btn').css('display', 'block');
    }

    if (exist(url_params.order_id)) {
        t('#submit_button').text('立即支付');

        getReq("/v3/api/orders.json?user_type=caruser&order_id=" + url_params.order_id, function (order) {
            if (exist(order.client_basic) && exist(order.client_basic.location)) {
                order.location = order.client_basic.location;
            }

            yangaiche(ls.order.set)(order);

            init_page();
        });
    } else {
        var coupon_id = yangaiche(ls.order.touch)().coupon_id;
        var pick_time = yangaiche(ls.order.touch)().pick_time;
        var pick_time_segment = yangaiche(ls.order.touch)().pick_time_segment;
        yangaiche(ls.order.set)({});
        yangaiche(ls.location.set)(location);
        yangaiche(ls.order.update)(function (order) {
            order.id = null;
            order.peer_source = 'h5_activity';
            order.client_basic = user;
            order.user_id = user.user_id;
            order.contact_name = user.name;
            order.phone_number = user.phone_number;
            order.peer_source = order.peer_source || yangaiche(sys.browser_type).type;
            order.coupon_id = coupon_id;
            order.pick_time = pick_time;
            order.pick_time_segment = pick_time_segment;
            order.products = [{
                product_id: 708,
                product_category: "未分类",
                product_name: "洗车加打蜡0031",
                product_price: 79,
                total_price: 79,
                product_type: 708,
                unit_count: 1
            }]
        });

        init_page();
    }

});