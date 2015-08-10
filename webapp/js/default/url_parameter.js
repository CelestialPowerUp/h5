yangaiche(sys.load_default_module)('repository', {});

app.url_parameter = 'url_parameter';

yangaiche(app.url_parameter, function() {
	return function() {
		var url = location.href; //
	    var theRequest = {};
	    theRequest.counts = 0;
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(url.indexOf("?") + 1);
	        var strs = str.split("&");
	        for (var i = 0; i < strs.length; i++) {
	            var ss = strs[i].split("=");
	            theRequest[ss[0]] = ss[1];
	            theRequest.counts++;
	        }
	    }
	    return theRequest;
	}();
});
