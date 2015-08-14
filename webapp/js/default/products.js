yangaiche(sys.load_default_module)('repository', {});

ls.products = {
    calculate: 'products_calculate',
    touch: 'products_touch',
    set: 'products_set',
    update: 'products_update',

    products_info: 'products'
};

yangaiche(ls.products.calculate, function() {
    function product_price(p) {
        return p['labour_price'] + (p['price'] * p['unit_count']);
    }
    return function(products) {

    };
});

yangaiche(ls.products.touch, function() {
    return function () {
        var order = yangaiche(ls.order.touch);
        var products = order[ls.products.products_info];
        if (!yangaiche(sys.exist)(products)) {
            // TODO : 似乎不需要加一个空数组在订单对象里
            return [];
        }
        return products;
    };
});

yangaiche(ls.products.set, function() {
    return function (products) {
        yangaiche(ls.order.update)(function(order) {
            order[ls.products.products_info] = products;
        });
    };
});

yangaiche(ls.products.update, function() {
    return function(callback) {
        var products = yangaiche(ls.products.touch)();
        callback(products);
        yangaiche(ls.products.set)(products);
    };
});
