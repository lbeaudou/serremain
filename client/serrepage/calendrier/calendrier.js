Template.calendrier.helpers({
	'pompe': function() {
		
		return commande.find();
	},
	'h': function(day, heure) {
		
console.log(this);
date = new Date();
offset = (date.getDay() + 6) % 7;
console.log(offset);
d = offset+parseInt(day)-1;
h= parseInt(heure)+4;


datea = new Date(date.getFullYear(), date.getMonth(), date.getDate()-offset+parseInt(day)-1, heure);
datee = new Date(date.getFullYear(), date.getMonth(), date.getDate()-offset+parseInt(day)-1, h);

console.log("day " + d + " heure " + heure + "  " + datea);
console.log("day " + d + " heure " + heure + "  " + datee);
// console.log(datef);
v = sensordata.find({"date":{"$gte":datea, "$lte": datee}}, {sort: {date: -1}}).fetch();
		var n = v.length; 
        var temp = 0;
        var tab_temp = []
        var temp_eau = 0;
        var tab_temp_eau = []
		var ht = 0;
		var tab_ht = []
		var humidity = 0;
		var tab_humidity = []
		var lum = 0;
		var tab_lum = []
		var amp = 0;
		var tab_amp = []
		if(v !=0) {
        for(i=0; i<n; i++) {
        	console.log(v[i])
                temp += parseInt(v[i].temp);
                if(v[i].temp) {
                		tab_temp.push(v[i].temp);
                	}
                 temp_eau += parseInt(v[i].temp_eau);
                if(v[i].temp_eau) {
                		tab_temp_eau.push(v[i].temp_eau);
                	}
                ht += parseInt(v[i].ht);
                if(v[i].ht) {
                		tab_ht.push(v[i].ht);
                	}
                humidity += parseInt(v[i].humidity);
                if(v[i].humidity) {
                		tab_humidity.push(v[i].humidity);
                	}
                lum += parseInt(v[i].lum);
                if(v[i].lum) {
                		tab_lum.push(v[i].lum);
                	}
                amp += parseInt(v[i].amp);
                if(v[i].amp) {
                		tab_amp.push(v[i].amp);
                	}
        }
        console.log(tab_temp)
		temp = Math.round((temp/n*10))/10;
		temp_eau = Math.round((temp_eau/n*10))/10;
		lum =  Math.round((lum/n*10))/10;
	
		ht =  Math.round((ht/n*10))/10;
		amp =  Math.round((amp/n*10))/10;
		humidity =  Math.round((humidity/n*10))/10;
		} else {
			temp = "-";
			temp_eau = "-";
			lum = "-";
			ht = "-";
			humidity = "-";
			amp = "-";
		}
		console.log(temp)
		return color(temp, 20, 30, "°C") + tendance(tab_temp) +"<br>" + color(ht, 20, 80,"%") + tendance(tab_ht) +"<br>" + color(humidity, 20, 70,"%") + tendance(tab_humidity) +"<br>" + color(lum, 1000, 50000,"lux") + tendance(tab_lum) +"<br>" + color(amp, 20, 300,"W")+tendance(tab_amp) + "<br>" + color(temp_eau, 20, 300,"°C") + tendance(tab_temp_eau);
		},
't': function(heure) {
		

date = new Date();
h= parseInt(heure)+4;


datea = new Date(date.getFullYear(), date.getMonth(), date.getDate(), heure);
datee = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h);

console.log(" heure " + heure + "  " + datea);
console.log(" heure " + heure + "  " + datee);
// console.log(datef);
v = sensordata.find({"date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var temp = 0;
        var tab_temp = []
        var temp_eau = 0;
        var tab_temp_eau = []
		var ht = 0;
		var tab_ht = []
		var humidity = 0;
		var tab_humidity = []
		var lum = 0;
		var tab_lum = []
		var amp = 0;
		var tab_amp = []
		if(v !=0) {
        for(i=0; i<n; i++) {
        	console.log(v[i])
                temp += parseInt(v[i].temp);
                if(v[i].temp) {
                		tab_temp.push(v[i].temp);
                	}
                 temp_eau += parseInt(v[i].temp_eau);
                if(v[i].temp_eau) {
                		tab_temp_eau.push(v[i].temp_eau);
                	}
                ht += parseInt(v[i].ht);
                if(v[i].ht) {
                		tab_ht.push(v[i].ht);
                	}
                humidity += parseInt(v[i].humidity);
                if(v[i].humidity) {
                		tab_humidity.push(v[i].humidity);
                	}
                lum += parseInt(v[i].lum);
                if(v[i].lum) {
                		tab_lum.push(v[i].lum);
                	}
                amp += parseInt(v[i].amp);
                if(v[i].amp) {
                		tab_amp.push(v[i].amp);
                	}
        }
        console.log(tab_temp)
		temp = Math.round((temp/n*10))/10;
		temp_eau = Math.round((temp_eau/n*10))/10;
		lum =  Math.round((lum/n*10))/10;
	
		ht =  Math.round((ht/n*10))/10;
		amp =  Math.round((amp/n*10))/10;
		humidity =  Math.round((humidity/n*10))/10;
		} else {
			temp = "-";
			temp_eau = "-";
			lum = "-";
			ht = "-";
			humidity = "-";
			amp = "-";
		}
		console.log(temp)
		return color(temp, 20, 30, "°C") + tendance(tab_temp) +"<br>" + color(ht, 20, 80,"%") + tendance(tab_ht) +"<br>" + color(humidity, 20, 70,"%") + tendance(tab_humidity) +"<br>" + color(lum, 1000, 50000,"lux") + tendance(tab_lum) +"<br>" + color(amp, 20, 300,"W")+tendance(tab_amp) + "<br>" + color(temp_eau, 20, 300,"°C") + tendance(tab_temp_eau);
		},
		
})

Template.calendrier.events({
	'click .template-pompe': function() {


			addeventkm('pompe', 0, "2800");
			addeventkm('pompe', 36000, "1800");
			addeventkm('pompe', 57600, "2800");

	},
	
	'click .del': function() {
		
		// commande.remove(this);
		console.log(this);
		Meteor.call('removeeventkm', this);
	},
	'dragstop .datepompe': function(e) {
		console.log(this);
		console.log(e);
		
		target = e.currentTarget;
		pxtop = $(target).position();
		pxtop = pos.top;
		pxheight = $(target).height();
		console.log(pxtohournum(pxtop));
		console.log(pxheight);
		Meteor.call('uptageeventkm',this, pxtohournum(pxtop), pxtohournum(pxheight));
	},
	
	'drag .datepompe': function(e) {
		console.log(this);
		console.log(e);
		
		target = e.currentTarget;
		pos = $(target).position()
		pxtop = pos.top;
		pxheight = target.offsetHeight;
	
		console.log('heure :' + pxtohournum(pxtop));
		  // $('.' + this._id).find('.heure').text(pxtohournum(pxtop));
		  $(target).find('.heure').text(pxtohour(pxtop));
	},
	'resizestop .datepompe':function(e) {
		console.log(this);
		console.log(e);
		
	
		target = e.currentTarget;
		pos = $(target).position();
		pxtop = pos.top;
		pxheight = $(target).height();
		console.log(pxtop);
		console.log(pxheight);
		Meteor.call('uptageeventkm',this, pxtohournum(pxtop), pxtohournum(pxheight));
		
		
		
	},
	'resize .datepompe':function(e) {
		console.log(this);
		console.log(e);
		
		target = e.currentTarget;
		pos = $(target).height();
		$(target).find('.dure').text(pxtohour(pos));
	}
	
	
	
})
function tendance(tab) {
	if(tab.length>1) {
last = tab.length-1;
if(tab[last]>=tab[0]) {
	return '<i class="material-icons">arrow_upward</i>';
} else{
	return '<i class="material-icons">arrow_downward</i>';
}

} else{
	return '';
}}
function color(val, s1, s2, unit) {
	if(val != 'n/a') {
	if(val < s1) {
		return "<span class='blue  lighten-3'>"+val+" " + unit +"</span>";
	} else {
		
		if(val >=s1 && val <s2) {
			return "<span class='green  lighten-3'>"+val+" " + unit +"</span>";
		} else {
			
			return "<span class='red  lighten-3'>"+val+" " + unit +"</span>";
			
		}
		
	}
	} else {
		return "<span class='grey-text'>"+val+" " + unit +"</span>";
	}
	
}