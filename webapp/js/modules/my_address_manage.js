/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {
        t(function () {

            check_reload_cmd();

            route2address();

//            var raw_data = '{"code":"00000","data":[{"id":25,"address":"北京市海淀区北三环中路77号院-27号楼北京市海淀区北三环中路77号院-27号楼","longitude":116.364142,"latitude":39.977895,"user_id":18,"name":"北京市海淀区北三环中路77号院-27号楼"},{"id":24,"address":"北京市西城区百万庄南街10号院","longitude":116.345098,"latitude":39.931795,"user_id":18,"name":"北京市西城区百万庄南街10号院"},{"id":23,"address":"北京市海淀区西村路7号院-2号楼","longitude":116.380949,"latitude":39.978662,"user_id":18,"name":"北京市海淀区西村路7号院-2号楼"},{"id":22,"address":"北京市海淀区京师路","longitude":116.373008,"latitude":39.96976,"user_id":18,"name":"北京市海淀区京师路"},{"id":18,"address":"北京市昌平区X026(中东路)","longitude":116.395888,"latitude":40.061047,"user_id":18,"name":"北京市昌平区X026(中东路)"},{"id":17,"address":"北京市丰台区丰台南路","longitude":116.340606,"latitude":39.827867,"user_id":18,"name":"北京市丰台区丰台南路"},{"id":14,"address":"北京市海淀区京师路","longitude":116.371571,"latitude":39.96976,"user_id":18,"name":"北京市海淀区京师路"}]}';
//            var data = $.parseJSON(raw_data)['data'];

            getReq('addresses?user_id='+getUser()['user_id'], function(data){
                console.log(data);

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
                    postReq('addresses/delete', [t(this).attr('data-rel')], function(data) {
                        window.location.reload();
                    });
                });

                t('.address-btn').css('left', '0px');

                t.each(t('.delete-btn'), function(i, delete_btn) {
                    var p_box = t(delete_btn).parents()[0];
                    t(delete_btn).css('left', (640 - 140) + 'px');
                });

                function accept(i) {
//                    return (i < -140) ? false : ((i > 0) ? false : i);
//                    return i;
                    return (i > 0) ? false : i;//禁止右滑动出界
                }

                var accepted = false, startX, now_offset, is_moving = false, interval, last_intention_target, last_intention;//true for left, false for right

                t('.address').hammer().on('panstart', function(e) {
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
                    var address_btn = t(this).find('.address-btn').eq(0);
                    now_offset = t(address_btn).css('left');
                    now_offset = parseFloat(now_offset.substr(0, now_offset.indexOf('px')));
                    if (now_offset === 0) {
                        t('.address-btn').css('left', '0px');//所有地址归位
                    }
                });

                t('.address').hammer().on('panmove', function(e) {
                    if (!accepted) {
                        return;
                    }
                    console.log('touch move');
                    var endX = e['gesture']['pointers'][0]['pageX'];
                    t(this).find('.address-btn').eq(0).css('left', accept(now_offset - (startX - endX)) + 'px');
                    console.log('fade ing ...');
                });

                function move(address_btn, from, to) {
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
                            t(address_btn).css('left', to + 'px');
                            clearInterval(interval);
                            is_moving = false;
//                            swinging = true;
                        } else {
                            t(address_btn).css('left', offset + 'px');
                            i = i + step;
                        }
                    }, 16);
                    is_moving = true;
                }

                t('.address').hammer().on('panend', function(e) {
                    if (!accepted) {
                        return;
                    }
                    console.log('touch end');
                    console.log(e);
                    var endX = e['gesture']['pointers'][0]['pageX'];
                    console.log(startX);
                    console.log(endX);
                    var address_btn = t(this).find('.address-btn').eq(0);
                    now_offset = t(address_btn).css('left');
                    now_offset = parseFloat(now_offset.substr(0, now_offset.indexOf('px')));
                    if (now_offset < (0 - 640 / 2)) {
                        postReq('addresses/delete', [t(this).attr('data-rel')], function (data) {
                            window.location.reload();
                        });
                    } else {
                        if (now_offset === 0) {
                            t('.address-btn').css('left', '0px');//所有地址归位
                        }
                        if ((startX - endX) > 0) {
                            move(address_btn, now_offset, -140);
                            console.log('fade in');
                        } else if ((endX - startX) > 0) {
                            move(address_btn, now_offset, 0);
                            console.log('fade out');
                        } else {
                            move(address_btn, now_offset, last_intention_target);
                            console.log('continue');
                        }
                    }
                });

            });

        });
    }
}(window.jQuery);