import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_BASE_URL} from "../../config/api";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
  message: null,
  status: false,
  // findUser: null,
  // updateUser: false,
};

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

export const getUserById = createAsyncThunk("auth/getUserById", async (userId, {rejectWithValue}) => {
  try {
    const {data} = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`get user by id : ${data}`);
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
export const updateUser = createAsyncThunk("auth/updateUser", async (updateData, {rejectWithValue}) => {
  try {
    const {data} = await axios.put(`${API_BASE_URL}/api/users/update`, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`update user : ${data}`);
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
export const followUser = createAsyncThunk("auth/followUser", async (userId, {rejectWithValue}) => {
  try {
    const {data} = await axios.put(`${API_BASE_URL}/api/users/${userId}/follow`, "", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`follow user : ${data}`);
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

export const changePassword = createAsyncThunk("auth/changePassword", async (passwordData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/auth/change-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    alert(data.message);
    return data;
  } catch (error) {
    alert(error.response.data.message);

    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem("jwt");
      return initialState;
    },
    changePassword(state) {},
  },
  extraReducers: {
    [changePassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [changePassword.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    [changePassword.rejected]: (state, {payload}) => {
      state.loading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
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
    [getUserById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserById.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.findUser = payload;
    },
    [getUserById.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateUser.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
      state.updateUser = true;
    },
    [updateUser.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [followUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [followUser.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.findUser = payload;
    },
    [followUser.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {logoutUser} = AuthSlice.actions;

export default AuthSlice.reducer;
