yangaiche(sys.load_default_module)('repository', {});

app.env = {
	get: 'get_env',
	do_sth: 'do_sth_by_env',
	get_host: 'get_host'
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
	};
});

yangaiche(app.env.get_host, function () {
	// 如需转义，请使用encodeURIComponent方法，对应的方法是decodeURIComponent
	return function () {
		var host = null;

		yangaiche(app.env.do_sth)({
			dev: function() {
				host = 'dev.yangaiche.com/developer/';
			},
			staging: function() {
				host = 'dev.yangaiche.com/stage/';
			},
			product: function() {
				host = 'pay.yangaiche.com/';
			}
		});

		if (host.indexOf(window.location.host) >= 0) {
			return host;
		}

		host = window.location.host + '/h5/';
		return host;
	}();
});
