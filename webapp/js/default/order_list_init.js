yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('format', {});

yangaiche(sys.init)(function (t) {
    var storage = yangaiche(sys.local_storage), now_scroll_top = 'now_scroll_top';
    var save_now_location = function () {
        storage.set(now_scroll_top, document.body.scrollTop);
    };

    var progress = $.AMUI.progress;
    progress.start();
    progress.inc(0.5);
    t('#nprogress .nprogress-bar').css('bottom', 'auto');
    t('#nprogress .nprogress-bar').css('top', '0');

    yangaiche(app.http.get_request)("/v3/api/orders.json?user_id=" + yangaiche(ls.user.touch)()[ls.user.user_id], function (data) {
        var items = [];
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.id = data[i].id;
            item.car_number = data[i].car.licence.province + data[i].car.licence.number;
            item.paid_info = data[i].paid === true ? "已支付" : "未支付";
            item.total_price = data[i].total_price;
            item.place_time = yangaiche(app.format.time)(data[i].place_time);
            item.order_status_value = data[i].order_status_value;
            if (data[i].client_feedback['if_feedback_committed'] || data[i]['order_status_key'] !== 'complete') {
                item.gray_button = 'gray_button';
            }
            items.push(item);
        }
        console.log(items);
        var product_template = Handlebars.compile(t("#order_list_item_tpl").html());
        t("#order_list_view").html(product_template(items));

        var now_scroll_top_value = storage.get(now_scroll_top);
        if (yangaiche(sys.exist)(now_scroll_top_value)) {
            document.body.scrollTop = now_scroll_top_value;
            storage.remove(now_scroll_top);
        }

        t('.order-comment-btn').bind('click', function () {
            if (t(this).hasClass('gray_button')) {
                return;
            }

            save_now_location();
            yangaiche(ls.back.set_back_to_self)('order_comment.html?order_id=' + t(this).attr('data-rel'));
        });

        t('.order-flow-btn').bind('click', function () {

            save_now_location();
            yangaiche(ls.back.set_back_to_self)('order_flow.html?order_id=' + t(this).attr('data-rel'));
        });

        t('.order-list-item-content').bind('click', function () {

            save_now_location();
            yangaiche(ls.back.set_back_to_self)('order_info.html?order_id=' + t(this).attr('data-rel'));
        });

        progress.done();
    });
});