!function (t) {
    if (t) {
        t(function () {

            t('#submit').click(function(e) {

                var store_item = getStore().get('store_item_spec');

                var order = getOrder();
                order['products'] = store_item['ware_products'];
                t.each(order['products'], function(i, wp) {
                    wp['total_price'] = wp['product_price'];
                    wp['product_type'] = wp['product_id'];
                    wp['unit_count'] = 1;
                });
                updateOrder(order);

                getStore().set('submit_text', '确定');

                window.location.href = './car_list.html';

            });

        });
    }
}(window.jQuery);