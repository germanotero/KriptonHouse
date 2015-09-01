var app = angular.module( 'app', [
    'btford.socket-io',
    'ngRoute',
    'ui.bootstrap',
    'toggle-switch'
] );


app.config( function ( $routeProvider, $locationProvider ) {
    $routeProvider

    // home page
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })

    $locationProvider.html5Mode(true);
} );
