$(document).ready(function(){


  Ractive.plugins.test = $(function($, Ractive){
})(jQuery, Ractive);
Ractive.components.plugintest = Ractive.plugins.test;



  var ractive = new Ractive({
    el:'body',
    template:'#home'
  });
});



