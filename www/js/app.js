// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('hts', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Auth', function($firebaseAuth) {
  var usersRef = new Firebase('https://harrietthespy.firebaseio.com/users');
  return $firebaseAuth(usersRef);
})

.controller('AppCtrl', function() {

})

.controller('LoginCtrl', function( $scope, Auth ) {

  $scope.login = function( provider ) {
    console.log("Trying ", provider);
    Auth.$authWithOAuthRedirect( provider ).then(function (authData) {}).catch(function (error) {
      if(error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup( provider).then(function(authData) {});
      } else {
        console.log(error);
      }
    });
  };

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in kid");
    } else {
      console.log('Logged in as', authData.id);
    }

    $scope.authData = authData;
  });


})
