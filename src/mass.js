var Mass = function createMass(mass, x, y, direction, velocity) {
  this.mass = mass;
  this.x = x;
  this.y = y;  
  this.direction = direction;
  this.velocity = velocity;
  this.dtime = 50;
  
  this.$node = $('<span class="mass"></span>');
  
  this.$visualCoverNode = $('<span class="cover"></span>');

  this.size = Mass.prototype.setSize.call(this);

  this.$resultNode = this.$node.append(this.$visualCoverNode);

  Mass.prototype.setPosition.call(this, x, y);
  Mass.prototype.updatePosition.call(this);
};

Mass.prototype.setSize = function() {
  var size = this.mass / 1000;
  if (size < 3) {
    size = 3;
  } else if (size > 250) {
    size = 250;
  }
  
  this.$visualCoverNode.css({ 'width': size, 'height': size, 'border-radius': size, 'top': -size*0.5 });
  return size;
};

Mass.prototype.setPosition = function(x, y) {
  var styleSettings = {
    top: y,
    left: x
  };
  this.$node.css(styleSettings);
};

Mass.prototype.getDistanceTo = function(otherMass) {

  return Math.sqrt(Math.pow(this.x - otherMass.x, 2) + Math.pow(this.y - otherMass.y, 2)); 
};

Mass.prototype.getAngleTo = function(otherMass) {

  return Math.atan2((otherMass.y - this.y), (otherMass.x - this.x)); 
};

Mass.prototype.updatePosition = function() {
  //fetches from widow
  var massesInGalaxy = window.masses;
  // stores tuples of [mass,distance,angle, gravForce]
  var resultCalculations = [];
  for (var i = 0; i < massesInGalaxy.length; i++) {
    var distanceTo = this.getDistanceTo(massesInGalaxy[i]);
    var tempTuple = [massesInGalaxy[i].mass, distanceTo, this.getAngleTo(massesInGalaxy[i]), (this.mass + massesInGalaxy[i].mass)/Math.pow(distanceTo, 1.2)];
    if (distanceTo > 0) {
      resultCalculations.push(tempTuple);
    }
  }
  
  var currTrajec = this.intertia();
  
  //calculating force due to gravity
  var gravForce = this.calGravForce(resultCalculations);
  
  //calculating how force affects velocity
  var newTrajec = this.calAccel(gravForce, currTrajec);
  
  //heart of the call
  setTimeout(this.updatePosition.bind(this), this.dtime);
  //console.log("Old Velocity: ", this.velocity);
  //console.log("new Trajec: ", newTrajec);
  //move mass 
  this.x += newTrajec[0];
  this.y += newTrajec[1];
  this.setPosition(this.x, this.y);
  this.velocity = this.pythag(newTrajec[0], newTrajec[1]) / (this.dtime/1000);
  this.direction = Math.atan2(newTrajec[1], newTrajec[0]);
  //console.log("New Velocity: " , this.velocity); 
  //console.log(resultCalculations);
  //console.log("Grav force: ", gravForce);
  //debugger;
  return resultCalculations;
};

//given current location and velocity and direction where is it going to be next
Mass.prototype.intertia = function() {
  
  var dx = Math.cos(this.direction) * this.velocity * this.dtime / 1000;
  var dy = Math.sin(this.direction) * this.velocity * this.dtime / 1000;
  return [dx, dy];
};

Mass.prototype.calGravForce = function(resultArr) {
  var dx = 0;
  var dy = 0;
  for (var i = 0; i < resultArr.length; i++) {
    dx += resultArr[i][3] * Math.cos(resultArr[i][2]);
    dy += resultArr[i][3] * Math.sin(resultArr[i][2]);
  }
  return [dx, dy];
};

Mass.prototype.calAccel = function(gravity, currentTraj) {
  var dvx = (gravity[0]/this.mass) * this.dtime / 1000 + currentTraj[0];
  var dvy = (gravity[1]/this.mass) * this.dtime / 1000 + currentTraj[1];
  return [dvx, dvy];
};

Mass.prototype.pythag = function(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); 
};


