import {
  OPEN_SNACKBAR,
  SET_MESSAGE_INFO,
  SET_OPEN,
  SET_SNACKPACK,
  OPEN_PROMPT,
} from "./snackbarTypes";

const initialState = {
  snackPack: [],
  open: false,
  messageInfo: null,
  openPrompt: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackPack: [...state.snackPack, action.errorMessage],
      };
    case SET_OPEN:
      return {
        ...state,
        open: action.value,
      };
    case SET_SNACKPACK:
      return {
        ...state,
        snackPack: action.messages,
      };
    case SET_MESSAGE_INFO:
      return {
        ...state,
        messageInfo: action.message,
      };
    case OPEN_PROMPT:
      return {
        ...state,
        openPrompt: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
