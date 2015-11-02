yangaiche(sys.load_default_module)('order');

yangaiche(sys.init)(function (t) {
    var order = yangaiche(ls.order.touch)(),
        exist = yangaiche(sys.exist);

    if (exist(order.client_basic)) {
        if (exist(order.client_basic.location) && exist(order.client_basic.location.address)) {
            t('#location').text(order.client_basic.location.address);
        }

        if (exist(order.client_basic.name)) {
            t('#contact_name').text(order.client_basic.name);
        }

        if (exist(order.client_basic.phone_number)) {
            t('#phone_number').text(order.client_basic.phone_number);
        }
    }

    if (exist(order.pick_time) && exist(order.pick_time_segment)) {
        t('#pick_time').text(order.pick_time + ' ' + order.pick_time_segment);
    }

    if (exist(order.car) && exist(order.car.model)) {
        t('#car_info').text(order.car.model);
    }

    if ('h5_hybrid' !== yangaiche(sys.browser_type).type) {
        t('#not_seen_in_hybrid').css('display', 'block');
    }
});