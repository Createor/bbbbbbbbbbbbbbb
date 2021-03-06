import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('game', {
  // Specify the other units that are required for this test.
  needs: [
    'model:gameParticipant',
    'model:gameCard',
    'model:user',
    'model:presence',
    'model:card',
    'model:deck',
    'model:cardGroup'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('the players list contains the people playing', function(assert) {
  assert.expect(2);

  let model = this.subject();

  Ember.run(this, function() {
    let users = ['SirZach', 'ahaurw01'].map((username) => {
      return this.store().createRecord('user', {
        username
      });
    });
    let gameParticipants = users.map((user) => {
      return this.store().createRecord('gameParticipant', {
        user,
        isPlaying: true
      });
    });
    model.get('gameParticipants').pushObjects(gameParticipants);
  });
  let players = model.get('players');
  assert.equal(players.get('length'), 2);
  let names = players.mapBy('user.username');
  assert.deepEqual(names, ['SirZach', 'ahaurw01']);
});

test('the players list should be padded with a placeholder', function(assert) {
  assert.expect(2);

  let model = this.subject();
  Ember.run(this, function() {
    let users = ['SirZach'].map((username) => {
      return this.store().createRecord('user', {
        username
      });
    });
    let gameParticipants = users.map((user) => {
      return this.store().createRecord('gameParticipant', {
        user,
        isPlaying: true
      });
    });
    model.get('gameParticipants').pushObjects(gameParticipants);
  });
  let players = model.get('players');
  assert.equal(players.get('length'), 2);
  let names = players.mapBy('user.username');
  assert.deepEqual(names, ['SirZach', '???']);
});

test('playerOne should be the first player', function(assert) {
  assert.expect(1);

  let model = this.subject();
  Ember.run(this, function() {
    let users = ['SirZach', 'ahaurw01'].map((username) => {
      return this.store().createRecord('user', {
        username
      });
    });
    let gameParticipants = users.map((user) => {
      return this.store().createRecord('gameParticipant', {
        user,
        isPlaying: true
      });
    });
    model.get('gameParticipants').pushObjects(gameParticipants);
  });
  let playerOne = model.get('playerOne');
  assert.equal(playerOne.get('user.username'), 'SirZach');
});

test('playerTwo should be the second player', function(assert) {
  assert.expect(1);

  let model = this.subject();
  Ember.run(this, function() {
    let users = ['SirZach', 'ahaurw01'].map((username) => {
      return this.store().createRecord('user', {
        username
      });
    });
    let gameParticipants = users.map((user) => {
      return this.store().createRecord('gameParticipant', {
        user,
        isPlaying: true
      });
    });
    model.get('gameParticipants').pushObjects(gameParticipants);
  });
  let playerTwo = model.get('playerTwo');
  assert.equal(playerTwo.get('user.username'), 'ahaurw01');
});

test('watchers should contain all people not playing', function(assert) {
  assert.expect(2);

  let model = this.subject();
  Ember.run(this, function() {
    let users = ['SirZach', 'ahaurw01', 'thomasjmwb', 'wycats', 'tomdale']
      .map((username) => {
        return this.store().createRecord('user', {
          username
        });
      });
    let gameParticipants = users.map((user, index) => {
      return this.store().createRecord('gameParticipant', {
        user,
        isPlaying: index < 2
      });
    });
    model.get('gameParticipants').pushObjects(gameParticipants);
  });
  let watchers = model.get('watchers');
  assert.equal(watchers.length, 3);
  assert.deepEqual(watchers.mapBy('user.username'),
    ['thomasjmwb', 'wycats', 'tomdale']);
});
