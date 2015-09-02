'use strict'
var app = require( '../app' ),
    $ = require('jquery');


var Courtain = require( '../models/courtain' ),
    Light = require( '../models/light' ),
    LightGroup = require( '../models/lightGroup' );

app.controller( 'MainController', function ( $scope, socket, $timeout ) {
    $scope.alert = {
        type: 'success',
        msg: 'Welcome!!!'
    };

    socket.on( 'greetings', function ( data ) {
        console.log( "greetings" );
    } );

    socket.on( 'alert', function ( data ) {
        $scope.alert = data;
        $( ".alert" ).fadeIn();
        $timeout( function () {
            $( ".alert" ).fadeOut();
        }, 3000 );
    } );

    function addAlert( message ) {
        $scope.alert = {
            type: 'success',
            msg: message
        };
        $timeout( function () {
            console.log( 'update with timeout fired' )
        }, 3000 );
    };

    $scope.closeAlert = function () {
        $( ".alert" ).fadeOut();
    };

    $scope.$on( 'courtain', function ( event, message ) {
        addAlert( message );

    } );

    $scope.mrCourtain = new Courtain( 'Main Room', $scope );
    $scope.livingCourtain = new Courtain( 'Living', $scope );
    $scope.srCourtains = new Courtain( 'Lola\'s', $scope );

    $scope.livingLight = new Light( 'Living', $scope );
    $scope.tableLight = new Light( 'Mesa', $scope );
    $scope.entranceLight = new Light( 'Entrada', $scope );
    $scope.ambientLight = new Light( 'Comoda', $scope );
    $scope.mrLight = new Light( 'Luz', $scope );
    $scope.srLight = new Light( 'Luz', $scope );

    // Exterior Lights
    $scope.exteriorLights = new LightGroup( 'Exterior' );
    $scope.exteriorLights.add( new Light( 'Patio', $scope ) );
    $scope.exteriorLights.add( new Light( 'Garage', $scope ) );
    $scope.$watch( 'exteriorLights.status', function ( newValue ) {
        if ( newValue ) {
            $scope.exteriorLights.on();
        }
        else {
            $scope.exteriorLights.off();
        }
    } );

} );
