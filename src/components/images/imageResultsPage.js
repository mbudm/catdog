"use strict";

var React = require('react');
var Router = require('react-router');
var ImageApi = require('../../api/imageApi');

var format = require('string-format');

var Qajax = require('qajax');



var ImageResults = React.createClass({
  mixins: [
		Router.Navigation
	],
  /*propTypes: {
		query: React.PropTypes.string
	},*/
  getInitialState: function() {
		return {
			results: [],
      query: ''
		};
	},
  componentDidMount: function() {
    var query = this.props.params.query; //
    var cmp = this;
    if (query) {
      var ps = ImageApi.getResults(query);
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
          console.log("server returned: ", data, cmp);
          cmp.setState({results: data.photo });
    	  }, function (err) {
    	    console.log("xhr failure: ", err);
    	  });
    }
  },
	render: function () {
    console.log('renderin', this.state.results);
    var createImage = function(result) {
      if(result.farm && result.server && result.id){
        console.log('result not null ',result);
        var src = format('https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg', result);
        console.log('result not null ',src);
  			return (
  				<li key={result.id} >
  					<img src={src} alt={result.title} />
  				</li>
  			);
      }else{
        console.log('result null',result);
        //return null;
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
