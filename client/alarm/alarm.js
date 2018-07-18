Template.alarm.events({
	'change #alarm_niveau_eau': function(e) {
		
		where = this.toString();
		
		data = { alarm_niveau_eau :{
			type : "alarm_niveau_eau",
			value_checked: $('#alarm_niveau_eau').prop('checked'),
			
			
		}}
		Meteor.call('updatealarm', where,  data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #alarm_temp_eau, change .alarm_temp_eau_bas, change .alarm_temp_eau_haut':function(e) {
		
		where = this.toString();
		data = { alarm_temp_eau : {
			type : "alarm_temp_eau",
			value_checked: $('#alarm_temp_eau').prop('checked'),
			value_temp_bas : $('.alarm_temp_eau_bas').val(),
			value_temp_haut : $('.alarm_temp_eau_haut').val()
			
		}}
		Meteor.call('updatealarm', where,  data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});

		
		
		
	
		
		
	},
	'change #alarm_temp_air, change .alarm_temp_air_bas, change .alarm_temp_air_haut, change .alarm_temp_air_monter':function(e) {
		
		where = this.toString();
		data = { alarm_temp_air : {
			type : "alarm_temp_air",
			value_checked: $('#alarm_temp_air').prop('checked'),
			value_temp_bas : $('.alarm_temp_air_bas').val(),
			value_temp_haut : $('.alarm_temp_air_haut').val(),
			value_temp_monter : $('.alarm_temp_air_monter').val()
			
		}}
		Meteor.call('updatealarm', where,  data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
		
	
		
		
	},
	'change #alarm_lum, change .alarm_lum_luxh':function(e) {
		
		where = this.toString();
		data = { alarm_lum : {
			type : "alarm_lum",
			value_checked: $('#alarm_lum').prop('checked'),
			value_lum_luxh: $('.alarm_lum_luxh').val(),
			
			
		}}
		Meteor.call('updatealarm', where,  data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
		
	
		
		
	},


	
	
	
	
	
	
})

// Template.event.helpers({
	
	
	
	
// })


Template.alarm.onRendered(function() {

	console.log(this.data)
	dbstatus.find({device:this.data}).observeChanges({
    
	'added': actualisealarm,
	'changed': actualisealarm

}) 
});


function actualisealarm(id, tb) {
	console.log(tb)
	if('alarm_niveau_eau' in tb) {
		$('#alarm_niveau_eau').prop('checked', tb.alarm_niveau_eau.value_checked);
	}
	if('alarm_temp_eau' in tb) {
 		$('#alarm_temp_eau').prop('checked', tb.alarm_temp_eau.value_checked);
		$('.alarm_temp_eau_bas').val(tb.alarm_temp_eau.value_temp_bas);
		$('.alarm_temp_eau_haut').val(tb.alarm_temp_eau.value_temp_haut);
	}
	if('alarm_temp_air' in tb) {
$('#alarm_temp_air').prop('checked', tb.alarm_temp_air.value_checked);
		$('.alarm_temp_air_bas').val(tb.alarm_temp_air.value_temp_bas);
		$('.alarm_temp_air_haut').val(tb.alarm_temp_air.value_temp_haut);
		$('.alarm_temp_air_monter').val(tb.alarm_temp_air.value_temp_monter);
	}
	if('alarm_lum' in tb) {
		$('#alarm_lum').prop('checked', tb.alarm_lum.value_checked);
		$('.alarm_lum_luxh').val(tb.alarm_lum.value_lum_luxh);
	
	}

	


	


}


Template.showalarm.helpers({

	'alarm': function() {

			return alarm.find();

	}


})

