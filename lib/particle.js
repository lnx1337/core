var Particle = function(t, i) {
  this.id = i;
  this.born = Date.now();
  this.age = -i % 60;
  this.vel = {
    x: this.getRandomSpeed(),
    y: this.getRandomSpeed()
  };
  this.acc = 1; 
  this.bounds = t;
  this.color = new THREE.Color(1, 1, 1); 
  this.mouseDist = 1e4;
  this.mouseFraction = 0;
  this.opacity = 0;

};

Particle.prototype.getRandomSpeed = function() {
  return (0.15 * Math.random() + -0.075);
};

Particle.prototype.update = function() {

  if (this.age++ && 2 == this.id && this.age < 0) {
    return void(this.vertex.z = 0);
  }

  if (0 === this.age) {
    return this.opacity += 0.05;
  }
  
  void(this.vertex.z = this.bounds.z[0] + Math.random() * (this.bounds.z[1] - this.bounds.z[0]));
/*
  this.opacity < 1 ? this.opacity += .05 : this.opacity = 1; 
  (this.vertex.x < this.bounds.x[0] || this.vertex.x > this.bounds.x[1] || this.vertex.y < this.bounds.y[0] || this.vertex.y > this.bounds.y[1]) && (this.vel.x = this.getRandomSpeed(); 
  this.vel.y = this.getRandomSpeed());
  var t = 1;
  this.acc = .09 * (t - this.acc) + this.acc, this.vertex.x += this.vel.x * this.acc, this.vertex.y += this.vel.y * this.acc
  */
};


module.exports = Particle;