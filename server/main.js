import { Meteor } from 'meteor/meteor';

data = new Mongo.Collection('data');
dbstatus = new Mongo.Collection('status');
commande = new Mongo.Collection('commande');
serre = new Mongo.Collection('serre');
img = new Mongo.Collection('img');
sensordata = new Mongo.Collection('sensordata');
alarm = new Mongo.Collection('alarmdata');
Meteor.startup(() => {
	serre.insert({"serre": "omega", date: new Date()});
 var mqtt = require('mqtt'); 

var client = mqtt.connect('mqtt://broker.mqttdashboard.com:1883');

client.subscribe('serre/#'); 

client.on('message', Meteor.bindEnvironment(function (topic, message, f) {  
if(topic.includes('serre/cp/')) {
	// Meteor.call('insert', topic.toString(), message.toString());
	topic = topic.toString();
	message = message.toString();
	topic = topic.replace('serre/cp/', '');
	t = topic.split('/');
	serre = t[0];
	type = t[1];
	data.insert({date:new Date(), serre, type, message});
	db = dbstatus.findOne({device: serre});
	console.log(message.toString())
}


/// -------- enregistrement status
if(topic.includes('serre/status/')) {
	m = JSON.parse(message);
	console.log(m)
	doc = dbstatus.findOne({device:m.device});

	doc ? dbstatus.update({device: m.device}, {$set: {"km_1":m.km_1,"km_2":m.km_2,"km_3":m.km_3,"km_4":m.km_4}})  : dbstatus.insert(m);
}


/// --------- enregistrement image
if(topic.includes('serre/img/')) {
	topic = topic.replace('serre/img/', '');
	t = topic.split('/');
	serre = t[0];
	doc = dbstatus.findOne({device:serre});

	doc ? dbstatus.update({device: serre}, {$set: {"img":message.toString(), date: new Date()}})  : dbstatus.insert({"device":serre, "img":message.toString()});
	d = new Date();
	h = d.getHours();
	m = d.getMinutes();
	m = h * 60 + m * 1;
	dd = dbstatus.findOne({device: serre});
	h = dd.camera.value_hour
	t = h.split(':');
	minute = t[0] * 60 + t[1] * 1;
	console.log(minute)
	console.log(m);

	if((minute>(m-5)) && (minute<(m+5))) {
		img.insert({device:serre, "img":message.toString(), date: new Date()});
	}
}
/// ------ data type serre
if(topic.includes('serre/sensor/')) {
	topic = topic.replace('serre/sensor/', '');
	t = topic.split('/');
	serre = t[0];
	message = JSON.parse(message);
	message.date = new Date();
	sensordata.insert(message);
}
// -------- alarme serre
if(topic.includes('serre/alarm/')) {
	topic = topic.replace('serre/alarm/', '');
	t = topic.split('/');
	serre = t[0];
	message = JSON.parse(message);
	message.date = new Date();
	alarm.insert(message);
	/// --- enregistrement alarme dans status : niveau bas de la temperature air
	if(message.value == "Niveau bas temperature air") {
		dbstatus.update({device:serre}, {$set:{"Niveau bas temperature air":message.status}})
	}
		/// --- enregistrement alarme dans status : niveau haut de la temperateure air
	if(message.value == "Niveau haut temperature air") {
		dbstatus.update({device:serre}, {$set:{"Niveau haut temperature air":message.status}})
	}
}
}));


Meteor.methods({
  'insert':function(topic, message) {

	
  },'km':function(km, val) {
	topic = 'serre/km/omega/' + km;
	 client.publish(topic, val); 
	
  },
  'addeventkm' : function(data) {
	 return  commande.insert(data);
	  
  }, 'removeeventkm': function(data) {
	return commande.remove(data);
  },
  'uptageeventkm': function(c, heure, dure) {
	  commande.update(c, {$set : { heure, dure}});
	  
	  
  },
"addserre": function(id, nom) {
	console.log(this.userId);
	ser = serre.findOne({serre: id});
	console.log(ser);
		if(ser) {
	return Meteor.users.update(this.userId, { $push: { "profile.serre" : {"_id":id,nom}}});
		} else {
			return 0;
		}
	
	

},
"removeserre": function(id, nom) {
	console.log(this.userId);
	return Meteor.users.update(this.userId, { $pull: { "profile.serre" : {"_id":id,nom}}});

},
"updateserre": function(id, nom, newv) {
	console.log(this.userId);
	
	Meteor.users.update(this.userId, { $pull: { "profile.serre" : {"_id":id,nom}}});
	
	return Meteor.users.update(this.userId, { $push: { "profile.serre" : {"_id":id,"nom":newv}}});

},
"updatekm": function(device, data) {
	//dbstatus.update({device}, { $pull: {  type }});
	dbstatus.update({device}, { $set: data })
	
},
"updatealarm": function(device, data) {
	//dbstatus.update({device}, { $pull: {  type }});
	dbstatus.update({device}, { $set: data })
	
}
	
	
	
	 
	
})

});




	

Meteor.publish('data', function(serre) {
	return data.find({serre}, {sort: {date: -1}, limit: 100});
});

Meteor.publish('status', function(serre) {
	return dbstatus.find({'device':serre});
});

Meteor.publish('command', function(serre) {
	return commande.find({'device':serre});
});

Meteor.publish('serre', function() {
	return serre.find();
});

Meteor.publish('img', function(device) {
	return img.find({device}, {sort: {date: -1}, limit: 8});
});

Meteor.publish('sensordata', function(device) {
	return sensordata.find({device}, {sort: {date: -1}, limit: 2000});
});

Meteor.publish('getalarm', function(device) {
	return alarm.find({device}, {sort: {date: -1}, limit: 20});
});