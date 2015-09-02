'use strict';
var app = require( '../../app');

app.directive( 'courtain', function (  ) {
    return {
        templateUrl: 'js/directives/courtain/courtain.html',
        scope: {
            courtain: '=model'
        },
        controller: function ( $scope,  CourtainService) {
            $scope.toggle = function ( courtain, action ) {
                CourtainService.courtainAction( courtain, action );
            }
        }
    };
} );
