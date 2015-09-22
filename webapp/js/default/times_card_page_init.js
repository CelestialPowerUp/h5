yangaiche(sys.load_default_module)('bigpipe/pipe_able');

yangaiche(sys.init)(function (t) {
    yangaiche(app.bigpipe.stage)({
        template_url: 'template/times_card_detail.html',
        dom_hook: yangaiche(sys.$)('#times_card_detail'),
        data: yangaiche(sys.local_storage).get(key.times_card.current),
        hook: {
            pre: function (data) {
                data.supplier_name = yangaiche(sys.local_storage).get(key.supplier.current).supplier_name;
                return data;
            }
        }
    });

    yangaiche(app.bigpipe.stage)({
        template_url: 'template/times_card_usage.html',
        dom_hook: yangaiche(sys.$)('#times_card_usage')
    });

    yangaiche(app.bigpipe.commit)();
});