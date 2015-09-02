'use strict'
var app = require( '../app' );

app.factory( 'socket', function ( socketFactory ) {
    var myIoSocket = io.connect( 'http://localhost:8080/' );

    var mySocket = socketFactory( {
        ioSocket: myIoSocket
    } );
    return mySocket;

} ).value( 'version', '0.1' );



app.factory( 'CourtainService', [ '$http', 'socket', function ( $http, socket ) {
    var self = this;

    self.courtainAction = function ( courtain, action ) {
        var nodeMessage = 20;
        //make this if objects!
        if ( action === "UP" ) {
            nodeMessage += 1;
        }
        if ( action === "DOWN" ) {
            nodeMessage += 2;
        }
        socket.emit( 'courtain', {
            id: courtain.name,
            action: action,
            nodeMessage: nodeMessage
        } );
    };

    return self;
} ] );
