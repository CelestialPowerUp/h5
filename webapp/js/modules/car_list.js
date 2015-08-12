/**
 * Created by caols on 7/27/15.
 */
var item = {};
var item_click_handler = function (car_id) {


};

!function (t) {
    t(function () {

//        var raw_data = '';
//        var data = $.parseJSON(raw_data);

        getReq('cars.json?car_user_id=' + getUser()['user_id'], function (data) {
            var tmpl_data = [];
            item = {};
            for (var i = 0; i < data.length; i++) {
                var view_data = {};
                view_data.car_id = data[i].id;
                view_data.car_model_type = data[i].model_type;
                view_data.img_url = data[i].brand_img_url.thumbnail_url;
                view_data.car_number = stripscript(data[i].licence.province + data[i].licence.number);
                view_data.model = data[i].model;
                tmpl_data.push(view_data);
                item[view_data.car_id] = data[i];
            }
            console.log(tmpl_data);

            var tpl = Handlebars.compile(t("#carinfo_list_tpl").text());
            t('body').prepend(tpl(tmpl_data));
            t('body').children().eq(0).find('.fixed-width-content').css('width', (640 - 30 - 70 - 30 - 30 - 14) + 'px');

        });

    });
}(window.jQuery);