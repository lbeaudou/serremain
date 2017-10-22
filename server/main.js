import { Meteor } from 'meteor/meteor';

data = new Mongo.Collection('data');
dbstatus = new Mongo.Collection('status');
commande = new Mongo.Collection('commande');

Meteor.startup(() => {
 var mqtt = require('mqtt'); 

var client = mqtt.connect('mqtt://broker.mqttdashboard.com:1883');

client.subscribe('serre/#'); 

client.on('message', Meteor.bindEnvironment(function (topic, message) {  
if(topic.includes('serre/cp/')) {
Meteor.call('insert', topic.toString(), message.toString());
console.log(message.toString())
}

if(topic.includes('serre/status/')) {
	m = JSON.parse(message);
	console.log(m)
doc = dbstatus.findOne({device:m.device});

doc ? dbstatus.update({device: m.device}, {$set: {"km_1":m.km_1,"km_2":m.km_2,"km_3":m.km_3,"km_4":m.km_4}})  : dbstatus.insert(m);
}

}));


Meteor.methods({
  'insert':function(topic, message) {

	 data.insert({date:new Date(), topic, message});
	
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
	  
	  
  }
	 
	
})

});




	

Meteor.publish('data', function() {
	return data.find({}, {sort: {date: -1}, limit: 100});
});

Meteor.publish('status', function() {
	return dbstatus.find();
});

Meteor.publish('command', function() {
	return commande.find();
});