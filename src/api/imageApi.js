"use strict";

var Qajax = require('qajax');

var querystring = require('querystring');

var ImageApi = {
	getResults: function(q){
		var qs = querystring.stringify({
			method: 'flickr.photos.search',
			tags: q,
			api_key: '1c96b5a73040d91144010849da3e48d1',
			format: 'json'
		});

		var url = 'https://api.flickr.com/services/rest/?' + qs;

		return Qajax({ url: url, method: "GET" });
	}
};

module.exports = ImageApi;
