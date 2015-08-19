app.map = {
    init: 'map_init',
    auto_location: 'map_auto_location'
};

yangaiche(app.map.init, function () {

});

yangaiche(app.map.auto_location, function () {
    return function () {
        !function () {
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (e) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    // 定位成功事件
                    var address = '';
                    yangaiche(ls.location.update)(function (location_info) {
                        address += e.address.city ? e.address.city : '';
                        address += e.address.district ? e.address.district : '';
                        address += e.address.street ? e.address.street : '';
                        address += e.address.streetNumber ? e.address.streetNumber : '';
                        location_info.name = e.address.city ? e.address.city : '';
                        location_info.address = address;
                        location_info.latitude = e.point.lat;
                        location_info.longitude = e.point.lng;
                        location_info.point = e.point;
                    });

                } else {
                    // 定位失败事件
                    show_msg(e.message);
                }
            }, {enableHighAccuracy: true});
        }();
    };
});
