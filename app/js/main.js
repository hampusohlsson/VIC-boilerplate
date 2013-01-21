(function() {

	"use strict";

	require.config({

		baseUrl : 'js',

		//Bust cache for development
		urlArgs: "bust="+(new Date()).getTime(),

		config: {
			'app': { root: '/' },
		},

		paths : {
			underscore : 'libs/underscore.min',
			backbone : 'libs/backbone.min',
			raphael: 'libs/raphael/raphael.2.1.0.amd',
			text: 'libs/text',
			json: 'libs/json2',
			tuio: 'libs/tuio.min',
			socketio: 'libs/socket.io'
		},

	});

	//Require app.js and run init function
	require(["app"], function(App) {
		App.init();
	});

})();