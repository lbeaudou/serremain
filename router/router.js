Router.route('/serre', {
action: function () {
    this.render('allserre');
  },

 waitOn: function () {
    // return one handle, a function, or an array
 return [Meteor.subscribe('status'), Meteor.subscribe('command')];
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
 return [Meteor.subscribe('data', this.params._id), Meteor.subscribe('status'), Meteor.subscribe('command')];
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