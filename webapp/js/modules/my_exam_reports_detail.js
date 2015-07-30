/**
 * Created by caols on 7/27/15.
 */
!function(t) {
    if (t) {
        t(function () {

            getStore().set('now_in', 'exam_report');

//            var raw_data = '{"code": "00000","data": [{"id": 39,"order_id": 414,"name": "0605报告单","create_time": "2015-06-05T16:25:05.000","complete_time": "2015-06-05T16:25:05.000","car": {"id": 294,"licence": {"province": "京","number": "测试版"},"bought_time": "2015-01-01T01:01:00.000","miles": 0,"chassis_number": null,"engine_number": null,"brand": "阿尔法·罗密欧","category": "156","model": "2004款  156 2.0 2004款","brand_img_url": {"id": 1041,"thumbnail_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg/s250.jpg","original_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg/s1024.jpg","raw_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg"}},"reports": [{"name": "雨刮器工况检测","status": 1,"status_comment": "","imgs": [{"id": 3953,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvBRfNZa95FFFD8RvKeYsUrda5pI/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvBRfNZa95FFFD8RvKeYsUrda5pI/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvBRfNZa95FFFD8RvKeYsUrda5pI"}, {"id": 3954,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Finlf4tw38FPN15a2CF3-XkO7A_0/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Finlf4tw38FPN15a2CF3-XkO7A_0/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Finlf4tw38FPN15a2CF3-XkO7A_0"}, {"id": 3955,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FoWKas_QCX7z4K2VZRf7pWKPt53Q/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FoWKas_QCX7z4K2VZRf7pWKPt53Q/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FoWKas_QCX7z4K2VZRf7pWKPt53Q"}, {"id": 3956,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fk2Ij4RR_uKExsYc_zZ2e83nge8y/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fk2Ij4RR_uKExsYc_zZ2e83nge8y/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fk2Ij4RR_uKExsYc_zZ2e83nge8y"}, {"id": 3957,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FnBEBrevJ-qL4WdnimnYBboAr5AJ/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FnBEBrevJ-qL4WdnimnYBboAr5AJ/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FnBEBrevJ-qL4WdnimnYBboAr5AJ"}]}],"qualified_size": 1,"unqualified_size": 0,"to_be_confirmed": 0}, {"id": 32,"order_id": 397,"name": "0604报告单","create_time": "2015-06-04T21:34:55.000","complete_time": "2015-06-04T21:34:55.000","car": {"id": 454,"licence": {"province": "沪","number": ""},"bought_time": "2015-01-01T01:01:00.000","miles": 0,"chassis_number": null,"engine_number": null,"brand": "MINI","category": "CLUBMAN","model": "2013款 1.6 L4 1.6L COOPER Bond Street ","brand_img_url": {"id": 1911,"thumbnail_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1911.jpg/s250.jpg","original_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1911.jpg/s1024.jpg","raw_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1911.jpg"}},"reports": [{"name": "电瓶电压及寿命检测","status": 1,"status_comment": "","imgs": [{"id": 3912,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fh88r2b_-4VmfSTacCi0tmXlBUos/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fh88r2b_-4VmfSTacCi0tmXlBUos/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fh88r2b_-4VmfSTacCi0tmXlBUos"}, {"id": 3913,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FsbZXmyIcq6mFpqhwY0-OgUws7fO/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FsbZXmyIcq6mFpqhwY0-OgUws7fO/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FsbZXmyIcq6mFpqhwY0-OgUws7fO"}, {"id": 3914,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FmVCB-MSna31mnOR-W8VQMQYvE9Z/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FmVCB-MSna31mnOR-W8VQMQYvE9Z/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FmVCB-MSna31mnOR-W8VQMQYvE9Z"}, {"id": 3915,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fo0kJ1k5zjAwTZylb1EbnCG3b3pE/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fo0kJ1k5zjAwTZylb1EbnCG3b3pE/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fo0kJ1k5zjAwTZylb1EbnCG3b3pE"}, {"id": 3916,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fr9MRY7aJzPC3k4dV9WwNwhN0Vrl/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fr9MRY7aJzPC3k4dV9WwNwhN0Vrl/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fr9MRY7aJzPC3k4dV9WwNwhN0Vrl"}]}],"qualified_size": 1,"unqualified_size": 0,"to_be_confirmed": 0}, {"id": 31,"order_id": 405,"name": "0604报告单","create_time": "2015-06-04T21:29:32.000","complete_time": "2015-06-04T21:30:07.000","car": {"id": 294,"licence": {"province": "京","number": "测试版"},"bought_time": "2015-01-01T01:01:00.000","miles": 0,"chassis_number": null,"engine_number": null,"brand": "阿尔法·罗密欧","category": "156","model": "2004款  156 2.0 2004款","brand_img_url": {"id": 1041,"thumbnail_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg/s250.jpg","original_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg/s1024.jpg","raw_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg"}},"reports": [{"name": "电瓶电压及寿命检测","status": 1,"status_comment": "","imgs": [{"id": 3911,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FsPYkx_t92F-O9r0a81XMuteuTT9/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FsPYkx_t92F-O9r0a81XMuteuTT9/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FsPYkx_t92F-O9r0a81XMuteuTT9"}]}, {"name": "空调制冷温度检测","status": 1,"status_comment": "","imgs": [{"id": 3907,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvxxbRnxqeO7bykSukNkujYVH6HH/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvxxbRnxqeO7bykSukNkujYVH6HH/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvxxbRnxqeO7bykSukNkujYVH6HH"}, {"id": 3908,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FhEtdrt3raVfbF4HncnvkraPqWFx/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FhEtdrt3raVfbF4HncnvkraPqWFx/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FhEtdrt3raVfbF4HncnvkraPqWFx"}, {"id": 3909,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FuoLR7fkOTyPOlBIo14w3XKcpDgg/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FuoLR7fkOTyPOlBIo14w3XKcpDgg/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FuoLR7fkOTyPOlBIo14w3XKcpDgg"}, {"id": 3910,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fmy7Zo-U4AkhRRA9xRM19RxyjyAj/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fmy7Zo-U4AkhRRA9xRM19RxyjyAj/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fmy7Zo-U4AkhRRA9xRM19RxyjyAj"}]}, {"name": "空调制热温度检测","status": 1,"status_comment": "","imgs": [{"id": 3920,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Finlf4tw38FPN15a2CF3-XkO7A_0/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Finlf4tw38FPN15a2CF3-XkO7A_0/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Finlf4tw38FPN15a2CF3-XkO7A_0"}]}],"qualified_size": 3,"unqualified_size": 0,"to_be_confirmed": 0}, {"id": 30,"order_id": 405,"name": "0604报告单","create_time": "2015-06-04T21:29:31.000","complete_time": "2015-06-04T21:29:31.000","car": {"id": 294,"licence": {"province": "京","number": "测试版"},"bought_time": "2015-01-01T01:01:00.000","miles": 0,"chassis_number": null,"engine_number": null,"brand": "阿尔法·罗密欧","category": "156","model": "2004款  156 2.0 2004款","brand_img_url": {"id": 1041,"thumbnail_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg/s250.jpg","original_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg/s1024.jpg","raw_url": "http://7xiqd7.com2.z0.glb.qiniucdn.com/1041.jpg"}},"reports": [{"name": "空调制冷温度检测","status": 1,"status_comment": "","imgs": [{"id": 3907,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvxxbRnxqeO7bykSukNkujYVH6HH/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvxxbRnxqeO7bykSukNkujYVH6HH/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FvxxbRnxqeO7bykSukNkujYVH6HH"}, {"id": 3908,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FhEtdrt3raVfbF4HncnvkraPqWFx/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FhEtdrt3raVfbF4HncnvkraPqWFx/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FhEtdrt3raVfbF4HncnvkraPqWFx"}, {"id": 3909,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FuoLR7fkOTyPOlBIo14w3XKcpDgg/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FuoLR7fkOTyPOlBIo14w3XKcpDgg/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/FuoLR7fkOTyPOlBIo14w3XKcpDgg"}, {"id": 3910,"thumbnail_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fmy7Zo-U4AkhRRA9xRM19RxyjyAj/s250.jpg","original_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fmy7Zo-U4AkhRRA9xRM19RxyjyAj/s1024.jpg","raw_url": "http://7xiz0z.com2.z0.glb.qiniucdn.com/Fmy7Zo-U4AkhRRA9xRM19RxyjyAj"}]}],"qualified_size": 1,"unqualified_size": 0,"to_be_confirmed": 0}]}';
//            var data = $.parseJSON(raw_data)['data'];

            var id = getReqParam()['id'];

            getReq('check_reports?user_id='+getUser()['user_id'], function(data){
                console.log(data);

                var passed = [], unpassed = [], passed_index = 1, unpassed_index = 1;

                data.forEach(function(r) {
                    if (id === (r['id'] + '')) {
                        r['reports'].forEach(function(report) {
                            if (1 === report['status']) {
                                report['no'] = passed_index;
                                passed_index = passed_index + 1;
                                passed.push(report);
                            } else if (0 === report['status']) {
                                report['no'] = unpassed_index;
                                unpassed_index = unpassed_index + 1;
                                unpassed.push(report);
                            }
                        });
                    }
                });

                console.log(unpassed);
                console.log(passed);

                t('#unpassed_num').empty().html(unpassed.length);
                t('#passed_num').empty().html(passed.length);

                t('#unpassed_btn').click(function() {
                    t('#unpassed_btn').removeClass('my-header-not-selected');
                    t('#unpassed_btn').addClass('my-header-selected');
                    t('#passed_btn').removeClass('my-header-selected');
                    t('#passed_btn').addClass('my-header-not-selected');
                    t('#unpassed').css('display', 'block');
                    t('#passed').css('display', 'none');
                });

                t('#passed_btn').click(function() {
                    t('#passed_btn').removeClass('my-header-not-selected');
                    t('#passed_btn').addClass('my-header-selected');
                    t('#unpassed_btn').removeClass('my-header-selected');
                    t('#unpassed_btn').addClass('my-header-not-selected');
                    t('#passed').css('display', 'block');
                    t('#unpassed').css('display', 'none');
                });

                var tpl = Handlebars.compile(t("#exam_reports_tpl").text());
                t("#unpassed").append(tpl(unpassed));
                t("#passed").append(tpl(passed));

                t('.right').css('width', (640 - 110 - 30) + 'px');

                var module = t.AMUI['gallery'];
                module && module.init && module.init();

                t.each(t('.my-gallery'), function(i, gallery) {
                    t.each(t(gallery).find('.am-gallery-item'), function(j, gallery_item) {
                        if (j > 3) {
                            t(gallery_item).css('display', 'none');
                        }
                    })
                });

            });

        });
    }
} (window.jQuery);