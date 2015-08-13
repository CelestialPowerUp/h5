
app.format = {
    time: 'format_time'
};

yangaiche(app.format.time, function() {
    function paddedBits(val) {
        val += "";
        if (val.length === 1) {
            return "0" + val;
        }
        return val;
    }
    return function(time) {
        var timeArr = time.split("T");
        var d = timeArr[0].split("-");
        var t = timeArr[1].split(":");
        var data = new Date(d[0], (d[1] - 1), d[2], t[0], t[1], "");
        var year = data.getFullYear();  //获取年
        var month = data.getMonth() + 1;    //获取月
        var day = data.getDate(); //获取日
        var hours = data.getHours();
        var minutes = data.getMinutes();
        //var seconds = data.getUTCSeconds();
        //var milliseconds = data.getUTCMilliseconds();
        time = year + "/" + paddedBits(month) + "/" + paddedBits(day) + " " + paddedBits(hours) + ":" + paddedBits(minutes);
        return time;
    };
});
