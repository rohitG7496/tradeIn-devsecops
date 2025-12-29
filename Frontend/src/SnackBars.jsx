import React, { useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import { connect } from "react-redux";
import {
  setOpen,
  setMessageInfo,
  setSnackPack,
} from "./redux/snackbar/snackbarActions";

const SnackBars = (props) => {
  const { snackPack, open, messageInfo } = props.snackbar;

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      props.setMessageInfoDispatch({ ...snackPack[0] });
      props.setSnackPackDispatch(snackPack.slice(1));
      props.setOpenDispatch(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      props.setOpenDispatch(false);
    }
  }, [snackPack, messageInfo, open]);

  const onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpenDispatch(false);
  };

  const onExited = () => {
    props.setMessageInfoDispatch(null);
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      onExited={onExited}
      message={messageInfo ? messageInfo.message : undefined}
    />
  );
};
function mapStateToProps(state) {
  return {
    snackbar: state.snackbar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMessageInfoDispatch: (message) => dispatch(setMessageInfo(message)),
    setSnackPackDispatch: (message) => dispatch(setSnackPack(message)),
    setOpenDispatch: (value) => dispatch(setOpen(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBars);
