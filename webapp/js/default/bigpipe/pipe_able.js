yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');

app.bigpipe = {
    stage: 'yac_bigpipe_stage',
    commit: 'yac_bigpipe_commit',

    // class data
    uncommitted_tpls: [],

    // usage ...
    data_tpl: {
        data_url: '/v1/api/now.json',
        data_param: null,
        url_method: yangaiche(app.http.get_request),
        template_url: 'template/now.html',
        dom_hook: yangaiche(sys.$)('body'),
        hook: {
            pre: function (data) {
                return data;
            },
            post: function () {
            }
        }
    }
};

yangaiche(app.bigpipe.stage, function () {
    return function (data_tpl, auto_commit) {
        var this_data_tpl = data_tpl || app.bigpipe.data_tpl;
        app.bigpipe.uncommitted_tpls.push(this_data_tpl);

        if ('boolean' === typeof(auto_commit) && auto_commit) {
            
        }
    };
});

yangaiche(app.bigpipe.commit, function () {
    function async_render(tpl) {
        setTimeout(function() {
            console.log(tpl);

            function suc_handler(data) {
                var compiled_tpl = Handlebars.compile(yangaiche(app.tpl.load)(tpl.template_url));
                var handled_data = tpl.hook.pre(data);
                tpl.dom_hook.empty().html(compiled_tpl(handled_data));
                tpl.hook.post();
            }

            function error_handler(error) {
                if (yangaiche(sys.exist)(error['message']) && '' !== error['message']) {
                    yangaiche(app.show_msg.show)(error['message']);
                } else {
                    yangaiche(app.show_msg.show)(JSON.stringify(error));
                }
            }

            if (!yangaiche(sys.exist)(tpl.data_param)) { // get : a GET never need params.
                tpl.url_method(tpl.data_url, suc_handler, error_handler);
            } else { // post
                tpl.url_method(tpl.data_url, tpl.data_param, suc_handler, error_handler);
            }
        }, 0);
    }

    return function () {
        var tpls = app.bigpipe.uncommitted_tpls;
        for (var i = 0; i < tpls.length; i++) {
            var this_tpl = tpls[i];
            async_render(this_tpl);
        }
        app.bigpipe.uncommitted_tpls = [];
    };
});
