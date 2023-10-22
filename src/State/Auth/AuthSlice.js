import {createSlice} from "@reduxjs/toolkit";
import {registerUser, loginUser, getUserProfile} from "./AuthActions";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    jwt: null,
  },
  reducers: {
    logoutUser(state) {
      state.jwt = null;

      localStorage.removeItem("jwt");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.jwt = payload;
    },
    [registerUser.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.jwt = payload;
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [getUserProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserProfile.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
    },
    [getUserProfile.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {logoutUser} = AuthSlice.actions;

export default AuthSlice.reducer;
