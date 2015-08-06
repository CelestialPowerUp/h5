/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {

        t(function () {

            var category = getReqParam()['category'];
            getReq('meta_cars.json?category_type=' + category, function (data) {
                console.log(data);

                var model2info = {};
                t.each(data, function (i, o) {
                    if (o['producer'].trim() === '无差别') {
                        o['producer'] = '';
                    }
                    model2info[o['model_type']] = o;
                });
                console.log(model2info);
                getStore().set('model2info', model2info);

                var tpl = Handlebars.compile(t("#car_list_tpl").text());
                t('#scroller').prepend(tpl(data));
            }, function (error) {
                alert("请求服务器错误，" + error['message']);
            });
        });

    }
}(window.jQuery);