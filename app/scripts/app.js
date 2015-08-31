'use strict';

/**
 * @ngdoc overview
 * @name yeomanDonderdagApp
 * @description
 * # yeomanDonderdagApp
 *
 * Main module of the application.
 */
angular
  .module('yeomanDonderdagApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'app/views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
