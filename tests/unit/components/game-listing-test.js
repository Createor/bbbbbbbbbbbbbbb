import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('game-listing', {
  // specify the other units that are required for this test
  needs: [
    'component:paper-item',
    'component:paper-tile-left',
    'component:paper-tile-content',
    'component:paper-button',
    'component:game-listing-player'
  ]
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
