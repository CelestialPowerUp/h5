/**
 * Created by caols on 8/5/15.
 */
!function(yac) {
    yac(local_storage).set('a', 'a is bbbb.');
    console.log(yac(local_storage).get('a'));
} (window.yangaiche);