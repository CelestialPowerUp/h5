;(function () {

    'use strict';

	yangaiche(sys.load_default_module)('repository');

    app.show_msg = {
        init: 'init_show_msg',
        show: 'show_msg',
        show_agreement: 'show_agreement',

        html: '<div class="cover" style="display: none;"></div>' +
        '<div tabindex="-1" id="yac-modal" style="display: none;">' +
        '<div class="modal-body">' +
        '{{msg_to_show}}' +
        '</div>' +
        '</div>',

        agreement_html: '<div class="cover" style="display: none;"></div>' +
        '<div tabindex="-1" id="yac-modal" style="display: none;">' +
        '<div class="modal-body white fixed">' +
        '<div class="modal-title">养爱车声明协议</div>' +
        '<div class="modal-text">{{car_number}}</div>' +
        '<div class="modal-btns two">' +
        '<div class="modal-btn cancel">取消</div>' +
        '<div class="modal-btn confirm">同意</div>' +
        '</div>' +
        '</div>' +
        '</div>',

        wrapper: '<div id="msg_wrapper"></div>'
    };

    yangaiche(app.show_msg.init, function () {
        var t = yangaiche(sys.$);
        return function () {
            if (t('#msg_wrapper').length > 0) {
                return true;
            }

            t('body').append(app.show_msg.wrapper);
        };
    });

    yangaiche(app.show_msg.show, function () {
        var tpl = Handlebars.compile(app.show_msg.html),
            t = yangaiche(sys.$),
            active = true;
        return function (msg, on_close) {
            if (!active) {
                return false;
            }

            var text = tpl({msg_to_show: msg});
            console.log(text);
            t('#msg_wrapper').empty().html(text);

            t('#msg_wrapper .cover').show();
            t('#yac-modal').show();

            active = false;

            function close_modal() {
                t('#yac-modal').hide();
                t('#msg_wrapper .cover').hide();
                active = true;
                if ('function' === typeof(on_close)) {
                    on_close();
                }
            }

            var timeout = setTimeout(close_modal, 2000);

            t('#yac-modal').click(function () {
                clearTimeout(timeout);
                close_modal();
            });

            //alert(msg);
        };
    });

    yangaiche(app.show_msg.show_agreement, function () {
        var tpl = Handlebars.compile(app.show_msg.agreement_html),
            t = yangaiche(sys.$),
            active = true;
        return function (msg, confirm_cb) {
            if (!active) {
                return false;
            }

            var text = tpl({car_number: msg});
            console.log(text);
            t('#msg_wrapper').empty().html(text);

            t('#msg_wrapper .cover').show();
            t('#yac-modal').show();

            active = false;

            function gen_click_fn(is_confirm) {
                return function () {
                    t('#yac-modal').hide();
                    t('#msg_wrapper .cover').hide();
                    active = true;
                    if (is_confirm && 'function' === typeof(confirm_cb)) {
                        confirm_cb();
                    }
                };
            }

            t('#yac-modal .confirm').click(gen_click_fn(true));
            t('#yac-modal .cancel').click(gen_click_fn(false));
        };
    });

}());