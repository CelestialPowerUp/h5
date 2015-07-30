/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {
        t(function () {

            route2coupon();

//            var raw_data = '';
//            var data = $.parseJSON(raw_data)['data'];

            function load_coupons() {
                getReq('coupons?user_id=' + getUser()['user_id'], function (data) {
                    console.log(data);
                    var coupon_id = getOrder()['coupon_id'];
                    t.each(data, function (i, coupon) {
                        if (coupon.id == coupon_id) {
                            coupon.selected = true;
                        }
                        if ("未使用" === coupon.status) {
                            if (coupon.value < 50) {
                                coupon.bg_img = 'http://baseimg.yangaiche.com/couponsbackground3.png';
                            } else if (coupon.value < 100) {
                                coupon.bg_img = 'http://baseimg.yangaiche.com/couponsbackground2.png';
                            } else {
                                coupon.bg_img = 'http://baseimg.yangaiche.com/couponsbackground1.png';
                            }
                            coupon.used = 'false';
                        } else {
                            coupon.bg_img = 'http://baseimg.yangaiche.com/couponsbackground4.png';
                            coupon.used = 'true';
                        }
                        coupon.expired_time = coupon.expired_time.substr(0, coupon.expired_time.indexOf('T'));
                        if ('coupon_type_1' === coupon['coupon_type']) {
                            coupon.showvalue = {value: coupon.value};
                        }
                    });

                    var tpl = Handlebars.compile(t("#coupons_list_tpl").text());
                    t('#coupons').empty().html(tpl(data));

                    t('.coupon-btn').click(function (e) {
                        if ('coupon_list' !== getStore().get('now_in') && 'false' === t(this).attr('data-used')) {
                            var order = getOrder();
                            var seleted_id = parseInt(t(this).attr('data-id'));
                            if (order['coupon_id'] === seleted_id) {
                                order['coupon_id'] = null;
                                order['coupon_name'] = null;
                                order['coupon_value'] = 0;
                                updateOrder(order);
                                go_back_to_reload();
                            } else {
                                var coupon_name = t(this).attr('data-name');
                                var coupon_type = t(this).attr('data-type');
                                postReq('order_preview', {
                                    car_model_type: order['car_model_type'],
                                    coupon_id: seleted_id,
                                    products: order['products'],
                                    user_id: getUser()['user_id']
                                }, function(data) {
                                    order['coupon_id'] = seleted_id;
                                    order['coupon_name'] = coupon_name;
                                    order['coupon_type'] = coupon_type;
                                    order['coupon_value'] = data['free_price'];
                                    order['total_price'] = data['total_price'];
                                    updateOrder(order);
                                    go_back_to_reload();
                                }, function(error) {
                                    show_msg(error['message']);
                                });
                            }
                        }
                    });

                    t('#coupon_number').val('');
                });
            }

            load_coupons();

            t('#coupon_convert').click(function (e) {
                disable_button('coupon_convert');
                var code = t('#coupon_number').val();
                if (!code) {
                    show_msg('请输入正确的兑换码');
                    reset_button('coupon_convert');
                }

                postReq('coupons/conversion', {
                    user_id: getUser()['user_id'],
                    coupons: [{code: code}]
                }, function (data) {
                    load_coupons();
                    reset_button('coupon_convert');
                }, function (error) {
                    show_msg(error['message']);
                    reset_button('coupon_convert');
                });
            });

        });
    }
}(window.jQuery);