yangaiche(sys.load_module)('back');

yangaiche(sys.init)(function(t) {
    console.log('aaa');
    t('.btn').click(function() {
        console.log('bbb');
        yangaiche(ls.back.set_back_to_store)('http://pay.yangaiche.com/h5/store_item_page.html?ware_id=50');
    });
});