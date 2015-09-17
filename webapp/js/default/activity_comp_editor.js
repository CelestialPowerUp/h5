yangaiche(sys.load_default_module)('obj_util');
yangaiche(sys.load_default_module)('http');

app.activity_comp_editor = {
    init: 'activity_comp_editor_init',
    render: 'activity_comp_editor_render',
    refresh: 'activity_comp_editor_refresh',
    template: 'activity_comp_editor_template',
    insert_before: 'activity_comp_editor_insert_before',
    delete_comp: 'activity_comp_editor_delete',
    data: {
        init: 'activity_comp_editor_data_init',
        get: 'activity_comp_editor_data_get'
    },
    get_components: 'activity_comp_editor_get_components',
    set_current_js_suit: 'activity_comp_editor_set_current_js_suit',
    reset: 'activity_comp_editor_reset',

    callback_after_refresh: null,
    comp_tpls: {},
    js_suit_tpls: {},
    current_js_suit: null,
    default_components: {
        editor_component_0: {
            data_tpl: 'placeholder',
            data: {
                data_tpl: 'placeholder',
                background: '#EEE',
                height: 220,
                inner_html: '<div style="width: 100%;height: 220px;line-height: 220px;text-align: center;">+++添加+++</div>'
            }/*,
             post: function () {
             }*/
        }
    },
    count: 1,
    components: null
};

yangaiche(app.activity_comp_editor.reset, function () {
    return function () {
        app.activity_comp_editor.components = yangaiche(app.obj_util.copy)(app.activity_comp_editor.default_components);
        app.activity_comp_editor.components.editor_component_0.post = function () {
        };
        app.activity_comp_editor.count = 1;
    };
});

yangaiche(app.activity_comp_editor.init, function () {
    var t = yangaiche(sys.$),
        comp_tpl_fn = Handlebars.compile(t('#comp_tpl').text()),
        js_suit_tpl_fn = Handlebars.compile(t('#js_suit_tpl').text());
    return function ($comp_list, $js_suit_list, callback, callback_after_refresh) {
        app.activity_comp_editor.callback_after_refresh = callback_after_refresh;
        var comp_tpls = app.activity_comp_editor.comp_tpls,
            js_suit_tpls = app.activity_comp_editor.js_suit_tpls;
        yangaiche(app.http.get_request)('/v1/api/h5template/configs.json', function (data) {
            console.log(data);
            t.each(data['component_tpls'], function (i, comp) {
                comp_tpls[comp['data_tpl']] = comp;
            });
            t.each(data['js_suit_tpls'], function (i, js_suit) {
                js_suit_tpls[js_suit['id']] = js_suit;
                if (i === 0) {
                    app.activity_comp_editor.current_js_suit = js_suit['id'];
                }
            });

            $comp_list.empty().html(comp_tpl_fn(data['component_tpls']));
            $js_suit_list.empty().html(js_suit_tpl_fn(data['js_suit_tpls']));

            callback();
            yangaiche(app.activity_comp_editor.reset)();
            yangaiche(app.activity_comp_editor.refresh)();
        });
    };
});

yangaiche(app.activity_comp_editor.data.init, function () {
    return function (id) {
        var comps = app.activity_comp_editor.components,
            comp_tpls = app.activity_comp_editor.comp_tpls;
        var ret = yangaiche(app.obj_util.copy)(comp_tpls[comps[id].data_tpl]);
        ret.id = id;
        return ret;
    };
});

yangaiche(app.activity_comp_editor.data.get, function () {
    return function (id) {
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
    var tpl = Handlebars.compile('<div id="{{id}}" data-tpl="{{data_tpl}}" class="component" style="overflow: hidden;height: {{height}}px;background: {{background}};">{{{inner_html}}}</div>');
    return function (id) {
        return tpl(yangaiche(app.activity_comp_editor.data.get)(id));
    };
});

yangaiche(app.activity_comp_editor.render, function () {
    return function (comps, count_in) {
        console.log(comps);
        var count = count_in || comps.length, html = '', id, i;
        for (i = 0; i < count; i++) {
            id = 'editor_component_' + i;
            html += yangaiche(app.activity_comp_editor.template)(id);
        }
        return html;
    };
});

yangaiche(app.activity_comp_editor.refresh, function () {
    var t = yangaiche(sys.$);
    return function () {
        var comps = app.activity_comp_editor.components,
            count = app.activity_comp_editor.count,
            html = yangaiche(app.activity_comp_editor.render)(comps, count),
            callback_after_refresh = app.activity_comp_editor.callback_after_refresh,
            id, i;
        t('#editor').empty().html(html);
        for (i = 0; i < count; i++) {
            id = 'editor_component_' + i;
            comps[id].post(id, comps[id].data_tpl, comps[id].data);
        }
        if (yangaiche(sys.exist)(callback_after_refresh)) {
            callback_after_refresh();
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

yangaiche(app.activity_comp_editor.delete_comp, function () {
    return function (id) {
        var i = parseInt(id.match(/editor_component_(\d+)/)[1]),
            comps = app.activity_comp_editor.components,
            count = app.activity_comp_editor.count - 1;

        for (; i < count; i++) {
            comps['editor_component_' + i] = comps['editor_component_' + (i + 1)];
        }

        app.activity_comp_editor.count = count;
        yangaiche(app.activity_comp_editor.refresh)();
    }
});

yangaiche(app.activity_comp_editor.get_components, function () {
    return function () {
        var comps = app.activity_comp_editor.components,
            count = app.activity_comp_editor.count,
            ret_comps = [];
        for (var i = 0; i < count; i++) {
            var comp_data = comps['editor_component_' + i].data;
            if (comp_data['data_tpl'] !== 'placeholder') {
                ret_comps[i] = comp_data;
            }
        }
        return ret_comps;
    };
});

yangaiche(app.activity_comp_editor.set_current_js_suit, function () {
    return function (id) {
        var js_suit = app.activity_comp_editor.js_suit_tpls[id];
        if (!yangaiche(sys.exist)(js_suit)) {
            alert('所选js套件不存在! ');
            return;
        }

        // init js suits
        key.external_sale_configs = JSON.parse(data.js_suit.external_sale_configs);
        console.log(key.external_sale_configs);
        t.each(data.js_suit.js_suit, function (i, js_name) {
            yangaiche(sys.load_module)(js_name);
        });

        app.activity_comp_editor.current_js_suit = js_suit;
    };
});
