var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
  $scope.graph = {'width': 100, 'height': 100}
  $scope.circles = [
    {'x': 25, 'y': 20, 'r':15},
    {'x': 50, 'y': 70, 'r':30},
    {'x': 80, 'y': 10, 'r':10},
  ]
});
      