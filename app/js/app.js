define([
	"jquery",
	"underscore",
	"backbone",
	"module",
	"views/view-main",
	"models/socket"
], function($, _, Backbone, module, viewMain, Socket) {

	"use strict";

	var Router = Backbone.Router.extend({

		routes:{
			'': 'index',
			//'custom/path/:input': 'fnDoSomething'
			'*action': 'default'
		},

		index: function() {
			viewMain.render();
		},

		default: function(action) {
			console.log(action);
		}

	});

	var initialize = function() {
		
		Backbone.app = {}

		Backbone.app.router = new Router();
		//Initialize Socket
		Backbone.app.socket = new Socket();

		Backbone.history.start({ 
			pushState: true, 
			root: module.config().root 
		});

	};

	return {
		init: initialize,
	};

});
