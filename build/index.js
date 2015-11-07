$(document).ready(function(){

  Ractive.components.parent = Ractive.extend({
    template:'#parent'
});

Ractive.components.teacher = Ractive.extend({
    template:'#teacher'
});


  $.getJSON('/data/'+location.pathname.split('/').slice(3).join('/'), function(res){

    var ractive = new Ractive.components[location.pathname.split('/')[2]]({
      el:'#load',
      data:res
    });

    });


    //Code below here




  });
