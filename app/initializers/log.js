import Ember from 'ember';
import DS from 'ember-data';


var Log = Ember.Object.extend({
  createLogMessage: function (message, level) {
    var store = this.container.lookup('store:main');
    var session = this.container.lookup('session:main');
    return session.get('user').then((user) => {
      var logMessage = store.createRecord('log-message', {
        username: user.get('username'),
        userId: user.get('id'),
        message: message,
        level: level
      });
      var logMessageId = logMessage.get('id');
      logMessage.set('id', `${level}${logMessageId}`);
      return logMessage.save();
    });
  },

  error: function (message) {
    return this.createLogMessage(message, 'error');
  },

  info: function (message) {
    return this.createLogMessage(message, 'info');
  }
});

export default {
  name: "Log",

  initialize: function (container, app) {
    app.register('log:main', Log);
    app.inject('component', 'log', 'log:main');
    app.inject('controller', 'log', 'log:main');
    app.inject('route', 'log', 'log:main');
  }
};
