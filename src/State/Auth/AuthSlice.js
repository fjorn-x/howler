import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_BASE_URL} from "../../config/api";

export const registerUser = createAsyncThunk("auth/register", async (registerData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    return data.jwt;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const loginUser = createAsyncThunk("auth/login", async (loginData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/auth/login`, loginData);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    return data.jwt;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getUserProfile = createAsyncThunk("auth/getProfile", async (jwt, {rejectWithValue}) => {
  try {
    const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {Authorization: `Bearer ${jwt}`},
    });
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

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
      localStorage.removeItem("jwt");
      state.user = null;
      state.jwt = null;
      state.error = null;
      state.loading = false;
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
