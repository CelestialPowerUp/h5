!function (t) {
    if (t) {
        t(function () {

            var store_item_detail_img_width = t('#store-item-detail-wrapper').width();
            var store_item_detail_img_height = store_item_detail_img_width / 600 * 394;
            t('#store-item-detail-img').height(store_item_detail_img_height);


            var store_item_detail_img_spec = t('#store-item-detail-img>div');
            store_item_detail_img_spec.width(store_item_detail_img_width);
            store_item_detail_img_spec.css('top', (store_item_detail_img_height - store_item_detail_img_spec.height()) + 'px');

        });
    }
}(window.jQuery);