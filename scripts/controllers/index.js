'use strict';

/**
 * @ngdoc function
 * @name AvianServer.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the AvianServer
 */
angular.module('AvianServer')
  .controller('IndexCtrl', function ($scope, $location, $modal, User, Auth, Subscriber, ContactDetail) {
    $scope.subscribetext = 'Subscribe to get the latest news from Avian Robotics.';
    $scope.subscribed = false;

    $scope.contacttext = 'If you\'re interested in learning more about how Avian Robotics can help you, leave us a message.';
    $scope.contacted = false;

    $scope.login = function() {
      $scope.loginResult = User.login($scope.credentials,
        function() {
          // Auth.currentUser = $scope.loginResult.user;
          Auth.login();
          $location.path('home');
        },
        function(res) {
          $scope.loginError = res.data.error;
        }
      );
    };

    $scope.register = function() {
      $scope.user = User.save($scope.registration,
        function() {
        },
        function(res) {
          if(res && res.data) {
            $scope.registerError = res.data.error;
          }else {
            console.log("No response received");
          }
        }
      );
    };

    $scope.playVideo = function() {
      console.log('test');
      $modal.open({
        templateUrl: '/views/modals/video.html',
        size: 'lg'
      });
    };

    $scope.subscribe = function () {
      Subscriber.save({
          email: $scope.email,
          created: new Date()
        },
        function () {
          $scope.subscribetext = 'Thanks for following!';
          $scope.subscribed = true;
        },
        function () {
          $scope.subscribetext = 'Error signing up.';
        }
      );
    };

    $scope.leaveMessage = function () {
      ContactDetail.save({
          name: $scope.contactName,
          email: $scope.contactEmail,
          message: $scope.contactMessage,
          created: new Date()
        },
        function () {
          $scope.contacttext = 'Thanks for your message!';
          $scope.contacted = true;
        },
        function () {
          $scope.contacttext = 'Error signing up.';
        }
      );
    };
  });
