/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {
        var store = getStore();

        t(function () {
            console.log([store.get('car_info')]);
            template('./template/carInfo.html', 'body', 'prepend', [store.get('car_info')], null, null, function () {
                var base_ui = t('.car-info').eq(0);
                var base_ui2 = base_ui.children('.my-list-line-content').eq(0);
                t('body').children().eq(0).find('.fixed-width-content').css('width', (t(window).width()
                    - base_ui.css('padding-left').match(/\d*/) * 2 - base_ui.height() * 0.6
                    - base_ui2.css('margin-left').match(/\d*/)) + 'px');
            }, null, true);

            load_products(get_service_type_from_router(), getOrder()['car_model_type'], null, null, simple_after, null, true);
        });
    }
}(window.jQuery);