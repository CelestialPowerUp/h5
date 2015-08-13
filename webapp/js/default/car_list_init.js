yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('order', {});
yangaiche(sys.load_default_module)('format', {});

yangaiche(sys.init)(function(t) {
    var progress = $.AMUI.progress;
    progress.start();
    progress.inc(0.5);
    t('#nprogress .nprogress-bar').css('bottom', 'auto');
    t('#nprogress .nprogress-bar').css('top', '0');

    var items = {};

    yangaiche(app.http.get_request)('/v1/api/cars.json?car_user_id=' + yangaiche(ls.user.touch)()[ls.user.user_id], function (data) {
        var tpl_data = [];
        for (var i = 0; i < data.length; i++) {
            var view_data = {};
            view_data.car_id = data[i]['id'];
            view_data.car_model_type = data[i]['model_type'];
            view_data.img_url = data[i]['brand_img_url']['thumbnail_url'];
            view_data.car_number = yangaiche(app.format.stripscript)(data[i]['licence']['province'] + data[i]['licence']['number']);
            view_data.model = data[i]['model'];
            tpl_data.push(view_data);
            items[view_data.car_id] = view_data;
        }

        var tpl = Handlebars.compile(t("#carinfo_list_tpl").text());
        t('body').prepend(tpl(tpl_data));

        t('body').children().eq(0).find('.fixed-width-content').css('width', (640 - 30 - 70 - 30 - 30 - 14) + 'px');

        t('li').click(function() {
            var $this = t(this), key = $this.attr('data-rel'), car = items[parseInt(key)];

            yangaiche(ls.order.update)(function(order) {
                order.car_id = car.car_id;
                order.car_model_type = car.car_model_type;
                order.car_number = car.car_number;
            });

            yangaiche(sys.local_storage).set("car_info", {img_url: car.img_url, car_number: car.car_number, model: car.model});

            window.location.href = './base_info.html';
        });

        progress.done();
    });
});