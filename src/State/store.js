import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";
import howlReducer from "./Howl/HowlSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    howl: howlReducer,
  },
});
export default store;
