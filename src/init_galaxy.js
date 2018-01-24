$(document).ready(function() {
  window.masses = [];
  
  //Sun initiation
  var SUN = new Mass(
    1e7,
    $("body").width() * 0.5,
    $("body").height() * 0.5,
    
    //direction
    ((Math.random() * 2) - 1) * Math.PI,
    //velocity
    0  
  );
  $('body').append(SUN.$node);
  window.masses.push(SUN);

  // gaussian function for normal distribution
  var gaussian = function gaussianRand() {
    var rand = 0;

    for (var i = 0; i < 6; i += 1) {
      rand += Math.random();
    }

    return rand / 6;
  };
  
  // pythagorean theorem: return length of hypotenuse
  var pythag = function(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); 
  };
  
  //Add mass dependent on function
  $('.addMassButton').on('click', function(event) {

    var massMakerFunctionName = $(this).data('mass-maker-function-name');

    // get the maker function for the kind of planet we're supposed to make
    var massMakerFunction = window[massMakerFunctionName];
    
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

  var downX, downY, ll;
  //click on map to create planet with velocity
  $('body').on('mousedown', function() {
    downX = event.pageX;
    downY = event.pageY;
    ll = new LaunchLine(downX, downY - 35);
    $('body').append(ll.$node);
  });
  
  $('body').on('mousemove', function() {
    if (ll) {
    
      ll.redraw.call(ll, event.pageX, event.pageY - 35);
      console.log(ll.$lineNode);
    }
  });
  
  $('body').on('mouseup', function(event) {
    //removes launch line
    
    ll.$node.remove();
    ll = undefined;
    
    //initiate velocity and direction for new mass
    var upX = event.pageX;
    var upY = event.pageY;
    var velocity = pythag(downX - upX, downY - upY);
    var direction = Math.atan2(downY - upY, downX - upX);
    
    var mass = new MassWithTrail(
      gaussian() * 40000, downX, downY,
      direction,
      velocity
    );
    $('body').append(mass.$resultNode);
    window.masses.push(mass);
  });
});

