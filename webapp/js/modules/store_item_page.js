!function (t) {
    if (t) {
        t(function () {

            t('#submit').click(function(e) {

                var store_item = getStore().get('store_item_spec');

                var order = getOrder();
                order['products'] = [{product_id: store_item['product_id']}];
                order['ware_products'] = store_item['ware_products'];
                t.each(order['ware_products'], function(i, wp) {
                    wp['total_price'] = wp['product_price'];
                    wp['unit_count'] = 1;
                });
                updateOrder(order);

                store.set('submit_text', '确定');

                window.location.href = './base_info.html';

            });

        });
    }
}(window.jQuery);