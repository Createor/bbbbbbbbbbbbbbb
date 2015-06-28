import Ember from 'ember';
import Sort from '../../utils/sort';

export default Ember.Component.extend({
  classNames: ['game-left-column'],
  classNameBindings: ['isOpen'],

  /** @property {Boolean} is the column open */
  isOpen: false,

  /** @property {DS.GameParticipant} */
  player: null,

  /** @property {String} */
  zone: null,

  /** @property {Array<DS.GameCard>} */
  gameCards: null,

  /** @property {Array<DS.GameCards>} sorted by type */
  sortedCards: Ember.computed('gameCards.[]', 'cards.@each.cardId', function () {
    return this.get('gameCards').sort(Sort.CardTypes.bind(this, this.get('cards')));
  }),

  /** @property {Array<DS.Card>} */
  cards: null,

  actions: {
    close: function () {
      this.sendAction('close');
    },

    dragStarted: function () {
      this.sendAction('dragStarted');
    },

    dragEnded: function () {
      this.sendAction('dragEnded');
    }
  }
});
