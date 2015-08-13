yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('swiper', {});

yangaiche(sys.init)(function (t) {
    var progress = $.AMUI.progress;
    progress.start();
    progress.inc(0.5);
    t('#nprogress .nprogress-bar').css('bottom', 'auto');
    t('#nprogress .nprogress-bar').css('top', '0');

    yangaiche(app.http.get_request)('/v1/api/addresses?user_id=' + yangaiche(ls.user.touch)()['user_id'], function (data) {

        var tpl = Handlebars.compile(t("#address_list_tpl").text());
        t('body').prepend(tpl(data));

        t('.address-btn').click(function (e) {
            if ('address_list' !== getStore().get('now_in')) {
                var location_info = {};
                location_info['longitude'] = t(this).attr('data-longitude');
                location_info['latitude'] = t(this).attr('data-latitude');
                location_info['name'] = t(this).attr('data-name');
                location_info['address'] = t(this).find('span').eq(0).text();
                updateLocation(location_info);
                go_back_to_reload();
            }
        });

        t('.delete-btn').click(function (e) {
            yangaiche(app.http.post_request)('/v1/api/addresses/delete', [t(this).attr('data-rel')], function (data) {
                window.location.reload();
            });
        });

        t('.address-btn').css('left', '0px');

        t.each(t('.delete-btn'), function (i, delete_btn) {
            var p_box = t(delete_btn).parents()[0];
            t(delete_btn).css('left', (640 - 140) + 'px');
        });

        yangaiche(app.swiper.show)('.address', '.address-btn', '/v1/api/addresses/delete');

        progress.done();
    });
});