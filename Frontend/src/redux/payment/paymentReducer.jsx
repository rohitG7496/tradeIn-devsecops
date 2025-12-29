import { MAKE_PAYMENT } from "./paymentTypes";

const initialState = {
  loading: true,
  success: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_PAYMENT:
      return {
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};

export default reducer;
