import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.all();
	},
	actions: {
		search: function() {
			console.log('search', this.controller);
		}
	}
});



