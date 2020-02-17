import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | forms/edit-example-form', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:forms/edit-example-form');
    assert.ok(controller);
  });
});
