import cookie from "react-cookies";

import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  SET_TOKEN_SUCCESS,
  GET_LOGIN_REQUEST,
  REMOVE_TOKEN_REQUEST,
} from "./tokenTypes";
import { isTokenValid } from "./tokenActions";

const initialState = {
  loading: false,
  access: cookie.load("access") || null,
  refresh: cookie.load("refresh") || null,
  isLoggedIn: isTokenValid(cookie.load("refresh") || null),
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_TOKEN_REQUEST:
      return {
        ...state,
        access: null,
        refresh: null,
        loading: false,
        session_id: null,
        success: false,
        isLoggedIn: false,
      };
    case SET_TOKEN_SUCCESS:
      return {
        loading: false,
        success: true,
        access: action.token.access_token,
        refresh: action.token.refresh_token,
        // session_id: action.token.session_id,
        isLoggedIn: true,
      };

    case GET_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        // access: action.data.access_token,
        // refresh: action.data.refresh_token,
        // session_id: action.data.session_id,
        isLoggedIn: true,
        success: true,
      };
    case GET_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
