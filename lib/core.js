var particle = require("./particle");
var render   = require("./render");
var matrix   = require("./matrix");
var hbs      = require("./hbs");
var dom      = require("./dom");
var vs       = require("./vs");

function Core() {
  this.vs       = vs;
  this.dom      = dom;
  this.hbs      = hbs;
  this.render   = render;
  this.matrix   = matrix;
  this.particle = particle;
}

module.exports = new Core();