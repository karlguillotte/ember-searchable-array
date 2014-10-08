import Ember from 'ember';
import SearchableArrayMixin from 'ember-searchable-array/mixins/searchable-array';

var ember = { 
	name: 'Ember', 
	repository: {
		type: 'git',
		url: 'https://github.com/ember/ember'
	} 
};
var angular = { 
	name: 'Angular', 
	repository: {
		type: 'git',
		url: 'https://github.com/angular/angular'
	} 
};
var react = { 
	name: 'React', 
	repository: {
		type: 'git',
		url: 'https://github.com/react/react'
	} 
};
var backbone = { 
	name: 'Backbone', 
	repository: {
		type: 'git',
		url: 'https://github.com/documentcloud/backbone'
	} 
};
var SearchableArray;
var searchableArray;
var frameworks = [ember, angular, react, backbone];

module('SearchableArrayMixin', {
	setup: function() {
		  SearchableArray = Ember.ArrayProxy.extend(SearchableArrayMixin);
		  searchableArray = SearchableArray.create({
		  	content: frameworks
		  });
	}
});

test('A searchable array', function() {
	ok(searchableArray, 'can be created');
	ok(searchableArray.get('searchableContent'), 'has a searchable content');
	equal(searchableArray.get('searchableContent'), frameworks, 'has a searchable content equal to the proxied array');
	ok(searchableArray.get('searchedContent'), 'has a searched content');
	equal(searchableArray.get('searchTerm'), null, 'has a search term of null by default');
	equal(searchableArray.get('searchResult'), null, 'has a search result of null by default');
	equal(searchableArray.get('searchProperties'), undefined, 'has an search properties undefined by default');
	equal(searchableArray.get('length'), 4, 'has a content length equals to 4');
});

test('A searchable array with "frameworks" as content', function() {
	searchableArray.setProperties({
		searchProperties: ['name'],
		searchTerm: 'Ember'
	});
  	
  	equal(searchableArray.get('searchedContent.length'), 1, 'should have a searched content length of 1 when search term is "Ember"');
  	equal(searchableArray.get('searchedContent.firstObject'), ember, 'should have the object "ember" as first object');

  	searchableArray.set('searchTerm', 'Angular');
  	equal(searchableArray.get('searchedContent.length'), 1, 'should have a searched content length of 1 after setting the searched term to "Angular');
  	equal(searchableArray.get('searchedContent.firstObject'), angular, 'should have the object "angular" as first object');

  	searchableArray.set('searchTerm', 'R');
  	equal(searchableArray.get('searchedContent.length'), 3, 'should have a searched content length of 3 after setting the searched term to "R"');
  	equal(searchableArray.get('searchedContent.firstObject'), react, 'should have the object "react" as first object');
  	equal(searchableArray.get('searchedContent.lastObject'), angular, 'should have the object "angular" as first object');

  	ok(searchableArray.get('searchResult'), 'should have a search result');
  	equal(searchableArray.get('searchResult.items.length'), 3, 'should have 3 items in the search result');

  	searchableArray.set('searchProperties', ['repository.type']);
  	equal(searchableArray.get('searchedContent.length'), 0, 'should have a searched content length of 0 after setting the searched term to "R');
  	searchableArray.set('searchTerm', 'it');
  	equal(searchableArray.get('searchedContent.length'), 4, 'should have a searched content length of 4 after setting the searched term to "it');

});



