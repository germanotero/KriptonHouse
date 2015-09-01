// modules =================================================
var express = require( 'express' );
var app = express();
var http = require( 'http' );
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );
var exec = require( 'child_process' );


var session = require( 'express-session' )( {
    secret: "aliensAreAmongUs",
    resave: true,
    saveUninitialized: true
} );


// configuration ===========================================

// config files


var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

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
app.use( express.static( __dirname + '/public' ) ); // set the static files location /public/img will be /img for users

// routes ==================================================
require( './app/routes' )( app ); // pass our application into our routes

// start app ===============================================

var httpServer = http.Server( app );

httpServer.listen( port, function () {
    console.log( "server listening on port", port );
} );
require( './app/socket' )( httpServer, session );


//app.listen(port);
exports = module.exports = app; // expose app
