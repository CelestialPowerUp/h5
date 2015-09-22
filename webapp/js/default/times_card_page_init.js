yangaiche(sys.load_default_module)('bigpipe/pipe_able');

yangaiche(sys.init)(function (t) {
    yangaiche(app.bigpipe.stage)({
        template_url: 'template/times_card_detail.html',
        dom_hook: yangaiche(sys.$)('#times_card_detail'),
        hook: {
            pre: function () {
                return yangaiche(sys.local_storage).get(key.times_card.current);
            }
        }
    });

    yangaiche(app.bigpipe.stage)({
        template_url: 'template/times_card_usage.html',
        dom_hook: yangaiche(sys.$)('#times_card_usage')
    });

    yangaiche(app.bigpipe.commit)();
});