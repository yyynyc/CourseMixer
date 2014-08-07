App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.ApplicationName = "Course Mixer";

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('courses');
  this.resource('course', {path: '/courses/:course_id'}, function(){
  	this.resource('modules', function(){
 		this.resource('module', {path: ':module_id'});
 	});
 	this.resource('playlists', function(){
 		this.resource('playlist', {path: ':playlist_id'}, function(){
			this.resource('mixers')
		});  
 	});
  });  
});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('courses');
	}
});

App.CoursesRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('course');
	}
});

App.ModulesRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('course').get('modules');		
	}
});

App.PlaylistsRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('course').get('playlists');		
	}
});

App.MixerRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('playlist').get('mixers');
	}
});

App.ModulesController = Ember.ArrayController.extend({
    needs: "course",
    course: Ember.computed.alias("controllers.course.model")
});

App.CourseController = Ember.ObjectController.extend({
	modules_count: function(){
		return this.get('modules').get('length');
	}.property('modules.@each'),
	playlists_count: function(){
		return this.get('playlists').get('length');
	}.property('playlists.@each')
});

App.Course = DS.Model.extend({
	title: DS.attr('string'),
	image_url: DS.attr('string'),
	duration: DS.attr('string'),
	description: DS.attr('string'),
	modules: DS.hasMany('module', {async: true}), 
	playlists: DS.hasMany('playlist', {async: true})
});

App.Module = DS.Model.extend({
	course: DS.belongsTo('course', {async: true}),
	mixers: DS.hasMany('mixer', {async: true}),
	name: DS.attr('string'),
	level: DS.attr('string'),
	level_indicator: DS.attr('number'),
	description: DS.attr('string')
});

App.Playlist = DS.Model.extend({
	course: DS.belongsTo('course', {async: true}),
	mixers: DS.hasMany('mixer', {async: true}),
	title: DS.attr('string'),
	difficulty_level: DS.attr('number')
});

App.Mixer = DS.Model.extend({
	playlist: DS.belongsTo('playlist', {async: true}),
	module: DS.belongsTo('module', {async: true})
});

App.Course.FIXTURES = [{
	id: 1, 
	title: "Imagination",
	image_url: "/images/flickr_imagination.jpg",
	duration: "3 classes",
	description: "Visualization, discussions, and activities to foster imagination.",
	modules: [1, 2, 3, 4, 5, 6, 7, 8],
	playlists: [1, 2, 3]
},{
	id: 2,
	title: "Creativity",
	image_url: "/images/flickr_creativity.jpg",
	duration: "5 classes",
	description: "Projects and activities to foster creativity.",
	modules: [],
	playlists: []
},{
	id: 3,
	title: "Critical Thinking",
	image_url: "/images/flickr_think.jpg",
	duration: "4 classes", 
	description: "Literature and discussion ideas to foster critical thinking skills.",
	modules: [],
	playlists: []
}];

App.Module.FIXTURES = [{
	id: 1,
	course: 1,
	mixers: [1],
	name: "C1.R1",
	level: "remediation",
	level_indicator: 100,
	description: "Lorem ipsum aliquet risus orci curae etiam quam class urna, tempor libero litora laoreet ipsum a pellentesque tristique, et condimentum adipiscing dui tempus duis orci rhoncus suscipit tellus gravida at ipsum."
},{
	id: 2,
	course: 1,
	mixers: [2],
	name: "C1.R2",
	level: "remediation",
	level_indicator: 100,
	description: "Aenean porta bibendum ornare id tortor dictum auctor praesent est, nam nullam aliquam tempor mattis metus lacus quisque, diam habitasse condimentum senectus a varius vivamus ultricies nec elementum primis amet."
},{
	id: 3,
	course: 1,
	mixers: [3],
	name: "C1.S1",
	level: "Simple",
	level_indicator: 300,
	description: "Quisque metus hac vehicula inceptos mattis per facilisis eu ligula blandit fringilla mi, pulvinar mauris sodales rutrum non ornare convallis interdum varius orci rutrum."
},{
	id: 4,
	course: 1,
	mixers: [4],
	name: "C1.S2",
	level: "Simple",
	level_indicator: 300, 
	description: "Lectus pharetra blandit fermentum massa quisque sem ullamcorper turpis id mollis tristique aliquam, maecenas vehicula augue vel senectus velit litora dapibus ligula tincidunt."
},{
	id: 5,
	course: 1,
	mixers: [],
	name: "C1.M1",
	level: "Medium",
	level_indicator: 500,
	description: "Hendrerit est arcu curabitur malesuada litora nostra dictumst sit ligula quisque, curabitur viverra imperdiet risus enim est id arcu sed scelerisque, curae habitasse integer egestas litora odio sem pulvinar eget."
},{
	id: 6,
	course: 1,
	mixes: [],
	name: "C1.M2",
	level: "Medium",
	level_indicator: 500,
},{
	id: 7,
	course: 1,
	mixers: [],
	name: "C1.A1",
	level: "Advanced",
	level_indicator: 700,
	description: "Level 7. Hendrerit est arcu curabitur malesuada litora nostra dictumst sit ligula quisque, curabitur viverra imperdiet risus enim est id arcu sed scelerisque, curae habitasse integer egestas litora odio sem pulvinar eget."
},{
	id: 8,
	course: 1,
	mixers: [],
	name: "C1.A2",
	level: "Advanced",
	level_indicator: 700,
	description: "Level 8. Hendrerit est arcu curabitur malesuada litora nostra dictumst sit ligula quisque, curabitur viverra imperdiet risus enim est id arcu sed scelerisque, curae habitasse integer egestas litora odio sem pulvinar eget."
}];

App.Playlist.FIXTURES = [{
	id: 1,
	course: 1,
	mixers: [1,2,3,4],
	title: "I Can Fly"
},{
	id: 2,
	course: 1,
	mixers: [],
	title: "City in Space"
}, {
	id: 3,
	course: 1,
	mixers: [],
	title: "Garden under Sea"
}]

App.Mixer.FIXTURES = [{
	id: 1,
	playlist: 1,
	module: 1
},{
	id: 2,
	playlist: 1,
	module: 2
},{
	id: 3,
	playlist: 1,
	module: 3
},{
	id: 4,
	playlist: 1,
	module: 4
}]