"use strict";

//This file is mocking a web API by hitting hard coded data.
var plays = require('./playData').plays;
var _ = require('lodash');

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};
$ = jQuery = require('jquery');

var Qajax = require('qajax');

var querystring = require('querystring');

var PlayApi = {
	getAllAuthors: function() {
		return _clone(authors);
	},

	getAuthorById: function(id) {
		var author = _.find(authors, {id: id});
		return _clone(author);
	},

	getPlay: function(){
		var shuffled = _.shuffle(plays);
		console.log('shuffled', shuffled[0]);
		return _clone(shuffled[0]);
	},

	deleteAuthor: function(id) {
		console.log('Pretend this just deleted the author from the DB via an AJAX call...');
		_.remove(authors, { id: id});
	}
};

module.exports = PlayApi;
