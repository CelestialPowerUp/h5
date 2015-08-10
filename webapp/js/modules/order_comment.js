!function (t) {
    t(function () {
        t('.star-group img').bind('click', function() {
            var children = t(t(this).parents()[0]).children('img');
            children.attr('src', 'http://baseimg.yangaiche.com/comment_gray_star.png');
            var rate = parseInt(t(this).attr('data-rel'));
            for (var i = 0; i < rate; i++) {
                children.eq(i).attr('src', 'http://baseimg.yangaiche.com/comment_star.png');
            }
        });

        t('#submit_button').click(function() {
            var keeper_rate = t('#keeper img[src="http://baseimg.yangaiche.com/comment_star.png"]').length;
            var service_rate = t('#service img[src="http://baseimg.yangaiche.com/comment_star.png"]').length;

            postReq('/feedback', {
                client_feedback: {
                    comment: t('#comment-text').val(),
                    keeper_stars: keeper_rate,
                    order_stars: service_rate
                },
                order_id: getReqParam()['order_id']
            }, function(data) {
                if (data['if_feedback_committed']) {
                    go_back_to_reload();
                } else {
                    show_msg('提交评价失败!');
                }
            }, function(error) {
                show_msg(error['message']);
            });
        });
    });
}(window.jQuery);