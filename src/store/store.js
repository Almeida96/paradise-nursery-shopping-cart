import {configureStore} from '@reduxjs/toolkit';
import cartReducer, {restoreCart, serializeCart} from './cart.js';
const key = 'paradise-cart-v1';
let saved;
try { saved = localStorage.getItem(key); } catch { /* Browser storage may be disabled. */ }
const store = configureStore({reducer: {cart: cartReducer}, preloadedState: {cart: restoreCart(saved)}});
store.subscribe(() => {
  try { localStorage.setItem(key, serializeCart(store.getState().cart)); } catch { /* The cart remains usable in memory. */ }
});
export default store;
