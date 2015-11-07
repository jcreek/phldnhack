$(document).ready(function(){

  Ractive.components.home = Ractive.extend({
    template:'#home'
});


  $.getJSON('/sample', function(res){

    var ractive = new Ractive.components.home({
      el:'#load',
      data:res
    });

    });


    //Code below here




  });
