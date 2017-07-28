(function() {
  'use strict';

  // Define the component and filter we loaded in our test
  angular.module('filters.capitalize', [])
  .filter('capitalize', function() {
    return function(word) {
      return (word) ? word.charAt(0).toUpperCase() + word.substring(1) : '';
    };
  });
})();