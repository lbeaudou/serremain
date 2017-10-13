Router.route('/serre/', {
action: function () {
    this.render('allserre');
  },

 waitOn: function () {
    // return one handle, a function, or an array
 return [Meteor.subscribe('data'), Meteor.subscribe('status')];
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