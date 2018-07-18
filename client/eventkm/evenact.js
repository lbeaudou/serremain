Template.event.events({
	'change #event_km_pompe, change .lvlhum_pompe': function(e) {
		console.log(this.toString());
		where = this.toString();
		
		data = { pompe :{
			type : "km_pompe",
			value_checked: $('#event_km_pompe').prop('checked'),
			value_hum_pour : $('.lvlhum_pompe').val()
			
		}}
		Meteor.call('updatekm', where, data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #event_km_ventil, change .lvltemp_ventil, change .lvlspeed_ventil':function(e) {
		console.log(this.toString());
		where = this.toString();
		data = { ventilation : {
			type : "km_ventil",
			value_checked: $('#event_km_ventil').prop('checked'),
			value_temp_pour : $('.lvltemp_ventil').val(),
			value_speed_pour : $('.lvlspeed_ventil').val()
			
		}}
		Meteor.call('updatekm', where,  data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #event_km_extra, change .lvltemp_extra, change .lvlspeed_extra':function(e) {
		console.log(this.toString());
		where = this.toString();
		data = {  extraction : {
			type : "km_extra",
			value_checked: $('#event_km_extra').prop('checked'),
			value_temp_pour : $('.lvltemp_extra').val(),
			value_speed_pour : $('.lvlspeed_extra').val()
			
		}}
		Meteor.call('updatekm', where,  data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #event_km_lum, change .lvllum_lum':function(e) {
		console.log(this.toString());
		where = this.toString();
		data = { lum :{
			type : "km_lum",
			value_checked: $('#event_km_lum').prop('checked'),
			value_lum_lux : $('.lvllum_lum').val(),
			
			
		}}
		Meteor.call('updatekm', where,  data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #event_camera, click .picker__close':function(e) {
		console.log(this.toString());
		where = this.toString();
		data = { camera : {
			type : "camera",
			value_checked: $('#event_camera').prop('checked'),
			value_hour : $('.hour_camera').val(),
		}
			
			
		}
		Meteor.call('updatekm', where, data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	
	
	
	
	
	
})

// Template.event.helpers({
	
	
	
	
// })


Template.event.onRendered(function() {

	console.log(this.data)
	dbstatus.find({device:this.data}).observeChanges({
    
	'added': actualise,
	'changed': actualise

}) 
});


function actualise(id, tb) {
	
	if('lum' in tb) {
		$('#event_km_lum').prop('checked', tb.lum.value_checked);
		$('.lvllum_lum').val(tb.lum.value_lum_lux);
	}
	if('camera' in tb) {
 $('#event_camera').prop('checked', tb.camera.value_checked);
		$('.hour_camera').val(tb.camera.value_hour);
	}
	
if('pompe' in tb) {
	  $('#event_km_pompe').prop('checked', tb.pompe.value_checked);
		  $('.lvlhum_pompe').val(tb.pompe.value_hum_pour);
		}
		  if('ventilation' in tb) {
	$('#event_km_ventil').prop('checked', tb.ventilation.value_checked);
		$('.lvltemp_ventil').val(tb.ventilation.value_temp_pour);
		$('.lvlspeed_ventil').val(tb.ventilation.value_speed_pour);
}

	


	


}


