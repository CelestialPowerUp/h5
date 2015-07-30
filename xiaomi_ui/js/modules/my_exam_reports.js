/**
 * Created by caols on 7/27/15.
 */
!function(t) {
    if (t) {
        t(function () {

            getStore().set('now_in', 'exam_report');

//            var raw_data = '';
//            var data = $.parseJSON(raw_data)['data'];

            getReq('check_reports?user_id='+getUser()['user_id'], function(data){
                console.log(data);

                data.forEach(function(d) {
                    d['create_time'] = d['create_time'].substr(0, '2015-11-11'.length);
                });

                var tpl = Handlebars.compile(t("#exam_reports_tpl").text());
                t("body").append(tpl(data));

                var width_of_left = (t(window).width() - 7 - 15 - 15 - 30);
                t('.left').css('width', width_of_left + 'px');
                t('.left').find('div').css('width', width_of_left + 'px');

                console.log(t('.left').eq(0).find('div').eq(1));

                t('.report-btn').click(function (e) {
                    var id = t(this).attr('data-rel');
                    window.location.href = './my_exam_reports_detail.html?id=' + id;
                });

            });

        });
    }
} (window.jQuery);