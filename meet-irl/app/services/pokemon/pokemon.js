(function() {
  'use strict';

  // Define the component and controller we loaded in our test
  angular.module('api.pokemon', [])
  .factory('Pokemon', function($http) {
    var API = 'http://pokeapi.co/api/v2/pokemon/';
    var Pokemon = {};

    Pokemon.findByName = function(name) {
      return $http.get(API + name)
      .then(function(res) {
        return res.data;
      })
      .catch(function(res) {
        throw res.data;
      });
    };

    return Pokemon;
  });
})();