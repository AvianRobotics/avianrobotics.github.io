'use strict';

angular.module('AvianServer').config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url: '/',
        controller: 'IndexCtrl',
        templateUrl: '/views/index.html'
      });

    $locationProvider.html5Mode(true);
  });
