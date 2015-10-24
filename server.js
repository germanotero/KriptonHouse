// modules =================================================
var express = require( 'express' );
var app = express();
var http = require( 'http' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );

var sharedsession = require( 'express-socket.io-session' ),
    io = require( 'socket.io' ),
    exec = require( 'child_process' );

var session = require( 'express-session' )( {
    secret: "aliensAreAmongUs",
    resave: true,
    saveUninitialized: true
} );


// configuration ===========================================

// config files


var port = process.env.PORT || 80; // set our port

// get all data/stuff of the body (POST) parameters
app.use( bodyParser.json() ); // parse application/json
app.use( bodyParser.json( {
    type: 'application/vnd.api+json'
} ) ); // parse application/vnd.api+json as json
app.use( bodyParser.urlencoded( {
    extended: true
} ) ); // parse application/x-www-form-urlencoded

app.use( session );

app.use( methodOverride( 'X-HTTP-Method-Override' ) ); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use( express.static( __dirname + '/app' ) ); // set the static files location /public/img will be /img for users

// routes ==================================================
require( './server/routes' )( app ); // pass our application into our routes

// start app ===============================================

var httpServer = http.Server( app );

httpServer.listen( port, function () {
    console.log( "server listening on port", port );
} );

io = io.listen( httpServer );

io.use( sharedsession( session ) );

io.on( 'connection', function ( socket ) {
    console.log( "connected" );

    socket.emit( "greetings", {
        msg: "hello"
    } );

    socket.on( "courtain", function ( data ) {
        console.log( data );
        var nodeMessage = 20;
        //make this if objects!
        if ( data.action === "DOWN" ) {
            nodeMessage += 1;
        }
        if ( data.action === "UP" ) {
            nodeMessage += 2;
        }
        var message = nodeMessage;
        console.log( message );
        socket.emit(
            "alert", {
                type: 'warning',
                msg: 'Executing Action: ' + message + '.'
            } );
        exec.execFile( './remote', [ '-m', message ],
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


//app.listen(port);
exports = module.exports = app; // expose app
