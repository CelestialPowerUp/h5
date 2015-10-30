yangaiche(sys.init)(function (t) {
    t('#dimmer').click(function () {
        t('#dimmer').hide();
        t('#legend').hide();
        t('#picker').hide();
    });

    t('#pick_time').click(function () {
        t('#dimmer').show();
        t('#legend').show();
        t('#picker').show();

        var swiper = swiper || new Swiper('.swiper-container', {
                direction: 'horizontal',
                scrollbar: '.swiper-scrollbar',
                slidesPerView: 'auto',
                scrollbarHide: true,
                centeredSlides: false,
                grabCursor: true,
                freeMode: true
            });
    });

    var pay_btn_group = [t('#alipay_btn'), t('#wechat_btn')];
    t.each(pay_btn_group, function (i, btn) {
        function other_btn() {
            var ret = [];
            var len = pay_btn_group.length;
            for (var j = 0; j < len; j++) {
                if (i !== j) {
                    ret.push(pay_btn_group[j]);
                }
            }
            return ret;
        }

        var weixuan = 'url("../pubimg/new/weixuan.png") 50% 50% no-repeat';
        var gouxuan = 'url("../pubimg/new/gouxuan.png") 50% 50% no-repeat';

        btn.click(function () {
            t.each(other_btn(), function (k, other) {
                other.find('.choose').css('background', weixuan);
            });
            btn.find('.choose').css('background', gouxuan);
        });
    });
});