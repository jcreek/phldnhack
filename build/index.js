$(document).ready(function(){

  Ractive.components.parent = Ractive.extend({
    template:'#parent'
});

Ractive.components.teacher = Ractive.extend({
    template:'#teacher'
});

// $(document).ready(function(){
//     // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
//     $('.modal-trigger').leanModal({
//       dismissible: false, // Modal can be dismissed by clicking outside of the modal
//       opacity: .5, // Opacity of modal background
//       in_duration: 300, // Transition in duration
//       out_duration: 200, // Transition out duration
//       ready: function() { alert('Ready'); }, // Callback for Modal open
//       complete: function() { alert('Closed'); } // Callback for Modal close
//     }
//   );
//   });

  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
          


  $.getJSON('/data/'+location.pathname.split('/').slice(3).join('/'), function(res){

    var ractive = new Ractive.components[location.pathname.split('/')[2]]({
      el:'#load',
      data:res
    });

    });


    //Code below here




  });
