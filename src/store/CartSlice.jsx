import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {items: []},
  reducers: {
    addItem(state, {payload: plant}) {
      if (!state.items.some(item => item.id === plant.id)) {
        state.items.push({...plant, quantity: 1});
      }
    },
    removeItem(state, {payload: id}) {
      state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity(state, {payload: {id, quantity}}) {
      const item = state.items.find(item => item.id === id);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter(product => product.id !== id);
      } else {
        item.quantity = quantity;
      }
    }
  }
});
export const {addItem, removeItem, updateQuantity} = cartSlice.actions;
export const selectItems = state => state.cart.items;
export const selectCount = state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotal = state => state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
export default cartSlice.reducer;
