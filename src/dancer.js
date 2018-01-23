// Creates and returns a new dancer object that can step
var Dancer = function createDancer(top, left, timeBetweenSteps) {

  // var dancer = {};

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.timeInterval = timeBetweenSteps;
  // dancer.step = function() {
  //   // the basic dancer doesn't do anything interesting at all on each step,
  //   // it just schedules the next step
  //   setTimeout(dancer.step, timeBetweenSteps);
  // };
  // this.step(timeBetweenSteps);
  
  Dancer.prototype.step.call(this);

  // dancer.setPosition = function(top, left) {
  //   // Use css top and left properties to position our <span> tag
  //   // where it belongs on the page. See http://api.jquery.com/css/
  //   //
  //   var styleSettings = {
  //     top: top,
  //     left: left
  //   };
  //   dancer.$node.css(styleSettings);
  // };

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  //this.setPosition(top, left);
  Dancer.prototype.setPosition.call(this, top, left);

  // return dancer;
};
  
Dancer.prototype.step = function() {

  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  console.log(this);
  setTimeout(this.step.bind(this), this.timeInterval);
};

Dancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};