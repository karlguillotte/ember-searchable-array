# Ember Searchable Array

This Ember addon provides an `Ember.Mixin` to facilitate text search using [Sifter](https://github.com/brianreavis/sifter.js) in array proxies. It can be added to any `Ember.ArrayProxy` or `Ember.ArrayController` to enable search on it. A dummy application has been created to showcase this Mixin. See Running section for more details. 

This README outlines the details of using and collaborating on this Ember addon. 

## Usage

```js
export default Ember.ArrayController.extend(SearchableArray, {
	queryParams: ['term'],
	term: '',
	searchProperties: ['name', 'description'],
	searchTerm: Ember.computed.alias('term')
});
```

The `ArrayController` above exposes a property `searchedContent` that will be changed as soon as the value of `searchTerm` change. `searchProperties` is a `concatenatedProperties` that contains keys of properties participating in the search. The Mixin exposes a property `searchResult` that expose the result of the search. Please refer to [Sifter repository](https://github.com/brianreavis/sifter.js) for more details and on the tests or the dummy application for more usage information. 

Sometimes, it might be a good idea to debounce the search process. Here is an example how this can be achieve. 

```js
export default Ember.ArrayController.extend(SearchableArray, {
	queryParams: ['term'],
	term: '',
	searchProperties: ['name', 'description'],
	setSearchTerm: function() {
		Ember.run.debounce(this, this.set, 'searchTerm', this.get('term'), 150);
	}.observes('term')
});
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
