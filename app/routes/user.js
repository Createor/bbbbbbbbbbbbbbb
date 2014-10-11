import Ember from 'ember';
import GuestUser from '../models/guest-user';

export default Ember.Route.extend({
  model: function (params) {
    if (params.id === "guest") {
      return GuestUser.create();
    } else {
      //TODO support more than just the guest user
      return GuestUser.create();
    }
  }
});