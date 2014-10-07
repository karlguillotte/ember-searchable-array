import Ember from 'ember';
import request from 'ic-ajax';

var Adapter = Ember.Object.extend({
	all: function() {
		throw 'Not implemented';
	}
});
Adapter.reopenClass({
	instance: function() {
		var request = RequestAdapter.create();

		if (window.localStorage) {
			return StorageAdapter.create({
				child: request
			});
		}
		
		return request;
	}
});

var StorageAdapter = Adapter.extend({
	child: Ember.required(Adapter),
   	storage: function() {
		return window.localStorage;
	}.property(),
	all: function() {
		var storage = this.get('storage');
		var addons = JSON.parse(storage['ember-cli-addons']);

		if (addons && addons.data && addons.timestamp > Date.now() - 5 * 60 * 1000) {
			return addons.data;
		}

		return this.child.all().then(function(data) {
			addons = {
				timestamp: Date.now(),
				data: data
			};
			
			storage['ember-cli-addons'] = JSON.stringify(addons);

			return data;
		}, function() {
			if (addons) {
				return addons.data;
			}
		});
	}
});

var RequestAdapter = Adapter.extend({
	url: 'https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json',
	all: function() {
		return request(this.get('url')).then(function(data) {
			return data.filterBy('name');
		});
	}
});


export default Ember.Object.extend({
	adapter: function() {
		return Adapter.instance();
	}.property(),
	all: function() {
		return this.get('adapter').all();
	}
});
