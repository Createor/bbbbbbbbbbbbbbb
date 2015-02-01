import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

    openModal: function (modalName, model) {
      return this.render(modalName, {
        controller: modalName,
        model: model,
        into: 'application',
        outlet: 'modal'
      });
    },

    closeModal: function () {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
