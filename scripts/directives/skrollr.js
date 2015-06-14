/* global skrollr:false */

'use strict';

/**
 * @ngdoc directive
 * @name AvianServer.directive:skrollr
 * @description
 * # skrollr
 */
angular.module('AvianServer')
  .directive('skrollr', function($timeout) {
    return {
      link: function() {
        var s = skrollr.init({
          smoothScrolling: false,
          mobileDeceleration: 0.004,
          forceHeight: false,
          mobileCheck: function() {
            return false;
          }
        });

        $timeout(function () {
          s.refresh();
        }, 500);
        
        $timeout(function () {
          s.refresh();
        }, 1000);
      }
    };
  });
