App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.ApplicationName = "Course Mixer";

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('courses');
  // this.resource('course', {path: 'courses/:course_id'});
  this.resource('course', {path: 'courses/:course_id'}, function() {
  	this.resource('modules', function(){
  		this.resource('module', {path: 'modules/:module_id'});
  	});
  });  
});

App.CoursesRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('course');
	}
});

App.CourseRoute = Ember.Route.extend({
	model: function(pramas){
		return this.store.findBy('id', pramas.course_id);
	}
});

App.ModulesRoute = Ember.Route.extend({
	model: function(){
		var course = this.modelFor('course');
		return course.modules.find('module');
	}
});

App.ModuleRoute = Ember.Route.extend({
	model: function(){
		return modules.findBy('id', pramas.module_id);
	}
});

App.UsersRoute = Ember.Route.extend({
	model: function(){
		return users;
	}
});

App.UserRoute = Ember.Route.extend({
	model: function(){
		return users.findBy('id', pramas.user_id);
	}
});


App.CoursesController = Ember.ArrayController.extend({
	viewedOn: function(){
		return new Date();
	}.property()
});

App.Course = DS.Model.extend({
	title: DS.attr('string'),
	image_url: DS.attr('string'),
	duration: DS.attr('string'),
	description: DS.attr('string'),
	modules: DS.hasMany('module')
});

App.Module = DS.Model.extend({
	course: DS.belongsTo('course'),
	name: 'String',
	level: 'string'
});

App.Course.FIXTURES = [{
	id: '1', 
	title: "Imagination",
	image_url: "/images/flickr_imagination.jpg",
	duration: "3 classes",
	description: "Visualization, discussions, and activities to foster imagination.",
	modules: [1, 2, 3, 4, 5, 6, 7, 8]
},{
	id: '2',
	title: "Creativity",
	image_url: "/images/flickr_creativity.jpg",
	duration: "5 classes",
	description: "Projects and activities to foster creativity.",
	modules: []
},{
	id: '3',
	title: "Critical Thinking",
	image_url: "/images/flickr_think.jpg",
	duration: "4 classes", 
	description: "Literature and discussion ideas to foster critical thinking skills.",
	modules: []
}];

App.Module.FIXTURES = [{
	id: 1,
	course: 1,
	name: "C1R1",
	level: "remediation"
},{
	id: 2,
	course: 1,
	name: "C1R2",
	first: "remediation"
},{
	id: 3,
	course: 1,
	name: "C1S1",
	first: "Simple"
},{
	id: 4,
	course: 1,
	name: "C1S2",
	first: "Simple"
},{
	id: 5,
	course: 1,
	name: "C1M1",
	first: "Medium"
},{
	id: 6,
	course: 1,
	name: "C1M2",
	first: "Medium"
},{
	id: 7,
	course: 1,
	name: "C1A1",
	first: "Advanced"
},{
	id: 8,
	course: 1,
	name: "C1A2",
	first: "Advanced"
}];

var users = [{
	id: 1,
	first: "Abe"
},{
	id: 2,
	first: "Ben"
},{
	id: 3,
	first: "Charlie"
},{
	id: 4,
	first: "Donna"
},{
	id: 5,
	first: "Ellen"
},{
	id: 6,
	first: "Frank"
},{
	id: 7,
	first: "Gary"
},{
	id: 8,
	first: "Helen"
}];

