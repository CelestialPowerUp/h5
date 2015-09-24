yangaiche(sys.init)(function (t) {
    t('.yac-coupon-got-btn').touchstart(function () {
        t(this).addClass('yac-coupon-got-btn-hover');
    }).touchend(function () {
        t(this).removeClass('yac-coupon-got-btn-hover');
    }).click(function () {

    });
});