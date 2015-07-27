/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    t(function () {

        var content = t(window).height();
        t("#service").css("height", content + "px");
        t(".box").css("height", content / 3 + "px");
        var box_text_h = t('.box-text').height();
        t('.box-div').css('margin-top', (content / 3 - box_text_h - 47) / 2 + 'px');

        t('#to_show_user_win').css('top', (t(window).height() - 50 - 10) + 'px');

        getStore().set('now_in', 'home');

        function reset_phone() {
            var user_phone = getUser()['phone'];
            if (11 === user_phone.length) {
                t('#user_phone').html(user_phone.substr(0, 3) + '****' + user_phone.substr(7, 4));
            }
        }

        if (getReqParam()['back']) {
            t('#user-win').offCanvas('open');
            reset_phone();
        }

        t('#user-win').on('close.offcanvas.amui', function () {
            window.history.replaceState(null, null, "./home.html");
        }).on('open.offcanvas.amui', function () {
            window.history.replaceState(null, null, "./home.html?back=true");
        });

        t('#to_show_user_win').click(function () {
            reset_phone();
        });
    })
}(window.jQuery);