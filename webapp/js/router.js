/**
 * Created by Administrator on 2015/5/25.
 */

function bulter_pick() {
    getStore().set('now_in', 'butler_pick');
    window.location.href = "car_list.html";
}

function car_beauty() {
    getStore().set('now_in', 'car_beauty');
    window.location.href = "car_list.html";
}

function renewal() {
    getStore().set('now_in', 'renewal');
    window.location.href = "car_list.html";
}

function home_testing() {
    getStore().set('now_in', 'home_testing');
    window.location.href = "car_list.html";
}

function set_loss() {
    getStore().set('now_in', 'set_loss');
    window.location.href = "car_list.html";
}

function vehicle_exam() {
    getStore().set('now_in', 'vehicle_exam');
    window.location.href = "car_list.html";
}

function route() {
    var now_in = getStore().get('now_in');
    if ('butler_pick' === now_in) {
        window.location.href = './butler_pick_service_choose_product.html';
    } else if ('car_beauty' === now_in) {
        window.location.href = './car_beauty_service_product_info.html';
    } else if ('renewal' === now_in) {
        window.location.href = './renewal_service_product_info.html';
    } else if ('home_testing' === now_in) {
        window.location.href = './home_testing_service_product_info.html';
    } else if ('set_loss' === now_in) {
        window.location.href = './set_loss_service_product_info.html';
    } else if ('vehicle_exam' === now_in) {
        window.location.href = './vehicle_exam_service_product_info.html';
    } else if ('home_store' === now_in || 'home_wp' === now_in || 'home' === now_in) {
        window.location.href = './base_info.html';
    }
}

function route2() {
    var store = getStore();
    var now_in = store.get('now_in');
    if ('butler_pick' === now_in) {
        store.set('submit_text', '确定');
    } else {
        store.set('submit_text', '立即预约');
    }
    window.location.href = './base_info.html';
}

function get_service_type_from_router() {
    var store = getStore();
    var now_in = store.get('now_in');
    if ('butler_pick' === now_in) {
        return 1;
    } else if ('car_beauty' === now_in) {
        return 2;
    } else if ('renewal' === now_in) {
        return 3;
    } else if ('home_testing' === now_in) {
        return 4;
    } else if ('set_loss' === now_in) {
        return 5;
    } else if ('vehicle_exam' === now_in) {
        return 13;
    }
}

function get_service_type_from_router2() {
    var store = getStore();
    var now_in = store.get('now_in');
    if ('butler_pick' === now_in) {
        return '保养维修';
    } else if ('car_beauty' === now_in) {
        return '汽车美容';
    } else if ('renewal' === now_in) {
        return '保险续保';
    } else if ('home_testing' === now_in) {
        return '管家检测';
    } else if ('set_loss' === now_in) {
        return '管家定损';
    } else if ('vehicle_exam' === now_in) {
        return '管家验车';
    } else if ('home_store' === now_in) {
        return '商城商品';
    }
}

function after_login() {
    var store = getStore();
    if (store.get('now_in') === 'order_list') {
        window.location.href = './order_list.html';
    } else if (store.get('now_in') === 'exam_report') {
        window.location.href = './my_exam_reports.html';
    } else if (store.get('now_in') === 'home_wp') {
        window.location.href = './home_with_products.html?back=true';
    } else if (store.get('now_in') === 'home') {
        window.location.href = './home.html?back=true';
    } else if (store.get('now_in') === 'my_cars') {
        window.location.href = './my_cars.html';
    } else if (store.get('now_in') === 'address_list') {
        window.location.href = './my_address_manage.html';
    } else if (store.get('now_in') === 'exam_report') {
        window.location.href = './my_exam_reports.html';
    } else if (store.get('now_in') === 'coupon_list') {
        window.location.href = './my_coupons.html';
    } else if (store.get('now_in') === 'home_store') {
        window.location.href = './home_store.html?back=true';
    } else {
        window.location.href = './car_list.html';
    }
}

function route2address() {
    var store = getStore();
    if (store.get('now_in') === 'home_wp' || store.get('now_in') === 'home') {
        store.set('now_in', 'address_list');
    }
}

function route2coupon() {
    var store = getStore();
    if (store.get('now_in') === 'home_wp' || store.get('now_in') === 'home') {
        store.set('now_in', 'coupon_list');
    }
}