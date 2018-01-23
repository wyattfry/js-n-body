$(document).ready(function() {
  window.masses = [];

  var SUN = new Mass(
    1e6,
    $("body").width() * 0.5,
    $("body").height() * 0.5,
    
    //direction
    ((Math.random() * 2) - 1) * Math.PI,
    //velocity
    0
  
  );
  
  $('body').append(SUN.$node);
  window.masses.push(SUN);
  
  $('.addMassButton').on('click', function(event) {

    var massMakerFunctionName = $(this).data('mass-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var massMakerFunction = window[massMakerFunctionName];

    // make a dancer with a random position
    var gaussian = function gaussianRand() {
      var rand = 0;

      for (var i = 0; i < 6; i += 1) {
        rand += Math.random();
      }

      return rand / 6;
    };
    var mass = new massMakerFunction(
      gaussian() * 40000,
      $("body").width() * Math.random(),
      $("body").height() * Math.random(),
      
      //direction
      ((Math.random() * 2) - 1) * Math.PI,
      //velocity
      gaussian() * 60
    );
    $('body').append(mass.$resultNode);
    
    window.masses.push(mass);
  });
});

