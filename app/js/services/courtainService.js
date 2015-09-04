'use strict'
var app = require( '../app' );

app.factory( 'socket', function ( socketFactory ) {
    var myIoSocket = io.connect();

    var mySocket = socketFactory( {
        ioSocket: myIoSocket
    } );
    return mySocket;

} ).value( 'version', '0.1' );



app.factory( 'CourtainService', [ '$http', 'socket', function ( $http, socket ) {
    var self = this;

    self.courtainAction = function ( courtain, action ) {

        socket.emit( 'courtain', {
            id: courtain.name,
            action: action
        } );
    };

    return self;
} ] );
