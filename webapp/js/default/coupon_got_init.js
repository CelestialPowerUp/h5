yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');
yangaiche(sys.load_default_module)('back');

yangaiche(sys.init)(function (t) {
    t('.yac-coupon-got-btn').touchstart(function () {
        t(this).addClass('yac-coupon-got-btn-hover');
    }).touchend(function () {
        t(this).removeClass('yac-coupon-got-btn-hover');
    }).click(function () {
        yangaiche(app.http.get_request)('/v2/api/store/home_ware_list.json', function (data) {
            t.each(data, function(i, d) {
                if ('超值优惠产品' !== d['ware_type_name']) {
                    return true;
                }

                t.each(d['ware_list'], function(j, ware) {
                    if ('洗车打蜡' !== d['ware_name']) {
                        return true;
                    }

                    yangaiche(ls.back.set_back_to_store)('store_item_page.html?ware_id=' + d['ware_id']);
                    return false;
                });
            });
        }, function (error) {
            yangaiche(app.show_msg.show)(error['message']);
        });
    });
});