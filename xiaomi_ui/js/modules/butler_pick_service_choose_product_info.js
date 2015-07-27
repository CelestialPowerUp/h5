/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {

        var store = getStore();
        var order = getOrder();

        t(function () {

            console.log([store.get('car_info')]);

            template('./template/carInfo.html', 'body', 'prepend', [store.get('car_info')], null, null, function () {
                var base_ui = t('.car-info').eq(0);
                var base_ui2 = base_ui.children('.my-list-line-content').eq(0);
                t('body').children().eq(0).find('.fixed-width-content').css('width', (t(window).width()
                    - base_ui.css('padding-left').match(/\d*/) * 2 - base_ui.height() * 0.6
                    - base_ui2.css('margin-left').match(/\d*/)) + 'px');
            });

            load_products(get_service_type_from_router(), order['car_model_type'], null, null, function (param) {
//                console.log(param['ret_data']);

                var products = [], total_price = 0, product_dict = {}, product_part_dict = {};
                t.each(param['ret_data']['required_products'] ? param['ret_data']['required_products'] : [], function (i, p) {
                    p['total_price'] = product_price(p);
                    products.push(p);
                    total_price += product_price(p);
                });

                store.set('required_price', {data: total_price});

                t.each(param['ret_data']['optional_products'] ? param['ret_data']['optional_products'] : [], function (i, p_c) {
                    var part_type = p_c['part_type'];
                    t.each(p_c['products'], function (j, p) {
                        product_dict[p['product_type']] = p;
                        product_part_dict[p['product_type']] = part_type;
                    });
                });

//                console.log(param['ret_data']['optional_products']);
                template('./template/carProducts.html', '#products', 'full-fill', param['ret_data']['optional_products'], null, null, function () {
                    t('#products').css('margin-bottom', '130px');

                    var swipers = t('.swiper-container');
                    var base_ui = t('.my-product-line-content-label').eq(0);
                    var max_length = t(window).width() - base_ui.width() - base_ui.css('margin-left').match(/\d*/) * 2;
                    t.each(param['ret_data']['optional_products'], function (i, ps) {
                        var length = ps['products'].length;
                        var base_ui_btn = swipers.eq(i).find('.my-product-line-content-button').eq(length - 1);
                        var len = length * base_ui_btn.css('width').match(/\d*/) + (length - 1) * base_ui_btn.css('margin-left').match(/\d*/);

                        swipers.eq(i).find('.swiper-slide').css('width', len + 'px');
                        if (len > max_length) {
                            len = max_length;
                        }
                        swipers.eq(i).css('width', len + 'px');
                        swipers.eq(i).addClass('swiper-container' + i);
                        swipers.eq(i).find('.swiper-scrollbar').addClass('swiper-scrollbar' + i);

                        swipers.eq(i).find('.swiper-scrollbar').css('width', len + 'px');

                        var swiper = new Swiper('.swiper-container' + i, {
                            direction: 'horizontal',
                            scrollbar: '.swiper-scrollbar' + i,
                            slidesPerView: 'auto',
                            slidesPerColumnFill: 'row',
                            scrollbarHide: true,
                            centeredSlides: false,
                            spaceBetween: 24,
                            grabCursor: true,
                            freeMode: true
                        });
                    });

                    t('#products').find('.swiper-scrollbar').css('margin', '0 0 50px -3px');
                    t('#products').find('.swiper-scrollbar').css('height', '1px');

                    t.each(t('.my-btn-group'), function (i, btn_group) {
                        var partname = param['ret_data']['optional_products'][i]['part_name'];
                        var first_p = t(btn_group).find('button').eq(0);
                        if ('空气滤' === partname) {
                            t(first_p).css('background-color', '#FFFFFF');
                            t(first_p).css('color', '#333333');
                            t(first_p).css('border', '1px solid #cccccc');
                        } else {
                            var local_rel = first_p.attr('data-rel');
                            t(btn_group).attr('data-rel', local_rel);
                        }
                    });

                    recal_products(product_dict, product_part_dict);

                    t('.my-btn-group').on('click', 'button', function (e) {
                        var group_p = t(this).parents()[1];
                        var local_rel = t(this).attr('data-rel');
                        var selected_rel = t(group_p).attr('data-rel');
                        if (local_rel == selected_rel) {
                            t(group_p).attr('data-rel', '');
                            t(this).css('background-color', '#FFFFFF');
                            t(this).css('color', '#333333');
                            t(this).css('border', '1px solid #cccccc');

                            recal_products(product_dict, product_part_dict);
                            return;
                        }

                        t(group_p).attr('data-rel', local_rel);
                        t(group_p).find('button').css('background-color', '#FFFFFF');
                        t(group_p).find('button').css('color', '#333333');
                        t(group_p).find('button').css('border', '1px solid #cccccc');
                        t(this).css('background-color', '#0db603');
                        t(this).css('color', '#FFFFFF');
                        t(this).css('border', '1px solid #0db603');

                        recal_products(product_dict, product_part_dict);
                    });
                });

                t('#next').bind('click', function (e) {
                    var order = getOrder();
                    order['product_comment'] = t('#comment').val();
                    updateOrder(order);

                    recal_products(product_dict, product_part_dict, products);

                    console.log(getOrder());
                    route2();
                });
            });
        });
    }
}(window.jQuery);