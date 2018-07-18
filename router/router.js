Router.route('/serre', {
action: function () {
	if(Meteor.user()) {
    this.render('allserre');
	} else {
		this.render('compte');
	}
   
  },

 waitOn: function () {
    // return one handle, a function, or an array
 // return [Meteor.subscribe('serre')];
 // return true;
  },

});

Router.route('/serre/:_id', {
action: function () {
	if(Meteor.user()) {
    this.render('serre');
	} else {
		this.render('compte');
	}
  },
  data: function () {
	  
      return this.params._id;
    },

 waitOn: function () {
    // return one handle, a function, or an array
 return [Meteor.subscribe('sensordata', this.params._id), Meteor.subscribe('status', this.params._id), Meteor.subscribe('command', this.params._id), Meteor.subscribe('getalarm', this.params._id), Meteor.subscribe('img', this.params._id)];
  },
});


Router.route('/', {
action: function () {
    this.render('mainpage');
  },
  
 waitOn: function () {
    // return one handle, a function, or an array

  },
});

Router.route('/compte', {
action: function () {
    this.render('compte');
  },

 waitOn: function () {
    // return one handle, a function, or an array

  },
});