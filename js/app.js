App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.ApplicationName = "Course Mixer";

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('courses');
  this.resource('course', {path: '/courses/:course_id'}, function(){
  	this.resource('modules', function(){
 		this.resource('module', {path: ':module_id'})
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

App.CourseRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo('modules')
	}
});

App.ModulesRoute = Ember.Route.extend({
	model: function(){
		// var course = this.modelFor('course')
		// return course.modules.find('module');
		// return modules;
		// var modules = this.store.find('module', { course: this.modelFor('course').get('id') }).then(function(module) {
		// 	console.log(module);
		// });
		// return this.store.filter('module', {course: this.modelFor('course').get('id')}, function(module){
		// 	return module.get('course')
		// });
		return this.modelFor('course').get('modules')
	}
	// afterModel: function(model) {
	// 	debugger;
	// }
});

App.ModulesController = Ember.ArrayController.extend({
    needs: "course",
    course: Ember.computed.alias("controllers.course.model")
});

DS.FixtureAdapter.reopen({
  queryFixtures: function(records, query, type) {
    return records.filter(function(record) {
        for(var key in query) {
            if (!query.hasOwnProperty(key)) { continue; }
            var value = query[key];
            if (record[key] !== value) { return false; }
        }
        return true;
    });
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
	modules: DS.hasMany('module', {async: true})
});

App.Module = DS.Model.extend({
	course: DS.belongsTo('course', {async: true}),
	name: 'String',
	level: 'string'
});

App.Course.FIXTURES = [{
	id: 1, 
	title: "Imagination",
	image_url: "/images/flickr_imagination.jpg",
	duration: "3 classes",
	description: "Visualization, discussions, and activities to foster imagination.",
	modules: [1, 2, 3, 4, 5, 6, 7, 8]
},{
	id: 2,
	title: "Creativity",
	image_url: "/images/flickr_creativity.jpg",
	duration: "5 classes",
	description: "Projects and activities to foster creativity.",
	modules: []
},{
	id: 3,
	title: "Critical Thinking",
	image_url: "/images/flickr_think.jpg",
	duration: "4 classes", 
	description: "Literature and discussion ideas to foster critical thinking skills.",
	modules: []
}];

// var modules = [{
App.Module.FIXTURES = [{
	id: 1,
	course: 1,
	name: "C1R1",
	level: "remediation",
	description: "Lorem ipsum aliquet risus orci curae etiam quam class urna, tempor libero litora laoreet ipsum a pellentesque tristique, et condimentum adipiscing dui tempus duis orci rhoncus suscipit tellus gravida at ipsum."
},{
	id: 2,
	course: 1,
	name: "C1R2",
	level: "remediation",
	description: "Aenean porta bibendum ornare id tortor dictum auctor praesent est, nam nullam aliquam tempor mattis metus lacus quisque, diam habitasse condimentum senectus a varius vivamus ultricies nec elementum primis amet."
},{
	id: 3,
	course: 1,
	name: "C1S1",
	level: "Simple",
	description: "Quisque metus hac vehicula inceptos mattis per facilisis eu ligula blandit fringilla mi, pulvinar mauris sodales rutrum non ornare convallis interdum varius orci rutrum."
},{
	id: 4,
	course: 1,
	name: "C1S2",
	level: "Simple", 
	description: "Lectus pharetra blandit fermentum massa quisque sem ullamcorper turpis id mollis tristique aliquam, maecenas vehicula augue vel senectus velit litora dapibus ligula tincidunt."
},{
	id: 5,
	course: 1,
	name: "C1M1",
	level: "Medium",
	description: "Hendrerit est arcu curabitur malesuada litora nostra dictumst sit ligula quisque, curabitur viverra imperdiet risus enim est id arcu sed scelerisque, curae habitasse integer egestas litora odio sem pulvinar eget."
},{
	id: 6,
	course: 1,
	name: "C1M2",
	level: "Medium"
},{
	id: 7,
	course: 1,
	name: "C1A1",
	level: "Advanced"
},{
	id: 8,
	course: 1,
	name: "C1A2",
	level: "Advanced"
}];

