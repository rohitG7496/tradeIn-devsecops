import {
  GetUserDetails,
  AddressEdit,
  EditImage,
} from "../../api/pathConstants";
import { Request } from "../../api/Request";
import { openSnackbar } from "../snackbar/snackbarActions";
import { getToken, removeTokenRequest } from "../token/tokenActions";
import {
  ADD_MY_DETAILS,
  EDIT_ADDRESS_SUCCESS,
  EDIT_USER_IMAGE,
} from "./myDetailsTypes";
import {
  EditProfileAddress,
  EditImageSuccess,
} from "../profile/profileActions";

export const addMyDetails = (myDetails) => {
  return {
    type: ADD_MY_DETAILS,
    myDetails: myDetails,
  };
};

export const getMyDetails = () => {
  return async (dispatch, getState) => {
    if (!getState().myDetails.myDetails) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", GetUserDetails, token);
      if (res && res.status === 200) {
        await dispatch(addMyDetails(res.data));
      } else if (res && res.status !== 200) {
        await dispatch(removeTokenRequest());
      } else {
        await dispatch(openSnackbar("Network error"));
      }
    }
  };
};

export const EditAddressSuccess = (value, id) => {
  return {
    type: EDIT_ADDRESS_SUCCESS,
    value: value,
    id: id,
  };
};

export const editAddress = (data) => {
  return async (dispatch, getState) => {
    await dispatch(getToken());
    const token = await getState().token.access;
    const user = await getState().myDetails.myDetails.username;
    if (token && user) {
      data["user"] = user;
      const res = await Request("PUT", AddressEdit, token, data);
      if (res && res.status == 200) {
        await dispatch(EditAddressSuccess(res.data, user));
        await dispatch(EditProfileAddress(res.data, user));
        await dispatch(openSnackbar("Data edited successfully"));
      } else {
        await dispatch(openSnackbar("Something went wrong"));
      }
    } else {
      await dispatch(openSnackbar("Something went wrong"));
    }
  };
};

export const EditUserImage = (value) => {
  return {
    type: EDIT_USER_IMAGE,
    value: value,
  };
};

export const editImage = (data) => {
  return async (dispatch, getState) => {
    await dispatch(getToken());
    const token = await getState().token.access;
    const user = await getState().myDetails.myDetails.username;
    if (token && user) {
      const res = await Request("PUT", EditImage, token, data);
      if (res && res.status == 200) {
        await dispatch(EditImageSuccess(res.data, user));
        await dispatch(EditUserImage(res.data, user));
        await dispatch(openSnackbar("Display picture edited successfully"));
      } else {
        await dispatch(openSnackbar("Something went wrong"));
      }
    } else {
      await dispatch(openSnackbar("Something went wrong"));
    }
  };
};
