app.obj_util = {
    copy: 'obj_util_copy',
    is_missing_key: 'obj_util_is_missing_key'
};

yangaiche(app.obj_util.copy, function () {
    return function (source) {
        return JSON.parse(JSON.stringify(source));
    };
});

yangaiche(app.obj_util.is_missing_key, function () {
    return function (obj, callback) {
        for (var key in Object.keys(obj)) {
            if (!yangaiche(sys.exist)(obj[key]) || '' === obj[key]) {
                callback(key);
                break;
            }
        }
    }
});
