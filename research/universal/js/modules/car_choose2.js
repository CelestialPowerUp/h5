/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {

        t(function () {

//            var raw_data = '[{"category_type":73,"brand_type":8,"brand_name":"宝马","category_name":"1系"},{"category_type":89,"brand_type":8,"brand_name":"宝马","category_name":"M4"},{"category_type":90,"brand_type":8,"brand_name":"宝马","category_name":"M5"},{"category_type":91,"brand_type":8,"brand_name":"宝马","category_name":"M6"},{"category_type":72,"brand_type":8,"brand_name":"宝马","category_name":"X1"},{"category_type":82,"brand_type":8,"brand_name":"宝马","category_name":"X3"},{"category_type":83,"brand_type":8,"brand_name":"宝马","category_name":"X4"},{"category_type":84,"brand_type":8,"brand_name":"宝马","category_name":"X5"},{"category_type":92,"brand_type":8,"brand_name":"宝马","category_name":"X5 M"},{"category_type":85,"brand_type":8,"brand_name":"宝马","category_name":"X6"},{"category_type":93,"brand_type":8,"brand_name":"宝马","category_name":"X6 M"},{"category_type":88,"brand_type":8,"brand_name":"宝马","category_name":"M3"},{"category_type":81,"brand_type":8,"brand_name":"宝马","category_name":"i8"},{"category_type":87,"brand_type":8,"brand_name":"宝马","category_name":"1系M"},{"category_type":74,"brand_type":8,"brand_name":"宝马","category_name":"2系"},{"category_type":75,"brand_type":8,"brand_name":"宝马","category_name":"2系运动旅行车"},{"category_type":70,"brand_type":8,"brand_name":"宝马","category_name":"3系"},{"category_type":76,"brand_type":8,"brand_name":"宝马","category_name":"3系GT"},{"category_type":77,"brand_type":8,"brand_name":"宝马","category_name":"4系"},{"category_type":71,"brand_type":8,"brand_name":"宝马","category_name":"5系"},{"category_type":78,"brand_type":8,"brand_name":"宝马","category_name":"5系GT"},{"category_type":79,"brand_type":8,"brand_name":"宝马","category_name":"6系"},{"category_type":80,"brand_type":8,"brand_name":"宝马","category_name":"7系"},{"category_type":86,"brand_type":8,"brand_name":"宝马","category_name":"Z4"}]';
//            var data = t.parseJSON(raw_data);

            var brand = getReqParam()['brand'];
            getStore().set('selected_brand', brand);
            getReq('meta_categories.json?brand_type=' + brand, function (data) {
                console.log(data);

                var tpl = Handlebars.compile(t("#category_list_tpl").text());
                t('#scroller').prepend(tpl(data));

            }, function (error) {
                alert("请求服务器错误，" + error['message']);
            });
        });

    }
}(window.jQuery);