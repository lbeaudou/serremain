
data = new Mongo.Collection('data');
dbstatus = new Mongo.Collection('status');
commande = new Mongo.Collection('commande');
Template.info.helpers({
	'temp': function() {
		val = data.findOne({type:"temp"}, {sort: {date: -1, limit: 1}})

		if(val != undefined) {
		return Math.round(val.message*100)/100;
		} else {
			return 0;
		}
		
	},
	'humity': function() {
		val = data.findOne({type:"humity"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return Math.round(val.message*100)/100;
		} else {
			return 0;
		}
	},
	'ht': function() {
		val = data.findOne({type:"ht"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  Math.round(val.message*100)/100;
		} else {
			return 0;
		}
	},
	'lum': function() {
		val = data.findOne({type:"lum"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  parseInt(val.message * 400);
		} else {
			return 0;
		}
		
	},
	
	'wath': function() {
		val = data.findOne({type:"amp"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  parseInt(val.message*0.001);
		} else {
			return 0.1;
		}
		
	},
	
	'date': function() {
		val = data.findOne({type:"serre/cp/esp32_0C6E78/lum"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  val.date;
		} else {
			return 0;
		}
		
	},
	'lvleau': function() {
		val = data.findOne({type:"serre/cp/esp32_0C6E78/lvleau"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  val.date;
		} else {
			return 0;
		}
		
	},
	'lvltropplein': function() {
		val = data.findOne({type:"serre/cp/esp32_0C6E78/lvltropplein"}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  val.date;
		} else {
			return 0;
		}
		
	},
	'img': function() {
		
	val = dbstatus.findOne({"device":"esp32_0C6E78"})['img'];
	console.log(val);
	if(val!='') {
	return val;
	} else {
		return '';
	}
	},
	
	
});


Template.graph.onRendered(function() {
	
drawgraph('temp', 1);
drawgraph('humity', 1);
drawgraph('lum', 1);
drawgraph('ht', 1);
	
	
	 
})

Template.picture.onRendered(function() {
	
$('.carousel').carousel({
	
	noWrap:true,
	indicators:true
});
	
	
	 
})

function addeventkm(type, heure, dure) {
	
	data = {
		'km':type,
		'heure':heure,
		'dure':dure
		
		
		
	}
	
	Meteor.call('addeventkm', data, function(e, r) {
		console.log(r);		
	});
	
}
function hourtopx(hour) {
valh = 60;
	h = (hour - (hour % 3600))/3600;
	minute = hour % 3600;
	px = h *60 + (minute/60);

	console.log(px);
	return(px);
}
function pxtohour(px) {
valh = 60;
	hour = (px - px % valh) / valh;
	minute = ((px % valh)*60)/valh;

	return(hour + " h " + minute);
}

function pxtohournum(px) {
valh = 60;
	hour = (px - px % valh) / valh;
	console.log(hour);
	minute = ((px % valh)*60)/valh;
	console.log(minute);
	sec = hour * 3600 + minute * 60;
	console.log(sec);
	return(sec);
}

Template.calendrier.events({
	
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
v = data.find({type : "temp",  "date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var somme = 0;
		if(v ==0) {
			temp =  'n/a';
		} else {
        for(i=0; i<n; i++) {
                somme += parseInt(v[i].message);
        }
		temp = Math.round((somme/n*10))/10;
		}
v = data.find({type : "lum",  "date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var somme = 0;
		if(v ==0) {
			lum =  'n/a';
		} else {
        for(i=0; i<n; i++) {
                somme += parseInt(v[i].message);
        }
		lum = Math.round(((somme/n*10)/10)*400);
		}
v = data.find({type : "ht",  "date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var somme = 0;
		if(v ==0) {
			ht =  'n/a';
		} else {
        for(i=0; i<n; i++) {
                somme += parseInt(v[i].message);
        }
		ht = Math.round((somme/n*10))/10;
		}

v = data.find({type : "humity",  "date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var somme = 0;
		if(v ==0) {
			humity =  'n/a';
		} else {
        for(i=0; i<n; i++) {
                somme += parseInt(v[i].message);
        }
		humity = Math.round((somme/n*10))/10;
		}
		
		return color(temp, 20, 30, "°C") + "<br>" + color(ht, 20, 80,"%") + "<br>" + color(humity, 20, 70,"%") + "<br>" + color(lum, 1000, 50000,"lux") + "";
		},
		't': function(heure) {
		

date = new Date();
h= parseInt(heure)+4;


datea = new Date(date.getFullYear(), date.getMonth(), date.getDate(), heure);
datee = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h);

console.log(" heure " + heure + "  " + datea);
console.log(" heure " + heure + "  " + datee);
// console.log(datef);
v = data.find({type : "temp",  "date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var somme = 0;
		if(v ==0) {
			temp =  'n/a';
		} else {
        for(i=0; i<n; i++) {
                somme += parseInt(v[i].message);
        }
		temp = Math.round((somme/n*10))/10;
		}
v = data.find({type : "lum",  "date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var somme = 0;
		if(v ==0) {
			lum =  'n/a';
		} else {
        for(i=0; i<n; i++) {
                somme += parseInt(v[i].message);
        }
		lum = Math.round(((somme/n*10)/10)*400);
		}
v = data.find({type : "ht",  "date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var somme = 0;
		if(v ==0) {
			ht =  'n/a';
		} else {
        for(i=0; i<n; i++) {
                somme += parseInt(v[i].message);
        }
		ht = Math.round((somme/n*10))/10;
		}

v = data.find({type : "humity",  "date":{"$gte":datea, "$lte": datee}}).fetch();
		var n = v.length; 
        var somme = 0;
		if(v ==0) {
			humity =  'n/a';
		} else {
        for(i=0; i<n; i++) {
                somme += parseInt(v[i].message);
        }
		humity = Math.round((somme/n*10))/10;
		}
		
		return color(temp, 20, 30, "°C") + "<br>" + color(ht, 20, 80,"%") + "<br>" + color(humity, 20, 70,"%") + "<br>" + color(lum, 1000, 50000,"lux") + "";
		},
		
	}


)

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

Template.serre.onRendered(function() {
	console.log(this);
})
Template.allserre.onRendered(function() {
	$('.modal').modal();
});

Template.allserre.events({
	'submit .ajouter_serre': function(e) {
		e.preventDefault();		
		target = e.target;
		id = target.idserre.value;
		nom = target.nameserre.value;
		if(id != '' && nom != '') {
			
			console.log(id);
			console.log(nom);
			if(Meteor.user()) {
			Meteor.call('addserre', id, nom, function(e, r) {
				console.log(e);
				console.log(r);
				if(r == 0) {
					
					$('#idserre').removeClass("valid");
					$('#idserre').addClass("invalid");
				} else {
					if(r == 1) {
						$('.ajouter_serre')[0].reset();
						$('.modal').modal('close');
						
						
					}
					
				}
				
			})
			
			}
			
		}
	},
	'click .delserre': function()  {
		
		if(Meteor.user()) {
			conf = confirm('Voullez vous supprimer la serre ' + this.nom+' ?', 'Oui', 'Non');
			if(conf) {
			Meteor.call('removeserre', this._id, this.nom, function(e, r) {
				console.log(e);
				console.log(r);
				
			})
			}
		}
		
		
	},
	'change .noms':function(e) {
		if(Meteor.user()) {
			newv = e.currentTarget.value;
			console.log(this);
			Meteor.call('updateserre', this._id, this.nom, newv, function(e, r) {
				console.log(e);
				console.log(r);
				
			})
		}
		
	}
	
	
});

Template.allserre.helpers({
	'serre': function() {
		console.log(Meteor.users.find(Meteor.user).fetch());
		val = Meteor.users.findOne(Meteor.user);
		return val.profile.serre;
		
	}
	
})
	
	Template.calendrier.onRendered(function() {
		console.log(this);
	$( "#tabs" ).tabs();
	$( "#tabsweekday" ).tabs();
	
	 $(".objectpompe").draggable({
    	helper:'clone',  containment: "#pompeCanvas", 
    });  
	  
	  $("#pompeCanvas").droppable({
        accept: ".objectpompe",
        drop: function(event,ui){
			
    
           
			
          console.log(event);
          console.log(ui);
			base = $("#pompeCanvas").offset();
			drag = ui.offset.top;
			console.log(base);
			console.log(drag);
			topt = drag - base.top;
		 

///			
			addeventkm('pompe', pxtohournum(topt), "1800");
        }
    });
	
commande.find().observeChanges({
    added: function(id, doc) {
       
		$('.'+id).find('.heure').text(pxtohour(hourtopx(doc.heure)));
		$('.'+id).find('.dure').text(pxtohour(hourtopx(doc.dure)));
		$('.'+id).css({"left": "0", "top":hourtopx(doc.heure), "height":hourtopx(doc.dure), "position":"absolue"}); 
		$('.'+id).draggable({axis: "y", containment: "#pompeCanvas",scroll: false,
			drag: function() {
				pos = $(this).position();
				
				
				},
			
				});
		$('.'+id).resizable({
      grid: 0, maxWidth : 250, minWidth : 250
    });
		

			},
	changed:function(id, doc) {
       
	
		
		$('.'+id).css({"left": "0", "top":hourtopx(doc.heure), "height":hourtopx(doc.dure, "position":"absolue")}); 
		$('.'+id).draggable({axis: "y", containment: "#pompeCanvas",scroll: false,
			drag: function() {
				// pos = $(this).position();
				 // $(this).find('.heure').text(hourtopx(doc.heure));
				},
			
				});

			},
});
function getMonday() {
	var date=new Date()
	var offset = (date.getDay() + 6) % 7;
	var ldate = new Date(date.getFullYear(), date.getMonth(), date.getDate()-offset);
	var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
var tab_mois=new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
	return tab_jour[ldate.getDay()] + ' ' + ldate.getDate() + ' ' + tab_mois[ldate.getMonth()];
}
	console.log(getMonday());


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
	
	
	var type = mesure;
	classmesure = '.graphique' + mesure;
	limit = 50;
	val = data.find({type}, {sort: {date: 1}, limit}).fetch();
	valt = data.find({type}, {sort: {date: 1}, limit});
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
	
	data.find({type}).observeChanges({
   addedBefore: function () {
		
			val = data.find({type}, {sort: {date: 1}, limit}).fetch();
			// console.log(val);
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




