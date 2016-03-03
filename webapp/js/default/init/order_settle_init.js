;(function () {
    'use strict';

    //yangaiche(sys.load_module)('');
    yangaiche(sys.load_default_module)('user');
    yangaiche(sys.load_default_module)('order');
    yangaiche(sys.load_default_module)('location');
    yangaiche(sys.load_default_module)('http');
    yangaiche(sys.load_default_module)('back');
    yangaiche(sys.load_default_module)('obj_util');
    yangaiche(sys.load_default_module)('show_msg');
    yangaiche(sys.load_default_module)('products');
    yangaiche(sys.load_default_module)('unique_service_type');
    //yangaiche(sys.load_lib_module)('');

    yangaiche(sys.init)(function (t) {

        var getReq = yangaiche(app.http.get_request),
            postReq = yangaiche(app.http.post_request),
            user = yangaiche(ls.user.touch)(),
            exist = yangaiche(sys.exist),
            order = yangaiche(ls.order.touch)(),
            set_order = yangaiche(ls.order.set),
            show_msg = yangaiche(app.show_msg.show),
            address_info = yangaiche(ls.location.touch)();

        getReq('/v1/api/time_segments.json', function (data) {

            var tpl = Handlebars.compile('{{#each this}}<div class="swiper-slide"><div class="text">{{key}}</div></div>{{/each}}');
            var tpl2 = Handlebars.compile('{{#each this}}<div class="swiper-slide"><div class="text">{{this}}</div></div>{{/each}}');
            t('.swiper-container-day .swiper-wrapper').html(tpl(data));

            var swiper1, swiper2;
            t('#pick_time').click(function () {
                t('#popup').css('display', 'block');

                var opts = {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    slidesPerColumnFill: 'row',
                    scrollbarHide: true,
                    centeredSlides: false,
                    spaceBetween: 0,
                    grabCursor: true,
                    freeMode: true,
                    observer: true
                };
                swiper1 = swiper1 || new Swiper('.swiper-container-day', opts);
                swiper2 = swiper2 || new Swiper('.swiper-container-time', opts);
            });

            t('.swiper-container-day').on('click', '.swiper-slide', function () {
                var $this = t(this);
                t.each(data, function (i, d) {
                    if (d.key === $this.children('.text').html()) {
                        t('.swiper-container-day').attr('data-rel', d.key);
                        t('.swiper-container-time .swiper-wrapper').html(tpl2(d.data));
                    }
                });

                t('.swiper-container-day .swiper-slide').removeClass('selected');
                $this.addClass('selected');
            });

            t('.swiper-container-time').on('click', '.swiper-slide', function () {
                var $this = t(this);
                t('#pick_time .value').html(t('.swiper-container-day').attr('data-rel') + ' ' + $this.children('.text').html());

                t('.swiper-container-time .swiper-slide').removeClass('selected');
                $this.addClass('selected');

                t('#popup .cover').click();
            });

            t('.swiper-container-day .swiper-slide:first-child').click();
            t('.swiper-container-time .swiper-slide:first-child').click();

            t('#popup .cover').click(function () {
                t('#popup').css('display', 'none');
            });
        }, function (error) {
            show_msg(error.message || JSON.stringify(error));
        });

        var service_products = yangaiche(sys.local_storage).get(key.service.data);
        t.each(service_products, function (i, service_product) {
            service_product.total_price = yangaiche(ls.products.calculate_single)(service_product).toFixed(1);
            t('#service_types .selectable[data-key="' + service_product.service_type + '"] .text').html(service_product.product_name + '(¥' + service_product.total_price + ')');
            t('#service_types .selectable[data-key="' + service_product.service_type + '"]').removeClass('invisible');
        });

        var $service_types = t('#service_types');
        $service_types.on('click', '.selectable', function () {
            var $this = t(this);
            var service_type = $this.attr('data-key');
            if (service_type === $service_types.attr('data-key')) {
                return false;
            }
            $service_types.attr('data-key', service_type);

            var is_self = service_type === 'self';
            var fn_name = is_self ? 'addClass' : 'removeClass';
            t('#address')[fn_name]('invisible');
            t('#pick_time')[fn_name]('invisible');

            t('#service_types .selectable').removeClass('selected');
            $this.addClass('selected');
        });

        var service_type = yangaiche(sys.local_storage).get(yangaiche(app.unique_service_type.get)());
        t('#service_types .selectable[data-key="' + service_type + '"]').click();

        function preview_order(order) {
            var params = {
                car_model_type: order.car_model_type,
                coupon_id: order.coupon_id,
                products: order.products,
                user_id: user[ls.user.user_id]
            };
            if (exist(order.supplier_id)) {
                params.supplier_id = order.supplier_id;
            }
            postReq('/v1/api/order_preview', params, function (data) {
                order.coupon_price = data.free_price;
                order.paid_price = 0;
                order.not_paid_price = data.total_price;
                set_order(order);

                t('#order_settle_footer .price .value').html(order.not_paid_price);
                t('#order_settle_footer .coupon .value').html(order.coupon_price);
            }, function (error) {
                order.coupon_id = null;
                set_order(order);
                show_msg(error.message || JSON.stringify(error));
            });
        }

        if (exist(order.coupon_id)) {
            t('#coupon .value').html(order.coupon_name);
        } else {
            getReq('/v1/api/coupons?user_id=' + user.user_id, function (data) {
                var len = 0;
                t.each(data, function (i, coupon) {
                    if ('未使用' === coupon.status) {
                        len += 1;
                    }
                });

                t('#coupon .value').html(len + '张可用');
            });
            order.coupon_id = null;
            order.coupon_value = 0;
            set_order(order);
        }

        preview_order(order);

        if (!t('#comment input').val()) {
            t('#comment input').val(order.comment);
        }

        if (!t('#phone_number input').val()) {
            t('#phone_number input').val(user[ls.user.user_phone]);
        }

        if (!t('#contact_name input').val()) {
            var user_real_name = yangaiche(sys.local_storage).get(ls.openid.user_real_name);
            if (user[ls.user.user_name] && user[ls.user.user_name] !== '') {
                t('#contact_name input').val(user.name);
            } else if (yangaiche(sys.exist)(user_real_name)) {
                t('#contact_name input').val(user_real_name);
            }
        }

        function auto_get_location() {
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (e) {
                if (this.getStatus() === BMAP_STATUS_SUCCESS) {
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
                    });
                    t('#address .value').html(address);
                } else {
                    // 定位失败事件
                    show_msg(e.message);
                    t('#address .value').html('定位失败');
                }
            }, {enableHighAccuracy: true});
        }

        if ((!exist(address_info.name) || address_info.name === '') &&
            (!exist(address_info.address) || address_info.address === '') ||
            !exist(address_info.latitude) ||
            !exist(address_info.longitude)) {
            auto_get_location();
        } else {
            if ('' !== address_info.address) {
                t('#address .value').html(address_info.address.replace(/(^\s*)|(\s*$)/g, ''));
            } else {
                t('#address .value').html(address_info.name.replace(/(^\s*)|(\s*$)/g, ''));
            }
        }

        yangaiche(sys.load_module)('show_payment');

        var $payment = t('#payment');
        $payment.on('click', '.selectable', function () {
            var $this = t(this);
            $payment.attr('data-pay-way', $this.attr('data-pay-way'));
            $payment.attr('data-pay-mode', $this.attr('data-pay-mode'));

            t('#payment .selectable').removeClass('selected');
            $this.addClass('selected');
        });

        t('#payment .selectable:not(.invisible)').eq(0).click();

        t('#address').click(function () {
            yangaiche(ls.back.set_back_to_self)('my_address_manage.html');
        });

        t('#coupon').click(function () {
            yangaiche(ls.back.set_back_to_self)('my_coupons.html?can_select=true');
        });

    });
}());