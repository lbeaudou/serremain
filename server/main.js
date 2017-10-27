import { Meteor } from 'meteor/meteor';

data = new Mongo.Collection('data');
dbstatus = new Mongo.Collection('status');
commande = new Mongo.Collection('commande');
serre = new Mongo.Collection('serre');

Meteor.startup(() => {
	serre.insert({"serre": "esp32_0C6E7", date: new Date()});
 var mqtt = require('mqtt'); 

var client = mqtt.connect('mqtt://broker.mqttdashboard.com:1883');

client.subscribe('serre/#'); 

client.on('message', Meteor.bindEnvironment(function (topic, message, f) {  
if(topic.includes('serre/cp/')) {
Meteor.call('insert', topic.toString(), message.toString());
console.log(message.toString())
}
console.log(topic);
if(topic.includes('serre/status/')) {
	m = JSON.parse(message);
	console.log(m)
doc = dbstatus.findOne({device:m.device});

doc ? dbstatus.update({device: m.device}, {$set: {"km_1":m.km_1,"km_2":m.km_2,"km_3":m.km_3,"km_4":m.km_4}})  : dbstatus.insert(m);
}

if(topic.includes('serre/img/')) {
	topic = topic.replace('serre/img/', '');
t = topic.split('/');
serre = t[0];
doc = dbstatus.findOne({device:serre});

doc ? dbstatus.update({device: serre}, {$set: {"img":message.toString(), date: new Date()}})  : dbstatus.insert({"device":serre, "img":message.toString()});
}

}));


Meteor.methods({
  'insert':function(topic, message) {
topic = topic.replace('serre/cp/', '');
t = topic.split('/');
serre = t[0];
type = t[1];
	 data.insert({date:new Date(), serre, type, message});
	
  },'km':function(km, val) {
	topic = 'serre/km/esp32_0C6E78/' + km;
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
"updatekm": function(device, type, data) {
	dbstatus.update({device}, { $pull: { events :{ type }}});
	dbstatus.update({device}, { $push: { events : data }})
	
}
	
	
	
	 
	
})

});




	

Meteor.publish('data', function(serre) {
	return data.find({serre}, {sort: {date: -1}, limit: 100});
});

Meteor.publish('status', function() {
	return dbstatus.find();
});

Meteor.publish('command', function() {
	return commande.find();
});