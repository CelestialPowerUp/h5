/**
 * Created by caols on 15/6/11.
 */
console.log('normal');
if (getStore().get('now_in') === 'order_list') {
    window.location.href = './order_list.html';
} else {
    window.location.href = './car_list.html';
}