import Store from '../store';

export var initialize = function(container) {
	container.register('store:main', Store);
	container.injection('route', 'store', 'store:main');
};

export default {
	name: 'store',
	initialize: initialize
};
