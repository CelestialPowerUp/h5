/**
 * Created by caols on 8/5/15.
 */
!function(exportor, runtime) {
    runtime['local_storage'].set('a', 'a is b.');
    console.log(runtime['local_storage'].get('a'));
} (window.yangaiche, window.yangaiche_obj);