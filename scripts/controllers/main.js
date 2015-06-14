'use strict';

/**
 * @ngdoc function
 * @name AvianServer.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the AvianServer
 */
angular.module('AvianServer')
  .controller('MainCtrl', function ($scope, $location, User, Auth, AnchorSmoothScroll) {
    Auth.ensureHasCurrentUser(User);
    $scope.userState = Auth.getUserState();

    $scope.isLandingPage = function() {
      if ($location.path() === '/') {
        return true;
      }
      return false;
    };


    $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(eID);
 
      // call $anchorScroll()
      AnchorSmoothScroll.scrollTo(eID);
    };
  });
