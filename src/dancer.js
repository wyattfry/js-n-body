var Dancer = function createDancer(top, left, timeBetweenSteps) {
  this.$node = $('<span class="dancer"></span>');
  this.timeInterval = timeBetweenSteps;
  
  Dancer.prototype.step.call(this);
  Dancer.prototype.setPosition.call(this, top, left);
};
  
Dancer.prototype.step = function() {

  setTimeout(this.step.bind(this), this.timeInterval);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};