import {createSlice} from '@reduxjs/toolkit';
import {plants} from '../catalog.js';
const validQuantity = value => Number.isInteger(value) && value >= 1 && value <= 99;
export function restoreCart(text) {
  try {
    if (typeof text !== 'string' || text.length > 16384) return {items: []};
    const data = JSON.parse(text);
    if (data.version !== 1 || !Array.isArray(data.items)) return {items: []};
    const seen = new Set();
    return {items: data.items.slice(0, 100).flatMap(item => {
      const plant = plants.find(plant => plant.id === item?.id);
      if (!plant || !validQuantity(item.quantity) || seen.has(item.id)) return [];
      seen.add(item.id);
      return [{...plant, quantity: item.quantity}];
    })};
  } catch { return {items: []}; }
}
export function serializeCart(cart) {
  return JSON.stringify({version: 1, items: cart.items.map(({id, quantity}) => ({id, quantity}))});
}
const slice = createSlice({
  name: 'cart',
  initialState: {items: []},
  reducers: {
    addItem(state, {payload}) {
      const plant = plants.find(item => item.id === payload?.id);
      if (plant && !state.items.some(item => item.id === plant.id)) state.items.push({...plant, quantity: 1});
    },
    removeItem(state, {payload: id}) { state.items = state.items.filter(item => item.id !== id); },
    updateQuantity(state, {payload}) {
      const item = state.items.find(item => item.id === payload?.id);
      if (!item || !Number.isInteger(payload.quantity)) return;
      if (payload.quantity === 0) state.items = state.items.filter(item => item.id !== payload.id);
      else if (validQuantity(payload.quantity)) item.quantity = payload.quantity;
    }
  }
});
export const {addItem, removeItem, updateQuantity} = slice.actions;
export const selectItems = state => state.cart.items;
export const selectCount = state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalCents = state => state.cart.items.reduce((sum, item) => sum + item.quantity * Math.round(item.price * 100), 0);
export const selectTotal = state => selectTotalCents(state) / 100;
export function orderSummary(cart) {
  if (!cart.items.length) throw new Error('Add a plant before exporting an order.');
  const canonical = restoreCart(serializeCart(cart));
  return {
    schemaVersion: 1, demo: true, currency: 'USD',
    items: canonical.items.map(({id, name, price, quantity}) => ({id, name, quantity, unitPriceCents: Math.round(price * 100), subtotalCents: Math.round(price * 100) * quantity})),
    totalCents: selectTotalCents({cart: canonical})
  };
}
export default slice.reducer;
