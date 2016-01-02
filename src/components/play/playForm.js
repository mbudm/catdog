"use strict";

var React = require('react');
var Input = require('../common/textInput');

var PlayForm = React.createClass({
	propTypes: {
		play:	React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<Input
					name="playInput"
					label="Type the word"
					placeholder={this.props.play.word}
					onChange={this.props.onChange}
					error={this.props.errors.word} />
			</form>
		);
	}
});

module.exports = PlayForm;
