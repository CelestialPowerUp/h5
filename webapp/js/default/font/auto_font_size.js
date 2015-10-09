yangaiche(sys.load_default_module)('http');

yangaiche(sys.init)(function (t) {
    var class_name = 'auto-font-size-yac', min_font_size = 12, font_size_step = 2,
        size_limit_attr_name = 'font-size-limit';

    yangaiche(app.http.tweak)(function (type) {
        if (type === app.http.after_render) {

            function set_width(max_limit, font_size, text_size) {

                //alert('max_limit : ' + max_limit + ' font_size : ' + font_size + ' text_size : ' + text_size);

                if (font_size * text_size < max_limit) {
                    return set_width(max_limit, font_size + font_size_step, text_size);
                } else {
                    return font_size - 2;
                }

            }

            var need_auto_size = t('.' + class_name);
            t.each(need_auto_size, function (i, comp) {
                var $comp = t(comp);
                //最大高度
                var max_limit = $comp.attr(size_limit_attr_name);

                $comp.css('font-size', set_width(max_limit, min_font_size + font_size_step, $comp.text().replace(/^s*/, '').replace(/s*$/, '').length) + 'px');
            });
        }
    });
}, 0);