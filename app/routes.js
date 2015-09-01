module.exports = function ( app ) {

    function sendMessage( message, socket ) {
        exec.execFile( '../remote', [ '-m', message ],
            function ( error, stdout, stderr ) {
                if ( stdout.indexOf( "Got this response" ) > -1 ) {
                    var state = stdout.split( 'Got this response ' )[ 1 ].split( '.' )[ 0 ];
                    socket.emit(
                        "callbackButton", {
                            message: "received",
                            operation: message,
                            state: state
                        } );
                }

                if ( error !== null ) {
                    console.log( 'exec error: ' + error );

                    socket.emit(
                        "callbackError", {
                            error: error

                        } );

                }
            } );
    }

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    
    // frontend routes =========================================================
    // route to handle all angular requests
    app.get( '*', function ( req, res ) {
        res.sendfile( './public/index.html' );
    } );



};
