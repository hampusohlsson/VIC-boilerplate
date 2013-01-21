define([
	'jquery',
	'underscore',
	'backbone',
	//Include Raphael animation lib
	'raphael',
], function($, _, Backbone, Raphael) {

	var self;

	var Game = Backbone.Model.extend({

		//Some default variables
		defaults: {
			w: window.innerWidth,
			h: window.innerHeight,
			sounds: {}
		},

		log: function() {
			if(DEBUG) console.log.apply(console, arguments);
		},

		initialize: function(settings) {
			console.log('[GAME] initializing');

			//Bind events from socket model, send to event function
			Backbone.bind('server:event', this.events, this);
			//Bind other events (for loose coupling)
			Backbone.bind('game:ready', this.start, this);

			//Init sounds
			this.addSound('foo', 'sounds/test.mp3', false);

			//Do other stuff...

			//Trigger game starting event
			Backbone.trigger('game:ready');
		},

		events: function(data) {
			//Handle event data here
		},

		start: function() {
			console.log('[GAME] start');
			//Start game here
			this.playSound('foo');
		},

		addSound: function(name, src, loop) {
			//Create Audio object
			var audio = new Audio();
			audio.src = src;
			audio.loop = loop;
			audio.preload = true;
			audio.hidden = true;
			//Store audio
			var sounds = this.get('sounds');
			sounds[name] = audio;
		},

		playSound: function(name) {
			this.get('sounds')[name].play();
		},

	});

	return Game;
});