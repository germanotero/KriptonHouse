'use strict'
var sharedsession = require( 'express-socket.io-session' ),
    io = require( 'socket.io' );
var exec = require( 'child_process' );


module.exports = function ( httpServer, session ) {

    io = io.listen( httpServer );

    io.use( sharedsession( session ) );

    io.on( 'connection', function ( socket ) {
        console.log( "connected" );

        socket.emit( "greetings", {
            msg: "hello"
        } );

        socket.on( "courtain", function ( data ) {
            console.log( data );
            var message = "message";
            exec.execFile( '../remote', [ '-m', message ],
                function ( error, stdout, stderr ) {
                    if ( stdout.indexOf( "Got this response" ) > -1 ) {
                        var state = stdout.split( 'Got this response ' )[ 1 ].split( '.' )[ 0 ];
                        socket.emit(
                            "alert", {
                                type: 'success',
                                msg: "Success",
                                operation: message,
                                state: state
                            } );
                    }

                    if ( error !== null ) {
                        console.log( 'exec error: ' + error );

                        socket.emit(
                            "alert", {
                                type: 'danger',
                                msg: 'Error while executing call to the nodes.'
                            } );

                    }
                } );
        } )
    } );

};
