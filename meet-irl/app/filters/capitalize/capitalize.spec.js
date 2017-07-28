describe('Capitalize filter', function() {
  var capitalizeFilter;

  // Load our filters.capitalize module which we'll create next
  beforeEach(angular.mock.module('filters.capitalize'));

  // Inject the $filter service and create an instance of our capitalize filter
  beforeEach(inject(function(_$filter_) {
    capitalizeFilter = _$filter_('capitalize');
  }));

  it('should capitalize the first letter of a string', function() {
    expect(capitalizeFilter('blastoise')).toEqual('Blastoise');
  });
});