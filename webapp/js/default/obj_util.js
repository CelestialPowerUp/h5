app.obj_util = {
    copy: 'obj_util_copy'
};

yangaiche(app.obj_util.copy, function() {
    return function(source) {
        return JSON.parse(JSON.stringify(source));
    };
});
