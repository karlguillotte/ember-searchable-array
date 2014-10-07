import Ember from 'ember';

var getProperties = Ember.getProperties;
var setProperties = Ember.setProperties;
var get = Ember.get;
var throttle = Ember.run.throttle;
var computed = Ember.computed;

export default Ember.Mixin.create({
	concatenatedProperties: ['searchProperties'],
	searchProperties: null,
	searchTerm: null,
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
		var sifter = get(this, '_sifter');
		var searchTerm = get(this, 'searchTerm');
		var options = get(this, 'searchOptions');
		var indexes;
		var result = null;

		if (searchTerm) {
			result = sifter.search(searchTerm, options);
			indexes = result.items.getEach('id');

			content = content.objectsAt(indexes);
		}

		setProperties(this, {
			searchResult: result,
			searchedContent: content
		});
	}.observes('searchTerm', '_sifter', 'searchOptions'),
	_sifter: function() {
		var properties = get(this, 'searchProperties');
		var content = get(this, 'searchableContent');
		var data = content.map(function(object) {
			return getProperties(object, properties);
		});

		return new Sifter(data);
	}.property('searchableContent.[]', 'searchProperties.[]')
});
