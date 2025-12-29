import { Request } from "../../api/Request";
import { UserAccountCreate, UserLogin, UserTokenRefresh } from "../../api/pathConstants";
import cookie from "react-cookies";

import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  SET_TOKEN_SUCCESS,
  REMOVE_TOKEN_REQUEST,
  GET_LOGIN_REQUEST,
} from "./tokenTypes";

import { openSnackbar } from "../snackbar/snackbarActions";
import { UNAUTH_LOGIN_PATH } from "../../constants/routeConstants";

export const getTokenRequest = () => {
  return {
    type: GET_TOKEN_REQUEST,
  }; 
};

export const removeTokenRequest = () => {
  cookie.remove("access", { path: "/" });
  cookie.remove("refresh", { path: "/" });
  return {
    type: REMOVE_TOKEN_REQUEST,
  };
};

export const setTokenSuccess = (token) => {
  return {
    type: SET_TOKEN_SUCCESS,
    token: token,
  };
};

export const getTokenSuccess = () => {
  return {
    type: GET_TOKEN_SUCCESS,
  };
};

export const getLoginRequest = () => {
  return {
    type: GET_LOGIN_REQUEST,
  };
};

export const getExpirationDate = (jwtToken) => {
  if (!jwtToken) {
    return null;
  }
  const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

export const isExpired = (exp) => {
  if (!exp) {
    return true;
  }
  return Date.now() >= exp;
};

export const isTokenValid = (jwtToken) => {
  if (!jwtToken) {
    return false;
  }
  const isValid = jwtToken.match(
    /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
  );
  if (isValid) {
    if (!isExpired(getExpirationDate(jwtToken))) {
      return true;
    }
  }
  return false;
};




export const getToken = () => {
  return async (dispatch, getState) => {
    await dispatch(getTokenRequest());
    const refresh = await getState().token.refresh;
    if (!isTokenValid(refresh)) {
      await dispatch(removeTokenRequest());
    } else {
      const access = await getState().token.access;
      if (!isTokenValid(access)) {
        const updatedToken = await Request("POST", UserTokenRefresh, null, {
          refresh_token: refresh,
        });
        // console.log("refresh ok");
        // console.log(updatedToken);
        if (updatedToken && updatedToken.status === 200) {
          await dispatch(setToken(updatedToken.data));
        } else if (updatedToken && updatedToken!==200) {
    
          // console.log("this is the problem")
         
        } else {
          await dispatch(openSnackbar("Network Error"));
        }
      } else {
        dispatch(getTokenSuccess());
      }
    }
  };
};

export const setToken = (jwtToken) => {
  return async (dispatch) => {
    try {
      const today = new Date();
      const expiresAccess = new Date();
      const expiresRefresh = new Date();
      expiresAccess.setMinutes(today.getMinutes() + 30);
      expiresRefresh.setDate(today.getDate() + 1);
      cookie.save("access", jwtToken.access_token, {
        path: "/",
        expires: expiresAccess,
      });
      cookie.save("refresh", jwtToken.refresh_token, {
        path: "/",
        expires: expiresRefresh,
      });
      // cookie.save("session_id", jwtToken.session_id, {
      //   path: "/",
      //   expires: expiresRefresh,
      // });

      await dispatch(setTokenSuccess(jwtToken));
    } catch (e) {
      dispatch(removeTokenRequest());
    }
  };
};

export const SignupAction = (user_id, password,email,first_name,last_name, value) =>{
  return async (dispatch) =>{
    const res = await Request("POST",UserAccountCreate,null,{
      user_id,
      password,
      email,
      first_name,
      last_name,
    })
    if (res) {
      if(res.status ===204){
        await dispatch(openSnackbar("User already exists"))
      }
      // else if (res.status == 400) {
      //   await dispatch(openSnackbar("email id already exists"));
      // }
      else if (res.status !== 201) {
        await dispatch(openSnackbar("Something went wrong"));
      }
      else if (res.status === 201) {
        await dispatch(setToken(res.data));
      } else if (!res.status) {
        await dispatch(openSnackbar("Network error"));
      } else {
        if (value === "signup") {
          window.location.href = UNAUTH_LOGIN_PATH;
        } else {
          await dispatch(removeTokenRequest());
          if (res.data.detail) await dispatch(openSnackbar(res.data.detail));
          else {
            if (res.data.username) {
              await dispatch(openSnackbar(res.data.username[0]));
            }
            if (res.data.password) {
              await dispatch(openSnackbar(res.data.password[0]));
            }
          }
        }
      }
    } else {
      if (value === "signup") {
        window.location.href = UNAUTH_LOGIN_PATH;
      } else {
        dispatch(removeTokenRequest());
        dispatch(openSnackbar("something went wrong"));
      }
    }
  }
}


export const loginAction = (user_id, password, value) => {
  return async (dispatch) => {
    await dispatch(getLoginRequest());
    const res = await Request("POST", UserLogin, null, {
      user_id,
      password,
    });
    if (res) {
      if (res.status !== 200) {
        await dispatch(openSnackbar("Something went wrong"));
      }
      if (res.status === 200) {
        await dispatch(setToken(res.data));
      } else if (!res.status) {
        await dispatch(openSnackbar("Network error"));
      } else {
        if (value === "signup") {
          window.location.href = UNAUTH_LOGIN_PATH;
        } else {
          await dispatch(removeTokenRequest());
          if (res.data.detail) await dispatch(openSnackbar(res.data.detail));
          else {
            if (res.data.username) {
              await dispatch(openSnackbar(res.data.username[0]));
            }
            if (res.data.password) {
              await dispatch(openSnackbar(res.data.password[0]));
            }
          }
        }
      }
    } else {
      if (value === "signup") {
        window.location.href = UNAUTH_LOGIN_PATH;
      } else {
        dispatch(removeTokenRequest());
        dispatch(openSnackbar("something went wrong"));
      }
    }
  };
};
