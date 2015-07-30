/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    t(function () {

        getStore().set('now_in', 'my_cars');

//        var raw_data = '';
//        var data = $.parseJSON(raw_data);

        getReq('cars.json?car_user_id=' + getUser()['user_id'], function (data) {
            var item = {};
            var tmpl_data = [];
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
            t('.fixed-width-content').css('width', (640 - 30 - 70 - 30 - 30) + 'px');

            t('.carinfo-btn').click(function (e) {
                var car = item[t(this).attr('data-rel')];
                getStore().set("car_info_m", car);

                window.location.href = './car_choose4.html';
            });

            t('.carinfo-btn').css('left', '0px');

            t('.delete-btn').click(function (e) {
                postReq('cars/delete', [t(this).attr('data-rel')], function(data) {
                    window.location.reload();
                });
            });

            t.each(t('.delete-btn'), function(i, delete_btn) {
                t(delete_btn).css('left', (640 - 140) + 'px');
            });

            var accepted = false, startX, now_offset, is_moving = false, interval, last_intention_target, last_intention;//true for left, false for right

            function accept(i) {
                //                    return (i < -140) ? false : ((i > 0) ? false : i);
                //                    return i;
                return (i > 0) ? false : i;//禁止右滑动出界
            }

            t('.carinfo').hammer().on('panstart', function(e) {
                console.log(e);
                console.log('touch start');
                if (Math.abs(90 - Math.abs(e['gesture']['angle'])) < 50) {
                    accepted = false;
                    return;
                }
                accepted = true;
                if (is_moving) {
                    clearInterval(interval);
                    is_moving = false;
                }
                startX = e['gesture']['pointers'][0]['pageX'];
                var carinfo_btn = t(this).find('.carinfo-btn').eq(0);
                now_offset = t(carinfo_btn).css('left');
                now_offset = parseFloat(now_offset.substr(0, now_offset.indexOf('px')));
                if (now_offset === 0) {
                    t('.carinfo-btn').css('left', '0px');//所有地址归位
                }
            });

            t('.carinfo').hammer().on('panmove', function(e) {
                if (!accepted) {
                    return;
                }
                console.log('touch move');
                var endX = e['gesture']['pointers'][0]['pageX'];
                t(this).find('.carinfo-btn').eq(0).css('left', accept(now_offset - (startX - endX)) + 'px');
                console.log('fade ing ...');
            });

            function move(carinfo_btn, from, to) {
                if (from > to) {
                    last_intention = true;
                } else if (from < to) {
                    last_intention = false;
                } else {
                    return;
                }
                last_intention_target = to;

                var times = Math.abs(from - to) + 125;

                function get_offset(x) {
                    function ifn(x) {
                        // 倍数不能小于
                        return Math.abs(Math.sin(x)) * times;
                    }
                    var number;
                    if (last_intention) {
                        number = from - ifn(x);
                        return number >= to ? number : false;
                    } else {
                        number = from + ifn(x);
                        return number <= to ? number : false;
                    }
                }

                var i = Math.PI / 100, step = Math.PI / 100;
                interval = setInterval(function() {
                    var offset = get_offset(i);
                    console.log(offset);
                    if (!offset) {
                        t(carinfo_btn).css('left', to + 'px');
                        clearInterval(interval);
                        is_moving = false;
                    } else {
                        t(carinfo_btn).css('left', offset + 'px');
                        i = i + step;
                    }
                }, 16);
                is_moving = true;
            }

            t('.carinfo').hammer().on('panend', function(e) {
                if (!accepted) {
                    return;
                }
                console.log('touch end');
                console.log(e);
                var endX = e['gesture']['pointers'][0]['pageX'];
                console.log(startX);
                console.log(endX);
                var carinfo_btn = t(this).find('.carinfo-btn').eq(0);
                now_offset = t(carinfo_btn).css('left');
                now_offset = parseFloat(now_offset.substr(0, now_offset.indexOf('px')));
                if (now_offset < (0 - 640 / 2)) {
                    postReq('cars/delete', [t(this).attr('data-rel')], function (data) {
                        window.location.reload();
                    });
                } else {
                    if (now_offset === 0) {
                        t('.carinfo-btn').css('left', '0px');//所有地址归位
                    }
                    if ((startX - endX) > 0) {
                        move(carinfo_btn, now_offset, -140);
                        console.log('fade in');
                    } else if ((endX - startX) > 0) {
                        move(carinfo_btn, now_offset, 0);
                        console.log('fade out');
                    } else {
                        move(carinfo_btn, now_offset, last_intention_target);
                        console.log('continue');
                    }
                }
            });

        });

    });
}(window.jQuery);