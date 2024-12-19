import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, image, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, title, price, image, quantity });
      }
    },
    updateCartQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCartQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;