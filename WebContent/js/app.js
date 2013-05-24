App = Ember.Application.create();


App.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
});

App.Router.map(function(){
	this.resource('posts', function() {
		this.resource('post', {path: ':post_id'});
	});
	this.resource('about');
});

App.IndexRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo('posts');
	}
});

App.PostsRoute = Ember.Route.extend({
	model: function(){
		return App.Post.find();
	}

});

App.PostController = Ember.ObjectController.extend({
	isEditing:false,
	
	doneEditing: function(){
		this.set('isEditing', false);
	},
	
	edit: function(){
		this.set('isEditing', true);
	}
});

App.Post = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.attr('string'),
	intro: DS.attr('string'),
	extended: DS.attr('string'),
	publishedAt: DS.attr('date')
});

App.Post.FIXTURES = [{
	id: 1,
	title: "Rails is Omakase",
	author: "d2h",
	publishedAt: new Date('12-27-2012'),
	intro: "THere are lots à la carte software environments in this world... ",
	extended: "I want this for my ORM, I Want that for my template language, and let..."
}, {
	id: 2,
	title: "The Parly Letter",
	author: "d2h",
	publishedAt: new Date('12-23-2012'),
	intro: "My [apperance on the Ruby Rogues podcast](http://rubyeoques.com)",
	extended: "A long list of topics wher raised and I took time to ramble"
}];


Ember.Handlebars.registerBoundHelper('date', function(date){
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(input){
	return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});
