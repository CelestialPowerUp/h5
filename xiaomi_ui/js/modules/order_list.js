/**
 * Created by caols on 7/27/15.
 */
var save_now_location = function() {
    getStore().set('now_scroll_top', document.body.scrollTop);
};

var order_flow = function (order_id) {
    save_now_location();
    window.location.href = './order_flow.html?order_id='+order_id;
};

var item_click_handler = function (order_id) {
    save_now_location();
    window.location.href = "./order_info.html?order_id=" + order_id;
};

var init_data = function () {
    getStore().set('now_in', 'order_list');

    var user = getUser();

    getReq("orders.json?user_id=" + user.user_id, function (data) {
        var items = [];
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.id = data[i].id;
            item.car_number = data[i].car.licence.province + data[i].car.licence.number;
            item.paid_info = data[i].paid === true ? "已支付" : "未支付";
            item.total_price = data[i].total_price;
            item.place_time = format_time(data[i].place_time);
            item.status = data[i].status;
            items.push(item);
        }
        console.log(items);
        var product_template = Handlebars.compile($("#order_list_item_tpl").html());
        $("#order_list_view").html(product_template(items));

        if (getStore().get('now_scroll_top')) {
            document.body.scrollTop = getStore().get('now_scroll_top');
            getStore().remove('now_scroll_top');
        }

        //bind_openid();
    });
};