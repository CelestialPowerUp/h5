yangaiche(sys.load_default_module)('bigpipe/pipe_able');

yangaiche(sys.init)(function (t) {
    yangaiche(app.bigpipe.stage)({
        data_url: '/v1/api/now.json',
        data_param: null,
        url_method: yangaiche(app.http.get_request),
        template_url: 'template/now.html',
        dom_hook: yangaiche(sys.$)('#times_card_detail'),
        hook: {
            pre: function (data) {
                return data;
            },
            post: function () {
            }
        }
    });

    yangaiche(app.bigpipe.stage)({
        template_url: 'template/times_card_usage.html',
        dom_hook: yangaiche(sys.$)('#times_card_usage')
    });

    yangaiche(app.bigpipe.commit)();
});