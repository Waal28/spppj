// store.js
import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./reducer/myReducer";

const store = configureStore({
  reducer: {
    myReducer: myReducer,
    //Tambahkan reducer lain di sini jika ada
  },
});

export default store;
