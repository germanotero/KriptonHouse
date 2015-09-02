'use strict'

var LightGroup = function ( name ) {
    this.name = name;
    this.status = false;
    this.lights= [];
};

LightGroup.prototype.add = function (light) {
    this.lights.push(light);
};

LightGroup.prototype.on = function() {
  for (var i = 0; i < this.lights.length; i++) {
    this.lights[i].status = true;
  }
}

LightGroup.prototype.off = function() {
  for (var i = 0; i < this.lights.length; i++) {
    this.lights[i].status = false;
  }
}

module.exports = LightGroup;
