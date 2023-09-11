// myReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 1,
    name: false,
    email: false,
    role: false,
    posisi: false,
    iat: 111111,
  },
  token: false,
};

const mySlice = createSlice({
  name: "myReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = mySlice.actions;
export default mySlice.reducer;
