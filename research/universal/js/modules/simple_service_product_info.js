/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {
        var store = getStore();

        t(function () {
            console.log([store.get('car_info')]);
            template('./template/carInfo.html', 'body', 'prepend', [store.get('car_info')], null, null, function() {
                t('body').children().eq(0).find('.fixed-width-content').css('width', (640 - 30 - 70 - 30 - 30) + 'px');
            }, null, true);

            load_products(get_service_type_from_router(), getOrder()['car_model_type'], null, null, simple_after, null, true);
        });
    }
}(window.jQuery);