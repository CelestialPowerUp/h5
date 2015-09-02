yangaiche(sys.load_default_module)('repository', {});

app.show_msg = {
    init: 'init_show_msg',
    show: 'show_msg',

    html: '<div class="am-modal am-modal-no-btn" tabindex="-1" id="yac-modal">' +
    '<div class="am-modal-dialog">' +
    '<div class="am-modal-hd">' +
    '</div>' +
    '<div class="am-modal-bd">' +
    '{{msg_to_show}}' +
    '</div>' +
    '</div>' +
    '</div>',

    wrapper: '<div id="msg_wrapper"></div>'
};

yangaiche(app.show_msg.init, function() {
    var t = yangaiche(sys.$);
    return function() {
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
    return function (msg) {
        if (!active) {
            return false;
        }

        var text = tpl({msg_to_show: msg});
        console.log(text);
        t('#msg_wrapper').empty().html(text);

        var $modal = t('#yac-modal');
        $modal.modal();
        active = false;

        setTimeout(function() {
            $modal.modal('close');
            active = true;
        }, 2000);

        //alert(msg);
    };
});
