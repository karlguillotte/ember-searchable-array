import Ember from 'ember';

var getProperties = Ember.getProperties;
var setProperties = Ember.setProperties;
var get = Ember.get;
var required = Ember.required;
var computed = Ember.computed;

export default Ember.Mixin.create({
	concatenatedProperties: ['searchProperties'],
	searchProperties: required(Array),
	searchTerm: required(String),
	searchableContent: computed.any('arrangedContent', 'content'),
	searchedContent: computed.oneWay('searchableContent'),
	searchResult: null,
	searchOptions: function() {
		return {
			fields: get(this, 'searchProperties')
		};
	}.property('searchProperties.[]'),
	search: function() {
		var content = get(this, 'searchableContent');
		var searchTerm = get(this, 'searchTerm');
		var options;
		var strategy;
		var indexes;
		var result = null;

		if (searchTerm) {
			strategy = get(this, 'strategy');
			options = get(this, 'searchOptions');
			result = strategy.search(searchTerm, options);
			indexes = result.items.getEach('id');
			content = content.objectsAt(indexes);
		}

		setProperties(this, {
			searchResult: result,
			searchedContent: content
		});
	}.observes('searchTerm', 'strategy', 'searchOptions'),
	strategy: function() {
		var properties = get(this, 'searchProperties');
		var content = get(this, 'searchableContent');
		var data = content.map(function(object) {
			return getProperties(object, properties);
		});

		return new Sifter(data);
	}.property('searchableContent.[]', 'searchProperties.[]')
});
