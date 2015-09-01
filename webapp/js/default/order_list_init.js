yangaiche(sys.load_default_module)('http', {});
yangaiche(sys.load_default_module)('user', {});
yangaiche(sys.load_default_module)('format', {});
yangaiche(sys.load_default_module)('show_msg', {});
yangaiche(sys.load_default_module)('paging');
yangaiche(sys.load_default_module)('parameter');

yangaiche(sys.init)(function (t) {
    var storage = yangaiche(sys.local_storage), now_scroll_top = 'now_scroll_top';
    var save_now_location = function () {
        yangaiche(app.paging.save)();
        storage.set(now_scroll_top, document.body.scrollTop);
    };

    function data_handler(data) {
        var items = [], data = data['items'];
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.id = data[i].id;
            item.car_number = data[i].car.licence.province + data[i].car.licence.number;
            item.total_price = data[i].total_price;
            item.place_time = yangaiche(app.format.time)(data[i].place_time);
            item.order_status_value = data[i].order_status_value;
            if (data[i]['order_status_key'].match(/complete|completed/)) {
                item.comment_btn_text = key.submit_button.submit_text_value4;
                item.gray_button = '';
            } else {
                item.gray_button = 'gray_button';
                if ('evaluated' === data[i]['order_status_key']) {
                    item.comment_btn_text = key.submit_button.submit_text_value6;
                } else {
                    item.comment_btn_text = key.submit_button.submit_text_value8;
                }
            }
            if (!data[i]['order_status_key'].match(/unconfirmed|confirmed/)) {
                item.gray_button2 = 'gray_button';
            }
            items.push(item);
        }
        console.log(items);
        var product_template = Handlebars.compile(t("#order_list_item_tpl").html());
        t("#order_list_view").append(product_template(items));

        t('.order-comment-btn').unbind('click');
        t('.order-comment-btn').bind('click', function () {
            if (t(this).hasClass('gray_button')) {
                return;
            }

            save_now_location();
            yangaiche(ls.back.set_back_to)('order_comment.html?order_id=' + t(this).attr('data-rel'), 'order_list.html?recover=true');
        });

        t('.order-flow-btn').unbind('click');
        t('.order-flow-btn').bind('click', function () {

            save_now_location();
            yangaiche(ls.back.set_back_to)('order_flow.html?order_id=' + t(this).attr('data-rel'), 'order_list.html?recover=true');
        });

        t('.order-cancel-btn').unbind('click');
        t('.order-cancel-btn').bind('click', function () {
            if (t(this).hasClass('gray_button')) {
                return;
            }

            save_now_location();

            var order_id = t(this).attr('data-rel');
            t('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function () {
                    yangaiche(app.http.post_request)('/v1/api/order_status/update.json', {
                        "order_id": order_id,
                        "order_status": "cancelled"
                    }, function (data) {
                        yangaiche(app.show_msg.show)(data);
                        window.location.reload();
                    }, function (error) {
                        yangaiche(app.show_msg.show)(error['message']);
                    });
                },
                // closeOnConfirm: false,
                onCancel: function () {
                }
            });
        });

        t('.order-list-item-content').unbind('click');
        t('.order-list-item-content').bind('click', function () {

            save_now_location();
            yangaiche(ls.back.set_back_to)('order_info.html?order_id=' + t(this).attr('data-rel'), 'order_list.html?recover=true');
        });
    }

    if (!yangaiche(sys.exist)(yangaiche(app.url_parameter)['recover'])) {
        yangaiche(app.paging.setup)({
            page_size: 3,
            url_request: "/v3/api/orders.json?user_type=caruser&user_id=" + yangaiche(ls.user.touch)()[ls.user.user_id],
            data_handler: data_handler
        });
    } else {
        yangaiche(app.paging.recover)(data_handler);
        var now_scroll_top_value = storage.get(now_scroll_top);
        if (yangaiche(sys.exist)(now_scroll_top_value)) {
            document.body.scrollTop = now_scroll_top_value;
            storage.remove(now_scroll_top);
        }
    }

});