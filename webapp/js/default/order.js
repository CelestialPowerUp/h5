yangaiche(sys.load_default_module)('repository', {});

ls.order = {
    touch: 'order_touch',
    set: 'order_set',
    update: 'order_update',
    clear: 'order_clear',

    order_info: 'order_info'
};

yangaiche(ls.order.touch, function () {
    return function () {
        var storage = yangaiche(sys.local_storage);
        var order = storage.get(ls.order.order_info);
        if (!yangaiche(sys.exist)(order)) {
            storage.set(ls.order.order_info, {});
            return {};
        }
        return order;
    };
});

yangaiche(ls.order.set, function () {
    return function (order) {
        yangaiche(sys.local_storage).set(ls.order.order_info, order);
    };
});

yangaiche(ls.order.update, function () {
    return function(callback) {
        var order = yangaiche(ls.order.touch)();
        callback(order);
        yangaiche(ls.order.set)(order);
    }
});

yangaiche(ls.order.clear, function () {
    return function () {
        yangaiche(sys.local_storage).remove(ls.order.order_info);
    };
});
