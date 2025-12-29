import {
  OPEN_SNACKBAR,
  SET_MESSAGE_INFO,
  SET_OPEN,
  SET_SNACKPACK,
  OPEN_PROMPT,
} from "./snackbarTypes";

export const openSnackbar = (errorMessage) => {
  return {
    type: OPEN_SNACKBAR,
    errorMessage: {
      message: errorMessage,
      key: new Date().getTime(),
    },
  };
};

export const setOpen = (value) => {
  return {
    type: SET_OPEN,
    value: value,
  };
};

export const setMessageInfo = (message) => {
  return {
    type: SET_MESSAGE_INFO,
    message: message,
  };
};

export const setSnackPack = (messages) => {
  return {
    type: SET_SNACKPACK,
    messages: messages,
  };
};

export const openPrompt = (value) => {
  return {
    type: OPEN_PROMPT,
    value: value,
  };
};
