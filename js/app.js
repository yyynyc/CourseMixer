App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.ApplicationName = "Prosperity Prana";

// App.ApplicationAdpater = DS.FixtureAdapter.extend();

// App.ApplicationStore = DS.Store.extend({
// 	revision: 11,
// 	adapter: 'DS.FixtureAdapter'
// });

App.Router.map(function() {
  this.resource('blogs');
  this.resource('blog', {path: 'blogs/:blog_id'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.BlogsRoute = Ember.Route.extend({
	model: function(){
		return blogs;
	}
});

App.BlogRoute = Ember.Route.extend({
	model: function(pramas){
		return blogs.findBy('id', pramas.blog_id);
	}
});

// App.Blog = DS.Model.extend({
// 	title: DS.attr('string'),
// 	image_url: DS.attr('string'),
// 	quote: DS.attr('string'),
// 	thing: DS.attr('string')
// });

// App.BlogsController = Ember.ArrayController.extend();


var blogs = [{

// App.Blog.FIXTURES = [{
	id: '1', 
	// login: "robconery",
	title: "Imagination",
	image_url: "/images/flickr_imagination.jpg",
	quote: "Imagination is the mother of creation.",
	thing: "Whatever works is fine with me."
},{
	id: '2',
	// login: "shanselman",
	title: "Creativity",
	image_url: "/images/flickr_creativity.jpg",
	quote: "Creativity procceeds productivity.",
	thing: "Just think of that!"
},{
	id: '3',
	// login: "tomdale",
	title: "Critical Thinking",
	image_url: "/images/flickr_think.jpg",
	quote: "Thinking blindly is worth than not thinking at all.",
	thing: "How critically do you think?"
}]

   //  var devs = [
   //      { login: "robconery", name: "Rob Conery" },
   //      { login: "shanselman", name: "Scott Hanselman" },
   //      { login: "tomdale", name: "Tom Dale" },
   //      { login: "wycats", name: "Yehuda Katz" },
   //      { login: "jongalloway", name: "Jon Galloway" },
   //      { login: "haacked", name: "Phil Haack" },
   // ]

