/**
 * Created by caols on 7/27/15.
 */
!function (t) {
    if (t) {
        t(function () {
            t('#to_show_user_win').css('top', (t(window).height() - 100 - 20) + 'px');
            getStore().set('now_in', 'home_wp');

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
                window.history.replaceState(null, null, "./home_with_products.html");
            }).on('open.offcanvas.amui', function () {
                window.history.replaceState(null, null, "./home_with_products.html?back=true");
            });

            t('#to_show_user_win').click(function () {
                reset_phone();
            });

        });
    }
}(window.jQuery);