
data = new Mongo.Collection('data');
dbstatus = new Mongo.Collection('status');
commande = new Mongo.Collection('commande');
serre = new Mongo.Collection('serre');
img = new Mongo.Collection('img');
sensordata = new Mongo.Collection('sensordata');
alarm = new Mongo.Collection('alarmdata');
Template.info.helpers({
	'sensor': function() {

		return sensordata.findOne({}, {sort: {date: -1, limit: 1}});
	},
	'round': function(val) {
		

		
		return Math.round(val*100)/100;
		
		
	},
	
	'date': function() {
		val = data.findOne({}, {sort: {date: -1, limit: 1}})
		if(val != undefined) {
		return  val.date;
		} else {
			return 0;
		}
		
	},
	'lvleau': function(val) {
		
		if(val == "1") {
		return  "<p><i class='material-icons'>battery_charging_full</i></p>";
		} else {
			return  "<p><i class='material-icons'>battery_alert </i></p>";
		}
		
	},
	'img': function() {
		
	val = dbstatus.findOne({"device":this.toString()})['img'];
	
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
	

	
	// $('.materialboxed').materialbox();
	 
})

Template.picture.helpers({
	'image': function() {
		
		return img.find({device: this.toString()}, {sort: {date: -1, limit: 8}});
		
	}
	
	 
})

function addeventkm(type, heure, dure) {
	serre = Session.get('serre')
	data = {
		'device':serre,
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






Template.serre.onRendered(function() {

	console.log(this.data);
	Session.set('serre', this.data);

	
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
	'click .km_1_on, change .lvl_km_1': function() {
	console.log('go');
	m = $('.lvl_km_1').val();
		Meteor.call('km', 'km_1', m.toString());

		
	},'click .km_1_off': function() {
	
		Meteor.call('km', 'km_1', '0');
		
	},
	'click .km_2_on': function() {
	console.log('go');
		Meteor.call('km', 'km_2', '1');
		
	},'click .km_2_off': function() {
	
		Meteor.call('km', 'km_2', '0');
		
	},
	'click .km_3_on, change .lvl_km_3': function() {
	console.log('go');
	m = $('.lvl_km_3').val();
		Meteor.call('km', 'km_3', m.toString());
		
	},
	'click .km_3_off': function() {
	
		Meteor.call('km', 'km_3', '0');
		
	},
	
	
})
Template.command.helpers({
	'km_1': function() {

	val = dbstatus.findOne({"device":this.toString()})['km_1'];
	console.log(val);
	if(val > 0) {
		return true;
	} else {
	return false;
	}
	},
	'km_2': function() {
		
	val = dbstatus.findOne({"device":this.toString()})['km_2'];
	console.log(val);
	if(val > 0) {
		return true;
	} else {
	return false;
	}
	},
	'km_3': function() {
		
	val = dbstatus.findOne({"device":this.toString()})['km_3'];
	console.log(val);
	if(val > 0) {
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




