yangaiche(sys.load_default_module)('obj_util');
yangaiche(sys.load_default_module)('http');

app.activity_comp_editor = {
    refresh: 'activity_comp_editor_refresh',
    template: 'activity_comp_editor_template',
    insert_before: 'activity_comp_editor_insert_before',
    data: {
        init: 'activity_comp_editor_data_init',
        get: 'activity_comp_editor_data_get'
    },

    count: 1,
    components: {
        editor_component_0: {
            data_tpl: 'placeholder',
            data: {
                data_tpl: 'placeholder',
                background: '#EEE',
                height: 220,
                inner: '<div style="width: 100%;height: 220px;line-height: 220px;text-align: center;">+++添加+++</div>'
            },
            post: function() {}
        }
    }
};

yangaiche(app.activity_comp_editor.data.init, function () {
    var data_tpls = {
        image: {
            data_tpl: 'image',
            background: 'url("./img/view.jpeg") no-repeat center',
            height: 220
        }
    };
    return function (id) {
        var comps = app.activity_comp_editor.components;
        var ret = yangaiche(app.obj_util.copy)(data_tpls[comps[id].data_tpl]);
        ret.id = id;
        return ret;
    };
});

yangaiche(app.activity_comp_editor.data.get, function () {
    return function(id) {
        var comps = app.activity_comp_editor.components;
        if (yangaiche(sys.exist)(comps[id].data)) {
            comps[id].data.id = id;
            return comps[id].data;
        } else {
            return yangaiche(app.activity_comp_editor.data.init)(id);
        }
    };
});

yangaiche(app.activity_comp_editor.template, function () {
    var tpl = Handlebars.compile('<div id="{{id}}" data-tpl="{{data_tpl}}" class="component" style="height: {{height}}px;background: {{background}};">{{{inner}}}</div>');
    return function (id) {
        return tpl(yangaiche(app.activity_comp_editor.data.get)(id));
    };
});

yangaiche(app.activity_comp_editor.refresh, function () {
    var t = yangaiche(sys.$);
    return function () {
        console.log(app.activity_comp_editor.components);
        var comps = app.activity_comp_editor.components,
            count = app.activity_comp_editor.count;
        var html = '', id, i;
        for (i = 0; i < count; i++) {
            id = 'editor_component_' + i;
            html += yangaiche(app.activity_comp_editor.template)(id);
        }
        t('#editor').empty().html(html);
        for (i = 0; i < count; i++) {
            id = 'editor_component_' + i;
            comps[id].post(id, comps[id].data_tpl, comps[id].data);
        }
    };
});

yangaiche(app.activity_comp_editor.insert_before, function () {
    return function (id, data_tpl, post) {
        var i, comps = app.activity_comp_editor.components;

        for (i = app.activity_comp_editor.count; i > parseInt(id); i--) {
            comps['editor_component_' + i] = comps['editor_component_' + (i - 1)];
        }
        id = 'editor_component_' + i;
        comps[id] = {
            data_tpl: data_tpl,
            post: post
        };
        comps[id].data = yangaiche(app.activity_comp_editor.data.init)(id);

        app.activity_comp_editor.count += 1;
        yangaiche(app.activity_comp_editor.refresh)();
    };
});
