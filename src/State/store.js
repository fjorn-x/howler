import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";

// const rootReducers = combineReducers({
//   auth: authReducer,
// });

// export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
