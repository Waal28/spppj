// myReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  daftarPJ: [],
};

const mySlice = createSlice({
  name: "myReducer",
  initialState,
  reducers: {
    setdaftarPJ: (state, action) => {
      state.daftarPJ = action.payload;
    },
  },
});

export const { setdaftarPJ } = mySlice.actions;
export default mySlice.reducer;
