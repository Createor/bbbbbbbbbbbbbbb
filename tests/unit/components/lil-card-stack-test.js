import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('lil-card-stack', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  let component = this.subject({
    cardGroups: []
  });
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
