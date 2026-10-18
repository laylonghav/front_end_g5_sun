import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action state

    // Add to cart
    addToCart: (state, actions) => {
      const id = actions.payload.id;
      const existing = state.find((item) => item?.id === id);
      if (existing) {
        // existing.qty = existing.qty + 1;
        existing.qty += 1;
      } else {
        state.push({ ...actions.payload, qty: 1 });
      }
    },

    // increase cart (+)
    increaseCart: (state, actions) => {
      const id = actions.payload.id;
      const existing = state.find((item) => item?.id === id);
      if (existing) {
        // existing.qty = existing.qty + 1;
        existing.qty += 1;
      } else {
        state.push({ ...actions.payload, qty: 1 });
      }
    },

    // Decrease cart (-)
    decreaseCart: (state, actions) => {
      const id = actions.payload.id;
      const cart = state.find((item) => item?.id === id);
      if (cart?.qty > 1) {
        cart.qty -= 1;
      } else {
        return state.filter((item) => item?.id != id);
      }
    },

    // Clear cart
    clear: (state, actions) => {
      const id = actions.payload.id;
      return state.filter((item) => item?.id != id);
    },

    // Clear all
    clearAll: () => initialState,
  },
});

// Export actions
export const { addToCart, increaseCart, decreaseCart, clear, clearAll } =
  CartSlice.actions;
export default CartSlice.reducer;
