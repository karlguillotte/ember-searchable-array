module.exports = {
  	name: 'ember-searchable-array',
	included: function(app) {
		this._super.included(app);

		app.import(app.bowerDirectory + '/sifter/sifter.js');
	}  
};
