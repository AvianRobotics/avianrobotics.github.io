'use strict';

angular.module('AvianServer')
  .factory('Auth', function() {
    var userState =
    {
      //isLoggedIn: $cookieStore.get('isLoggedIn')
      isLoggedIn: false
    };

    return {
      currentUser: null,

      // Note: we can't make the User a dependency of Auth
      // because that would create a circular dependency
      // Auth <- $http <- $resource <- LoopBackResource <- User <- Auth
      ensureHasCurrentUser: function(User) {
        if (this.currentUser) {
          // console.log('Using cached current user.');
        } 
        else {
          // console.log('Fetching current user from the server.');
          this.currentUser = User.getCurrent(function() {
            // success
            userState.isLoggedIn = true;            
          },
          function() {
            userState.isLoggedIn = false;
            // console.log('User.getCurrent() err', response);
          });
        }
      },

      getUserState: function() {
        return userState;
      },

      login: function() {
        userState.isLoggedIn = true;
        //$cookieStore.put('isLoggedIn', 'true');
      },

      logout: function() {
        this.currentUser = null;
        userState.isLoggedIn = false;
        //$cookieStore.put('isLoggedIn', 'false');
      }
    };
  });
