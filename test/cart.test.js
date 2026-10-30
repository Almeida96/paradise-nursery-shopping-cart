import {test} from 'node:test';
import assert from 'node:assert/strict';
import reducer, {addItem, updateQuantity, removeItem, restoreCart, serializeCart, selectTotalCents, orderSummary} from '../src/store/cart.js';
test('catalog owns prices and duplicate additions are idempotent', () => {
  let state = reducer(undefined, addItem({id: 1, price: -100}));
  state = reducer(state, addItem({id: 1}));
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].price, 35);
  assert.equal(reducer(state, addItem({id: 999})).items.length, 1);
});
test('quantities are bounded integers and zero removes an item', () => {
  const initial = reducer(undefined, addItem({id: 1}));
  for (const quantity of [-1, 0.5, NaN, Infinity, 100, '2']) assert.equal(reducer(initial, updateQuantity({id: 1, quantity})).items[0].quantity, 1);
  assert.equal(reducer(initial, updateQuantity({id: 1, quantity: 99})).items[0].quantity, 99);
  assert.deepEqual(reducer(initial, updateQuantity({id: 1, quantity: 0})).items, []);
  assert.deepEqual(reducer(initial, removeItem(1)).items, []);
});
test('stored carts survive reload without trusting prices or duplicate rows', () => {
  const restored = restoreCart(JSON.stringify({version: 1, items: [{id: 1, quantity: 2, price: 0}, {id: 1, quantity: 5}, {id: 999, quantity: 1}, {id: 2, quantity: -3}]}));
  assert.equal(restored.items.length, 1);
  assert.equal(restored.items[0].quantity, 2);
  assert.equal(selectTotalCents({cart: restored}), 7000);
  assert.deepEqual(restoreCart(serializeCart(restored)), restored);
  for (const input of ['bad', '{}', 'null', '{"version":2,"items":[]}', 'x'.repeat(16385)]) assert.deepEqual(restoreCart(input), {items: []});
});
test('order exports reconcile integer cents and mark the demo explicitly', () => {
  const cart = reducer(reducer(undefined, addItem({id: 1})), addItem({id: 3}));
  const order = orderSummary(cart);
  assert.equal(order.totalCents, 5700);
  assert.equal(order.items.reduce((sum, item) => sum + item.subtotalCents, 0), order.totalCents);
  assert.equal(order.demo, true);
  assert.throws(() => orderSummary({items: []}));
});
