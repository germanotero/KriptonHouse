'use strict';

app.directive( 'simpleLight', function () {
    return {
        templateUrl: 'js/directives/light/light.html',
        scope: {
            light: '=model',
        },
        link: function ( scope ) {
            scope.$watch( 'light.status', function ( newValue, oldValue ) {
                console.log(newValue);
            } );
        }
    };
} );
