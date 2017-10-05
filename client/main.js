
data = new Mongo.Collection('data');
dbstatus = new Mongo.Collection('status');
Template.info.helpers({
	'temp': function() {
		val = data.findOne({topic:"serre/cp/esp32_0C6E78/temp"}, {sort: {date: -1, limit: 1}})

		if(val != undefined) {
		return Math.round(val.message*100)/100;
		} else {
			return 0;
		}
		
	},
	'humity': function() {
		val = data.findOne({topic:"serre/cp/esp32_0C6E78/humity"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return Math.round(val.message*100)/100;
		} else {
			return 0;
		}
	},
	'ht': function() {
		val = data.findOne({topic:"serre/cp/esp32_0C6E78/ht"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  Math.round(val.message*100)/100;
		} else {
			return 0;
		}
	},
	'lum': function() {
		val = data.findOne({topic:"serre/cp/esp32_0C6E78/lum"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  parseInt(val.message * 400);
		} else {
			return 0;
		}
		
	},
	
	'date': function() {
		val = data.findOne({topic:"serre/cp/esp32_0C6E78/lum"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  val.date;
		} else {
			return 0;
		}
		
	},
	'lvleau': function() {
		val = data.findOne({topic:"serre/cp/esp32_0C6E78/lvleau"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  val.date;
		} else {
			return 0;
		}
		
	},
	'lvltropplein': function() {
		val = data.findOne({topic:"serre/cp/esp32_0C6E78/lvltropplein"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  val.date;
		} else {
			return 0;
		}
		
	},
	
	
	
});


Template.graph.onRendered(function() {
	
drawgraph('temp', 1);
drawgraph('humity', 1);
drawgraph('lum', 1);
drawgraph('ht', 1);
	
	
	 
})

Template.command.events({
	'click .km_1_on': function() {
	console.log('go');
		Meteor.call('km', 'km_1', '1');
		
	},'click .km_1_off': function() {
	
		Meteor.call('km', 'km_1', '0');
		
	},
	'click .km_2_on': function() {
	console.log('go');
		Meteor.call('km', 'km_2', '1');
		
	},'click .km_2_off': function() {
	
		Meteor.call('km', 'km_2', '0');
		
	},
	'click .km_3_on': function() {
	console.log('go');
		Meteor.call('km', 'km_3', '1');
		
	},'click .km_3_off': function() {
	
		Meteor.call('km', 'km_3', '0');
		
	},
	'click .km_4_on': function() {
	console.log('go');
		Meteor.call('km', 'km_4', '1');
		
	},'click .km_4_off': function() {
	
		Meteor.call('km', 'km_4', '0');
		
	},
	
	
})
Template.command.helpers({
	'km_1': function() {
		
	val = dbstatus.findOne({"device":"esp32_0C6E78"})['km_1'];
	console.log(val);
	if(val == 1) {
		return true;
	} else {
	return false;
	}
	},
	'km_2': function() {
		
	val = dbstatus.findOne({"device":"esp32_0C6E78"})['km_2'];
	console.log(val);
	if(val == 1) {
		return true;
	} else {
	return false;
	}
	},
	'km_3': function() {
		
	val = dbstatus.findOne({"device":"esp32_0C6E78"})['km_3'];
	console.log(val);
	if(val == 1) {
		return true;
	} else {
	return false;
	}
	},
	'km_4': function() {
		
	val = dbstatus.findOne({"device":"esp32_0C6E78"})['km_4'];
	console.log(val);
	if(val == 1) {
		return true;
	} else {
	return false;
	}
	},
	
	
})

function drawgraph(mesure, func) {
	
	
	var topic = "serre/cp/esp32_0C6E78/" + mesure;
	classmesure = '.graphique' + mesure;
	limit = 50;
	val = data.find({topic}, {sort: {date: 1}, limit}).fetch();
	valt = data.find({topic}, {sort: {date: 1}, limit});
		var v = [];
		var lab = [];
		
		for(i in val) {
			v[i] = parseInt(val[i].message) * func;
			lab[i] = i;
		}
	
	var grp = new Chartist.Line(classmesure, {
		labels:lab,
		series: [v ]
		}, {
		low: 0,
		showArea: true
		},
		);
	
	data.find({topic}).observeChanges({
   addedBefore: function () {
		
			val = data.find({topic}, {sort: {date: 1}, limit}).fetch();
			console.log(val);
		var v = [];
		var lab = [];
		
		for(i in val) {
			v[i] = parseInt(val[i].message * func)  ;
			lab[i] = i;
		}
		
		
		
     grp.update({
		labels:lab,
		series: [v]
		});
    }
  });
	
	
	
}


// Router.configure({
	 // layoutTemplate: '',

 

// });

Router.route('/', {
action: function () {
    this.render('all');
  },

 waitOn: function () {
    // return one handle, a function, or an array
 return [Meteor.subscribe('data'), Meteor.subscribe('status')];
  },
});

