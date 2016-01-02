"use strict";

var React = require('react');
var Router = require('react-router');
var PlayForm = require('./playForm');
var PlayApi = require('../../api/playApi');
var toastr = require('toastr');

var PlayPage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			play: { id: '', answer: '', word: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		this.setState({play: PlayApi.getPlay()});
	},

	setPlayState: function(event) {
		this.setState({dirty: true});
		var value = event.target.value;
		this.state.play.answer = value;

		this.checkPlayComplete();

		return this.setState({play: this.state.play});
	},

	playFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.play.answer !== this.state.play.word.substring(0, this.state.play.answer.length) ) {
			this.state.errors.playInput = 'Oops - wrong letter';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	checkPlayComplete: function() {
		if (!this.playFormIsValid()) {
			return;
		}

		if (this.state.play.answer !== this.state.play.word ) {
			return;
		}

		//AuthorApi.saveAuthor(this.state.play);
		this.setState({dirty: false});
		toastr.success('Play complete.');
//console.log('transitionTo imageResults' ,  this.state.author.firstName);
		this.transitionTo('imageResults', { query: this.state.play.answer});

	},

	render: function() {
		return (
			<PlayForm
				play={this.state.play}
				onChange={this.setPlayState}
				errors={this.state.errors} />
		);
	}
});

module.exports = PlayPage;
