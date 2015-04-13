import Ember from 'ember';

export default Ember.Controller.extend({
  /** @property {Boolean} A combo of being signed up and having decks ready. */
  canCreateGame: function () {
    return !this.get('session.user.isAnonymous') &&
      this.get('session.user.hasGameReadyDecks');
  }.property('session.user.isAnonymous', 'session.user.hasGameReadyDecks'),

  cannotCreateGame: Ember.computed.not('canCreateGame')
});