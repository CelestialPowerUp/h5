yangaiche(sys.init)(function(t) {
    t('#left-add').click(function() {
        var tpl = Handlebars.compile(t('#tool_tpl').text());
        var ul = t('#left ul');
        var html = tpl([{}]);
        console.log(html);
        ul.append(html);
        ul.css('padding-bottom', (40 * parseInt((1 + ul.children().length) / 2) + 4) + '%');
    });
});