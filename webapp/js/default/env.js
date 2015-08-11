yangaiche(sys.load_default_module)('repository', {});

app.env = {
	get: 'get_env',
	do_sth: 'do_sth_by_env'
};

yangaiche(app.env.get, function() {
	return function() {
		var cfg = $.ajax({
	        url: './map/env.json',
	        cache: true,
	        async: false,
	        dataType: 'json'
	    });
	    return cfg['responseJSON']['thisis'];
	}();
});

yangaiche(app.env.do_sth, function() {
	return function(sth, params) {
		sth[yangaiche(app.env.get)](params);
	}
});
