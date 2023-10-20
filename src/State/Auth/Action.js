import axios from "axios";
import {API_BASE_URL} from "../../config/api";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
} from "./ActionType";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    console.log(`logged in User : ${JSON.stringify(data)}`);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({type: LOGIN_USER_SUCCESS, payload: data.jwt});
  } catch (e) {
    console.log("Error ", e);
    dispatch({type: LOGIN_USER_FAILURE, payload: e.message});
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
    console.log(`signed up User : ${JSON.stringify(data)}`);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({type: REGISTER_USER_SUCCESS, payload: data.jwt});
  } catch (e) {
    console.log("Error ", e);
    dispatch({type: REGISTER_USER_FAILURE, payload: e.message});
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    console.log(jwt)
    const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {Authorization: `Bearer ${jwt}`},
    });

    dispatch({type: GET_USER_PROFILE_SUCCESS, payload: data});
  } catch (e) {
    console.log("Error ", e);
    dispatch({type: GET_USER_PROFILE_FAILURE, payload: e.message});
  }
};
