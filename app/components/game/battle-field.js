import Ember from 'ember';
import layout from '../../templates/components/game/battle-field';
import GameCard from '../../models/game-card';
import Sort from '../../utils/sort';

const { Component, computed } = Ember;

export default Component.extend({
  layout,

  tagName: 'battle-field',

  /**  @property {Array<DS.Model GameCard>} */
  gameCards: [],

  /**  @property {Array<DS.GameCard>} non-land cards */
  nonLandCards: computed('gameCards.[]', 'cards.@each.cardId', function() {
    return this.get('gameCards').filter((gameCard) => {
      let card = this.get('cards').findBy('id', gameCard.get('cardId'));

      return !card || card.get('mainType') !== 'Land';
    }).sort(Sort.CardTypes.bind(this, this.get('cards')));
  }),

  /**  @property {Array<DS.GameCard>} land cards */
  landCards: computed('gameCards.[]', 'cards.@each.cardId', function() {
    return this.get('gameCards').filter((gameCard) => {
      let card = this.get('cards').findBy('id', gameCard.get('cardId'));

      return card && card.get('mainType') === 'Land';
    });
  }),

  /**  @property {Array<DS.GameCard>} cards to be rendered at the top of the battlefield */
  topCards: computed('bottomBattlefield', 'landCards.[]', 'nonLandCards.[]', function() {
    if (this.get('bottomBattlefield')) {
      return this.get('nonLandCards');
    } else {
      return this.get('landCards');
    }
  }),

  /**  @property {Array<DS.GameCard>} cards to be rendered at the bottom of the battlefield */
  bottomCards: computed('bottomBattlefield', 'landCards.[]', 'nonLandCards.[]', function() {
    if (this.get('bottomBattlefield')) {
      return this.get('landCards');
    } else {
      return this.get('nonLandCards');
    }
  }),

  /**  @property {Boolean} location of the battlefield */
  bottomBattlefield: true,

  /**  @property {Boolean} ownership of the battlefield */
  readOnly: true,

  /**  @property {Boolean} ownership of the battlefield */
  notReadOnly: computed.not('readOnly'),

  /**  @property {DS.GameParticipant} */
  player: null,

  /**  @property {Boolean} a card is being dragged on the screen */
  cardIsDragging: false,

  /**  @property {Boolean} this game-zone is currently the drop target */
  isDraggedOver: false,

  /**  @property {Array<DS.Card>} DS.Cards between the decks in play */
  cards: [],

  classNameBindings: ['cardIsDragging:show-drop', 'isDraggedOver'],

  drop(event) {
    if (!this.get('readOnly')) {
      event.preventDefault();
      let dragData = JSON.parse(event.dataTransfer.getData('text/plain'));

      this.set('isDraggedOver', false);
      this.sendAction('droppedOn', dragData, this.get('player'), GameCard.BATTLEFIELD);

      // For some reason when this guy handles the drop, the dragEnd event is not fired. Le sigh.
      this.sendAction('dragEnded');
    }
  },

  dragOver(event) {
    if (!this.get('readOnly')) {
      event.preventDefault();
      this.set('isDraggedOver', true);
    }
  },

  dragEnter(event) {
    if (!this.get('readOnly')) {
      event.preventDefault();
      this.set('isDraggedOver', true);
    }
  },

  dragLeave(event) {
    if (!this.get('readOnly')) {
      event.preventDefault();
      this.set('isDraggedOver', false);
    }
  },

  actions: {
    dragStarted() {
      if (!this.get('readOnly')) {
        this.sendAction('dragStarted');
      }
    },

    dragEnded() {
      if (!this.get('readOnly')) {
        this.sendAction('dragEnded');
      }
    },

    tap(gameCard) {
      if (!this.get('readOnly')) {
        this.sendAction('tap', gameCard);
      }
    }
  }
});
