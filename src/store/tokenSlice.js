import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "" };

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    // Action state
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetToken: () => initialState,
  },
});

// Export actions
export const { setToken ,resetToken} = tokenSlice.actions;
export default tokenSlice.reducer;
