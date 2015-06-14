'use strict';

/**
 * @ngdoc function
 * @name AvianServer.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the AvianServer
 */
angular.module('AvianServer')
  .controller('HomeCtrl', function ($scope, KeyDown, KeyUp, Socket) {
    $scope.foo = Math.random();
    $scope.pitch = 0;
    $scope.throttle = 0;
    $scope.roll = 0;
    $scope.yaw = 0;
    $scope.trimStatus = 'Waiting';
    $scope.armStatus = 'Waiting';
    $scope.altStatus = 'Waiting';
    $scope.aux1 = 0;
    $scope.aux2 = 0;
    $scope.aux3 = 0;

    var trimMode = false;
    $scope.sayHello = function() {
      console.log('Send message');
      Socket.emit('command', 'message');
    };

    //Where 0.1 = 0% and 0.2 = 100% into %age
    $scope.intoPercentage = function(value){
        return Math.round((value-0.1)*1000);
    };
    
    $scope.throttleUp = function() {
      console.log('Throttle increased');
      Socket.emit('controlThrottleFromClient', 'up');
    };

    $scope.throttleDown = function() {
      console.log('Throttle decreased');
      Socket.emit('controlThrottleFromClient', 'down');
    };

    $scope.throttleMid = function()  {
      console.log('Throttle Middle');
      Socket.emit('controlThrottleFromClient', 'mid');
    };

    $scope.pitchUp = function() {
      console.log('Pitch increased');
      Socket.emit('controlPitchFromClient', 'up');
    };

    $scope.pitchDown = function() {
      console.log('Pitch decreased');
      Socket.emit('controlPitchFromClient', 'down');
    };

    $scope.pitchMid = function() {
      console.log('Pitch Middled');
      Socket.emit('controlPitchFromClient', 'mid');
    };

    $scope.rollUp = function() {
      console.log('Roll increased');
      Socket.emit('controlRollFromClient', 'up');
    };

    $scope.rollDown = function() {
      console.log('Roll decreased');
      Socket.emit('controlRollFromClient', 'down');
    };

    $scope.rollMid = function() {
      console.log('Roll Middle');
      Socket.emit('controlRollFromClient', 'mid');
    };

    $scope.yawUp = function() {
      console.log('Yaw increased');
      Socket.emit('controlYawFromClient', 'up');
    };

    $scope.yawDown = function() {
      console.log('Yaw decreased');
      Socket.emit('controlYawFromClient', 'down');
    };

    $scope.yawMid = function() {
      console.log('Yaw mid');
      Socket.emit('controlYawFromClient', 'mid');
    };

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

    $scope.setFlightMode = function(mode) {
      console.log('Set flight mode: ' + mode);
      Socket.emit('setFlightModeFromClient', mode);
    };

    $scope.altGoUp = function() {
      console.log('Go up Altitude Mode');
      Socket.emit('controlAltModeFromClient', 'up');
    };

    $scope.altGoDown = function() {
      console.log('Go down Altitude Mode');
      $scope.altStatus = 'Going Down/Landing';
      Socket.emit('controlAltModeFromClient', 'down');
    };

    $scope.altStay  = function() {
      console.log('Stay/hold/keep altitude mode');
      $scope.altStatus = 'Holding Altitude';
      Socket.emit('controlAltModeFromClient', 'stay');
    };

    $scope.saveTrim = function() {
      Socket.emit('saveTrimFromClient', 'high');
      console.log('Saving trim...');
      window.setTimeout($scope.endSaveTrim, 2000);
    };

    $scope.endSaveTrim = function() {
      Socket.emit('saveTrimFromClient', 'low');
      console.log('Saved trim');
    };

    $scope.arm = function() {
      Socket.emit('armFromClient', 'high');
      console.log('Arming...');
      window.setTimeout($scope.endArm, 5000);
    };

    $scope.endArm = function() {
      Socket.emit('armFromClient', 'mid');
      console.log('(Should have) Armed');
      $scope.armStatus = '(Should have) Armed';
    };

    //You don't really wanna disarm like this
    $scope.disarm = function() {
      $scope.altGoDown();
      $scope.setFlightMode('1');
      $scope.armStatus = 'Disarmed';
    };

    KeyDown.bind('w', function() {
      $scope.pitchUp();
    });

    KeyUp.bind('w', function() {
      if(!trimMode){
        $scope.pitchMid();
      }
    });

    KeyDown.bind('s', function() {
      $scope.pitchDown();
    });

    KeyUp.bind('s', function() {
      if(!trimMode){
        $scope.pitchMid();
      }
    });

    KeyDown.bind('a', function() {
      $scope.rollDown();
    });

    KeyUp.bind('a', function() {
      if(!trimMode){
        $scope.rollMid();
      }
    });

    KeyDown.bind('d', function() {
      $scope.rollUp();
    });

    KeyUp.bind('d', function() {
      if(!trimMode){
        $scope.rollMid();
      }
    });

    KeyDown.bind('q', function() {
      $scope.yawDown();
    });

    KeyUp.bind('q', function() {
      if(!trimMode){
        $scope.yawMid();
      }
    });

    KeyDown.bind('e', function() {
      $scope.yawUp();
    });

    KeyUp.bind('e', function() {
      if(!trimMode){
        $scope.yawMid();
      }
    });

    KeyDown.bind('r', function() {
      if($scope.flightMode === 'Stabilize'){
        $scope.throttleUp();
      }
      else if($scope.flightMode === 'Altitude Hold'){
        $scope.altGoUp();
        $scope.altStatus = 'Going Up';
      }
    });

    KeyUp.bind('r', function() {
      if($scope.flightMode === 'Altitude Hold'){
        $scope.altStay();
      }
    });

    KeyDown.bind('f', function() {
      if($scope.flightMode === 'Stabilize'){
        $scope.throttleDown();
      }
      else if($scope.flightMode === 'Altitude Hold'){
        $scope.altGoDown();
      }
    });

    KeyUp.bind('f', function() {
      if($scope.flightMode === 'Altitude Hold'){
        $scope.altStay();
        $scope.altStatus = 'Holding Altitude';
      }
    });
    
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
    KeyDown.bind('z', function() {
      $scope.disarm();
    });
    KeyDown.bind('x', function() {
      $scope.arm();
      $scope.armStatus = 'Arming';
    });
    KeyDown.bind('1', function() {
      $scope.setFlightMode('1');
    });
    KeyDown.bind('2', function() {
      $scope.setFlightMode('2');
    });
    KeyDown.bind('3', function(){
      trimMode = !trimMode;
      if(trimMode){
        $scope.trimStatus = ' + Trim Mode';
      }
      else{
        $scope.trimStatus = '';
      }
    });

    console.log('lwewl');
    
    Socket.on('hi', function(value) {
      console.log('cool dude over' + value);
    });

    Socket.on('throttleFromServerToClient', function(value) {
      $scope.throttle = $scope.intoPercentage(value) + '%';
    });

    Socket.on('pitchFromServerToClient', function(value) {
      $scope.pitch = $scope.intoPercentage(value) + '%';
    });

    Socket.on('rollFromServerToClient', function(value) {
      $scope.roll = $scope.intoPercentage(value) + '%';
    });

    Socket.on('yawFromServerToClient', function(value) {
      $scope.yaw = $scope.intoPercentage(value) + '%';
    });
    Socket.on('Aux1FromServerToClient', function(value) {
      $scope.aux1 = value;
      if(value === 0.1){
        $scope.flightMode = 'Stabilize';
      }
      else if(value === 0.2){
        $scope.flightMode ='Altitude Hold';
      }
      else {
        $scope.flightMode = 'Please use flight mode picker, entering unchartered territories #2edgy4me';
      }
    });
    Socket.on('Aux2FromServerToClient', function(value) {
      $scope.aux2 = value;
    });
    Socket.on('Aux3FromServerToClient', function(value) {
      $scope.aux3 = value;
    });
    Socket.on('command', function(value) {
      if(value === 'message'){
        console.log('Test');
      }
    });

  });
