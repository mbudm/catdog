"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorApi = require('../../api/authorApi');

var format = require('string-format');

var Qajax = require('qajax');



var ImageResults = React.createClass({
  mixins: [
		Router.Navigation
	],
  propTypes: {
		query: React.PropTypes.string
	},
  getInitialState: function() {
		return {
			results: [],
      query: ''
		};
	},
  componentWillMount: function() {
    var query = this.props.params.query; //
    var cmp = this;
    if (query) {
      var ps = AuthorApi.getResults(query);
      console.log('then', ps.then);
      ps.then(Qajax.filterSuccess)
    	  .get("responseText") // using a cool Q feature here
    	  .then(function (txt) {

          var data;
          function jsonFlickrApi (response) {
            console.log(
               "Got response from Flickr-API with the following photos: %o",
               response.photos
            );
            // Handle the response here. I.E update the DOM, trigger event handlers etc.
            data = response.photos;
          }
          eval("("+ txt + ")");
          console.log("server returned: ", data);
          cmp.setState({results: data.photo });
    	  }, function (err) {
    	    console.log("xhr failure: ", err);
    	  });
    }
  },
	render: function () {

    var createImage = function(result) {
      if(result.pagemap && result.pagemap.cse_image && result.pagemap.cse_image.length > 0){
        var src = 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg'.format(result);
  			return (
  				<li key={result.id} >
  					<img src={src} alt={result.title} />
  				</li>
  			);
      }else{
        return null;
      }
		};
		return (
			<div>
				<h1>Image Results</h1>
				<ul>
					{this.state.results.map(createImage, this)}
				</ul>
			</div>
		);
	}
});

module.exports = ImageResults;
