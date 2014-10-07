import Ember from 'ember';

var m = window.moment;

function timeAgo(value) {
  return m(value).fromNow();
}

export {
  timeAgo
};

export default Ember.Handlebars.makeBoundHelper(timeAgo);
