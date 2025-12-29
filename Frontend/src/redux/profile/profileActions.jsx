import {
  ProfileBuy,
  ProfileUser,
  AddressEdit,
  ProfileDonate,
  ProfileExchange,
  ProfileOrders,
  ProfileWishlist,
  ProfileReserves,
} from "../../api/pathConstants";
import { Request } from "../../api/Request";
import { openSnackbar } from "../snackbar/snackbarActions";
import { getToken, removeTokenRequest } from "../token/tokenActions";
import {
  EDIT_IMAGE_SUCCESS,
  EDIT_ADDRESS,
  USER_DETAILS,
  USER_LOADING,
  ADD_USER_BUY,
  ADD_USER_DONATE,
  PRODUCT_LOADING,
  ADD_USER_EXCHANGE,
  ADD_USER_ORDERS,
  ADD_USER_WISHLIST,
  ADD_USER_RESERVES,
} from "./profileTypes";

export const addUserDetails = (value, id) => {
  return {
    type: USER_DETAILS,
    value: value,
    id: id,
  };
};

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().profile.users == false) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", `${ProfileUser}?user=${id}`, token);
      if (res && res.status === 200) {
        await dispatch(addUserDetails(res.data, id));
      } else if (res && res.status == 204) {
        await dispatch(userLoading(false));
        await dispatch(openSnackbar("User Not found"));
      } else {
        await dispatch(openSnackbar("Something went wrong"));
      }
    } else {
      await dispatch(userLoading(false));
    }
  };
};

export const addUserBuyDetails = (value, id) => {
  return {
    type: ADD_USER_BUY,
    value: value,
    id: id,
  };
};

export const loading = (value) => {
  return {
    type: PRODUCT_LOADING,
    value: value,
  };
};

export const userLoading = (value) => {
  return {
    type: USER_LOADING,
    value: value,
  };
};

export const getUserBuy = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().profile.buy == false) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", `${ProfileBuy}?user=${id}`, token);
      if (res && res.status === 200) {
        await dispatch(addUserBuyDetails(res.data, id));
      } else if (res && res.status !== 200) {
        // await dispatch(removeTokenRequest());
      } else {
        await dispatch(openSnackbar("Network error"));
      }
    } else {
      await dispatch(loading(false));
    }
  };
};

export const addUserDonateDetails = (value, id) => {
  return {
    type: ADD_USER_DONATE,
    value: value,
    id: id,
  };
};

export const getUserDonate = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().profile.donate == false) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", `${ProfileDonate}?user=${id}`, token);
      if (res && res.status === 200) {
        await dispatch(addUserDonateDetails(res.data, id));
      } else if (res && res.status !== 200) {
        // await dispatch(removeTokenRequest());
      } else {
        await dispatch(openSnackbar("Network error"));
      }
    } else {
      await dispatch(loading(false));
    }
  };
};

export const addUserExchangeDetails = (value, id) => {
  return {
    type: ADD_USER_EXCHANGE,
    value: value,
    id: id,
  };
};

export const getUserExchange = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().profile.exchange == false) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", `${ProfileExchange}?user=${id}`, token);
      if (res && res.status === 200) {
        await dispatch(addUserExchangeDetails(res.data, id));
      } else if (res && res.status !== 200) {
        // await dispatch(removeTokenRequest());
      } else {
        await dispatch(openSnackbar("Network error"));
      }
    } else {
      await dispatch(loading(false));
    }
  };
};

export const addUserWishlistDetails = (value, id) => {
  return {
    type: ADD_USER_WISHLIST,
    value: value,
    id: id,
  };
};

export const getUserWishlist = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().profile.wishlist == false) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", `${ProfileWishlist}?user=${id}`, token);
      if (res && res.status === 200) {
        await dispatch(addUserWishlistDetails(res.data, id));
      } else if (res && res.status !== 200) {
        // await dispatch(removeTokenRequest());
      } else {
        await dispatch(openSnackbar("Network error"));
      }
    } else {
      await dispatch(loading(false));
    }
  };
};

export const addUserOrdersDetails = (value, id) => {
  return {
    type: ADD_USER_ORDERS,
    value: value,
    id: id,
  };
};

export const getUserOrders = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().profile.orders == false) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", `${ProfileOrders}?user=${id}`, token);
      if (res && res.status === 200) {
        await dispatch(addUserOrdersDetails(res.data, id));
      } else if (res && res.status !== 200) {
        // await dispatch(removeTokenRequest());
      } else {
        await dispatch(openSnackbar("Network error"));
      }
    } else {
      await dispatch(loading(false));
    }
  };
};

export const addUserReserveDetails = (value, id) => {
  return {
    type: ADD_USER_RESERVES,
    value: value,
    id: id,
  };
};

export const getUserReserve = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().profile.reserves == false) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", `${ProfileReserves}?user=${id}`, token);
      if (res && res.status === 200) {
        await dispatch(addUserReserveDetails(res.data, id));
      } else if (res && res.status !== 200) {
        // await dispatch(removeTokenRequest());
      } else {
        await dispatch(openSnackbar("Network error"));
      }
    } else {
      await dispatch(loading(false));
    }
  };
};

export const EditProfileAddress = (value, id) => {
  return {
    type: EDIT_ADDRESS,
    value: value,
    id: id,
  };
};

export const EditImageSuccess = (value, id) => {
  return {
    type: EDIT_IMAGE_SUCCESS,
    value: value,
    id: id,
  };
};
