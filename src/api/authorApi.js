"use strict";

//This file is mocking a web API by hitting hard coded data.
var authors = require('./authorData').authors;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(author) {
	return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};
$ = jQuery = require('jquery');

var Qajax = require('qajax');

var querystring = require('querystring');

var AuthorApi = {
	getAllAuthors: function() {
		return _clone(authors);
	},

	getAuthorById: function(id) {
		var author = _.find(authors, {id: id});
		return _clone(author);
	},

	saveAuthor: function(author) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the author to the DB via AJAX call...');

		if (author.id) {
			var existingAuthorIndex = _.indexOf(authors, _.find(authors, {id: author.id}));
			authors.splice(existingAuthorIndex, 1, author);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new authors in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			author.id = _generateId(author);
			authors.push(_clone(author));
		}

		return author;
	},

	/*

	google custom search
	{
		url: 'https://www.googleapis.com/customsearch/v1',
		data: {
			q: q,
			cx: '009107106588814652143:rtvwzry3aes',
			key: 'AIzaSyAkEFgkpeGH6aclQ3G4dNQ9STwBBr-RgZA',
			fileType: 'jpg'
		}
	}

flickr instead
CatDog
Key:
1c96b5a73040d91144010849da3e48d1

Secret:
a6237b94cbb79bf7

https://www.flickr.com/services/api/flickr.photos.search.html

api_key
tags:

https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2ee29798b66742c8f1c8a5f1b2b99590&tags=cat&format=json&nojsoncallback=1&auth_token=72157660001770953-7f0aa210a60751d0&api_sig=f94689ef693545b08ecbdd4d4217e87b
	*/

	getResults: function(q){
		var qs = querystring.stringify({
			method: 'flickr.photos.search',
			tags: q,
			api_key: '1c96b5a73040d91144010849da3e48d1',
			format: 'json'
		});

		var url = 'https://api.flickr.com/services/rest/?' + qs;

		return Qajax({ url: url, method: "GET" });
		/*
	  .then(Qajax.filterSuccess)
	  .get("responseText") // using a cool Q feature here
	  .then(function (txt) {
	    console.log("server returned: "+txt);
	  }, function (err) {
	    console.log("xhr failure: ", err);
	  });
		*/
/*
	  var hget = http.get(url, function(response){

			console.log('query', q, response);
			var d = JSON.parse(response.data);
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		});

		console.log('hget', hget);*/
		/*
		return $.ajax({
			url: 'https://api.flickr.com/services/rest/',
			data: {
				method: 'flickr.photos.search',
				tags: q,
				api_key: '1c96b5a73040d91144010849da3e48d1',
				format: 'json'
			}
		});
		*/
	},

	deleteAuthor: function(id) {
		console.log('Pretend this just deleted the author from the DB via an AJAX call...');
		_.remove(authors, { id: id});
	}
};

module.exports = AuthorApi;
