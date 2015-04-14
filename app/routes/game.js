import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function (model) {
    // By default, add yourself as a watcher unless you're already in the
    // participants list.
    //
    var gameParticipants = model.get('gameParticipants');
    var user = this.get('session.user');
    var store = this.store;
    var gameParticipant;
    // Fetch all users to see if we are one of them.
    var promises = [user].concat(gameParticipants.mapBy('user'));
    return Ember.RSVP.all(promises).then((users) => {
      var me = users.shift();
      var myId = me.get('id');
      var userIds = users.mapBy('id');
      if (!userIds.contains(user.get('id'))) {
        gameParticipant = this.get('store').createRecord('gameParticipant');
        gameParticipant.set('user', user);
        gameParticipants.pushObject(gameParticipant);
      } else {
        gameParticipant = gameParticipants.find((participant) => {
          return participant.get('user.id') === myId;
        });
      }
      gameParticipant.set('isPresent', true);
      this.set('gameParticipant', gameParticipant);
      // Queue the participant disconnect behavior.
      var participantRef = this.get('gameParticipantRef');
      if (me.get('isAnonymous')) {
        // Destroy the participant record on disconnect.
        participantRef.onDisconnect().remove();
      } else {
        // Simply mark as not present. We don't want to destroy participants if
        // they happen to actually be playing.
        participantRef.child('isPresent').onDisconnect().set(false);
      }

      // Save the model with the new participant state.
      return model.save();
    });
  },

  gameParticipantRef: function () {
    return this.store.refFor('game', this.modelFor('game'))
      .child('gameParticipants')
      .child(this.get('gameParticipant.id'));
  }.property('gameParticipant'),

  actions: {
    willTransition: function () {
      // Set directly with the Firebase API so we don't mess up the rest of the
      // game state.
      this.get('gameParticipantRef').child('isPresent').set(false);
    }
  }
});
