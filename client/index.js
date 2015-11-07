$(document).ready(function(){

  @@include('components.js')

  $.getJSON('/data/'+location.pathname.split('/').slice(3).join('/'), function(res){

    var ractive = new Ractive.components[location.pathname.split('/')[2]]({
      el:'#load',
      data:res
    });

    });


    //Code below here




  });
