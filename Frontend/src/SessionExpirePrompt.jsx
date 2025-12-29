import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { openPrompt } from "./redux/snackbar/snackbarActions";
import { removeTokenRequest } from "./redux/token/tokenActions";

const SessionExpirePrompt = (props) => {
  const handleClick = () => {
    props.removeTokenDispatch();
    window.location.reload();
    props.openPromptDispatch(false);
  };
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        your session expires. Please refresh the Page{" "}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClick} color="primary">
          Refresh
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    open: state.snackbar.openPrompt,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeTokenDispatch: () => dispatch(removeTokenRequest()),
    openPromptDispatch: (value) => dispatch(openPrompt(value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionExpirePrompt);
