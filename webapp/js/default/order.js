;(function () {

    'use strict';

	yangaiche(sys.load_default_module)('repository', {});

    ls.order = {
        touch: 'order_touch',
        set: 'order_set',
        update: 'order_update',
        form_obj: 'order_form_obj',
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
        return function (callback) {
            var order = yangaiche(ls.order.touch)();
            callback(order);
            yangaiche(ls.order.set)(order);
        };
    });

    yangaiche(ls.order.form_obj, function () {
        return function (obj) {
            yangaiche(ls.order.update)(function (order) {
                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                    if (typeof(obj[keys[i]]) === 'function') {
                        continue;
                    }
                    if (keys[i] === 'address' && yangaiche(sys.exist)(obj[keys[i]]) && obj[keys[i]] !== '') {
                        order.location = order.location || {address: obj.address};
                        continue;
                    }
                    if (keys[i] === 'pay_mode' && yangaiche(sys.exist)(obj[keys[i]]) && obj[keys[i]] !== '') {
                        order.pay_mode = parseInt(obj.pay_mode) || order.pay_mode;
                        continue;
                    }
                    order[keys[i]] = obj[keys[i]] || order[keys[i]];
                }
            });
        };
    });

    yangaiche(ls.order.clear, function () {
        return function () {
            yangaiche(sys.local_storage).remove(ls.order.order_info);
        };
    });

}());