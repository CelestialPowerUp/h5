yangaiche(sys.init)(function (t) {
    function pick_a_tool(e) {
        t('body').append('<div id="sth-on-the-top"></div>');

        var $this = t(this), width = $this.width(), height = $this.css('padding-bottom').match(/(\d+)/)[1], $sth_top = t('#sth-on-the-top');
        $sth_top.width(width);
        $sth_top.height(height);
        $sth_top.css('background', $this.css('background'));

        function stick(e) {
            $sth_top.css('left', (e.pageX - width / 2) + 'px');
            $sth_top.css('top', (e.pageY - height / 2) + 'px');
        }
        stick(e);

        $sth_top.css('display', 'block');

        t('body').mousemove(stick);

        t('body').mouseup(function () {
            t('body').unbind('mousemove').unbind('mouseup');
            $sth_top.remove();
        });
    }

    function tweak(e) {
        alert('尼玛，tweak!!!');
        return false;
    }

    t('#left-add').click(function () {
        var tpl = Handlebars.compile(t('#tool_tpl').text());
        var ul = t('#left ul');
        var html = tpl([{}]);
        console.log(html);
        ul.append(html);
        ul.css('padding-bottom', (40 * parseInt((1 + ul.children().length) / 2) + 4) + '%');

        t('.tool.btn').unbind('mousedown').mousedown(pick_a_tool);

        t('.tweak.btn').unbind('mousedown').mousedown(tweak);
    });

    t('.tool.btn').mousedown(pick_a_tool);

    t('.tweak.btn').mousedown(tweak);
});