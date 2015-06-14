'use strict';

/**
 * @ngdoc function
 * @name AvianServer.controller:BirdCtrl
 * @description
 * # BirdCtrl
 * Controller of the AvianServer for the BlackBird view
 */
angular.module('AvianServer')
  .controller('BirdCtrl', function ($scope, KeyDown, KeyUp, Socket) {        
    
    $scope.offboardControl = 'OFF';
    
//    $scope.offBoardControlButtonType = (('OFF') ? "btn-danger" : "btn-warning");
    
    $scope.aux1Value = 0;
    $scope.aux2Value = 0;
    
    $scope.aux1Up = function() {
      console.log('AUX1 increased');
      Socket.emit('controlAux1FromClient', 'up');
    };

    $scope.aux1Down = function() {
      console.log('AUX1 decreased');
      Socket.emit('controlAux1FromClient', 'down');
    };

    $scope.aux2Up = function() {
      console.log('AUX2 increased');
      Socket.emit('controlAux2FromClient', 'up');
    };

    $scope.aux2Down = function() {
      console.log('AUX2 decreased');
      Socket.emit('controlAux2FromClient', 'down');
    };
    
    $scope.aux3Up = function() {
      console.log('AUX3 increased');
      Socket.emit('controlAux3FromClient', 'up');
    };

    $scope.aux3Down = function() {
      console.log('AUX3 decreased');
      Socket.emit('controlAux3FromClient', 'down');
    };
    

    KeyDown.bind('g', function() {
      $scope.aux1Down();
    });
    KeyDown.bind('t', function() {
      $scope.aux1Up();
    });
    KeyDown.bind('h', function() {
      $scope.aux2Down();
    });
    KeyDown.bind('y', function() {
      $scope.aux2Up();
    });
    KeyDown.bind('j', function() {
      $scope.aux3Down();
    });
    KeyDown.bind('u', function() {
      $scope.aux3Up();
    });
    
    
    Socket.on('Aux1FromServerToClient', function(value) {
        $scope.aux1Value = value;
    });
    Socket.on('Aux2FromServerToClient', function(value) {
        $scope.aux2Value = value;
    });
    Socket.on('Aux3FromServerToClient', function(value) {
      $scope.aux3Value = value;
    });
    
    
    
});