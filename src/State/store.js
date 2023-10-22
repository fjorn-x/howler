import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./Auth/Reducer";
// import {configureStore} from "@reduxjs/toolkit";
// import AuthSliceReducer from "./Auth/AuthSlice";

const rootReducers = combineReducers({
  auth: authReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
