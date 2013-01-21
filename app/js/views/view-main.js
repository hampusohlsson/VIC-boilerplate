define([
	'jquery',
	'underscore',
	'backbone',
	//Include raw html as function variable templateMain
	'text!templates/tpl-main.html',
	//Include game object as fucntion variable Game
	'models/game' 
], function($, _, Backbone, templateMain, Game) {
	
	var View = Backbone.View.extend({

		el: '#page',

		initialize: function() {
			//Bind connection event
			Backbone.bind('server:connected', this.startGame, this);
		},

		render: function() {
			this.$el.removeClass('loading');
			this.setTitle('Waiting for connection');
		},

		setTitle: function(string) {
			var data = { title: string }
			var tpl = _.template(templateMain, data);
			this.$el.html(tpl);
		},

		startGame: function(e) {
			var settings = {}
			Backbone.app.game = new Game(settings);
			this.setTitle('Game started');
		},

	});

	return new View;

});