define([
	'jquery',
	'underscore',
	'backbone',
	 //Import TUIO client lib, no fn variable needed
	'tuio',
	 //Import socket.io client lib, no fn variable needed
	'socketio'
], function($, _, Backbone) {
	
	var self;

	var Socket = Backbone.Model.extend({

		initialize: function() {
			//Alias for function object ('this' can get dereferenced)
			self = this;

			console.log('[NETWORK] Connecting TUIO...');

			//TCP socket for Tuio commands, port as specified in server.js
			var tuio = new Tuio.Client({ host: "http://127.0.0.1:8080" });
			
			//Bind TUIO events to functions
			tuio.on("connect", this.onConnectTuio);
			tuio.on("addTuioCursor", this.onAddTuioCursor);
			
			//Connect Tuio
			tuio.connect();
			
			/*
			All TUIO events
			==================================================
            tuio.on("addTuioCursor", fn);
			tuio.on("updateTuioCursor", fn);
            tuio.on("removeTuioCursor", fn);
            tuio.on("addTuioObject", fn);
            tuio.on("updateTuioObject", fn);
            tuio.on("removeTuioObject", fn);
            tuio.on("refresh", fn);
            ==================================================
            */			
		},

		onConnectTuio: function() {
			console.log('[NETWORK] Server connected');
			//Trigger connection event
			Backbone.trigger('server:connected');
		},

		onAddTuioCursor: function(object) {
			//Trigger a custom event that other modules can listen to
			Backbone.trigger('server:event', object);
		},

	});

	return Socket;
});