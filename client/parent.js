$(document).ready(function(){

  @@include('components.js')

  $.getJSON('/sample', function(res){

    var ractive = new Ractive.components.home({
      el:'#load',
      data:res
    });

    });


    //Code below here




  });
