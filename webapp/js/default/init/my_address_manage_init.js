;(function () {

    'use strict';

	yangaiche(sys.load_default_module)('http');
    yangaiche(sys.load_default_module)('user');
    yangaiche(sys.load_default_module)('swiper');
    yangaiche(sys.load_default_module)('location');
    yangaiche(sys.load_default_module)('back');

    yangaiche(sys.init)(function (t) {
        var progress = $.AMUI.progress;
        progress.start();
        progress.inc(0.5);
        t('#nprogress .nprogress-bar').css('bottom', 'auto');
        t('#nprogress .nprogress-bar').css('top', '0');

        yangaiche(app.http.get_request)('/v1/api/addresses?user_id=' + yangaiche(ls.user.touch)().user_id, function (data) {

            var tpl = Handlebars.compile(t('#address_list_tpl').text());
            t('body').prepend(tpl(data));

            t('.address-btn').click(function () {
                var $this = t(this);
                yangaiche(ls.location.update)(function (location_info) {
                    location_info.longitude = $this.attr('data-longitude');
                    location_info.latitude = $this.attr('data-latitude');
                    location_info.name = $this.attr('data-name');
                    location_info.address = $this.find('span').eq(0).text();
                });
                var url = yangaiche(ls.back.get_parent_of)('my_address_manage.html');
                yangaiche(ls.back.set_back_to_his)(url);
            });

            t('.delete-btn').click(function () {
                yangaiche(app.http.post_request)('/v1/api/addresses/delete', [t(this).attr('data-rel')], function () {
                    window.location.reload();
                });
            });

            t('.address-btn').css('left', '0px');

            t.each(t('.delete-btn'), function (i, delete_btn) {
                t(delete_btn).css('left', (640 - 140) + 'px');
            });

            yangaiche(app.swiper.show)('.address', '.address-btn', '/v1/api/addresses/delete');

            progress.done();
        });
    });
}());