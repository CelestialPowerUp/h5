/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {

        t(function () {
            var store = getStore();

//            var raw_data = '';
//            var data = t.parseJSON(raw_data);

            getReq('meta_brands/section', function (data) {
                var mydata = [], it, brand_img = {};
                t.each(data, function (i, o) {
                    if (o['section']) {
                        it = {section: o['section']};
                        mydata.push(it);
                    } else {
                        it['main'] = it['main'] || [];
                        it['main'].push(o);
                        brand_img[o['brand_type']] = o['img_url'];
                    }
                });
                console.log(mydata);
                store.set('brand2img', brand_img);

                var tpl = Handlebars.compile(t("#brand_list_tpl").text());
                t('#scroller').prepend(tpl(mydata));
                t('.my-list-item-hd').css('width', (640 - 30 - 70 - 30) + 'px');

            }, function (error) {
                alert("请求服务器错误，" + error['message']);
            });
        });

    }
}(window.jQuery);