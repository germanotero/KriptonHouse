

app.
factory( 'socket', function ( socketFactory ) {
    return socketFactory();
} ).
value( 'version', '0.1' );

app.factory( 'CourtainService', [ '$http', 'socket', function ( $http, socket ) {
    var self = this;

    self.courtainAction = function ( courtain, action ) {
      socket.emit('courtain', {
          id: courtain.name,
          action: action
      });
    };

    return self;
} ] );
