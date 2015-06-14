'use strict';

angular.module('AvianServer')
  .directive('elementdimensions', function ($window) {
    return function (scope, element) {
      var w = angular.element($window);
      scope.getWindowDimensions = function () {
        return {
          'h': element.height(),
          'w': element.width()
        };
      };

      scope.$watch(scope.getWindowDimensions, function (newValue) {
        scope.windowHeight = newValue.h;
        scope.windowWidth = newValue.w;

        scope.style = function () {
          return {
            'height': (newValue.h - 100) + 'px',
            'width': (newValue.w - 100) + 'px'
          };
        };
      }, true);

      w.bind('resize', function () {
        scope.$apply();
      });
    };
  });