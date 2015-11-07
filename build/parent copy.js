$(document).ready(function(){

  Ractive.components.home = Ractive.extend({
    template:'#home'
});


  $.getJSON('/sample', function(res){

    var ractive = new Ractive.components[location.pathname.split('/')[1]]({
      el:'#load',
      data:res
    });

    });


    //Code below here




  });
