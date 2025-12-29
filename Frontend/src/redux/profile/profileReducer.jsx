import {
  ADD_USER_BUY,
  PRODUCT_LOADING,
  ADD_USER_DONATE,
  ADD_USER_EXCHANGE,
  ADD_USER_WISHLIST,
  USER_DETAILS,
  USER_LOADING,
  ADD_USER_ORDERS,
  ADD_USER_RESERVES,
  EDIT_ADDRESS,
  EDIT_IMAGE_SUCCESS,
} from "./profileTypes";

const initialState = {
  buy: {},
  donate: {},
  exchange: {},
  reserves: {},
  wishlist: {},
  orders: {},
  users: {},
  productLoading: true,
  userLoading: true,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_IMAGE_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.id]: { ...state.users[action.id], image: action.value },
        },
      };
    case EDIT_ADDRESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.id]: { ...state.users[action.id], ...action.value },
        },
      };
    case USER_DETAILS:
      return {
        ...state,
        users: { ...state.users, [action.id]: action.value },
        userLoading: false,
      };
    case ADD_USER_BUY:
      return {
        ...state,
        buy: { ...state.buy, [action.id]: action.value },
        productLoading: false,
      };
    case ADD_USER_DONATE:
      return {
        ...state,
        donate: { ...state.donate, [action.id]: action.value },
        productLoading: false,
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        productLoading: action.value,
      };
    case USER_LOADING:
      return {
        ...state,
        userLoading: action.value,
      };
    case ADD_USER_EXCHANGE:
      return {
        ...state,
        exchange: { ...state.exchange, [action.id]: action.value },
        productLoading: false,
      };
    case ADD_USER_WISHLIST:
      return {
        ...state,
        wishlist: { ...state.wishlist, [action.id]: action.value },
        productLoading: false,
      };
    case ADD_USER_ORDERS:
      return {
        ...state,
        orders: { ...state.orders, [action.id]: action.value },
        productLoading: false,
      };
    case ADD_USER_RESERVES:
      return {
        ...state,
        reserves: { ...state.reserves, [action.id]: action.value },
        productLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
