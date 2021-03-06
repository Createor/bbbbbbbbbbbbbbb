import Ember from 'ember';
import config from 'webatrice/config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('disclaimer');
  this.resource('user', { path: '/u/:user_id' });
  this.resource('decks', function() {
    this.route('list');
  });
  this.resource('deck', { path: '/d/:deck_id' }, function() {
    this.route('build');
  });

  this.resource('chat', function() {
    this.resource('chat.channel', { path: '/:channel' });
  });

  this.resource('games', function() {
    this.route('list');
    this.route('new');
  });

  this.resource('game', { path: 'games/:game_id' });

  this.route('four-oh-four', { path: '*path' });
});

export default Router;
