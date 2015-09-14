//yangaiche(sys.load_default_module)('super_dimmer');
yangaiche(sys.load_default_module)('qiniu_helper');
yangaiche(sys.load_default_module)('activity_comp_editor');

yangaiche(sys.init)(function (t) {
    function pick_a_tool(e) {
        t('body').append('<div id="sth-on-the-top"></div>');

        var $this = t(this), width = $this.width(), height = $this.css('padding-bottom').match(/(\d+)/)[1], $sth_top = t('#sth-on-the-top');
        $sth_top.width(width);
        $sth_top.height(height);
        $sth_top.css('background', $this.css('background'));

        console.log($sth_top);

        $sth_top.attr('data-tpl', $this.attr('data-tpl'));

        function stick(e) {
            $sth_top.css('left', (e.pageX - width / 2) + 'px');
            $sth_top.css('top', (e.pageY - height / 2) + 'px');
        }

        stick(e);

        $sth_top.css('display', 'block');

        t('body').mousemove(stick);

        t('body').mouseup(function (e) {
            var done = false;

            function place($comp) {
                if (!done) {
                    var id = parseInt($comp.attr('id').match(/editor_component_(\d+)/)[1]);
                    var data_tpl = $sth_top.attr('data-tpl');

                    yangaiche(app.activity_comp_editor.insert_before)(id, data_tpl, function(id, data_tpl, data) {
                        if ('image' === data_tpl) {
                            var $source = data;
                            yangaiche(app.qiniu_helper.bind)(id, function (source, data) {
                                $source.background = 'url("' + data.data['raw_url'] + '") no-repeat center';
                                var image = new Image();
                                image.src = data.data['raw_url'];
                                image.onload = function () {
                                    $source.height = (image.height);
                                    $source.inner_html = '';
                                    yangaiche(app.activity_comp_editor.refresh)();
                                }
                            });
                        }
                    });

                    done = true;
                }
            }

            t.each(t('#editor').find('.component'), function (i, comp) {
                var $comp = t(comp);
                //console.log($comp);
                if (!done && ($comp.offset().top + $comp.height()) > e.pageY) {
                    place($comp);
                }
            });

            t('body').unbind('mousemove').unbind('mouseup');
            $sth_top.remove();
        });
    }

    function tweak() {
        alert('unimplemented!!!');
        return false;
    }

    yangaiche(app.activity_comp_editor.init)(t('#comp-list'), t('#js-suit-list'), function() {
        t('.comp.btn').mousedown(pick_a_tool);
        t('.tweak.btn').mousedown(tweak);

        t('.js-suit.btn').click(function () {
            var confirmed = confirm('确定切换魔板么？一切都要重新开始...');
            if (!confirmed) {
                return;
            }

            t('#js-suit-list').find('.btn').css('opacity', '0.6');
            t(this).css('opacity', '1');
        });

        yangaiche(app.activity_comp_editor.refresh)();
    });

    t('#editor').mouseenter(function () {
        t(this).find('.component').addClass('deactivated');
    }).mouseleave(function () {
        t(this).find('.component').removeClass('deactivated');
    });
});