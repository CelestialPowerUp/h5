yangaiche(sys.load_default_module)('template', {});

app.order_info = {
    show: 'show_order_info'
};

yangaiche(app.order_info.show, function() {
    var t = yangaiche(sys.$);
    return function(order) {
        order['client_basic'].car_number = order.car.licence.province + order.car.licence.number;
        if (order['coupon_price'] > 0) {
            order['coupon'] = {value: order['coupon_price'].toFixed(2)};
        }

        order.to_select = null;
        order.to_selected_items = null;
        order.self_items = [];

        t.each(order['products'], function (i, p) {
            var selection_mode = p['selection_mode'];
            if (selection_mode === 1) {
                order.self_items.push(p);
                //} else if (selection_mode === 2) {
                if (!yangaiche(sys.exist)(order.to_select)) {
                    order.to_select = {
                        unselected_items: []
                    };
                }
                order.to_select.unselected_items.push(p);
                //} else if (selection_mode !== 5) {
                if (!yangaiche(sys.exist)(order.to_selected_items)) {
                    order.to_selected_items = {
                        selected_items: []
                    };
                }
                p['display_status'] = selection_mode === 3 ? '¥' + p['total_price'] : '已拒绝';
                order.to_selected_items.selected_items.push(p);
            }
        });

        if (order['not_paid_price'] > 0) {
            order.not_paid = {not_paid_price: order['not_paid_price']};
        }
        order.paid_price = order['paid_price'];

        order['keeper_basics'] = [
            {
                "id": 3,
                "type": "keeper",
                "name": "孙勇",
                "gender": "male",
                "star_count": 5,
                "rating": 5,
                "ID_number": "11010419791210205X",
                "phone_number": "18801354630",
                "car_exp_year": 1,
                "avatar_img": "http://7xiqe8.com2.z0.glb.qiniucdn.com/keeper3.jpg/s1024.jpg",
                "current": true
            },
            {
                "id": 3,
                "type": "mechanic",
                "name": "孙勇",
                "gender": "male",
                "star_count": 5,
                "rating": 5,
                "ID_number": "11010419791210205X",
                "phone_number": "18801354630",
                "car_exp_year": 1,
                "avatar_img": "http://7xiqe8.com2.z0.glb.qiniucdn.com/keeper3.jpg/s1024.jpg",
                "current": true
            }
        ];

        t.each(order['keeper_basics'], function (i, keeper) {
            if ('keeper' === keeper['type']) {
                keeper['type'] = '管家';
            } else if ('mechanic' === keeper['type']) {
                keeper['type'] = '技师';
            }
        });

        console.log(order);
        var template = Handlebars.compile(yangaiche(app.tpl.load)('template/orderInfo.html'));
        t("body").prepend(template(order));
    };
});
