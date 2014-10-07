import Ember from 'ember';

function timeAgo(value) {
  return moment(value).fromNow();
}

export {
  timeAgo
};

export default Ember.Handlebars.makeBoundHelper(timeAgo);
