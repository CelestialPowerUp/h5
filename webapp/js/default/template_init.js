yangaiche(sys.load_default_module)('super_dimmer');
yangaiche(sys.load_default_module)('qiniu_helper');

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

        t('body').mouseup(function (e) {
            t('body').unbind('mousemove').unbind('mouseup');
            $sth_top.remove();

            var last = null, done = false;
            t.each(t('#editor').find('.component'), function(i, comp) {
                if (null !== last && comp.offsetTop > e.pageY) {

                } else {
                    last = comp;
                }
            });
        });
    }

    function tweak() {
        alert('尼玛，tweak!!!');
        return false;
    }

    t('#comp-list-add').click(function () {
        var tpl = Handlebars.compile(t('#tool_tpl').text());
        var ul = t('#left #comp-list');
        var html = tpl([{}]);
        console.log(html);
        ul.append(html);
        ul.css('padding-bottom', (40 * parseInt((1 + ul.children().length) / 2) + 4) + '%');

        t('.comp.btn').unbind('mousedown').mousedown(pick_a_tool);

        t('.tweak.btn').unbind('mousedown').mousedown(tweak);
    });

    t('.comp.btn').mousedown(pick_a_tool);

    t('.tweak.btn').mousedown(tweak);

    t('.tpl.btn').click(function () {
        var confirmed = confirm('确定切换魔板么？一切都要重新开始...');
        if (!confirmed) {
            return;
        }

        t('#tpl-list').find('.btn').css('opacity', '0.6');
        t(this).css('opacity', '1');
    });

    //for (var i = 1; i < 3; i++) {
    //    yangaiche(app.qiniu_helper.bind)('test' + i, function (source, data) {
    //        var $source = t('#' + source);
    //        $source.css('background', 'url("' + data.data['raw_url'] + '") no-repeat center');
    //        var image = new Image();
    //        image.src = data.data['raw_url'];
    //        image.onload = function () {
    //            $source.css('height', (image.height) + 'px');
    //        }
    //    });
    //}

    t('#editor').mouseenter(function () {
        t(this).find('.component').addClass('deactivated');
    }).mouseleave(function() {
        t(this).find('.component').removeClass('deactivated');
    });

    //yangaiche(app.super_dimmer.setup)('#right #workspace', ['button', 'a']);
});