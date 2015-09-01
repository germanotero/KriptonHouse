'use strict'

var Light = function ( name , scope) {
    this.name = name;
    this.scope = scope;
    this.status = true;
};

Light.prototype.on = function () {
    this.scope.addAlert( this.name + ': on' );
};
Light.prototype.off = function () {
    this.scope.addAlert( this.name + ': off' );
};
