Template.mainpage.onRendered(function() {
	 $('.pushpin-demo-nav').each(function() {
    var $this = $(this);
    var $target = $('#' + $(this).attr('data-target'));
    $this.pushpin({
      top: $target.offset().top,
      bottom: $target.offset().top + $target.outerHeight() - $this.height()
    });
  });
	
      $('.slider').slider();
 $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
        console.log(modal, trigger);
      },
      complete: function() { alert('Closed'); } // Callback for Modal close
    }
  );

	 $('#modal1').modal('open');
	
        
	
    Materialize.updateTextFields();
 
});


Template.mainpage.events({
	'click .emailsend': function()  {
		
		$('#modal1').modal('close');
		
	},
	
	
	
	
	
	
})