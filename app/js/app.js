'use strict';

var angular = require( 'angular' );

require( 'jquery' );
require( 'angular-route' );
require( 'angular-socket-io' );
require( 'angular-ui-bootstrap' );
require( 'angular-toggle-switch' );
require( 'angular-socket-io' );

var app = angular.module( 'app', [
    'btford.socket-io',
    'ngRoute',
    'ui.bootstrap',
    'toggle-switch'
] );

app.constant( 'VERSION', require( '../../package.json' ).version );

app.config( function ( $routeProvider, $locationProvider ) {
    $routeProvider

    // home page
        .when( '/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    } )

    $locationProvider.html5Mode( true );
} );

module.exports = app;

require( './services/courtainService' );
require( './controllers/MainCtrl' );
require( './directives/courtain/courtainDirective' );
require( './directives/light/lightDirective' );
