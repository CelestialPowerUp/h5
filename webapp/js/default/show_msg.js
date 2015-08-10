yangaiche(sys.load_default_module)('repository', {});

app.show_msg = {
    show: 'show_msg',
    html: '{{#this}}<div id="{{msg}}" style="width: 100%; height: 50px; font-size: 22px; line-height: 25px; margin-left: 20px;">{{msg}}</div>{{/this}}'
};

yangaiche(app.show_msg.show, function () {
    var tpl = Handlebars.compile(app.show_msg.html);
    return function (msg) {
        // TODO : id可以为中文么，待验证。
        yangaiche(sys.$)('body').prepend(tpl({msg: msg}));
        setTimeout(function () {
            $('#' + msg).remove();
        }, 3000);
    };
});
