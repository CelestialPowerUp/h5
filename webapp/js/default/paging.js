yangaiche(sys.load_default_module)('http');
yangaiche(sys.load_default_module)('show_msg');

app.paging = {
    setup: 'paging_setup'
};

yangaiche(app.paging.setup, function() {
    var data_handler = null, url_request = null, active = true, page = 1, total_size = 0, real_total_size = 0, page_size = 2,
        getReq = yangaiche(app.http.get_request), show_msg = yangaiche(app.show_msg.show), t = yangaiche(sys.$);

    function load_suc(data, callback) {
        if (data['items'].length > 0) {
            data_handler(data);

            page = parseInt(data['cur_page']) + 1;
            total_size = parseInt(data['total_size']);
            real_total_size += data['items'].length;

            if (callback !== undefined && callback !== null) {
                callback();
            }
        }
    }

    function load_more() {
        var progress = $.AMUI.progress;
        progress.start();
        active = false;
        getReq(url_request + '&total_size=' + total_size + '&page=' + page + '&page_size=' + page_size, function (comment_data) {
            load_suc(comment_data);
            progress.done();
            active = true;
        }, function (error) {
            show_msg(error['message']);
        });
    }

    return function(config) {
        data_handler = config.data_handler;
        url_request = config.url_request;

        getReq(url_request + '&page=' + page + '&page_size=' + page_size, function (data) {
            load_suc(data, function () {
                t("body").hammer().on('panend', function () {
                    if (active) {
                        var $this = t(this),
                            viewH = t(window).height(),//可见高度
                            contentH = $this.get(0).scrollHeight,//内容高度
                            scrollTop = $this.scrollTop();//滚动高度
                        if (scrollTop / (contentH - viewH) >= 0.95) { //快到达底部时,加载新内容
                            // 这里加载数据..
                            if (real_total_size === total_size) {
                                show_msg('没有更多了! ');
                            } else {
                                setTimeout(load_more, 1);
                            }
                        }
                    }
                });
            });
        }, function (error) {
            show_msg(error['message']);
        });
    };
});
