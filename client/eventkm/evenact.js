Template.event.events({
	'change #event_km_pompe, change .lvlhum_pompe': function(e) {
		console.log(this.toString());
		where = this.toString();
		
		data = {
			type : "km_pompe",
			value_checked: $('#event_km_pompe').prop('checked'),
			value_hum_pour : $('.lvlhum_pompe').val()
			
		}
		Meteor.call('updatekm', where, "km_pompe", data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #event_km_ventil, change .lvltemp_ventil, change .lvlspeed_ventil':function(e) {
		console.log(this.toString());
		where = this.toString();
		data = {
			type : "km_ventil",
			value_checked: $('#event_km_ventil').prop('checked'),
			value_temp_pour : $('.lvltemp_ventil').val(),
			value_speed_pour : $('.lvlspeed_ventil').val()
			
		}
		Meteor.call('updatekm', where, "km_ventil", data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #event_km_extra, change .lvltemp_extra, change .lvlspeed_extra':function(e) {
		console.log(this.toString());
		where = this.toString();
		data = {
			type : "km_extra",
			value_checked: $('#event_km_extra').prop('checked'),
			value_temp_pour : $('.lvltemp_extra').val(),
			value_speed_pour : $('.lvlspeed_extra').val()
			
		}
		Meteor.call('updatekm', where, "km_extra", data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #event_km_lum, change .lvllum_lum':function(e) {
		console.log(this.toString());
		where = this.toString();
		data = {
			type : "km_lum",
			value_checked: $('#event_km_lum').prop('checked'),
			value_lum_lux : $('.lvllum_lum').val(),
			
			
		}
		Meteor.call('updatekm', where, "km_lum", data, function(e, r) {
		console.log(e);		
		console.log(r);		
	});
		
		
		
	},
	'change #event_camera, click .picker__close':function(e) {
		console.log(this.toString());
		where = this.toString();
		data = {
			type : "camera",
			value_checked: $('#event_camera').prop('checked'),
			value_hour : $('.hour_camera').val(),
			
			
		}
		Meteor.call('updatekm', where, "camera", data, function(e, r) {
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
	
	
	
	
		for(i in tb.events) {
			console.log(tb.events[i].type);
			switch(tb.events[i].type) {
    case "km_pompe":
          $('#event_km_pompe').prop('checked', tb.events[i].value_checked);
		  $('.lvlhum_pompe').val(tb.events[i].value_hum_pour)
        break;
    case "km_ventil":
        $('#event_km_ventil').prop('checked', tb.events[i].value_checked);
		$('.lvltemp_ventil').val(tb.events[i].value_temp_pour);
		$('.lvlspeed_ventil').val(tb.events[i].value_speed_pour);
	
        break;
		
	case "km_extra":
        $('#event_km_extra').prop('checked', tb.events[i].value_checked);
		$('.lvltemp_extra').val(tb.events[i].value_temp_pour);
		$('.lvlspeed_extra').val(tb.events[i].value_speed_pour);
	
        break;

	
	case "km_lum":
        $('#event_km_lum').prop('checked', tb.events[i].value_checked);
		$('.lvllum_lum').val(tb.events[i].value_lum_lux);

	
        break;
		
	case "camera":
        $('#event_camera').prop('checked', tb.events[i].value_checked);
		$('.hour_camera').val(tb.events[i].value_hour);
	 $('.timepicker').pickatime({
		 editable:true,
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable

 
  });

	
        break;
    default:
       
}
	
	
}
}


