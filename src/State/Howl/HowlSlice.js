import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../config/api";
import axios from "axios";

export const createHowl = createAsyncThunk("howl/create", async (howlData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/api/howls/create`, howlData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`create howl :${data}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const deleteHowl = createAsyncThunk("howl/delete", async (howlId, {rejectWithValue}) => {
  try {
    const {data} = await axios.delete(`${API_BASE_URL}/api/howls${howlId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log("delete tweet", data);
    return howlId;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getAllHowls = createAsyncThunk("api/getAllHowls", async (nullData, thunkAPI) => {
  try {
    // const {data} = await axios.get("/api/howls/");
    const {data} = await axios.get(`${API_BASE_URL}/api/howls/all`, {
      headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
    });
    console.log("get all howls: ", data);
    return data;
  } catch (error) {
    console.log(error.message);
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const getUserHowls = createAsyncThunk("api/getUserHowls", async (userId, thunkAPI) => {
  try {
    const {data} = await axios.get(`${API_BASE_URL}/api/howls/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`get user howls: ${data}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValuerejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const getUserLikeHowls = createAsyncThunk("api/getUserLikeHowls", async (userId, {rejectWithValue}) => {
  try {
    const {data} = await axios.get(`${API_BASE_URL}/api/howls/user/${userId}/likes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`get user like howls: ${data}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const likeHowl = createAsyncThunk("api/likeHowl", async (howlId, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/api/${howlId}/likes`, "", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    console.log(`like howl :${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const findHowlById = createAsyncThunk("api/findHowlById", async (howlId, {rejectWithValue}) => {
  try {
    const {data} = await axios.get(`${API_BASE_URL}/api/howls/${howlId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`find howl by id: ${data}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const replyHowl = createAsyncThunk("api/replyHowl", async (howlData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/api/howls/reply`, howlData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    console.log(`reply howl :${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const retweet = createAsyncThunk("api/retweet", async (howlId, {rejectWithValue}) => {
  try {
    const {data} = await axios.put(`${API_BASE_URL}/api/howls/${howlId}/retweet`, "", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`retweet howl :${data}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
const HowlSlice = createSlice({
  name: "howl",
  initialState: {
    loading: false,
    data: null,
    error: null,
    howls: [],
    howl: null,
    likedHowls: [],
    like: null,
    retweet: null,
  },
  reducers: {},
  extraReducers: {
    [createHowl.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createHowl.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteHowl.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteHowl.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [getAllHowls.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllHowls.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [getUserHowls.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserHowls.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [getUserLikeHowls.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserLikeHowls.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [likeHowl.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [likeHowl.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [findHowlById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [findHowlById.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [replyHowl.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [replyHowl.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [retweet.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [retweet.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [createHowl.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.howls = [payload, ...state.howls];
      // state.howl = payload;
    },

    [deleteHowl.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.howls = state.howls.filter((howl) => howl.id !== payload);
    },

    [getAllHowls.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.howls = payload;
    },

    [getUserHowls.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.howls = payload;
    },

    [getUserLikeHowls.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.likedHowls = payload;
    },

    [likeHowl.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      // state.likedHowls.push(payload);
      state.like = payload;
    },

    [findHowlById.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.howl = payload;
    },

    [replyHowl.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.howl = payload;
    },

    [retweet.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.retweet = payload;
    },
  },
});
export default HowlSlice.reducer;
