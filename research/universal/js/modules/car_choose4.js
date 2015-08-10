/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {
        var car_model_type, store = getStore(), o;

        if (!getReqParam()['cmt']) {
            o = store.get('car_info_m');
            o['img_url'] = o.brand_img_url.thumbnail_url;
            car_model_type = o['model_type'];
            o['car_number'] = stripscript(o.licence.province + o.licence.number);
        } else {
            var model2info = store.get('model2info');
            console.log(model2info);
            car_model_type = getReqParam()['cmt'];
            var o = model2info[car_model_type];
            var brand2img = store.get('brand2img');
            o['img_url'] = brand2img[store.get('selected_brand')];
            o['car_number'] = '京';
            o['model'] = o['production_year'] + '款&nbsp;' + o['car_model_Name'];
        }
        var year_data = [], month_data = [], i;
        for (i = 2015; i >= 2000; i--) {
            year_data.push({ninfo: i, infos: i + '年'});
        }
        for (i = 1; i <= 12; i++) {
            if (i < 10) {
                month_data.push({ninfo: '0' + i, infos: i + '月'});
            } else {
                month_data.push({ninfo: i, infos: i + '月'});
            }
        }
        o['year_data'] = year_data;
        o['month_data'] = month_data;
        var iter = [
            "京",
            "津",
            "冀",
            "晋",
            "蒙",
            "辽",
            "吉",
            "黑",
            "苏",
            "浙",
            "皖",
            "沪",
            "闽",
            "赣",
            "鲁",
            "豫",
            "鄂",
            "湘",
            "粤",
            "桂",
            "琼",
            "渝",
            "川",
            "黔",
            "滇",
            "藏",
            "陕",
            "甘",
            "青",
            "宁",
            "新",
            "台",
            "港",
            "澳"
        ];
        t.each(iter, function (i, p) {
            iter[i] = {province: p};
        });
        o['province_data'] = iter;

        template('template/editCarInfo.html', 'body', 'prepend', [o], null, null, function () {
            t('body').children().eq(0).find('.fixed-width-content').css('width', (640 - 30 - 70 - 30 - 30) + 'px');

            t('#number').unbind('keyup');
            t('#number').bind('keyup', function (e) {
                t('#car_number').empty().html(t('#province').val() + t(this).val());
            });

            t('#province').unbind('change');
            t('#province').bind('change', function (e) {
                t('#car_number').empty().html(t(this).val() + t('#number').val());
            });

            t('#pick_year').bind('click', function (event) {
                var prevent_default = function () {
                    t('#pick_year').focus();
                };
                t('#province').bind('focus', prevent_default);
                t('#number').bind('focus', prevent_default);
                t('#miles').bind('focus', prevent_default);
                setTimeout(function () {
                    t('#province').unbind('focus', prevent_default);
                    t('#number').unbind('focus', prevent_default);
                    t('#miles').unbind('focus', prevent_default);
                }, 1000);
            });

            t('#pick_month').bind('click', function (event) {
                var prevent_default = function () {
                    t('#pick_month').focus();
                };
                t('#province').bind('focus', prevent_default);
                t('#number').bind('focus', prevent_default);
                t('#miles').bind('focus', prevent_default);
                setTimeout(function () {
                    t('#province').unbind('focus', prevent_default);
                    t('#number').unbind('focus', prevent_default);
                    t('#miles').unbind('focus', prevent_default);
                }, 1000);
            });

            if (!getReqParam()['cmt']) {
                o['bought_time'].replace(/(\d{4})-(\d+)-\d{2}T/, function(a, year, month) {
                    t('#pick_year').val(year);
                    t('#pick_month').val(month);
                });
                t('#province').val(o['licence']['province']);
                t('#number').val(o['licence']['number']);
                t('#miles').val(o['miles']);
            }

            t('#submit_btn').unbind('click');
            t('#submit_btn').bind('click', function (e) {
                var miles, year, month, number, province, re;

                province = t('#province').val();

                number = t('#number').val();

                year = t('#pick_year').val();
                month = t('#pick_month').val();

                miles = t('#miles').val();

                var user = getUser();
                var param = [{
                    user_id: user['user_id'],
                    miles: miles,
                    bought_time: year + '-' + month + '-01T01:01:0.0Z',
                    licence: {
                        number: number,
                        province: province
                    },
                    model_type: parseInt(car_model_type),
                    number: number,
                    province: province
                }];
                if (!getReqParam()['cmt']) {
                    param[0]['id'] = o['id'];
                }
                console.log(param);
                postReq('cars/update.json', param, function () {
                    if (store.get('now_in') === 'my_cars') {
//                        window.history.back();
                        window.location.href = './my_cars.html';
                    } else {
//                        window.history.go(-4);
                        window.location.href = './car_list.html';
                    }
                }, function () {
                    alert("AJAX ERROR");
                });
            });
        });

    }
}(window.jQuery);